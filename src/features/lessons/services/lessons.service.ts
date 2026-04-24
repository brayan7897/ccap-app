import { api } from "@/lib/api";
import type { Lesson, LessonType } from "@/types";

export interface LessonInput {
  title: string;
  lesson_type: LessonType;
  drive_file_id?: string;
  duration_minutes?: number;
  order_index: number;
}

export const lessonsService = {
  async list(moduleId: string): Promise<Lesson[]> {
    const res = await api.get<Lesson[]>(`/modules/${moduleId}/lessons/`);
    return res.data;
  },

  async getById(moduleId: string, lessonId: string): Promise<Lesson> {
    const res = await api.get<Lesson>(`/modules/${moduleId}/lessons/${lessonId}`);
    return res.data;
  },

  async create(moduleId: string, data: LessonInput): Promise<Lesson> {
    const res = await api.post<Lesson>(`/modules/${moduleId}/lessons/`, data);
    return res.data;
  },

  async update(moduleId: string, lessonId: string, data: Partial<LessonInput>): Promise<Lesson> {
    const res = await api.put<Lesson>(`/modules/${moduleId}/lessons/${lessonId}`, data);
    return res.data;
  },

  async remove(moduleId: string, lessonId: string): Promise<void> {
    await api.delete(`/modules/${moduleId}/lessons/${lessonId}`);
  },
};
