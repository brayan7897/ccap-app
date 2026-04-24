"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Facebook, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const LEGAL_LINKS = [
	{ href: "/terms", label: "Términos y condiciones" },
	{ href: "/privacy", label: "Política de privacidad" },
];

const NAV_LINKS = [
	{ href: "/courses", label: "Cursos Online" },
	{ href: "/catalog", label: "Catálogo Completo" },
	{ href: "/certificates", label: "Verificar Certificado" },
	{ href: "/about", label: "Sobre Nosotros" },
];

export function Footer() {
	return (
		<footer className="w-full bg-muted/20 border-t border-border text-muted-foreground transition-colors">
			<div className="container mx-auto px-4 lg:px-8">
				{/* Main grid */}
				<div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-10 py-16">
					{/* Brand & Socials */}
					<div className="flex flex-col space-y-6 max-w-sm">
						<Link href="/" className="relative inline-block h-10 w-32">
							<Logo className="w-full h-full text-foreground opacity-90 hover:opacity-100 transition-opacity" />
						</Link>
						<p className="text-sm leading-relaxed">
							Somos tu mejor opción en capacitación profesional, garantizando
							excelencia y certificaciones avaladas para asegurar tu éxito laboral.
						</p>
					</div>

					{/* Links Group */}
					<div className="flex flex-col sm:flex-row gap-12 sm:gap-16">
						{/* Navegación */}
						<div>
							<h4 className="text-foreground text-sm font-bold mb-5 tracking-wide uppercase">
								Navegación
							</h4>
							<ul className="space-y-3 text-sm">
								{NAV_LINKS.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											className="hover:text-foreground transition-colors"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Contacto */}
						<div>
							<h4 className="text-foreground text-sm font-bold mb-5 tracking-wide uppercase">
								Contacto
							</h4>
							<ul className="space-y-4 text-sm">
								<li className="flex items-center gap-3">
									<Mail className="w-4 h-4 text-primary" />
									<a
										href="mailto:atencionalcliente.ccapglobal@gmail.com"
										className="hover:text-primary transition-colors">
										atencionalcliente.ccapglobal@gmail.com
									</a>
								</li>
								<li className="flex items-center gap-3">
									<Facebook className="w-4 h-4 text-primary" />
									<a
										href="https://facebook.com"
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-primary transition-colors">
										CCAP - Centro de Capacitación
									</a>
								</li>
							</ul>
						</div>

						{/* Legal */}
						<div>
							<h4 className="text-foreground text-sm font-bold mb-5 tracking-wide uppercase">Legal</h4>
							<ul className="space-y-4">
								{LEGAL_LINKS.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											className="group inline-flex items-center gap-1.5 text-sm hover:text-foreground transition-colors">
											{link.label}
											<ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="border-t border-border/50 py-6 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
					<p>© {new Date().getFullYear()} CCAP GLOBAL. Todos los derechos reservados.</p>
					<p>Construyendo líderes técnicos.</p>
				</div>
			</div>
		</footer>
	);
}
