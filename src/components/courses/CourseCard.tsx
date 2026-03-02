import Image from "next/image";
import Link from "next/link";
import {
	BookOpen,
	Clock,
	Signal,
	Layers,
	ArrowRight,
	Users,
} from "lucide-react";
import type { CourseLevel } from "@/types";

/* ── Props ─────────────────────────────────────────────────────────────────── */
export interface CourseCardProps {
	id: string;
	slug: string;
	title: string;
	short_description?: string | null;
	thumbnail_url?: string | null;
	course_level: CourseLevel;
	instructor_name?: string;
	category_name?: string;
	tags?: string[];
	total_lessons?: number;
	total_duration?: string; // e.g. "40 horas"
	enrolled_count?: number;
}

/* ── Helpers ───────────────────────────────────────────────────────────────── */
const LEVEL_CONFIG: Record<
	CourseLevel,
	{ label: string; color: string; bg: string }
> = {
	BASIC: {
		label: "Básico",
		color: "text-emerald-700 dark:text-emerald-400",
		bg: "bg-emerald-500/10",
	},
	INTERMEDIATE: {
		label: "Intermedio",
		color: "text-amber-700 dark:text-amber-400",
		bg: "bg-amber-500/10",
	},
	ADVANCED: {
		label: "Avanzado",
		color: "text-rose-700 dark:text-rose-400",
		bg: "bg-rose-500/10",
	},
};

/* ── Component ─────────────────────────────────────────────────────────────── */
export function CourseCard({
	id,
	slug,
	title,
	short_description,
	thumbnail_url,
	course_level,
	instructor_name,
	category_name,
	tags = [],
	total_lessons,
	total_duration,
	enrolled_count,
}: CourseCardProps) {
	const level = LEVEL_CONFIG[course_level] ?? LEVEL_CONFIG.BASIC;

	return (
		<Link
			href={`/courses/${slug}`}
			className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 h-full">
			{/* Thumbnail */}
			<div className="relative aspect-video w-full overflow-hidden bg-muted">
				{thumbnail_url ? (
					<Image
						src={thumbnail_url}
						alt={title}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-500"
					/>
				) : (
					<div className="flex h-full items-center justify-center text-muted-foreground">
						<BookOpen className="h-10 w-10" />
					</div>
				)}

				{/* Category badge */}
				{category_name && (
					<div className="absolute top-3 left-3 px-2.5 py-1 bg-background/80 backdrop-blur-md rounded-md text-[10px] font-bold text-muted-foreground uppercase tracking-wider border border-border/50">
						{category_name}
					</div>
				)}

				{/* Level pill */}
				<div
					className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${level.bg} ${level.color}`}>
					{level.label}
				</div>
			</div>

			{/* Content */}
			<div className="p-5 flex flex-col flex-1">
				{/* Title */}
				<h3 className="font-bold text-foreground text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-2">
					{title}
				</h3>

				{/* Short description */}
				{short_description && (
					<p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4">
						{short_description}
					</p>
				)}

				{/* Instructor */}
				{instructor_name && (
					<p className="text-xs text-muted-foreground mb-4">
						Por{" "}
						<span className="font-semibold text-foreground">
							{instructor_name}
						</span>
					</p>
				)}

				{/* Tags */}
				{tags.length > 0 && (
					<div className="flex flex-wrap gap-1.5 mb-4">
						{tags.slice(0, 3).map((tag) => (
							<span
								key={tag}
								className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-muted text-muted-foreground">
								{tag}
							</span>
						))}
					</div>
				)}

				{/* Stats row */}
				<div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
					{total_duration && (
						<div className="flex items-center gap-1">
							<Clock className="w-3.5 h-3.5" />
							<span>{total_duration}</span>
						</div>
					)}
					{total_lessons != null && (
						<div className="flex items-center gap-1">
							<Layers className="w-3.5 h-3.5" />
							<span>{total_lessons} lecciones</span>
						</div>
					)}
					{enrolled_count != null && (
						<div className="flex items-center gap-1">
							<Users className="w-3.5 h-3.5" />
							<span>{enrolled_count.toLocaleString()}</span>
						</div>
					)}
				</div>

				{/* Footer: Subscription badge + CTA */}
				<div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
					{/* Subscription placeholder — will link to external plan page */}
					<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold/10 text-gold text-[11px] font-bold">
						<Signal className="w-3.5 h-3.5" />
						Plan Suscripción
					</span>

					<span className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors">
						Ver curso
						<ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
					</span>
				</div>
			</div>
		</Link>
	);
}
