import Image from "next/image";
import { agreementsLogos } from "@/assets";

const AGREEMENTS = [
	{
		name: "Cámara de Comercio e Industrias de Huánuco",
		logo: agreementsLogos.camara_comercio_huanuco,
	},
	{
		name: "Grupo Rivaes",
		logo: agreementsLogos.g_rivaes,
	},
	{
		name: "Grupo Inrisa",
		logo: agreementsLogos.g_inrisa,
	},
	{
		name: "INVESTIGEP",
		logo: agreementsLogos.investigep,
	},
];

export function Agreements() {
	return (
		<div className="w-full relative">


			{/* Unified Premium Banner */}
			<div className="group/agreements flex flex-col md:flex-row items-stretch justify-between w-full rounded-2xl md:rounded-[2rem] bg-card/60 backdrop-blur-xl border border-border/60 shadow-xl shadow-black/5 dark:shadow-black/20 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-border/40 transition-colors duration-500">
				{AGREEMENTS.map((partner) => (
					<div 
						key={partner.name} 
						className="group/card relative flex-1 flex flex-col items-center justify-center gap-5 p-8 md:p-10 transition-all duration-500 hover:bg-muted/30"
					>
						{/* Logo Container - Solid black (light) / Solid white (dark), with primary drop-shadow on focus */}
						<div className="relative h-16 w-32 md:h-20 md:w-40 flex items-center justify-center transition-all duration-500 
							opacity-60 dark:opacity-50 
							group-hover/agreements:opacity-30 dark:group-hover/agreements:opacity-20 
							group-hover/card:opacity-100! group-hover/card:scale-110"
						>
							<Image
								src={partner.logo}
								alt={`${partner.name} logo`}
								fill
								className="object-contain brightness-0 dark:invert transition-all duration-500"
							/>
						</div>
						
						{/* Partner Name - Subtle styling, sharper and scales up on focus */}
						<span className="text-[13px] md:text-sm font-semibold text-muted-foreground transition-all duration-500 
							group-hover/card:text-foreground group-hover/card:scale-105 transform-gpu max-w-[180px] leading-snug text-center inline-block"
						>
							{partner.name}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
