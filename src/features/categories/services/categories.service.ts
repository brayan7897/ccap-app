import { api } from "@/lib/api";
import type { Category } from "@/types";

export interface CategoryInput {
  name: string;
  slug: string;
  description?: string;
}

export const categoriesService = {
  async list(skip = 0, limit = 50): Promise<Category[]> {
    const res = await api.get<Category[]>("/categories/", { params: { skip, limit } });
    return res.data;
  },

  async getById(categoryId: string): Promise<Category> {
    const res = await api.get<Category>(`/categories/${categoryId}`);
    return res.data;
  },

  async create(data: CategoryInput): Promise<Category> {
    const res = await api.post<Category>("/categories/", data);
    return res.data;
  },

  async update(categoryId: string, data: Partial<CategoryInput>): Promise<Category> {
    const res = await api.put<Category>(`/categories/${categoryId}`, data);
    return res.data;
  },

  async remove(categoryId: string): Promise<void> {
    await api.delete(`/categories/${categoryId}`);
  },
};
