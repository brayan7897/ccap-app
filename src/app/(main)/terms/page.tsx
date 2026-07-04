import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Términos y Condiciones",
	description:
		"Términos y condiciones de uso de los servicios de CCAP Global, Centro de Capacitación y Perfeccionamiento Profesional.",
	alternates: {
		canonical: "https://ccapglobal.com/terms",
	},
};

const SECTIONS = [
	{
		title: "1. Información General",
		body: [
			"Bienvenido a CCAP GLOBAL – Centro de Capacitación y Perfeccionamiento Profesional.",
			"Al acceder y utilizar nuestro sitio web, el usuario acepta los presentes Términos y Condiciones. Si no está de acuerdo con ellos, deberá abstenerse de utilizar nuestros servicios.",
		],
	},
	{
		title: "2. Servicios",
		body: [
			"CCAP GLOBAL brinda programas de capacitación, cursos, seminarios y certificaciones en modalidad virtual y/o presencial.",
			"La información publicada tiene carácter informativo y puede actualizarse sin previo aviso.",
		],
	},
	{
		title: "3. Inscripciones",
		body: [
			"La inscripción a cualquiera de nuestros programas implica la aceptación de estos términos.",
			"El participante declara que la información proporcionada durante el registro es verdadera y actualizada.",
		],
	},
	{
		title: "4. Certificación",
		body: [
			"Las certificaciones se emitirán únicamente cuando el participante cumpla con los requisitos académicos establecidos para cada programa, tales como:",
		],
		list: [
			"Asistencia mínima requerida.",
			"Aprobación de evaluaciones.",
			"Validación académica correspondiente.",
			"Cumplimiento de los requisitos administrativos.",
		],
	},
	{
		title: "5. Pagos",
		body: [
			"Los precios publicados podrán variar sin previo aviso.",
			"Una vez realizado el pago y confirmado el acceso al programa, las devoluciones estarán sujetas a la política interna vigente.",
		],
	},
	{
		title: "6. Propiedad Intelectual",
		body: ["Todo el contenido del sitio web, incluyendo:"],
		list: [
			"Textos",
			"Videos",
			"Material académico",
			"Diseño",
			"Logotipos",
			"Imágenes",
			"Documentos",
		],
		after: [
			"es propiedad de CCAP GLOBAL y se encuentra protegido por la legislación peruana sobre derechos de autor.",
			"Queda prohibida su reproducción total o parcial sin autorización.",
		],
	},
	{
		title: "7. Uso Adecuado",
		body: [
			"El usuario se compromete a utilizar el sitio web de forma responsable y a no realizar actividades que puedan afectar su funcionamiento o vulnerar los derechos de terceros.",
		],
	},
	{
		title: "8. Modificaciones",
		body: [
			"CCAP GLOBAL podrá modificar estos términos cuando resulte necesario. Las modificaciones entrarán en vigencia desde su publicación.",
		],
	},
	{
		title: "9. Legislación Aplicable",
		body: [
			"Los presentes términos se rigen por la legislación vigente de la República del Perú.",
		],
	},
];

export default function TermsPage() {
	return (
		<div className="min-h-screen pt-32 pb-20">
			<div className="container mx-auto px-4 lg:px-8 max-w-3xl">
				<div className="mb-14">
					<h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
						Términos y Condiciones
					</h1>
					<p className="text-muted-foreground text-base md:text-lg">
						Condiciones de uso de los servicios de CCAP Global — Centro de Capacitación y
						Perfeccionamiento Profesional.
					</p>
				</div>

				<div className="space-y-10">
					{SECTIONS.map((section) => (
						<section key={section.title}>
							<h2 className="text-xl font-bold text-foreground mb-3">{section.title}</h2>
							<div className="space-y-3 text-muted-foreground text-sm md:text-base leading-relaxed">
								{section.body.map((p) => (
									<p key={p}>{p}</p>
								))}
								{section.list && (
									<ul className="list-disc pl-6 space-y-1.5">
										{section.list.map((item) => (
											<li key={item}>{item}</li>
										))}
									</ul>
								)}
								{section.after?.map((p) => (
									<p key={p}>{p}</p>
								))}
							</div>
						</section>
					))}
				</div>
			</div>
		</div>
	);
}
