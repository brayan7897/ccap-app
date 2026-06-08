import { api } from "@/lib/api";
import type { Certificate } from "@/types";

export interface VerifyCertificateResponse {
  search_type: "document" | "certificate_code"; 
  results: VerifyCertificateItemResponse[];     
}

export interface VerifyCertificateItemResponse {
  certificate: CertificateData;
  user: UserData;
  course: CourseData;
}

export interface CertificateData {
  id: string;
  certificate_code: string;
  drive_file_id: string | null;
  pdf_url: string | null;
  html_content: string | null;
  issued_at: string;
}

export interface UserData {
  id: string;
  full_name: string | null;
}

export interface CourseData {
  id: string;
  title: string | null;
}

export const certificatesService = {
  /** GET /certificates/verify/{code_or_dni} — public, no auth required */
  async verifyByCode(code: string): Promise<VerifyCertificateResponse> {
    const res = await api.get<VerifyCertificateResponse>(`/certificates/verify/${encodeURIComponent(code)}`);
    return res.data;
  },

  /** GET /certificates/{id} — public, no auth required */
  async getById(id: string): Promise<Certificate> {
    const res = await api.get<Certificate>(`/certificates/${id}`);
    return res.data;
  },

  /** GET /certificates/my — requires authenticated user */
  async getMy(): Promise<Certificate[]> {
    const res = await api.get<Certificate[]>("/certificates/my");
    return res.data;
  },
};
