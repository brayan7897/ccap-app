"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { coursesService } from "../services/courses.service";
import { enrollmentsService } from "@/features/enrollments/services/enrollments.service";
import { useEnrollmentsStore } from "@/store/enrollments-store";

export const courseKeys = {
  all:    () => ["courses"] as const,
  list:   (skip: number, limit: number) => ["courses", "list", skip, limit] as const,
  detail: (id: string) => ["courses", id] as const,
};

export function useCourses(skip = 0, limit = 20) {
  return useQuery({
    queryKey: courseKeys.list(skip, limit),
    queryFn:  () => coursesService.list(skip, limit),
  });
}

export function useCourse(slug: string) {
  return useQuery({
    queryKey: courseKeys.detail(slug),
    queryFn:  () => coursesService.getBySlug(slug),
    enabled:  !!slug,
  });
}

export function useEnroll() {
  const qc = useQueryClient();
  const addEnrollment = useEnrollmentsStore((s) => s.addEnrollment);

  return useMutation({
    mutationFn: (courseId: string) => enrollmentsService.enroll(courseId),
    onSuccess: (enrollment) => {
      addEnrollment(enrollment);
      toast.success("¡Te has inscrito al curso!");
      qc.invalidateQueries({ queryKey: courseKeys.all() });
      qc.invalidateQueries({ queryKey: ["enrollments", "me"] });
    },
    onError: () => toast.error("Error al inscribirte. Intenta de nuevo."),
  });
}
