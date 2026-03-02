import Link from "next/link";
import Image from "next/image";
import {
	ArrowRight,
	PlayCircle,
	Star,
	GraduationCap,
	Award,
	Briefcase,
	Video,
	Code2,
	Cpu,
} from "lucide-react";
import { HeroWoman } from "@/assets/images";

export function MainHero() {
	return (
		<section className="relative w-full pt-20 pb-28 md:pt-32 md:pb-40 overflow-hidden z-10">
			<div className="container mx-auto px-4 lg:px-8 relative">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
					{/* Left Column: Text Content */}
					<div className="text-left space-y-8 max-w-xl relative z-20">
						{/* Registration Badge (Píldora Superior) */}
						<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-6 w-fit">
							<span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
							<span className="text-xs font-medium text-foreground">Inscripciones Abiertas 2026</span>
						</div>

						{/* Main Headline (Titular Principal) */}
						<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight mb-4">
							Este 2026,<br />
							<span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Tú eres el Motor.</span>
						</h1>

						{/* Subheadline (Subtítulo Llamativo) */}
						<h2 className="text-2xl md:text-3xl font-semibold text-foreground leading-snug mb-6">
							Nuestras Certificaciones son tu <br className="hidden sm:block" />
							<span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary opacity-90">Combustible.</span>
						</h2>

						{/* Paragraph */}
						<p className="text-base md:text-lg text-muted-foreground font-normal max-w-2xl leading-relaxed mb-8">
							Tu formación necesita peso. Consíguelo respaldándote con la <strong className="text-foreground">élite nacional (CIP, CAP, CEL)</strong> y los <strong className="text-foreground">líderes globales (Autodesk, RIB Presto)</strong>.
						</p>

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 pt-2">
							<Link
								href="/catalog"
								className="group inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
								Descubrir mi Especialización
								<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
							</Link>
							<Link
								href="/register"
								className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-foreground bg-transparent border border-border hover:bg-secondary/20 rounded-full transition-all">
								Registrarse
							</Link>
						</div>
					</div>

					{/* Right Column: Hero Visual - Person & Floating Widgets */}
					<div className="relative w-full min-h-[500px] lg:min-h-[650px] flex items-end justify-center z-10 mt-16 lg:mt-0">
						
						{/* Ambient Glow Orbs (Soft Lighting) */}
						<div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />
						<div className="absolute bottom-[10%] left-[10%] w-[250px] h-[250px] bg-secondary/20 rounded-full blur-[90px] animate-pulse pointer-events-none" style={{ animationDuration: '6s', animationDelay: '1s' }} />

						{/* Decorative Floating Particles (SaaS Aesthetic) */}
						<div className="absolute top-[15%] left-[15%] text-primary/30 animate-bounce pointer-events-none" style={{ animationDuration: '3s' }}>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
						</div>
						<div className="absolute top-[45%] right-[25%] text-secondary/40 animate-pulse pointer-events-none" style={{ animationDuration: '4s' }}>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/></svg>
						</div>
						<div className="absolute bottom-[30%] left-[5%] text-primary/40 animate-bounce pointer-events-none" style={{ animationDuration: '5s', animationDelay: '2s' }}>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
						</div>
						<div className="absolute top-[5%] right-[40%] text-primary/20 animate-spin pointer-events-none" style={{ animationDuration: '20s' }}>
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
						</div>

						{/* Shared Alignment Wrapper for Shape and Image so they overlap perfectly */}
						<div className="absolute bottom-[5%] lg:bottom-[10%] w-[95%] sm:w-[85%] max-w-[460px] h-[75%] z-10 flex items-end justify-center">
							
							{/* Softened Glassmorphism Hexagon Shape */}
							<div 
								className="absolute inset-0 w-full h-full bg-linear-to-br from-primary/80 via-primary/ to-transparent backdrop-blur-[2px] border border-primary/20 rounded-xl z-0"
								style={{
									clipPath: "polygon(50% 0%, 100% 12%, 100% 88%, 50% 100%, 0% 88%, 0% 12%)",
								}}
							/>

							{/* LAYER 2: Woman Image - Clipped strictly at the bottom to respect the hexagon geometry, but totally free at the top */}
							<div 
								className="absolute inset-0 w-full h-full z-10 pointer-events-none"
								style={{
									clipPath: "polygon(0% -50%, 100% -50%, 100% 88%, 50% 100%, 0% 88%)",
								}}>
								<Image
									src={HeroWoman}
									alt="Profesional apuntando"
									fill
									priority
									className="object-contain object-bottom scale-[1.10] md:scale-[1.15] origin-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
								/>
							</div>
						</div>

						{/* Widgets overlays (Z-indexed above everything) */}

						{/* Top Left Widget: Certification */}
						<div className="absolute top-[10%] md:top-[0%] left-[-5%] sm:left-[5%] md:left-[-15%] lg:left-[-5%] z-30 bg-card/90 backdrop-blur-xl border border-gold/30 shadow-xl shadow-gold/10 rounded-2xl p-4 flex items-center gap-4 hover:scale-105 transition-all animate-in fade-in slide-in-from-bottom-5 duration-700">
							<div className="w-12 h-12 bg-gold/10 dark:bg-gold/15 rounded-xl flex items-center justify-center border border-gold/20 dark:border-gold/30">
								<Award className="w-6 h-6 text-gold" />
							</div>
							<div>
								<p className="text-foreground font-bold text-sm">
									Certificación
								</p>
								<p className="text-muted-foreground text-xs">
									Aprobación Oficial
								</p>
							</div>
						</div>

						{/* Center Right Widget: Live Classes (Bigger) */}
						<div className="absolute top-[30%] right-[-5%] sm:right-[0%] md:right-[-10%] lg:right-[-8%] z-30 bg-card/90 backdrop-blur-xl border border-border shadow-2xl rounded-2xl p-5 min-w-[240px] hover:scale-105 transition-all animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
							<div className="flex items-center gap-4 mb-4">
								<div className="relative flex h-4 w-4 mr-1">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
									<span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
								</div>
								<div>
									<h4 className="text-foreground font-bold text-lg leading-none">
										Clases en Vivo
									</h4>
									<span className="text-muted-foreground text-sm">
										Interacción Directa
									</span>
								</div>
							</div>
							{/* Avatars Stack */}
							<div className="flex -space-x-3 pt-2 border-t border-border/50">
								{[
									"https://images.unsplash.com/photo-1541888086425-d81bb190408?w=100&h=100&fit=crop",
									"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
									"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
								].map((img, i) => (
									<div
										key={i}
										className="w-10 h-10 rounded-full border-2 border-background overflow-hidden bg-secondary">
										<Image
											src={img}
											alt="Student"
											width={40}
											height={40}
											className="object-cover"
										/>
									</div>
								))}
								<div className="w-10 h-10 rounded-full border-2 border-background flex items-center justify-center bg-primary text-xs font-bold text-primary-foreground">
									<Video className="w-4 h-4" />
								</div>
							</div>
						</div>

						{/* Bottom Left Widget: Experience */}
						<div className="absolute bottom-[5%] md:bottom-[15%] left-[-5%] sm:left-[5%] md:left-[-10%] lg:left-[0%] z-30 bg-card/90 backdrop-blur-xl border border-border shadow-2xl rounded-2xl p-4 flex items-center gap-4 hover:scale-105 transition-all animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
							<div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 dark:bg-primary/15 rounded-xl flex items-center justify-center border border-primary/20 dark:border-primary/30">
								<Briefcase className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
							</div>
							<div>
								<h4 className="text-foreground font-bold text-base lg:text-lg leading-none">
									+5 Años
								</h4>
								<p className="text-muted-foreground text-[10px] lg:text-xs mt-1">
									De Experiencia
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
