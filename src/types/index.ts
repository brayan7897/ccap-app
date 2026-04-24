// ── Shared TypeScript interfaces ─────────────────────────────────────────────
// Aligned with the ccap-api backend models (api_routes.md).

export type DocumentType = "DNI" | "PASSPORT" | "RUC";
export type CourseLevel = "BASIC" | "INTERMEDIATE" | "ADVANCED";
export type LessonType = "VIDEO" | "PDF" | "TEXT";
export type EnrollmentStatus = "ACTIVE" | "COMPLETED" | "CANCELLED";
export type CourseAccess = "NONE" | "PENDING" | "APPROVED" | "REJECTED";
export type CourseType = "FREE" | "PAID";
export type ResourceType = "MAIN" | "SECONDARY";
export type ResourceFormat = "VIDEO" | "PDF" | "DOCUMENT" | "LINK" | "IMAGE";

// ── Auth ──────────────────────────────────────────────────────────────────────
export interface AuthTokens {
  access_token: string;
  token_type: string;
}

// ── RBAC ─────────────────────────────────────────────────────────────────────
export interface Permission {
  id: string;
  code: string;
  name: string;
  description: string | null;
  created_at: string;
}

/** Returned by GET /roles/ (list) */
export interface RoleListItem {
  id: string;
  name: string;
  description: string | null;
  is_system_role: boolean;
  permission_count: number;
  created_at: string;
}

/** Returned by GET /roles/{id} and POST/PUT /roles */
export interface RoleDetail {
  id: string;
  name: string;
  description: string | null;
  is_system_role: boolean;
  permissions: Permission[];
  created_at: string;
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
  role_name: string;
  is_active: boolean;
  course_access: CourseAccess;
}

/** Returned by admin endpoints — includes created_at */
export interface AdminUser extends User {
  created_at: string;
}

/** GET /admin/stats */
export interface AdminStats {
  total_users: number;
  active_users: number;
  pending_users: number;
}

// ── Categories ────────────────────────────────────────────────────────────────
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

// ── Courses ──────────────────────────────────────────────────────────────────
export interface Course {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  thumbnail_url: string | null;
  course_level: CourseLevel;
  course_type: CourseType;
  price: number | null;
  requirements: string[];
  what_you_will_learn: string[];
  tags: string[];
  is_published: boolean;
  instructor_id: string;
  category_id: string | null;
  // Runtime fields returned by the API (may be absent on minimal list endpoints)
  instructor?: { first_name: string; last_name: string; bio: string | null; avatar_url: string | null };
  category?: { name: string; slug: string };
  total_lessons?: number;
  total_duration_seconds?: number;
  enrolled_count?: number;
  updated_at?: string;
  modules?: ModuleWithLessons[];
}

/** GET /courses/slug/{slug} — includes nested modules & lessons */
export interface CourseDetail extends Course {
  modules: ModuleWithLessons[];
}

// ── Modules ───────────────────────────────────────────────────────────────────
export interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  order_index: number;
  created_at: string;
}

/** Module with embedded lessons (used in CourseDetail) */
export interface ModuleWithLessons extends Omit<Module, "created_at"> {
  lessons: LessonSummary[];
}

// ── Lessons ───────────────────────────────────────────────────────────────────
/** Lesson summary embedded inside a module (CourseDetail) */
export interface LessonSummary {
  id: string;
  title: string;
  lesson_type: LessonType;
  duration_minutes: number | null;
  order_index: number;
}

/** Full lesson response from /modules/{id}/lessons */
export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  lesson_type: LessonType;
  drive_file_id: string | null;
  duration_minutes: number | null;
  order_index: number;
  created_at: string;
}

// ── Enrollments ───────────────────────────────────────────────────────────────
export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  /** Included by GET /enrollments/my */
  course_title?: string;
  status: EnrollmentStatus;
  progress_percentage: number;
  enrolled_at: string;
}

/** POST /enrollments/progress response */
export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  last_position_seconds: number;
  watch_time_seconds: number;
  is_completed: boolean;
  completed_at: string | null;
  last_accessed_at: string;
}

// ── Certificate ───────────────────────────────────────────────────────────────
export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  certificate_code: string;
  drive_file_id: string | null;
  pdf_url: string | null;
  html_content: string | null;
  issued_at: string;
}

// ── Resources ────────────────────────────────────────────────────────────────
export interface Resource {
  id: string;
  lesson_id: string;
  title: string;
  resource_type: ResourceType;
  resource_format: ResourceFormat;
  order_index: number;
  drive_file_id: string | null;
  external_url: string | null;
  created_at: string;
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

// ── Notifications ─────────────────────────────────────────────────────────────
/** Backend-aligned notification type enum */
export type NotificationType =
  | "SYSTEM"
  | "COURSE_UPDATE"
  | "ACHIEVEMENT"
  | "PROMOTION"
  | "REMINDER";

/** Returned by GET /notifications/inbox — unified directed + global */
export interface UserNotificationResponse {
  id: string;              // pivot id (use for mark-read / delete)
  notification_id: string;
  type: NotificationType;
  title: string;
  message: string;
  action_url: string | null;
  is_read: boolean;
  is_deleted: boolean;
  is_global: boolean;
  read_at: string | null;
  created_at: string;
}

/** Returned by GET /notifications/inbox/unread-count */
export interface UnreadCountResponse {
  unread_count: number;
}

/** Returned by PATCH /notifications/inbox/read-all */
export interface MarkAllReadResponse {
  marked_read: number;
}

/** Returned by DELETE /notifications/inbox/{pivot_id} */
export interface DeleteNotificationResponse {
  deleted: boolean;
}

// ── Legacy local notification types (kept for backward compat) ────────────────
/** @deprecated use UserNotificationResponse */
export type LegacyNotificationType = "enrollment" | "certificate" | "announcement" | "reminder";

/** @deprecated use UserNotificationResponse */
export interface Notification {
  id: string;
  type: LegacyNotificationType;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}
