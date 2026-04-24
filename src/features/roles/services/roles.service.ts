import { api } from "@/lib/api";
import type { RoleListItem, RoleDetail, Permission } from "@/types";

export interface RoleInput {
  name: string;
  description?: string;
  is_system_role?: boolean;
}

export const rolesService = {
  async list(): Promise<RoleListItem[]> {
    const res = await api.get<RoleListItem[]>("/roles/");
    return res.data;
  },

  async getById(roleId: string): Promise<RoleDetail> {
    const res = await api.get<RoleDetail>(`/roles/${roleId}`);
    return res.data;
  },

  async create(data: RoleInput): Promise<RoleDetail> {
    const res = await api.post<RoleDetail>("/roles/", data);
    return res.data;
  },

  async update(roleId: string, data: Pick<RoleInput, "name" | "description">): Promise<RoleDetail> {
    const res = await api.put<RoleDetail>(`/roles/${roleId}`, data);
    return res.data;
  },

  async remove(roleId: string): Promise<void> {
    await api.delete(`/roles/${roleId}`);
  },

  // ── Permissions ──────────────────────────────────────────────────────────────

  async listPermissions(): Promise<Permission[]> {
    const res = await api.get<Permission[]>("/roles/permissions/all");
    return res.data;
  },

  async createPermission(data: {
    code: string;
    name: string;
    description?: string;
  }): Promise<Permission> {
    const res = await api.post<Permission>("/roles/permissions", data);
    return res.data;
  },

  async assignPermission(roleId: string, permissionId: string): Promise<RoleDetail> {
    const res = await api.post<RoleDetail>(`/roles/${roleId}/permissions`, {
      permission_id: permissionId,
    });
    return res.data;
  },

  async removePermission(roleId: string, permissionId: string): Promise<void> {
    await api.delete(`/roles/${roleId}/permissions/${permissionId}`);
  },
};
