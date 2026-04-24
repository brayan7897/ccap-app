"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
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
	Maximize,
	Minimize,
	RotateCw,
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

	const viewerRef = useRef<HTMLDivElement>(null);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [rotation, setRotation] = useState(0);

	const rotateDocument = () => {
		setRotation((prev) => (prev + 90) % 360);
	};

	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () =>
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
	}, []);

	const toggleFullscreen = async () => {
		if (!document.fullscreenElement) {
			await viewerRef.current?.requestFullscreen();
		} else {
			await document.exitFullscreen();
		}
	};

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
								const hasPreviews = cert.pdf_url || cert.drive_file_id || cert.html_content;
								const showPreviews = certificates.length === 1 && hasPreviews;

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
												</div>
											</div>
											
											{/* Actions (if length > 1, show them here or at bottom) */}
											{(cert.pdf_url || cert.drive_file_id) && (
												<div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
													{cert.pdf_url && (
														<a
															href={cert.pdf_url}
															target="_blank"
															rel="noopener noreferrer"
															className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm bg-gold/10 text-gold hover:bg-gold/20 border border-gold/30 transition-all shadow-sm">
															<ExternalLink className="w-4 h-4" />
															Ver PDF
														</a>
													)}
													{cert.drive_file_id && !cert.pdf_url && (
														<a
															href={`https://drive.google.com/file/d/${cert.drive_file_id}/view`}
															target="_blank"
															rel="noopener noreferrer"
															className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm bg-gold/10 text-gold hover:bg-gold/20 border border-gold/30 transition-all shadow-sm">
															<Download className="w-4 h-4" />
															Ver en Drive
														</a>
													)}
												</div>
											)}
										</div>

										{/* Previews ONLY if there is ONE certificate */}
										{showPreviews && (
											<div className="flex flex-col border-t border-border/50">
												{cert.html_content && (
													<div className="bg-card border-b border-border/50">
														<div className="px-6 py-4 border-b border-border/50 flex items-center gap-2">
															<BookOpen className="w-4 h-4 text-primary" />
															<span className="font-bold text-sm text-foreground">
																Vista del certificado
															</span>
														</div>
														<div className="p-4">
															<iframe
																srcDoc={cert.html_content}
																title="Certificado"
																className="w-full rounded-xl border border-border"
																style={{ minHeight: "520px" }}
																sandbox="allow-same-origin"
															/>
														</div>
													</div>
												)}
												
												{(cert.pdf_url || cert.drive_file_id) && (
													<div
														ref={viewerRef}
														className="bg-card flex flex-col transition-all relative"
														style={isFullscreen ? { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 50, borderRadius: 0 } : {}}
													>
														<div className="px-6 py-4 border-b border-border/50 flex items-center justify-between shrink-0 bg-card">
															<div className="flex items-center gap-2">
																<BookOpen className="w-4 h-4 text-primary" />
																<span className="font-bold text-sm text-foreground">
																	Documento Adjunto
																</span>
															</div>
															<div className="flex items-center gap-1">
																<button
																	onClick={rotateDocument}
																	className="p-2 hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg transition-colors flex items-center gap-2 text-xs font-semibold"
																	title="Rotar documento"
																>
																	<RotateCw className="w-4 h-4" />
																	<span className="hidden sm:inline">Rotar</span>
																</button>
																<button
																	onClick={toggleFullscreen}
																	className="p-2 hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg transition-colors flex items-center gap-2 text-xs font-semibold"
																	title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
																>
																	{isFullscreen ? (
																		<>
																			<Minimize className="w-4 h-4" />
																			<span className="hidden sm:inline">Salir</span>
																		</>
																	) : (
																		<>
																			<Maximize className="w-4 h-4" />
																			<span className="hidden sm:inline">Pantalla Completa</span>
																		</>
																	)}
																</button>
															</div>
														</div>
														<div 
															className="w-full flex-1 bg-muted/10 relative overflow-hidden flex items-center justify-center transition-all duration-300"
															style={!isFullscreen 
																? { aspectRatio: (rotation % 180 !== 0) ? "1 / 1.4142" : "1.4142 / 1" } 
																: { height: "100%" }
															}
														>
															<div 
																className="transition-transform duration-300 origin-center absolute flex items-center justify-center"
																style={!isFullscreen
																	? {
																		width: (rotation % 180 !== 0) ? "calc(100% * 1.4142)" : "100%",
																		height: (rotation % 180 !== 0) ? "calc(100% / 1.4142)" : "100%",
																		transform: `rotate(${rotation}deg)`
																	}
																	: {
																		width: (rotation % 180 !== 0) ? "100vh" : "100%",
																		height: (rotation % 180 !== 0) ? "100vw" : "100%",
																		transform: `rotate(${rotation}deg) scale(${(rotation % 180 !== 0) ? 0.85 : 1})`
																	}
																}
															>
																<iframe
																	src={
																		cert.pdf_url
																			? cert.pdf_url.includes("drive.google.com") && cert.pdf_url.includes("/view")
																				? cert.pdf_url.replace("/view", "/preview")
																				: cert.pdf_url
																			: `https://drive.google.com/file/d/${cert.drive_file_id}/preview`
																	}
																	title="Documento del Certificado"
																	className="w-full h-full border-none"
																	allowFullScreen
																/>
															</div>
														</div>
													</div>
												)}
											</div>
										)}
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
