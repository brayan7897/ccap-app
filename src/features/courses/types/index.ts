// Course-feature-specific types (extends global types when needed)
export type { Course, Module, Lesson, Category, CourseLevel } from "@/types";

export interface CourseFilters {
  level?: string;
  categoryId?: string;
  search?: string;
}
