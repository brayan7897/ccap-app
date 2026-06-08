import { Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export function GlobalNetwork() {
	return (
		<div className="h-full flex flex-col justify-between">
			<div>
				<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
					<Globe className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
				</div>
				<h3 className="text-[15px] sm:text-[17px] font-bold text-foreground mb-2">
					Red Global de Ingenieros
				</h3>
				<p className="text-[13px] sm:text-[14px] text-muted-foreground font-medium leading-relaxed">
					Accede a una red internacional de profesionales. Comparte experiencias, 
					oportunidades laborales y proyectos.
				</p>
			</div>

			<div className="mt-8">
				<Link 
					href="/community" 
					className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-[13px] font-semibold"
				>
					Explorar Mapa <ArrowRight className="w-3.5 h-3.5" />
				</Link>
			</div>
			
			{/* Decorative faint globe */}
			<div className="absolute -right-6 top-8 opacity-[0.03] pointer-events-none text-foreground">
				<Globe strokeWidth={1} className="w-32 h-32 sm:w-48 sm:h-48" />
			</div>
		</div>
	);
}
