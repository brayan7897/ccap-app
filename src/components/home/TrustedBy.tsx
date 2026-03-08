import { ShieldCheck } from "lucide-react";
import { Agreements } from "./Agreements";

export function TrustedBy() {
	return (
		<section className="py-24 relative w-full bg-muted/20 border-y border-border/50 overflow-hidden transition-colors">
			<div className="container mx-auto px-4 lg:px-8 max-w-7xl">
				
				{/* Section Header */}
				<div className="flex flex-col items-center text-center mb-16 space-y-4">
					<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold font-semibold text-xs border border-gold/20">
						<ShieldCheck className="w-3.5 h-3.5" />
						<span>Respaldo y Validación</span>
					</div>

					<h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight max-w-3xl">
						Nuestros <span className="text-primary">Convenios Institucionales</span>
					</h2>

					<p className="text-muted-foreground text-sm md:text-base max-w-2xl font-medium">
						La solidez de tu formación está garantizada por alianzas estratégicas con las instituciones líderes del país.
					</p>
				</div>

				{/* Cards Grid layout */}
				<div className="w-full">
					<Agreements />
				</div>
			</div>
		</section>
	);
}
