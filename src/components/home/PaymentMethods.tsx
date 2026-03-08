import Image from "next/image";
import { CreditCard, ShieldCheck } from "lucide-react";
import { paymentMethodLogos } from "@/assets";

export const PaymentMethods = () => {
	const methods = [
		{ 
			name: "BCP", 
			icon: paymentMethodLogos.logo_bcp,
			brandGlow: "bg-blue-500/20",
			shadow: "group-hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.3)]",
			borderColor: "group-hover:border-blue-500/30",
		},
		{ 
			name: "BBVA", 
			icon: paymentMethodLogos.logo_bbva,
			brandGlow: "bg-indigo-500/20",
			shadow: "group-hover:shadow-[0_10px_40px_-10px_rgba(99,102,241,0.3)]",
			borderColor: "group-hover:border-indigo-500/30",
		},
		{ 
			name: "Banco de la Nación", 
			icon: paymentMethodLogos.logo_banco_nacion,
			brandGlow: "bg-red-500/20",
			shadow: "group-hover:shadow-[0_10px_40px_-10px_rgba(239,68,68,0.3)]",
			borderColor: "group-hover:border-red-500/30",
		},
		{ 
			name: "Yape", 
			icon: paymentMethodLogos.logo_yape,
			brandGlow: "bg-purple-500/20",
			shadow: "group-hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.3)]",
			borderColor: "group-hover:border-purple-500/30",
		},
	];

	return (
		<section className="py-24 relative bg-transparent z-20 overflow-hidden">
			{/* Subtle decorative background line */}
			<div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent opacity-50" />

			<div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
				
				{/* Section Header */}
				<div className="flex flex-col items-center text-center space-y-4 mb-16">
					<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
						<CreditCard className="w-4 h-4" />
						<span>Proceso de pago fácil y seguro</span>
					</div>

					<h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight max-w-3xl">
						Múltiples <span className="text-primary">Métodos de Pago</span>
					</h2>

					<p className="text-muted-foreground text-sm md:text-base max-w-2xl font-medium">
						Facilitamos tu inscripción. Paga de forma segura y rápida a través de las entidades financieras más reconocidas del país.
					</p>
				</div>

				{/* Innovative Separate Cards Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{methods.map((method) => (
						<div
							key={method.name}
							className={`group relative rounded-3xl bg-card border border-border/50 p-8 flex flex-col items-center justify-center gap-6 transition-all duration-500 hover:-translate-y-2 z-10 overflow-hidden ${method.shadow} ${method.borderColor}`}
						>
							{/* Dynamic Brand Glow inside the card (Blurred absolute div) */}
							<div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[50px] opacity-0 transition-opacity duration-700 group-hover:opacity-100 -z-10 ${method.brandGlow}`} />
							
							{/* Logo Container */}
							<div className="relative w-32 h-16 md:w-36 md:h-20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 z-10">
								<Image
									src={method.icon}
									alt={`Logo de ${method.name}`}
									fill
									className="object-contain brightness-0 dark:invert opacity-60 dark:opacity-50 transition-all duration-500 group-hover:opacity-100!"
								/>
							</div>
							
							{/* Payment Method Name */}
							<span className="text-sm font-semibold text-muted-foreground transition-colors duration-500 group-hover:text-foreground z-10">
								{method.name}
							</span>
						</div>
					))}
				</div>
				
				{/* Trust Badge */}
				<div className="mt-16 flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground bg-green-500/5 px-6 py-3 rounded-full w-fit mx-auto border border-green-500/10">
					<ShieldCheck className="w-5 h-5 text-green-500" />
					<span>Todas las transacciones están encriptadas y aseguradas</span>
				</div>

			</div>
		</section>
	);
};
