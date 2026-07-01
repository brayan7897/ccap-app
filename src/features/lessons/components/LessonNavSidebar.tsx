"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, X, Check, FileText, HelpCircle } from "lucide-react";
import type { CourseDetail, LessonProgress, LessonType } from "@/types";

interface LessonNavSidebarProps {
	course: CourseDetail;
	currentLessonId: string;
	courseSlug: string;
	progress: LessonProgress[];
	isOpen?: boolean;
	onClose?: () => void;
}

function lessonTypeIcon(type: LessonType) {
	if (type === "PDF") return <FileText className="w-3 h-3" />;
	if (type === "TEXT") return <HelpCircle className="w-3 h-3" />;
	return null; // VIDEO — no icon needed, circle conveys enough
}

export function LessonNavSidebar({
	course,
	currentLessonId,
	courseSlug,
	progress,
	isOpen = false,
	onClose,
}: LessonNavSidebarProps) {
	// Memoize the progress map so it's rebuilt only when the progress array changes
	const progressMap = useMemo(
		() => new Map(progress.map((p) => [p.lesson_id, p])),
		[progress],
	);

	// Memoize sorted modules + flat lesson list — stable between renders while
	// watching a lesson (course structure doesn't change mid-session)
	const sortedModules = useMemo(
		() => [...course.modules].sort((a, b) => a.order_index - b.order_index),
		[course.modules],
	);

	const allLessons = useMemo(
		() =>
			sortedModules.flatMap((m) =>
				[...m.lessons].sort((a, b) => a.order_index - b.order_index),
			),
		[sortedModules],
	);

	const { totalLessons, progressPercent, currentIndex } = useMemo(() => {
		const totalLessons = allLessons.length;
		const totalCompleted = allLessons.filter(
			(l) => progressMap.get(l.id)?.is_completed,
		).length;
		return {
			totalLessons,
			progressPercent:
				totalLessons > 0
					? Math.round((totalCompleted / totalLessons) * 100)
					: 0,
			currentIndex: allLessons.findIndex((l) => l.id === currentLessonId),
		};
	}, [allLessons, progressMap, currentLessonId]);

	return (
		<>
			{/* Mobile overlay */}
			{isOpen && onClose && (
				<div
					className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
					onClick={onClose}
					aria-hidden
				/>
			)}

			<aside
				className={`fixed lg:static inset-y-0 right-0 z-50 flex flex-col h-full bg-card border-l border-border w-[320px] xl:w-90 shrink-0 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}>

				{/* ── Header ─────────────────────────────────────────────────── */}
				<div className="px-4 pt-4 pb-3 border-b border-border shrink-0 space-y-3">
					<div className="flex items-center justify-between gap-2">
						<Link
							href={`/dashboard/cursos/${courseSlug}`}
							className="text-xs font-bold text-ring hover:text-ring/80 flex items-center gap-1 transition-colors">
							<ChevronLeft className="w-3.5 h-3.5 shrink-0" />
							Volver al curso
						</Link>
						{onClose && (
							<button
								onClick={onClose}
								aria-label="Cerrar temario"
								className="lg:hidden p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
								<X className="w-4 h-4" />
							</button>
						)}
					</div>

					<h2 className="text-sm font-bold text-foreground line-clamp-2 leading-snug">
						{course.title}
					</h2>

					{/* Progress */}
					<div className="space-y-1.5">
						<div className="flex items-center justify-between text-[11px] font-semibold">
							<span className="text-muted-foreground">
								{currentIndex >= 0 ? `Lección ${currentIndex + 1} de ${totalLessons}` : `${totalLessons} lecciones`}
							</span>
							<span className={progressPercent === 100 ? "text-emerald-500" : "text-ring"}>
								{progressPercent}%
							</span>
						</div>
						<div className="h-1.5 w-full bg-muted overflow-hidden rounded-full">
							<div
								className={`h-full rounded-full transition-all duration-700 ease-out ${
									progressPercent === 100 ? "bg-emerald-500" : "bg-ring"
								}`}
								style={{ width: `${progressPercent}%` }}
							/>
						</div>
					</div>
				</div>

				{/* ── Flat lesson list with vertical timeline ─────────────────── */}
				<div className="flex-1 overflow-y-auto py-3">
					{sortedModules.map((module) => {
						const sortedLessons = [...module.lessons].sort(
							(a, b) => a.order_index - b.order_index,
						);
						return (
							<div key={module.id} className="mb-1">
								{/* Module name divider */}
								<div className="px-4 pt-3 pb-2">
									<p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest leading-none">
										{module.title}
									</p>
								</div>

								{/* Lessons with vertical timeline */}
								<div className="relative ml-9 border-l-2 border-border/50">
									{sortedLessons.map((lesson) => {
										const globalIdx = allLessons.findIndex(
											(l) => l.id === lesson.id,
										);
										const isCurrent = lesson.id === currentLessonId;
										const isCompleted =
											progressMap.get(lesson.id)?.is_completed ?? false;

										return (
											<Link
												key={lesson.id}
												href={`/dashboard/cursos/${courseSlug}/leccion/${lesson.id}`}
												onClick={() => { if (onClose) onClose(); }}
												className={[
													"relative flex items-start gap-3 pl-5 pr-4 py-3",
													"transition-colors duration-150 group",
													isCurrent
														? "bg-sidebar-accent/50"
														: "hover:bg-sidebar-accent/25",
												].join(" ")}>

												{/* Timeline bubble — overlaps the left border line */}
												<div
													className={[
														"absolute -left-2.5 top-3.5 w-5 h-5 rounded-full shrink-0 flex items-center justify-center",
														"text-[10px] font-black transition-all duration-200",
														isCompleted
															? "bg-ring text-white dark:text-background shadow-sm"
															: isCurrent
																? "bg-ring text-white dark:text-background ring-2 ring-ring/30 ring-offset-2 ring-offset-background shadow-sm"
																: "bg-background border-2 border-muted-foreground/25 text-muted-foreground/60",
													].join(" ")}>
													{isCompleted ? (
														<Check className="w-2.5 h-2.5 stroke-3" />
													) : (
														globalIdx + 1
													)}
												</div>

												{/* Lesson info */}
												<div className="flex-1 min-w-0">
													<p
														className={[
															"text-sm leading-snug line-clamp-2",
															isCurrent
																? "font-bold text-sidebar-accent-foreground"
																: isCompleted
																	? "font-medium text-sidebar-foreground/80"
																	: "text-sidebar-foreground/55 group-hover:text-sidebar-foreground/80",
														].join(" ")}>
														{lesson.title}
													</p>

													<div className="flex items-center gap-2 mt-0.5">
														{isCurrent ? (
															<span className="flex items-center gap-1 text-[11px] font-bold text-ring">
																<span className="w-1.5 h-1.5 rounded-full bg-ring animate-pulse" />
																Viendo ahora
															</span>
														) : (
															<>
																{lesson.duration_minutes != null && (
																	<span className="text-[11px] text-muted-foreground/60">
																		{lesson.duration_minutes} min
																	</span>
																)}
																{lessonTypeIcon(lesson.lesson_type) && (
																	<span className="text-muted-foreground/40">
																		{lessonTypeIcon(lesson.lesson_type)}
																	</span>
																)}
															</>
														)}
													</div>
												</div>

												{/* Duration on current lesson (right-aligned) */}
												{isCurrent && lesson.duration_minutes != null && (
													<span className="text-[11px] text-muted-foreground/60 shrink-0 self-center">
														{lesson.duration_minutes} min
													</span>
												)}
											</Link>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</aside>
		</>
	);
}
