import Image from "next/image";
import { QrCode as QrIcon } from "@/assets/images";
import { ShieldCheck, Globe, Lock, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";

const BENEFITS = [
	{
		icon: Globe,
		title: "Respaldo Internacional",
		description:
			"Avalados por los principales Colegios de Ingenieros y Arquitectos.",
		accent: "primary",
		iconBg: "bg-primary/10",
		iconColor: "text-primary",
	},
	{
		icon: Lock,
		title: "Tecnología Inmutable",
		description:
			"Firmas digitales encriptadas y registro seguro para evitar fraudes.",
		accent: "gold",
		iconBg: "bg-gold/10",
		iconColor: "text-gold",
	},
	{
		icon: Briefcase,
		title: "Potencial Laboral",
		description:
			"Agrega tu escudo directo a LinkedIn; el 85% de egresados mejora su sueldo.",
		accent: "gold",
		iconBg: "bg-gold/10",
		iconColor: "text-gold",
	},
];

export function HomeCertificates() {
	return (
		<section className="py-20 bg-muted/20 border-y border-border/50 relative overflow-hidden transition-colors">
			{/* Background Ambient Glow */}
			<div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

			<div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
					<div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
						<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold font-semibold text-xs border border-gold/20">
							<ShieldCheck className="w-3.5 h-3.5" />
							<span>VALIDACIÓN OFICIAL</span>
						</div>

						<h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight max-w-2xl">
							Valida la Autenticidad de tu{" "}
							<span className="text-gold">Certificación</span>
						</h2>

						<p className="text-muted-foreground text-sm md:text-base max-w-xl font-medium">
							Empresas y reclutadores confían en nuestros certificados. Accede a
							nuestro portal de verificación para validar instantáneamente tus
							habilidades usando tu código único o DNI.
						</p>

						<div className="pt-2">
							<Link
								href="/certificates"
								className="inline-flex bg-gold hover:bg-gold/90 text-gold-foreground px-8 py-3.5 rounded-xl font-semibold transition-all items-center gap-2 text-[15px] shadow-sm hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden group">
								<div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
								<span className="relative">Ir al Portal de Verificación</span>
								<ArrowRight className="w-5 h-5 relative" />
							</Link>
						</div>
					</div>

					<div className="w-full md:w-auto flex justify-center md:justify-end mt-8 md:mt-0">
						<Link
							href="/certificates"
							className="group relative bg-card p-6 md:p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-xl hover:border-gold/30 transition-all duration-500 flex flex-col items-center gap-5 w-full sm:w-80 max-w-sm shrink-0">
							<div className="absolute inset-0 bg-linear-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

							<div className="relative bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-100 group-hover:scale-105 transition-transform duration-500 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 flex items-center justify-center">
								<Image
									src={QrIcon}
									alt="QR Code"
									width={200}
									height={200}
									className="object-contain w-full h-full p-2"
								/>
							</div>

							<div className="text-center relative z-10 w-full">
								<p className="text-base sm:text-lg font-bold text-foreground group-hover:text-gold transition-colors">
									Escanear el Código QR
								</p>
								<p className="text-xs sm:text-sm text-muted-foreground mt-1">
									Acceso seguro con un toque
								</p>
							</div>
						</Link>
					</div>
				</div>

				{/* Benefits Cards Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{BENEFITS.map((benefit, index) => {
						return (
							<div
								key={index}
								className="group bg-card p-6 rounded-2xl flex flex-col items-start gap-4 transition-all duration-300 border border-border/50 shadow-sm hover:shadow-md hover:border-border hover:-translate-y-0.5">
								<div
									className={`w-12 h-12 ${benefit.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
									<benefit.icon className={`w-5 h-5 ${benefit.iconColor}`} />
								</div>
								<div>
									<h3 className="text-[17px] font-bold text-foreground mb-1.5">
										{benefit.title}
									</h3>
									<p className="text-[14px] text-muted-foreground font-medium leading-relaxed">
										{benefit.description}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
