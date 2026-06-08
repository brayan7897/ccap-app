import { ShieldCheck, User } from "lucide-react";
import { publicService } from "@/services/public.service";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export async function Teachers() {
	const teachers = await publicService.getFeaturedProfessors();

	return (
		<section className="py-20 relative z-10 bg-transparent border-b border-border/50">
			<div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
				{/* Header Section */}
				<ScrollReveal animation="fade-in-up" duration={700} threshold={0.15}>
					<div className="flex flex-col items-center text-center mb-16 space-y-4">
						<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-semibold text-xs uppercase tracking-wider">
							<ShieldCheck className="w-3.5 h-3.5" />
							<span>Profesionales del Sector</span>
						</div>
						<h2 className="relative text-3xl md:text-4xl font-extrabold text-foreground tracking-tight uppercase pb-4">
							Plana Docente
							<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-secondary rounded-full"></span>
						</h2>
						<p className="text-muted-foreground text-sm md:text-base font-medium max-w-lg mt-2">
							Aprende directamente de expertos que lideran proyectos y aplican estas metodologías en la industria actual.
						</p>
					</div>
				</ScrollReveal>

				{/* Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
					{teachers.map((teacher, index) => (
						<ScrollReveal
							key={index}
							animation="fade-in-up"
							duration={800}
							delay={index * 150 + 100} // delayed starting point and staggered
							threshold={0.15} // requires more of the card to be visible before showing
						>
							<div className="group relative flex items-center gap-6 bg-card text-card-foreground border border-border/50 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full">
								
								{/* Background Decoration */}
								<div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
								<div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-tr-full -translate-x-1/2 translate-y-1/2 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

								{/* Large Image */}
								<div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 rounded-full bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-card shadow-md group-hover:shadow-lg transition-all duration-500 z-10 relative">
									{teacher.image ? (
										<img
											src={teacher.image}
											alt={teacher.name}
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
										/>
									) : (
										<User className="w-12 h-12 text-primary/40 group-hover:text-primary group-hover:scale-110 transition-all duration-500" />
									)}
								</div>

								{/* Text Content */}
								<div className="flex flex-col text-left z-10">
									<h3 className="font-extrabold text-[15px] md:text-[17px] text-foreground leading-none mb-2 group-hover:text-secondary transition-colors duration-300">
										{teacher.name}
									</h3>
									<p className="text-muted-foreground font-medium text-[13px] md:text-[14px] leading-relaxed mb-4">
										{teacher.specialty}
									</p>
									<div className="w-8 h-1 bg-secondary rounded-full group-hover:w-16 transition-all duration-500" />
								</div>
							</div>
						</ScrollReveal>
					))}
				</div>
			</div>
		</section>
	);
}
