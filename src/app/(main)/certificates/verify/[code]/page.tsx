"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
	ShieldCheck,
	ShieldX,
	Award,
	Calendar,
	BookOpen,
	ArrowLeft,
	ExternalLink,
	Download,
	Loader2,
	Code2,
	User,
} from "lucide-react";
import { useVerifyCertificate } from "@/features/certificates/hooks/useCertificates";

function formatDate(dateStr: string) {
	return new Date(dateStr).toLocaleDateString("es-PE", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export default function VerifyCertificatePage() {
	const params = useParams<{ code: string }>();
	const router = useRouter();
	const code = decodeURIComponent(params.code ?? "");

	const {
		data: certificates,
		isLoading,
		isError,
	} = useVerifyCertificate(code || null);

	return (
		<div className="min-h-screen bg-background relative overflow-hidden">
			{/* Decorative blobs */}
			<div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-175 bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />
			<div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] max-w-125 bg-gold/10 rounded-full blur-[120px] pointer-events-none z-0" />

			<div className="relative z-10 container mx-auto px-4 lg:px-8 pt-28 pb-20">
				{/* Back link */}
				<Link
					href="/certificates"
					className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
					<ArrowLeft className="w-4 h-4" />
					Verificar otro certificado
				</Link>

				{/* Loading */}
				{isLoading && (
					<div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-32 gap-4">
						<Loader2 className="w-10 h-10 text-primary animate-spin" />
						<p className="text-muted-foreground font-medium">
							Verificando certificado…
						</p>
					</div>
				)}

				{/* Error / Not found */}
				{isError && (
					<div className="max-w-2xl mx-auto">
						<div className="bg-card border border-destructive/30 rounded-3xl shadow-xl overflow-hidden">
							<div className="bg-destructive/10 border-b border-destructive/20 px-8 py-10 flex flex-col items-center gap-4 text-center">
								<div className="w-16 h-16 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center">
									<ShieldX className="w-8 h-8 text-destructive" />
								</div>
								<div>
									<h1 className="text-2xl font-black text-foreground mb-2">
										Sin resultados
									</h1>
									<p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
										La consulta con el valor{" "}
										<span className="font-mono font-bold text-foreground">
											{code}
										</span>{" "}
										no corresponde a ningún certificado registrado o a un participante en nuestra base de datos.
									</p>
								</div>
							</div>
							<div className="px-8 py-6 flex flex-col sm:flex-row gap-3 justify-center">
								<button
									onClick={() => router.push("/certificates")}
									className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
									<ArrowLeft className="w-4 h-4" />
									Intentar de nuevo
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Success */}
				{certificates && certificates.length > 0 && (
					<div className="max-w-3xl mx-auto space-y-12">
						{/* Header global info */}
						<div className="text-center space-y-4">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 mb-2">
								<ShieldCheck className="w-8 h-8 text-emerald-500" />
							</div>
							<h1 className="text-2xl font-black text-foreground">
								{certificates.length === 1 ? "Certificado Verificado" : "Certificados Encontrados"}
							</h1>
							<p className="text-muted-foreground text-sm max-w-lg mx-auto">
								{certificates.length === 1 
									? "Este certificado es auténtico y fue emitido por CCAP GLOBAL." 
									: `Se han encontrado ${certificates.length} certificados asociados a esta consulta emitidos por CCAP GLOBAL.`}
							</p>
						</div>

						{/* Mapping over certificates */}
						<div className="space-y-8">
							{certificates.map((cert, index) => {
								const viewUrl = cert.drive_file_id
									? `https://drive.google.com/file/d/${cert.drive_file_id}/view`
									: cert.pdf_url;

								return (
									<div key={cert.id || index} className="bg-card border border-border/50 rounded-3xl shadow-xl overflow-hidden flex flex-col">
										{/* Details */}
										<div className="px-8 py-6 flex flex-col md:flex-row gap-6 md:items-center justify-between bg-muted/10">
											<div className="space-y-4 flex-1">
												<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-bold w-fit">
													<Award className="w-4 h-4" />
													Certificado Oficial
												</div>
												<div className="space-y-4 mt-2">
													<DetailRow
														icon={<Code2 className="w-4 h-4 text-muted-foreground" />}
														label="Código de certificado"
														value={
															<span className="font-mono font-bold text-foreground tracking-wider">
																{cert.certificate_code}
															</span>
														}
													/>
													<DetailRow
														icon={<Calendar className="w-4 h-4 text-muted-foreground" />}
														label="Fecha de emisión"
														value={formatDate(cert.issued_at)}
													/>
													<DetailRow
														icon={<User className="w-4 h-4 text-muted-foreground" />}
														label="Alumno"
														value={cert.user_full_name ?? cert.user_id}
													/>
													<DetailRow
														icon={<BookOpen className="w-4 h-4 text-muted-foreground" />}
														label="Curso"
														value={cert.course_title ?? cert.course_id}
													/>
												</div>
											</div>
											
											{/* Actions (if length > 1, show them here or at bottom) */}
											{viewUrl && (
												<div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
													<a
														href={viewUrl}
														target="_blank"
														rel="noopener noreferrer"
														className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm bg-gold/10 text-gold hover:bg-gold/20 border border-gold/30 transition-all shadow-sm">
														<ExternalLink className="w-4 h-4" />
														Ver PDF
													</a>
												</div>
											)}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

function DetailRow({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: React.ReactNode;
}) {
	return (
		<div className="flex items-start gap-3">
			<div className="mt-0.5 shrink-0">{icon}</div>
			<div className="min-w-0 flex-1">
				<p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">
					{label}
				</p>
				<div className="text-sm text-foreground">{value}</div>
			</div>
		</div>
	);
}
