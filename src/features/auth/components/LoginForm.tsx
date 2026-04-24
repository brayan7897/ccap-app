"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
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

	// If the user already has a valid session, redirect them away from the login page.
	// This runs client-side so it only fires when the token is actually verified.
	useEffect(() => {
		if (user) {
			const params = new URLSearchParams(window.location.search);
			const destination = params.get("from") || "/dashboard";
			router.replace(destination);
		}
	}, [user, router]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

	return (
		<div className="space-y-6">
			<form
				onSubmit={handleSubmit((data) => login(data))}
				className="space-y-5">
				{/* Email */}
				<div className="space-y-2">
					<Label htmlFor="email">Correo electrónico</Label>
					<div className="relative">
						<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							id="email"
							type="email"
							placeholder="tu@email.com"
							className="pl-10 h-11"
							{...register("email")}
						/>
					</div>
					{errors.email && (
						<p className="text-xs text-destructive font-medium">
							{errors.email.message}
						</p>
					)}
				</div>

				{/* Password */}
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<Label htmlFor="password">Contraseña</Label>
						<Link
							href="/forgot-password"
							className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
							¿Olvidaste tu contraseña?
						</Link>
					</div>
					<div className="relative">
						<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							id="password"
							type={showPassword ? "text" : "password"}
							placeholder="••••••••"
							className="pl-10 pr-10 h-11"
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
						<p className="text-xs text-destructive font-medium">
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
			<div className="grid grid-cols-2 gap-3">
				<GoogleLoginButton />
				<Button
					type="button"
					variant="outline"
					className="h-11 font-semibold"
					disabled>
					<svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
						<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
					</svg>
					X
				</Button>
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
