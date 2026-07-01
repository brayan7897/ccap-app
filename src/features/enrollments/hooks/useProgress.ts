"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { enrollmentsService } from "@/features/enrollments/services/enrollments.service";
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
 */
export function useMyProgress(courseId?: string) {
  const token = useAuthStore((s) => s.token);
  const isActive = useAuthStore((s) => s.user?.is_active !== false);
  return useQuery<LessonProgress[]>({
    queryKey: progressKeys.course(courseId),
    queryFn: () => enrollmentsService.getMyProgress(courseId),
    enabled: !!token && isActive && !!courseId,
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Complete a lesson and update both the lesson progress and the enrollment
 * (progress_percentage + last_completed_lesson_id) in real time.
 *
 * Business rules enforced by the backend:
 *  - Going back to an already-completed lesson → progress_percentage doesn't change.
 *  - Revisiting a fully-completed course → no re-completion.
 *  - last_completed_lesson_id only advances forward, never backward.
 *
 * POST /enrollments/progress
 */
export function useCompleteLesson(courseId: string) {
  const qc = useQueryClient();
  const upsertProgress = useEnrollmentsStore((s) => s.upsertProgress);
  const updateEnrollment = useEnrollmentsStore((s) => s.updateEnrollment);

  return useMutation({
    mutationFn: (lessonId: string) =>
      enrollmentsService.completeLesson({ lesson_id: lessonId, is_completed: true }),

    onSuccess: ({ lesson_progress, enrollment }) => {
      // 1. Mark lesson as completed in local store (updates the ✅ in LessonNavSidebar)
      upsertProgress(lesson_progress);

      // 2. Sync the updated enrollment (progress bar + last_completed_lesson_id)
      if (enrollment) {
        updateEnrollment(enrollment);
      }

      // 3. Refresh cached progress and enrollment lists
      qc.invalidateQueries({ queryKey: progressKeys.course(courseId) });
      qc.invalidateQueries({ queryKey: ["enrollments", "me"] });

      // 4. Notify the user
      if (enrollment?.status === "COMPLETED") {
        toast.success("¡Felicitaciones! Completaste el curso.", { duration: 5000 });
      } else {
        toast.success("¡Lección completada!");
      }
    },

    onError: () => toast.error("Error al marcar la lección. Intenta de nuevo."),
  });
}

/**
 * Alias kept for any callers that still use the old hook name.
 * @deprecated Use useCompleteLesson instead.
 */
export function useTrackProgress(courseId: string) {
  return useCompleteLesson(courseId);
}
