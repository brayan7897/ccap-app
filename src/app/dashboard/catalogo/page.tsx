"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Library, Search, X } from "lucide-react";
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
		category_name: course.category_name || course.category?.name || undefined,
		category_color: course.category_color || course.category?.color || undefined,
		tags: course.tags,
		total_lessons: course.total_lessons,
		total_duration: course.total_duration_seconds
			? `${Math.round(course.total_duration_seconds / 3600)} horas`
			: undefined,
		enrolled_count: course.enrolled_count,
		course_type: course.course_type,
		price: course.price,
	};
}

export default function CatalogoPage() {
	return (
		<Suspense fallback={null}>
			<CatalogoPageContent />
		</Suspense>
	);
}

function CatalogoPageContent() {
	const { data: courses, isLoading } = useCourses(0, 50);
	const publishedCourses = courses?.filter(c => c.status === "published") || [];

	const searchParams = useSearchParams();
	const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

	// Keep in sync if the URL changes without remounting (e.g. search modal
	// used again while already on this page).
	useEffect(() => {
		setSearchQuery(searchParams.get("q") || "");
	}, [searchParams]);

	const normalizedQuery = searchQuery.trim().toLowerCase();
	const filteredCourses = normalizedQuery
		? publishedCourses.filter((c) => {
				const haystack = [
					c.title,
					c.short_description,
					c.category_name || c.category?.name,
					c.instructor ? `${c.instructor.first_name} ${c.instructor.last_name}` : "",
					...(c.tags || []),
				]
					.filter(Boolean)
					.join(" ")
					.toLowerCase();
				return haystack.includes(normalizedQuery);
			})
		: publishedCourses;

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
				<div>
					<p className="text-[11px] font-bold text-ring uppercase tracking-widest mb-1.5">
						Catálogo
					</p>
					<h1 className="text-3xl font-black text-foreground tracking-tight">
						Encuentra tu próximo curso
					</h1>
					<p className="text-sm text-muted-foreground mt-1.5">
						Descubre todos los cursos disponibles y amplía tus habilidades.
					</p>
				</div>
				{!isLoading && publishedCourses.length > 0 && (
					<span className="shrink-0 text-xs font-bold text-muted-foreground border border-border rounded-full px-3.5 py-1.5 tabular-nums">
						{filteredCourses.length} curso{filteredCourses.length !== 1 ? "s" : ""}
					</span>
				)}
			</div>

			{/* Search bar */}
			<div className="flex items-center bg-muted/40 border border-border rounded-xl overflow-hidden focus-within:border-ring/50 focus-within:bg-card transition-colors max-w-xl">
				<div className="pl-4 flex items-center justify-center text-muted-foreground">
					<Search className="w-4.5 h-4.5" />
				</div>
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Buscar curso, instructor o palabra clave..."
					className="w-full bg-transparent border-none outline-none text-foreground px-3.5 py-3 placeholder:text-muted-foreground text-sm"
				/>
				{searchQuery && (
					<button
						type="button"
						onClick={() => setSearchQuery("")}
						aria-label="Limpiar búsqueda"
						className="px-3.5 text-muted-foreground hover:text-foreground transition-colors shrink-0">
						<X className="w-4 h-4" />
					</button>
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
			) : filteredCourses.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredCourses.map((course) => (
						<CourseCard key={course.id} {...toCardProps(course)} href={`/dashboard/cursos/${course.slug}`} />
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed border-border">
					<Library className="w-12 h-12 text-muted-foreground/30 mb-4" />
					<p className="text-lg font-bold text-muted-foreground">
						{normalizedQuery ? "No se encontraron cursos" : "No hay cursos disponibles aún"}
					</p>
					<p className="text-sm text-muted-foreground/70 mt-1">
						{normalizedQuery
							? `No hay resultados para "${searchQuery.trim()}".`
							: "Revisa más tarde, pronto habrá nuevos cursos."}
					</p>
				</div>
			)}
		</div>
	);
}
