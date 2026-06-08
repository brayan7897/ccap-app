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
		<section className="pt-20 pb-20 relative bg-primary z-20 overflow-hidden">
			<div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
				
				<div className="flex flex-col items-center text-center mb-10">
					<h2 className="text-xl md:text-2xl font-black text-white tracking-wider uppercase">
						Medios de Pago
					</h2>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
					{methods.map((method) => (
						<div
							key={method.name}
							className="bg-white rounded-xl py-4 px-4 md:px-8 flex items-center justify-center shadow-sm hover:shadow-lg transition-shadow"
						>
							<div className="relative w-20 h-8 sm:w-24 sm:h-10 md:w-32 md:h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
								<Image
									src={method.icon}
									alt={`${method.name}`}
									fill
									className="object-contain"
								/>
							</div>
						</div>
					))}
				</div>

			</div>
		</section>
	);
};
