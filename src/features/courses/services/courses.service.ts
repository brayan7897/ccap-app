import { api } from "@/lib/api";
import type { Course, CourseDetail, CourseLevel } from "@/types";

export interface EnrollResponse {
  student_id: string;
  course_id: string;
  message: string;
}

export interface CourseCreateInput {
  title: string;
  slug: string;
  instructor_id: string;
  category_id: string | null;
  short_description?: string;
  description?: string;
  course_level?: CourseLevel;
  course_type?: "FREE" | "PAID";
  price?: number | null;
  requirements?: string[];
  what_you_will_learn?: string[];
  tags?: string[];
}

export interface CourseUpdateInput {
  title?: string;
  slug?: string;
  short_description?: string;
  description?: string;
  course_level?: CourseLevel;
  course_type?: "FREE" | "PAID";
  price?: number | null;
  requirements?: string[];
  what_you_will_learn?: string[];
  tags?: string[];
  category_id?: string | null;
  is_published?: boolean;
}

export const coursesService = {
  async list(skip = 0, limit = 20, categorySlug?: string, q?: string, sort_by?: string, sort_order?: "asc" | "desc"): Promise<Course[]> {
    // Clamp to safe bounds to prevent unintended large queries
    const safeSkip = Math.max(0, Math.floor(skip));
    const safeLimit = Math.min(Math.max(1, Math.floor(limit)), 100);
    const params: any = { skip: safeSkip, limit: safeLimit };
    if (categorySlug) params.category_slug = categorySlug;
    if (q) params.q = q;
    if (sort_by) params.sort_by = sort_by;
    if (sort_order) params.sort_order = sort_order;
    const res = await api.get("/courses/", { params });
    const raw: unknown = res.data;
    // Handle both plain array and paginated wrapper ({ items: [...] } or { data: [...] })
    if (Array.isArray(raw)) return raw as Course[];
    if (raw && typeof raw === "object") {
      const obj = raw as Record<string, unknown>;
      if (Array.isArray(obj.items)) return obj.items as Course[];
      if (Array.isArray(obj.data)) return obj.data as Course[];
    }
    return [];
  },

  async getById(courseId: string): Promise<Course> {
    const res = await api.get<Course>(`/courses/${courseId}`);
    return res.data;
  },

  /** Returns a CourseDetail with nested modules and lessons */
  async getBySlug(slug: string): Promise<CourseDetail> {
    const res = await api.get<CourseDetail>(`/courses/slug/${slug}`);
    return res.data;
  },

  async create(data: CourseCreateInput): Promise<Course> {
    const res = await api.post<Course>("/courses/", data);
    return res.data;
  },

  async update(courseId: string, data: CourseUpdateInput): Promise<Course> {
    const res = await api.put<Course>(`/courses/${courseId}`, data);
    return res.data;
  },

  /** Enroll a student in a course via the courses endpoint */
  async enroll(courseId: string, studentId: string): Promise<EnrollResponse> {
    const res = await api.post<EnrollResponse>(`/courses/${courseId}/enroll`, {
      student_id: studentId,
    });
    return res.data;
  },
};
