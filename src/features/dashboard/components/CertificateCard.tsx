import Link from "next/link";
import { Award, ExternalLink, Calendar, BookOpen, User } from "lucide-react";
import type { CertificateWithCourse } from "../services/dashboard.service";
import { SmartImage } from "@/components/ui/SmartImage";

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

	const categoryColor =
		course?.category_color ||
		course?.category?.color ||
		null;

	const instructorName = course?.instructor
		? `${course.instructor.first_name} ${course.instructor.last_name}`
		: null;

	const courseTitle = course?.title ?? certificate.course_title ?? "Certificado de curso";

	return (
		<div className="relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 group">
			{/* Thumbnail with overlays */}
			<div className="relative aspect-video w-full bg-muted overflow-hidden">
				<SmartImage
					src={course?.thumbnail_url}
					alt={courseTitle}
					fill
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
					className="object-cover transition-transform duration-500 group-hover:scale-105"
					fallback={
						<div className="flex h-full items-center justify-center bg-gold/5">
							<Award className="w-12 h-12 text-gold/30" />
						</div>
					}
				/>

				{/* Category badge — category color confined to the dot per system rule */}
				{(course?.category_name || course?.category?.name) && (
					<div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm bg-black/60 text-white z-10">
						{categoryColor && (
							<span
								className="w-1.5 h-1.5 rounded-full shrink-0 ring-1 ring-white/30"
								style={{ backgroundColor: categoryColor }}
							/>
						)}
						{course?.category_name ?? course?.category?.name}
					</div>
				)}

				{/* Certificate seal — gold circle anchored bottom-right */}
				<div className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-gold shadow-lg border-2 border-white/20 flex items-center justify-center z-10">
					<Award className="w-5 h-5 text-white" />
				</div>
			</div>

			{/* Gold signature strip — "earned" marker, gold reserved for this */}
			<div className="h-0.5 w-full bg-gold" />

			<div className="p-5 flex flex-col flex-1">
				{/* Title */}
				<h3 className="font-bold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-ring transition-colors duration-200">
					{courseTitle}
				</h3>

				{/* Instructor */}
				{instructorName && (
					<div className="flex items-center gap-1.5 mt-1.5 mb-3">
						<User className="w-3 h-3 text-muted-foreground shrink-0" />
						<p className="text-xs text-muted-foreground truncate">
							{instructorName}
						</p>
					</div>
				)}

				{/* Course stats */}
				{course?.total_lessons != null && course.total_lessons > 0 && (
					<div className="flex items-center gap-1.5 mb-4 text-xs text-muted-foreground">
						<BookOpen className="w-3.5 h-3.5 shrink-0" />
						<span>{course.total_lessons} lecciones</span>
					</div>
				)}

				{/* Issue date — prominent, gold accent */}
				<div className="flex items-center gap-2 mb-3">
					<Calendar className="w-3.5 h-3.5 text-gold shrink-0" />
					<span className="text-xs font-semibold text-foreground">
						Emitido el {formatDate(issued_at)}
					</span>
				</div>

				{/* Certificate code */}
				<div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-muted/50 border border-border/60 mb-5">
					<span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider shrink-0">
						Código
					</span>
					<span className="text-xs font-mono font-bold text-foreground truncate ml-2">
						{certificate_code}
					</span>
				</div>

				{/* Actions */}
				<div className="mt-auto flex flex-col gap-1.5">
					{viewUrl ? (
						<a
							href={viewUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-bold bg-ring/10 text-ring border border-ring/25 hover:bg-ring/15 transition-all">
							<ExternalLink className="w-4 h-4" />
							Ver certificado
						</a>
					) : (
						<p className="text-center text-xs text-muted-foreground py-2">
							PDF no disponible aún
						</p>
					)}
					<Link
						href={`/certificates/verify/${encodeURIComponent(certificate_code)}`}
						className="flex items-center justify-center gap-1.5 h-9 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
						Verificar autenticidad
					</Link>
				</div>
			</div>
		</div>
	);
}
