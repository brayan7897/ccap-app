import { BookOpen, Users, Star, TrendingUp } from "lucide-react";

const STATS = [
	{
		value: "300+",
		label: "Cursos Disponibles",
		icon: BookOpen,
		accent: "text-primary",
		bg: "bg-primary/10",
	},
	{
		value: "4.8",
		label: "Calificación Promedio",
		icon: Star,
		accent: "text-primary",
		bg: "bg-primary/10",
	},
	{
		value: "15K+",
		label: "Estudiantes Activos",
		icon: Users,
		accent: "text-primary",
		bg: "bg-primary/10",
	},
	{
		value: "98%",
		label: "Tasa de Satisfacción",
		icon: TrendingUp,
		accent: "text-primary",
		bg: "bg-primary/10",
	},
];

export function PlatformStats() {
	return (
		<section className="relative z-10 w-full bg-background/50 py-12 text-foreground overflow-hidden transition-colors">
			<div className="container mx-auto px-4 relative z-10 max-w-6xl">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
					{STATS.map((stat, index) => (
						<div
							key={index}
							className="flex items-center gap-4 p-5 md:p-6 rounded-2xl bg-card shadow-sm border border-border/50 hover:shadow-md hover:border-border transition-all duration-300">
							<div
								className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
								<stat.icon className={`w-5 h-5 ${stat.accent}`} />
							</div>
							<div className="flex flex-col">
								<span className="text-xl md:text-2xl font-black text-foreground">
									{stat.value}
								</span>
								<span className="text-xs md:text-sm font-medium text-muted-foreground mt-0.5">
									{stat.label}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
