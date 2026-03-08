import { MapPin, ShieldCheck, Globe, Star } from "lucide-react";

const PILLARS = [
	{
		title: "Aprendizaje Práctico",
		description:
			"Enfoque hands-on con casos reales del sector construcción y minería para aplicar lo aprendido inmediatamente.",
		icon: MapPin,
		iconBg: "bg-primary/10",
		iconColor: "text-primary",
	},
	{
		title: "Instructores Expertos",
		description:
			"Profesionales activos y líderes en grandes proyectos de infraestructura comparten su experiencia directa.",
		icon: ShieldCheck,
		iconBg: "bg-gold/10",
		iconColor: "text-gold",
	},
	{
		title: "Certificación Internacional",
		description:
			"Validez global con estándares internacionales y convenios con instituciones de prestigio.",
		icon: Globe,
		iconBg: "bg-primary/10",
		iconColor: "text-primary",
	},
];

export function EducationalPillars() {
	return (
		<section className="relative z-10 w-full bg-transparent py-20 border-b border-border/50 transition-colors">
			<div className="container mx-auto px-4 max-w-7xl">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center mb-16 space-y-4">
					<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold font-semibold text-xs">
						<Star className="w-3.5 h-3.5 fill-current" />
						<span>Por qué elegirnos</span>
					</div>

					<h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight max-w-3xl">
						Nuestros <span className="text-primary">Pilares Educativos</span>
					</h2>

					<p className="text-muted-foreground text-sm md:text-base max-w-2xl font-medium">
						Descubre los fundamentos que nos hacen líderes en formación profesional para ingeniería
					</p>
				</div>

				{/* Pillars Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
					{PILLARS.map((pillar, index) => (
						<div
							key={index}
							className="group relative flex flex-col items-start p-8 rounded-2xl bg-card border border-border/50 hover:border-border hover:shadow-md transition-all duration-300 text-left">
							
							{/* Icon */}
							<div
								className={`w-12 h-12 mb-6 rounded-xl ${pillar.iconBg} flex items-center justify-center transition-transform group-hover:-translate-y-1 duration-300`}>
								<pillar.icon
									className={`w-5 h-5 ${pillar.iconColor}`}
								/>
							</div>

							{/* Text Content */}
							<h3 className="text-[17px] font-bold text-foreground mb-2">
								{pillar.title}
							</h3>
							<p className="text-[14px] text-muted-foreground leading-relaxed font-medium">
								{pillar.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
