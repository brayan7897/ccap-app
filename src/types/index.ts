// ── Shared TypeScript interfaces ─────────────────────────────────────────────
// Aligned with the ccap-api backend models.

export type DocumentType = "DNI" | "PASSPORT" | "RUC";
export type CourseLevel = "BASIC" | "INTERMEDIATE" | "ADVANCED";
export type LessonType = "VIDEO" | "PDF" | "QUIZ";
export type EnrollmentStatus = "ACTIVE" | "COMPLETED" | "DROPPED";

// ── RBAC ─────────────────────────────────────────────────────────────────────
export interface Permission {
  id: string;
  code: string;
  name: string;
  description: string | null;
}

export interface Role {
  id: string;
  name: string;
  is_system_role: boolean;
  permissions: Permission[];
}

// ── User ─────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  document_type: DocumentType;
  document_number: string;
  phone_number: string | null;
  avatar_url: string | null;
  bio: string | null;
  role_id: string;
  is_active: boolean;
}

// ── Courses ──────────────────────────────────────────────────────────────────
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  thumbnail_url: string | null;
  course_level: CourseLevel;
  requirements: string[];
  what_you_will_learn: string[];
  tags: string[];
  is_published: boolean;
  instructor_id: string;
  category_id: string | null;
  modules?: Module[];
  created_at: string;
  updated_at: string;
  /* ── enriched by API (optional joins) ── */
  instructor?: Pick<User, 'id' | 'first_name' | 'last_name' | 'avatar_url'>;
  category?: Pick<Category, 'id' | 'name' | 'slug'>;
  total_lessons?: number;
  total_duration_seconds?: number;
  enrolled_count?: number;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  order_index: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  lesson_type: LessonType;
  order_index: number;
  duration_seconds: number | null;
  drive_file_id: string | null;
}

// ── Enrollment ────────────────────────────────────────────────────────────────
export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  status: EnrollmentStatus;
  progress_percentage: number;
  enrolled_at: string;
}

// ── Certificate ───────────────────────────────────────────────────────────────
export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  certificate_code: string;
  drive_file_id: string | null;
  issued_at: string;
}

// ── Pagination ────────────────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

// ── API Error ─────────────────────────────────────────────────────────────────
export interface ApiError {
  detail: string;
  status_code?: number;
}
