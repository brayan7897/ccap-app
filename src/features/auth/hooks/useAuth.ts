"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { authService } from "../services/auth.service";
import { useAuthStore } from "@/store/auth-store";
import { useEnrollmentsStore } from "@/store/enrollments-store";
import type { LoginInput, RegisterInput } from "../schemas/auth.schema";

export const USER_QUERY_KEY = ["user", "me"] as const;

/** Extracts a user-facing message from an Axios API error */
function getApiErrorMessage(error: unknown, fallback: string): string {
  const axiosError = error as AxiosError<{ detail: string | { msg: string }[] }>;
  const detail = axiosError?.response?.data?.detail;
  if (!detail) return fallback;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => e.msg).join(", ");
  return fallback;
}

/** Maps raw Google token error messages to user-friendly Spanish strings */
function getGoogleErrorMessage(error: unknown): string {
  const raw = getApiErrorMessage(error, "");
  if (raw.toLowerCase().includes("too early") || raw.toLowerCase().includes("clock")) {
    return "El reloj de tu computadora está desincronizado. Sincroniza la hora del sistema e intenta de nuevo.";
  }
  if (raw.toLowerCase().includes("expired") || raw.toLowerCase().includes("expirado")) {
    return "La sesión de Google expiró. Intenta de nuevo.";
  }
  if (raw.toLowerCase().includes("invalid") || raw.toLowerCase().includes("inválido")) {
    return "Token de Google inválido. Intenta iniciar sesión de nuevo.";
  }
  return raw || "Error al iniciar sesión con Google. Intenta de nuevo.";
}

/** Returns the authenticated user from /users/me, or undefined when not logged in */
export function useUser() {
  // Read token reactively from the store (not from localStorage directly,
  // which is non-reactive and can cause stale closure / infinite render issues).
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: () => authService.me(),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
}

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
    onSuccess: async (tokens) => {
      authService.saveToken(tokens.access_token);
      const user = await authService.me();
      useAuthStore.getState().login(tokens.access_token, user);
      queryClient.setQueryData(USER_QUERY_KEY, user);
      toast.success(`¡Bienvenido de vuelta, ${user.first_name}!`);
      // Read ?from= safely inside the callback (browser-only, no Suspense needed)
      // Security: validate that the redirect is a relative path to prevent open-redirect attacks.
      // Reject absolute URLs (http://...), protocol-relative URLs (//...) and anything
      // that doesn't start with a single "/".
      const params = new URLSearchParams(window.location.search);
      const raw = params.get("next") ?? params.get("from") ?? "";
      const destination =
        raw.startsWith("/") && !raw.startsWith("//") ? raw : "/dashboard";
      router.push(destination);
    },
    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "Credenciales incorrectas. Verifica tu email y contraseña.")
      );
    },
  });
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterInput) => authService.register(data),
    onSuccess: () => {
      toast.success("¡Cuenta creada! Ahora puedes iniciar sesión.");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "Error al crear la cuenta. Intenta de nuevo.")
      );
    },
  });
}

export function useGoogleLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credential: string) => authService.googleLogin(credential),
    onSuccess: async (tokens) => {
      authService.saveToken(tokens.access_token);
      const user = await authService.me();
      useAuthStore.getState().login(tokens.access_token, user);
      queryClient.setQueryData(USER_QUERY_KEY, user);
      toast.success(`¡Bienvenido, ${user.first_name}!`);
      const params = new URLSearchParams(window.location.search);
      const destination = params.get("from") || "/dashboard";
      router.push(destination);
    },
    onError: (error) => {
      toast.error(getGoogleErrorMessage(error));
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  /**
   * Performs a clean logout:
   * 1. Calls POST /auth/logout so the backend invalidates the session in Redis + PostgreSQL.
   * 2. Clears the local Zustand store, React Query cache, and cookies.
   * 3. Redirects to the homepage.
   *
   * If the API call fails (e.g. the token is already invalid), the local state
   * is cleaned up anyway so the user is never left in a stuck state.
   */
  return async () => {
    try {
      // Best-effort: notify the backend. May fail if the session was already
      // force-terminated (e.g. user logged in from another device).
      await authService.logout();
    } catch {
      // Silent — the important part is the local cleanup below.
    } finally {
      authService.clearToken();
      useAuthStore.getState().logout();
      // Clear enrollment store so stale data is never visible to the next user
      useEnrollmentsStore.getState().setEnrollments([]);
      useEnrollmentsStore.getState().setProgress([]);
      queryClient.removeQueries({ queryKey: USER_QUERY_KEY });
      toast.info("Sesión cerrada.");
      router.push("/");
    }
  };
}

/**
 * Logs out ALL active sessions for the user (useful after a suspected
 * account compromise). Calls POST /auth/logout/all on the backend.
 */
export function useLogoutAll() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return async () => {
    try {
      await authService.logoutAll();
    } catch {
      // Continue with local cleanup even if the request fails
    } finally {
      authService.clearToken();
      useAuthStore.getState().logout();
      useEnrollmentsStore.getState().setEnrollments([]);
      useEnrollmentsStore.getState().setProgress([]);
      queryClient.removeQueries({ queryKey: USER_QUERY_KEY });
      toast.success("Todas las sesiones han sido cerradas.");
      router.push("/login");
    }
  };
}

/** Requests course access for the authenticated user (NONE/REJECTED → PENDING) */
export function useRequestAccess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      // Defense-in-depth: verify required profile fields before calling the API.
      // This catches cases where the mutation is triggered programmatically
      // bypassing the UI guard in the dashboard.
      const user = useAuthStore.getState().user;
      if (!user?.document_number?.trim() || !user?.phone_number?.trim()) {
        return Promise.reject(
          new Error("Debes completar tu perfil (documento y teléfono) antes de solicitar acceso.")
        );
      }
      return authService.requestAccess();
    },
    onSuccess: (updatedUser) => {
      useAuthStore.getState().setUser(updatedUser);
      queryClient.setQueryData(USER_QUERY_KEY, updatedUser);
      toast.success("Solicitud enviada. Te notificaremos cuando sea aprobada.");
    },
    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "No se pudo enviar la solicitud. Intenta de nuevo.")
      );
    },
  });
}

/** Updates the authenticated user's profile details (PUT /users/me) */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      first_name?: string;
      last_name?: string;
      phone_number?: string;
      avatar_url?: string;
      bio?: string;
      professional_career?: string;
    }) => authService.updateMe(data),
    onSuccess: (updatedUser) => {
      useAuthStore.getState().setUser(updatedUser);
      queryClient.setQueryData(USER_QUERY_KEY, updatedUser);
      toast.success("Perfil actualizado correctamente.");
    },
    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "No se pudo actualizar el perfil. Intenta de nuevo.")
      );
    },
  });
}

/** Registers the user's document — one-time action (PATCH /users/me/document) */
export function useUpdateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { document_type: string; document_number: string }) => {
      return authService.updateDocument(data);
    },
    onSuccess: (updatedUser) => {
      useAuthStore.getState().setUser(updatedUser);
      queryClient.setQueryData(USER_QUERY_KEY, updatedUser);
      toast.success("Documento registrado correctamente.");
    },
    onError: (error) => {
      const axiosErr = error as import("axios").AxiosError<{ detail: string }>;
      toast.error(
        getApiErrorMessage(axiosErr, "No se pudo registrar el documento. Intenta de nuevo.")
      );
    },
  });
}

/** Changes the authenticated user's password (requires current password) */
export function useChangePassword() {
  return useMutation({
    mutationFn: (data: { current_password: string; new_password: string }) =>
      authService.changePassword(data),
    onSuccess: () => {
      toast.success("Contraseña actualizada correctamente.");
    },
    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "No se pudo cambiar la contraseña. Verifica tu contraseña actual.")
      );
    },
  });
}

export function useCheckEmail() {
  return useMutation({
    mutationFn: (email: string) => authService.checkEmail(email),
  });
}

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (email: string) => authService.requestPasswordReset(email),
    onSuccess: () => {
      toast.success("Solicitud enviada. El administrador revisará tu petición.");
    },
    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "Error al enviar la solicitud. Intenta más tarde.")
      );
    },
  });
}
