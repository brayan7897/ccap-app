import { api } from "@/lib/api";
import type { Certificate } from "@/types";

export const certificatesService = {
  /** GET /certificates/verify/{code_or_dni} — public, no auth required */
  async verifyByCode(code: string): Promise<Certificate[]> {
    const res = await api.get<Certificate[]>(`/certificates/verify/${encodeURIComponent(code)}`);
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
