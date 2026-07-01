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

/**
 * Mobile: compact centered column (icon → value → label) inside a 3-col grid.
 * Desktop (lg+): horizontal ledger row (icon · label · value) inside a flex-col container.
 * CSS order swaps value/label position between the two orientations without DOM duplication.
 */
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
			<div className="flex flex-col items-center py-3 gap-2 lg:flex-row lg:items-center lg:gap-3.5 lg:px-5 lg:py-4 animate-pulse">
				<div className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg bg-muted shrink-0" />
				{/* value placeholder */}
				<div className="order-2 lg:order-last h-5 w-7 bg-muted rounded lg:h-6 lg:w-8" />
				{/* label placeholder */}
				<div className="order-3 lg:order-2 h-2 w-12 bg-muted rounded lg:flex-1" />
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center py-3 gap-1 lg:flex-row lg:items-center lg:gap-3.5 lg:px-5 lg:py-4">
			{/* Icon */}
			<div
				className={`w-8 h-8 lg:w-9 lg:h-9 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
				<Icon className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${color}`} />
			</div>

			{/* Value — order-2 on mobile (below icon, prominent), order-last on desktop (right edge) */}
			<div className="order-2 lg:order-last flex items-baseline gap-1 shrink-0">
				<span className={`text-xl font-black tabular-nums ${color}`}>
					{value}
				</span>
				{trend && (
					<span className="text-[11px] text-emerald-500 font-semibold">{trend}</span>
				)}
			</div>

			{/* Label — order-3 on mobile (below value, small), order-2 on desktop (flex-1 middle) */}
			<p
				className={`order-3 lg:order-2 text-[10px] lg:text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center lg:text-left lg:flex-1 lg:min-w-0 lg:truncate`}>
				{label}
			</p>
		</div>
	);
}
