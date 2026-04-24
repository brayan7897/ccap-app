import type { Metadata } from "next";
import { DM_Sans, Libre_Baskerville, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import FloatingWhatsAppButton from "@/components/ui/WhatsAppButton";
import "./globals.css";

const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
	variable: "--font-libre-baskerville",
	weight: ["400", "700"],
	subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
});

// ─── SEO Global Base Metadata ────────────────────────────────────────────────
// Each page can override these values via its own `export const metadata`.
export const metadata: Metadata = {
	metadataBase: new URL("https://www.ccapglobal.com"),
	title: {
		default: "CCAP Global | Cursos Online con Certificación Avalada en Perú",
		template: "%s | CCAP Global",
	},
	description:
		"Capacítate con los mejores cursos online avalados por CIP, CAP, Autodesk y RIB Presto. Obtén certificaciones reconocidas a nivel nacional e internacional. Inscripciones 2026 abiertas.",
	keywords: [
		"cursos online perú",
		"capacitación online certificada",
		"cursos con certificado CIP",
		"cursos ingeniería online",
		"certificación autodesk perú",
		"cursos arquitectura online",
		"plataforma e-learning perú",
		"CCAP global",
		"certificados online avalados",
		"cursos técnicos profesionales",
	],
	authors: [{ name: "CCAP Global", url: "https://www.ccapglobal.com" }],
	creator: "CCAP Global",
	publisher: "CCAP Global",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	openGraph: {
		type: "website",
		locale: "es_PE",
		url: "https://www.ccapglobal.com",
		siteName: "CCAP Global",
		title: "CCAP Global | Cursos Online con Certificación Avalada en Perú",
		description:
			"Capacítate con los mejores cursos online avalados por CIP, CAP, Autodesk y RIB Presto. Inscripciones 2026 abiertas.",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "CCAP Global — Plataforma de cursos online con certificación avalada en Perú",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "CCAP Global | Cursos Online Certificados en Perú",
		description:
			"Capacítate online con certificaciones avaladas por CIP, Autodesk y más. Plataforma líder de e-learning en Perú.",
		images: ["/og-image.png"],
		creator: "@ccapglobal",
	},
	alternates: {
		canonical: "https://www.ccapglobal.com",
		languages: {
			"es-PE": "https://www.ccapglobal.com",
		},
	},
	category: "education",
};

// Inline script injected before React hydrates — prevents flash of wrong theme
const themeScript = `
(function() {
  try {
    var s = JSON.parse(localStorage.getItem('ccap-ui') || '{}');
    if (s.state && s.state.darkMode) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="es" suppressHydrationWarning>
			<head>
				{/* Anti-flash script: runs synchronously before paint */}
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body
				className={`${dmSans.variable} ${libreBaskerville.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
				<Script
					src="https://accounts.google.com/gsi/client"
					strategy="afterInteractive"
				/>
				<QueryProvider>
					<ThemeProvider>
						{children}
						{/* botón flotante de WhatsApp */}
						<FloatingWhatsAppButton />
						<Toaster
							position="top-right"
							richColors
							closeButton
							toastOptions={{ duration: 4000 }}
						/>
					</ThemeProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
