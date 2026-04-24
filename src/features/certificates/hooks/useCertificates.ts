"use client";

import { useQuery } from "@tanstack/react-query";
import { certificatesService } from "../services/certificates.service";

/** Verify a certificate by its code (public — no auth needed) */
export function useVerifyCertificate(code: string | null) {
  return useQuery({
    queryKey: ["certificates", "verify", code],
    queryFn: () => certificatesService.verifyByCode(code!),
    enabled: !!code,
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
}

/** Fetch a certificate by its UUID (public — no auth needed) */
export function useCertificateById(id: string | null) {
  return useQuery({
    queryKey: ["certificates", "id", id],
    queryFn: () => certificatesService.getById(id!),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
}
