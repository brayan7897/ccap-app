import { api } from "@/lib/api";
import { enrollmentsService } from "@/features/enrollments/services/enrollments.service";
import type { Enrollment, Certificate, Course } from "@/types";

export interface EnrollmentWithCourse extends Enrollment {
  course?: Course;
}

export interface CertificateWithCourse extends Certificate {
  course?: Course;
}

export const dashboardService = {
  async getMyEnrollments(): Promise<EnrollmentWithCourse[]> {
    const [enrollments, coursesRes] = await Promise.all([
      enrollmentsService.listMy(0, 50),
      api.get<Course[]>("/courses/", { params: { skip: 0, limit: 10 } }),
    ]);
    const courses = coursesRes.data;
    return enrollments.map((e) => ({
      ...e,
      course: courses.find((c) => c.id === e.course_id),
    }));
  },

  async getMyCertificates(): Promise<CertificateWithCourse[]> {
    const [certsRes, coursesRes] = await Promise.all([
      api.get<Certificate[]>("/certificates/my"),
      api.get<Course[]>("/courses/", { params: { skip: 0, limit: 100 } }),
    ]);
    const courses = coursesRes.data;
    return certsRes.data.map((cert) => ({
      ...cert,
      course: courses.find((c) => c.id === cert.course_id),
    }));
  },
};