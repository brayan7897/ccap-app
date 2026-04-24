"use client";

// NOTE: In Next.js App Router, 'use client' pages cannot export metadata.
// SEO for this page is handled by the parent layout or a separate server
// wrapper. The metadata below is documented here for reference only.
// See: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#unsupported-metadata
//
// Title: "Verificación de Certificados Oficiales — CCAP Global"
// Description: "Verifica la autenticidad de tu certificado CCAP Global usando
//   tu código único o DNI. Plataforma de validación de credenciales de cursos
//   online con aval CIP, Autodesk y RIB Presto."


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
} from "lucide-react";

// @ts-ignore
import CertificadoFrontal from "@/assets/images/certificados/certificado-cara-frontal.jpeg";
// @ts-ignore
import CertificadoTrasera from "@/assets/images/certificados/certificado-cara-trasera.jpeg";

export default function CertificatesPage() {
	const router = useRouter();
	const [code, setCode] = useState("");

	function handleVerify() {
		const trimmed = code.trim().toUpperCase();
		if (trimmed)
			router.push(`/certificates/verify/${encodeURIComponent(trimmed)}`);
	}

	return (
		<div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
			{/* Decorative Base Mesh */}
			<div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />
			<div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] max-w-[600px] bg-gold/10 rounded-full blur-[120px] pointer-events-none z-0" />

			{/* Hero Verifier Section */}
			<section className="relative pt-24 md:pt-32 pb-24 md:pb-32 z-10">
				<div className="container mx-auto px-4 lg:px-8 relative">
					<div className="max-w-3xl mx-auto text-center space-y-8">
						{/* Trust Badge */}
						<div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-card/60 backdrop-blur-md border border-border shadow-sm mx-auto">
							<ShieldCheck className="w-5 h-5 text-gold" />
							<span className="text-sm font-semibold text-foreground tracking-wide uppercase">
								Plataforma de Verificación Oficial
							</span>
						</div>

						{/* Headline */}
						<h1 className="text-4xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-[1.1] tracking-tight">
							Asegura el valor de tu <br className="hidden sm:block" />
							<span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary to-gold">
								certificación profesional.
							</span>
						</h1>

						{/* Description */}
						<p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							Valida la autenticidad de tus credenciales emitidas por{" "}
							<strong>CCAP GLOBAL</strong> y demuestra tu respaldo académico
							ante empresas e instituciones en todo el mundo.
						</p>

						{/* Verification Card */}
						<div className="relative max-w-3xl mx-auto mt-16 text-left">
							{/* Soft Glow Behind Card */}
							<div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-primary/10 to-gold/20 rounded-[2.5rem] blur-xl opacity-70"></div>

							<div className="relative bg-card rounded-[2rem] border border-border/50 shadow-2xl overflow-hidden p-6 sm:p-10 z-10">
								<div className="mb-8 text-center sm:text-left">
									<h3 className="text-2xl font-bold text-foreground mb-3">
										Verificación Rápida
									</h3>
									<p className="text-muted-foreground">
										Ingresa el código alfanumérico único de tu certificado o el número de DNI del participante para consultar los certificados asociados.
									</p>
								</div>

								{/* Input Field Area */}
								<div className="bg-background/60 border border-border rounded-2xl p-2.5 sm:p-3 flex flex-col sm:flex-row items-center gap-3 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all shadow-inner">
									<div className="hidden sm:flex pl-4 text-muted-foreground shrink-0">
										<Search className="w-6 h-6 text-primary" />
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
										className="w-full sm:w-auto bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 shrink-0 flex items-center justify-center gap-2">
										<Search className="w-5 h-5 sm:hidden" />
										Consultar
									</button>
								</div>

								{/* Helpful Tips or Footer Hint */}
								<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex items-start gap-4">
										<div className="mt-0.5 bg-background p-2 rounded-lg shadow-sm border border-border/50 shrink-0">
											<Globe className="w-4 h-4 text-primary" />
										</div>
										<p className="text-xs text-muted-foreground font-medium leading-relaxed">
											Asegúrate de incluir los guiones al momento de transcribir
											tu código o ingresar los 8 dígitos de tu DNI.
										</p>
									</div>
									<div className="bg-gold/5 border border-gold/10 rounded-xl p-4 flex items-start gap-4">
										<div className="mt-0.5 bg-background p-2 rounded-lg shadow-sm border border-border/50 shrink-0">
											<Search className="w-4 h-4 text-gold" />
										</div>
										<p className="text-xs text-muted-foreground font-medium leading-relaxed">
											También puedes escanear directamente el{" "}
											<strong>código QR</strong> al reverso.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Preview del Certificado Section */}
			<section className="py-24 bg-muted/30 border-t border-border/50 relative z-10">
				<div className="container mx-auto px-4 lg:px-8">
					<div className="text-center mb-20 max-w-3xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
							Un Certificado a la Altura de tu{" "}
							<span className="text-transparent bg-clip-text bg-linear-to-r from-gold to-yellow-600">
								Esfuerzo
							</span>
						</h2>
						<p className="text-muted-foreground text-lg leading-relaxed">
							Nuestras credenciales están equipadas con rigurosos sistemas de
							comprobación y son auditadas permanentemente por los más altos
							estándares educativos y tecnológicos del país.
						</p>
					</div>

					{/* Cara Frontal */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
						{/* Image */}
						<div className="relative group perspective-1000">
							<div className="absolute -inset-2 bg-linear-to-tr from-primary/30 to-gold/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
							<div className="relative bg-card rounded-2xl border border-border/50 shadow-2xl overflow-hidden aspect-[1.414/1] transform transition-transform duration-700 hover:rotate-y-2 hover:rotate-x-2">
								<Image
									src={CertificadoFrontal}
									alt="Certificado CCAP Cara Frontal"
									fill
									className="object-cover hover:scale-105 transition-transform duration-1000"
								/>
							</div>
						</div>

						{/* Text Content */}
						<div className="space-y-8 relative z-20">
							<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm border border-primary/20">
								<Award className="w-4 h-4" /> Diseño Premium y Respaldo Oficial
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
									<li key={i} className="flex gap-4 items-start">
										<CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
										<div>
											<strong className="block text-foreground font-bold mb-1">
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
					</div>

					{/* Cara Trasera */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
						{/* Text Content */}
						<div className="order-2 lg:order-1 space-y-8 relative z-20">
							<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold font-bold text-sm border border-gold/20">
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
									<li key={i} className="flex gap-4 items-start">
										<CheckCircle2 className="w-6 h-6 text-gold shrink-0 mt-1" />
										<div>
											<strong className="block text-foreground font-bold mb-1">
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

						{/* Image */}
						<div className="relative group order-1 lg:order-2 perspective-1000">
							<div className="absolute -inset-2 bg-linear-to-tl from-gold/30 to-primary/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
							<div className="relative bg-card rounded-2xl border border-border/50 shadow-2xl overflow-hidden aspect-[1.414/1] transform transition-transform duration-700 hover:-rotate-y-2 hover:-rotate-x-2">
								<Image
									src={CertificadoTrasera}
									alt="Certificado CCAP Cara Trasera"
									fill
									className="object-cover hover:scale-105 transition-transform duration-1000"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
