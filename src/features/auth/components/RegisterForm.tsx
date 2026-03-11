"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
	Eye,
	EyeOff,
	Loader2,
	Mail,
	Lock,
	User,
	FileText,
	Phone,
} from "lucide-react";
import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import { useRegister } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function RegisterForm() {
	const [showPassword, setShowPassword] = useState(false);
	const { mutate: register_, isPending } = useRegister();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) as any });

	return (
		<div className="space-y-6">
			<form
				onSubmit={handleSubmit((data) => register_(data))}
				className="space-y-4">
				{/* Name Row */}
				<div className="grid grid-cols-2 gap-3">
					<div className="space-y-2">
						<Label htmlFor="first_name">Nombre</Label>
						<div className="relative">
							<User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								id="first_name"
								placeholder="Juan"
								className="pl-10 h-11"
								{...register("first_name")}
							/>
						</div>
						{errors.first_name && (
							<p className="text-xs text-destructive font-medium">
								{errors.first_name.message}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="last_name">Apellido</Label>
						<div className="relative">
							<User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								id="last_name"
								placeholder="Pérez"
								className="pl-10 h-11"
								{...register("last_name")}
							/>
						</div>
						{errors.last_name && (
							<p className="text-xs text-destructive font-medium">
								{errors.last_name.message}
							</p>
						)}
					</div>
				</div>

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
					<Label htmlFor="password">Contraseña</Label>
					<div className="relative">
						<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							id="password"
							type={showPassword ? "text" : "password"}
							placeholder="Mínimo 6 caracteres"
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

				{/* Document Row */}
				<div className="grid grid-cols-5 gap-3">
					<div className="col-span-2 space-y-2">
						<Label htmlFor="document_type">Tipo doc.</Label>
						<div className="relative">
							<FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<select
								id="document_type"
								{...register("document_type")}
								className="flex h-11 w-full rounded-md border border-input bg-background pl-10 pr-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] appearance-none cursor-pointer dark:bg-input/30">
								<option value="DNI">DNI</option>
								<option value="PASSPORT">Pasaporte</option>
								<option value="RUC">RUC</option>
							</select>
						</div>
					</div>
					<div className="col-span-3 space-y-2">
						<Label htmlFor="document_number">Nro. documento</Label>
						<Input
							id="document_number"
							placeholder="12345678"
							className="h-11"
							{...register("document_number")}
						/>
						{errors.document_number && (
							<p className="text-xs text-destructive font-medium">
								{errors.document_number.message}
							</p>
						)}
					</div>
				</div>

				{/* Phone (optional) */}
				<div className="space-y-2">
					<Label htmlFor="phone_number">
						Teléfono{" "}
						<span className="text-muted-foreground font-normal">
							(opcional)
						</span>
					</Label>
					<div className="relative">
						<Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							id="phone_number"
							type="tel"
							placeholder="+51 999 999 999"
							className="pl-10 h-11"
							{...register("phone_number")}
						/>
					</div>
				</div>

				{/* role_id: omitido del formulario — el backend asigna rol estudiante por defecto */}
				{/* TODO: cargar desde /api/v1/roles/ cuando ese endpoint exista */}

				{/* Terms */}
				<p className="text-xs text-muted-foreground leading-relaxed">
					Al crear tu cuenta, aceptas nuestros{" "}
					<Link
						href="/terms"
						className="font-semibold text-primary hover:text-primary/80 underline underline-offset-2">
						Términos de Servicio
					</Link>{" "}
					y{" "}
					<Link
						href="/privacy"
						className="font-semibold text-primary hover:text-primary/80 underline underline-offset-2">
						Política de Privacidad
					</Link>
					.
				</p>

				{/* Submit Button */}
				<Button
					type="submit"
					className="w-full h-11 font-bold"
					disabled={isPending}>
					{isPending ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin" />
							Creando cuenta...
						</>
					) : (
						"Crear cuenta"
					)}
				</Button>
			</form>

			{/* Divider */}
			<div className="relative">
				<Separator />
				<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
					o regístrate con
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

			{/* Login Link */}
			<p className="text-center text-sm text-muted-foreground">
				¿Ya tienes cuenta?{" "}
				<Link
					href="/login"
					className="font-bold text-primary hover:text-primary/80 transition-colors">
					Inicia sesión
				</Link>
			</p>
		</div>
	);
}
