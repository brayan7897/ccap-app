import { UserX } from "lucide-react";

interface Props {
	/** Optional extra Tailwind classes on the wrapper */
	className?: string;
}

/**
 * Shown in any page/section that requires an active account.
 * The backend returns 403 for inactive users on protected endpoints.
 */
export function InactiveAccountBanner({ className = "" }: Props) {
	return (
		<div
			className={`relative flex items-start gap-4 overflow-hidden rounded-2xl border border-border bg-card pl-7 pr-5 py-5 ${className}`}>
			<span className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />
			<UserX className="h-5 w-5 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
			<div>
				<p className="font-semibold text-foreground text-sm">
					Cuenta pendiente de activación
				</p>
				<p className="text-xs text-muted-foreground mt-1 leading-relaxed">
					Tu cuenta aún no ha sido activada por un administrador. Cuando sea
					activada recibirás una notificación y podrás acceder a todo el
					contenido de la plataforma.
				</p>
			</div>
		</div>
	);
}
