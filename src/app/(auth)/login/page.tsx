import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
	return (
		<div>
			{/* Header */}
			<div className="space-y-1 mb-6">
				<h1 className="text-xl font-bold text-foreground tracking-tight">
					Bienvenido de vuelta
				</h1>
				<p className="text-sm text-muted-foreground">
					Ingresa tus credenciales para acceder a tu cuenta.
				</p>
			</div>

			<LoginForm />
		</div>
	);
}
