import { Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export function GlobalNetwork() {
	return (
		<div className="h-full flex flex-col justify-between">
			<div>
				<div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
					<Globe className="w-6 h-6 text-blue-600" />
				</div>
				<h3 className="text-[17px] font-bold text-slate-800 mb-2">
					Red Global de Ingenieros
				</h3>
				<p className="text-[14px] text-slate-500 font-medium leading-relaxed">
					Accede a una red internacional de profesionales. Comparte experiencias, 
					oportunidades laborales y proyectos.
				</p>
			</div>

			<div className="mt-8">
				<Link 
					href="/community" 
					className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors text-[13px] font-semibold"
				>
					Explorar Mapa <ArrowRight className="w-3.5 h-3.5" />
				</Link>
			</div>
			
			{/* Decorative faint globe */}
			<div className="absolute -right-6 top-8 opacity-[0.03] pointer-events-none text-slate-900">
				<Globe strokeWidth={1} className="w-48 h-48" />
			</div>
		</div>
	);
}
