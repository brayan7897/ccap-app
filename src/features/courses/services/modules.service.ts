import { api } from "@/lib/api";
import type { Module } from "@/types";

export interface ModuleInput {
  title: string;
  description?: string;
  order_index: number;
}

export const modulesService = {
  async list(courseId: string): Promise<Module[]> {
    const res = await api.get<Module[]>(`/courses/${courseId}/modules/`);
    return res.data;
  },

  async getById(courseId: string, moduleId: string): Promise<Module> {
    const res = await api.get<Module>(`/courses/${courseId}/modules/${moduleId}`);
    return res.data;
  },

  async create(courseId: string, data: ModuleInput): Promise<Module> {
    const res = await api.post<Module>(`/courses/${courseId}/modules/`, data);
    return res.data;
  },

  async update(courseId: string, moduleId: string, data: Partial<ModuleInput>): Promise<Module> {
    const res = await api.put<Module>(`/courses/${courseId}/modules/${moduleId}`, data);
    return res.data;
  },

  async remove(courseId: string, moduleId: string): Promise<void> {
    await api.delete(`/courses/${courseId}/modules/${moduleId}`);
  },
};
