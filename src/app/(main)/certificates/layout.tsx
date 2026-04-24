import type { Metadata } from "next";

/**
 * Server layout for the /certificates route group.
 * Since certificates/page.tsx is a Client Component ('use client'),
 * it cannot export metadata directly. We declare it here in the
 * server layout instead — Next.js will use this for the page.
 */
export const metadata: Metadata = {
	title: "Verificación de Certificados Oficiales — Portal de Validación",
	description:
		"Verifica la autenticidad de tu certificado CCAP Global usando tu código único alfanumérico o número de DNI. Credenciales con aval CIP, Autodesk y RIB Presto, verificadas en segundos.",
	alternates: {
		canonical: "https://www.ccapglobal.com/certificates",
	},
	openGraph: {
		title: "Verificación de Certificados | CCAP Global",
		description:
			"Comprueba al instante la validez de un certificado CCAP Global. Ingresa el código único o DNI del participante.",
		url: "https://www.ccapglobal.com/certificates",
	},
};

export default function CertificatesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
