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
		iconBg: "bg-primary/10",
		iconColor: "text-primary",
	},
	{
		icon: Lock,
		title: "Tecnología Inmutable",
		description:
			"Firmas digitales encriptadas y registro seguro para evitar fraudes.",
		accent: "gold",
		iconBg: "bg-gold/10",
		iconColor: "text-gold",
	},
	{
		icon: Briefcase,
		title: "Potencial Laboral",
		description:
			"Agrega tu escudo directo a LinkedIn; el 85% de egresados mejora su sueldo.",
		accent: "gold",
		iconBg: "bg-gold/10",
		iconColor: "text-gold",
	},
];

export function HomeCertificates() {
	return (
		<section className="py-20 bg-muted/20 border-y border-border/50 relative overflow-hidden transition-colors">
			{/* Background Ambient Glow */}
			<div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

			<div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center mb-16 space-y-4">
					<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold font-semibold text-xs border border-gold/20">
						<ShieldCheck className="w-3.5 h-3.5" />
						<span>VALIDACIÓN OFICIAL</span>
					</div>

					<h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight max-w-3xl">
						Valida la Autenticidad de tu <span className="text-gold">Certificación</span>
					</h2>

					<p className="text-muted-foreground text-sm md:text-base max-w-2xl font-medium">
						Empresas y reclutadores confían en nuestros certificados. Ingresa
						tu código único o DNI para validar instantáneamente tus habilidades.
					</p>

					{/* Search bar centered directly under subtitle */}
					<div className="mt-8 relative w-full flex items-center justify-center">
						<div className="relative w-full max-w-lg bg-card p-1.5 rounded-xl border border-border flex items-center shadow-sm focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
							<div className="pl-3 pr-2 text-muted-foreground">
								<Search className="w-4 h-4" />
							</div>
							<input
								type="text"
								placeholder="Ingresa el código de certificado o DNI"
								className="flex-1 bg-transparent border-none outline-none text-foreground text-sm placeholder:text-muted-foreground uppercase font-medium"
							/>
							<button className="bg-gold hover:bg-gold/90 text-gold-foreground px-5 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 text-sm shadow-sm">
								Verificar
								<ArrowRight className="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>

				{/* Benefits Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{BENEFITS.map((benefit, index) => {
						return (
							<div
								key={index}
								className="group bg-card p-6 rounded-2xl flex flex-col items-start gap-4 transition-all duration-300 border border-border/50 shadow-sm hover:shadow-md hover:border-border hover:-translate-y-0.5">
								<div
									className={`w-12 h-12 ${benefit.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
									<benefit.icon
										className={`w-5 h-5 ${benefit.iconColor}`}
									/>
								</div>
								<div>
									<h3 className="text-[17px] font-bold text-foreground mb-1.5">
										{benefit.title}
									</h3>
									<p className="text-[14px] text-muted-foreground font-medium leading-relaxed">
										{benefit.description}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
