"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import type { AxiosError } from "axios";
import {
	Eye,
	EyeOff,
	Loader2,
	Mail,
	Lock,
	User,
	FileText,
	Phone,
	Briefcase,
	CheckCircle2,
	XCircle,
} from "lucide-react";
import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import { useRegister } from "../hooks/useAuth";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { UnclaimedAccountNotice } from "./UnclaimedAccountNotice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";


type FieldState = "idle" | "error" | "success";

const inputClass = (state: FieldState, extra = "") => {
	const base = `h-12 text-base transition-all rounded-xl ${extra}`;
	if (state === "error")
		return `${base} border-destructive focus-visible:ring-destructive/30 bg-destructive/5`;
	if (state === "success")
		return `${base} border-emerald-500 focus-visible:ring-emerald-500/30 bg-emerald-500/5`;
	return `${base} focus-visible:border-secondary focus-visible:ring-secondary/20`;
};

function FieldFeedback({ state, error }: { state: FieldState; error?: string }) {
	if (state === "error" && error)
		return (
			<p className="text-xs text-destructive font-medium flex items-center gap-1 mt-1">
				<XCircle className="h-3 w-3 shrink-0" />
				{error}
			</p>
		);
	return null;
}

function StatusIcon({ state }: { state: FieldState }) {
	if (state === "error") return <XCircle className="h-4 w-4 text-destructive absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />;
	if (state === "success") return <CheckCircle2 className="h-4 w-4 text-emerald-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />;
	return null;
}

export function RegisterForm() {
	const [showPassword, setShowPassword] = useState(false);
	const { mutate: register_, isPending, isError, error, variables, reset: resetRegister } = useRegister();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, dirtyFields },
	} = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
		mode: "onChange",
	});

	const { onChange: onDocChange, ...docRegister } = register("document_number");
	const { onChange: onPhoneChange, ...phoneRegister } = register("phone_number");

	const fieldState = (name: keyof RegisterInput): FieldState => {
		if (!dirtyFields[name]) return "idle";
		return errors[name] ? "error" : "success";
	};

	const docType = watch("document_type");
	const docPlaceholder =
		docType === "DNI"
			? "12345678"
			: docType === "CE"
				? "000123456"
				: docType === "RUC"
					? "20123456789"
					: "AB123456";

	const axiosError = error as AxiosError<{ detail: string; type?: string }> | null;
	const isUnclaimedConflict = isError && axiosError?.response?.data?.type === "UnclaimedAccountExistsError";

	if (isUnclaimedConflict) {
		return (
			<UnclaimedAccountNotice
				documentNumber={variables?.document_number}
				onRetry={() => resetRegister()}
			/>
		);
	}

	return (
		<div className="space-y-8">
			<form
				onSubmit={handleSubmit((data) => register_(data))}
				className="space-y-7"
				noValidate>

				{/* Name Row */}
				<div className="grid grid-cols-2 gap-3">
					<div className="space-y-2">
						<Label htmlFor="reg-first_name" className="text-sm font-semibold ml-1">Nombre</Label>
						<div className="relative">
							<User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
							<Input
								id="reg-first_name"
								type="text"
								placeholder="Juan"
								autoComplete="given-name"
								className={inputClass(fieldState("first_name"), "pl-11 pr-8")}
								{...register("first_name")}
							/>
							<StatusIcon state={fieldState("first_name")} />
						</div>
						<FieldFeedback state={fieldState("first_name")} error={errors.first_name?.message} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="reg-last_name" className="text-sm font-semibold ml-1">Apellido</Label>
						<div className="relative">
							<User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
							<Input
								id="reg-last_name"
								type="text"
								placeholder="Pérez"
								autoComplete="family-name"
								className={inputClass(fieldState("last_name"), "pl-11 pr-8")}
								{...register("last_name")}
							/>
							<StatusIcon state={fieldState("last_name")} />
						</div>
						<FieldFeedback state={fieldState("last_name")} error={errors.last_name?.message} />
					</div>
				</div>

				{/* Email */}
				<div className="space-y-2">
					<Label htmlFor="reg-email" className="text-sm font-semibold ml-1">Correo electrónico</Label>
					<div className="relative">
						<Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
						<Input
							id="reg-email"
							type="email"
							placeholder="tu@email.com"
							autoComplete="email"
							className={inputClass(fieldState("email"), "pl-11 pr-8")}
							{...register("email")}
						/>
						<StatusIcon state={fieldState("email")} />
					</div>
					<FieldFeedback state={fieldState("email")} error={errors.email?.message} />
				</div>

				{/* Password */}
				<div className="space-y-2">
					<Label htmlFor="reg-password" className="text-sm font-semibold ml-1">Contraseña</Label>
					<div className="relative">
						<Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
						<Input
							id="reg-password"
							type={showPassword ? "text" : "password"}
							placeholder="Mínimo 8 caracteres, mayúscula y número"
							autoComplete="new-password"
							className={inputClass(fieldState("password"), "pl-11 pr-11")}
							{...register("password")}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10">
							{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
						</button>
					</div>
					{fieldState("password") === "error" && errors.password?.message && (
						<p className="text-xs text-destructive font-medium flex items-center gap-1 mt-1">
							<XCircle className="h-3 w-3 shrink-0" />
							{errors.password.message}
						</p>
					)}
					{fieldState("password") === "success" && (
						<p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-1">
							<CheckCircle2 className="h-3 w-3 shrink-0" />
							Contraseña segura
						</p>
					)}
				</div>

				{/* Document Row */}
				<div className="grid grid-cols-5 gap-3">
					<div className="col-span-2 space-y-2">
						<Label htmlFor="reg-document_type" className="text-sm font-semibold ml-1">Tipo doc.</Label>
						<div className="relative">
							<FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
							<select
								id="reg-document_type"
								{...register("document_type")}
								className="flex h-12 w-full rounded-xl border border-input bg-background pl-11 pr-3 py-1 text-sm shadow-xs transition-all outline-none focus-visible:border-secondary focus-visible:ring-secondary/20 focus-visible:ring-[3px] appearance-none cursor-pointer dark:bg-input/30">
								<option value="DNI">DNI</option>
								<option value="CE">C.E.</option>
								<option value="PASAPORTE">Pasaporte</option>
								<option value="RUC">RUC</option>
							</select>
						</div>
					</div>
					<div className="col-span-3 space-y-2">
						<Label htmlFor="reg-document_number" className="text-sm font-semibold ml-1">Nro. documento</Label>
						<div className="relative">
							<Input
								id="reg-document_number"
								type="text"
								placeholder={docPlaceholder}
								className={inputClass(fieldState("document_number"), "pr-8")}
								{...docRegister}
								onChange={(e) => {
									if (docType === "DNI" || docType === "CE" || docType === "RUC") {
										e.target.value = e.target.value.replace(/\D/g, "");
									} else if (docType === "PASAPORTE") {
										e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
									}
									onDocChange(e);
								}}
							/>
							<StatusIcon state={fieldState("document_number")} />
						</div>
						{fieldState("document_number") === "error" && errors.document_number?.message && (
							<p className="text-xs text-destructive font-medium flex items-center gap-1 mt-1">
								<XCircle className="h-3 w-3 shrink-0" />
								{errors.document_number.message}
							</p>
						)}
						{fieldState("document_number") === "idle" && (
							<p className="text-xs text-muted-foreground mt-1 ml-1">
								{docType === "DNI" && "8 dígitos numéricos"}
								{docType === "CE" && "9 dígitos numéricos"}
								{docType === "PASAPORTE" && "6–12 caracteres"}
								{docType === "RUC" && "11 dígitos, empieza con 10, 15, 16, 17 o 20"}
							</p>
						)}
					</div>
				</div>

				{/* Phone (optional) */}
				<div className="space-y-2">
					<Label htmlFor="reg-phone_number" className="text-sm font-semibold ml-1">
						Teléfono{" "}
						<span className="text-muted-foreground font-normal">(opcional)</span>
					</Label>
					<div className="relative">
						<Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
						<Input
							id="reg-phone_number"
							type="tel"
							placeholder="+51 999 999 999"
							autoComplete="tel"
							className={inputClass(fieldState("phone_number"), "pl-11 pr-8")}
							{...phoneRegister}
							onChange={(e) => {
								e.target.value = e.target.value.replace(/[^\d\s\-\+\(\)]/g, "");
								onPhoneChange(e);
							}}
						/>
						<StatusIcon state={fieldState("phone_number")} />
					</div>
					<FieldFeedback state={fieldState("phone_number")} error={errors.phone_number?.message} />
				</div>

				{/* Profesión / Carrera (opcional) */}
				<div className="space-y-2">
					<Label htmlFor="reg-professional_career" className="text-sm font-semibold ml-1">
						Profesión o Carrera{" "}
						<span className="text-muted-foreground font-normal">(opcional)</span>
					</Label>
					<div className="relative">
						<Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
						<Input
							id="reg-professional_career"
							type="text"
							placeholder="Ej. Contabilidad, Arquitectura..."
							className={inputClass(fieldState("professional_career"), "pl-11 pr-8")}
							{...register("professional_career")}
						/>
						<StatusIcon state={fieldState("professional_career")} />
					</div>
					<FieldFeedback state={fieldState("professional_career")} error={errors.professional_career?.message} />
				</div>

				{/* Terms */}
				<p className="text-xs text-muted-foreground leading-relaxed ml-1">
					Al crear tu cuenta, aceptas nuestros{" "}
					<Link
						href="/terms"
						className="font-semibold text-secondary hover:text-secondary/80 underline underline-offset-2">
						Términos de Servicio
					</Link>{" "}
					y{" "}
					<Link
						href="/privacy"
						className="font-semibold text-secondary hover:text-secondary/80 underline underline-offset-2">
						Política de Privacidad
					</Link>
					.
				</p>

				{/* Submit Button */}
				<Button
					type="submit"
					className="w-full h-12 text-base font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg shadow-secondary/20 rounded-xl"
					disabled={isPending}>
					{isPending ? (
						<>
							<Loader2 className="h-5 w-5 animate-spin mr-2" />
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
			<div className="flex flex-col gap-3">
				<GoogleLoginButton />
			</div>

			{/* Login Link */}
			<p className="text-center text-sm md:text-base text-muted-foreground pt-2">
				¿Ya tienes cuenta?{" "}
				<Link
					href="/login"
					className="font-bold text-secondary hover:text-secondary/80 transition-colors">
					Inicia sesión
				</Link>
			</p>
		</div>
	);
}
