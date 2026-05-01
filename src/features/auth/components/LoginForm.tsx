"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
	Eye,
	EyeOff,
	Loader2,
	Mail,
	Lock,
	CheckCircle2,
	XCircle,
} from "lucide-react";
import { loginSchema, type LoginInput } from "../schemas/auth.schema";
import { useLogin, useUser } from "../hooks/useAuth";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function LoginForm() {
	const router = useRouter();
	const { data: user } = useUser();
	const [showPassword, setShowPassword] = useState(false);
	const { mutate: login, isPending } = useLogin();

	useEffect(() => {
		if (user) {
			const params = new URLSearchParams(window.location.search);
			const raw = params.get("from") ?? "";
			const destination =
				raw.startsWith("/") && !raw.startsWith("//") ? raw : "/dashboard";
			router.replace(destination);
		}
	}, [user, router]);

	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields },
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
	});

	const getFieldState = (fieldName: keyof LoginInput) => {
		const hasError = !!errors[fieldName];
		const isDirty = !!dirtyFields[fieldName];
		if (!isDirty) return "idle";
		return hasError ? "error" : "success";
	};

	const inputClass = (state: "idle" | "error" | "success") => {
		const base = "pl-10 h-11 transition-colors pr-10";
		if (state === "error")
			return `${base} border-destructive focus-visible:ring-destructive/30 bg-destructive/5`;
		if (state === "success")
			return `${base} border-emerald-500 focus-visible:ring-emerald-500/30 bg-emerald-500/5`;
		return base;
	};

	return (
		<div className="space-y-8">
			<form
				onSubmit={handleSubmit((data) => login(data))}
				className="space-y-6"
				noValidate>
				{/* Email */}
				<div className="space-y-1.5">
					<Label htmlFor="login-email">Correo electrónico</Label>
					<div className="relative">
						<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
						<Input
							id="login-email"
							type="email"
							placeholder="tu@email.com"
							autoComplete="email"
							className={inputClass(getFieldState("email"))}
							{...register("email")}
						/>
						<div className="absolute right-3 top-1/2 -translate-y-1/2">
							{getFieldState("email") === "error" && (
								<XCircle className="h-4 w-4 text-destructive" />
							)}
							{getFieldState("email") === "success" && (
								<CheckCircle2 className="h-4 w-4 text-emerald-500" />
							)}
						</div>
					</div>
					{errors.email && (
						<p className="text-xs text-destructive font-medium flex items-center gap-1">
							<XCircle className="h-3 w-3 shrink-0" />
							{errors.email.message}
						</p>
					)}
				</div>

				{/* Password */}
				<div className="space-y-1.5">
					<div className="flex items-center justify-between">
						<Label htmlFor="login-password">Contraseña</Label>
						<Link
							href="/forgot-password"
							className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
							¿Olvidaste tu contraseña?
						</Link>
					</div>
					<div className="relative">
						<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
						<Input
							id="login-password"
							type={showPassword ? "text" : "password"}
							placeholder="••••••••"
							autoComplete="current-password"
							className={inputClass(getFieldState("password"))}
							{...register("password")}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
							{showPassword ? (
								<EyeOff className="h-4 w-4" />
							) : (
								<Eye className="h-4 w-4" />
							)}
						</button>
					</div>
					{errors.password && (
						<p className="text-xs text-destructive font-medium flex items-center gap-1">
							<XCircle className="h-3 w-3 shrink-0" />
							{errors.password.message}
						</p>
					)}
				</div>

				{/* Submit Button */}
				<Button
					type="submit"
					className="w-full h-11 font-bold"
					disabled={isPending}>
					{isPending ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin" />
							Ingresando...
						</>
					) : (
						"Iniciar sesión"
					)}
				</Button>
			</form>

			{/* Divider */}
			<div className="relative">
				<Separator />
				<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
					o continúa con
				</span>
			</div>

			{/* Social Login Buttons */}
			<div className="flex flex-col gap-3">
				<GoogleLoginButton />
			</div>

			{/* Register Link */}
			<p className="text-center text-sm text-muted-foreground">
				¿No tienes cuenta?{" "}
				<Link
					href="/register"
					className="font-bold text-primary hover:text-primary/80 transition-colors">
					Crea tu cuenta gratis
				</Link>
			</p>
		</div>
	);
}
