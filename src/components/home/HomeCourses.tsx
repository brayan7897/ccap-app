"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
	BookOpen,
	ArrowRight,
	ChevronLeft,
	ChevronRight,
	Loader2,
	AlertCircle,
} from "lucide-react";
import { CourseCard } from "@/components/courses/CourseCard";
import type { CourseCardProps } from "@/components/courses/CourseCard";
import { useCourses } from "@/features/courses/hooks/useCourses";
import type { Course } from "@/types";

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

/** Skeleton card shown while loading */
function CourseCardSkeleton() {
	return (
		<div className="rounded-xl border border-border bg-card overflow-hidden animate-pulse">
			<div className="w-full aspect-video bg-muted" />
			<div className="p-5 space-y-3">
				<div className="h-3 bg-muted rounded w-1/3" />
				<div className="h-5 bg-muted rounded w-4/5" />
				<div className="h-4 bg-muted rounded w-full" />
				<div className="h-4 bg-muted rounded w-3/4" />
				<div className="flex gap-2 mt-4">
					<div className="h-3 bg-muted rounded w-16" />
					<div className="h-3 bg-muted rounded w-16" />
				</div>
			</div>
		</div>
	);
}

export function HomeCourses() {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	// Fetch only the first 8 courses for the homepage carousel
	const { data: courses, isLoading, isError } = useCourses(0, 8);

	const checkScroll = () => {
		if (scrollContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } =
				scrollContainerRef.current;
			setCanScrollLeft(scrollLeft > 1);
			setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
		}
	};

	useEffect(() => {
		checkScroll();
		window.addEventListener("resize", checkScroll);
		return () => window.removeEventListener("resize", checkScroll);
	}, []);

	// Re-check scroll state whenever courses load
	useEffect(() => {
		if (courses?.length) {
			// Give the DOM a tick to render the cards before checking
			setTimeout(checkScroll, 50);
		}
	}, [courses]);

	const smoothScroll = (
		element: HTMLElement,
		targetPosition: number,
		duration: number,
	) => {
		const startPosition = element.scrollLeft;
		const distance = targetPosition - startPosition;
		let startTime: number | null = null;

		const originalSnap = element.style.scrollSnapType;
		element.style.scrollSnapType = "none";

		const easeInOutQuad = (t: number) =>
			t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

		const animation = (currentTime: number) => {
			if (startTime === null) startTime = currentTime;
			const timeElapsed = currentTime - startTime;
			const progress = Math.min(timeElapsed / duration, 1);

			element.scrollLeft = startPosition + distance * easeInOutQuad(progress);

			if (timeElapsed < duration) {
				requestAnimationFrame(animation);
			} else {
				element.scrollLeft = targetPosition;
				element.style.scrollSnapType = originalSnap;
			}
		};

		requestAnimationFrame(animation);
	};

	const scroll = (direction: "left" | "right") => {
		if (scrollContainerRef.current) {
			const container = scrollContainerRef.current;
			const firstCard = container.firstElementChild as HTMLElement;
			if (!firstCard) return;

			const windowWidth = window.innerWidth;
			const gap = windowWidth >= 768 ? 32 : 24;
			const scrollAmount = firstCard.getBoundingClientRect().width + gap;
			const maxScroll = container.scrollWidth - container.clientWidth;
			let targetPosition =
				direction === "left"
					? container.scrollLeft - scrollAmount
					: container.scrollLeft + scrollAmount;
			targetPosition = Math.max(0, Math.min(targetPosition, maxScroll));
			smoothScroll(container, targetPosition, 400);
		}
	};

	return (
		<section className="py-20 relative z-10 bg-transparent">
			{/* Section Header */}
			<div className="container mx-auto px-4 lg:px-8 max-w-7xl">
				<div className="flex flex-col items-center text-center mb-16 space-y-4">
					{/* Badge */}
					<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
						<BookOpen className="w-3.5 h-3.5" />
						<span>Cursos destacados</span>
					</div>

					<h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight max-w-3xl">
						Impulsa tu carrera con{" "}
						<span className="text-primary">nuestros programas</span>
					</h2>

					<p className="text-muted-foreground text-sm md:text-base max-w-2xl font-medium">
						Explora nuestros cursos mejor valorados por los estudiantes con
						contenido de alta calidad impartido por expertos del sector
					</p>
				</div>
			</div>

			{/* Carousel / States */}
			<div className="relative w-full max-w-[1500px] mx-auto px-4 md:px-8 lg:px-10 xl:px-12 group/carousel">
				{/* Loading state — skeleton cards */}
				{isLoading && (
					<div className="flex gap-6 md:gap-8 pb-12 pt-8 overflow-hidden">
						{Array.from({ length: 3 }).map((_, i) => (
							<div
								key={i}
								className="shrink-0 w-full md:w-[calc((100%-32px)/2)] lg:w-[calc((100%-64px)/3)]">
								<CourseCardSkeleton />
							</div>
						))}
					</div>
				)}

				{/* Error state */}
				{isError && !isLoading && (
					<div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
						<AlertCircle className="w-10 h-10 text-destructive/70" />
						<p className="font-semibold text-foreground">
							No se pudieron cargar los cursos
						</p>
						<p className="text-sm text-center max-w-xs">
							Verifica que la API esté en ejecución en{" "}
							<code className="bg-muted px-1.5 py-0.5 rounded text-xs">
								http://localhost:8000
							</code>
						</p>
						<Link
							href="/courses"
							className="mt-2 text-sm text-primary hover:underline font-medium">
							Ir al catálogo completo →
						</Link>
					</div>
				)}

				{/* Empty state */}
				{!isLoading && !isError && !courses?.length && (
					<div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
						<BookOpen className="w-10 h-10 opacity-40" />
						<p className="text-sm">No hay cursos publicados aún.</p>
					</div>
				)}

				{/* Carousel with nav buttons */}
				{!isLoading && !isError && !!courses?.length && (
					<>
						<button
							onClick={() => scroll("left")}
							className={`absolute -left-1 md:left-0 lg:left-2 xl:left-4 top-1/2 -translate-y-1/2 z-20 bg-background/90 hover:bg-background text-foreground border border-border/50 shadow-lg rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
								canScrollLeft
									? "opacity-0 group-hover/carousel:opacity-100 hover:scale-110"
									: "opacity-0 pointer-events-none"
							}`}
							aria-label="Anterior">
							<ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
						</button>

						<button
							onClick={() => scroll("right")}
							className={`absolute -right-1 md:right-0 lg:right-2 xl:right-4 top-1/2 -translate-y-1/2 z-20 bg-background/90 hover:bg-background text-foreground border border-border/50 shadow-lg rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
								canScrollRight
									? "opacity-0 group-hover/carousel:opacity-100 hover:scale-110"
									: "opacity-0 pointer-events-none"
							}`}
							aria-label="Siguiente">
							<ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
						</button>

						<div
							ref={scrollContainerRef}
							onScroll={checkScroll}
							className="flex overflow-x-auto gap-6 md:gap-8 pb-12 pt-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
							{courses.map((course) => (
								<div
									key={course.id}
									className="snap-start shrink-0 w-full md:w-[calc((100%-32px)/2)] lg:w-[calc((100%-64px)/3)] xl:w-[calc((100%-64px)/3)] 2xl:w-[calc((100%-96px)/4)]">
									<CourseCard {...toCardProps(course)} />
								</div>
							))}
						</div>
					</>
				)}
			</div>

			{/* Section Footer */}
			<div className="container mx-auto px-4 lg:px-8 max-w-7xl">
				<div className="mt-16 flex flex-col items-center">
					<Link
						href="/courses"
						className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm shadow-sm">
						Ver Cursos <ArrowRight className="w-4 h-4" />
					</Link>
					{!isLoading && !isError && (
						<p className="mt-4 text-[13px] text-muted-foreground font-medium text-center">
							{courses?.length ? (
								<>
									Mostrando{" "}
									<span className="font-semibold text-foreground">
										{courses.length}
									</span>{" "}
									cursos destacados
								</>
							) : (
								"Próximamente nuevos cursos disponibles"
							)}
						</p>
					)}
					{(isLoading || isError) && (
						<p className="mt-4 text-[13px] text-muted-foreground font-medium text-center">
							{isLoading ? (
								<span className="inline-flex items-center gap-1.5">
									<Loader2 className="w-3 h-3 animate-spin" /> Cargando
									cursos...
								</span>
							) : (
								"Ver todos los cursos disponibles"
							)}
						</p>
					)}
				</div>
			</div>
		</section>
	);
}
