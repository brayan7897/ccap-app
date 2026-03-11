import { api } from "@/lib/api";
import type { Course } from "@/types";

export const coursesService = {
  async list(skip = 0, limit = 20): Promise<Course[]> {
    const res = await api.get<Course[]>("/courses/", { params: { skip, limit } });
    return res.data;
  },

  async getBySlug(slug: string): Promise<Course> {
    try {
      console.log(`[coursesService.getBySlug] Fetching course with slug: "${slug}"`);
      const res = await api.get<Course>(`/courses/slug/${slug}`);
      console.log(`[coursesService.getBySlug] Success:`, res.data);
      return res.data;
    } catch (error: any) {
      console.error(`[coursesService.getBySlug] Error fetching "${slug}":`, error?.response?.data || error.message || error);
      throw error;
    }
  },

  /** Enroll a student — API expects { user_id } */
  async enroll(courseId: string, userId: string) {
    const res = await api.post(`/courses/${courseId}/enroll`, { user_id: userId });
    return res.data;
  },
};
