"use client";

import { useCourses } from "@/features/courses/hooks/useCourses";
import { categoriesService } from "@/features/categories/services/categories.service";
import { CourseCard } from "@/components/courses/CourseCard";
import { Search, Filter, SlidersHorizontal, Loader2, CheckCircle2, QrCode, RefreshCw, ChevronDown } from "lucide-react";
import type { CourseCardProps } from "@/components/courses/CourseCard";
import type { Course } from "@/types";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
		category_name: course.category_name || course.category?.name || undefined,
		category_color: course.category_color || course.category?.color || undefined,
		tags: course.tags,
		total_lessons:
			course.total_lessons ??
			course.modules?.reduce((sum, m) => sum + (m.lessons?.length ?? 0), 0),
		total_duration: hours ? `${hours} horas` : undefined,
		enrolled_count: course.enrolled_count,
	};
}

// Icon mapper per category name (approximate based on mockup)
const getCategoryIconColor = (index: number) => {
	const colors = ["text-blue-600", "text-green-500", "text-yellow-500", "text-purple-600", "text-cyan-500"];
	return colors[index % colors.length];
};

export default function CoursesPage() {
	const [skip] = useState(0);
	const limit = 20;
	
	// Fetch Courses
	const { data: courses, isLoading, isError } = useCourses(skip, limit);
	const publishedCourses = courses?.filter(c => c.is_published) || [];

	// Fetch Categories
	const { data: categories, isLoading: isCategoriesLoading } = useQuery({
		queryKey: ["categories-list"],
		queryFn: () => categoriesService.list(0, 50),
	});

	// Filter state (simulate active filter)
	const [activeCategory, setActiveCategory] = useState<string | null>(null);

	const filteredCourses = activeCategory 
		? publishedCourses.filter(c => c.category_id === activeCategory)
		: publishedCourses;

	return (
		<div className="min-h-screen pt-6 pb-20">
			{/* Page Header Area */}
			<div className="container mx-auto px-4 lg:px-8 mb-10">
				<div className="flex flex-col xl:flex-row justify-between items-start gap-8">
					<div className="flex-1 space-y-4">
						{/* Title */}
						<h1 className="text-3xl md:text-5xl font-black uppercase text-[#0b1b36] dark:text-foreground">
							Explora nuestros <span className="text-[#d99820]">Cursos</span>
						</h1>
						
						{/* Verification check */}
						<div className="flex items-start gap-2 text-muted-foreground">
							<CheckCircle2 className="w-5 h-5 text-gray-500 shrink-0" />
							<p className="text-sm md:text-base font-medium">
								Certificación con código QR verificable que respalda tu actualización profesional y fortalece tu perfil laboral.
							</p>
						</div>

						{/* Search Bar */}
						<div className="w-full max-w-2xl flex items-center bg-card border border-gray-200 dark:border-border rounded-xl overflow-hidden focus-within:border-[#0b1b36] transition-colors shadow-sm mt-6">
							<div className="pl-4 flex items-center justify-center text-muted-foreground">
								<Search className="w-5 h-5" />
							</div>
							<input
								type="text"
								placeholder="Buscar curso, programa o palabra clave..."
								className="w-full bg-transparent border-none outline-none text-foreground px-4 py-3.5 placeholder:text-muted-foreground text-sm"
							/>
							<button className="bg-[#0b1b36] hover:bg-[#1a2d53] text-white px-8 py-3.5 font-bold transition-colors text-sm">
								Buscar
							</button>
						</div>
					</div>

					{/* Certificate Banner Component */}
					<div className="hidden lg:flex items-center gap-4 bg-white dark:bg-card border border-gray-200 dark:border-border rounded-2xl p-4 shadow-sm shrink-0 h-full max-w-sm">
						<div className="w-16 h-16 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700/50 flex items-center justify-center shrink-0">
							<QrCode className="w-8 h-8 text-[#d99820]" />
						</div>
						<div>
							<h3 className="font-bold text-sm text-[#0b1b36] dark:text-foreground uppercase">CERTIFICADO CON CÓDIGO QR</h3>
							<p className="text-xs text-muted-foreground mt-1">Verificable y reconocido por entidades públicas y privadas.</p>
						</div>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 lg:px-8">
				<div className="flex flex-col lg:flex-row gap-8">
					
					{/* Sidebar Filters */}
					<aside className="w-full lg:w-72 shrink-0">
						{/* Blue Header */}
						<div className="bg-[#0b1b36] text-white rounded-t-xl p-4 flex items-center gap-3">
							<SlidersHorizontal className="w-5 h-5" />
							<h2 className="font-bold tracking-widest text-sm uppercase">Filtros</h2>
						</div>

						{/* Filter Body */}
						<div className="bg-white dark:bg-card border border-t-0 border-gray-200 dark:border-border rounded-b-xl shadow-sm p-4 space-y-6">
							
							{/* AREA Section */}
							<div>
								<h3 className="text-sm font-black text-[#0b1b36] dark:text-foreground mb-4 uppercase tracking-wider">
									Área
								</h3>
								
								{isCategoriesLoading ? (
									<div className="flex items-center justify-center py-4 text-muted-foreground">
										<Loader2 className="w-5 h-5 animate-spin" />
									</div>
								) : categories && categories.length > 0 ? (
									<div className="space-y-3">
										{categories.map((cat, idx) => {
											const isActive = activeCategory === cat.id;
											const customColor = cat.color || '#3B82F6';
											return (
												<div key={cat.id} className="border border-gray-100 dark:border-border rounded-lg overflow-hidden">
													<button 
														onClick={() => setActiveCategory(isActive ? null : cat.id)}
														className={`w-full flex items-center justify-between p-3 transition-colors ${
															isActive 
																? "bg-muted/50" 
																: "bg-white dark:bg-card hover:bg-gray-50 dark:hover:bg-muted/50"
														}`}
														style={isActive ? {
															borderLeft: `4px solid ${customColor}`
														} : undefined}
													>
														<div className="flex items-center gap-3">
															<div 
																className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
																style={{ 
																	backgroundColor: `${customColor}15`, 
																	color: customColor 
																}}
															>
																<SlidersHorizontal className="w-4 h-4" />
															</div>
															<span className="font-bold text-xs text-[#0b1b36] dark:text-foreground uppercase text-left">
																{cat.name}
															</span>
														</div>
														
														{/* Botón de filtrar en lugar de chevron */}
														<span 
															className="text-[10px] font-bold px-2 py-1 rounded-md uppercase transition-colors"
															style={isActive ? {
																backgroundColor: customColor,
																color: '#fff'
															} : undefined}
														>
															{isActive ? "Activo" : "Filtrar"}
														</span>
													</button>
												</div>
											);
										})}
									</div>
								) : (
									<p className="text-xs text-muted-foreground">No hay categorías disponibles.</p>
								)}
							</div>

							{/* Clear filters button */}
							<div className="pt-2">
								<button 
									onClick={() => setActiveCategory(null)}
									className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-[#0b1b36] dark:text-foreground border border-gray-200 dark:border-border rounded-xl hover:bg-gray-50 dark:hover:bg-muted transition-colors"
								>
									<RefreshCw className="w-4 h-4" />
									Limpiar filtros
								</button>
							</div>
						</div>
					</aside>

					{/* Main Content */}
					<main className="flex-1">
						<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
							<p className="text-muted-foreground text-sm font-medium">
								{isLoading ? (
									"Cargando cursos..."
								) : isError ? (
									"Error al cargar"
								) : (
									<>
										Mostrando{" "}
										<span className="text-[#0b1b36] dark:text-foreground font-black">
											{filteredCourses.length}
										</span>{" "}
										cursos
									</>
								)}
							</p>

							<div className="flex items-center gap-2 text-sm text-[#0b1b36] dark:text-foreground font-semibold">
								<span>Ordenar por:</span>
								<select className="bg-white dark:bg-card border border-gray-200 dark:border-border rounded-lg px-3 py-1.5 text-[#0b1b36] dark:text-foreground outline-none focus:border-[#0b1b36] cursor-pointer">
									<option>Más populares</option>
									<option>Más recientes</option>
									<option>Menor precio</option>
								</select>
							</div>
						</div>

						{/* Loading state */}
						{isLoading && (
							<div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
								<Loader2 className="w-8 h-8 animate-spin text-[#d99820]" />
								<p className="text-sm">Cargando cursos desde la API...</p>
							</div>
						)}

						{/* Error state */}
						{isError && (
							<div className="flex flex-col items-center justify-center py-24 gap-3">
								<p className="text-foreground font-semibold">
									No se pudieron cargar los cursos.
								</p>
							</div>
						)}

						{/* Empty state */}
						{!isLoading && !isError && filteredCourses.length === 0 && (
							<div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
								<p className="text-sm">No hay cursos disponibles para esta selección.</p>
							</div>
						)}

						{/* Course Grid */}
						{!isLoading && !isError && filteredCourses.length > 0 && (
							<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
								{filteredCourses.map((course, index) => (
									<ScrollReveal
										key={course.id}
										animation="fade-in-up"
										duration={600}
										delay={(index % 6) * 100}
										threshold={0.05}
									>
										<CourseCard {...toCardProps(course)} />
									</ScrollReveal>
								))}
							</div>
						)}
					</main>
				</div>
			</div>
		</div>
	);
}
