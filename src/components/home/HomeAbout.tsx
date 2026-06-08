import {
	Globe2,
	Video,
	Award,
	UserCheck,
	TrendingUp,
} from "lucide-react";

const REASONS = [
	{
		id: "01",
		icon: Globe2,
		title: "APRENDE DESDE CUALQUIER LUGAR",
		desc: "Estudia donde y cuando quieras.",
	},
	{
		id: "02",
		icon: Video,
		title: "CLASES EN VIVO Y GRABADAS",
		desc: "Accede a las clases en tiempo real o revísalas cuando necesites.",
	},
	{
		id: "03",
		icon: Award,
		title: "CERTIFICACIÓN VERIFICABLE",
		desc: "Obtén tu certificado con código QR.",
	},
	{
		id: "04",
		icon: UserCheck,
		title: "DOCENTES ESPECIALIZADOS",
		desc: "Aprende con profesionales con experiencia en el sector.",
	},
	{
		id: "05",
		icon: TrendingUp,
		title: "ACTUALIZACIÓN",
		desc: "Programas alineados a las nuevas tendencias.",
	},
];

export function HomeAbout() {
	return (
		<section className="py-20 relative z-10 bg-white">
			<div className="container mx-auto px-4 lg:px-8 max-w-7xl">
				<div className="text-center mb-16">
					<h2 className="text-xl md:text-2xl font-black text-secondary tracking-wider uppercase">
						¿Por qué elegirnos?
					</h2>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-4">
					{REASONS.map((reason) => (
						<div key={reason.id} className="flex flex-col items-center text-center group">
							<div className="relative mb-6 flex justify-center items-center w-24 h-24">
								<span className="absolute text-7xl font-black text-muted-foreground/10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 group-hover:scale-110 transition-transform">{reason.id}</span>
								<div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary flex items-center justify-center shadow-lg transform group-hover:-translate-y-1 transition-transform relative z-10">
									<reason.icon className="w-8 h-8 text-white" />
								</div>
							</div>
							<h3 className="font-bold text-[13px] text-foreground uppercase mb-2 tracking-tight">
								{reason.title}
							</h3>
							<p className="text-muted-foreground text-xs leading-relaxed max-w-full">
								{reason.desc}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
