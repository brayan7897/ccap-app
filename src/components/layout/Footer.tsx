import Link from "next/link";
import { Mail, Facebook, Instagram, Youtube, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const NAV_LINKS = [
	{ href: "/", label: "Inicio" },
	{ href: "/courses", label: "Cursos" },
	{ href: "/certificates", label: "Certificados" },
	{ href: "/about", label: "Nosotros" },
];

const LEGAL_LINKS = [
	{ href: "/faq", label: "Preguntas frecuentes" },
	{ href: "/terms", label: "Términos y condiciones" },
	{ href: "/privacy", label: "Política de privacidad" },
];

export function Footer() {
	return (
		<footer className="w-full bg-primary text-white/70 border-t border-white/10 transition-colors">
			<div className="container mx-auto px-4 lg:px-8 max-w-6xl">
				<div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 py-16">
					
					{/* Col 1: Logo & Socials */}
					<div className="flex flex-col space-y-6 w-full lg:w-1/4">
						<Link href="/" className="relative flex items-center h-14 lg:h-[72px] w-auto text-white">
							<Logo className="h-full hover:opacity-90 transition-opacity" variant="light" />
						</Link>
						<p className="text-sm leading-relaxed text-white/80">
							Impulsamos tu crecimiento profesional a través de programas de actualización de calidad.
						</p>
						<div className="flex items-center gap-4 pt-2">
							<a href="#" className="text-white/60 hover:text-white transition-colors">
								<Facebook className="w-5 h-5" />
							</a>
							<a href="#" className="text-white/60 hover:text-white transition-colors">
								<Instagram className="w-5 h-5" />
							</a>
							<a href="#" className="text-white/60 hover:text-white transition-colors">
								<Youtube className="w-5 h-5" />
							</a>
						</div>
					</div>

					{/* Col 2: Navigation */}
					<div className="w-full lg:w-1/4">
						<h4 className="text-white text-sm font-bold mb-6 tracking-wide uppercase">
							Navegación
						</h4>
						<ul className="space-y-3 text-sm">
							{NAV_LINKS.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="hover:text-white transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Col 3: Contact */}
					<div className="w-full lg:w-1/4">
						<h4 className="text-white text-sm font-bold mb-6 tracking-wide uppercase">
							Contáctanos
						</h4>
						<ul className="space-y-4 text-sm">
							<li className="flex items-center gap-3">
								<Mail className="w-4 h-4 text-white/60" />
								<a
									href="mailto:atencionalcliente.ccapglobal@gmail.com"
									className="hover:text-white transition-colors break-all">
									atencionalcliente.ccapglobal@gmail.com
								</a>
							</li>
							<li className="flex items-center gap-3">
								<Phone className="w-4 h-4 text-white/60" />
								<a
									href="tel:905517549"
									className="hover:text-white transition-colors">
									905 517 549
								</a>
							</li>
						</ul>
					</div>

					{/* Col 4: Legal */}
					<div className="w-full lg:w-1/4">
						<h4 className="text-white text-sm font-bold mb-6 tracking-wide uppercase">
							Legal
						</h4>
						<ul className="space-y-3 text-sm">
							{LEGAL_LINKS.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="hover:text-white transition-colors">
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

				</div>

				{/* Bottom bar */}
				<div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-center text-xs text-white/50 text-center">
					<p>© {new Date().getFullYear()} CCAP Global. Todos los derechos reservados.</p>
				</div>
			</div>
		</footer>
	);
}
