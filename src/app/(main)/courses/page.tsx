import { CourseCard } from "@/components/courses/CourseCard";
import type { CourseCardProps } from "@/components/courses/CourseCard";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

// Mock data aligned with the Course API model (subscription-based, no prices)
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
	{
		id: "civ-02",
		slug: "analisis-sismico-edificaciones-concreto",
		title: "Análisis Sísmico Dinámico en Edificaciones de Concreto",
		short_description:
			"Aprende análisis modal espectral y time-history para estructuras de concreto armado.",
		thumbnail_url:
			"https://images.unsplash.com/photo-1481253127861-534498168948?w=800&q=80",
		course_level: "ADVANCED",
		instructor_name: "Ing. Carlos Mendoza",
		category_name: "Estructuras",
		tags: ["Sísmica", "ETABS", "Concreto"],
		total_lessons: 60,
		total_duration: "60 horas",
		enrolled_count: 430,
	},
	{
		id: "arq-02",
		slug: "visualizacion-arquitectonica-lumion",
		title: "Visualización Arquitectónica Fotorrealista en Lumion",
		short_description:
			"Crea renders y recorridos virtuales de alta calidad para tus proyectos.",
		thumbnail_url:
			"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
		course_level: "BASIC",
		instructor_name: "Arq. Mateo Ríos",
		category_name: "Visualización",
		tags: ["Lumion", "Render", "3D"],
		total_lessons: 28,
		total_duration: "25 horas",
		enrolled_count: 1150,
	},
];

export default function CoursesPage() {
	return (
		<div className="min-h-screen pt-8 pb-20">
			{/* Page Header */}
			<div className="container mx-auto px-4 lg:px-8 mb-12">
				<h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 transition-colors">
					Explora nuestros <span className="text-primary">Cursos</span>
				</h1>

				{/* Search Bar Container */}
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

						{/* Filter Category */}
						<div>
							<h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
								Categoría
							</h3>
							<ul className="space-y-2">
								{[
									"Ingeniería Civil",
									"Arquitectura",
									"Gestión BIM",
									"Minería",
									"Software Premium",
								].map((cat) => (
									<li key={cat}>
										<label className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground cursor-pointer group transition-colors">
											<div className="w-4 h-4 rounded border border-border group-hover:border-primary flex items-center justify-center bg-card">
												{/* Checkbox logic will go here later */}
											</div>
											{cat}
										</label>
									</li>
								))}
							</ul>
						</div>

						{/* Filter Level */}
						<div>
							<h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
								Nivel
							</h3>
							<ul className="space-y-2">
								{["Básico", "Intermedio", "Avanzado", "Experto"].map(
									(level) => (
										<li key={level}>
											<label className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground cursor-pointer group transition-colors">
												<div className="w-4 h-4 rounded border border-border group-hover:border-primary flex items-center justify-center bg-card"></div>
												{level}
											</label>
										</li>
									),
								)}
							</ul>
						</div>
					</aside>

					{/* Main Grid */}
					<main className="flex-1">
						<div className="flex items-center justify-between mb-6">
							<p className="text-muted-foreground text-sm">
								Mostrando{" "}
								<span className="text-foreground font-bold">
									{MOCK_COURSES.length}
								</span>{" "}
								resultados
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

						{/* Grid of Course Cards */}
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
							{MOCK_COURSES.map((course) => (
								<CourseCard key={course.id} {...course} />
							))}
						</div>

						{/* Pagination Placeholder */}
						<div className="mt-12 flex items-center justify-center gap-2">
							<button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-card hover:text-foreground transition-colors">
								&lt;
							</button>
							<button className="w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center">
								1
							</button>
							<button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-card hover:text-foreground transition-colors">
								2
							</button>
							<button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-card hover:text-foreground transition-colors">
								3
							</button>
							<span className="text-muted-foreground">...</span>
							<button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-card hover:text-foreground transition-colors">
								&gt;
							</button>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
