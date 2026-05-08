import type { Metadata } from "next";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const metadata: Metadata = {
	title: "Contáctanos — CCAP",
	description:
		"Comunícate con CCAP - Centro de Capacitación y Perfeccionamiento Profesional. Estamos listos para resolver tus consultas.",
};

export default function ContactPage() {
	return (
		<div className="min-h-screen pt-32 pb-20">
			<div className="container mx-auto px-4 lg:px-8 max-w-6xl">
				<div className="text-center mb-16 max-w-2xl mx-auto">
					<h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
						Contáctanos
					</h1>
					<p className="text-muted-foreground text-base md:text-lg">
						Estamos aquí para resolver tus dudas y brindarte la mejor asistencia
						en tu formación profesional.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Información de contacto */}
					<div className="flex flex-col space-y-8">
						<div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
							<h3 className="text-2xl font-bold mb-6 text-foreground">
								Información de Contacto
							</h3>

							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
										<Phone className="w-5 h-5 text-primary" />
									</div>
									<div>
										<h4 className="font-semibold text-foreground">WhatsApp</h4>
										<p className="text-muted-foreground text-sm mt-1 mb-2">
											Escríbenos directamente o llámanos.
										</p>
										<a
											href="https://wa.me/51905517549"
											target="_blank"
											rel="noreferrer"
											className="font-bold text-primary hover:text-primary/80 transition-colors">
											+51 905 517 549
										</a>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
										<Mail className="w-5 h-5 text-primary" />
									</div>
									<div>
										<h4 className="font-semibold text-foreground">Email</h4>
										<p className="text-muted-foreground text-sm mt-1 mb-2">
											Envíanos un correo con tus consultas.
										</p>
										<a
											href="mailto:atencionalcliente.ccapglobal@gmail.com"
											className="font-bold text-primary hover:text-primary/80 transition-colors">
											atencionalcliente.ccapglobal@gmail.com
										</a>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
										<MapPin className="w-5 h-5 text-primary" />
									</div>
									<div>
										<h4 className="font-semibold text-foreground">
											Nuestra Institución
										</h4>
										<p className="text-muted-foreground text-sm mt-1">
											CCAP - Centro de Capacitación y Perfeccionamiento
											Profesional.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Formulario de contacto */}
					<div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
						<h3 className="text-2xl font-bold mb-6 text-foreground">
							Envíanos un mensaje
						</h3>
						<form className="space-y-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="space-y-2">
									<label className="text-sm font-semibold">Nombres</label>
									<input
										type="text"
										className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
										placeholder="Tu nombre"
									/>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-semibold">Apellidos</label>
									<input
										type="text"
										className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
										placeholder="Tu apellido"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-semibold">
									Correo Electrónico
								</label>
								<input
									type="email"
									className="w-full h-11 px-4 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
									placeholder="ejemplo@correo.com"
								/>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-semibold">Mensaje</label>
								<textarea
									rows={4}
									className="w-full p-4 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
									placeholder="¿En qué podemos ayudarte?"></textarea>
							</div>

							<button
								type="button"
								className="w-full h-12 mt-4 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
								<Send className="w-4 h-4" />
								Enviar Mensaje
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
