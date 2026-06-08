"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
	ShieldCheck,
	ShieldX,
	Award,
	Calendar,
	BookOpen,
	ArrowLeft,
	ExternalLink,
	Loader2,
	Code2,
	User as UserIcon,
	FileText,
	CheckCircle2,
} from "lucide-react";
import { useVerifyCertificate } from "@/features/certificates/hooks/useCertificates";

function formatDate(dateStr: string) {
	return new Date(dateStr).toLocaleDateString("es-PE", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

function getEmbedUrl(url: string | null) {
	if (!url) return "";
	if (url.includes("drive.google.com") && url.includes("/view")) {
		return url.replace(/\/view.*/, "/preview");
	}
	return url;
}

export default function VerifyCertificatePage() {
	const params = useParams<{ code: string }>();
	const router = useRouter();
	const code = decodeURIComponent(params.code ?? "");

	const {
		data: responseData,
		isLoading,
		isError,
	} = useVerifyCertificate(code || null);

	const certificates = responseData?.results || [];
	const searchType = responseData?.search_type || "certificate_code";
	const student = certificates.length > 0 ? certificates[0].user : null;

	// State to track if an iframe has loaded
	const [loadedIframes, setLoadedIframes] = useState<Record<string, boolean>>({});

	const handleIframeLoad = (id: string) => {
		setLoadedIframes((prev) => ({ ...prev, [id]: true }));
	};

	return (
		<div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-500">
			{/* Decorative blobs */}
			<div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[800px] bg-foreground/5 rounded-full blur-[120px] pointer-events-none z-0" />
			<div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] max-w-[600px] bg-gold/10 rounded-full blur-[120px] pointer-events-none z-0" />

			<div className="relative z-10 container mx-auto px-4 lg:px-8 pt-28 pb-20">
				{/* Back link */}
				<Link
					href="/certificates"
					className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-10 group">
					<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
					Volver a consultar
				</Link>

				{/* Loading */}
				{isLoading && <VerifyCertificateSkeleton />}

				{/* Error / Not found */}
				{isError && (
					<div className="max-w-2xl mx-auto animate-fade-in-up">
						<div className="bg-card border border-destructive/20 rounded-[2rem] shadow-2xl overflow-hidden backdrop-blur-sm">
							<div className="bg-destructive/5 px-8 py-12 flex flex-col items-center gap-6 text-center border-b border-border/50">
								<div className="w-20 h-20 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center animate-bounce">
									<ShieldX className="w-10 h-10 text-destructive" />
								</div>
								<div className="space-y-3">
									<h1 className="text-3xl font-extrabold text-foreground tracking-tight">
										Búsqueda sin resultados
									</h1>
									<p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
										La consulta con el valor{" "}
										<span className="inline-block px-2 py-0.5 bg-foreground/10 text-foreground font-mono font-bold rounded-md mx-1">
											{code}
										</span>{" "}
										no corresponde a ningún certificado registrado o a un participante en nuestra base de datos.
									</p>
								</div>
							</div>
							<div className="px-8 py-8 flex flex-col sm:flex-row gap-4 justify-center bg-background/50">
								<button
									onClick={() => router.push("/certificates")}
									className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base bg-foreground text-background hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
									<ArrowLeft className="w-5 h-5" />
									Intentar de nuevo
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Success */}
				{certificates.length > 0 && student && (
					<div className="max-w-4xl mx-auto space-y-12 animate-fade-in-up">
						
						{/* Header global info - Student Profile */}
						<div className="bg-card border border-border/60 rounded-[2rem] shadow-lg p-8 relative overflow-hidden group">
							{/* Subtle background gradient */}
							<div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -z-10 group-hover:bg-gold/10 transition-colors duration-700"></div>
							
							<div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
								{/* Avatar / Shield */}
								<div className="shrink-0">
									<div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/10 border-4 border-card outline outline-2 outline-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] relative">
										<ShieldCheck className="w-10 h-10 text-emerald-500 relative z-10" />
										<div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-card">
											<CheckCircle2 className="w-4 h-4" />
										</div>
									</div>
								</div>

								{/* Student Info */}
								<div className="flex-1 space-y-4">
									<div>
										<h2 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
											<UserIcon className="w-4 h-4" />
											Estudiante Verificado
										</h2>
										<h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
											{student.full_name || "Nombre no registrado"}
										</h1>
									</div>

									<div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
										<div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 border border-border/50 text-sm font-medium text-muted-foreground">
											{searchType === "document" ? (
												<FileText className="w-4 h-4 text-primary dark:text-blue-400" />
											) : (
												<Code2 className="w-4 h-4 text-primary dark:text-blue-400" />
											)}
											<span>
												Búsqueda por {searchType === "document" ? "documento" : "código"}:{" "}
												<strong className="text-foreground font-mono">{code}</strong>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Certificates Section */}
						<div className="space-y-6">
							<div className="flex items-center gap-3 px-2">
								<Award className="w-6 h-6 text-gold" />
								<h3 className="text-xl font-bold text-foreground">
									{searchType === "document" 
										? `Certificados Encontrados (${certificates.length})` 
										: "Detalle del Certificado"}
								</h3>
							</div>

							<div className="grid grid-cols-1 gap-12">
								{certificates.map((certItem, index) => {
									const { certificate, course } = certItem;
									const viewUrl = certificate.drive_file_id
										? `https://drive.google.com/file/d/${certificate.drive_file_id}/view`
										: certificate.pdf_url;
									
									const embedUrl = getEmbedUrl(viewUrl);
									const isLoaded = loadedIframes[certificate.id];

									return (
										<div 
											key={certificate.id} 
											className="group bg-card/60 backdrop-blur-sm border border-border/60 hover:border-border rounded-[1.5rem] shadow-sm hover:shadow-xl overflow-hidden flex flex-col transition-all duration-500 relative"
											style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
										>
											<div className="absolute inset-0 bg-linear-to-r from-transparent via-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
											
											{/* Top details section */}
											<div className="px-6 py-6 md:px-8 md:py-8 flex flex-col md:flex-row gap-6 md:items-center justify-between relative z-10">
												<div className="flex-1 space-y-5">
													{/* Course Title */}
													<div>
														<p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1.5 flex items-center gap-2">
															<BookOpen className="w-3.5 h-3.5" />
															Programa / Curso
														</p>
														<h4 className="text-xl md:text-2xl font-bold text-foreground leading-tight group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
															{course.title || "Curso no especificado"}
														</h4>
													</div>

													<div className="flex flex-wrap gap-x-8 gap-y-4">
														<div className="space-y-1.5">
															<p className="text-xs text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-1.5">
																<Code2 className="w-3.5 h-3.5" />
																Código Único
															</p>
															<p className="text-sm font-mono font-bold bg-background px-3 py-1.5 rounded-lg border border-border w-fit text-foreground">
																{certificate.certificate_code}
															</p>
														</div>
														<div className="space-y-1.5">
															<p className="text-xs text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-1.5">
																<Calendar className="w-3.5 h-3.5" />
																Fecha Emisión
															</p>
															<p className="text-sm font-medium px-3 py-1.5 text-foreground">
																{formatDate(certificate.issued_at)}
															</p>
														</div>
													</div>
												</div>
												
												{/* Actions */}
												{viewUrl && (
													<div className="shrink-0 md:pl-8 md:border-l border-border/50 mt-4 md:mt-0 flex flex-col sm:flex-row md:flex-col gap-3">
														<a
															href={viewUrl}
															target="_blank"
															rel="noopener noreferrer"
															className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-muted/50 border border-border/50 text-foreground hover:bg-muted transition-all w-full sm:w-auto"
														>
															<ExternalLink className="w-4 h-4" />
															Abrir en Drive
														</a>
													</div>
												)}
											</div>

											{/* Embedded PDF Viewer Section */}
											{embedUrl && (
												<div className="border-t border-border/50 bg-muted/10 p-4 sm:p-6 md:p-8 relative z-10">
													<div className="w-full relative bg-card rounded-xl border border-border overflow-hidden shadow-inner flex items-center justify-center" style={{ aspectRatio: '1.414 / 1' }}>
														{/* Loading state for the iframe */}
														{!isLoaded && (
															<div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
																<Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
																<span className="text-sm font-medium text-muted-foreground">
																	Cargando documento original...
																</span>
															</div>
														)}
														
														{/* The embedded document */}
														<iframe
															src={embedUrl}
															onLoad={() => handleIframeLoad(certificate.id)}
															className={`w-full h-full border-0 absolute inset-0 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
															allow="autoplay"
															title={`Certificado ${course.title}`}
														/>
													</div>
												</div>
											)}
										</div>
									);
								})}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

function VerifyCertificateSkeleton() {
	return (
		<div className="max-w-4xl mx-auto space-y-12 animate-pulse mt-8">
			{/* Student Profile Skeleton */}
			<div className="bg-card border border-border/60 rounded-[2rem] shadow-lg p-8 relative overflow-hidden">
				<div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
					<div className="w-24 h-24 rounded-full bg-muted shrink-0" />
					<div className="flex-1 space-y-4 w-full">
						<div className="flex flex-col items-center md:items-start gap-3">
							<div className="w-40 h-4 bg-muted rounded" />
							<div className="w-64 h-8 bg-muted rounded" />
						</div>
						<div className="flex justify-center md:justify-start mt-4">
							<div className="w-48 h-8 bg-muted rounded-xl" />
						</div>
					</div>
				</div>
			</div>

			{/* Certificates Section Skeleton */}
			<div className="space-y-6">
				<div className="flex items-center gap-3 px-2">
					<div className="w-6 h-6 rounded-full bg-muted" />
					<div className="w-48 h-6 bg-muted rounded" />
				</div>
				<div className="grid grid-cols-1 gap-12">
					{[1].map((i) => (
						<div key={i} className="bg-card/60 border border-border/60 rounded-[1.5rem] p-6 md:p-8 flex flex-col relative">
							<div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-8">
								<div className="flex-1 space-y-5">
									<div className="space-y-2">
										<div className="w-32 h-3 bg-muted rounded" />
										<div className="w-3/4 max-w-sm h-6 bg-muted rounded" />
									</div>
									<div className="flex gap-8">
										<div className="space-y-2">
											<div className="w-24 h-3 bg-muted rounded" />
											<div className="w-32 h-8 bg-muted rounded-lg" />
										</div>
										<div className="space-y-2">
											<div className="w-24 h-3 bg-muted rounded" />
											<div className="w-32 h-8 bg-muted rounded-lg" />
										</div>
									</div>
								</div>
								<div className="w-full md:w-32 h-12 bg-muted rounded-xl shrink-0" />
							</div>
							
							{/* Iframe skeleton */}
							<div className="border-t border-border/50 bg-muted/10 p-4 sm:p-6 md:p-8 -mx-6 -mb-6 md:-mx-8 md:-mb-8 rounded-b-[1.5rem]">
								<div className="w-full aspect-[1.414/1] bg-muted rounded-xl border border-border"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
