"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Loader2, Send } from "lucide-react";
import { useRequestEmailChange } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from "@/types";

const emailChangeSchema = z.object({
	new_email: z.string().email("Ingresa un correo electrónico válido"),
});

type EmailChangeInput = z.infer<typeof emailChangeSchema>;

interface EmailChangeCardProps {
	user?: User;
}

/**
 * Self-service email-change request card for the profile page.
 *
 * The change is not applied immediately — it's queued for admin review
 * (mirrors the password-reset request flow), so a hijacked session can't
 * silently redirect the account to an attacker-controlled email.
 */
export function EmailChangeCard({ user }: EmailChangeCardProps) {
	const requestEmailChange = useRequestEmailChange();
	const isGoogleLinked = user?.auth_provider === "google";

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<EmailChangeInput>({
		resolver: zodResolver(emailChangeSchema),
	});

	const onSubmit = (data: EmailChangeInput) => {
		requestEmailChange.mutate(data.new_email, {
			onSuccess: () => reset(),
		});
	};

	return (
		<div className="bg-card border border-border shadow-md rounded-3xl p-6 lg:p-8 relative overflow-hidden">
			<div className="absolute top-0 left-0 -ml-16 -mt-16 w-48 h-48 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />

			<div className="flex items-center gap-2 mb-1 relative z-10">
				<Mail className="w-4 h-4 text-muted-foreground" />
				<h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
					Cambiar correo
				</h2>
			</div>

			{isGoogleLinked ? (
				<p className="text-xs text-muted-foreground relative z-10">
					Inicias sesión con Google — tu correo se sincroniza con tu cuenta de
					Google y no se puede cambiar aquí.
				</p>
			) : (
				<>
					<p className="text-xs text-muted-foreground mb-6 relative z-10">
						Tu correo actual es <strong>{user?.email}</strong>. El cambio no se
						aplica de inmediato: queda pendiente de revisión por un
						administrador, como medida de seguridad.
					</p>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-5 relative z-10"
						noValidate>
						<div className="space-y-1.5">
							<Label
								htmlFor="new_email"
								className="text-xs font-semibold uppercase tracking-wide">
								Correo nuevo
							</Label>
							<Input
								id="new_email"
								type="email"
								placeholder="nuevo@correo.com"
								autoComplete="email"
								className={errors.new_email ? "border-destructive bg-destructive/5" : ""}
								{...register("new_email")}
							/>
							{errors.new_email && (
								<p className="text-xs text-destructive font-medium mt-1">
									{errors.new_email.message}
								</p>
							)}
						</div>

						<div className="pt-2 flex justify-end">
							<Button
								type="submit"
								disabled={requestEmailChange.isPending}
								className="h-11 px-8 rounded-xl font-bold">
								{requestEmailChange.isPending ? (
									<>
										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
										Enviando...
									</>
								) : (
									<>
										<Send className="w-4 h-4 mr-2" />
										Enviar solicitud
									</>
								)}
							</Button>
						</div>
					</form>
				</>
			)}
		</div>
	);
}
