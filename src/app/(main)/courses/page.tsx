"use client";

import { useCourses } from "@/features/courses/hooks/useCourses";
import { CourseCard } from "@/components/courses/CourseCard";
import { Search, Filter, SlidersHorizontal, Loader2 } from "lucide-react";
import type { CourseCardProps } from "@/components/courses/CourseCard";
import type { Course } from "@/types";
import { useState } from "react";

/** Maps backend Course → presentational CourseCardProps */
function toCardProps(course: Course): CourseCardProps {
	const totalSeconds =
		course.total_duration_seconds ??
		course.modules?.reduce(
			(sum, m) =>
				sum +
				(m.lessons?.reduce((s, l) => s + (l.duration_minutes ?? 0) * 60, 0) ??
					0),
			0,
		);
	const hours = totalSeconds ? Math.round(totalSeconds / 3600) : undefined;

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
		category_name: course.category?.name ?? undefined,
		tags: course.tags,
		total_lessons:
			course.total_lessons ??
			course.modules?.reduce((sum, m) => sum + (m.lessons?.length ?? 0), 0),
		total_duration: hours ? `${hours} horas` : undefined,
		enrolled_count: course.enrolled_count,
	};
}

const CATEGORIES = [
	"Ingeniería Civil",
	"Arquitectura",
	"Gestión BIM",
	"Minería",
	"Software Premium",
];

const LEVELS = ["Básico", "Intermedio", "Avanzado"];

export default function CoursesPage() {
	const [skip] = useState(0);
	const limit = 20;
	const { data: courses, isLoading, isError } = useCourses(skip, limit);

	return (
		<div className="min-h-screen pt-8 pb-20">
			{/* Page Header */}
			<div className="container mx-auto px-4 lg:px-8 mb-12">
				<h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 transition-colors">
					Explora nuestros <span className="text-primary">Cursos</span>
				</h1>

				{/* Search Bar */}
				<div className="w-full max-w-3xl flex items-center bg-card border border-border rounded-xl overflow-hidden focus-within:border-primary/50 transition-colors shadow-lg">
					<div className="pl-4 flex items-center justify-center text-muted-foreground">
						<Search className="w-5 h-5" />
					</div>
					<input
						type="text"
						placeholder="Buscar por curso, instructor, software..."
						className="w-full bg-transparent border-none outline-none text-foreground px-4 py-4 placeholder:text-muted-foreground"
					/>
					<button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 font-semibold transition-colors">
						Buscar
					</button>
				</div>
			</div>

			<div className="container mx-auto px-4 lg:px-8">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Sidebar Filters */}
					<aside className="w-full lg:w-64 shrink-0 space-y-8">
						<div className="flex items-center gap-2 text-foreground font-bold mb-4 pb-4 border-b border-border">
							<SlidersHorizontal className="w-5 h-5 text-primary" />
							<h2>Filtros</h2>
						</div>

						{/* Category Filter */}
						<div>
							<h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
								Categoría
							</h3>
							<ul className="space-y-2">
								{CATEGORIES.map((cat) => (
									<li key={cat}>
										<label className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground cursor-pointer group transition-colors">
											<div className="w-4 h-4 rounded border border-border group-hover:border-primary flex items-center justify-center bg-card" />
											{cat}
										</label>
									</li>
								))}
							</ul>
						</div>

						{/* Level Filter */}
						<div>
							<h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
								Nivel
							</h3>
							<ul className="space-y-2">
								{LEVELS.map((level) => (
									<li key={level}>
										<label className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground cursor-pointer group transition-colors">
											<div className="w-4 h-4 rounded border border-border group-hover:border-primary flex items-center justify-center bg-card" />
											{level}
										</label>
									</li>
								))}
							</ul>
						</div>
					</aside>

					{/* Main Content */}
					<main className="flex-1">
						<div className="flex items-center justify-between mb-6">
							<p className="text-muted-foreground text-sm">
								{isLoading ? (
									"Cargando cursos..."
								) : isError ? (
									"Error al cargar"
								) : (
									<>
										Mostrando{" "}
										<span className="text-foreground font-bold">
											{courses?.length ?? 0}
										</span>{" "}
										resultados
									</>
								)}
							</p>

							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Filter className="w-4 h-4" />
								<span>Ordenar por:</span>
								<select className="bg-card border border-border rounded-md px-3 py-1.5 text-foreground outline-none focus:border-primary">
									<option>Más Populares</option>
									<option>Nuevos</option>
									<option>Nivel: Básico primero</option>
								</select>
							</div>
						</div>

						{/* Loading state */}
						{isLoading && (
							<div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
								<Loader2 className="w-8 h-8 animate-spin text-primary" />
								<p className="text-sm">Cargando cursos desde la API...</p>
							</div>
						)}

						{/* Error state */}
						{isError && (
							<div className="flex flex-col items-center justify-center py-24 gap-3">
								<p className="text-foreground font-semibold">
									No se pudieron cargar los cursos.
								</p>
								<p className="text-sm text-muted-foreground">
									Verifica que la API esté en ejecución en{" "}
									<code className="bg-muted px-1.5 py-0.5 rounded text-xs">
										http://localhost:8000
									</code>
								</p>
							</div>
						)}

						{/* Empty state */}
						{!isLoading && !isError && !courses?.length && (
							<div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
								<p className="text-sm">No hay cursos publicados aún.</p>
							</div>
						)}

						{/* Course Grid */}
						{!isLoading && !isError && !!courses?.length && (
							<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
								{courses.map((course) => (
									<CourseCard key={course.id} {...toCardProps(course)} />
								))}
							</div>
						)}

						{/* Pagination (only when data loaded) */}
						{!isLoading && !isError && !!courses?.length && (
							<div className="mt-12 flex items-center justify-center gap-2">
								<button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-card hover:text-foreground transition-colors">
									&lt;
								</button>
								<button className="w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center">
									1
								</button>
								<button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-card hover:text-foreground transition-colors">
									&gt;
								</button>
							</div>
						)}
					</main>
				</div>
			</div>
		</div>
	);
}
