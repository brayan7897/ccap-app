import Image from "next/image";
import { agreementsLogos } from "@/assets";
import { ArrowRight } from "lucide-react";

const AGREEMENTS = [
	{
		name: "Cámara de Comercio",
		description: "Respaldo institucional y acceso a red de contactos empresariales a nivel regional.",
        logo: agreementsLogos.camara_comercio_huanuco,
        category: "Institucional",
		color: "text-blue-500 dark:text-blue-400",
        bgColor: "bg-blue-500/5 dark:bg-blue-500/10",
        accentColor: "bg-blue-500",
	},
	{
		name: "Grupo Rivaes",
		description: "Desarrollo de proyectos de ingeniería y certificación de competencias técnicas.",
        logo: agreementsLogos.g_rivaes,
        category: "Ingeniería",
		color: "text-amber-500 dark:text-amber-400",
        bgColor: "bg-amber-500/5 dark:bg-amber-500/10",
        accentColor: "bg-amber-500",
	},
	{
		name: "Grupo Inrisa",
		description: "Asociación estratégica para prácticas profesionales en el sector industrial.",
        logo: agreementsLogos.g_inrisa,
        category: "Industrial",
		color: "text-emerald-500 dark:text-emerald-400",
        bgColor: "bg-emerald-500/5 dark:bg-emerald-500/10",
        accentColor: "bg-emerald-500",
	},
	{
		name: "INVESTIGEP",
		description: "Apoyo conjunto en investigación y gestión de proyectos metodológicos.",
        logo: agreementsLogos.investigep,
        category: "Investigación",
		color: "text-purple-500 dark:text-purple-400",
        bgColor: "bg-purple-500/5 dark:bg-purple-500/10",
        accentColor: "bg-purple-500",
	},
];

export function Agreements() {
	return (
		<div className="w-full relative py-8 px-4 flex justify-center">
			
			<div className="w-full max-w-7xl relative z-10">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {AGREEMENTS.map((partner) => (
                        <div 
                            key={partner.name}
                            className="group relative flex flex-col p-6 rounded-2xl bg-card border border-border/50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_-5px_rgba(0,0,0,0.2)] hover:shadow-xl dark:hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        >
                            {/* Hover accent line */}
                            <div className={`absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${partner.accentColor}`} />

                            {/* Large Logo Block */}
                            <div className="relative w-full h-16 sm:h-20 mb-6 flex items-center justify-start">
                                <Image
                                    src={partner.logo}
                                    alt={`Logo de ${partner.name}`}
                                    fill
                                    className="object-contain object-left filter brightness-0 dark:invert opacity-70 group-hover:opacity-100 transition-all duration-300 drop-shadow-xs"
                                />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-foreground mb-3 transition-colors duration-300">
                                {partner.name}
                            </h3>
                            <p className="text-sm text-muted-foreground grow mb-8 leading-relaxed">
                                {partner.description}
                            </p>

                            {/* Footer / Meta (Category with theme color, no arrow) */}
                            <div className="flex items-center justify-start mt-auto border-t border-border/40 pt-5">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold leading-none ${partner.bgColor} ${partner.color}`}>
                                    {partner.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
			</div>
		</div>
	);
}
