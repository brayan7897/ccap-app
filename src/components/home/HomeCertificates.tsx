import Image from "next/image";
import { QrCode as QrIcon } from "@/assets/images";
import certificadoLanding from "@/assets/images/certificados/certificado-lading.webp";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const BENEFITS = [
	"Certificación digital con QR verificable",
	"Respaldo académico y validez a Nivel Nacional",
	"Mejora tu perfil profesional y destaca en el mercado laboral",
	"Proceso rápido, seguro y 100% verificable"
];

export function HomeCertificates() {
	return (
		<section className="py-20 bg-primary relative overflow-hidden transition-colors border-y border-border/10">
			{/* Background Ambient Glow */}
			<div className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-100 lg:h-100 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

			<div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Left: Certificate Image */}
					<ScrollReveal animation="fade-in-right" duration={800} threshold={0.15}>
						<div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 group border border-white/10">
							<Image
								src={certificadoLanding}
								alt="Certificado CCAP Global"
								fill
								placeholder="blur"
								className="object-contain object-center scale-100 group-hover:scale-105 transition-transform duration-700 p-4 bg-primary/50"
								sizes="(max-width: 1024px) 100vw, 50vw"
							/>
						</div>
					</ScrollReveal>

					{/* Right: Content */}
					<ScrollReveal animation="fade-in-left" duration={800} threshold={0.15} delay={100}>
						<div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
							
							{/* Title & Badge */}
							<div className="space-y-4">
								<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary font-semibold text-xs border border-secondary/20">
									<ShieldCheck className="w-3.5 h-3.5" />
									<span>VALIDACIÓN OFICIAL</span>
								</div>

								<h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
									Certificación con <br className="hidden lg:block"/>
									<span className="text-secondary">Respaldo Académico</span>
								</h2>
							</div>

							{/* Benefits List */}
							<ul className="space-y-5 text-left w-full max-w-md">
								{BENEFITS.map((text, i) => (
									<li key={i} className="flex items-start gap-3">
										<CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
										<span className="text-white/90 font-medium leading-relaxed">{text}</span>
									</li>
								))}
							</ul>

							{/* CTA Section */}
							<div className="pt-6 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
								<Link
									href="/certificates"
									className="group relative bg-white/5 hover:bg-white/10 p-3 rounded-2xl border border-white/10 shadow-sm hover:shadow-md hover:border-secondary/30 transition-all flex items-center gap-4 shrink-0">
									<div className="bg-white p-1.5 rounded-xl">
										<Image src={QrIcon} alt="QR Code" width={48} height={48} className="object-contain" />
									</div>
									<div className="text-left hidden sm:block pr-4">
										<p className="font-bold text-white text-sm group-hover:text-secondary transition-colors">Validar QR</p>
										<p className="text-[11px] text-white/60">Acceso seguro</p>
									</div>
								</Link>

								<Link
									href="/certificates"
									className="inline-flex bg-secondary hover:bg-secondary/90 text-primary px-8 py-4 rounded-2xl font-bold transition-all items-center justify-center gap-2 text-base shadow-sm hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden group w-full sm:w-auto">
									<span className="relative z-10">Ir al Portal de Verificación</span>
									<ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
								</Link>
							</div>

						</div>
					</ScrollReveal>
				</div>
			</div>
		</section>
	);
}
