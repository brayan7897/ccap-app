"use client";

import { Library } from "lucide-react";
import { useCourses } from "@/features/courses/hooks/useCourses";
import {
	CourseCard,
	type CourseCardProps,
} from "@/components/courses/CourseCard";
import type { Course } from "@/types";

function toCardProps(course: Course): CourseCardProps {
	return {
		id: course.id,
		slug: course.slug,
		title: course.title,
		short_description: course.short_description,
		thumbnail_url: course.thumbnail_url,
		course_level: course.course_level,
		instructor_name: course.instructor
			? `${course.instructor.first_name} ${course.instructor.last_name}`
			: undefined,
		category_name: course.category?.name,
		tags: course.tags,
		total_lessons: course.total_lessons,
		total_duration: course.total_duration_seconds
			? `${Math.round(course.total_duration_seconds / 3600)} horas`
			: undefined,
		enrolled_count: course.enrolled_count,
	};
}

export default function CatalogoPage() {
	const { data: courses, isLoading } = useCourses(0, 50);

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-2xl font-black text-foreground">
						Catálogo de Cursos
					</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Descubre todos los cursos disponibles y amplía tus habilidades.
					</p>
				</div>
				{!isLoading && courses && (
					<span className="text-sm font-semibold text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-xl">
						{courses.length} curso{courses.length !== 1 ? "s" : ""}
					</span>
				)}
			</div>

			{/* Course grid */}
			{isLoading ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{Array.from({ length: 9 }).map((_, i) => (
						<div
							key={i}
							className="rounded-2xl border border-border bg-card animate-pulse">
							<div className="aspect-video bg-muted rounded-t-2xl" />
							<div className="p-5 space-y-3">
								<div className="h-4 bg-muted rounded w-3/4" />
								<div className="h-3 bg-muted rounded w-full" />
								<div className="h-3 bg-muted rounded w-2/3" />
								<div className="h-9 bg-muted rounded-xl" />
							</div>
						</div>
					))}
				</div>
			) : courses && courses.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{courses.map((course) => (
						<CourseCard key={course.id} {...toCardProps(course)} />
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed border-border">
					<Library className="w-12 h-12 text-muted-foreground/30 mb-4" />
					<p className="text-lg font-bold text-muted-foreground">
						No hay cursos disponibles aún
					</p>
					<p className="text-sm text-muted-foreground/70 mt-1">
						Revisa más tarde, pronto habrá nuevos cursos.
					</p>
				</div>
			)}
		</div>
	);
}
