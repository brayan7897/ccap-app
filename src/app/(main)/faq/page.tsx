import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
	title: "Preguntas Frecuentes — CCAP Global",
	description:
		"Resuelve tus dudas sobre inscripciones, modalidades, pagos y certificación de los cursos de CCAP Global.",
	alternates: {
		canonical: "https://www.ccapglobal.com/faq",
	},
};

const FAQS = [
	{
		q: "¿Qué es CCAP GLOBAL?",
		a: "CCAP GLOBAL es un Centro de Capacitación y Perfeccionamiento Profesional dedicado a brindar cursos y programas de actualización para estudiantes, profesionales y organizaciones, con certificaciones verificables.",
	},
	{
		q: "¿Los cursos son virtuales o presenciales?",
		a: "Contamos con programas en modalidad virtual en vivo, virtual grabada y, según disponibilidad, capacitaciones presenciales.",
	},
	{
		q: "¿Necesito conocimientos previos para inscribirme?",
		a: "Depende del programa. Algunos cursos son de nivel básico y otros requieren conocimientos previos. Esta información se especifica en la descripción de cada curso.",
	},
	{
		q: "¿Cómo puedo inscribirme?",
		a: "Puedes inscribirte directamente desde nuestra página web o comunicarte con nuestros asesores mediante WhatsApp para recibir orientación durante el proceso.",
	},
	{
		q: "¿Qué métodos de pago aceptan?",
		a: "Aceptamos transferencias bancarias, Yape, Plin y otros medios de pago habilitados, los cuales se informan al momento de la inscripción.",
	},
	{
		q: "¿Cómo accedo al curso en vivo?",
		a: "Una vez confirmada la inscripción, recibirás las indicaciones y el enlace de acceso a través de tu correo electrónico o WhatsApp.",
	},
	{
		q: "¿Las clases quedan grabadas?",
		a: "Sí. En los programas que incluyen este beneficio, los participantes podrán acceder a las grabaciones durante el período establecido para el curso.",
	},
	{
		q: "¿Los cursos incluyen certificado?",
		a: "Sí. Los programas ofrecen certificación digital, previa validación y cumplimiento de los requisitos académicos establecidos para cada curso.",
	},
	{
		q: "¿Cómo puedo verificar un certificado?",
		a: "Los certificados emitidos por CCAP GLOBAL cuentan con un sistema de verificación mediante código o ingresando a nuestra plataforma.",
	},
	{
		q: "¿Cuánto tiempo demora la entrega del certificado?",
		a: "Una vez culminado el proceso de validación académica, el certificado será emitido dentro del plazo establecido e informado al participante.",
	},
	{
		q: "¿Qué sucede si no puedo asistir a una clase en vivo?",
		a: "Si el curso contempla acceso a grabaciones, podrás revisar la sesión posteriormente dentro del período habilitado.",
	},
	{
		q: "¿Puedo solicitar factura o boleta?",
		a: "Sí. Emitimos los comprobantes de pago.",
	},
	{
		q: "¿Ofrecen descuentos para empresas o grupos?",
		a: "Sí. Contamos con beneficios y tarifas especiales para empresas, instituciones y grupos de participantes.",
	},
	{
		q: "¿Cómo puedo comunicarme con CCAP GLOBAL?",
		a: "Puedes escribirnos mediante nuestros canales oficiales de atención, como WhatsApp, correo electrónico y Facebook.",
	},
];

const schemaOrg = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: FAQS.map(({ q, a }) => ({
		"@type": "Question",
		name: q,
		acceptedAnswer: {
			"@type": "Answer",
			text: a,
		},
	})),
};

export default function FaqPage() {
	return (
		<div className="min-h-screen pt-32 pb-20">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
			/>
			<div className="container mx-auto px-4 lg:px-8 max-w-3xl">
				<div className="text-center mb-14 max-w-2xl mx-auto">
					<h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
						Preguntas Frecuentes
					</h1>
					<p className="text-muted-foreground text-base md:text-lg">
						Resuelve tus dudas sobre inscripciones, modalidades, pagos y certificación.
					</p>
				</div>

				<div className="bg-card border border-border rounded-2xl px-6 md:px-8 shadow-sm">
					<Accordion type="single" collapsible className="w-full">
						{FAQS.map((item, idx) => (
							<AccordionItem key={item.q} value={`item-${idx}`}>
								<AccordionTrigger>{item.q}</AccordionTrigger>
								<AccordionContent>{item.a}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>

				<div className="mt-12 flex flex-col items-center text-center gap-4 bg-primary/5 border border-primary/10 rounded-2xl p-8">
					<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
						<MessageCircle className="w-6 h-6 text-primary" />
					</div>
					<h2 className="text-lg font-bold text-foreground">¿No encontraste tu respuesta?</h2>
					<p className="text-muted-foreground text-sm max-w-md">
						Escríbenos y con gusto te ayudaremos a resolver cualquier duda sobre nuestros
						programas.
					</p>
					<Link
						href="/contact"
						className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold text-sm hover:bg-primary/90 transition-colors">
						Contáctanos
					</Link>
				</div>
			</div>
		</div>
	);
}
