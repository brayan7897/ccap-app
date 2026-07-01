"use client";

import { useParams } from "next/navigation";
import { useCourse } from "@/features/courses/hooks/useCourses";
import { CourseCurriculum } from "@/features/courses/components/CourseCurriculum";
import { CourseInstructor } from "@/features/courses/components/CourseInstructor";
import { CourseEnrollCard } from "@/features/courses/components/CourseEnrollCard";
import {
	Loader2,
	AlertCircle,
	CheckCircle2,
	ChevronRight,
	Home,
	Star,
	Users,
	Award,
	BookOpen,
	ClipboardList,
	Clock,
	Layers,
} from "lucide-react";
import Link from "next/link";
import { useEnrollmentsStore } from "@/store/enrollments-store";

const LEVEL_LABELS: Record<string, string> = {
	BASIC: "Básico",
	INTERMEDIATE: "Intermedio",
	ADVANCED: "Avanzado",
};

export default function DashboardCourseDetailsPage() {
	const params = useParams();
	const slug = params.slug as string;

	const { data: course, isLoading, isError, error } = useCourse(slug);
	const isEnrolled = useEnrollmentsStore((s) => s.isEnrolled(course?.id ?? ""));

	if (isLoading) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center gap-4">
				<Loader2 className="w-10 h-10 animate-spin text-ring" />
				<p className="text-muted-foreground font-medium">Cargando detalles del curso…</p>
			</div>
		);
	}

	if (isError || !course || !course.is_published) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
				<AlertCircle className="w-16 h-16 text-rose-500 mb-2" />
				<h1 className="text-2xl font-bold text-foreground">Curso no encontrado</h1>
				<p className="text-muted-foreground max-w-md">
					Lo sentimos, no pudimos cargar la información de este curso.
				</p>
				{isError && (
					<div className="bg-rose-500/10 text-rose-500 border border-rose-500/20 p-4 rounded-xl mt-2 text-sm max-w-xl text-left overflow-auto">
						<pre className="whitespace-pre-wrap">
							{error instanceof Error ? error.message : JSON.stringify(error, null, 2)}
						</pre>
					</div>
				)}
				<Link
					href="/dashboard/catalogo"
					className="mt-6 px-6 py-3 bg-ring text-white dark:text-background rounded-xl font-bold hover:bg-ring/90 transition-colors">
					Volver al Catálogo
				</Link>
			</div>
		);
	}

	const categoryColor = course.category_color || course.category?.color || "#4f46e5";
	const priceDisplay =
		course.course_type === "PAID" && course.price != null
			? `S/. ${course.price.toFixed(2)}`
			: "Gratis";
	const totalHours = course.total_duration_seconds
		? Math.round(course.total_duration_seconds / 3600)
		: null;

	// Find the enrollment in the store to get last_completed_lesson_id
	const enrollment = useEnrollmentsStore(
		(s) => s.enrollments.find((e) => e.course_id === course.id),
	);

	// Compute where to resume: next lesson after last_completed, or first lesson
	const resumeLessonId = (() => {
		const allLessons = [...(course.modules ?? [])]
			.sort((a, b) => a.order_index - b.order_index)
			.flatMap((m) => [...m.lessons].sort((a, b) => a.order_index - b.order_index));

		const lastId = enrollment?.last_completed_lesson_id;
		if (!lastId) return allLessons[0]?.id ?? null;

		const idx = allLessons.findIndex((l) => l.id === lastId);
		if (idx >= 0 && idx < allLessons.length - 1) return allLessons[idx + 1].id;
		return allLessons[0]?.id ?? null;
	})();

	return (
		<div className="w-full flex flex-col relative pb-44 xl:pb-0">

				{/* ── Breadcrumb — desktop only, mobile uses bottom nav ─────────────── */}
			<div className="hidden xl:block bg-muted/10 border-b border-border/20">
				<div className="container mx-auto px-4 lg:px-8 py-3">
					<nav className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap font-medium">
						<Link href="/dashboard" className="hover:text-ring transition-colors flex items-center gap-1.5">
							<Home className="w-4 h-4" /> Dashboard
						</Link>
						<ChevronRight className="w-4 h-4 shrink-0" />
						<Link href="/dashboard/catalogo" className="hover:text-ring transition-colors">
							Catálogo
						</Link>
						<ChevronRight className="w-4 h-4 shrink-0" />
						<span className="text-foreground truncate max-w-xs">{course.title}</span>
					</nav>
				</div>
			</div>

			<section className="container mx-auto px-4 lg:px-8 py-6 md:py-10">
				<div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-10 items-start">

					{/* ── Left column ──────────────────────────────────────────────── */}
					<div className="space-y-8">

						{/* ── Course Header ─────────────────────────────────────────── */}
						<div className="space-y-4">
							{/* Category badge */}
							{course.category && (
								<div
									className="inline-flex px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider"
									style={{
										backgroundColor: `${categoryColor}18`,
										color: categoryColor,
										border: `1px solid ${categoryColor}35`,
									}}>
									{course.category.name}
								</div>
							)}

							{/* Title */}
							<h1 className="text-3xl md:text-4xl xl:text-[2.75rem] font-black leading-[1.1] tracking-tight text-foreground">
								{course.title}
							</h1>

							{/* Description */}
							{course.short_description && (
								<p className="text-base md:text-lg text-foreground/75 font-medium leading-relaxed max-w-2xl">
									{course.short_description}
								</p>
							)}

							{/* ── Metadata chips — Platzi-inspired: level, lessons, duration, students, rating ── */}
							<div className="flex flex-wrap items-center gap-2 pt-1">
								{/* Level */}
								<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-muted/60 border border-border text-muted-foreground">
									<Layers className="w-3.5 h-3.5 shrink-0" />
									{LEVEL_LABELS[course.course_level] ?? course.course_level}
								</span>

								{/* Lessons */}
								{(course.total_lessons ?? 0) > 0 && (
									<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-muted/60 border border-border text-muted-foreground">
										<BookOpen className="w-3.5 h-3.5 shrink-0" />
										{course.total_lessons} lecciones
									</span>
								)}

								{/* Duration */}
								{totalHours != null && totalHours > 0 && (
									<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-muted/60 border border-border text-muted-foreground">
										<Clock className="w-3.5 h-3.5 shrink-0" />
										{totalHours} {totalHours === 1 ? "hora" : "horas"} de contenido
									</span>
								)}

								{/* Students */}
								{(course.enrolled_count ?? 0) > 0 && (
									<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-muted/60 border border-border text-muted-foreground">
										<Users className="w-3.5 h-3.5 shrink-0 text-ring" />
										<span className="tabular-nums">
											{(course.enrolled_count ?? 0).toLocaleString("es-PE")}+
										</span>
										<span>estudiantes</span>
									</span>
								)}

								{/* Rating */}
								<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-muted/60 border border-border text-muted-foreground">
									<Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
									4.8 valoración
								</span>

								{/* Certificate — gold per system rule */}
								<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border bg-gold/8 border-gold/25 text-gold">
									<Award className="w-3.5 h-3.5 shrink-0" />
									Certificado incluido
								</span>
							</div>
						</div>

						{/* ── Mobile enroll card — right after header, before all content ─ */}
						{/* Platzi pattern: CTA surfaces immediately after the hook, before the curriculum detail */}
						<div className="xl:hidden" id="mobile-enroll">
							<CourseEnrollCard course={course} />
						</div>

						{/* ── What you'll learn ─────────────────────────────────────── */}
						{course.what_you_will_learn && course.what_you_will_learn.length > 0 && (
							<div
								className="p-6 rounded-2xl border relative overflow-hidden"
								style={{
									borderColor: `${categoryColor}25`,
									backgroundColor: `${categoryColor}0d`,
								}}>
								<div className="flex items-center gap-3 mb-5">
									<div
										className="p-2 rounded-xl text-white dark:text-background"
										style={{ backgroundColor: categoryColor }}>
										<CheckCircle2 className="w-5 h-5" />
									</div>
									<h3 className="text-lg font-bold text-foreground">Lo que aprenderás</h3>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
									{course.what_you_will_learn.map((item: string, idx: number) => (
										<div key={idx} className="flex items-start gap-2.5">
											<div
												className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white dark:text-background"
												style={{ backgroundColor: categoryColor }}>
												<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
												</svg>
											</div>
											<span className="text-sm text-foreground/80 font-medium leading-relaxed">
												{item}
											</span>
										</div>
									))}
								</div>
							</div>
						)}

						{/* ── About + Requirements ──────────────────────────────────── */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							<div className="p-5 rounded-2xl bg-muted/40 border border-border">
								<div className="flex items-center gap-3 mb-4">
									<div className="p-2 rounded-xl" style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}>
										<BookOpen className="w-4 h-4" />
									</div>
									<h3 className="text-base font-bold text-foreground">Acerca del curso</h3>
								</div>
								<p className="whitespace-pre-line text-foreground/75 text-sm leading-relaxed">
									{course.description || "Este curso no proporciona una descripción detallada en este momento."}
								</p>
							</div>

							<div className="p-5 rounded-2xl bg-muted/40 border border-border">
								<div className="flex items-center gap-3 mb-4">
									<div className="p-2 rounded-xl" style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}>
										<ClipboardList className="w-4 h-4" />
									</div>
									<h3 className="text-base font-bold text-foreground">Requisitos</h3>
								</div>
								{course.requirements && course.requirements.length > 0 ? (
									<ul className="space-y-3">
										{course.requirements.map((req: string, idx: number) => (
											<li key={idx} className="flex items-start gap-2.5 text-foreground/75 text-sm font-medium">
												<div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: categoryColor }} />
												<span className="leading-relaxed">{req}</span>
											</li>
										))}
									</ul>
								) : (
									<p className="text-muted-foreground text-sm">No hay requisitos específicos.</p>
								)}
							</div>
						</div>

						{/* ── Curriculum ────────────────────────────────────────────── */}
						<div className="p-5 rounded-2xl bg-muted/40 border border-border">
							<CourseCurriculum
								modules={course.modules || []}
								courseSlug={slug}
								courseId={course.id}
								accentColor={categoryColor}
							/>
						</div>

						{/* ── Instructor ────────────────────────────────────────────── */}
						{course.instructor && <CourseInstructor instructor={course.instructor} />}
					</div>

					{/* ── Right: sticky enroll card (desktop) ─────────────────────── */}
					<div className="hidden xl:block">
						<CourseEnrollCard course={course} />
					</div>
				</div>
			</section>

			{/* ── Mobile sticky FAB — sits above MobileBottomNav (h-18 = 4.5rem) ── */}
			<div className="fixed bottom-18 left-0 right-0 px-4 py-2.5 bg-background/95 backdrop-blur-xl border-t border-border xl:hidden z-40 flex gap-3 items-center">
				{isEnrolled ? (
					<>
						<div className="flex items-center gap-2 flex-1 min-w-0">
							<CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
							<span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 truncate">
								{enrollment?.status === "COMPLETED" ? "Curso completado" : "Ya estás inscrito"}
							</span>
						</div>
						<Link
							href={resumeLessonId ? `/dashboard/cursos/${course.slug}/leccion/${resumeLessonId}` : `/dashboard/mis-cursos`}
							className="shrink-0 h-11 px-5 rounded-xl font-bold shadow-lg flex items-center justify-center bg-ring text-white dark:text-background text-sm">
							{enrollment?.last_completed_lesson_id ? "Continuar →" : "Comenzar →"}
						</Link>
					</>
				) : (
					<>
						<div className="flex-1 min-w-0">
							<p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Precio</p>
							<p className="font-black text-foreground text-lg leading-tight tabular-nums">{priceDisplay}</p>
						</div>
						<button
							onClick={() =>
								document.getElementById("mobile-enroll")?.scrollIntoView({ behavior: "smooth" })
							}
							className="shrink-0 h-11 px-5 rounded-xl font-bold shadow-lg bg-ring text-white dark:text-background text-sm">
							{course.course_type === "PAID" ? "Comprar" : "Inscribirme"}
						</button>
					</>
				)}
			</div>
		</div>
	);
}
