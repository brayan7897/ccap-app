"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "../services/auth.service";
import type { LoginInput, RegisterInput } from "../schemas/auth.schema";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
    onSuccess: (tokens) => {
      authService.saveToken(tokens.access_token);
      toast.success("¡Bienvenido de vuelta!");
      router.push("/");
    },
    onError: () => {
      toast.error("Credenciales incorrectas. Verifica tu email y contraseña.");
    },
  });
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterInput) => authService.register(data),
    onSuccess: () => {
      toast.success("Cuenta creada. Ahora puedes iniciar sesión.");
      router.push("/login");
    },
    onError: () => {
      toast.error("Error al crear la cuenta. Intenta de nuevo.");
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
