import Link from "next/link";
import {
	BookOpen,
	Clock,
	Layers,
	ArrowRight,
	Users,
	CheckCircle,
} from "lucide-react";
import type { CourseLevel } from "@/types";
import { useEnrollmentsStore } from "@/store/enrollments-store";
import { useAuthStore } from "@/store/auth-store";
import { SmartImage } from "@/components/ui/SmartImage";

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
	category_color?: string;
	tags?: string[];
	total_lessons?: number;
	total_duration?: string; // e.g. "40 horas"
	enrolled_count?: number;
	href?: string;
	course_type?: string;
	price?: number | null;
}

/* ── Helpers ───────────────────────────────────────────────────────────────── */
function WhatsAppIcon({ className }: { className?: string }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
			<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
		</svg>
	);
}

/* ── Component ─────────────────────────────────────────────────────────────── */
export function CourseCard({
	id,
	slug,
	title,
	short_description,
	thumbnail_url,
	instructor_name,
	category_name,
	category_color,
	tags = [],
	total_lessons,
	total_duration,
	enrolled_count,
	href,
	course_type,
	price,
}: CourseCardProps) {
	const isAuth = useAuthStore((state) => !!state.token);
	const isEnrolled = useEnrollmentsStore((state) => state.isEnrolled(id));
	const showEnrolledBadge = isAuth && isEnrolled;
	const isPaid = course_type === "PAID" && price != null;
	const ctaLabel = isPaid ? "Comprar" : "Inscribirme";

	const linkHref = href || `/courses/${slug}`;

	return (
		<Link
			href={linkHref}
			className="group flex flex-col bg-card border border-border/60 rounded-lg overflow-hidden hover:border-border hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_8px_24px_-4px_rgba(0,0,0,0.10)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_24px_-4px_rgba(0,0,0,0.40)] transition-all duration-300 hover:-translate-y-1 h-full relative w-full max-w-sm mx-auto">
			{/* Thumbnail */}
			<div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
				<SmartImage
					src={thumbnail_url}
					alt={title}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="object-cover transition-transform duration-700 group-hover:scale-105"
					fallback={
						<div className="flex h-full items-center justify-center text-muted-foreground bg-muted/50">
							<BookOpen className="h-12 w-12 opacity-50" />
						</div>
					}
				/>

				{/* Enrolled badge */}
				{showEnrolledBadge && (
					<div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm z-10 bg-ring/90 text-primary-foreground flex items-center gap-1.5 transition-transform duration-200 group-hover:-translate-y-0.5">
						<CheckCircle className="w-3.5 h-3.5" />
						Inscrito
					</div>
				)}

				{/* Category badge — fixed dark surface so it's always legible over any
				    thumbnail; category_color shows only as a small identity dot. */}
				{category_name && (
					<div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm z-10 bg-black/60 text-white transition-transform duration-200 group-hover:-translate-y-0.5">
						<span
							className="w-1.5 h-1.5 rounded-full ring-1 ring-white/50 shrink-0"
							style={{ backgroundColor: category_color || "var(--ring)" }}
						/>
						{category_name}
					</div>
				)}
			</div>

			{/* Content */}
			<div className="p-5 md:p-6 flex flex-col flex-1 relative z-10 bg-card">
				{/* Title */}
				<h3 className="font-bold text-foreground text-[1.1rem] md:text-[1.2rem] leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-ring dark:group-hover:text-secondary mb-2">
					{title}
				</h3>

				{/* Short description */}
				{short_description && (
					<p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3">
						{short_description}
					</p>
				)}

				{/* Instructor */}
				{instructor_name && (
					<p className="text-sm text-muted-foreground mb-3">
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
								className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-muted text-muted-foreground border border-border/40 group-hover:border-primary/20 dark:group-hover:border-secondary/20 transition-colors">
								{tag}
							</span>
						))}
					</div>
				)}

				{/* Stats row */}
				<div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
					{total_duration && (
						<div className="flex items-center gap-1.5">
							<Clock className="w-3.5 h-3.5 shrink-0" />
							<span>{total_duration}</span>
						</div>
					)}
					{total_lessons != null && (
						<div className="hidden sm:flex items-center gap-1.5">
							<Layers className="w-3.5 h-3.5 shrink-0" />
							<span>{total_lessons} lec.</span>
						</div>
					)}
					{enrolled_count != null && (
						<div className="flex items-center gap-1.5">
							<Users className="w-3.5 h-3.5 shrink-0" />
							<span>{enrolled_count.toLocaleString("es-PE")}</span>
						</div>
					)}
				</div>

				{/* Footer: Price + CTA — price is plain info, CTA is the one filled
				    focal action so the two don't compete for attention. */}
				<div className="mt-auto flex items-center justify-between gap-3 pt-3.5 border-t border-border/50">
					{isPaid ? (
						<span className="inline-flex items-center gap-2 min-w-0">
							<span className="font-black text-base text-foreground tabular-nums tracking-tight">
								S/. {price.toFixed(2)}
							</span>
							<span
								className="flex items-center justify-center text-emerald-600/80 dark:text-emerald-400/80 shrink-0"
								title="Pago y matrícula vía WhatsApp"
							>
								<WhatsAppIcon className="w-4 h-4" />
							</span>
						</span>
					) : (
						<span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
							Gratis
						</span>
					)}

					<span className="flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-bold bg-ring text-white dark:text-background transition-colors duration-200 group-hover:bg-ring/90 shrink-0">
						{ctaLabel}
						<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
					</span>
				</div>
			</div>
		</Link>
	);
}
