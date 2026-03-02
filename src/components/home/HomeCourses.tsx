import Link from "next/link";
import { CourseCard } from "@/components/courses/CourseCard";
import type { CourseCardProps } from "@/components/courses/CourseCard";

// Mock data aligned with new Course API structure (no prices — subscription model)
const MOCK_COURSES: CourseCardProps[] = [
	{
		id: "civ-01",
		slug: "diseno-estructural-sap2000-v24",
		title: "Diseño Estructural Avanzado con SAP2000 v24",
		short_description:
			"Domina el análisis y diseño de estructuras con el software líder de la industria.",
		thumbnail_url:
			"https://images.unsplash.com/photo-1541888086425-d81bb190408?w=800&q=80",
		course_level: "ADVANCED",
		instructor_name: "Ing. Carlos Mendoza",
		category_name: "Ing. Civil",
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
		category_name: "Arquitectura",
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
			"https://images.unsplash.com/photo-1578589318433-39b0051e5e66?w=800&q=80",
		course_level: "ADVANCED",
		instructor_name: "Ing. Roberto Díaz",
		category_name: "Minería",
		tags: ["Minería", "Subterránea", "Seguridad"],
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
		category_name: "Gestión",
		tags: ["PMI", "Gestión", "Construcción"],
		total_lessons: 55,
		total_duration: "50 horas",
		enrolled_count: 2100,
	},
];

export function HomeCourses() {
	return (
		<section className="py-24 relative z-10">
			<div className="container mx-auto px-4 lg:px-8">
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
					<div className="max-w-2xl">
						<h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 transition-colors">
							Cursos Destacados
						</h2>
						<p className="text-muted-foreground text-lg transition-colors">
							Aprende de los líderes de la industria y domina las herramientas
							que exige el mercado laboral actual.
						</p>
					</div>
					<Link
						href="/courses"
						className="shrink-0 text-primary hover:text-primary/80 font-semibold group flex items-center gap-2">
						Ver catálogo completo
						<span className="group-hover:translate-x-1 transition-transform">
							-&gt;
						</span>
					</Link>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{MOCK_COURSES.map((course) => (
						<CourseCard key={course.id} {...course} />
					))}
				</div>
			</div>
		</section>
	);
}
