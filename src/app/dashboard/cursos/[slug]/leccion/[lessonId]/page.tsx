"use client";

import { useMemo, useState, useEffect, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
	Loader2,
	AlertCircle,
	ChevronLeft,
	ChevronRight,
	Menu,
	UserCircle,
	FileText,
	Download,
	ExternalLink,
	CheckCircle2,
	Award,
} from "lucide-react";
import { useCourse } from "@/features/courses/hooks/useCourses";
import { useResources } from "@/features/lessons/hooks/useResources";
import {
	getDriveDownloadUrl,
	getDriveEmbedUrl,
} from "@/features/lessons/components/ContentPlayer";
import { useMyProgress, useCompleteLesson } from "@/features/enrollments/hooks/useProgress";
import { useEnrollmentsStore } from "@/store/enrollments-store";
import { ContentPlayer } from "@/features/lessons/components/ContentPlayer";
import { LessonNavSidebar } from "@/features/lessons/components/LessonNavSidebar";
import { Button } from "@/components/ui/button";
import { InactiveAccountBanner } from "@/components/ui/InactiveAccountBanner";
import { useUser } from "@/features/auth/hooks/useAuth";
import { useMyEnrollments } from "@/features/dashboard/hooks/useDashboard";
import type { CourseDetail } from "@/types";

export default function LessonViewerPage() {
	const params = useParams();
	const slug = params.slug as string;
	const lessonId = params.lessonId as string;
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

	const router = useRouter();

	// ── Data fetching ───────────────────────────────────────────────────────────
	const {
		data: course,
		isLoading: isCourseLoading,
		isError: isCourseError,
	} = useCourse(slug);

	// Populate the enrollments store so isEnrolled() below is accurate.
	const { isLoading: isEnrollmentsLoading } = useMyEnrollments();
	const isEnrolled = useEnrollmentsStore((s) => s.isEnrolled(course?.id ?? ""));
	const enrollment = useEnrollmentsStore(
		(s) => s.enrollments.find((e) => e.course_id === (course?.id ?? "")),
	);

	// Only fetch resources if the user is enrolled
	const { data: resources = [], isLoading: isResourcesLoading } =
		useResources(isEnrolled ? lessonId : undefined);

	// Only fetch progress once the course ID is known
	const { data: progressList = [] } = useMyProgress(course?.id ?? undefined);
	const { data: user } = useUser();

	// Complete-lesson mutation — updates store (progress + enrollment) in real time
	const { mutate: completeLesson, isPending: isCompleting } = useCompleteLesson(
		course?.id ?? "",
	);

	// useTransition marks router navigation as non-urgent (rule rendering-usetransition-loading).
	// isPending gives us a loading signal without blocking the UI thread.
	const [isNavigating, startNavigation] = useTransition();

	// Complete current lesson AND navigate to the next one in one user intent.
	// The mutation fires immediately (optimistic); navigation starts concurrently
	// via startTransition so it doesn't block the mutation's onSuccess toast.
	const handleCompleteAndContinue = (targetId: string) => {
		if (!isAlreadyCompleted) completeLesson(lessonId);
		startNavigation(() => {
			router.push(`/dashboard/cursos/${slug}/leccion/${targetId}`);
		});
	};

	const secondaryResources = useMemo(() => {
		return resources.filter((r) => r.resource_type === "SECONDARY");
	}, [resources]);

	// Redirect if not enrolled after a short delay
	useEffect(() => {
		if (!isEnrollmentsLoading && course && !isEnrolled) {
			const timer = setTimeout(() => {
				router.replace(`/courses/${slug}`);
			}, 4000);
			return () => clearTimeout(timer);
		}
	}, [isEnrollmentsLoading, course, isEnrolled, router, slug]);

	// ── Derived lesson navigation ──────────────────────────────────────────────
	const flatLessons = useMemo(() => {
		if (!course) return [];
		return (course as CourseDetail).modules.flatMap((m) =>
			m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title })),
		);
	}, [course]);

	const currentIndex = flatLessons.findIndex((l) => l.id === lessonId);
	const currentLesson = flatLessons[currentIndex] ?? null;
	const prevLesson = currentIndex > 0 ? flatLessons[currentIndex - 1] : null;
	const nextLesson =
		currentIndex < flatLessons.length - 1
			? flatLessons[currentIndex + 1]
			: null;

	const isNextLessonNewModule =
		currentLesson &&
		nextLesson &&
		currentLesson.moduleId !== nextLesson.moduleId;

	// Whether this specific lesson is already checked off
	const isAlreadyCompleted =
		progressList.find((p) => p.lesson_id === lessonId)?.is_completed ?? false;

	// Whether the entire course has been completed (enrollment status from store)
	const isCourseCompleted = enrollment?.status === "COMPLETED";

	// ── Loading / error states ─────────────────────────────────────────────────
	if (isCourseLoading) {
		return (
			<div className="flex h-full items-center justify-center">
				<Loader2 className="w-8 h-8 animate-spin text-primary" />
			</div>
		);
	}

	if (isCourseError || !course) {
		return (
			<div className="flex h-full flex-col items-center justify-center gap-4 text-center px-4">
				<AlertCircle className="w-12 h-12 text-rose-500" />
				<p className="font-bold text-foreground text-lg">
					No se pudo cargar el curso
				</p>
				<Button asChild variant="outline">
					<Link href="/dashboard/mis-cursos">← Mis cursos</Link>
				</Button>
			</div>
		);
	}

	if (user?.is_active === false) {
		return (
			<div className="flex h-full flex-col items-center justify-center p-8">
				<InactiveAccountBanner className="max-w-md" />
			</div>
		);
	}

	// ── Guard: course is in draft (not published) ───────────────────────────────
	if (course && course.status !== "published") {
		return (
			<div className="flex h-full flex-col items-center justify-center gap-4 text-center px-4">
				<AlertCircle className="w-12 h-12 text-yellow-500" />
				<p className="font-bold text-foreground text-lg">Curso en borrador</p>
				<p className="text-sm text-muted-foreground max-w-sm">
					Este curso aún no está publicado y no es posible acceder a su contenido.
				</p>
				<Button asChild variant="outline">
					<Link href="/dashboard/mis-cursos">← Mis cursos</Link>
				</Button>
			</div>
		);
	}

	// ── Guard: course has no content ────────────────────────────────────────────
	if (course && flatLessons.length === 0) {
		return (
			<div className="flex h-full flex-col items-center justify-center gap-4 text-center px-4">
				<AlertCircle className="w-12 h-12 text-muted-foreground" />
				<p className="font-bold text-foreground text-lg">Curso sin contenido</p>
				<p className="text-sm text-muted-foreground max-w-sm">
					Este curso aún no tiene lecciones publicadas. Vuelve más tarde.
				</p>
				<Button asChild variant="outline">
					<Link href={`/courses/${slug}`}>← Volver al curso</Link>
				</Button>
			</div>
		);
	}

	// ── Access guard: course_access must be APPROVED ────────────────────────────
	if (user && user.course_access !== "APPROVED") {
		return (
			<div className="flex h-full flex-col items-center justify-center gap-4 text-center px-4">
				<AlertCircle className="w-12 h-12 text-yellow-500" />
				<p className="font-bold text-foreground text-lg">Acceso no aprobado</p>
				<p className="text-sm text-muted-foreground max-w-sm">
					Necesitas tener el acceso a los cursos aprobado para ver el contenido
					de las lecciones.
				</p>
				<Button asChild variant="outline">
					<Link href="/dashboard">← Volver al panel</Link>
				</Button>
			</div>
		);
	}

	// ── Enrollment guard: user must be enrolled in this specific course ─────────
	// Show a spinner while enrollments are still loading to avoid a false negative.
	if (!isEnrollmentsLoading && course && !isEnrolled) {
		return (
			<div className="flex h-full flex-col items-center justify-center gap-4 text-center px-4">
				<AlertCircle className="w-12 h-12 text-rose-500" />
				<p className="font-bold text-foreground text-lg">No estás inscrito</p>
				<p className="text-sm text-muted-foreground max-w-sm">
					Debes inscribirte en este curso para acceder a su contenido.
				</p>
				<Button asChild variant="outline">
					<Link href={`/courses/${slug}`}>Ver detalles del curso</Link>
				</Button>
			</div>
		);
	}

	// ── Render ─────────────────────────────────────────────────────────────────
	return (
		<div className="flex flex-col lg:flex-row lg:h-[calc(100vh-4rem)] overflow-hidden">
			{/* ── Left: Content + controls ── */}
			{/* overflow-x-hidden prevents any child element from triggering a horizontal
			    scrollbar in the inner scroll container */}
			<div className="flex-1 overflow-y-auto overflow-x-hidden w-full">
				<div className={`max-w-5xl mx-auto px-4 lg:px-8 py-6 space-y-6 transition-opacity duration-150 ${isNavigating ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
					{/* Mobile top bar — lesson counter + "Temario" toggle */}
					<div className="lg:hidden flex items-center justify-between gap-3">
						<div className="min-w-0">
							{currentIndex >= 0 && (
								<p className="text-[11px] font-bold text-ring uppercase tracking-widest mb-0.5">
									Lección {currentIndex + 1} de {flatLessons.length}
								</p>
							)}
							<p className="text-sm font-bold text-foreground truncate">
								{currentLesson?.title ?? course.title}
							</p>
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setIsMobileNavOpen(true)}
							className="shrink-0 gap-2 h-9">
							<Menu className="w-4 h-4" />
							Temario
						</Button>
					</div>

					{/* Content player */}
					{!isResourcesLoading && resources.length === 0 ? (
						<div className="w-full aspect-video bg-muted border border-border rounded-xl flex flex-col items-center justify-center text-center p-6 shadow-sm">
							<AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
							<p className="font-bold text-foreground text-lg">
								Lección sin contenido
							</p>
							<p className="text-sm text-muted-foreground max-w-md mt-1">
								Esta lección aún no tiene recursos o videos publicados. Por favor, continúa con la siguiente lección.
							</p>
						</div>
					) : (
						<ContentPlayer resources={resources} isLoading={isResourcesLoading} />
					)}

					{/* Lesson title & meta — desktop only (mobile shows it in top bar) */}
					{currentLesson && (
						<div className="hidden lg:block">
							{currentIndex >= 0 && (
								<p className="text-[11px] font-bold text-ring uppercase tracking-widest mb-1.5">
									Lección {currentIndex + 1} de {flatLessons.length}
								</p>
							)}
							<h1 className="text-2xl font-extrabold text-foreground leading-snug">
								{currentLesson.title}
							</h1>
							{currentLesson.duration_minutes ? (
								<p className="text-sm text-muted-foreground mt-1">
									{currentLesson.duration_minutes} min de duración
								</p>
							) : null}
						</div>
					)}

					{/* ── Course completion banner ──────────────────────────────── */}
					{isCourseCompleted && !nextLesson && (
						<div className="flex flex-col items-center gap-5 rounded-2xl border border-gold/30 bg-gold/5 p-8 text-center animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
							<div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/25 flex items-center justify-center">
								<Award className="w-8 h-8 text-gold" />
							</div>
							<div>
								<h2 className="text-2xl font-black text-foreground mb-1">¡Felicitaciones!</h2>
								<p className="text-muted-foreground text-sm max-w-sm">
									Completaste el curso. Tu certificado ya está disponible.
								</p>
							</div>
							<Button asChild className="bg-ring text-white dark:text-background hover:bg-ring/90 font-bold px-8 h-12 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
								<Link href="/dashboard/mis-certificados">
									<Award className="w-4 h-4 mr-2" />
									Ver mi certificado
								</Link>
							</Button>
						</div>
					)}

					{/* ── Lesson navigation ── compact single row ───────────────── */}
					{!isCourseCompleted && (
						<div className="flex items-stretch gap-2.5 border-t border-border pt-5">

							{/* Previous — compact chip, always at start */}
							{prevLesson && (
								<Link
									href={`/dashboard/cursos/${slug}/leccion/${prevLesson.id}`}
									className="group shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-muted/40 hover:bg-muted/70 hover:border-border/80 transition-all duration-200">
									<ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:-translate-x-0.5 transition-all duration-150 shrink-0" />
									<div className="hidden sm:block min-w-0 max-w-27.5">
										<p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide leading-none">Anterior</p>
										<p className="text-xs font-semibold text-foreground truncate mt-0.5">{prevLesson.title}</p>
									</div>
								</Link>
							)}

							{/* Primary action — fills remaining width */}
							{nextLesson ? (
								/* Has next: "Completar y continuar →" / "Continuar →" */
								<button
									onClick={() => handleCompleteAndContinue(nextLesson.id)}
									disabled={isCompleting || isNavigating}
									className="flex-1 flex items-center justify-between px-4 py-2.5 rounded-xl font-bold bg-ring text-white dark:text-background hover:bg-ring/90 active:bg-ring/80 disabled:opacity-60 shadow-sm hover:shadow-md transition-all duration-200 group">
									<span className="flex items-center gap-2 min-w-0">
										{(isCompleting || isNavigating)
											? <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
											: isAlreadyCompleted
												? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-300" />
												: <CheckCircle2 className="w-4 h-4 shrink-0" />}
										<span className="text-sm truncate">
											{isAlreadyCompleted ? "Continuar" : "Completar y continuar"}
										</span>
									</span>
									<span className="flex items-center gap-1 text-xs font-semibold opacity-70 shrink-0 group-hover:opacity-100 transition-opacity">
										{isNextLessonNewModule ? "Siguiente módulo" : "Siguiente"}
										<ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150" />
									</span>
								</button>
							) : (
								/* Last lesson: complete only */
								<button
									onClick={() => completeLesson(lessonId)}
									disabled={isCompleting || isAlreadyCompleted}
									className={[
										"flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200",
										isAlreadyCompleted
											? "bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 cursor-default"
											: "bg-ring text-white dark:text-background hover:bg-ring/90 active:bg-ring/80 shadow-sm hover:shadow-md",
									].join(" ")}>
									{isCompleting
										? <><Loader2 className="w-4 h-4 animate-spin" /> Guardando…</>
										: isAlreadyCompleted
											? <><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Lección completada</>
											: <><CheckCircle2 className="w-4 h-4" /> Completar lección</>}
								</button>
							)}
						</div>
					)}

					{/* ── Resources — quiet flat list, focus stays on the video ── */}
					{secondaryResources.length > 0 && (
						<div className="pt-6 border-t border-border">
							<p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
								Recursos · {secondaryResources.length}
							</p>
							<div className="space-y-0.5">
								{secondaryResources.map((res) => {
									const isPDF = res.resource_format === "PDF";
									const isDoc = res.resource_format === "DOCUMENT";
									const isDownload = isPDF || isDoc;

									let url = res.external_url;
									if (!url && res.drive_file_id) {
										url = isDownload
											? getDriveDownloadUrl(res.drive_file_id)
											: getDriveEmbedUrl(res.drive_file_id);
									}

									const Icon = isDownload ? Download : ExternalLink;
									const label = isPDF
										? "PDF"
										: isDoc
											? "Archivo"
											: res.resource_format === "IMAGE"
												? "Imagen"
												: res.resource_format === "VIDEO"
													? "Video"
													: "Enlace";

									return (
										<a
											key={res.id}
											href={url ?? "#"}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-150 group">
											<Icon className="w-3.5 h-3.5 shrink-0 text-muted-foreground/60 group-hover:text-ring transition-colors" />
											<span className="flex-1 truncate font-medium">{res.title}</span>
											<span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground/50 shrink-0 group-hover:text-muted-foreground transition-colors">
												{label}
											</span>
										</a>
									);
								})}
							</div>
						</div>
					)}

					{/* ── Instructor & Course Section ── */}
					<div className="mt-8 pt-8 border-t border-border space-y-6">
						{/* Instructor Info */}
						{course.instructor ? (
							<div className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl border border-border/50 bg-card/50 shadow-sm">
								{course.instructor.avatar_url ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={course.instructor.avatar_url}
										alt={course.instructor.first_name}
										className="w-20 h-20 rounded-full object-cover shrink-0 border border-border"
									/>
								) : (
									<div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center shrink-0 border border-border">
										<UserCircle className="w-10 h-10 text-muted-foreground" />
									</div>
								)}
								<div>
									<h3 className="text-xl font-extrabold text-foreground mb-1">
										{course.instructor.first_name} {course.instructor.last_name}
									</h3>
									<p className="text-sm text-ring font-semibold mb-3">
										Instructor del Curso
									</p>
									<p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
										{course.instructor.bio ||
											"No hay biografía disponible para este instructor."}
									</p>
								</div>
							</div>
						) : null}

						{/* Course description snippet */}
						<div className="p-6 rounded-2xl border border-border/50 bg-muted/50 shadow-sm">
							<h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
								<FileText className="w-5 h-5 text-ring" /> Acerca de este
								curso
							</h4>
							<p className="text-sm text-muted-foreground/90 leading-relaxed max-w-none">
								{course.short_description ||
									course.description ||
									"Sin descripción proporcionada."}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* ── Right: Lesson navigation sidebar ── */}
			<LessonNavSidebar
				course={course as CourseDetail}
				currentLessonId={lessonId}
				courseSlug={slug}
				progress={progressList}
				isOpen={isMobileNavOpen}
				onClose={() => setIsMobileNavOpen(false)}
			/>
		</div>
	);
}
