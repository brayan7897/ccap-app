import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

// ─── Cookie helpers (browser-only) ───────────────────────────────────────────
// The Edge middleware cannot read localStorage, so we mirror the token in a
// plain cookie that travels with every request.

const COOKIE_NAME = "ccap-auth-token";

/** Write the JWT into a first-party cookie readable by Next.js middleware. */
export function setAuthCookie(token: string) {
  if (typeof document === "undefined") return;
  // 7-day expiry — adjust to match your API's token lifetime
  const maxAge = 60 * 60 * 24 * 7;
  document.cookie = `${COOKIE_NAME}=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

/** Remove the JWT cookie on logout. */
export function clearAuthCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}

// ─── Store ────────────────────────────────────────────────────────────────────

interface AuthState {
  user: User | null;
  token: string | null;

  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  /** Store token in localStorage, cookie, and state */
  login: (token: string, user: User) => void;
  /** Clear token and user from state, localStorage and cookie */
  logout: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),

      login: (token, user) => {
        set({ token, user });
        setAuthCookie(token);
      },

      logout: () => {
        set({ token: null, user: null });
        clearAuthCookie();
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token");
        }
      },

      isAuthenticated: () => !!get().token,
      isAdmin: () => get().user?.role_name === "admin",
    }),
    {
      name: "ccap-auth",
      partialize: (s) => ({ token: s.token, user: s.user }),
      onRehydrateStorage: () => (state) => {
        // Keep localStorage and cookie in sync on rehydration
        if (state?.token && typeof window !== "undefined") {
          localStorage.setItem("access_token", state.token);
          setAuthCookie(state.token);
        }
      },
    }
  )
);

