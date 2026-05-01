"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { ArrowLeft, Loader2, Mail, CheckCircle2 } from "lucide-react";
import { useCheckEmail, useRequestPasswordReset } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const forgotPasswordSchema = z.object({
	email: z.string().email("Ingresa un correo electrónico válido"),
});

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [serverError, setServerError] = useState("");
	
	const { mutateAsync: checkEmail } = useCheckEmail();
	const { mutateAsync: requestReset, isPending } = useRequestPasswordReset();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPasswordInput>({
		resolver: zodResolver(forgotPasswordSchema),
	});

	const onSubmit = async (data: ForgotPasswordInput) => {
		setServerError("");
		try {
			// Check if email exists
			const { exists } = await checkEmail(data.email);
			
			if (!exists) {
				setServerError("No encontramos ninguna cuenta con este correo electrónico.");
				return;
			}

			// If it exists, request the reset
			await requestReset(data.email);
			setIsSubmitted(true);
		} catch (error) {
			console.error(error);
			setServerError("Ocurrió un error al procesar tu solicitud. Intenta más tarde.");
		}
	};

	if (isSubmitted) {
		return (
			<div className="space-y-6 text-center">
				<div className="flex justify-center">
					<div className="h-16 w-16 bg-emerald-500/10 rounded-full flex items-center justify-center">
						<CheckCircle2 className="h-8 w-8 text-emerald-500" />
					</div>
				</div>
				<div className="space-y-2">
					<h2 className="text-xl font-bold text-foreground">Solicitud enviada</h2>
					<p className="text-sm text-muted-foreground">
						Hemos recibido tu solicitud de restablecimiento de contraseña. El administrador revisará tu petición y se pondrá en contacto contigo pronto.
					</p>
				</div>
				<Button asChild className="w-full h-11 font-bold mt-4">
					<Link href="/login">Volver al inicio de sesión</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
				{serverError && (
					<div className="p-3 text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
						{serverError}
					</div>
				)}
				
				<div className="space-y-1.5">
					<Label htmlFor="reset-email">Correo electrónico</Label>
					<div className="relative">
						<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
						<Input
							id="reset-email"
							type="email"
							placeholder="tu@email.com"
							autoComplete="email"
							className={`pl-10 h-11 ${errors.email ? "border-destructive bg-destructive/5" : ""}`}
							{...register("email")}
						/>
					</div>
					{errors.email && (
						<p className="text-xs text-destructive font-medium mt-1">
							{errors.email.message}
						</p>
					)}
				</div>

				<Button type="submit" className="w-full h-11 font-bold" disabled={isPending}>
					{isPending ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin mr-2" />
							Procesando...
						</>
					) : (
						"Recuperar contraseña"
					)}
				</Button>
			</form>

			<p className="text-center text-sm text-muted-foreground">
				¿Recordaste tu contraseña?{" "}
				<Link
					href="/login"
					className="font-bold text-primary hover:text-primary/80 transition-colors">
					Inicia sesión
				</Link>
			</p>
		</div>
	);
}
