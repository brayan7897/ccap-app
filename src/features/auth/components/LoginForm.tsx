"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { loginSchema, type LoginInput } from "../schemas/auth.schema";
import { useLogin } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const { mutate: login, isPending } = useLogin();

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
				<Button
					type="button"
					variant="outline"
					className="h-11 font-semibold"
					disabled>
					<svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
						<path
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
							fill="#4285F4"
						/>
						<path
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							fill="#34A853"
						/>
						<path
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							fill="#FBBC05"
						/>
						<path
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							fill="#EA4335"
						/>
					</svg>
					Google
				</Button>
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
