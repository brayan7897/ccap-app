"use client";

import { useState } from "react";
import Link from "next/link";
import {
	ChevronDown,
	PlayCircle,
	FileText,
	HelpCircle,
	Clock,
} from "lucide-react";
import type { ModuleWithLessons, LessonType } from "@/types";
import { useEnrollmentsStore } from "@/store/enrollments-store";

interface CourseCurriculumProps {
	modules: ModuleWithLessons[];
	/** When provided and user is enrolled, lesson rows become navigation links */
	courseSlug?: string;
	courseId?: string;
}

const getLessonIcon = (type: LessonType) => {
	switch (type) {
		case "VIDEO":
			return <PlayCircle className="w-4 h-4 text-primary" />;
		case "PDF":
			return <FileText className="w-4 h-4 text-rose-500" />;
		case "TEXT":
			return <HelpCircle className="w-4 h-4 text-amber-500" />;
		default:
			return <PlayCircle className="w-4 h-4 text-muted-foreground" />;
	}
};

const formatDuration = (minutes: number | null) => {
	if (!minutes) return "";
	return `${minutes} min`;
};

export function CourseCurriculum({
	modules,
	courseSlug,
	courseId,
}: CourseCurriculumProps) {
	const [openModuleId, setOpenModuleId] = useState<string | null>(
		modules.length > 0 ? modules[0].id : null,
	);
	const isEnrolled = useEnrollmentsStore((s) => s.isEnrolled(courseId ?? ""));
	const canNavigate = !!courseSlug && !!courseId && isEnrolled;

	const toggleModule = (moduleId: string) => {
		setOpenModuleId((prev) => (prev === moduleId ? null : moduleId));
	};

	if (!modules || modules.length === 0) {
		return (
			<div className="p-6 text-center text-muted-foreground border border-border/50 rounded-2xl bg-muted/20">
				No hay módulos disponibles para este curso aún.
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<h3 className="text-xl font-bold text-foreground mb-6">
				Plan de Estudios
			</h3>

			<div className="flex flex-col gap-3">
				{modules.map((module, index) => {
					const isOpen = openModuleId === module.id;
					const totalDuration = module.lessons.reduce(
						(acc, lesson) => acc + (lesson.duration_minutes || 0),
						0,
					);

					return (
						<div
							key={module.id}
							className={`border border-border/60 rounded-2xl overflow-hidden transition-all duration-300 ${
								isOpen
									? "bg-card shadow-lg ring-1 ring-primary/20"
									: "bg-card/50 hover:bg-card hover:border-border"
							}`}>
							{/* Header */}
							<button
								onClick={() => toggleModule(module.id)}
								className="w-full flex items-center justify-between p-5 text-left focus:outline-none">
								<div className="flex flex-col gap-1">
									<h4 className="font-bold text-foreground flex items-center gap-3 text-base md:text-lg">
										<span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-black">
											{index + 1}
										</span>
										{module.title}
									</h4>
									{module.description && (
										<p className="text-sm text-muted-foreground mt-1 ml-11 line-clamp-1">
											{module.description}
										</p>
									)}
								</div>

								<div className="flex items-center gap-4 text-muted-foreground">
									<div className="hidden sm:flex items-center gap-4 text-xs font-medium">
										<span>{module.lessons.length} clases</span>
										{totalDuration > 0 && (
											<span className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md">
												<Clock className="w-3.5 h-3.5" />
												{formatDuration(totalDuration)}
											</span>
										)}
									</div>
									<ChevronDown
										className={`w-5 h-5 transition-transform duration-300 ${
											isOpen ? "rotate-180 text-primary" : ""
										}`}
									/>
								</div>
							</button>

							{/* Body */}
							<div
								className={`grid transition-all duration-300 ease-in-out ${
									isOpen
										? "grid-rows-[1fr] opacity-100"
										: "grid-rows-[0fr] opacity-0"
								}`}>
								<div className="overflow-hidden">
									<div className="p-2 pt-0 pb-4">
										<div className="flex flex-col gap-1 px-3 ml-8 border-l border-border/50">
											{module.lessons.length === 0 ? (
												<div className="p-4 text-sm text-muted-foreground italic ml-2">
													Próximamente más contenido.
												</div>
											) : (
												module.lessons.map((lesson) => {
													const rowContent = (
														<>
															<div className="flex items-center justify-center w-8 h-8 rounded-full bg-card shadow-sm border border-border/50 group-hover:scale-110 transition-transform">
																{getLessonIcon(lesson.lesson_type)}
															</div>
															<span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors flex-1">
																{lesson.title}
															</span>
															{lesson.duration_minutes ? (
																<span className="text-xs text-muted-foreground font-medium">
																	{formatDuration(lesson.duration_minutes)}
																</span>
															) : null}
														</>
													);
													const cls =
														"flex items-center gap-3 p-3 ml-2 rounded-xl hover:bg-muted/50 transition-colors group";
													if (canNavigate) {
														return (
															<Link
																key={lesson.id}
																href={`/dashboard/cursos/${courseSlug}/leccion/${lesson.id}`}
																className={cls}>
																{rowContent}
															</Link>
														);
													}
													return (
														<div
															key={lesson.id}
															className={`${cls} cursor-default`}>
															{rowContent}
														</div>
													);
												})
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
