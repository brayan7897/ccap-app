import { ShieldCheck } from "lucide-react";
import { Agreements } from "./Agreements";

export function TrustedBy() {
	return (
		<section className="py-12 relative w-full bg-muted/20 border-y border-border/50 overflow-hidden transition-colors">
			<div className="container mx-auto px-4 lg:px-8 max-w-7xl">
				
				{/* Section Header */}
				<div className="flex flex-col items-center text-center mb-8 space-y-4">
					<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold font-semibold text-xs border border-gold/20">
						<ShieldCheck className="w-3.5 h-3.5" />
						<span>Respaldo y Validación</span>
					</div>

					<h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight max-w-3xl">
						Nuestros <span className="text-gold">Convenios Institucionales</span>
					</h2>
				</div>

				{/* Cards Grid layout */}
				<div className="w-full">
					<Agreements />
				</div>
			</div>
		</section>
	);
}
