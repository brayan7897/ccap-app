"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
	BookOpen,
	Infinity as InfinityIcon,
	Trophy,
	Smartphone,
	Video,
	Clock,
	AlertCircle,
	CheckCircle2,
	UserX,
	ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Course } from "@/types";
import { useUser, useRequestAccess } from "@/features/auth/hooks/useAuth";
import { useEnroll } from "../hooks/useCourses";
import { useEnrollmentsStore } from "@/store/enrollments-store";
import { useMyEnrollments } from "@/features/dashboard/hooks/useDashboard";
import { useCompanyInfo } from "@/features/site/hooks/useCompanyInfo";

interface CourseEnrollCardProps {
	course: Course;
}

function WhatsAppIcon({ className }: { className?: string }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
			<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
		</svg>
	);
}

export function CourseEnrollCard({ course }: CourseEnrollCardProps) {
	const router = useRouter();
	const { data: user } = useUser();
	const enrollMutation = useEnroll();
	const requestAccessMutation = useRequestAccess();
	const isEnrolled = useEnrollmentsStore((s) => s.isEnrolled(course.id));
	const { isLoading: loadingEnrollments } = useMyEnrollments(); // populate store
	const { data: companyInfo } = useCompanyInfo();

	const courseAccess = user?.course_access;

	// ── Price display ────────────────────────────────────────────────────────────
	const priceDisplay =
		course.course_type === "PAID" && course.price != null
			? `S/. ${course.price.toFixed(2)}`
			: "Gratis";

	// ── WhatsApp contact link (paid courses) ───────────────────────────────────────
	const rawPhone = companyInfo?.phone_number?.replace(/\D/g, "") ?? "";
	const waNumber = rawPhone
		? rawPhone.startsWith("51") ? rawPhone : `51${rawPhone}`
		: "51905517549"; // fallback al número del seed
	const waMessage = `Hola, estoy interesado en matricularme en el curso "${course.title}"${
		course.price != null ? ` (S/. ${course.price.toFixed(2)})` : ""
	}. ¿Me pueden brindar información sobre el proceso de pago y matrícula?`;
	const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

	// Primary CTA already offers a WhatsApp button only once the user is logged in,
	// active, and not yet enrolled — show the lighter "Contáctanos" link otherwise.
	const primaryCtaIsWhatsApp =
		course.course_type === "PAID" && !!user && user.is_active && !isEnrolled;
	const showContactLink =
		course.course_type === "PAID" && !isEnrolled && !primaryCtaIsWhatsApp;

	// ── CTA section ──────────────────────────────────────────────────────────────
	function renderCTA() {
		// While enrollment data is loading, show a neutral skeleton so we never
		// flash the wrong CTA (e.g. the WhatsApp button for an enrolled user).
		if (user && loadingEnrollments) {
			return (
				<div className="space-y-3 animate-pulse">
					<div className="h-14 rounded-xl bg-muted" />
					<div className="h-4 bg-muted rounded w-3/4 mx-auto" />
				</div>
			);
		}

		// Not authenticated — let them express intent (comprar / inscribirse), then
		// warn that login is required before sending them to /login.
		if (!user) {
			const isPaid = course.course_type === "PAID" && course.price != null;
			return (
				<Button
					className="w-full h-14 text-base font-bold rounded-xl bg-ring text-white dark:text-background hover:bg-ring/90"
					onClick={() => {
						toast.info(
							isPaid
								? "Inicia sesión para comprar este curso."
								: "Inicia sesión para inscribirte en este curso.",
						);
						router.push("/login");
					}}
				>
					{isPaid ? "Comprar" : "Inscribirme ahora"}
				</Button>
			);
		}

		// Account inactive — must be activated by admin before doing anything
		if (!user.is_active) {
			return (
				<div className="flex items-start gap-3 rounded-xl bg-muted border border-border p-4 text-sm">
					<UserX className="h-5 w-5 mt-0.5 shrink-0 text-muted-foreground" />
					<div>
						<p className="font-semibold text-foreground">Cuenta inactiva</p>
						<p className="text-muted-foreground mt-0.5 leading-relaxed">
							Tu cuenta aún no ha sido activada. Una vez que un administrador la
							active podrás inscribirte en los cursos.
						</p>
					</div>
				</div>
			);
		}

		// Already enrolled
		if (isEnrolled) {
			const firstLessonId = course.modules?.[0]?.lessons?.[0]?.id;
			const lessonHref = firstLessonId
				? `/dashboard/cursos/${course.slug}/leccion/${firstLessonId}`
				: `/dashboard/mis-cursos`;
			return (
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
						<CheckCircle2 className="h-5 w-5" />
						<span>Ya estás inscrito</span>
					</div>
					<Button asChild className="w-full h-12 font-bold rounded-xl bg-ring text-white dark:text-background hover:bg-ring/90">
						<Link href={lessonHref}>Ver contenido del curso</Link>
					</Button>
				</div>
			);
		}

		// Paid course — must contact admin via WhatsApp
		if (course.course_type === "PAID") {
			return (
				<div className="space-y-3">
					
					<Button asChild className="w-full h-14 text-base font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all hover:-translate-y-1">
						<a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
							<WhatsAppIcon className="w-6 h-6 mr-2" />
							Contactar por WhatsApp
						</a>
					</Button>
				</div>
			);
		}

		// Access: NONE — check profile completeness first
		if (courseAccess === "NONE") {
			// If the user is missing required profile data, guide them to complete it
			// instead of showing a request button that will fail.
			const profileComplete =
				!!user.document_number?.trim() && !!user.phone_number?.trim();

			if (!profileComplete) {
				return (
					<div className="space-y-3">
						<div className="flex items-start gap-2 rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 text-sm">
							<ClipboardList className="h-4 w-4 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
							<span className="text-amber-700 dark:text-amber-300">
								Completa tu perfil (documento y teléfono) para poder solicitar
								acceso.
							</span>
						</div>
						<Button
							asChild
							variant="outline"
							className="w-full h-12 font-bold rounded-xl border-amber-500/50 text-amber-700 dark:text-amber-300 hover:bg-amber-500/10">
							<Link href="/dashboard/perfil">Completar mi perfil →</Link>
						</Button>
					</div>
				);
			}

			return (
				<div className="space-y-3">
					<div className="flex items-start gap-2 rounded-xl bg-muted/60 p-3 text-sm text-muted-foreground">
						<AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
						<span>
							Necesitas acceso aprobado para inscribirte en los cursos gratuitos.
						</span>
					</div>
					<Button
						onClick={() => requestAccessMutation.mutate()}
						disabled={requestAccessMutation.isPending}
						className="w-full h-12 font-bold rounded-xl bg-ring text-white dark:text-background hover:bg-ring/90">
						{requestAccessMutation.isPending
							? "Enviando solicitud..."
							: "Solicitar acceso"}
					</Button>
				</div>
			);
		}

		// Access: PENDING — waiting for admin
		if (courseAccess === "PENDING") {
			return (
				<div className="flex items-start gap-2 rounded-xl bg-yellow-500/10 border border-yellow-500/30 p-4 text-sm">
					<Clock className="h-4 w-4 mt-0.5 shrink-0 text-yellow-600 dark:text-yellow-400" />
					<span className="text-yellow-700 dark:text-yellow-300 font-medium">
						Tu solicitud está siendo revisada. Te notificaremos cuando sea
						aprobada.
					</span>
				</div>
			);
		}

		// Access: REJECTED — can re-request
		if (courseAccess === "REJECTED") {
			return (
				<div className="space-y-3">
					<div className="flex items-start gap-2 rounded-xl bg-destructive/10 border border-destructive/30 p-3 text-sm">
						<AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-destructive" />
						<span className="text-destructive font-medium">
							Tu solicitud fue rechazada.
						</span>
					</div>
					<Button
						onClick={() => requestAccessMutation.mutate()}
						disabled={requestAccessMutation.isPending}
						variant="outline"
						className="w-full h-12 font-bold rounded-xl">
						{requestAccessMutation.isPending
							? "Enviando..."
							: "Solicitar nuevamente"}
					</Button>
				</div>
			);
		}

		// Access: APPROVED — depends on course type
		if (courseAccess === "APPROVED") {
			return (
				<Button
					onClick={() => enrollMutation.mutate(course.id)}
					disabled={enrollMutation.isPending}
					className="w-full h-14 text-base font-bold rounded-xl shadow-lg transition-all hover:-translate-y-1 bg-ring text-white dark:text-background hover:bg-ring/90">
					{enrollMutation.isPending ? "Inscribiendo..." : "Inscribirme Ahora"}
				</Button>
			);
		}

		return null;
	}

	return (
		<div className="rounded-3xl bg-card border border-border/60 shadow-xl overflow-hidden sticky top-24">
			{/* Thumbnail */}
			<div className="relative aspect-video w-full bg-muted">
				{course.thumbnail_url ? (
					<Image
						src={course.thumbnail_url}
						alt={course.title}
						fill
						className="object-cover"
					/>
				) : (
					<div className="flex h-full items-center justify-center text-muted-foreground bg-muted/50">
						<BookOpen className="h-12 w-12 opacity-50" />
					</div>
				)}
			</div>

			<div className="p-6 md:p-8">
				{/* Price — hidden once the user is already enrolled */}
				{!isEnrolled && (
					<div className="mb-6">
						{course.course_type === "PAID" && course.price != null ? (
							<div className="flex flex-col gap-1.5">
								<span className="text-3xl font-black tracking-tight text-foreground tabular-nums">
									S/. {course.price.toFixed(2)}
								</span>
								<span className="text-sm font-semibold text-muted-foreground">
									Pago y matrícula vía WhatsApp
								</span>
							</div>
						) : (
							<div className="text-3xl font-black text-foreground">
								Gratis
							</div>
						)}
					</div>
				)}

				{renderCTA()}

				<div className="mt-6 space-y-4">
					<h4 className="text-sm font-bold text-foreground">
						Este curso incluye:
					</h4>
					<ul className="space-y-3">
						<li className="flex items-center gap-3 text-sm text-muted-foreground">
							<Video className="w-4 h-4 text-ring" />
							<span>{course.total_lessons || 0} lecciones en video/texto</span>
						</li>
						<li className="flex items-center gap-3 text-sm text-muted-foreground">
							<InfinityIcon className="w-4 h-4 text-ring" />
							<span>Acceso de por vida</span>
						</li>
						<li className="flex items-center gap-3 text-sm text-muted-foreground">
							<Smartphone className="w-4 h-4 text-ring" />
							<span>Acceso en dispositivos móviles y TV</span>
						</li>
						<li className="flex items-center gap-3 text-sm text-muted-foreground">
							<Trophy className="w-4 h-4 text-ring" />
							<span>Certificado de finalización</span>
						</li>
					</ul>

					{showContactLink && (
						<a
							href={waLink}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center gap-2 pt-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
						>
							<WhatsAppIcon className="w-4 h-4" />
							¿Tienes dudas? Contáctanos
						</a>
					)}
				</div>

				<div className="mt-8 pt-6 border-t border-border/50 text-center">
					<p className="text-xs text-muted-foreground">
						Pago coordinado directamente con CCAP
					</p>
				</div>
			</div>
		</div>
	);
}
