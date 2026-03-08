"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CourseCard } from "@/components/courses/CourseCard";
import type { CourseCardProps } from "@/components/courses/CourseCard";

// Mock data aligned with new Course API structure
const MOCK_COURSES: CourseCardProps[] = [
	{
		id: "civ-01",
		slug: "diseno-estructural-sap2000-v24",
		title: "Diseño Estructural Avanzado con SAP2000 v24",
		short_description:
			"Domina el análisis y diseño de estructuras con el software líder de la industria.",
		thumbnail_url:
			"https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
		course_level: "ADVANCED",
		instructor_name: "Ing. Carlos Mendoza",
		category_name: "Ingeniería",
		tags: ["SAP2000", "Estructuras", "Concreto"],
		total_lessons: 42,
		total_duration: "40 horas",
		enrolled_count: 1250,
	},
	{
		id: "arq-01",
		slug: "modelado-bim-revit-2024",
		title: "Modelado BIM Arquitectónico con Revit 2024",
		short_description:
			"Aprende metodología BIM y modela proyectos arquitectónicos completos.",
		thumbnail_url:
			"https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
		course_level: "INTERMEDIATE",
		instructor_name: "Arq. Sofia Paredes",
		category_name: "Ingeniería",
		tags: ["Revit", "BIM", "3D"],
		total_lessons: 35,
		total_duration: "35 horas",
		enrolled_count: 890,
	},
	{
		id: "min-01",
		slug: "planeamiento-operaciones-mineras",
		title: "Planeamiento y Operaciones Mineras Subterráneas",
		short_description:
			"Gestión integral de operaciones mineras con enfoque práctico y normativa vigente.",
		thumbnail_url:
			"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
		course_level: "ADVANCED",
		instructor_name: "Lic. Roberto Díaz",
		category_name: "Pedagogía",
		tags: ["Educación", "Didáctica", "Innovación"],
		total_lessons: 50,
		total_duration: "45 horas",
		enrolled_count: 620,
	},
	{
		id: "ges-01",
		slug: "gestion-proyectos-pmi-construccion",
		title: "Gestión de Proyectos PMI para Construcción",
		short_description:
			"Aplica la metodología PMI en proyectos de construcción e infraestructura.",
		thumbnail_url:
			"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
		course_level: "BASIC",
		instructor_name: "Ing. Laura Jiménez (PMP)",
		category_name: "Ciencias Empresariales",
		tags: ["PMI", "Gestión", "Proyectos"],
		total_lessons: 55,
		total_duration: "50 horas",
		enrolled_count: 2100,
	},
	{
		id: "seg-01",
		slug: "seguridad-salud-ocupacional",
		title: "Diplomado en Seguridad y Salud Ocupacional (SSOMA)",
		short_description:
			"Prevención de riesgos laborales y normativas vigentes en industria y minería.",
		thumbnail_url:
			"https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?w=800&q=80",
		course_level: "INTERMEDIATE",
		instructor_name: "Ing. Pedro Suarez",
		category_name: "Seguridad",
		tags: ["SSOMA", "Prevención", "Auditoría"],
		total_lessons: 60,
		total_duration: "80 horas",
		enrolled_count: 3450,
	},
	{
		id: "dev-01",
		slug: "programacion-python-ciencia-datos",
		title: "Python para Ciencia de Datos e Inteligencia Artificial",
		short_description:
			"Aprende a analizar grandes volúmenes de datos y crear modelos predictivos.",
		thumbnail_url:
			"https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
		course_level: "ADVANCED",
		instructor_name: "Lic. Andrea Vargas",
		category_name: "Tecnología",
		tags: ["Python", "Data Science", "AI"],
		total_lessons: 85,
		total_duration: "90 horas",
		enrolled_count: 5600,
	},
	{
		id: "amb-01",
		slug: "gestion-evaluacion-impacto-ambiental",
		title: "Evaluación y Gestión de Impacto Ambiental (EIA)",
		short_description:
			"Elaboración de estudios ambientales para proyectos de infraestructura y energía.",
		thumbnail_url:
			"https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80",
		course_level: "ADVANCED",
		instructor_name: "PhD. Martin Castillo",
		category_name: "Medio Ambiente",
		tags: ["EIA", "Sostenibilidad", "Gestión"],
		total_lessons: 48,
		total_duration: "55 horas",
		enrolled_count: 1800,
	},
	{
		id: "fin-01",
		slug: "finanzas-corporativas-valoracion",
		title: "Finanzas Corporativas y Valoración de Empresas",
		short_description:
			"Análisis financiero, evaluación de proyectos y estrategias de inversión.",
		thumbnail_url:
			"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
		course_level: "INTERMEDIATE",
		instructor_name: "Eco. Valeria Rios",
		category_name: "Ciencias Empresariales",
		tags: ["Finanzas", "Negocios", "Inversión"],
		total_lessons: 40,
		total_duration: "42 horas",
		enrolled_count: 1950,
	},
];

export function HomeCourses() {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const checkScroll = () => {
		if (scrollContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
			// Use a 1px tolerance for fractional pixel differences
			setCanScrollLeft(scrollLeft > 1);
			setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
		}
	};

	useEffect(() => {
		checkScroll(); // Check initially
		window.addEventListener('resize', checkScroll);
		return () => window.removeEventListener('resize', checkScroll);
	}, []);

	const smoothScroll = (element: HTMLElement, targetPosition: number, duration: number) => {
		const startPosition = element.scrollLeft;
		const distance = targetPosition - startPosition;
		let startTime: number | null = null;
		
		// Temporarily disable CSS snapping to avoid browser fighting JS animation
		const originalSnap = element.style.scrollSnapType;
		element.style.scrollSnapType = 'none';
	
		// Ease In Out Quad for smooth acceleration and deceleration
		const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	
		const animation = (currentTime: number) => {
			if (startTime === null) startTime = currentTime;
			const timeElapsed = currentTime - startTime;
			const progress = Math.min(timeElapsed / duration, 1);
			
			element.scrollLeft = startPosition + distance * easeInOutQuad(progress);
			
			if (timeElapsed < duration) {
				requestAnimationFrame(animation);
			} else {
				element.scrollLeft = targetPosition; 
				// Restore CSS snapping
				element.style.scrollSnapType = originalSnap;
			}
		};
	
		requestAnimationFrame(animation);
	};

	const scroll = (direction: 'left' | 'right') => {
		if (scrollContainerRef.current) {
			const container = scrollContainerRef.current;
			const firstCard = container.firstElementChild as HTMLElement;
			if (!firstCard) return;
			
			// Dynamically determine gap based on window size to match CSS gap-6 (24px), gap-8 (32px)
			const windowWidth = window.innerWidth;
			const gap = windowWidth >= 768 ? 32 : 24;
			
			const scrollAmount = firstCard.getBoundingClientRect().width + gap;
			
			const maxScroll = container.scrollWidth - container.clientWidth;
			let targetPosition = direction === 'left' 
				? container.scrollLeft - scrollAmount 
				: container.scrollLeft + scrollAmount;
				
			// Clamp exactly between bounds to prevent white space
			targetPosition = Math.max(0, Math.min(targetPosition, maxScroll));
				
			// Use slower custom smooth scroll (e.g. 600ms) instead of instant native 
			smoothScroll(container, targetPosition, 400);
		}
	};

	return (
		<section className="py-20 relative z-10 bg-transparent">
			{/* Section Header — centered inside max-w-7xl */}
			<div className="container mx-auto px-4 lg:px-8 max-w-7xl">
				<div className="flex flex-col items-center text-center mb-16 space-y-4">
					{/* Badge */}
					<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
						<BookOpen className="w-3.5 h-3.5" />
						<span>Cursos destacados</span>
					</div>

					<h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight max-w-3xl">
						Impulsa tu carrera con <span className="text-primary">nuestros programas</span>
					</h2>

					<p className="text-muted-foreground text-sm md:text-base max-w-2xl font-medium">
						Explora nuestros cursos mejor valorados por los estudiantes con contenido de alta calidad impartido por expertos del sector
					</p>
				</div>
			</div>

			{/* Carousel — breaks out to full viewport width */}
			<div className="relative w-full max-w-[1500px] mx-auto px-4 md:px-8 lg:px-10 xl:px-12 group/carousel">
				{/* Navigation Buttons */}
				<button 
					onClick={() => scroll('left')}
					className={`absolute -left-1 md:left-0 lg:left-2 xl:left-4 top-1/2 -translate-y-1/2 z-20 bg-background/90 hover:bg-background text-foreground border border-border/50 shadow-lg rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
						canScrollLeft 
							? "opacity-0 group-hover/carousel:opacity-100 hover:scale-110" 
							: "opacity-0 pointer-events-none"
					}`}
					aria-label="Anterior"
				>
					<ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
				</button>

				<button 
					onClick={() => scroll('right')}
					className={`absolute -right-1 md:right-0 lg:right-2 xl:right-4 top-1/2 -translate-y-1/2 z-20 bg-background/90 hover:bg-background text-foreground border border-border/50 shadow-lg rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
						canScrollRight 
							? "opacity-0 group-hover/carousel:opacity-100 hover:scale-110" 
							: "opacity-0 pointer-events-none"
					}`}
					aria-label="Siguiente"
				>
					<ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
				</button>

				<div 
					ref={scrollContainerRef}
					onScroll={checkScroll}
					className="flex overflow-x-auto gap-6 md:gap-8 pb-12 pt-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
				>
					{MOCK_COURSES.map((course) => (
						<div key={course.id} className="snap-start shrink-0 w-full md:w-[calc((100%-32px)/2)] lg:w-[calc((100%-64px)/3)] xl:w-[calc((100%-64px)/3)] 2xl:w-[calc((100%-96px)/4)]">
							<CourseCard {...course} />
						</div>
					))}
				</div>
			</div>

			{/* Section Footer — centered inside max-w-7xl */}
			<div className="container mx-auto px-4 lg:px-8 max-w-7xl">
				<div className="mt-16 flex flex-col items-center">
					<Link
						href="/courses"
						className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm shadow-sm"
					>
						Ver Cursos <ArrowRight className="w-4 h-4" />
					</Link>
					<p className="mt-4 text-[13px] text-muted-foreground font-medium text-center">
						Más de <span className="font-semibold text-foreground">300+ cursos</span> disponibles con nuevos contenidos cada semana
					</p>
				</div>
			</div>
		</section>
	);
}
