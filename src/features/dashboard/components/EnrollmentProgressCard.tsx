"use client";

import Link from "next/link";
import { PlayCircle, CheckCircle, BookOpen } from "lucide-react";
import { useCourse } from "@/features/courses/hooks/useCourses";
import type { EnrollmentWithCourse } from "@/features/dashboard/services/dashboard.service";

interface Props {
	enrollment: EnrollmentWithCourse;
}

export function EnrollmentProgressCard({ enrollment }: Props) {
	const { course_title, progress_percentage, status } = enrollment;
	const isCompleted = status === "COMPLETED" || progress_percentage >= 100;
	const progress = Math.min(Math.round(progress_percentage), 100);

	const courseSlug = enrollment.course?.slug ?? "";
	const { data: courseDetail } = useCourse(courseSlug);
	const firstLessonId = courseDetail?.modules?.[0]?.lessons?.[0]?.id;

	const continueHref = firstLessonId
		? `/dashboard/cursos/${courseSlug}/leccion/${firstLessonId}`
		: courseSlug
			? `/courses/${courseSlug}`
			: "/dashboard/mis-cursos";

	return (
		<div className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
			{/* Thumbnail placeholder */}
			<div className="relative aspect-video w-full bg-muted overflow-hidden">
				<div className="flex h-full items-center justify-center">
					<BookOpen className="w-10 h-10 text-muted-foreground/40" />
				</div>

				{/* Status badge */}
				<div
					className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md border ${
						isCompleted
							? "bg-emerald-500/90 text-white border-emerald-400/30"
							: "bg-background/90 text-foreground border-border/50"
					}`}>
					{isCompleted ? (
						<>
							<CheckCircle className="w-3 h-3" /> Completado
						</>
					) : (
						<>
							<PlayCircle className="w-3 h-3 text-primary" /> En curso
						</>
					)}
				</div>
			</div>

			{/* Content */}
			<div className="p-4 flex flex-col flex-1">
				<h3 className="font-bold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-3">
					{course_title ?? "Curso"}
				</h3>

				{/* Progress bar */}
				<div className="mt-auto space-y-1.5">
					<div className="flex items-center justify-between text-xs">
						<span className="text-muted-foreground font-medium">Progreso</span>
						<span
							className={`font-bold ${isCompleted ? "text-emerald-500" : "text-primary"}`}>
							{progress}%
						</span>
					</div>
					<div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
						<div
							className={`h-full rounded-full transition-all duration-700 ${
								isCompleted ? "bg-emerald-500" : "bg-primary"
							}`}
							style={{ width: `${progress}%` }}
						/>
					</div>
				</div>

				{/* CTA */}
				<Link
					href={continueHref}
					className={`mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold transition-all ${
						isCompleted
							? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border border-emerald-500/20"
							: "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
					}`}>
					<PlayCircle className="w-4 h-4" />
					{isCompleted ? "Ver curso" : "Continuar"}
				</Link>
			</div>
		</div>
	);
}
