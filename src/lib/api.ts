import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15_000,
});

// ── Request interceptor: inject JWT ──────────────────────────────────────────
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor: handle 401 / session invalidation ─────────────────
//
// The API returns two kinds of 401:
//   1. Login/auth errors (email+password wrong) — no token was present,
//      we should NOT redirect or clear anything.
//   2. SessionInvalid — the token existed but was revoked by a new login on
//      another device. We must clear state and redirect with an informative toast.
//
// We use `error.config.url` to avoid triggering the logout flow on /auth/login
// itself, and `error.response.data.type` to detect the specific error kind.

type ApiErrorBody = {
  detail: string;
  type?: string;
};

/** Clears all auth state from localStorage, Zustand and cookies, then redirects. */
function forceLogout(message: string) {
  if (typeof window === "undefined") return;

  // 1. Clear localStorage token
  localStorage.removeItem("access_token");

  // 2. Clear the auth cookie used by Next.js middleware
  document.cookie = "ccap-auth-token=; path=/; max-age=0; SameSite=Lax";

  // 3. Clear Zustand auth store (lazy import avoids circular deps at module load)
  import("@/store/auth-store").then(({ useAuthStore }) => {
    useAuthStore.getState().logout();
  });

  // 4. Clear React Query cache for the user query
  import("@/components/providers/QueryProvider").then(({ getQueryClient }) => {
    getQueryClient()?.removeQueries({ queryKey: ["user", "me"] });
  });

  // 5. Show the user-facing toast before navigating away
  toast.error(message, { duration: 5000 });

  // 6. Redirect — use replace so the login page is the new history entry
  setTimeout(() => {
    window.location.replace("/login");
  }, 300); // small delay so toast renders before page unloads
}

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorBody>) => {
    const status = error.response?.status;
    const errorType = error.response?.data?.type;
    const requestUrl = error.config?.url ?? "";

    // Only act on 401 responses
    if (status === 401 && typeof window !== "undefined") {
      const hadToken = !!localStorage.getItem("access_token");

      // ── Case 1: Session was explicitly invalidated by the API ────────────
      // This happens when the user logs in from another device/browser.
      if (errorType === "SessionInvalid") {
        forceLogout(
          "Tu sesión fue cerrada porque iniciaste sesión en otro dispositivo."
        );
        return Promise.reject(error);
      }

      // ── Case 2: Token present but rejected (expired JWT, revoked token) ──
      // Do NOT trigger this for auth endpoints (/auth/login, /auth/google)
      // since those return 401 for wrong credentials — not session issues.
      const isAuthEndpoint =
        requestUrl.includes("/auth/login") ||
        requestUrl.includes("/auth/google") ||
        requestUrl.includes("/auth/register");

      if (hadToken && !isAuthEndpoint) {
        forceLogout("Tu sesión expiró. Por favor, inicia sesión de nuevo.");
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
