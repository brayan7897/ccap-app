import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
	ArrowRight,
	Award,
	TrendingUp,
	Users,
	UserPlus,
} from "lucide-react";
import { HeroWoman2 } from "@/assets/images";

const HERO_STATS = [
	{
		icon: Award,
		label: "Certificación Oficial",
		desktopLabel: <>CERTIFICACIÓN<br />OFICIAL</>,
		sub: "Con garantía legal",
		desktopSub: <>Con garantía legal</>
	},
	{
		icon: TrendingUp,
		label: "+5 Años de Experiencia",
		desktopLabel: <>+5 AÑOS<br />DE EXPERIENCIA</>,
		sub: "Formando profesionales a nivel nacional",
		desktopSub: <>Formando profesionales<br />a nivel Nacional</>
	},
	{
		icon: Users,
		label: "+5000 Clientes",
		desktopLabel: <>+ DE 5000<br />CLIENTES</>,
		sub: "Confían en nuestros programas",
		desktopSub: <>que confían en<br />nosotros</>
	},
];

export function MainHero() {
	return (
		<section className="relative w-full lg:h-[750px] flex items-center overflow-hidden z-10 transition-colors bg-background">

			{/* ── Desktop background curves (lg+) ── */}
			<div className="absolute inset-0 z-0 hidden lg:block pointer-events-none">
				{/* Degradado oscuro a pantalla completa (reemplaza a la curva en modo oscuro) */}
				<div className="hidden dark:block absolute inset-0 bg-gradient-to-l from-muted via-muted/50 to-transparent" />
				
				<svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
					<path d="M 65 0 C 40 30, 40 70, 50 100 L 100 100 L 100 0 Z" className="fill-secondary" />
					<path d="M 66 0 C 41 30, 41 70, 52 100 L 100 100 L 100 0 Z" className="fill-background" />
					<path d="M 66.5 0 C 41.5 30, 41.5 70, 53 100 L 100 100 L 100 0 Z" className="fill-primary dark:hidden transition-colors duration-300" />
				</svg>
			</div>

			{/* ── Content grid ── */}
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
				<div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-0 lg:items-stretch lg:h-[750px]">

					{/* ── Left column: Text ── */}
					<div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center text-center lg:text-left space-y-6 relative z-20 py-12 lg:py-20 lg:pr-8">

						{/* Headline */}
						<h1 className="flex flex-col text-balance">
							<span className="text-sm sm:text-base lg:text-lg text-muted-foreground uppercase tracking-widest mb-1 font-bold animate-fade-in-up">
								PROGRAMA DE
							</span>
							<span className="text-4xl sm:text-5xl md:text-7xl lg:text-[3.25rem] xl:text-[3.75rem] 2xl:text-[4.5rem] uppercase text-foreground font-black leading-none tracking-tighter sm:tracking-tight animate-fade-in-up delay-100">
								ACTUALIZACIÓN
							</span>
							<span className="text-4xl sm:text-5xl md:text-7xl lg:text-[3.25rem] xl:text-[3.75rem] 2xl:text-[4.5rem] uppercase text-secondary font-black leading-none tracking-tighter sm:tracking-tight mt-1 lg:mt-0 animate-fade-in-up delay-200">
								PROFESIONAL
							</span>
							<span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-muted-foreground mt-3 block uppercase font-bold tracking-tight animate-fade-in-up delay-300">
								QUE FORTALECE COMPETENCIAS
							</span>
						</h1>

						{/* Paragraph */}
						<p className="text-sm sm:text-base lg:text-lg text-muted-foreground font-medium leading-relaxed max-w-md mx-auto lg:mx-0 animate-fade-in-up delay-400">
							Estudia de forma flexible y certifícate con{" "}
							<strong className="font-extrabold text-foreground">garantía legal.</strong>
						</p>

						{/* Action Buttons */}
						<div className="flex flex-row gap-3 flex-wrap justify-center lg:justify-start animate-fade-in-up delay-500">
							<Link
								href="/catalog"
								className="group inline-flex items-center justify-center px-6 sm:px-8 py-3.5 text-sm font-semibold text-foreground bg-transparent border border-border hover:bg-muted rounded-md transition-all shadow-lg hover:-translate-y-0.5">
								Explorar programas
								<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
							</Link>
							<Link
								href="/register"
								className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 text-sm font-semibold text-secondary-foreground bg-secondary hover:opacity-90 rounded-md transition-all shadow-lg hover:-translate-y-0.5">
								<UserPlus className="w-4 h-4" />
								Regístrate
								<ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
							</Link>
						</div>
					</div>

					{/* ── Right column: Visual ── */}
					<div className="lg:col-span-6 xl:col-span-7 relative w-full lg:h-full overflow-hidden">

						{/* ── Mobile/tablet (<lg): Layout en escalera con fondo adaptable ── */}
						<div className="lg:hidden relative py-12 sm:py-16 w-full">
							{/* Degradado oscuro para móvil */}
							<div className="hidden dark:block absolute inset-0 bg-gradient-to-b from-muted via-muted/50 to-transparent pointer-events-none z-0" />

							{/* Acentos flotantes animados (ligeros) */}
							{/* Arriba derecha */}
							<div className="absolute top-0 right-4 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-secondary/15 dark:bg-secondary/10 blur-xl animate-pulse" />
							<div className="absolute top-6 -right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-[6px] border-secondary opacity-60 animate-[bounce_4s_infinite]" />
							
							{/* Abajo izquierda */}
							<div className="absolute bottom-4 -left-4 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-secondary/15 dark:bg-secondary/10 blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
							<div className="absolute bottom-10 left-2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-secondary opacity-80 animate-[bounce_5s_infinite]" style={{ animationDelay: '1.5s' }} />

							{/* Contenedor Vertical en Escalera para las Tarjetas */}
							<div className="relative z-10 flex flex-col gap-5 sm:gap-6 w-full max-w-sm mx-auto px-4 sm:px-0">
								{HERO_STATS.map(({ icon: Icon, label, sub }, index) => {
									// Lógica de escalera nativa con Flexbox
									const alignClass = 
										index === 0 ? "self-start" : 
										index === 1 ? "self-center" : 
										"self-end";
									
									return (
										<div key={label} className={`flex items-center gap-4 bg-card border border-border/60 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-2xl hover:-translate-y-1 transition-all duration-150 ease-out p-4 sm:p-5 w-[85%] sm:w-[88%] ${alignClass} animate-fade-in-up`} style={{ animationDelay: `${(index + 3) * 100}ms` }}>
											<div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-inner">
												<Icon className="w-6 h-6 sm:w-7 sm:h-7 text-secondary" />
											</div>
											<div className="flex flex-col text-left min-w-0">
												<p className="text-[14px] sm:text-[16px] font-bold text-card-foreground uppercase tracking-normal leading-snug">{label}</p>
												<p className="text-[12px] sm:text-[13px] text-muted-foreground font-medium leading-snug mt-1">{sub}</p>
											</div>
										</div>
									);
								})}
							</div>
						</div>

						{/* ── Desktop (lg+): mujer + widgets en layout fluido ── */}
						<div className="hidden lg:block relative w-full h-full">

							{/* Woman Image Column */}
							<div className="absolute bottom-0 left-0 w-[45%] xl:w-[50%] h-[90%] z-10 pointer-events-none">
								<Image
									src={HeroWoman2}
									alt="Profesional"
									fill
									priority
									placeholder="blur"
									className="object-contain object-bottom origin-bottom"
								/>
							</div>

							{/* Floating Widgets Column */}
							<div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col justify-center gap-4 xl:gap-6 z-30 w-[52%] xl:w-[48%] pl-2 xl:pl-0 pr-2 xl:pr-6">
								<div className="flex flex-col gap-4 xl:gap-5 w-full max-w-[20rem] xl:max-w-[23rem] ml-auto">
									{HERO_STATS.map(({ icon: Icon, desktopLabel, desktopSub }, index) => (
										<div 
											key={index} 
											className="flex bg-card border border-border/50 dark:border-white/5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)] overflow-hidden w-full min-h-[95px] xl:min-h-[120px] hover:-translate-x-2 transition-all duration-150 ease-out group py-2 xl:py-0 animate-fade-in-left"
											style={{ animationDelay: `${(index + 3) * 100}ms` }}
										>
											<div className="flex items-center justify-center w-[75px] xl:w-[95px] shrink-0 pl-3 xl:pl-4">
												<div className="w-[52px] h-[52px] xl:w-[68px] xl:h-[68px] rounded-full bg-primary flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-150 ease-out">
													<Icon className="w-6 h-6 xl:w-8 xl:h-8 text-secondary" />
												</div>
											</div>
											<div className="flex flex-col justify-center px-3 xl:px-4 flex-1">
												<p className="text-[13px] xl:text-[15px] font-bold text-card-foreground uppercase tracking-normal leading-tight">
													{desktopLabel}
												</p>
												<p className="text-[11px] xl:text-[13px] text-muted-foreground font-medium leading-tight mt-1 xl:mt-1.5">
													{desktopSub}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</section>
	);
}
