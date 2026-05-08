import { api } from "@/lib/api";
import type { AuthTokens, User } from "@/types";
import type { LoginInput, RegisterInput } from "../schemas/auth.schema";


export const authService = {
  /** Login with email + password → JWT tokens */
  async login(data: LoginInput): Promise<AuthTokens> {
    const res = await api.post<AuthTokens>("/auth/login", {
      email: data.email,
      password: data.password,
    });
    return res.data;
  },

  /** Check if email is registered */
  async checkEmail(email: string): Promise<{ exists: boolean }> {
    const res = await api.post<{ exists: boolean }>("/auth/check-email", { email });
    return res.data;
  },

  /** Request password reset */
  async requestPasswordReset(email: string): Promise<{ detail: string }> {
    const res = await api.post<{ detail: string }>("/auth/password-reset/request", { email });
    return res.data;
  },

  /** Register a new user */
  async register(data: RegisterInput): Promise<User> {
    const res = await api.post<User>("/users/", data);
    return res.data;
  },

  /** Get the currently authenticated user */
  async me(): Promise<User> {
    const res = await api.get<User>("/users/me");
    return res.data;
  },

  /** Update current user profile (PUT /users/me) — no document fields */
  async updateMe(data: {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    avatar_url?: string;
    bio?: string;
  }): Promise<User> {
    const res = await api.put<User>("/users/me", data);
    return res.data;
  },

  /** Register user document — one-time action (PATCH /users/me/document) */
  async updateDocument(data: {
    document_type: string;
    document_number: string;
  }): Promise<User> {
    const res = await api.patch<User>("/users/me/document", data);
    return res.data;
  },

  /** Change password (requires current password for verification) */
  async changePassword(data: {
    current_password: string;
    new_password: string;
  }): Promise<void> {
    await api.post("/auth/change-password", data);
  },

  /** Sign in / sign up via Google ID Token */
  async googleLogin(credential: string): Promise<AuthTokens> {
    const res = await api.post<AuthTokens>("/auth/google", { credential });
    return res.data;
  },

  /** Logout current session */
  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },

  /** Logout all active sessions */
  async logoutAll(): Promise<void> {
    await api.post("/auth/logout/all");
  },

  /** Persist token in localStorage */
  saveToken(token: string) {
    if (typeof window !== "undefined") localStorage.setItem("access_token", token);
  },

  /** Remove token on logout */
  clearToken() {
    if (typeof window !== "undefined") localStorage.removeItem("access_token");
  },

  /** Request course access — transitions course_access from NONE/REJECTED to PENDING */
  async requestAccess(): Promise<User> {
    const res = await api.post<User>("/users/me/request-access");
    return res.data;
  },
};
