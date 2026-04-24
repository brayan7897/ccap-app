"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard.service";
import { useEnrollmentsStore } from "@/store/enrollments-store";
import { useAuthStore } from "@/store/auth-store";

export function useMyEnrollments() {
  const setEnrollments = useEnrollmentsStore((s) => s.setEnrollments);
  const token = useAuthStore((s) => s.token);
  const isActive = useAuthStore((s) => s.user?.is_active !== false);

  const query = useQuery({
    queryKey: ["enrollments", "me"],
    queryFn: () => dashboardService.getMyEnrollments(),
    staleTime: 5 * 60 * 1000,
    retry: false,
    enabled: !!token && isActive,
  });

  // Sync fetched enrollments into the Zustand store
  useEffect(() => {
    if (query.data) {
      setEnrollments(query.data);
    }
  }, [query.data, setEnrollments]);

  return query;
}

export function useMyCertificates() {
  const token = useAuthStore((s) => s.token);
  const isActive = useAuthStore((s) => s.user?.is_active !== false);
  return useQuery({
    queryKey: ["certificates", "me"],
    queryFn: () => dashboardService.getMyCertificates(),
    staleTime: 5 * 60 * 1000,
    retry: false,
    enabled: !!token && isActive,
  });
}
