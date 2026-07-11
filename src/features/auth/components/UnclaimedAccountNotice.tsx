"use client";

import Link from "next/link";
import { UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UnclaimedAccountNoticeProps {
	documentNumber?: string;
	onRetry: () => void;
}

/**
 * Shown instead of the register form when the submitted document belongs to an
 * existing account that an admin created (e.g. to issue a certificate) but the
 * submitted email didn't match it, so it couldn't be auto-activated. Mirrors the
 * post-submit success card in ForgotPasswordForm, with InactiveAccountBanner's
 * amber/warning tone since this isn't a success state.
 */
export function UnclaimedAccountNotice({ documentNumber, onRetry }: UnclaimedAccountNoticeProps) {
	return (
		<div className="space-y-6 text-center">
			<div className="flex justify-center">
				<div className="h-16 w-16 bg-amber-500/10 rounded-full flex items-center justify-center">
					<UserCheck className="h-8 w-8 text-amber-600 dark:text-amber-400" />
				</div>
			</div>
			<div className="space-y-2">
				<h2 className="text-xl font-bold text-foreground">Ya existe una cuenta</h2>
				<p className="text-sm text-muted-foreground">
					Ya tenemos un registro en CCAP asociado al documento
					{documentNumber ? ` ${documentNumber}` : ""} — probablemente porque un
					administrador te emitió un certificado antes de que crearas tu cuenta.
					Inicia sesión, o si no reconoces esta cuenta o no sabes tu contraseña,
					solicita ayuda al administrador.
				</p>
			</div>
			<div className="flex flex-col gap-3">
				<Button asChild className="w-full h-11 font-bold">
					<Link href="/login">Iniciar sesión</Link>
				</Button>
				<Button asChild variant="outline" className="w-full h-11 font-bold">
					<Link href="/forgot-password">Solicitar acceso al administrador</Link>
				</Button>
				<button
					type="button"
					onClick={onRetry}
					className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2">
					Volver a intentar con otros datos
				</button>
			</div>
		</div>
	);
}
