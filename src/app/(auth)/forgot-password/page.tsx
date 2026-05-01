import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
	return (
		<div>
			{/* Header */}
			<div className="space-y-1 mb-6">
				<h1 className="text-xl font-bold text-foreground tracking-tight">
					Recuperar contraseña
				</h1>
				<p className="text-sm text-muted-foreground">
					Ingresa tu correo electrónico y enviaremos una solicitud al administrador para restablecer tu contraseña.
				</p>
			</div>

			<ForgotPasswordForm />
		</div>
	);
}
