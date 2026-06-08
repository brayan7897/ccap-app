import { Globe, PlayCircle, QrCode, UserCheck, TrendingUp, Star } from "lucide-react";

const PILLARS = [
	{
		title: "Aprende desde cualquier lugar",
		description: "Estudia donde y cuando quieras.",
		icon: Globe,
		iconBg: "bg-primary text-primary-foreground dark:bg-muted dark:text-foreground",
	},
	{
		title: "Clases en vivo y grabadas",
		description: "Accede a las clases en tiempo real o revísalas cuando necesites.",
		icon: PlayCircle,
		iconBg: "bg-primary text-primary-foreground dark:bg-muted dark:text-foreground",
	},
	{
		title: "Certificación Verificable",
		description: "Obtén tu certificado con código QR.",
		icon: QrCode,
		iconBg: "bg-primary text-primary-foreground dark:bg-muted dark:text-foreground",
	},
	{
		title: "Docentes Especializados",
		description: "Aprende con profesionales con experiencia en el sector.",
		icon: UserCheck,
		iconBg: "bg-primary text-primary-foreground dark:bg-muted dark:text-foreground",
	},
	{
		title: "Actualización",
		description: "Programas alineados a las nuevas tendencias.",
		icon: TrendingUp,
		iconBg: "bg-primary text-primary-foreground dark:bg-muted dark:text-foreground",
	},
];

export function EducationalPillars() {
	return (
		<section className="relative z-10 w-full bg-transparent py-20 border-b border-border/50 transition-colors">
			<div className="container mx-auto px-4 max-w-[1400px]">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center mb-16 space-y-4">
					<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-semibold text-xs uppercase">
						<Star className="w-3.5 h-3.5 fill-current" />
						<span>Nuestros Beneficios</span>
					</div>

					<h2 className="relative text-3xl md:text-4xl font-extrabold text-foreground tracking-tight uppercase pb-4">
						¿Por qué Elegirnos?
						<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-secondary rounded-full"></span>
					</h2>

					<p className="text-muted-foreground text-sm md:text-base max-w-2xl font-medium">
						Descubre los fundamentos que nos hacen líderes en formación
						profesional para ingeniería y gestión pública.
					</p>
				</div>

				{/* Pillars Grid */}
				<div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-5 md:overflow-visible gap-4 md:gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
					{PILLARS.map((pillar, index) => (
						<div
							key={index}
							className="snap-start shrink-0 w-[85vw] sm:w-[320px] md:w-full group relative flex flex-col items-start p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 dark:hover:border-secondary/30 hover:shadow-lg dark:hover:shadow-secondary/5 transition-all duration-300 text-left">
							{/* Top: Icon and Number */}
							<div className="w-full flex items-center justify-between mb-6">
								<div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md transition-transform group-hover:-translate-y-1 duration-300 ${pillar.iconBg}`}>
									<pillar.icon className="w-8 h-8" />
								</div>
								<span className="text-5xl font-bold text-muted/80 dark:text-muted/30">
									{String(index + 1).padStart(2, '0')}
								</span>
							</div>

							{/* Text Content */}
							<h3 className="text-[15px] font-extrabold text-foreground mb-3 uppercase leading-tight group-hover:text-primary dark:group-hover:text-secondary transition-colors">
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
