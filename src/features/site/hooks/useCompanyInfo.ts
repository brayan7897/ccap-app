/**
 * useCompanyInfo — fetches the public company info (phone, email, social links)
 * from GET /public/company-info (no auth required).
 */
"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface CompanyInfo {
  id: string;
  phone_number: string | null;
  email: string | null;
  address: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  twitter_url: string | null;
  youtube_url: string | null;
  linkedin_url: string | null;
  tiktok_url: string | null;
  website_url: string | null;
  updated_at: string;
}

export function useCompanyInfo() {
  return useQuery<CompanyInfo | null>({
    queryKey: ["public", "company-info"],
    queryFn: async () => {
      const res = await api.get<CompanyInfo>("/public/company-info");
      return res.data ?? null;
    },
    staleTime: 10 * 60 * 1000, // 10 min — rarely changes
    gcTime: 30 * 60 * 1000,
  });
}
