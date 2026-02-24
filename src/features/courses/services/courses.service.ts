import { api } from "@/lib/api";
import type { Course } from "@/types";

export const coursesService = {
  async list(skip = 0, limit = 20): Promise<Course[]> {
    const res = await api.get<Course[]>("/courses/", { params: { skip, limit } });
    return res.data;
  },

  async getById(id: string): Promise<Course> {
    const res = await api.get<Course>(`/courses/${id}`);
    return res.data;
  },

  async enroll(courseId: string, studentId: string) {
    const res = await api.post(`/courses/${courseId}/enroll`, { student_id: studentId });
    return res.data;
  },
};
