"use client";

import { useQuery } from "@tanstack/react-query";
import { resourcesService } from "../services/resources.service";
import { useAuthStore } from "@/store/auth-store";
import type { Resource } from "@/types";

export const resourceKeys = {
  lesson: (lessonId: string) => ["resources", lessonId] as const,
};

/**
 * Fetch all resources for a given lesson.
 * Disabled when lessonId is undefined/empty or account is inactive (backend returns 403).
 */
export function useResources(lessonId: string | undefined) {
  const token = useAuthStore((s) => s.token);
  const isActive = useAuthStore((s) => s.user?.is_active !== false);
  return useQuery<Resource[]>({
    queryKey: resourceKeys.lesson(lessonId ?? ""),
    queryFn: () => resourcesService.list(lessonId!),
    enabled: !!lessonId && !!token && isActive,
  });
}
