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
		color: "text-white",
		bg: "bg-emerald-600",
	},
	INTERMEDIATE: {
		label: "Intermedio",
		color: "text-white",
		bg: "bg-amber-600",
	},
	ADVANCED: {
		label: "Avanzado",
		color: "text-white",
		bg: "bg-rose-600",
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
			className="group flex flex-col bg-card border border-border/60 rounded-[0.5rem] overflow-hidden hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(var(--primary-rgb),0.15)] h-full relative">
			{/* Thumbnail */}
			<div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
				{thumbnail_url ? (
					<>
						<Image
							src={thumbnail_url}
							alt={title}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className="object-cover transition-transform duration-700 group-hover:scale-105"
						/>
					</>
				) : (
					<div className="flex h-full items-center justify-center text-muted-foreground bg-muted/50">
						<BookOpen className="h-12 w-12 opacity-50" />
					</div>
				)}

				{/* Category badge */}
				{category_name && (
					<div className="absolute top-4 left-4 px-3 py-1 bg-background/90 backdrop-blur-md rounded-md text-[10px] font-bold text-foreground/80 uppercase tracking-widest border border-border/50 shadow-sm z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
						{category_name}
					</div>
				)}

				{/* Level pill */}
				<div
					className={`absolute top-4 right-4 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-sm z-10 transition-transform duration-300 group-hover:-translate-y-0.5 ${level.bg} ${level.color}`}>
					{level.label}
				</div>
			</div>

			{/* Content */}
			<div className="p-5 md:p-6 flex flex-col flex-1 relative z-10 bg-card">
				{/* Title */}
				<h3 className="font-bold text-foreground text-[1.15rem] md:text-[1.25rem] leading-[1.3] line-clamp-3 transition-colors duration-300 group-hover:text-primary mb-2.5">
					{title}
				</h3>

				{/* Short description */}
				{short_description && (
					<p className="text-[13px] md:text-[14px] text-muted-foreground leading-relaxed line-clamp-3 mb-4 font-medium">
						{short_description}
					</p>
				)}

				{/* Instructor */}
				{instructor_name && (
					<p className="text-[13px] text-muted-foreground mb-4">
						Por{" "}
						<span className="font-bold text-foreground">
							{instructor_name}
						</span>
					</p>
				)}

				{/* Tags */}
				{tags.length > 0 && (
					<div className="flex flex-wrap gap-2 mb-5 mt-auto">
						{tags.slice(0, 3).map((tag) => (
							<span
								key={tag}
								className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-muted/80 text-muted-foreground border border-border/40 group-hover:border-primary/20 transition-colors">
								{tag}
							</span>
						))}
					</div>
				)}

				{/* Stats row */}
				<div className="flex items-center gap-3 text-[13px] text-muted-foreground mb-5 font-medium flex-wrap">
					{total_duration && (
						<div className="flex items-center gap-1.5">
							<Clock className="w-4 h-4 text-primary/70" />
							<span>{total_duration}</span>
						</div>
					)}
					{total_lessons != null && (
						<div className="hidden sm:flex items-center gap-1.5">
							<Layers className="w-4 h-4 text-primary/70" />
							<span>{total_lessons} lec.</span>
						</div>
					)}
					{enrolled_count != null && (
						<div className="flex items-center gap-1.5">
							<Users className="w-4 h-4 text-primary/70" />
							<span>{enrolled_count.toLocaleString("en-US")}</span>
						</div>
					)}
				</div>

				{/* Footer: Subscription badge + CTA */}
				<div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
					{/* Subscription placeholder — will link to external plan page */}
					<span className="inline-flex items-center gap-1.5 px-3 object-contain py-1.5 rounded-xl bg-gold/10 text-gold text-xs font-bold ring-1 ring-gold/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:bg-gold/15 transition-colors">
						<Signal className="w-3.5 h-3.5" />
						Suscripción
					</span>

					<span className="flex items-center gap-1 text-[13px] font-bold text-primary group-hover:text-primary transition-colors">
						Ver más
						<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
					</span>
				</div>
			</div>
		</Link>
	);
}
