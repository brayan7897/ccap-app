import type { LucideIcon } from "lucide-react";

interface Props {
	label: string;
	value: number | string;
	icon: LucideIcon;
	color: string;
	bg: string;
	trend?: string;
	loading?: boolean;
}

export function DashboardStatCard({
	label,
	value,
	icon: Icon,
	color,
	bg,
	trend,
	loading,
}: Props) {
	if (loading) {
		return (
			<div className="rounded-2xl border border-border bg-card p-6 animate-pulse">
				<div className="flex items-center gap-4">
					<div className="w-12 h-12 rounded-xl bg-muted shrink-0" />
					<div className="flex-1 space-y-2">
						<div className="h-3 bg-muted rounded w-2/3" />
						<div className="h-6 bg-muted rounded w-1/3" />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="rounded-2xl border border-border bg-card p-6 hover:shadow-md hover:border-border/80 transition-all duration-300">
			<div className="flex items-center gap-4">
				<div
					className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
					<Icon className={`w-5 h-5 ${color}`} />
				</div>
				<div className="min-w-0">
					<p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide truncate">
						{label}
					</p>
					<p className="text-2xl font-black text-foreground mt-0.5">{value}</p>
					{trend && (
						<p className="text-xs text-emerald-500 font-semibold mt-0.5">
							{trend}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
