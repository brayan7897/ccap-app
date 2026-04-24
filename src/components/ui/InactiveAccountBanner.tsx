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
			className={`flex items-start gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 ${className}`}>
			<UserX className="h-5 w-5 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
			<div>
				<p className="font-semibold text-amber-800 dark:text-amber-200 text-sm">
					Cuenta pendiente de activación
				</p>
				<p className="text-xs text-amber-700/80 dark:text-amber-300/80 mt-1 leading-relaxed">
					Tu cuenta aún no ha sido activada por un administrador. Cuando sea
					activada recibirás una notificación y podrás acceder a todo el
					contenido de la plataforma.
				</p>
			</div>
		</div>
	);
}
