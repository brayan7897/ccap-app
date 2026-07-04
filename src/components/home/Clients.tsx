"use client";

import Image from "next/image";
import { clientsLogos } from "@/assets";

const CLIENTS = [
	{ name: "Nova Sistem", logo: clientsLogos.nova_sistem },
	{ name: "Universidad Nacional de Huancavelica", logo: clientsLogos.u_n_huacavelica },
	{ name: "UNDAR", logo: clientsLogos.undar },
	{ name: "UNHEVAL", logo: clientsLogos.unheval },
];

export function Clients() {
	return (
		<div className="w-full relative z-20 px-4 sm:px-8 lg:px-12">
			<div className="w-full max-w-6xl mx-auto bg-card rounded-2xl md:rounded-[32px] border border-border/50 p-6 md:p-8 relative overflow-hidden group shadow-sm dark:shadow-xl">
				
				{/* Glow sutil */}
				<div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

				<div className="text-center mb-6 md:mb-8 relative z-10">
					<p className="text-sm md:text-base font-bold text-foreground/90 tracking-wide">
						Instituciones que confían en nosotros
					</p>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center relative z-10">
					{CLIENTS.map((client) => (
						<div
							key={client.name}
							className="flex items-center justify-center group/item"
						>
							<div
								className="
									relative h-14 w-32 md:h-20 md:w-40
									transition-all duration-300

									/* LIGHT MODE (default) */
									opacity-80

									/* DARK MODE */
									dark:grayscale dark:brightness-0 dark:invert dark:opacity-70

									/* HOVER GLOBAL */
									group-hover/item:opacity-100
									group-hover/item:scale-105
									dark:group-hover/item:invert-0
									dark:group-hover/item:brightness-100
									dark:group-hover/item:grayscale-0
								"
							>
								<Image
									src={client.logo}
									alt={`Logo de ${client.name}`}
									fill
									placeholder="blur"
									className="object-contain"
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}