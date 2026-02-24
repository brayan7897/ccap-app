import { api } from "@/lib/api";
import type { User } from "@/types";
import type { LoginInput, RegisterInput } from "../schemas/auth.schema";

export interface AuthTokens {
  access_token: string;
  token_type: string;
}

export const authService = {
  /** Login and return JWT tokens */
  async login(data: LoginInput): Promise<AuthTokens> {
    // FastAPI OAuth2 expects form-urlencoded for /token endpoint
    const form = new URLSearchParams();
    form.append("username", data.email);
    form.append("password", data.password);
    const res = await api.post<AuthTokens>("/auth/token", form, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
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

  /** Persist token in localStorage */
  saveToken(token: string) {
    if (typeof window !== "undefined") localStorage.setItem("access_token", token);
  },

  /** Remove token on logout */
  clearToken() {
    if (typeof window !== "undefined") localStorage.removeItem("access_token");
  },
};
