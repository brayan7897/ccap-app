"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
	ShieldCheck,
	Search,
	Globe,
	Lock,
	Briefcase,
	CheckCircle2,
	Award,
	ChevronRight,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

// @ts-ignore
import CertificadoFrontal from "@/assets/images/certificados/certificado-cara-frontal.jpeg";
// @ts-ignore
import CertificadoTrasera from "@/assets/images/certificados/certificado-cara-trasera.jpeg";

export default function CertificatesPage() {
	const router = useRouter();
	const [code, setCode] = useState("");
	const [isHovered, setIsHovered] = useState(false);

	function handleVerify() {
		const trimmed = code.trim().toUpperCase();
		if (trimmed)
			router.push(`/certificates/verify/${encodeURIComponent(trimmed)}`);
	}

	return (
		<div className="min-h-screen flex flex-col bg-background relative overflow-hidden transition-colors duration-500">
			{/* Decorative Base Mesh */}
			<div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[800px] bg-foreground/5 dark:bg-foreground/10 rounded-full blur-[120px] pointer-events-none z-0" />
			<div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] max-w-[600px] bg-gold/10 dark:bg-gold/20 rounded-full blur-[120px] pointer-events-none z-0" />

			{/* Hero Verifier Section */}
			<section className="relative pt-24 md:pt-32 pb-24 md:pb-32 z-10">
				<div className="container mx-auto px-4 lg:px-8 relative">
					<div className="max-w-3xl mx-auto text-center space-y-8">
						{/* Trust Badge */}
						<ScrollReveal animation="fade-in-up" duration={600}>
							<div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card/60 backdrop-blur-md border border-border shadow-xs hover:shadow-md transition-all hover:border-gold/30 mx-auto cursor-default group">
								<ShieldCheck className="w-5 h-5 text-gold group-hover:scale-110 transition-transform duration-300" />
								<span className="text-sm font-semibold text-foreground tracking-wide uppercase">
									Plataforma de Verificación Oficial
								</span>
							</div>
						</ScrollReveal>

						{/* Headline */}
						<ScrollReveal animation="fade-in-up" duration={600} delay={100}>
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight">
								Asegura el valor de tu <br className="hidden sm:block" />
								<span className="text-foreground relative inline-block group">
									certificación profesional.
									<span className="absolute bottom-1 left-0 w-full h-2 bg-gold/30 rounded-full -z-10 group-hover:h-4 transition-all duration-300"></span>
								</span>
							</h1>
						</ScrollReveal>

						{/* Description */}
						<ScrollReveal animation="fade-in-up" duration={600} delay={200}>
							<p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
								Valida la autenticidad de tus credenciales emitidas por{" "}
								<strong className="text-foreground">CCAP GLOBAL</strong> y demuestra tu respaldo académico
								ante empresas e instituciones en todo el mundo.
							</p>
						</ScrollReveal>

						{/* Verification Card */}
						<ScrollReveal animation="scale-in" duration={800} delay={300} threshold={0.05}>
							<div className="relative max-w-3xl mx-auto mt-16 text-left">
								{/* Soft Glow Behind Card */}
								<div className="absolute -inset-1 bg-linear-to-r from-border/50 via-foreground/5 to-gold/20 dark:from-border/30 dark:to-gold/10 rounded-[2.5rem] blur-xl opacity-70"></div>

								<div className="relative bg-card rounded-[2rem] border border-border shadow-2xl overflow-hidden p-6 sm:p-10 z-10 transition-all duration-500 hover:shadow-gold/5 hover:border-border/80">
									<div className="mb-8 text-center sm:text-left">
										<h3 className="text-2xl font-bold text-foreground mb-3 flex items-center justify-center sm:justify-start gap-2">
											Verificación Rápida
											<ShieldCheck className="w-5 h-5 text-green-500 animate-pulse" />
										</h3>
										<p className="text-muted-foreground">
											Ingresa el código alfanumérico único de tu certificado o el número de DNI del participante para consultar los certificados asociados.
										</p>
									</div>

									{/* Input Field Area */}
									<div 
										className="bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-2.5 sm:p-3 flex flex-col sm:flex-row items-center gap-3 focus-within:border-ring focus-within:ring-4 focus-within:ring-ring/20 transition-all shadow-inner group"
										onMouseEnter={() => setIsHovered(true)}
										onMouseLeave={() => setIsHovered(false)}
									>
										<div className="hidden sm:flex pl-4 text-muted-foreground shrink-0 transition-colors group-focus-within:text-ring">
											<Search className="w-6 h-6" />
										</div>
										<input
											type="text"
											value={code}
											onChange={(e) => setCode(e.target.value)}
											onKeyDown={(e) => e.key === "Enter" && handleVerify()}
											placeholder="Ej. CCAP-2026-A1X9B o 12345678"
											className="w-full flex-1 bg-transparent border-none outline-none text-foreground text-center sm:text-left text-lg font-bold placeholder:text-muted-foreground/40 placeholder:font-medium uppercase py-3 px-2 tracking-wider"
										/>
										<button
											onClick={handleVerify}
											disabled={!code.trim()}
											className="w-full sm:w-auto bg-foreground hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed text-background px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 shrink-0 flex items-center justify-center gap-2 group-focus-within:ring-2 group-focus-within:ring-offset-2 group-focus-within:ring-foreground overflow-hidden relative">
											<span className="relative z-10 flex items-center gap-2">
												<Search className="w-5 h-5 sm:hidden" />
												Consultar
												<ChevronRight className={`w-4 h-4 hidden sm:block transition-transform duration-300 ${isHovered && code.trim() ? 'translate-x-1' : ''}`} />
											</span>
											{/* Highlight sweep effect */}
											{code.trim() && (
												<div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-background/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
											)}
										</button>
									</div>

									{/* Helpful Tips or Footer Hint */}
									<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div className="bg-muted/50 border border-border/50 rounded-xl p-4 flex items-start gap-4 hover:bg-muted transition-colors">
											<div className="mt-0.5 bg-background p-2 rounded-lg shadow-sm border border-border shrink-0 text-foreground">
												<Globe className="w-4 h-4" />
											</div>
											<p className="text-xs text-muted-foreground font-medium leading-relaxed">
												Asegúrate de incluir los guiones al momento de transcribir
												tu código o ingresar los 8 dígitos de tu DNI.
											</p>
										</div>
										<div className="bg-gold/5 border border-gold/20 rounded-xl p-4 flex items-start gap-4 hover:bg-gold/10 transition-colors">
											<div className="mt-0.5 bg-background p-2 rounded-lg shadow-sm border border-gold/30 shrink-0 text-gold">
												<Search className="w-4 h-4" />
											</div>
											<p className="text-xs text-muted-foreground font-medium leading-relaxed">
												También puedes escanear directamente el{" "}
												<strong className="text-foreground">código QR</strong> al reverso.
											</p>
										</div>
									</div>
								</div>
							</div>
						</ScrollReveal>
					</div>
				</div>
			</section>

			{/* Preview del Certificado Section */}
			<section className="py-24 bg-muted/30 border-t border-border relative z-10">
				<div className="container mx-auto px-4 lg:px-8">
					<ScrollReveal animation="fade-in-up" duration={700} threshold={0.15}>
						<div className="text-center mb-20 max-w-3xl mx-auto">
							<h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
								Un Certificado a la Altura de tu{" "}
								<span className="text-gold">
									Esfuerzo
								</span>
							</h2>
							<p className="text-muted-foreground text-lg leading-relaxed">
								Nuestras credenciales están equipadas con rigurosos sistemas de
								comprobación y son auditadas permanentemente por los más altos
								estándares educativos y tecnológicos del país.
							</p>
						</div>
					</ScrollReveal>

					{/* Cara Frontal */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
						{/* Image */}
						<ScrollReveal animation="fade-in-right" duration={800} threshold={0.15}>
							<div className="relative group perspective-1000">
								<div className="absolute -inset-4 bg-linear-to-tr from-foreground/10 to-gold/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
								<div className="relative bg-card rounded-2xl border border-border shadow-xl overflow-hidden aspect-[1.414/1] transform transition-all duration-700 hover:rotate-y-2 hover:rotate-x-2 group-hover:shadow-2xl">
									<Image
										src={CertificadoFrontal}
										alt="Certificado CCAP Cara Frontal"
										fill
										placeholder="blur"
										className="object-cover transform transition-transform duration-1000 group-hover:scale-105"
									/>
									{/* Reflection effect */}
									<div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"></div>
								</div>
							</div>
						</ScrollReveal>

						{/* Text Content */}
						<ScrollReveal animation="fade-in-left" duration={800} threshold={0.15} delay={100}>
							<div className="space-y-8 relative z-20">
								<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 text-foreground font-bold text-sm border border-border backdrop-blur-sm shadow-xs">
									<Award className="w-4 h-4 text-gold" /> Diseño Premium y Respaldo Oficial
								</div>
								<h3 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight tracking-tight">
									Cara Frontal: <br /> El reconocimiento que mereces
								</h3>
								<ul className="space-y-6">
									{[
										{
											title: "Aval Institucional",
											text: "Ostenta los logotipos de CCAP GLOBAL y firmas aliadas formales.",
										},
										{
											title: "Firmas Autorizadas",
											text: "Rúbricas manuscritas legítimas emitidas por los Decanos representativos.",
										},
										{
											title: "Papel de Seguridad",
											text: "Tramado de agua y marco perimetral contra falsificaciones impresas.",
										},
										{
											title: "Registro Controlado",
											text: "Folio identificador y código de barras único para control documentario.",
										},
									].map((item, i) => (
										<li key={i} className="flex gap-4 items-start group">
											<div className="bg-background rounded-full p-1 border border-border group-hover:border-gold/50 group-hover:bg-gold/5 transition-colors mt-1">
												<CheckCircle2 className="w-5 h-5 text-foreground group-hover:text-gold transition-colors" />
											</div>
											<div>
												<strong className="block text-foreground font-bold mb-1 group-hover:text-gold transition-colors duration-300">
													{item.title}
												</strong>
												<span className="text-muted-foreground text-sm leading-relaxed">
													{item.text}
												</span>
											</div>
										</li>
									))}
								</ul>
							</div>
						</ScrollReveal>
					</div>

					{/* Cara Trasera */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
						{/* Text Content */}
						<ScrollReveal animation="fade-in-right" duration={800} threshold={0.15} className="order-2 lg:order-1">
							<div className="space-y-8 relative z-20">
								<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold font-bold text-sm border border-gold/20 backdrop-blur-sm shadow-xs">
									<Lock className="w-4 h-4" /> Seguridad Tecnológica Activa
								</div>
								<h3 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight tracking-tight">
									Cara Trasera: <br /> Validación Transparente 24/7
								</h3>
								<ul className="space-y-6">
									{[
										{
											title: "Malla Curricular Detallada",
											text: "Exposición completa de los módulos cursados, nota académica aprobatoria y total de horas.",
										},
										{
											title: "Código QR Dinámico",
											text: "Escaneo rápido que redirige inmediatamente a la base de datos oficial, impidiendo adulteraciones.",
										},
										{
											title: "Sello Holográfico",
											text: "Relieve de seguridad inmodificable adherido físicamente a la cartulina.",
										},
										{
											title: "Normativa Legal",
											text: "Citación a las leyes y bases normativas del Ministerio que rigen el programa de estudios.",
										},
									].map((item, i) => (
										<li key={i} className="flex gap-4 items-start group">
											<div className="bg-background rounded-full p-1 border border-border group-hover:border-gold/50 group-hover:bg-gold/5 transition-colors mt-1">
												<CheckCircle2 className="w-5 h-5 text-gold" />
											</div>
											<div>
												<strong className="block text-foreground font-bold mb-1 group-hover:text-gold transition-colors duration-300">
													{item.title}
												</strong>
												<span className="text-muted-foreground text-sm leading-relaxed">
													{item.text}
												</span>
											</div>
										</li>
									))}
								</ul>
							</div>
						</ScrollReveal>

						{/* Image */}
						<ScrollReveal animation="fade-in-left" duration={800} threshold={0.15} delay={100} className="order-1 lg:order-2">
							<div className="relative group perspective-1000">
								<div className="absolute -inset-4 bg-linear-to-tl from-gold/20 to-foreground/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
								<div className="relative bg-card rounded-2xl border border-border shadow-xl overflow-hidden aspect-[1.414/1] transform transition-all duration-700 hover:-rotate-y-2 hover:-rotate-x-2 group-hover:shadow-2xl">
									<Image
										src={CertificadoTrasera}
										alt="Certificado CCAP Cara Trasera"
										fill
										placeholder="blur"
										className="object-cover transform transition-transform duration-1000 group-hover:scale-105"
									/>
									{/* Reflection effect */}
									<div className="absolute inset-0 bg-linear-to-tl from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:-translate-x-full transition-all duration-1000 ease-in-out"></div>
								</div>
							</div>
						</ScrollReveal>
					</div>
				</div>
			</section>
		</div>
	);
}
