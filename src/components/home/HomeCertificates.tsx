import {
	ShieldCheck,
	Search,
	Globe,
	Lock,
	Briefcase,
	ArrowRight,
} from "lucide-react";

const BENEFITS = [
	{
		icon: Globe,
		title: "Respaldo Internacional",
		description:
			"Avalados por los principales Colegios de Ingenieros y Arquitectos.",
		accent: "primary",
	},
	{
		icon: Lock,
		title: "Tecnología Inmutable",
		description:
			"Firmas digitales encriptadas y registro seguro para evitar fraudes.",
		accent: "gold",
	},
	{
		icon: Briefcase,
		title: "Potencial Laboral",
		description:
			"Agrega tu escudo directo a LinkedIn; el 85% de egresados mejora su sueldo.",
		accent: "gold",
	},
];

export function HomeCertificates() {
	return (
		<section className="py-24 bg-muted/30 dark:bg-muted/10 backdrop-blur-sm border-y border-border relative overflow-hidden z-10 transition-colors">
			{/* Background Gradients */}
			<div className="absolute top-1/2 left-0 -translate-y-1/2 w-150 h-150 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

			<div className="container mx-auto px-4 lg:px-8 relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					<div className="space-y-8">
						<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold font-semibold text-xs tracking-wider">
							<ShieldCheck className="w-4 h-4" />
							<span>VALIDACIÓN OFICIAL</span>
						</div>

						<h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight transition-colors">
							Asegura el <span className="text-gold">valor</span> <br />
							de tus logros.
						</h2>

						<p className="text-muted-foreground text-lg transition-colors max-w-lg">
							Empresas y reclutadores confían en nuestros certificados. Ingresa
							tu código único y demuestra instantáneamente tus habilidades
							validadas por ccap.
						</p>

						{/* Search bar */}
						<div className="relative max-w-md bg-background p-1.5 rounded-xl border border-border flex items-center shadow-lg focus-within:border-gold/50 transition-colors">
							<div className="pl-3 pr-2 text-muted-foreground">
								<Search className="w-5 h-5" />
							</div>
							<input
								type="text"
								placeholder="Código ej. ccap-2026-X9"
								className="flex-1 bg-transparent border-none outline-none text-foreground text-sm placeholder:text-muted-foreground uppercase"
							/>
							<button className="bg-gold hover:bg-gold/90 text-gold-foreground px-5 py-2.5 rounded-lg font-bold transition-colors flex items-center gap-2 text-sm">
								Verificar
								<ArrowRight className="w-4 h-4" />
							</button>
						</div>
					</div>

					{/* Benefits Cards Side */}
					<div className="grid grid-cols-1 gap-4">
						{BENEFITS.map((benefit, index) => {
							const isGold = benefit.accent === "gold";
							return (
								<div
									key={index}
									className={`group bg-background/80 border border-border p-6 rounded-2xl flex gap-4 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-${benefit.accent}/5 hover:border-${benefit.accent}/30`}>
									<div
										className={`w-12 h-12 ${isGold ? "bg-gold/10" : "bg-primary/10"} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
										<benefit.icon
											className={`w-6 h-6 ${isGold ? "text-gold" : "text-primary"}`}
										/>
									</div>
									<div>
										<h3 className="font-bold text-foreground mb-1">
											{benefit.title}
										</h3>
										<p className="text-sm text-muted-foreground">
											{benefit.description}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
