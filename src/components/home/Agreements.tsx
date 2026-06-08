import Image from "next/image";
import { agreementsLogos } from "@/assets";

const AGREEMENTS = [
	{
		name: "Cámara de Comercio",
		description: "Respaldo institucional y acceso a red de contactos empresariales a nivel regional.",
        logo: agreementsLogos.camara_comercio_huanuco,
        category: "Institucional",
		color: "text-primary",
        bgColor: "bg-primary/10",
        accentColor: "bg-primary",
	},
	{
		name: "Grupo Rivaes",
		description: "Desarrollo de proyectos de ingeniería y certificación de competencias técnicas.",
        logo: agreementsLogos.g_rivaes,
        category: "Ingeniería",
		color: "text-secondary",
        bgColor: "bg-secondary/10",
        accentColor: "bg-secondary",
	},
	{
		name: "Grupo Inrisa",
		description: "Asociación estratégica para prácticas profesionales en el sector industrial.",
        logo: agreementsLogos.g_inrisa,
        category: "Industrial",
		color: "text-primary",
        bgColor: "bg-primary/10",
        accentColor: "bg-primary",
	},
	{
		name: "INVESTIGEP",
		description: "Apoyo conjunto en investigación y gestión de proyectos metodológicos.",
        logo: agreementsLogos.investigep,
        category: "Investigación",
		color: "text-secondary",
        bgColor: "bg-secondary/10",
        accentColor: "bg-secondary",
	},
];

export function Agreements() {
	return (
		<div className="w-full relative py-2 flex justify-center">
			<div className="w-full max-w-6xl relative z-0">
				<div className="bg-card text-card-foreground border border-border/80 hover:border-secondary/50 shadow-md rounded-2xl md:rounded-3xl p-6 md:p-8 flex overflow-x-auto md:flex-nowrap justify-start md:justify-evenly items-center gap-8 md:gap-4 transition-all duration-300 hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(234,179,8,0.15)] snap-x snap-mandatory hide-scrollbar">
                    {AGREEMENTS.map((partner) => (
                        <div
                            key={partner.name}
                            className="relative w-40 h-20 sm:w-48 sm:h-24 flex shrink-0 items-center justify-center group snap-center"
                            title={partner.name}
                        >
                            <Image
                                src={partner.logo}
                                alt={`Logo de ${partner.name}`}
                                fill
                                className="object-contain filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 dark:brightness-0 dark:invert dark:opacity-80 dark:group-hover:opacity-100 transition-all duration-300"
                            />
                        </div>
                    ))}
                </div>
			</div>
		</div>
	);
}
