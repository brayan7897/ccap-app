import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
	return (
		<div>
			{/* Header */}
			<div className="space-y-1 mb-6">
				<h1 className="text-xl font-bold text-foreground tracking-tight">
					Crea tu cuenta
				</h1>
				<p className="text-sm text-muted-foreground">
					Completa tus datos para comenzar tu formación profesional.
				</p>
			</div>

			<RegisterForm />
		</div>
	);
}
