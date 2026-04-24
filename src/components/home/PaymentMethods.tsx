import Image from "next/image";
import { CreditCard, ShieldCheck, Mail } from "lucide-react";
import { paymentMethodLogos } from "@/assets";

export const PaymentMethods = () => {
	const methods = [
		{ 
			name: "BCP", 
			description: "Transferencias y depósitos directos con validación rápida.",
			icon: paymentMethodLogos.logo_bcp,
			brandGlow: "bg-primary/20",
			shadow: "group-hover:shadow-xl group-hover:shadow-primary/10",
			borderColor: "group-hover:border-primary/30",
			textColor: "text-primary",
		},
		{ 
			name: "BBVA", 
			description: "Pagos a través de banca por internet, app móvil o ventanilla.",
			icon: paymentMethodLogos.logo_bbva,
			brandGlow: "bg-gold/20",
			shadow: "group-hover:shadow-xl group-hover:shadow-gold/10",
			borderColor: "group-hover:border-gold/30",
			textColor: "text-gold",
		},
		{ 
			name: "Banco de la Nación", 
			description: "Ampliamente disponible en agentes y sucursales a nivel nacional.",
			icon: paymentMethodLogos.logo_banco_nacion,
			brandGlow: "bg-primary/20",
			shadow: "group-hover:shadow-xl group-hover:shadow-primary/10",
			borderColor: "group-hover:border-primary/30",
			textColor: "text-primary",
		},
		{ 
			name: "Yape", 
			description: "Pago instantáneo y sin comisiones escaneando nuestro código QR.",
			icon: paymentMethodLogos.logo_yape,
			brandGlow: "bg-gold/20",
			shadow: "group-hover:shadow-xl group-hover:shadow-gold/10",
			borderColor: "group-hover:border-gold/30",
			textColor: "text-gold",
		},
	];

	return (
		<section className="py-24 relative bg-transparent z-20 overflow-hidden">
			{/* Subtle decorative background line */}
			<div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent opacity-50" />

			<div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
				
				{/* Section Header */}
				<div className="flex flex-col items-center text-center space-y-4 mb-16">
					<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-semibold border border-gold/20">
						<CreditCard className="w-4 h-4" />
						<span>TRANSPARENCIA TOTAL</span>
					</div>

					<h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight max-w-3xl">
						Diversos <span className="text-gold">Métodos de Pago</span>
					</h2>

					<p className="text-muted-foreground text-sm md:text-base max-w-2xl font-medium">
						Tu educación es una prioridad. Facilitamos tu inscripción permitiendo abonos mediante las entidades financieras más confiables del país.
					</p>
				</div>

				{/* Innovative Separate Cards Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{methods.map((method) => (
						<div
							key={method.name}
							className={`group relative rounded-3xl bg-card border border-border/50 p-6 xl:p-8 flex flex-col items-center text-center gap-4 transition-all duration-500 hover:-translate-y-2 z-10 overflow-hidden ${method.shadow} ${method.borderColor}`}
						>
							{/* Dynamic Brand Glow inside the card (Blurred absolute div) */}
							<div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] rounded-full blur-[60px] opacity-0 transition-opacity duration-700 group-hover:opacity-100 -z-10 ${method.brandGlow}`} />
							
							{/* Logo Container */}
							<div className="relative w-24 h-12 md:w-32 md:h-16 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 z-10 mb-2">
								<Image
									src={method.icon}
									alt={`${method.name} — método de pago aceptado para cursos online en CCAP Global Perú`}
									fill
									className="object-contain brightness-0 dark:invert opacity-60 transition-all duration-500 group-hover:opacity-100"
								/>
							</div>
							
							{/* Details */}
							<div className="z-10 flex flex-col grow">
								<h3 className={`text-base font-bold text-foreground transition-colors duration-500 group-hover:${method.textColor} mb-2`}>
									{method.name}
								</h3>
								<p className="text-xs text-muted-foreground font-medium leading-relaxed group-hover:text-foreground/80 transition-colors duration-500">
									{method.description}
								</p>
							</div>
						</div>
					))}
				</div>
				
				{/* Footer Options & Trust Badge */}
				<div className="mt-16 flex flex-col items-center gap-8">
					<div className="flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground bg-green-500/5 px-6 py-3 rounded-full w-fit max-w-full text-center border border-green-500/10 shadow-sm">
						<ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
						<span>Transacciones verificadas, encriptadas y 100% aseguradas</span>
					</div>

					<div className="flex flex-col items-center gap-3">
						<span className="text-sm font-medium text-muted-foreground">¿Tienes problemas con el pago o un método diferente?</span>
						<a 
							href="/contact" 
							className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-card hover:bg-muted border border-border hover:border-border/80 text-foreground font-semibold shadow-sm hover:shadow-md transition-all group"
						>
							<Mail className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors" />
							Contáctanos
						</a>
					</div>
				</div>

			</div>
		</section>
	);
};
