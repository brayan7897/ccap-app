"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  notificationsService,
  type InboxParams,
} from "@/features/notifications/services/notifications.service";
import { useAuthStore } from "@/store/auth-store";
import type { UserNotificationResponse } from "@/types";

/**
 * Returns the correct ID to use for inbox actions:
 * - Global notifications (is_global=true): use notification_id (real UUID, no ephemeral pivot)
 * - Directed notifications (is_global=false): use id (pivot UUID)
 */
export function resolveInboxId(notif: UserNotificationResponse): string {
  return notif.is_global ? notif.notification_id : notif.id;
}

export const notifKeys = {
  inbox: (params?: InboxParams) => ["notifications", "inbox", params] as const,
  unreadCount: () => ["notifications", "unread-count"] as const,
};

/** Inbox with optional pagination / filtering. Only fetches when authenticated and account is active. */
export function useInbox(params?: InboxParams) {
  const token = useAuthStore((s) => s.token);
  const isActive = useAuthStore((s) => s.user?.is_active !== false);
  return useQuery({
    queryKey: notifKeys.inbox(params),
    queryFn: () => notificationsService.getInbox(params),
    enabled: !!token && isActive,
    staleTime: 20_000,
  });
}

/**
 * Unread count — Redis-backed (<1ms server-side).
 * Polls every 15 s for near real-time badge updates (access granted, etc.).
 * Only runs when authenticated and account is active.
 */
export function useUnreadCount() {
  const token = useAuthStore((s) => s.token);
  const isActive = useAuthStore((s) => s.user?.is_active !== false);
  return useQuery({
    queryKey: notifKeys.unreadCount(),
    queryFn: () => notificationsService.getUnreadCount(),
    enabled: !!token && isActive,
    refetchInterval: 15_000,
    staleTime: 10_000,
  });
}

/** PATCH /inbox/{id}/read — optimistic: marks as read instantly, rolls back on error */
export function useMarkRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (notif: UserNotificationResponse) =>
      notificationsService.markRead(resolveInboxId(notif)),

    onMutate: async (notif) => {
      // Cancel any in-flight inbox refetches so they don't overwrite our optimistic update
      await qc.cancelQueries({ queryKey: ["notifications", "inbox"] });
      await qc.cancelQueries({ queryKey: notifKeys.unreadCount() });

      // Snapshot every inbox cache entry (different param variants) for rollback
      const previousInboxes = qc.getQueriesData<UserNotificationResponse[]>({
        queryKey: ["notifications", "inbox"],
      });
      const previousCount = qc.getQueryData<{ unread_count: number }>(
        notifKeys.unreadCount()
      );

      // Optimistically mark the notification as read in every cached inbox list
      qc.setQueriesData<UserNotificationResponse[]>(
        { queryKey: ["notifications", "inbox"] },
        (old) =>
          old?.map((n) =>
            n.id === notif.id
              ? { ...n, is_read: true, read_at: new Date().toISOString() }
              : n
          )
      );

      // Optimistically decrement the unread badge
      qc.setQueryData<{ unread_count: number }>(
        notifKeys.unreadCount(),
        (old) =>
          old
            ? { unread_count: Math.max(0, old.unread_count - 1) }
            : old
      );

      return { previousInboxes, previousCount };
    },

    onError: (_err, _notif, ctx) => {
      // Roll back to the snapshot
      if (ctx?.previousInboxes) {
        for (const [key, data] of ctx.previousInboxes) {
          qc.setQueryData(key, data);
        }
      }
      if (ctx?.previousCount !== undefined) {
        qc.setQueryData(notifKeys.unreadCount(), ctx.previousCount);
      }
      toast.error("No se pudo marcar la notificación como leída.");
    },

    onSettled: () => {
      // Sync with server after mutation resolves (success or error)
      qc.invalidateQueries({ queryKey: ["notifications", "inbox"] });
      qc.invalidateQueries({ queryKey: notifKeys.unreadCount() });
    },
  });
}

/** PATCH /inbox/read-all — optimistic: clears all badges instantly, rolls back on error */
export function useMarkAllRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => notificationsService.markAllRead(),

    onMutate: async () => {
      await qc.cancelQueries({ queryKey: ["notifications", "inbox"] });
      await qc.cancelQueries({ queryKey: notifKeys.unreadCount() });

      const previousInboxes = qc.getQueriesData<UserNotificationResponse[]>({
        queryKey: ["notifications", "inbox"],
      });
      const previousCount = qc.getQueryData<{ unread_count: number }>(
        notifKeys.unreadCount()
      );

      // Mark everything as read
      qc.setQueriesData<UserNotificationResponse[]>(
        { queryKey: ["notifications", "inbox"] },
        (old) =>
          old?.map((n) => ({
            ...n,
            is_read: true,
            read_at: n.read_at ?? new Date().toISOString(),
          }))
      );
      qc.setQueryData(notifKeys.unreadCount(), { unread_count: 0 });

      return { previousInboxes, previousCount };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previousInboxes) {
        for (const [key, data] of ctx.previousInboxes) {
          qc.setQueryData(key, data);
        }
      }
      if (ctx?.previousCount !== undefined) {
        qc.setQueryData(notifKeys.unreadCount(), ctx.previousCount);
      }
      toast.error("No se pudieron marcar las notificaciones.");
    },

    onSettled: (_data) => {
      qc.invalidateQueries({ queryKey: ["notifications", "inbox"] });
      qc.invalidateQueries({ queryKey: notifKeys.unreadCount() });
    },

    onSuccess: (data) => {
      if (data.marked_read > 0) {
        toast.success(
          `${data.marked_read} notificación${data.marked_read !== 1 ? "es" : ""} marcada${data.marked_read !== 1 ? "s" : ""} como leída${data.marked_read !== 1 ? "s" : ""}.`
        );
      }
    },
  });
}

/** DELETE /inbox/{id} — optimistic: removes from list instantly, rolls back on error */
export function useDeleteNotification() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (notif: UserNotificationResponse) =>
      notificationsService.deleteFromInbox(resolveInboxId(notif)),

    onMutate: async (notif) => {
      await qc.cancelQueries({ queryKey: ["notifications", "inbox"] });
      await qc.cancelQueries({ queryKey: notifKeys.unreadCount() });

      const previousInboxes = qc.getQueriesData<UserNotificationResponse[]>({
        queryKey: ["notifications", "inbox"],
      });
      const previousCount = qc.getQueryData<{ unread_count: number }>(
        notifKeys.unreadCount()
      );

      // Remove from all inbox cache entries
      qc.setQueriesData<UserNotificationResponse[]>(
        { queryKey: ["notifications", "inbox"] },
        (old) => old?.filter((n) => n.id !== notif.id)
      );

      // Decrement badge only if the deleted notification was unread
      if (!notif.is_read) {
        qc.setQueryData<{ unread_count: number }>(
          notifKeys.unreadCount(),
          (old) =>
            old
              ? { unread_count: Math.max(0, old.unread_count - 1) }
              : old
        );
      }

      return { previousInboxes, previousCount };
    },

    onError: (_err, _notif, ctx) => {
      if (ctx?.previousInboxes) {
        for (const [key, data] of ctx.previousInboxes) {
          qc.setQueryData(key, data);
        }
      }
      if (ctx?.previousCount !== undefined) {
        qc.setQueryData(notifKeys.unreadCount(), ctx.previousCount);
      }
      toast.error("No se pudo eliminar la notificación.");
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["notifications", "inbox"] });
      qc.invalidateQueries({ queryKey: notifKeys.unreadCount() });
    },
  });
}
