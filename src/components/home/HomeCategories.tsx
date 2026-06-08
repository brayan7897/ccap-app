"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
	ArrowRight,
	ChevronLeft,
	ChevronRight,
	PenTool,
	ShieldAlert,
	FileSignature,
	MonitorCog,
	Laptop,
	BookOpen,
	LibraryBig
} from "lucide-react";
import type { Category } from "@/types";
import { categoriesService } from "@/features/categories/services/categories.service";

// Fallback configuration for icons and colors in case we don't have images
const CATEGORY_CONFIG: Record<string, any> = {
	"autocad": { icon: PenTool, bg: "bg-violet-600 dark:bg-violet-900", hexColor: "#7c3aed" },
	"seguridad": { icon: ShieldAlert, bg: "bg-rose-600 dark:bg-rose-900", hexColor: "#e11d48" },
	"contrataciones": { icon: FileSignature, bg: "bg-sky-600 dark:bg-sky-900", hexColor: "#0284c7" },
	"siga": { icon: MonitorCog, bg: "bg-emerald-600 dark:bg-emerald-900", hexColor: "#059669" },
	"ofimatica": { icon: Laptop, bg: "bg-amber-500 dark:bg-amber-700", hexColor: "#f59e0b" },
};

export function HomeCategories() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		categoriesService.list().then(data => {
			setCategories(data);
			setIsLoading(false);
		}).catch(err => {
			console.error("Error loading categories", err);
			setIsLoading(false);
		});
	}, []);

	return (
		<section className="py-24 relative z-10 bg-transparent">
			<div className="container mx-auto px-4 lg:px-8 max-w-7xl">
				<div className="flex flex-col items-center text-center mb-16 space-y-4">
					<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold border border-secondary/20">
						<LibraryBig className="w-3.5 h-3.5" />
						<span>Especialidades</span>
					</div>
					<h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight uppercase">
						ÁREAS DE <span className="text-secondary">ESTUDIO</span>
					</h2>
					<p className="text-muted-foreground text-sm md:text-base font-medium max-w-2xl">
						Explora las diferentes áreas formativas y encuentra la especialización que necesitas para potenciar tu perfil profesional y destacar en tu rubro.
					</p>
				</div>
			</div>

			<div className="relative w-full max-w-[1500px] mx-auto px-4 md:px-8 lg:px-10 xl:px-12">
				<div 
					className="flex overflow-x-auto gap-6 lg:gap-8 pb-12 pt-8 snap-x snap-mandatory hide-scrollbar">
					{isLoading ? (
						<div className="col-span-full flex justify-center py-20 w-full">
							<p className="text-muted-foreground animate-pulse font-medium">Cargando áreas de estudio...</p>
						</div>
					) : (
						categories.map((category) => {
							const config = CATEGORY_CONFIG[category.slug] || { icon: ArrowRight, bg: "bg-blue-600", hexColor: "#2563eb" };
							const Icon = config.icon;
							const hasImage = !!category.image_url;
							const color = category.color || config.hexColor;

							return (
								<div key={category.id} className="snap-start shrink-0 w-[85vw] sm:w-[320px] md:w-[360px] lg:w-[400px] flex h-full">
									<Link
										href={`/catalog?category=${category.slug}`}
										className="w-full flex flex-col bg-card rounded-2xl overflow-hidden border border-border/60 hover:border-primary/40 dark:hover:border-secondary/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group relative"
									>
										{/* Glow effect on hover */}
										<div 
											className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
											style={{ background: `linear-gradient(to bottom right, transparent, ${color}20)` }}
										/>
										
										{/* Top Image Section */}
										<div className="relative w-full aspect-[16/10] overflow-hidden bg-muted z-10 shrink-0">
											{hasImage ? (
												<>
													<img 
														src={category.image_url!} 
														alt={category.name} 
														className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
													/>
													<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
												</>
											) : (
												<div className={`w-full h-full ${config.bg} flex items-center justify-center`}>
													<Icon className="w-16 h-16 text-white/40" />
												</div>
											)}
											
											{/* Floating Icon Badge */}
											<div 
												className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white dark:bg-zinc-900/90 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20 dark:border-zinc-800"
												style={{ color: color }}
											>
												<Icon className="w-5 h-5" />
											</div>
										</div>
										
										{/* Content Section */}
										<div className="flex flex-col flex-1 p-6 md:p-7 z-10 bg-card">
											<h3 className="text-lg md:text-xl font-bold text-foreground mb-3 leading-tight tracking-tight group-hover:text-primary dark:group-hover:text-secondary transition-colors">
												{category.name}
											</h3>
											
											<p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-6 leading-relaxed">
												{category.description || `Explora nuestros programas y cursos de ${category.name} diseñados para impulsar tu carrera.`}
											</p>
											
											{/* Call to action */}
											<div 
												className="flex items-center gap-2 mt-auto font-bold text-[13px] uppercase tracking-wide transition-colors" 
											>
												<span className="text-foreground group-hover:text-primary dark:group-hover:text-secondary transition-colors">Ver programas</span>
												<ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-primary dark:group-hover:text-secondary transition-all" style={{ color: color }} />
											</div>
										</div>
										
										{/* Bottom solid line accent */}
										<div 
											className="absolute bottom-0 left-0 w-full h-1.5 opacity-80 group-hover:opacity-100 transition-opacity z-20"
											style={{ backgroundColor: color }}
										/>
									</Link>
								</div>
							);
						})
					)}

					{/* "View More" Card */}
					{!isLoading && (
						<div className="snap-start shrink-0 w-[85vw] sm:w-[320px] md:w-[360px] lg:w-[400px] flex h-full">
							<Link
								href="/catalog"
								className="group relative w-full flex flex-col items-center justify-center bg-gradient-to-br from-secondary/5 via-card to-secondary/10 rounded-2xl overflow-hidden border border-border/60 hover:border-primary/40 dark:hover:border-secondary/40 hover:shadow-2xl transition-all duration-300 p-8 text-center min-h-[340px] hover:-translate-y-1"
							>
								<div className="w-20 h-20 rounded-2xl bg-white dark:bg-zinc-900 shadow-md flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-secondary/10">
									<BookOpen className="w-10 h-10 text-secondary" strokeWidth={1.5} />
								</div>
								<h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 tracking-tight">
									Explorar todo el catálogo
								</h3>
								<p className="text-sm text-muted-foreground mb-8 max-w-[250px] leading-relaxed">
									Descubre todas nuestras áreas de estudio y encuentra el programa formativo perfecto para ti.
								</p>
								<div className="flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-semibold group-hover:shadow-lg transition-all group-hover:px-7">
									<span>Ver todos</span>
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</div>
							</Link>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
