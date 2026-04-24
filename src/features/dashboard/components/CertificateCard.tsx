import Link from "next/link";
import { Award, ExternalLink, Calendar } from "lucide-react";
import type { CertificateWithCourse } from "../services/dashboard.service";

interface Props {
	certificate: CertificateWithCourse;
}

function formatDate(dateStr: string) {
	return new Date(dateStr).toLocaleDateString("es-PE", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export function CertificateCard({ certificate }: Props) {
	const { course, certificate_code, issued_at, pdf_url, drive_file_id } =
		certificate;

	const viewUrl =
		pdf_url ??
		(drive_file_id
			? `https://drive.google.com/file/d/${drive_file_id}/view`
			: null);

	return (
		<div className="relative flex flex-col rounded-2xl border border-gold/30 bg-card overflow-hidden hover:border-gold/60 hover:shadow-lg hover:shadow-gold/10 transition-all duration-300 group">
			{/* Gold accent header */}
			<div className="relative h-24 bg-linear-to-br from-primary/90 to-secondary/90 flex items-center justify-center overflow-hidden">
				<div className="absolute -top-6 -right-6 w-24 h-24 bg-gold/20 rounded-full blur-2xl" />
				<div className="absolute bottom-0 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-xl" />
				<div className="relative z-10 flex flex-col items-center gap-1">
					<div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
						<Award className="w-6 h-6 text-gold" />
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="p-5 flex flex-col flex-1">
				<h3 className="font-bold text-foreground text-sm leading-snug line-clamp-2 mb-1 group-hover:text-primary transition-colors">
					{course?.title ?? "Certificado de curso"}
				</h3>

				<div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
					<Calendar className="w-3.5 h-3.5 shrink-0" />
					<span>{formatDate(issued_at)}</span>
				</div>

				{/* Certificate code */}
				<div className="px-3 py-2 rounded-xl bg-muted/60 border border-border/50 mb-4">
					<p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
						Código de certificado
					</p>
					<p className="text-xs font-mono font-bold text-foreground truncate">
						{certificate_code}
					</p>
				</div>

				{/* Gold badge */}
				<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/10 border border-gold/25 text-gold text-[11px] font-bold mb-4 w-fit">
					<Award className="w-3 h-3" />
					Certificado oficial
				</div>

				{/* Actions */}
				<div className="mt-auto flex flex-col gap-2">
					<Link
						href={`/certificates/verify/${encodeURIComponent(certificate_code)}`}
						className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-primary/10 text-primary hover:bg-primary/20 border border-primary/25 transition-all">
						<Award className="w-4 h-4" />
						Ver verificación
					</Link>
					{viewUrl ? (
						<a
							href={viewUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-gold/10 text-gold hover:bg-gold/20 border border-gold/25 transition-all">
							<ExternalLink className="w-4 h-4" />
							Ver certificado
						</a>
					) : (
						<p className="text-center text-xs text-muted-foreground py-2">
							PDF no disponible aún
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
