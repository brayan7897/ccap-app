"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { loginSchema, type LoginInput } from "../schemas/auth.schema";
import { useLogin } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
	const { mutate: login, isPending } = useLogin();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

	return (
		<form onSubmit={handleSubmit((data) => login(data))} className="space-y-4">
			<div className="space-y-1">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					type="email"
					placeholder="tu@email.com"
					{...register("email")}
				/>
				{errors.email && (
					<p className="text-sm text-destructive">{errors.email.message}</p>
				)}
			</div>

			<div className="space-y-1">
				<Label htmlFor="password">Contraseña</Label>
				<Input
					id="password"
					type="password"
					placeholder="••••••••"
					{...register("password")}
				/>
				{errors.password && (
					<p className="text-sm text-destructive">{errors.password.message}</p>
				)}
			</div>

			<Button type="submit" className="w-full" disabled={isPending}>
				{isPending ? "Ingresando..." : "Iniciar sesión"}
			</Button>

			<p className="text-center text-sm text-muted-foreground">
				¿No tienes cuenta?{" "}
				<Link href="/register" className="underline hover:text-foreground">
					Regístrate
				</Link>
			</p>
		</form>
	);
}
