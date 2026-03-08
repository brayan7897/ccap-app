import { ShieldCheck, Award, Star, BookOpen, Users, TrendingUp, CheckCircle } from "lucide-react";

const PILARES = [
	{ icon: BookOpen, text: "Rigurosidad académica", desc: "Contenidos actualizados y exigentes." },
	{ icon: Users, text: "Integridad absoluta", desc: "Transparencia en todo el proceso." },
	{ icon: Award, text: "Calidad garantizada", desc: "Altos estándares de enseñanza." },
	{ icon: TrendingUp, text: "Innovación constante", desc: "Métodos y técnicas de vanguardia." },
];

export function HomeAbout() {
	return (
		<section className="pt-24 pb-16 relative z-10 overflow-hidden">
			<style>{`
				@keyframes marquee {
					0% { transform: translateX(0); }
					100% { transform: translateX(-50%); }
				}
				.animate-marquee {
					animation: marquee 30s linear infinite;
				}
				.animate-marquee:hover {
					animation-play-state: paused;
				}
			`}</style>

			{/* Decorative Background Elements */}
			<div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />
			<div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

			<div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
				
				<div className="flex flex-col items-center justify-center gap-12 lg:gap-16">
					{/* Top Header Centered */}
					<div className="flex flex-col items-center text-center space-y-6 max-w-3xl">
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20 backdrop-blur-md">
							<ShieldCheck className="w-4 h-4" />
							<span>Nuestro Compromiso Institucional</span>
						</div>

						<h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-[1.15]">
							Formando la <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600">generación de líderes</span> competitivos.
						</h2>

						<p className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
							Somos una empresa de capacitación especialista en entidades públicas, privadas y
							público en general. Transformamos el potencial en excelencia a través de formación rigurosa.
						</p>
					</div>

					{/* Centered Cards Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
						
						{/* Card 1: Experience */}
						<div className="bg-linear-to-br from-card to-card/50 border border-border/50 rounded-[2rem] p-8 md:p-10 flex flex-col justify-center hover:border-primary/50 transition-all duration-500 shadow-xl shadow-black/5 relative overflow-hidden group min-h-[320px]">
							<div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
							
							<div className="absolute -bottom-6 -right-6 p-6 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
								<Star className="w-40 h-40 text-orange-500 blur-[2px] rotate-12 translate-x-4 translate-y-4" />
							</div>

							<div className="relative z-10 mb-4">
								<div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center ring-1 ring-orange-500/20 group-hover:scale-110 transition-transform duration-500 mb-6">
									<Star className="w-7 h-7 text-orange-500" />
								</div>
								<h3 className="text-4xl font-black text-foreground mb-4">+5 Años</h3>
							</div>
							<p className="relative z-10 text-base text-muted-foreground font-medium leading-relaxed">
								Trayectoria sólida en el sector educativo, brindando programas de alta calidad que responden a las exigencias del mercado laboral actual.
							</p>
						</div>

						{/* Card 2: Experts */}
						<div className="bg-card border border-border/50 rounded-[2rem] p-8 md:p-10 flex flex-col justify-center hover:border-primary/50 transition-all duration-500 shadow-xl shadow-black/5 relative overflow-hidden group min-h-[320px]">
							<div className="absolute -top-10 -right-10 p-6 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
								<Users className="w-48 h-48 text-primary blur-[2px] -rotate-12 translate-x-4 -translate-y-4" />
							</div>
							
							<div className="relative z-10 mb-4">
								<div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center ring-1 ring-blue-500/20 group-hover:scale-110 transition-transform duration-500 mb-6">
									<Award className="w-7 h-7 text-blue-500" />
								</div>
								<h3 className="text-3xl font-black text-foreground mb-4 leading-tight">Plana Docente</h3>
							</div>
							<p className="relative z-10 text-base text-muted-foreground font-medium leading-relaxed">
								Profesionales y expertos altamente calificados, activos en el sector público y privado listos para compartir su experiencia.
							</p>
						</div>

					</div>
				</div>

				{/* Animated Pillars Banner */}
				<div className="mt-20 pt-16 border-t border-border/50 w-full relative overflow-hidden group">
					<div className="text-center mb-10 relative z-10 transition-transform duration-700 ease-in-out group-hover:-translate-y-2">
						<h4 className="text-2xl font-bold text-foreground inline-flex items-center gap-2">
							<CheckCircle className="w-6 h-6 text-primary" />
							Pilares de Excelencia
						</h4>
						<p className="text-muted-foreground mt-2 font-medium">Principios fundamentales de nuestra metodología</p>
					</div>

					<div className="w-full relative flex pb-8">
						{/* Interactive Track - slides items slightly and highlights on hover */}
						<div className="flex w-full justify-center gap-6 md:gap-8 flex-wrap lg:flex-nowrap items-center transition-all duration-700 ease-out group-hover:gap-10">
							{PILARES.map((pilar, index) => (
								<div 
									key={index} 
									className="flex flex-col md:flex-row items-center gap-4 bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl p-6 w-full md:w-[280px] lg:w-[320px] transition-all duration-500 hover:border-primary/50 hover:bg-card hover:-translate-y-3 hover:shadow-xl hover:shadow-primary/10 cursor-default"
								>
									<div className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center border border-border transition-colors shadow-sm group-hover:border-primary/30">
										<pilar.icon className="w-6 h-6 text-primary" />
									</div>
									<div className="flex flex-col text-center md:text-left">
										<p className="text-base font-black text-foreground mb-1">{pilar.text}</p>
										<p className="text-sm text-muted-foreground font-medium">{pilar.desc}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

			</div>
		</section>
	);
}
