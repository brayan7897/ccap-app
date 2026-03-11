"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { authService } from "../services/auth.service";
import type { LoginInput, RegisterInput } from "../schemas/auth.schema";

/** Extracts a user-facing message from an Axios API error */
function getApiErrorMessage(error: unknown, fallback: string): string {
  const axiosError = error as AxiosError<{ detail: string | { msg: string }[] }>;
  const detail = axiosError?.response?.data?.detail;
  if (!detail) return fallback;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => e.msg).join(", ");
  return fallback;
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
    onSuccess: (tokens) => {
      authService.saveToken(tokens.access_token);
      toast.success("¡Bienvenido de vuelta!");
      router.push("/");
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

export function useLogout() {
  const router = useRouter();

  return () => {
    authService.clearToken();
    toast.info("Sesión cerrada.");
    router.push("/login");
  };
}
