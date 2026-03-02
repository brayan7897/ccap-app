import Image from "next/image";
import Link from "next/link";
import { Target, ArrowRight } from "lucide-react";

export function HomeAbout() {
	return (
		<section className="py-24 relative overflow-hidden z-10">
			{/* Background Decor */}
			<div className="absolute top-0 right-0 w-1/2 h-full bg-muted/30 dark:bg-muted/10 rounded-l-[100px] skew-x-[-10deg] translate-x-12 hidden lg:block" />

			<div className="container mx-auto px-4 lg:px-8 relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					<div className="space-y-8 max-w-xl">
						<p className="text-xs font-bold text-gold tracking-[0.2em] uppercase">
							Sobre nosotros
						</p>

						<h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight transition-colors">
							Construyendo <br />
							la generación de <br />
							<span className="text-primary">líderes técnicos.</span>
						</h2>

						<p className="text-lg text-muted-foreground leading-relaxed font-light transition-colors">
							En ccap, creemos que la arquitectura y la ingeniería son los
							motores del progreso. Nuestra misión es democratizar el
							aprendizaje de élite, acortando la brecha entre la academia y la
							excelencia profesional real.
						</p>

						<div className="grid grid-cols-2 gap-8 pt-4">
							<div className="p-4 rounded-xl bg-card border border-border">
								<h3 className="text-3xl md:text-4xl font-black text-primary mb-2">
									20M+
								</h3>
								<p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
									Horas de clase impartidas
								</p>
							</div>
							<div className="p-4 rounded-xl bg-card border border-border">
								<h3 className="text-3xl md:text-4xl font-black text-gold mb-2">
									150+
								</h3>
								<p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
									Docentes Expertos
								</p>
							</div>
						</div>

						<div className="pt-6">
							<Link
								href="/about"
								className="group inline-flex items-center gap-2 px-8 py-3.5 bg-background border border-border text-foreground hover:border-primary/30 hover:bg-secondary transition-all font-bold rounded-full">
								Conoce a nuestro equipo
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</Link>
						</div>
					</div>

					<div className="relative mx-auto w-full max-w-lg aspect-square">
						<div className="absolute inset-4 rounded-[2rem] overflow-hidden border-2 border-border transition-colors shadow-2xl">
							<Image
								src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
								alt="Nosotros ccap"
								fill
								className="object-cover"
							/>
							<div className="absolute inset-0 bg-linear-to-tr from-background/60 via-transparent to-primary/10" />
						</div>

						{/* Mission Badge overlay */}
						<div className="absolute -bottom-6 -left-6 bg-card/90 backdrop-blur-md p-6 rounded-2xl border border-border shadow-2xl flex items-center gap-4 transition-colors">
							<div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
								<Target className="w-6 h-6 text-primary-foreground" />
							</div>
							<div>
								<h4 className="text-foreground font-bold text-lg">
									Misión ccap
								</h4>
								<p className="text-sm text-muted-foreground">
									Excelencia académica global
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
