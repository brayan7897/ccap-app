import { X, ExternalLink, Loader2, Download } from "lucide-react";
import { useEffect, useState } from "react";

interface CertificateViewerModalProps {
	isOpen: boolean;
	onClose: () => void;
	pdfUrl: string | null;
	title: string;
}

function getEmbedUrl(url: string | null) {
	if (!url) return "";
	// Convert Drive /view URL to /preview for iframe embedding
	if (url.includes("drive.google.com") && url.includes("/view")) {
		return url.replace(/\/view.*/, "/preview");
	}
	return url;
}

export function CertificateViewerModal({
	isOpen,
	onClose,
	pdfUrl,
	title,
}: CertificateViewerModalProps) {
	const [isLoading, setIsLoading] = useState(true);
	const embedUrl = getEmbedUrl(pdfUrl);

	// Prevent background scrolling when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
			setIsLoading(true);
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 animate-in fade-in duration-300">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-background/80 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal Content */}
			<div className="relative w-full max-w-5xl h-[85vh] bg-card border border-border rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
				{/* Header */}
				<div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-muted/30">
					<div className="flex items-center gap-3 truncate">
						<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
							<ExternalLink className="w-4 h-4 text-primary" />
						</div>
						<h3 className="font-bold text-foreground truncate">
							{title || "Visor de Certificado"}
						</h3>
					</div>
					<div className="flex items-center gap-2 shrink-0">
						{pdfUrl && (
							<a
								href={pdfUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-background border border-border text-foreground hover:bg-muted transition-colors"
								title="Abrir en pestaña nueva"
							>
								<ExternalLink className="w-4 h-4" />
								<span className="hidden sm:inline">Abrir en Drive</span>
							</a>
						)}
						<button
							onClick={onClose}
							className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
						>
							<X className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* Iframe Container */}
				<div className="flex-1 relative bg-muted/10 w-full h-full">
					{isLoading && (
						<div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-card/50 backdrop-blur-sm z-10">
							<Loader2 className="w-10 h-10 text-primary animate-spin" />
							<p className="text-sm font-medium text-muted-foreground">
								Cargando documento seguro...
							</p>
						</div>
					)}

					{embedUrl ? (
						<iframe
							src={embedUrl}
							className="w-full h-full border-0"
							onLoad={() => setIsLoading(false)}
							title="Visor de PDF"
							allow="autoplay"
						/>
					) : (
						<div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
							<p className="text-muted-foreground">Documento no disponible</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
