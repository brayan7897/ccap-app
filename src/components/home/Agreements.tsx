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
		color: "text-gold",
        bgColor: "bg-gold/10",
        accentColor: "bg-gold",
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
		color: "text-gold",
        bgColor: "bg-gold/10",
        accentColor: "bg-gold",
	},
];

export function Agreements() {
	return (
		<div className="w-full relative py-4 flex justify-center">
			<div className="w-full relative z-0">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                    {AGREEMENTS.map((partner) => (
                        <div 
                            key={partner.name}
                            className="group relative flex flex-col p-6 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-xl hover:border-gold/30 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover background */}
                            <div className="absolute inset-0 bg-linear-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                            {/* Hover accent line */}
                            <div className={`absolute top-0 left-0 w-full h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${partner.accentColor}`} />

                            {/* Large Logo Block */}
                            <div className="relative w-full h-14 sm:h-16 mb-5 flex items-center justify-start z-10">
                                <Image
                                    src={partner.logo}
                                    alt={`Logo de ${partner.name} — convenio institucional con CCAP Global para cursos online certificados`}
                                    fill
                                    className="object-contain object-left filter brightness-0 dark:invert opacity-70 group-hover:opacity-100 transition-all duration-300 drop-shadow-sm group-hover:scale-105"
                                />
                            </div>

                            {/* Content */}
                            <div className="z-10 flex flex-col grow">
                                <h3 className="text-[17px] font-extrabold text-foreground mb-2 transition-colors duration-300">
                                    {partner.name}
                                </h3>
                                <p className="text-[13px] text-muted-foreground grow mb-5 font-medium leading-relaxed">
                                    {partner.description}
                                </p>

                                {/* Footer / Meta */}
                                <div className="flex items-center justify-start mt-auto border-t border-border/40 pt-4">
                                    <span className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold leading-none ${partner.bgColor} ${partner.color} border border-${partner.accentColor}/20`}>
                                        {partner.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
			</div>
		</div>
	);
}
