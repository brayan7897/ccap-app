import { BookOpen, Users, Star, TrendingUp } from "lucide-react";

const STATS = [
	{
		value: "+50",
		label: "Cursos Especializados",
		icon: BookOpen,
		accent: "text-primary",
		bg: "bg-primary/10",
	},
	{
		value: "+10k",
		label: "Estudiantes Activos",
		icon: Users,
		accent: "text-gold",
		bg: "bg-gold/10",
	},
	{
		value: "4.9/5",
		label: "Calificación Promedio",
		icon: Star,
		accent: "text-gold",
		bg: "bg-gold/10",
	},
	{
		value: "98%",
		label: "Tasa de Empleabilidad",
		icon: TrendingUp,
		accent: "text-primary",
		bg: "bg-primary/10",
	},
];

export function PlatformStats() {
	return (
		<section className="relative z-10 w-full bg-card py-20 text-foreground overflow-hidden border-y border-border transition-colors">
			<div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_30%_50%,var(--color-primary),transparent_70%)]" />
			<div className="container mx-auto px-4 relative z-10">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
					{STATS.map((stat, index) => (
						<div
							key={index}
							className="flex flex-col items-center justify-center p-6 rounded-2xl bg-background/50 border border-border/50 hover:border-primary/20 transition-all duration-300 group">
							<div
								className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
								<stat.icon className={`w-5 h-5 ${stat.accent}`} />
							</div>
							<span
								className={`text-3xl md:text-4xl font-extrabold ${stat.accent} mb-1`}>
								{stat.value}
							</span>
							<span className="text-xs md:text-sm text-muted-foreground font-medium text-center">
								{stat.label}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
