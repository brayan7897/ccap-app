"use client";

import { useCourses } from "../hooks/useCourses";
import { CourseCard } from "./CourseCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";

function CourseSkeleton() {
	return (
		<div className="space-y-3">
			<Skeleton className="aspect-video w-full rounded-lg" />
			<Skeleton className="h-4 w-3/4" />
			<Skeleton className="h-3 w-full" />
			<Skeleton className="h-3 w-1/2" />
		</div>
	);
}

export function CourseGrid() {
	const searchParams = useSearchParams();
	const category = searchParams.get("category") || undefined;
	const { data: courses, isLoading, isError } = useCourses(0, 20, category);

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{Array.from({ length: 8 }).map((_, i) => (
					<CourseSkeleton key={i} />
				))}
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
				<p className="text-sm">
					No se pudieron cargar los cursos. Intenta de nuevo.
				</p>
			</div>
		);
	}

	if (!courses?.length) {
		return (
			<div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
				<p className="text-sm">No hay cursos disponibles.</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{courses.map((course) => (
				<CourseCard
					key={course.id}
					id={course.id}
					slug={course.slug}
					title={course.title}
					short_description={course.short_description}
					thumbnail_url={course.thumbnail_url}
					course_level={course.course_level}
					instructor_name={
						course.instructor
							? `${course.instructor.first_name} ${course.instructor.last_name}`
							: undefined
					}
					category_name={course.category_name || course.category?.name || undefined}
					category_color={course.category_color || course.category?.color || undefined}
					tags={course.tags}
					total_lessons={course.total_lessons}
					total_duration={
						course.total_duration_seconds
							? `${Math.round(course.total_duration_seconds / 3600)} horas`
							: undefined
					}
					enrolled_count={course.enrolled_count}
				/>
			))}
		</div>
	);
}
