import type { Metadata } from "next";
import { MainHero } from "@/components/home/MainHero";
import { HomeCourses } from "@/components/home/HomeCourses";
import { HomeCertificates } from "@/components/home/HomeCertificates";
import { HomeAbout } from "@/components/home/HomeAbout";
import { MainBackground } from "@/components/home/MainBackground";
import { TrustedBy } from "@/components/home/TrustedBy";
import { PaymentMethods } from "@/components/home/PaymentMethods";

// ─── Homepage-specific SEO metadata ──────────────────────────────────────────
// Overrides the root layout metadata for this page only.
export const metadata: Metadata = {
	title:
		"Cursos Online con Certificación Avalada | CIP, Autodesk, RIB Presto",
	description:
		"Plataforma líder de capacitación online en Perú. Cursos de ingeniería, arquitectura y tecnología avalados por CIP, CAP, CEL, Autodesk y RIB Presto. Certificados reconocidos nacional e internacionalmente. Inscripciones 2026 abiertas.",
	alternates: {
		canonical: "https://www.ccapglobal.com",
	},
	openGraph: {
		title:
			"CCAP Global | Cursos Online con Certificación Avalada — CIP, Autodesk, RIB Presto",
		description:
			"Capacítate con los mejores cursos online con certificados avalados por CIP, Autodesk y RIB Presto. Inscripciones abiertas para el 2026.",
		url: "https://www.ccapglobal.com",
		type: "website",
	},
};

// ─── Schema.org JSON-LD ───────────────────────────────────────────────────────
// Enables rich results in Google: Organization panel, sitelinks search box,
// FAQ rich snippets, and educational organization signals.
const schemaOrg = {
	"@context": "https://schema.org",
	"@graph": [
		// Organization: Company identity
		{
			"@type": ["Organization", "EducationalOrganization"],
			"@id": "https://www.ccapglobal.com/#organization",
			name: "CCAP Global",
			alternateName: "Centro de Capacitación Profesional — CCAP",
			url: "https://www.ccapglobal.com",
			logo: {
				"@type": "ImageObject",
				url: "https://www.ccapglobal.com/og-image.png",
				width: 1200,
				height: 630,
			},
			description:
				"Plataforma de capacitación online con más de 5 años de experiencia en Perú. Ofrecemos cursos de ingeniería, arquitectura y tecnología con certificaciones avaladas por CIP, CAP, CEL, Autodesk y RIB Presto.",
			foundingDate: "2020",
			areaServed: {
				"@type": "Country",
				name: "Perú",
			},
			contactPoint: {
				"@type": "ContactPoint",
				contactType: "customer service",
				email: "atencionalcliente.ccapglobal@gmail.com",
				availableLanguage: "es",
			},
			sameAs: ["https://www.facebook.com/ccapglobal"],
		},
		// WebSite: Enables Sitelinks Searchbox in Google Search
		{
			"@type": "WebSite",
			"@id": "https://www.ccapglobal.com/#website",
			url: "https://www.ccapglobal.com",
			name: "CCAP Global",
			description:
				"Plataforma líder de cursos online con certificación avalada en Perú.",
			publisher: {
				"@id": "https://www.ccapglobal.com/#organization",
			},
			potentialAction: {
				"@type": "SearchAction",
				target: {
					"@type": "EntryPoint",
					urlTemplate:
						"https://www.ccapglobal.com/catalog?q={search_term_string}",
				},
				"query-input": "required name=search_term_string",
			},
			inLanguage: "es-PE",
		},
		// WebPage: Homepage structured data
		{
			"@type": "WebPage",
			"@id": "https://www.ccapglobal.com/#webpage",
			url: "https://www.ccapglobal.com",
			name: "CCAP Global — Cursos Online con Certificación Avalada en Perú",
			isPartOf: { "@id": "https://www.ccapglobal.com/#website" },
			about: { "@id": "https://www.ccapglobal.com/#organization" },
			description:
				"Descubre nuestros cursos online de ingeniería y arquitectura con certificados avalados por CIP, Autodesk y RIB Presto.",
			inLanguage: "es-PE",
		},
		// FAQPage: Enables FAQ rich snippets in Google Search results
		{
			"@type": "FAQPage",
			mainEntity: [
				{
					"@type": "Question",
					name: "¿Los certificados de CCAP Global están avalados por el CIP?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Sí. Nuestros certificados cuentan con el respaldo del Colegio de Ingenieros del Perú (CIP), el Colegio de Arquitectos del Perú (CAP) y el Colegio de Economistas de Lima (CEL), lo que les otorga reconocimiento oficial a nivel nacional.",
					},
				},
				{
					"@type": "Question",
					name: "¿Cómo puedo verificar la autenticidad de un certificado CCAP?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Puedes verificar la autenticidad de cualquier certificado ingresando el código único alfanumérico o tu número de DNI en nuestro portal de verificación en ccapglobal.com/certificates.",
					},
				},
				{
					"@type": "Question",
					name: "¿Los cursos de CCAP Global son completamente online?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Sí, ofrecemos cursos 100% online con clases en vivo y grabadas. Puedes acceder desde cualquier dispositivo a tu ritmo, con soporte y acceso a los materiales por tiempo ilimitado.",
					},
				},
				{
					"@type": "Question",
					name: "¿Qué métodos de pago aceptan en CCAP Global?",
					acceptedAnswer: {
						"@type": "Answer",
						text: "Aceptamos transferencias y depósitos a través de BCP, BBVA, Banco de la Nación y pagos por Yape. También puedes contactarnos para métodos alternativos.",
					},
				},
			],
		},
	],
};

export default function HomePage() {
	return (
		<>
			{/* Schema.org JSON-LD — not visible, only for search engines */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
			/>
			<div className="flex flex-col min-h-screen relative selection:bg-primary/20">
				<MainBackground />
				<MainHero />
				<TrustedBy />
				<HomeCourses />
				<HomeAbout />
				<HomeCertificates />
				<PaymentMethods />
			</div>
		</>
	);
}
