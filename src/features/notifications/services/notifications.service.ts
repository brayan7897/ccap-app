import { api } from "@/lib/api";
import type {
  UserNotificationResponse,
  UnreadCountResponse,
  MarkAllReadResponse,
  DeleteNotificationResponse,
} from "@/types";

export interface InboxParams {
  skip?: number;
  limit?: number;
  unread_only?: boolean;
}

export const notificationsService = {
  /** GET /notifications/inbox — unified directed + global inbox */
  getInbox: async (params?: InboxParams): Promise<UserNotificationResponse[]> => {
    const { data } = await api.get<UserNotificationResponse[]>(
      "/notifications/inbox",
      { params }
    );
    return data;
  },

  /** GET /notifications/inbox/unread-count — Redis-backed, fast */
  getUnreadCount: async (): Promise<UnreadCountResponse> => {
    const { data } = await api.get<UnreadCountResponse>(
      "/notifications/inbox/unread-count"
    );
    return data;
  },

  /** PATCH /notifications/inbox/{pivot_id}/read */
  markRead: async (pivotId: string): Promise<UserNotificationResponse> => {
    const { data } = await api.patch<UserNotificationResponse>(
      `/notifications/inbox/${pivotId}/read`
    );
    return data;
  },

  /** PATCH /notifications/inbox/read-all */
  markAllRead: async (): Promise<MarkAllReadResponse> => {
    const { data } = await api.patch<MarkAllReadResponse>(
      "/notifications/inbox/read-all"
    );
    return data;
  },

  /** DELETE /notifications/inbox/{pivot_id} — soft-delete (only for current user) */
  deleteFromInbox: async (pivotId: string): Promise<DeleteNotificationResponse> => {
    const { data } = await api.delete<DeleteNotificationResponse>(
      `/notifications/inbox/${pivotId}`
    );
    return data;
  },
};
