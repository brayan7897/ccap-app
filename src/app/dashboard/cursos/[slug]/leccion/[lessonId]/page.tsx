"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
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
} from "lucide-react";
import { useCourse } from "@/features/courses/hooks/useCourses";
import { useResources } from "@/features/lessons/hooks/useResources";
import { getDriveDownloadUrl, getDriveEmbedUrl } from "@/features/lessons/components/ContentPlayer";
import { useMyProgress } from "@/features/enrollments/hooks/useProgress";
import { useEnrollmentsStore } from "@/store/enrollments-store";
import { ContentPlayer } from "@/features/lessons/components/ContentPlayer";
import { LessonNavSidebar } from "@/features/lessons/components/LessonNavSidebar";
import { Button } from "@/components/ui/button";
import { InactiveAccountBanner } from "@/components/ui/InactiveAccountBanner";
import { useUser } from "@/features/auth/hooks/useAuth";
import type { CourseDetail, LessonSummary } from "@/types";

export default function LessonViewerPage() {
	const params = useParams();
	const slug = params.slug as string;
	const lessonId = params.lessonId as string;
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

	// ── Data fetching ───────────────────────────────────────────────────────────
	const {
		data: course,
		isLoading: isCourseLoading,
		isError: isCourseError,
	} = useCourse(slug);
	const { data: resources = [], isLoading: isResourcesLoading } =
		useResources(lessonId);
	const { data: progressList = [] } = useMyProgress(course?.id);
	const { data: user } = useUser();

	const secondaryResources = useMemo(() => {
		return resources.filter((r) => r.resource_type === "SECONDARY");
	}, [resources]);

	// ── Derived lesson navigation ──────────────────────────────────────────────
	const flatLessons = useMemo(() => {
		if (!course) return [];
		return (course as CourseDetail).modules.flatMap((m) => 
			m.lessons.map(l => ({ ...l, moduleId: m.id, moduleTitle: m.title }))
		);
	}, [course]);

	const currentIndex = flatLessons.findIndex((l) => l.id === lessonId);
	const currentLesson = flatLessons[currentIndex] ?? null;
	const prevLesson = currentIndex > 0 ? flatLessons[currentIndex - 1] : null;
	const nextLesson =
		currentIndex < flatLessons.length - 1 ? flatLessons[currentIndex + 1] : null;
	
	const isNextLessonNewModule = currentLesson && nextLesson && currentLesson.moduleId !== nextLesson.moduleId;

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

	// ── Render ─────────────────────────────────────────────────────────────────
	return (
		<div className="flex flex-col lg:flex-row h-full overflow-hidden relative">
			{/* ── Left: Content + controls ── */}
			<div className="flex-1 overflow-y-auto w-full">
				<div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 space-y-6">
					{/* Mobile Header Toggle */}
					<div className="lg:hidden flex items-center justify-between mb-2">
						<h1 className="text-lg font-bold truncate pr-4">{course.title}</h1>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setIsMobileNavOpen(true)}
							className="shrink-0 gap-2">
							<Menu className="w-4 h-4" />
							Temario
						</Button>
					</div>

					{/* Content player */}
					<ContentPlayer resources={resources} isLoading={isResourcesLoading} />

					{/* Lesson title & duration */}
					{currentLesson && (
						<div>
							<h1 className="text-2xl font-extrabold text-foreground">
								{currentLesson.title}
							</h1>
							{currentLesson.duration_minutes ? (
								<p className="text-sm font-medium text-muted-foreground mt-1">
									Duración: {currentLesson.duration_minutes} min
								</p>
							) : null}
						</div>
					)}

					{/* Prev / Next navigation */}
					<div className="flex items-center justify-between border-t border-border pt-6">
						{prevLesson ? (
							<Button asChild variant="ghost" className="gap-2 max-w-[45%]">
								<Link
									href={`/dashboard/cursos/${slug}/leccion/${prevLesson.id}`}>
									<ChevronLeft className="w-4 h-4 shrink-0" />
									<span className="hidden sm:inline truncate">
										{prevLesson.title}
									</span>
									<span className="sm:hidden">Anterior</span>
								</Link>
							</Button>
						) : (
							<div />
						)}

						{nextLesson ? (
							<Button asChild className={`gap-2 ${isNextLessonNewModule ? 'bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20' : ''} max-w-[45%]`}>
								<Link
									href={`/dashboard/cursos/${slug}/leccion/${nextLesson.id}`}>
									<span className="hidden sm:inline truncate">
										{isNextLessonNewModule ? `Siguiente Módulo: ${nextLesson.moduleTitle}` : nextLesson.title}
									</span>
									<span className="sm:hidden">{isNextLessonNewModule ? 'Nuevo Módulo' : 'Siguiente'}</span>
									<ChevronRight className="w-4 h-4 shrink-0" />
								</Link>
							</Button>
						) : (
							<div />
						)}
					</div>
					
					{/* ── Resources Section ── */}
					{secondaryResources.length > 0 && (
						<div className="mt-8 pt-8 border-t border-border">
							<h3 className="text-xl font-extrabold text-foreground mb-6 flex items-center gap-2">
								Recursos Complementarios
								<span className="flex items-center justify-center bg-primary/10 text-primary text-xs w-6 h-6 rounded-full">
									{secondaryResources.length}
								</span>
							</h3>
							
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
								{secondaryResources.map(res => {
									const isPDF = res.resource_format === "PDF";
									const isDoc = res.resource_format === "DOCUMENT";
									const isImg = res.resource_format === "IMAGE";
									const isVideo = res.resource_format === "VIDEO";
									const isLink = res.resource_format === "LINK";
									
									let url = res.external_url;
									if (!url && res.drive_file_id) {
										if (isPDF || isDoc) url = getDriveDownloadUrl(res.drive_file_id);
										else url = getDriveEmbedUrl(res.drive_file_id);
									}
									
									// Color themes based on format
									let themeClasses = "border-border/60 bg-card hover:border-primary/40 hover:bg-primary/5";
									let iconBoxClasses = "bg-primary/10 text-primary";
									let icon = <ExternalLink className="w-6 h-6" />;
									let actionText = "Visitar Enlace";
									let actionIcon = <ExternalLink className="w-3.5 h-3.5" />;
									
									if (isPDF) {
										themeClasses = "border-red-200/50 bg-red-50/30 hover:bg-red-50 hover:border-red-300 dark:border-red-900/50 dark:bg-red-950/10 dark:hover:bg-red-950/30 hover:shadow-red-500/10";
										iconBoxClasses = "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400";
										icon = <FileText className="w-6 h-6" />;
										actionText = "Descargar PDF";
										actionIcon = <Download className="w-3.5 h-3.5" />;
									} else if (isDoc) {
										themeClasses = "border-blue-200/50 bg-blue-50/30 hover:bg-blue-50 hover:border-blue-300 dark:border-blue-900/50 dark:bg-blue-950/10 dark:hover:bg-blue-950/30 hover:shadow-blue-500/10";
										iconBoxClasses = "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400";
										icon = <FileText className="w-6 h-6" />;
										actionText = "Descargar Archivo";
										actionIcon = <Download className="w-3.5 h-3.5" />;
									} else if (isImg) {
										themeClasses = "border-purple-200/50 bg-purple-50/30 hover:bg-purple-50 hover:border-purple-300 dark:border-purple-900/50 dark:bg-purple-950/10 dark:hover:bg-purple-950/30 hover:shadow-purple-500/10";
										iconBoxClasses = "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400 p-0 overflow-hidden";
										// Attempt to show preview if using drive file, otherwise icon
										const previewUrl = res.drive_file_id ? `https://drive.google.com/uc?export=view&id=${res.drive_file_id}` : res.external_url;
										icon = previewUrl ? (
											// eslint-disable-next-line @next/next/no-img-element
											<img src={previewUrl} alt={res.title} className="w-full h-full object-cover" />
										) : <FileText className="w-6 h-6" />;
										actionText = "Ver Imagen";
									} else if (isVideo) {
										themeClasses = "border-amber-200/50 bg-amber-50/30 hover:bg-amber-50 hover:border-amber-300 dark:border-amber-900/50 dark:bg-amber-950/10 dark:hover:bg-amber-950/30 hover:shadow-amber-500/10";
										iconBoxClasses = "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400";
										icon = <FileText className="w-6 h-6" />;
										actionText = "Ver Video";
									} else if (isLink) {
										themeClasses = "border-emerald-200/50 bg-emerald-50/30 hover:bg-emerald-50 hover:border-emerald-300 dark:border-emerald-900/50 dark:bg-emerald-950/10 dark:hover:bg-emerald-950/30 hover:shadow-emerald-500/10";
										iconBoxClasses = "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400";
									}
									
									return (
										<a key={res.id} href={url ?? "#"} target="_blank" rel="noopener noreferrer" 
											className={`flex items-center gap-4 p-4 rounded-xl border transition-all group shadow-sm hover:-translate-y-0.5 ${themeClasses}`}>
											<div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm ${iconBoxClasses}`}>
												{icon}
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-bold text-foreground line-clamp-2 leading-tight mb-1.5">{res.title}</p>
												<p className="text-xs font-semibold opacity-80 flex items-center gap-1.5 uppercase tracking-wider">
													{actionIcon} {actionText}
												</p>
											</div>
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
									<img src={course.instructor.avatar_url} alt={course.instructor.first_name} className="w-20 h-20 rounded-full object-cover shrink-0 border-2 border-primary/20" />
								) : (
									<div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border-2 border-primary/20">
										<UserCircle className="w-10 h-10 text-primary" />
									</div>
								)}
								<div>
									<h3 className="text-xl font-extrabold text-foreground mb-1">
										{course.instructor.first_name} {course.instructor.last_name}
									</h3>
									<p className="text-sm text-primary font-semibold mb-3">Instructor del Curso</p>
									<p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
										{course.instructor.bio || "No hay biografía disponible para este instructor."}
									</p>
								</div>
							</div>
						) : null}

						{/* Course description snippet */}
						<div className="p-6 rounded-2xl border border-border/50 bg-muted/20 shadow-sm">
							<h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
								<FileText className="w-5 h-5 text-primary" /> Acerca de este curso
							</h4>
							<p className="text-sm text-muted-foreground/90 leading-relaxed max-w-none">
								{course.short_description || course.description || "Sin descripción proporcionada."}
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
