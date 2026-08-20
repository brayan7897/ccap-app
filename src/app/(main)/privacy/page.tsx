import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Política de Privacidad",
	description:
		"Política de privacidad y tratamiento de datos personales de CCAP Global, conforme a la Ley N.º 29733 – Ley de Protección de Datos Personales del Perú.",
	alternates: {
		canonical: "https://ccapglobal.com/privacy",
	},
};

const SECTIONS = [
	{
		title: "1. Compromiso",
		body: [
			"En CCAP GLOBAL respetamos la privacidad de nuestros usuarios y protegemos los datos personales conforme a la Ley N.º 29733 – Ley de Protección de Datos Personales.",
		],
	},
	{
		title: "2. Datos que recopilamos",
		body: ["Podemos recopilar la siguiente información:"],
		list: [
			"Nombres y apellidos",
			"DNI o documento de identidad (cuando corresponda)",
			"Correo electrónico",
			"Número telefónico",
			"Información relacionada con las inscripciones y certificaciones",
		],
	},
	{
		title: "3. Finalidad del tratamiento",
		body: ["Los datos personales serán utilizados para:"],
		list: [
			"Gestionar inscripciones.",
			"Brindar acceso a cursos.",
			"Emitir certificados.",
			"Enviar información académica.",
			"Informar promociones y nuevos programas.",
			"Mejorar nuestros servicios.",
		],
	},
	{
		title: "4. Protección de la información",
		body: [
			"Implementamos medidas de seguridad técnicas y administrativas para proteger la información contra accesos no autorizados, pérdida o alteración.",
		],
	},
	{
		title: "5. Compartición de información",
		body: [
			"CCAP GLOBAL no comercializa ni vende los datos personales de sus usuarios.",
			"Solo podrán compartirse cuando exista obligación legal o sea necesario para la prestación del servicio.",
		],
	},
	{
		title: "6. Cookies",
		body: [
			"Utilizamos cookies y almacenamiento local necesarios para el funcionamiento de la plataforma, y cookies de análisis opcionales que solo se activan si el usuario las acepta.",
			"Al ingresar al sitio se solicita tu consentimiento mediante un aviso de cookies. Puedes cambiar tu elección en cualquier momento desde 'Preferencias de cookies', en el pie de página.",
		],
		list: [
			"ccap-auth-token (cookie propia) — mantiene la sesión iniciada — 7 días",
			"access_token (almacenamiento local) — sesión del usuario — hasta cerrar sesión",
			"ccap-ui (almacenamiento local) — preferencia de tema claro/oscuro — persistente",
			"Google Sign-In (terceros) — cookies de Google al iniciar sesión con esa cuenta",
			"Google Drive (terceros) — reproducción de videos y PDF de cursos matriculados",
			"Google Analytics (terceros, opcional) — estadísticas de uso, solo si aceptas cookies de análisis",
		],
		after: [
			"También puedes configurar tu navegador para bloquear cookies, aunque esto podría afectar el funcionamiento de algunas secciones del sitio.",
		],
	},
	{
		title: "7. Derechos del usuario",
		body: ["El usuario podrá ejercer sus derechos de:"],
		list: ["Acceso", "Rectificación", "Actualización", "Cancelación", "Oposición"],
		after: ["respecto de sus datos personales, conforme a la legislación peruana."],
	},
	{
		title: "8. Conservación de los datos",
		body: [
			"Los datos serán conservados únicamente durante el tiempo necesario para cumplir las finalidades para las cuales fueron recopilados o mientras exista una obligación legal.",
		],
	},
	{
		title: "9. Contacto",
		body: [
			"Para consultas relacionadas con la privacidad o el tratamiento de datos personales, el usuario podrá comunicarse mediante los canales oficiales de CCAP GLOBAL publicados en este sitio web.",
		],
	},
];

export default function PrivacyPage() {
	return (
		<div className="min-h-screen pt-32 pb-20">
			<div className="container mx-auto px-4 lg:px-8 max-w-3xl">
				<div className="mb-14">
					<h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
						Política de Privacidad
					</h1>
					<p className="text-muted-foreground text-base md:text-lg">
						Cómo recopilamos, usamos y protegemos tus datos personales en CCAP Global.
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
