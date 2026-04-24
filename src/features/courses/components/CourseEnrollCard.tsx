"use client";

import Image from "next/image";
import Link from "next/link";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Course } from "@/types";
import { useUser, useRequestAccess } from "@/features/auth/hooks/useAuth";
import { useEnroll } from "../hooks/useCourses";
import { useEnrollmentsStore } from "@/store/enrollments-store";
import { useMyEnrollments } from "@/features/dashboard/hooks/useDashboard";

interface CourseEnrollCardProps {
	course: Course;
}

export function CourseEnrollCard({ course }: CourseEnrollCardProps) {
	const { data: user } = useUser();
	const enrollMutation = useEnroll();
	const requestAccessMutation = useRequestAccess();
	const isEnrolled = useEnrollmentsStore((s) => s.isEnrolled(course.id));
	useMyEnrollments(); // ensure enrollment store is populated when visiting course detail

	const courseAccess = user?.course_access;

	// ── Price display ────────────────────────────────────────────────────────────
	const priceDisplay =
		course.course_type === "PAID" && course.price != null
			? `S/. ${course.price.toFixed(2)}`
			: "Gratis";

	// ── CTA section ──────────────────────────────────────────────────────────────
	function renderCTA() {
		// Not authenticated
		if (!user) {
			return (
				<Button asChild className="w-full h-14 text-base font-bold rounded-xl">
					<Link href="/login">Inicia sesión para inscribirte</Link>
				</Button>
			);
		}

		// Account inactive — must be activated by admin before doing anything
		if (!user.is_active) {
			return (
				<div className="flex items-start gap-3 rounded-xl bg-muted border border-border p-4 text-sm">
					<UserX className="h-5 w-5 mt-0.5 shrink-0 text-muted-foreground" />
					<div>
						<p className="font-semibold text-foreground">
							Cuenta inactiva
						</p>
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
					<Button asChild className="w-full h-12 font-bold rounded-xl">
						<Link href={lessonHref}>Ver contenido del curso</Link>
					</Button>
				</div>
			);
		}

		// Access: NONE — needs to request
		if (courseAccess === "NONE") {
			return (
				<div className="space-y-3">
					<div className="flex items-start gap-2 rounded-xl bg-muted/60 p-3 text-sm text-muted-foreground">
						<AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
						<span>
							Necesitas acceso aprobado para inscribirte en los cursos.
						</span>
					</div>
					<Button
						onClick={() => requestAccessMutation.mutate()}
						disabled={requestAccessMutation.isPending}
						className="w-full h-12 font-bold rounded-xl">
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
			if (course.course_type === "PAID") {
				return (
					<div className="space-y-3">
						<div className="text-center text-2xl font-black text-foreground">
							{priceDisplay}
						</div>
						<div className="rounded-xl bg-muted/60 p-3 text-sm text-muted-foreground text-center">
							Este curso es de pago. Contacta a un administrador para
							inscribirte.
						</div>
					</div>
				);
			}

			return (
				<Button
					onClick={() => enrollMutation.mutate(course.id)}
					disabled={enrollMutation.isPending}
					className="w-full h-14 text-base font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_8px_30px_-10px_rgba(var(--primary-rgb),0.5)] transition-all hover:-translate-y-1">
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
				<div className="text-3xl font-black text-foreground mb-6">
					{priceDisplay}
				</div>

				{renderCTA()}

				<div className="mt-6 space-y-4">
					<h4 className="text-sm font-bold text-foreground">
						Este curso incluye:
					</h4>
					<ul className="space-y-3">
						<li className="flex items-center gap-3 text-sm text-muted-foreground">
							<Video className="w-4 h-4 text-primary" />
							<span>{course.total_lessons || 0} lecciones en video/texto</span>
						</li>
						<li className="flex items-center gap-3 text-sm text-muted-foreground">
							<InfinityIcon className="w-4 h-4 text-primary" />
							<span>Acceso de por vida</span>
						</li>
						<li className="flex items-center gap-3 text-sm text-muted-foreground">
							<Smartphone className="w-4 h-4 text-primary" />
							<span>Acceso en dispositivos móviles y TV</span>
						</li>
						<li className="flex items-center gap-3 text-sm text-muted-foreground">
							<Trophy className="w-4 h-4 text-primary" />
							<span>Certificado de finalización</span>
						</li>
					</ul>
				</div>

				<div className="mt-8 pt-6 border-t border-border/50 text-center">
					<p className="text-xs text-muted-foreground">
						Garantía de reembolso de 30 días
					</p>
				</div>
			</div>
		</div>
	);
}
