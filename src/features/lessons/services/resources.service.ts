import { api } from "@/lib/api";
import type { Resource } from "@/types";

export const resourcesService = {
  /**
   * List all resources for a lesson.
   * Auth: ActiveUser (Bearer token required).
   * Returns sorted: MAIN first, then SECONDARY, each group by order_index asc.
   */
  async list(lessonId: string): Promise<Resource[]> {
    const res = await api.get<Resource[]>(`/lessons/${lessonId}/resources/`);
    return res.data;
  },
};
