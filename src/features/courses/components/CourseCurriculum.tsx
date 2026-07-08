"use client";

import { useState } from "react";
import Link from "next/link";
import {
	ChevronDown,
	PlayCircle,
	FileText,
	HelpCircle,
	Lock,
	BookOpen,
} from "lucide-react";
import type { ModuleWithLessons, LessonType } from "@/types";
import { useEnrollmentsStore } from "@/store/enrollments-store";

interface CourseCurriculumProps {
	modules: ModuleWithLessons[];
	/** When provided and user is enrolled, lesson rows become navigation links */
	courseSlug?: string;
	courseId?: string;
	/** Course category color (hex). Falls back to the --ring token when omitted. */
	accentColor?: string;
}

const getLessonIcon = (type: LessonType) => {
	switch (type) {
		case "VIDEO":
			return <PlayCircle className="w-4 h-4 text-sky-500" />;
		case "PDF":
			return <FileText className="w-4 h-4 text-rose-500" />;
		case "TEXT":
			return <HelpCircle className="w-4 h-4 text-amber-500" />;
		default:
			return <PlayCircle className="w-4 h-4 text-muted-foreground" />;
	}
};

export function CourseCurriculum({
	modules,
	courseSlug,
	courseId,
	accentColor,
}: CourseCurriculumProps) {
	const [openModuleId, setOpenModuleId] = useState<string | null>(
		modules.length > 0 ? modules[0].id : null,
	);
	const isEnrolled = useEnrollmentsStore((s) => s.isEnrolled(courseId ?? ""));
	const canNavigate = !!courseSlug && !!courseId && isEnrolled;

	const iconStyle = accentColor
		? { backgroundColor: `${accentColor}15`, color: accentColor }
		: undefined;
	const numberStyle = accentColor
		? {
				backgroundColor: `${accentColor}15`,
				color: accentColor,
				borderColor: `${accentColor}30`,
			}
		: undefined;

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
			<div className="flex items-center gap-3 mb-6">
				<div
					className={`p-2.5 rounded-xl transition-colors ${accentColor ? "" : "bg-primary/10 text-primary"}`}
					style={iconStyle}>
					<BookOpen className="w-6 h-6" />
				</div>
				<h3 className="text-xl font-bold text-foreground m-0">
					Plan de Estudios
				</h3>
			</div>

			<div className="flex flex-col gap-3">
				{modules.map((module, index) => {
					const isOpen = openModuleId === module.id;

					return (
						<div
							key={module.id}
							className={`border border-border/60 rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
								isOpen
									? "bg-card shadow-md ring-1 ring-border/50"
									: "bg-card/40 hover:bg-card/80 hover:border-border/80"
							}`}>
							{/* Header */}
							<button
								onClick={() => toggleModule(module.id)}
								aria-expanded={isOpen}
								aria-controls={`module-content-${module.id}`}
								className="w-full flex items-center justify-between p-5 text-left transition-colors focus-visible:outline-none focus-visible:bg-muted/50 group">
								<div className="flex flex-col gap-1.5">
									<h4 className="font-bold text-foreground flex items-center gap-3 text-base md:text-lg">
										<span
											className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-black border transition-colors ${accentColor ? "" : "bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/15"}`}
											style={numberStyle}>
											{index + 1}
										</span>
										<span className="group-hover:text-primary transition-colors">
											{module.title}
										</span>
									</h4>
									{module.description && (
										<p className="text-sm text-muted-foreground ml-11 line-clamp-1">
											{module.description}
										</p>
									)}
								</div>

								<div className="flex items-center gap-4 text-muted-foreground ml-4">
									<div className="hidden sm:flex items-center gap-4 text-xs font-medium px-2.5 py-1 rounded-md bg-muted/50 group-hover:bg-muted transition-colors">
										<span>{module.lessons.length} {module.lessons.length === 1 ? 'clase' : 'clases'}</span>
									</div>
									<ChevronDown
										className={`w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
											isOpen ? "rotate-180 text-primary" : "group-hover:text-foreground"
										}`}
									/>
								</div>
							</button>

							{/* Body */}
							<div
								id={`module-content-${module.id}`}
								className={`grid transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
									isOpen
										? "grid-rows-[1fr] opacity-100"
										: "grid-rows-[0fr] opacity-0"
								}`}>
								<div className="overflow-hidden">
									<div className="p-2 pt-0 pb-5">
										<div className="flex flex-col gap-1.5 px-3 ml-7 border-l-2 border-border/40">
											{module.lessons.length === 0 ? (
												<div className="p-5 text-sm text-muted-foreground ml-4 my-2 border border-dashed rounded-xl bg-muted/30 flex items-center justify-center">
													Próximamente más contenido.
												</div>
											) : (
												module.lessons.map((lesson) => {
													const rowContent = (
														<>
															<div className="flex items-center justify-center w-8 h-8 rounded-full bg-card shadow-sm border border-border/50 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
																{getLessonIcon(lesson.lesson_type)}
															</div>
															<span className={`text-sm font-medium transition-colors flex-1 ${canNavigate ? "text-foreground/80 group-hover:text-foreground" : "text-muted-foreground group-hover:text-muted-foreground/80"}`}>
																{lesson.title}
															</span>
															{!canNavigate && (
																<div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted/50 shrink-0">
																	<Lock className="w-3.5 h-3.5 text-muted-foreground/50" />
																</div>
															)}
														</>
													);
													const cls =
														"flex items-center gap-3 p-3 ml-3 rounded-xl transition-all duration-200 group relative";
													if (canNavigate) {
														return (
															<Link
																key={lesson.id}
																href={`/dashboard/cursos/${courseSlug}/leccion/${lesson.id}`}
																className={`${cls} hover:bg-muted/60 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}>
																{rowContent}
															</Link>
														);
													}
													return (
														<div
															key={lesson.id}
															className={`${cls} opacity-90 cursor-not-allowed`}>
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
