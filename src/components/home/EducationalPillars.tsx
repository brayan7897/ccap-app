import { MapPin, ShieldCheck, Globe, ArrowRight } from "lucide-react";

const PILLARS = [
	{
		title: "Aprendizaje Práctico",
		description:
			"Enfoque hands-on con casos reales del sector construcción y minería para aplicar lo aprendido inmediatamente.",
		icon: MapPin,
		accent: "from-primary/20 to-primary/5",
		iconBg: "bg-primary/10 group-hover:bg-primary",
		iconColor: "text-primary group-hover:text-primary-foreground",
	},
	{
		title: "Instructores Expertos",
		description:
			"Profesionales activos y líderes en grandes proyectos de infraestructura comparten su experiencia directa.",
		icon: ShieldCheck,
		accent: "from-gold/20 to-gold/5",
		iconBg: "bg-gold/10 group-hover:bg-gold",
		iconColor: "text-gold group-hover:text-gold-foreground",
	},
	{
		title: "Certificación Internacional",
		description:
			"Validez global con estándares internacionales y convenios con instituciones de prestigio.",
		icon: Globe,
		accent: "from-primary/20 to-gold/5",
		iconBg: "bg-primary/10 group-hover:bg-primary",
		iconColor: "text-primary group-hover:text-primary-foreground",
	},
];

export function EducationalPillars() {
	return (
		<section className="relative z-10 w-full bg-background py-24 border-b border-border transition-colors">
			<div className="container mx-auto px-4 max-w-6xl">
				{/* Section Header */}
				<div className="text-center mb-16 space-y-3">
					<p className="text-xs font-bold text-gold tracking-[0.2em] uppercase">
						Por qué elegirnos
					</p>
					<h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight transition-colors">
						Nuestros Pilares Educativos
					</h2>
				</div>

				{/* Pillars Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{PILLARS.map((pillar, index) => (
						<div
							key={index}
							className="group relative flex flex-col items-start p-8 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden">
							{/* Gradient accent top */}
							<div
								className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${pillar.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
							/>

							{/* Icon */}
							<div
								className={`w-14 h-14 mb-6 rounded-xl ${pillar.iconBg} flex items-center justify-center transition-all duration-300`}>
								<pillar.icon
									className={`w-6 h-6 ${pillar.iconColor} transition-colors duration-300`}
								/>
							</div>

							{/* Text Content */}
							<h3 className="text-xl font-bold text-foreground mb-3 transition-colors">
								{pillar.title}
							</h3>
							<p className="text-sm text-muted-foreground leading-relaxed font-medium mb-6 grow">
								{pillar.description}
							</p>

							{/* Learn more hint */}
							<span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
								Saber más <ArrowRight className="w-3.5 h-3.5" />
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
