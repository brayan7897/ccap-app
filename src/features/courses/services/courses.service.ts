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
  async list(skip = 0, limit = 20): Promise<Course[]> {
    const res = await api.get<Course[]>("/courses/", { params: { skip, limit } });
    return res.data;
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
