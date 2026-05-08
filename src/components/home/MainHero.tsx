import Link from "next/link";
import Image from "next/image";
import {
	ArrowRight,
	Award,
	Briefcase,
	Video,
	MonitorPlay,
	Cast,
} from "lucide-react";
import { HeroWoman } from "@/assets/images";
import { Clients } from "./Clients";

export function MainHero() {
	return (
		<section className="relative w-full pt-12 md:pt-14 lg:pt-24 pb-12 md:pb-20 lg:pb-24 overflow-hidden z-10 transition-colors">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-8 lg:mb-16">

					{/* ── Left Column: Text Content ─────────────────────────── */}
					<div className="text-center lg:text-left mx-auto lg:mx-0 space-y-6 md:space-y-8 relative z-20 max-w-2xl flex flex-col justify-center items-center lg:items-start pb-4 lg:pb-16">

						{/* Registration Badge */}
						<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm w-fit">
							<span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
							<span className="text-xs font-medium text-foreground">Inscripciones Abiertas 2026</span>
						</div>

						{/* Main Headline */}
						<h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight transition-colors text-balance">
							<span className="sr-only">CCAP Global — Cursos Online con Certificación Avalada en Perú</span>
							<span aria-hidden="true">
								Formación Profesional de{" "}
								<span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
									Excelencia y Calidad.
								</span>
							</span>
						</h1>

						{/* Subheadline */}
						<h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground leading-snug transition-colors">
							Certificaciones que impulsan tu{" "}
							<span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary opacity-90">
								Crecimiento Laboral.
							</span>
						</h2>

						{/* Paragraph */}
						<p className="text-sm md:text-base text-muted-foreground font-normal leading-relaxed transition-colors max-w-xl mx-auto lg:mx-0">
							Impulsa tu carrera con nuestros programas y diplomados. Obtén una certificación con respaldo oficial de <strong className="text-foreground transition-colors">líderes de la industria a nivel nacional y global</strong>.
						</p>

						{/* Action Buttons */}
						<div className="flex flex-row gap-3 pt-2 flex-wrap justify-center lg:justify-start">
							<Link
								href="/catalog"
								className="group inline-flex items-center justify-center px-5 sm:px-7 py-3 sm:py-3.5 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
								Descubrir mi Especialización
								<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
							</Link>
							<Link
								href="/register"
								className="inline-flex items-center justify-center px-5 sm:px-7 py-3 sm:py-3.5 text-sm font-bold text-foreground bg-transparent border border-border hover:bg-secondary/20 rounded-full transition-all">
								Registrarse
							</Link>
						</div>
					</div>

					{/* ── Right Column: Hero Visual ── */}
					<div className="flex relative w-full max-w-md lg:max-w-none mx-auto aspect-4/4 lg:aspect-4/3.5 items-end justify-center z-10 self-end lg:-mr-6">

						{/* Ambient Glow Orbs */}
						<div
							className="absolute top-[20%] right-[10%] w-60 h-60 bg-primary/15 rounded-full blur-[90px] animate-pulse pointer-events-none"
							style={{ animationDuration: "4s" }}
						/>
						<div
							className="absolute bottom-[10%] left-[10%] w-52 h-52 bg-secondary/15 rounded-full blur-[80px] animate-pulse pointer-events-none"
							style={{ animationDuration: "6s", animationDelay: "1s" }}
						/>

						{/* Background Circle */}
						<div className="absolute inset-x-[10%] inset-y-[5%] lg:inset-x-[12%] lg:inset-y-[10%] bg-linear-to-tr from-primary/5 via-primary/10 to-transparent rounded-full z-0 border border-primary/10" />

						{/* Woman Image */}
						<div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none">
							<Image
								src={HeroWoman}
								alt="Profesional de ingeniería certificada por CCAP Global"
								fill
								priority
								className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_40px_rgba(255,255,255,0.05)] scale-105 origin-bottom"
							/>
						</div>

						{/* ── Responsive Floating Widgets ── */}
						{/* Widget 1: Certificación (Top Left) */}
						<div className="flex absolute top-[2%] left-[2%] sm:left-[5%] md:top-[8%] md:left-[-5%] lg:top-[10%] lg:left-[-8%] xl:left-[-12%] z-30 bg-card/95 backdrop-blur-xl border border-border shadow-[0_15px_35px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] rounded-full px-3 py-2 md:px-6 md:py-3.5 items-center gap-2 md:gap-3 hover:-translate-y-2 transition-all duration-300 group cursor-default" style={{ animation: "float 6s ease-in-out infinite" }}>
							<div className="w-8 h-8 md:w-10 md:h-10 bg-linear-to-br from-gold/20 to-gold/5 dark:from-gold/30 dark:to-gold/10 rounded-full flex items-center justify-center border border-gold/20 shrink-0 group-hover:scale-110 transition-transform duration-300">
								<Award className="w-4 h-4 md:w-5 md:h-5 text-gold group-hover:scale-110 transition-transform" />
							</div>
							<p className="text-foreground font-bold text-xs md:text-sm whitespace-nowrap">Certificación Oficial</p>
						</div>

						{/* Widget 2: Clases en Vivo (Top Right) */}
						<div className="flex absolute top-[15%] right-[2%] sm:right-[5%] md:top-[25%] md:right-[-5%] lg:top-[25%] lg:right-[-8%] xl:right-[-12%] z-30 bg-card/95 backdrop-blur-xl border border-border shadow-[0_15px_35px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] rounded-full px-3 py-2 md:px-6 md:py-3.5 items-center gap-2 md:gap-3 hover:-translate-y-2 transition-all duration-300 group cursor-default" style={{ animation: "float 7s ease-in-out infinite reverse" }}>
							<div className="w-8 h-8 md:w-10 md:h-10 bg-linear-to-br from-blue-500/20 to-blue-500/5 dark:from-blue-500/30 dark:to-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20 shrink-0 group-hover:scale-110 transition-transform duration-300">
								<div className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
									<span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-blue-500" />
								</div>
							</div>
							<p className="text-foreground font-bold text-xs md:text-sm whitespace-nowrap">Clases en Vivo</p>
						</div>

						{/* Widget 3: Experiencia (Bottom Left) */}
						<div className="flex absolute bottom-[25%] left-[2%] sm:left-[5%] md:bottom-[30%] md:left-[-5%] lg:bottom-[35%] lg:left-[-8%] xl:left-[-12%] z-30 bg-card/95 backdrop-blur-xl border border-border shadow-[0_15px_35px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] rounded-full px-3 py-2 md:px-6 md:py-3.5 items-center gap-2 md:gap-3 hover:-translate-y-2 transition-all duration-300 group cursor-default" style={{ animation: "float 8s ease-in-out infinite 1s" }}>
							<div className="w-8 h-8 md:w-10 md:h-10 bg-linear-to-br from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10 rounded-full flex items-center justify-center border border-primary/20 shrink-0 group-hover:scale-110 transition-transform duration-300">
								<Briefcase className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:rotate-12 transition-transform" />
							</div>
							<p className="text-foreground font-bold text-xs md:text-sm whitespace-nowrap">+5 Años de Experiencia</p>
						</div>
					</div>
				</div>

				{/* Clients Banner - styled as the bottom floating menu */}
				<div className="w-full flex justify-center pb-8 z-40 relative -mt-6 md:-mt-12 lg:-mt-20">
					<Clients />
				</div>
			</div>
			
			{/* Inline CSS for float animation */}
			<style dangerouslySetInnerHTML={{__html: `
				@keyframes float {
					0% { transform: translateY(0px); }
					50% { transform: translateY(-10px); }
					100% { transform: translateY(0px); }
				}
			`}} />
		</section>
	);
}
