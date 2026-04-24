import { create } from "zustand";
import type { Enrollment, LessonProgress } from "@/types";

interface EnrollmentsState {
  enrollments: Enrollment[];
  progress: LessonProgress[];

  setEnrollments: (enrollments: Enrollment[]) => void;
  addEnrollment: (enrollment: Enrollment) => void;
  updateEnrollment: (updated: Enrollment) => void;

  setProgress: (progress: LessonProgress[]) => void;
  upsertProgress: (item: LessonProgress) => void;

  /** Check if the current user is enrolled in a course */
  isEnrolled: (courseId: string) => boolean;
  /** Get progress for a specific lesson */
  getLessonProgress: (lessonId: string) => LessonProgress | undefined;
}

export const useEnrollmentsStore = create<EnrollmentsState>()((set, get) => ({
  enrollments: [],
  progress: [],

  setEnrollments: (enrollments) => set({ enrollments }),

  addEnrollment: (enrollment) =>
    set((s) => ({ enrollments: [...s.enrollments, enrollment] })),

  updateEnrollment: (updated) =>
    set((s) => ({
      enrollments: s.enrollments.map((e) => (e.id === updated.id ? updated : e)),
    })),

  setProgress: (progress) => set({ progress }),

  upsertProgress: (item) =>
    set((s) => {
      const exists = s.progress.some((p) => p.lesson_id === item.lesson_id);
      return {
        progress: exists
          ? s.progress.map((p) => (p.lesson_id === item.lesson_id ? item : p))
          : [...s.progress, item],
      };
    }),

  isEnrolled: (courseId) =>
    get().enrollments.some(
      (e) => e.course_id === courseId && e.status === "ACTIVE"
    ),

  getLessonProgress: (lessonId) =>
    get().progress.find((p) => p.lesson_id === lessonId),
}));
