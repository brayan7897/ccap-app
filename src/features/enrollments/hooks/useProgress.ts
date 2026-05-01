"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  enrollmentsService,
  type ProgressInput,
} from "@/features/enrollments/services/enrollments.service";
import { useEnrollmentsStore } from "@/store/enrollments-store";
import { useAuthStore } from "@/store/auth-store";
import type { LessonProgress } from "@/types";

export const progressKeys = {
  all: () => ["progress"] as const,
  course: (courseId?: string) => ["progress", courseId] as const,
};

/**
 * Fetch lesson progress for the current user, optionally filtered to one course.
 * GET /enrollments/progress/my?course_id=uuid
 * Disabled when user account is inactive (backend returns 403).
 */
export function useMyProgress(courseId?: string) {
  const token = useAuthStore((s) => s.token);
  const isActive = useAuthStore((s) => s.user?.is_active !== false);
  return useQuery<LessonProgress[]>({
    queryKey: progressKeys.course(courseId),
    queryFn: () => enrollmentsService.getMyProgress(courseId),
    // Only run when courseId is defined to avoid a double-query:
    // the key changes from ["progress", undefined] → ["progress", "real-id"]
    // as course data loads, creating two separate cache entries.
    enabled: !!token && isActive && !!courseId,
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Track (create or update) lesson progress.
 * POST /enrollments/progress
 */
export function useTrackProgress() {
  const qc = useQueryClient();
  const upsertProgress = useEnrollmentsStore((s) => s.upsertProgress);

  return useMutation({
    mutationFn: (data: ProgressInput) => enrollmentsService.trackProgress(data),
    onSuccess: (progress) => {
      upsertProgress(progress);
      qc.invalidateQueries({ queryKey: progressKeys.all() });
    },
    onError: () => toast.error("Error al guardar el progreso. Intenta de nuevo."),
  });
}
