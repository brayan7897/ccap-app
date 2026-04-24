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
	Clock,
	LayoutList,
	Award,
} from "lucide-react";
import Link from "next/link";
import { useEnrollmentsStore } from "@/store/enrollments-store";

const levelLabels: Record<string, string> = {
	BASIC: "Básico",
	INTERMEDIATE: "Intermedio",
	ADVANCED: "Avanzado",
};

const levelColors: Record<string, string> = {
	BASIC:
		"bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
	INTERMEDIATE:
		"bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
	ADVANCED:
		"bg-pink-500/10 text-pink-600 border-pink-500/20 dark:text-pink-400",
};

function formatTotalDuration(seconds?: number): string {
	if (!seconds) return "—";
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	if (h > 0) return m > 0 ? `${h}h ${m}m` : `${h}h`;
	return `${m}m`;
}

export default function CourseDetailsPage() {
	const params = useParams();
	const slug = params.slug as string;

	const { data: course, isLoading, isError, error } = useCourse(slug);
	const isEnrolled = useEnrollmentsStore((s) => s.isEnrolled(course?.id ?? ""));

	if (isLoading) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center gap-4">
				<Loader2 className="w-10 h-10 animate-spin text-primary" />
				<p className="text-muted-foreground font-medium">
					Cargando detalles del curso...
				</p>
			</div>
		);
	}

	if (isError || !course) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
				<AlertCircle className="w-16 h-16 text-rose-500 mb-2" />
				<h1 className="text-2xl font-bold text-foreground">
					Curso no encontrado o hubo un error
				</h1>
				<p className="text-muted-foreground max-w-md">
					Lo sentimos, no pudimos cargar la información de este curso.
				</p>
				{isError && (
					<div className="bg-rose-500/10 text-rose-500 border border-rose-500/20 p-4 rounded-xl mt-2 text-sm max-w-xl text-left overflow-auto">
						<p className="font-bold mb-1">Detalle del error (API):</p>
						<pre className="whitespace-pre-wrap">
							{error instanceof Error
								? error.message
								: JSON.stringify(error, null, 2)}
						</pre>
					</div>
				)}
				<Link
					href="/courses"
					className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors">
					Volver a Cursos
				</Link>
			</div>
		);
	}

	const moduleCount = course.modules?.length ?? 0;
	const durationFormatted = formatTotalDuration(course.total_duration_seconds);
	const levelLabel = levelLabels[course.course_level] ?? course.course_level;
	const levelColor =
		levelColors[course.course_level] ??
		"bg-muted text-muted-foreground border-border";
	const priceDisplay =
		course.course_type === "PAID" && course.price != null
			? `S/. ${course.price.toFixed(2)}`
			: "Gratis";

	return (
		<div className="min-h-screen bg-background w-full flex flex-col pb-28 relative">
			{/* ── Breadcrumbs ── */}
			<div className="bg-muted/30 border-b border-border/50">
				<div className="container mx-auto px-4 lg:px-8 py-4">
					<nav className="flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
						<Link
							href="/"
							className="hover:text-primary transition-colors flex items-center gap-1.5">
							<Home className="w-4 h-4" /> Inicio
						</Link>
						<ChevronRight className="w-4 h-4 shrink-0" />
						<Link
							href="/courses"
							className="hover:text-primary transition-colors">
							Cursos
						</Link>
						<ChevronRight className="w-4 h-4 shrink-0" />
						<span className="text-foreground font-medium truncate max-w-50 sm:max-w-xs md:max-w-md">
							{course.title}
						</span>
					</nav>
				</div>
			</div>

			{/* ── Light header ── */}
			<section className="border-b border-border bg-card">
				<div className="container mx-auto px-4 lg:px-8 py-10">
					{/* Category + Level */}
					<div className="flex flex-wrap items-center gap-2 mb-4">
						{course.category && (
							<span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
								{course.category.name}
							</span>
						)}
						<span
							className={`px-2.5 py-1 rounded-full text-xs font-bold border ${levelColor}`}>
							{levelLabel}
						</span>
					</div>

					{/* Title */}
					<h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-3 max-w-3xl">
						{course.title}
					</h1>

					{/* Short description */}
					{course.short_description && (
						<p className="text-base text-muted-foreground leading-relaxed mb-5 max-w-2xl">
							{course.short_description}
						</p>
					)}

					{/* Rating + instructor row */}
					<div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
						<div className="flex items-center gap-1">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`w-4 h-4 ${
										i < 4
											? "fill-amber-400 text-amber-400"
											: "fill-amber-400/30 text-amber-400/30"
									}`}
								/>
							))}
							<span className="font-bold text-foreground ml-1">4.9</span>
						</div>
						{course.enrolled_count !== undefined && (
							<span className="text-muted-foreground">
								({course.enrolled_count.toLocaleString()} valoraciones)
							</span>
						)}
						{course.instructor && (
							<>
								<span className="text-muted-foreground/40">·</span>
								<span className="text-foreground font-medium">
									Instructor: {course.instructor.first_name}{" "}
									{course.instructor.last_name}
								</span>
							</>
						)}
					</div>

					{/* Stats bar */}
					<div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
						{course.total_duration_seconds != null && (
							<div className="flex items-center gap-1.5 text-muted-foreground">
								<Clock className="w-4 h-4" />
								<span className="font-medium">
									{durationFormatted} en total
								</span>
							</div>
						)}
						<div className="flex items-center gap-1.5 text-muted-foreground">
							<Users className="w-4 h-4" />
							<span className="font-medium">
								{(course.enrolled_count ?? 0).toLocaleString()} estudiantes
							</span>
						</div>
						{moduleCount > 0 && (
							<div className="flex items-center gap-1.5 text-muted-foreground">
								<LayoutList className="w-4 h-4" />
								<span className="font-medium">{moduleCount} módulos</span>
							</div>
						)}
						<div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
							<Award className="w-4 h-4" />
							Certificado incluido
						</div>
					</div>
				</div>
			</section>

			{/* ── Main content grid ── */}
			<section className="container mx-auto px-4 lg:px-8 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
					{/* Left column */}
					<div className="space-y-12">
						{/* What you'll learn */}
						{course.what_you_will_learn &&
							course.what_you_will_learn.length > 0 && (
								<div className="p-6 rounded-2xl border border-border bg-muted/10">
									<h3 className="text-xl font-bold text-foreground mb-4">
										Lo que aprenderás
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
										{course.what_you_will_learn.map(
											(item: string, idx: number) => (
												<div key={idx} className="flex items-start gap-2.5">
													<CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
													<span className="text-sm text-foreground/80 leading-relaxed">
														{item}
													</span>
												</div>
											),
										)}
									</div>
								</div>
							)}

						{/* Description */}
						<div>
							<h3 className="text-xl font-bold text-foreground mb-3">
								Acerca de este curso
							</h3>
							<p className="whitespace-pre-line text-muted-foreground leading-relaxed">
								{course.description ||
									"Este curso no proporciona una descripción detallada en este momento."}
							</p>
						</div>

						{/* Requirements */}
						{course.requirements && course.requirements.length > 0 && (
							<div>
								<h3 className="text-xl font-bold text-foreground mb-4">
									Requisitos
								</h3>
								<ul className="space-y-2">
									{course.requirements.map((req: string, idx: number) => (
										<li
											key={idx}
											className="flex items-center gap-2.5 text-muted-foreground text-sm">
											<div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
											{req}
										</li>
									))}
								</ul>
							</div>
						)}

						{/* Curriculum */}
						<CourseCurriculum
							modules={course.modules || []}
							courseSlug={slug}
							courseId={course.id}
						/>

						{/* Instructor */}
						{course.instructor && (
							<CourseInstructor instructor={course.instructor} />
						)}
					</div>

					{/* Right: sticky sidebar (desktop only) */}
					<div className="hidden lg:block">
						<CourseEnrollCard course={course} />
					</div>
				</div>
			</section>

			{/* Mobile: inline enrollment card */}
			<div className="lg:hidden container mx-auto px-4 pb-8" id="mobile-enroll">
				<CourseEnrollCard course={course} />
			</div>

			{/* ── Mobile FAB ── */}
			<div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border/50 lg:hidden z-50 flex gap-4 items-center">
				<div className="flex-1">
					<p className="text-xs text-muted-foreground mb-0.5">Precio</p>
					<p className="font-bold text-foreground">{priceDisplay}</p>
				</div>
				{isEnrolled ? (
					<Link
						href="/dashboard/mis-cursos"
						className="flex-1 bg-primary text-primary-foreground h-12 rounded-xl font-bold shadow-lg text-center flex items-center justify-center">
						Ir a mis cursos
					</Link>
				) : (
					<button
						onClick={() =>
							document
								.getElementById("mobile-enroll")
								?.scrollIntoView({ behavior: "smooth" })
						}
						className="flex-1 bg-primary text-primary-foreground h-12 rounded-xl font-bold shadow-lg shadow-primary/25">
						Inscribirme
					</button>
				)}
			</div>
		</div>
	);
}
