import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target, Eye, Award, Lightbulb, Users, ShieldCheck, Facebook, Youtube, Mail, MessageCircle } from "lucide-react";
import weImage from '@/assets/images/page-us/we-image.webp';
import weImage2 from '@/assets/images/page-us/we-image-2.webp';
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
	title: "Sobre Nosotros | CCAP Global — Plataforma de E-Learning en Perú",
	description: "Formación de calidad, acceso flexible y certificaciones verificables para potenciar tu desarrollo en el ámbito público y privado.",
	alternates: {
		canonical: "https://ccapglobal.com/about",
	},
	openGraph: {
		title: "Sobre Nosotros | CCAP Global",
		description: "Formación de calidad, acceso flexible y certificaciones verificables para potenciar tu desarrollo en el ámbito público y privado.",
		url: "https://ccapglobal.com/about",
	},
};

export default async function AboutPage() {
	let companyInfo = null;
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/company-info`, { next: { revalidate: 3600 } });
		if (res.ok) {
			companyInfo = await res.json();
		}
	} catch (error) {
		console.error("Failed to fetch company info", error);
	}

	const facebookUrl = companyInfo?.facebook_url || "https://facebook.com";
	const rawPhone = companyInfo?.phone_number || "905 517 549";
	const whatsappUrl = `https://wa.me/51${rawPhone.replace(/\D/g, '')}`;
	const youtubeUrl = companyInfo?.youtube_url || "https://youtube.com";
	const emailAddress = companyInfo?.email || "atencionalcliente.ccapglobal@gmail.com";

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative bg-primary text-white overflow-hidden min-h-[450px] md:min-h-[550px] flex items-center">
				{/* Background Image with Gradient Fade */}
				<div className="absolute top-0 right-0 h-full w-full md:w-[75%] lg:w-[85%] z-0 overflow-hidden">
					<Image
						src={weImage}
						alt="Profesionales trabajando"
						fill
						className="object-cover object-center animate-slow-zoom"
						priority
						placeholder="blur"
					/>
					{/* Gradient to blend image with the solid left background */}
					<div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/5 md:via-primary/10 to-transparent z-10"></div>
					{/* Additional gradient from left to ensure smooth transition on larger screens */}
					<div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-primary to-transparent hidden md:block z-10"></div>
				</div>

				{/* Content */}
				<div className="container mx-auto px-4 lg:px-8 relative z-20">
					<div className="max-w-2xl py-16 md:py-24">
						<ScrollReveal animation="fade-in-up" duration={700} threshold={0.01}>
							<h3 className="text-secondary font-bold tracking-wider uppercase mb-4 text-sm">NOSOTROS</h3>
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
								Impulsamos tu<br/>crecimiento profesional
							</h1>
							<p className="text-primary-foreground/80 text-base md:text-lg mb-10 max-w-xl">
								Formación de calidad, <strong className="text-white font-semibold">acceso flexible</strong> y certificaciones verificables para potenciar tu desarrollo en el ámbito público y privado.
							</p>
							<div className="flex flex-col sm:flex-row gap-4">
								<Link
									href="/courses"
									className="px-8 py-3.5 bg-secondary hover:bg-secondary/90 text-primary rounded-md font-bold flex items-center justify-center transition-colors">
									Conoce nuestros cursos <ArrowRight className="ml-2 w-5 h-5" />
								</Link>
								<Link
									href="/contact"
									className="px-8 py-3.5 border border-white/60 hover:bg-white/10 hover:border-white text-white rounded-md font-bold flex items-center justify-center transition-colors">
									Contáctanos <ArrowRight className="ml-2 w-5 h-5" />
								</Link>
							</div>
						</ScrollReveal>
					</div>
				</div>
			</section>

			{/* ¿Quiénes Somos? Section */}
			<section className="py-20 bg-background overflow-hidden">
				<div className="container mx-auto px-4 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
						{/* Image Column */}
						<ScrollReveal animation="fade-in-right" duration={800} threshold={0.15} className="lg:col-span-4 relative rounded-2xl overflow-hidden min-h-[300px]">
							<Image
								src={weImage2}
								alt="Edificio CCAP Global"
								fill
								className="object-cover"
								placeholder="blur"
							/>
						</ScrollReveal>
						
						{/* Text Column */}
						<ScrollReveal animation="fade-in-up" duration={800} threshold={0.15} delay={100} className="lg:col-span-4 flex flex-col justify-center">
							<h2 className="text-3xl font-bold text-foreground mb-6">¿Quiénes Somos?</h2>
							<p className="text-muted-foreground mb-4 text-sm leading-relaxed">
								Somos una institución especializada en capacitación y actualización profesional, comprometida con el fortalecimiento de competencias para profesionales and organizaciones.
							</p>
							<p className="text-muted-foreground text-sm leading-relaxed">
								Desarrollamos programas en ingeniería, gestión pública, administración y tecnología, brindando formación de calidad, acceso flexible y certificaciones verificables que contribuyan al desarrollo de profesionales en el sector público y privado.
							</p>
						</ScrollReveal>

						{/* Misión y Visión Columns */}
						<div className="lg:col-span-4 grid grid-rows-2 gap-6">
							<ScrollReveal animation="fade-in-left" duration={800} threshold={0.15} delay={200}>
								<div className="group/card bg-card border border-border/50 shadow-sm rounded-2xl p-6 flex flex-col justify-center h-full hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_10px_30px_rgba(234,179,8,0.05)] hover:border-primary/20 dark:hover:border-secondary/20 hover:-translate-y-1 transition-all duration-300">
									<div className="flex items-center gap-3 mb-3">
										<div className="bg-primary rounded-full p-2.5 text-primary-foreground group-hover/card:scale-110 group-hover/card:rotate-12 transition-transform duration-300">
											<Target className="w-5 h-5" />
										</div>
										<h3 className="text-foreground dark:text-white font-bold text-lg group-hover/card:text-primary dark:group-hover/card:text-secondary transition-colors duration-300">MISIÓN</h3>
									</div>
									<p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
										Brindar programas de capacitación y actualización profesional de alta calidad, orientados al fortalecimiento de competencias, el desarrollo de habilidades y la mejora continua de profesionales y organizaciones, mediante una formación práctica, accesible y respaldada por certificaciones verificables.
									</p>
								</div>
							</ScrollReveal>
							<ScrollReveal animation="fade-in-left" duration={800} threshold={0.15} delay={300}>
								<div className="group/card bg-card border border-border/50 shadow-sm rounded-2xl p-6 flex flex-col justify-center h-full hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_10px_30px_rgba(234,179,8,0.05)] hover:border-secondary/20 hover:-translate-y-1 transition-all duration-300">
									<div className="flex items-center gap-3 mb-3">
										<div className="bg-secondary rounded-full p-2.5 text-secondary-foreground group-hover/card:scale-110 group-hover/card:rotate-12 transition-transform duration-300">
											<Eye className="w-5 h-5" />
										</div>
										<h3 className="text-secondary font-bold text-lg group-hover/card:opacity-90 transition-opacity duration-300">VISIÓN</h3>
									</div>
									<p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
										Ser líderes en capacitación profesional del país, contribuyendo al desarrollo del talento humano a través de programas innovadores, accesibles y alineados a las demandas del mercado laboral.
									</p>
								</div>
							</ScrollReveal>
						</div>
					</div>
				</div>
			</section>

			{/* Valores Section */}
			<section className="py-16 bg-background">
				<div className="container mx-auto px-4 lg:px-8">
					<ScrollReveal animation="fade-in-up" duration={600} threshold={0.15}>
						<div className="text-center mb-12">
							<h2 className="text-2xl font-bold text-foreground mb-2 uppercase">NUESTROS VALORES</h2>
							<div className="h-1 w-24 bg-secondary mx-auto rounded-full"></div>
						</div>
					</ScrollReveal>
					
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{ icon: Award, title: "Excelencia", desc: "Buscamos superar expectativas mediante una formación de calidad.", color: "text-foreground", bgClass: "bg-primary text-primary-foreground shadow-primary/20" },
							{ icon: Lightbulb, title: "Innovación", desc: "Promovemos el aprendizaje con metodologías y herramientas actualizadas.", color: "text-secondary", bgClass: "bg-secondary text-secondary-foreground shadow-secondary/20" },
							{ icon: Users, title: "Compromiso", desc: "Acompañamos el desarrollo profesional de nuestros participantes.", color: "text-foreground", bgClass: "bg-primary text-primary-foreground shadow-primary/20" },
							{ icon: ShieldCheck, title: "Confianza", desc: "Construimos relaciones basadas en transparencia y credibilidad.", color: "text-secondary", bgClass: "bg-secondary text-secondary-foreground shadow-secondary/20" }
						].map((item, idx) => {
							const Icon = item.icon;
							return (
								<ScrollReveal key={item.title} animation="scale-in" duration={700} delay={idx * 120} threshold={0.1}>
									<div className="flex flex-col items-center text-center">
										<div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg ${item.bgClass}`}>
											<Icon className="w-8 h-8" />
										</div>
										<h3 className={`font-bold ${item.color} mb-2`}>{item.title}</h3>
										<p className="text-muted-foreground text-xs px-4">{item.desc}</p>
									</div>
								</ScrollReveal>
							);
						})}
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section className="py-16 bg-background mb-12">
				<div className="container mx-auto px-4 lg:px-8">
					<ScrollReveal animation="fade-in-up" duration={600} threshold={0.15}>
						<div className="text-center mb-12">
							<h2 className="text-2xl font-bold text-foreground mb-2 uppercase">CONTÁCTANOS</h2>
							<div className="h-1 w-24 bg-secondary mx-auto rounded-full"></div>
						</div>
					</ScrollReveal>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{[
							{ href: facebookUrl, icon: Facebook, title: "Facebook", desc: "CCAP - Centro de Capacitación y Perfeccionamiento Profesional", bg: "bg-[#1877F2] text-white" },
							{ href: whatsappUrl, icon: MessageCircle, title: "WhatsApp", desc: rawPhone, bg: "bg-[#25D366] text-white" },
							{ href: youtubeUrl, icon: Youtube, title: "YouTube", desc: "CCAP Global", bg: "bg-[#FF0000] text-white" },
							{ href: `mailto:${emailAddress}`, icon: Mail, title: "Correo", desc: emailAddress, bg: "bg-secondary text-secondary-foreground" }
						].map((item, idx) => {
							const Icon = item.icon;
							return (
								<ScrollReveal key={item.title} animation="fade-in-up" duration={700} delay={idx * 120} threshold={0.1} className="h-full">
									<a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 border border-border/50 bg-card rounded-xl hover:shadow-md transition-all hover:border-primary/30 h-full">
										<div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm ${item.bg}`}>
											<Icon className="w-6 h-6" />
										</div>
										<div className="min-w-0">
											<h3 className="font-bold text-foreground text-sm">{item.title}</h3>
											<p className="text-muted-foreground text-xs mt-1 break-all">{item.desc}</p>
										</div>
									</a>
								</ScrollReveal>
							);
						})}
					</div>
				</div>
			</section>
		</div>
	);
}
