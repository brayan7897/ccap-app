"use client";

import { useState } from "react";
import Link from "next/link";
import {
	CheckCircle2,
	PlayCircle,
	FileText,
	HelpCircle,
	ChevronDown,
	ChevronLeft,
	X,
	Check,
} from "lucide-react";
import type { CourseDetail, LessonProgress, LessonType } from "@/types";

interface LessonNavSidebarProps {
	course: CourseDetail;
	currentLessonId: string;
	courseSlug: string;
	progress: LessonProgress[];
	isOpen?: boolean;
	onClose?: () => void;
}

function getLessonIcon(type: LessonType) {
	switch (type) {
		case "VIDEO":
			return <PlayCircle className="w-4 h-4 text-primary shrink-0" />;
		case "PDF":
			return <FileText className="w-4 h-4 text-rose-500 shrink-0" />;
		case "TEXT":
			return <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />;
		default:
			return <PlayCircle className="w-4 h-4 text-muted-foreground shrink-0" />;
	}
}

export function LessonNavSidebar({
	course,
	currentLessonId,
	courseSlug,
	progress,
	isOpen = false,
	onClose,
}: LessonNavSidebarProps) {
	const [openModuleId, setOpenModuleId] = useState<string | null>(() => {
		// Default open: the module that contains the current lesson
		for (const mod of course.modules) {
			if (mod.lessons.some((l) => l.id === currentLessonId)) return mod.id;
		}
		return course.modules[0]?.id ?? null;
	});

	const progressMap = new Map(progress.map((p) => [p.lesson_id, p]));

	const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
	const totalCompleted = course.modules.reduce(
		(acc, mod) =>
			acc +
			mod.lessons.filter((l) => progressMap.get(l.id)?.is_completed).length,
		0,
	);
	const progressPercent =
		totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

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
				className={`fixed lg:static inset-y-0 right-0 z-50 flex flex-col h-full bg-card border-l border-border w-[320px] xl:w-[380px] shrink-0 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}>
				{/* Header */}
				<div className="px-5 py-6 border-b border-border shrink-0 space-y-4">
					<div className="flex items-center justify-between">
						<Link
							href={`/courses/${courseSlug}`}
							className="text-xs text-primary hover:text-primary/80 font-bold flex items-center gap-1 transition-colors">
							<ChevronLeft className="w-4 h-4" /> Volver al curso
						</Link>
						{onClose && (
							<button
								onClick={onClose}
								className="lg:hidden p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors">
								<X className="w-5 h-5" />
							</button>
						)}
					</div>
					<h2 className="text-base font-extrabold text-foreground line-clamp-2 leading-snug">
						{course.title}
					</h2>

					{/* Course Progress */}
					<div className="space-y-2 pt-1">
						<div className="flex items-center justify-between text-xs font-bold">
							<span className="text-muted-foreground">Progreso</span>
							<span className="text-primary">{progressPercent}%</span>
						</div>
						<div className="h-2 w-full bg-muted overflow-hidden rounded-full">
							<div
								className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
								style={{ width: `${progressPercent}%` }}
							/>
						</div>
					</div>
				</div>

			{/* Scrollable module/lesson list */}
			<div className="flex-1 overflow-y-auto p-4 space-y-3">
				{course.modules.map((module, idx) => {
					const isModuleOpen = openModuleId === module.id;
					const completedCount = module.lessons.filter(
						(l) => progressMap.get(l.id)?.is_completed,
					).length;

					return (
						<div
							key={module.id}
							className="flex flex-col border border-border/50 rounded-2xl bg-card overflow-hidden shadow-sm">
							{/* Module header button */}
							<button
								onClick={() => setOpenModuleId(isModuleOpen ? null : module.id)}
								className={`w-full flex items-start justify-between gap-3 px-4 py-4 text-left transition-colors ${
									isModuleOpen ? "bg-muted/30" : "hover:bg-muted/30"
								}`}>
								<div className="min-w-0">
									<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 flex items-center gap-2">
										Módulo {idx + 1}
										{completedCount === module.lessons.length && completedCount > 0 && (
											<span className="bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded-sm inline-flex items-center gap-0.5">
												<Check className="w-3 h-3" />
											</span>
										)}
									</p>
									<p className="text-sm font-bold text-foreground line-clamp-2 leading-snug">
										{module.title}
									</p>
									<p className="text-xs text-muted-foreground/80 mt-1 font-medium">
										{completedCount}/{module.lessons.length} completadas
									</p>
								</div>
								<div className="shrink-0 w-8 h-8 rounded-full border border-border/50 bg-background flex items-center justify-center text-muted-foreground">
									<ChevronDown
										className={`w-4 h-4 transition-transform duration-300 ${
											isModuleOpen ? "rotate-180 text-foreground" : ""
										}`}
									/>
								</div>
							</button>

							{/* Lesson list (collapsible) */}
							<div
								className={`grid transition-all duration-300 ease-in-out ${
									isModuleOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
								}`}>
								<div className="overflow-hidden bg-muted/10">
									<div className="flex flex-col px-2 py-3 gap-1">
										{module.lessons.map((lesson) => {
											const isCurrent = lesson.id === currentLessonId;
											const isCompleted =
												progressMap.get(lesson.id)?.is_completed ?? false;

											return (
												<Link
													key={lesson.id}
													href={`/dashboard/cursos/${courseSlug}/leccion/${lesson.id}`}
													onClick={() => {
														if (onClose) onClose();
													}}
													className={`relative flex items-start gap-3 px-3 py-3 text-sm rounded-xl transition-all duration-200 ${
														isCurrent
															? "bg-primary/10 text-primary font-semibold shadow-sm"
															: "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
													}`}>
													{isCurrent && (
														<div className="absolute left-0 top-3 bottom-3 w-1 bg-primary rounded-r-md" />
													)}
													
													{/* Status icon */}
													<div className="mt-0.5 shrink-0 w-6 h-6 flex items-center justify-center">
														{isCompleted ? (
															<CheckCircle2 className="w-5 h-5 text-emerald-500" />
														) : (
															getLessonIcon(lesson.lesson_type)
														)}
													</div>

													{/* Title + duration */}
													<div className="flex-1 min-w-0 pr-2">
														<p className="line-clamp-2 leading-snug">
															{lesson.title}
														</p>
														{lesson.duration_minutes ? (
															<p
																className={`text-[11px] mt-1 font-medium ${
																	isCurrent ? "text-primary/70" : "text-muted-foreground/60"
																}`}>
																{lesson.duration_minutes} min
															</p>
														) : null}
													</div>
												</Link>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</aside>
		</>
	);
}
