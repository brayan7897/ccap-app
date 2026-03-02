import Image from "next/image";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
	{
		name: "Carlos Rivera",
		role: "Analista Financiero",
		company: "Banco Nacional",
		image: "https://i.pravatar.cc/150?img=11",
		text: "Los cursos de especialización me dieron las herramientas exactas que necesitaba para conseguir mi ascenso. El contenido es directo y sumamente práctico para el entorno real.",
		rating: 5,
	},
	{
		name: "Laura Gómez",
		role: "Ingeniera de Procesos",
		company: "Tech Solutions",
		image: "https://i.pravatar.cc/150?img=5",
		text: "La flexibilidad de la plataforma y el nivel de los instructores superaron todas mis expectativas. Recomiendo totalmente el curso de Lean Six Sigma, cambió mi perspectiva laboral.",
		rating: 5,
	},
	{
		name: "David Chen",
		role: "Director de Operaciones",
		company: "Logistics Pro",
		image: "https://i.pravatar.cc/150?img=12",
		text: "Capacitar a mi equipo corporativo con CCAP ha sido la mejor inversión del año. Hemos notado una mejora sustancial en nuestra eficiencia operativa casi de inmediato.",
		rating: 5,
	},
];

export function Testimonials() {
	return (
		<section className="relative z-10 bg-background py-24 transition-colors overflow-hidden">
			{/* Subtle decorative elements */}
			<div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

			<div className="container mx-auto px-4 max-w-7xl relative z-10">
				<div className="text-center mb-16 space-y-4">
					<p className="text-xs font-bold text-gold tracking-[0.2em] uppercase">
						Testimonios
					</p>
					<h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight transition-colors">
						Nuestros estudiantes nos avalan
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Descubre por qué miles de profesionales eligen nuestra plataforma
						para acelerar su crecimiento profesional.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{TESTIMONIALS.map((testimonial, index) => (
						<div
							key={index}
							className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
							{/* Quote icon */}
							<div className="absolute top-6 right-6 text-muted-foreground/10 group-hover:text-primary/10 transition-colors">
								<Quote className="w-10 h-10" />
							</div>

							{/* Stars */}
							<div className="flex gap-1 text-gold mb-6">
								{Array.from({ length: testimonial.rating }).map((_, i) => (
									<Star key={i} className="w-4 h-4 fill-current" />
								))}
							</div>

							{/* Quote text */}
							<p className="text-muted-foreground leading-relaxed grow text-sm mb-8">
								&quot;{testimonial.text}&quot;
							</p>

							{/* Author */}
							<div className="flex items-center gap-4 mt-auto pt-6 border-t border-border">
								<div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-border ring-2 ring-primary/10 shrink-0">
									<Image
										src={testimonial.image}
										alt={`Fotografía de ${testimonial.name}`}
										fill
										className="object-cover"
									/>
								</div>
								<div>
									<h4 className="font-bold text-foreground text-sm">
										{testimonial.name}
									</h4>
									<p className="text-xs text-muted-foreground">
										{testimonial.role} · {testimonial.company}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
