// Course-feature-specific types (re-exports from global types)
export type {
  Course,
  CourseDetail,
  Module,
  ModuleWithLessons,
  Lesson,
  LessonSummary,
  Category,
  CourseLevel,
  LessonType,
} from "@/types";

export interface CourseFilters {
  level?: string;
  categoryId?: string;
  search?: string;
}
