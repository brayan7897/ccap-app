"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { clientsLogos } from "@/assets";

const CLIENTS = [
	{
		name: "Nova Sistem",
		logo: clientsLogos.nova_sistem,
	},
	{
		name: "Universidad Nacional de Huancavelica",
		logo: clientsLogos.u_n_huacavelica,
	},
	{
		name: "UNDAR",
		logo: clientsLogos.undar,
	},
	{
		name: "UNHEVAL",
		logo: clientsLogos.unheval,
	},
];

export function Clients() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	useEffect(() => {
		if (isPaused) return;

		const interval = setInterval(() => {
			setActiveIndex((current) => (current + 1) % CLIENTS.length);
		}, 2500); // 2.5s interval

		return () => clearInterval(interval);
	}, [isPaused]);

	return (
		<div className="w-full flex flex-col items-center justify-center gap-6 md:gap-8 px-4 py-4">
			<div className="text-center">
				<p className="text-lg md:text-xl font-bold text-foreground/90 leading-snug">
					Instituciones que <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Confían en Nosotros</span>
				</p>
			</div>

			<div className="w-full relative flex-1">
				{/* Fade Gradients matching hero context */}
				<div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
				<div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

				<div className="flex items-center p-2 justify-center gap-12 md:gap-20 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full">
					{CLIENTS.map((client, index) => (
						<div 
							key={client.name} 
							className={`flex flex-col items-center justify-center gap-2 shrink-0 transition-opacity duration-500 cursor-pointer ${
								activeIndex === index ? "opacity-100" : "opacity-50"
							}`}
							onMouseEnter={() => {
								setIsPaused(true);
								setActiveIndex(index);
							}}
							onMouseLeave={() => {
								setIsPaused(false);
							}}
						>
							<div className="relative h-16 w-36 md:h-20 md:w-44 flex items-center justify-center">
								<div className={`relative w-full h-full transition-all duration-500 ease-out dark:brightness-0 dark:invert ${
									activeIndex === index 
										? "scale-110 grayscale-0" 
										: "scale-95 grayscale"
								}`}>
									<Image
										src={client.logo}
										alt={`Logo de ${client.name} — institución que confía en los cursos online de CCAP Global`}
										fill
										className="object-contain"
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
