import { api } from "@/lib/api";
import type { AdminUser, AdminStats } from "@/types";

export const adminService = {
  /** List users pending activation */
  async getPendingUsers(skip = 0, limit = 50): Promise<AdminUser[]> {
    const res = await api.get<AdminUser[]>("/admin/users/pending", { params: { skip, limit } });
    return res.data;
  },

  /** List all users with optional active filter */
  async getUsers(params?: {
    skip?: number;
    limit?: number;
    is_active?: boolean;
  }): Promise<AdminUser[]> {
    const res = await api.get<AdminUser[]>("/admin/users", { params });
    return res.data;
  },

  /** Activate or deactivate a user */
  async setActive(userId: string, isActive: boolean): Promise<AdminUser> {
    const res = await api.patch<AdminUser>(`/admin/users/${userId}/activate`, {
      is_active: isActive,
    });
    return res.data;
  },

  /** Assign a role to a user */
  async setRole(userId: string, roleId: string): Promise<AdminUser> {
    const res = await api.patch<AdminUser>(`/admin/users/${userId}/role`, null, {
      params: { role_id: roleId },
    });
    return res.data;
  },

  /** Platform statistics */
  async getStats(): Promise<AdminStats> {
    const res = await api.get<AdminStats>("/admin/stats");
    return res.data;
  },
};
