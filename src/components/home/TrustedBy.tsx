import Image from "next/image";

const PARTNERS = [
	{
		name: "Colegio de Ingenieros del Perú",
		logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Logo_CIP_Consejo_Nacional.png",
	},
	{
		name: "Colegio de Arquitectos del Perú",
		logo: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Logo_Colegio_Arquitectos_Per%C3%BA.png",
	},
	{
		name: "Universidad Nacional de Ingeniería",
		logo: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Uni-logo_transparente_granate.png",
	},
	{
		name: "SENCICO",
		logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Logo_de_Sencico.png", // Usando un placeholder válido que será invertido a blanco/negro
	},
	{
		name: "PUCP",
		logo: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Logo-Centrum.png",
	},
];

export function TrustedBy() {
	return (
		<section className="relative z-10 w-full bg-muted/30 dark:bg-muted/10 py-8 md:py-10 border-y border-border overflow-hidden">
			<div className="container mx-auto px-4 text-center mb-8">
				<p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-primary inline-block">
					convenios y empresas aliadas
				</p>
			</div>

			{/* Scrollable Container for logos */}
			<div className="w-full relative">
				{/* Left and Right Fade Gradients for smooth scroll edges */}
				<div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-linear-to-r from-background to-transparent z-10 pointer-events-none opacity-50 dark:opacity-20" />
				<div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-linear-to-l from-background to-transparent z-10 pointer-events-none opacity-50 dark:opacity-20" />

				<div className="flex items-center p-2 justify-start md:justify-center gap-10 md:gap-16 overflow-x-auto px-8 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full max-w-6xl mx-auto">
					{PARTNERS.map((partner) => (
						<div key={partner.name} className="flex flex-col items-center justify-center gap-3 shrink-0 group">
							{/* Logos: In light mode they are grayscale and get color on hover. In dark mode they invert to pure white and get 100% opacity on hover. */}
							<div className="relative h-10 w-16 md:h-20 md:w-24 opacity-60 grayscale dark:grayscale-0 dark:brightness-0 dark:invert transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0">
								<Image
									src={partner.logo}
									alt={`${partner.name} logo`}
									fill
									className="object-contain drop-shadow-xs"
								/>
							</div>
							<span className="text-[10px] md:text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors max-w-[140px] text-center leading-tight">
								{partner.name}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
