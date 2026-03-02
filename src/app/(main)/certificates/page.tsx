import { ShieldCheck, Search, Globe, Lock, Briefcase } from "lucide-react";

export default function CertificatesPage() {
	return (
		<div className="min-h-screen">
			{/* Hero Verifier Section */}
			<section className="relative pt-24 pb-32 overflow-hidden border-b border-border">
				{/* Background Gradients */}
				<div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
				<div className="absolute bottom-[-10%] left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

				<div className="container mx-auto px-4 lg:px-8 relative z-10">
					<div className="max-w-3xl mx-auto text-center space-y-8">
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-sm">
							<ShieldCheck className="w-5 h-5" />
							Verificación Oficial de Certificados
						</div>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight transition-colors">
							Asegura el valor de tu <br />{" "}
							<span className="text-primary">conocimiento.</span>
						</h1>

						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							Ingresa el código único ubicado en la parte inferior de tu
							certificado ccap para validar su autenticidad ante empresas e
							instituciones.
						</p>

						{/* Verification Input Box */}
						<div className="relative max-w-xl mx-auto mt-12 bg-card p-2 rounded-2xl border border-border shadow-2xl flex items-center focus-within:border-gold/50 transition-colors">
							<div className="pl-4 pr-2 text-muted-foreground">
								<Search className="w-6 h-6" />
							</div>
							<input
								type="text"
								placeholder="Ej. ccap-2026-A1X9B"
								className="flex-1 bg-transparent border-none outline-none text-foreground text-lg placeholder:text-muted-foreground uppercase"
							/>
							<button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-primary/25">
								Verificar
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="py-24">
				<div className="container mx-auto px-4 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl font-extrabold text-foreground transition-colors">
							El valor de certificarse con ccap
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						{/* Benefit 1 */}
						<div className="bg-card/50 border border-border rounded-2xl p-8 hover:bg-card transition-colors group">
							<div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
								<Globe className="w-7 h-7 text-primary" />
							</div>
							<h3 className="text-xl font-bold text-foreground mb-3 transition-colors">
								Respaldo Internacional
							</h3>
							<p className="text-muted-foreground leading-relaxed text-sm">
								Avalados por el Colegio de Ingenieros, Colegio de Arquitectos y
								principales firmas tecnológicas como Autodesk.
							</p>
						</div>

						{/* Benefit 2 */}
						<div className="bg-card/50 border border-border rounded-2xl p-8 hover:bg-card transition-colors group">
							<div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
								<Lock className="w-7 h-7 text-gold" />
							</div>
							<h3 className="text-xl font-bold text-foreground mb-3 transition-colors">
								Tecnología Inmutable
							</h3>
							<p className="text-muted-foreground leading-relaxed text-sm">
								Generados con firma digital encriptada para evitar
								falsificaciones, garantizando un registro permanente y seguro.
							</p>
						</div>

						{/* Benefit 3 */}
						<div className="bg-card/50 border border-border rounded-2xl p-8 hover:bg-card transition-colors group">
							<div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
								<Briefcase className="w-7 h-7 text-gold" />
							</div>
							<h3 className="text-xl font-bold text-foreground mb-3 transition-colors">
								Impacto Laboral
							</h3>
							<p className="text-muted-foreground leading-relaxed text-sm">
								Agrega tu credencial a LinkedIn con un clic. El 85% de nuestros
								egresados mejora sus oportunidades profesionales.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
