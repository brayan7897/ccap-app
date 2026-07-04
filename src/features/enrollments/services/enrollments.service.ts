import { api } from "@/lib/api";
import type { Enrollment, LessonProgress, CompleteProgressResponse } from "@/types";

export interface ProgressInput {
  lesson_id: string;
  is_completed: boolean;
  /** Optional — not used for Google Drive content */
  last_position_seconds?: number;
  /** Optional — not used for Google Drive content */
  watch_time_seconds?: number;
}

export const enrollmentsService = {
  /** Enroll the current user in a course */
  async enroll(courseId: string): Promise<Enrollment> {
    const res = await api.post<Enrollment>("/enrollments/", { course_id: courseId });
    return res.data;
  },

  /** Get all enrollments of the current user */
  async listMy(skip = 0, limit = 50): Promise<Enrollment[]> {
    const res = await api.get<Enrollment[]>("/enrollments/me", { params: { skip, limit } });
    return res.data;
  },

  /** Get a single enrollment by ID */
  async getById(enrollmentId: string): Promise<Enrollment> {
    const res = await api.get<Enrollment>(`/enrollments/${enrollmentId}`);
    return res.data;
  },

  /** Cancel an enrollment */
  async cancel(enrollmentId: string): Promise<Enrollment> {
    const res = await api.patch<Enrollment>(`/enrollments/${enrollmentId}/cancel`);
    return res.data;
  },

  /**
   * Mark a lesson as complete.
   * Returns the updated lesson progress AND the updated enrollment
   * (with new progress_percentage and last_completed_lesson_id).
   * POST /enrollments/progress
   */
  async completeLesson(data: ProgressInput): Promise<CompleteProgressResponse> {
    const res = await api.patch<CompleteProgressResponse>("/enrollments/progress", data);
    return res.data;
  },

  /** Alias kept for backward compatibility */
  async trackProgress(data: ProgressInput): Promise<CompleteProgressResponse> {
    return this.completeLesson(data);
  },

  /** Get all lesson progress for the current user (optionally filtered by course) */
  async getMyProgress(courseId?: string): Promise<LessonProgress[]> {
    const res = await api.get<LessonProgress[]>("/enrollments/progress/me", {
      params: courseId ? { course_id: courseId } : undefined,
    });
    return res.data;
  },

  /** Admin: list all enrollments with optional filters */
  async listAll(params?: {
    course_id?: string;
    user_id?: string;
    skip?: number;
    limit?: number;
  }): Promise<Enrollment[]> {
    const res = await api.get<Enrollment[]>("/enrollments/", { params });
    return res.data;
  },
};
