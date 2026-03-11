"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { coursesService } from "../services/courses.service";

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
  return useMutation({
    mutationFn: ({ courseId, userId }: { courseId: string; userId: string }) =>
      coursesService.enroll(courseId, userId),
    onSuccess: () => {
      toast.success("¡Te has inscrito al curso!");
      qc.invalidateQueries({ queryKey: courseKeys.all() });
    },
    onError: () => toast.error("Error al inscribirte. Intenta de nuevo."),
  });
}
