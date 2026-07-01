"use client";

import { useMemo } from "react";
import {
	BookOpen,
	Award,
	CheckCircle,
	TrendingUp,
	AlertCircle,
	Clock,
	ShieldCheck,
	ShieldX,
	LifeBuoy,
	MessageCircle,
	Mail,
	UserX,
	ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { useUser, useRequestAccess } from "@/features/auth/hooks/useAuth";
import {
	useMyEnrollments,
	useMyCertificates,
} from "@/features/dashboard/hooks/useDashboard";
import { useCourses } from "@/features/courses/hooks/useCourses";
import { DashboardStatCard } from "@/features/dashboard/components/DashboardStatCard";
import { EnrollmentProgressCard } from "@/features/dashboard/components/EnrollmentProgressCard";
import {
	CourseCard,
	type CourseCardProps,
} from "@/components/courses/CourseCard";
import { Button } from "@/components/ui/button";
import type { Course, User } from "@/types";

/**
 * Returns true when the user has the minimum data required to request course access:
 * - document_number filled in (not empty — Google users skip this on signup)
 * - phone_number filled in (needed by the company for contact)
 */
function hasRequiredProfileData(user: User): boolean {
	return !!user.document_number?.trim() && !!user.phone_number?.trim();
}

function toCardProps(course: Course): CourseCardProps {
	return {
		id: course.id,
		slug: course.slug,
		title: course.title,
		short_description: course.short_description,
		thumbnail_url: course.thumbnail_url,
		course_level: course.course_level,
		instructor_name: course.instructor
			? `${course.instructor.first_name} ${course.instructor.last_name}`
			: undefined,
		category_name: course.category_name || course.category?.name || undefined,
		category_color: course.category_color || course.category?.color || undefined,
		tags: course.tags,
		total_lessons: course.total_lessons,
		total_duration: course.total_duration_seconds
			? `${Math.round(course.total_duration_seconds / 3600)} horas`
			: undefined,
		enrolled_count: course.enrolled_count,
		course_type: course.course_type,
		price: course.price,
	};
}

export default function DashboardHomePage() {
	const { data: user } = useUser();
	const { data: enrollments, isLoading: loadingEnrollments } =
		useMyEnrollments();
	const { data: certificates, isLoading: loadingCerts } = useMyCertificates();
	const { data: courses, isLoading: loadingCourses } = useCourses(0, 6);
	const requestAccessMutation = useRequestAccess();

	const missingText = useMemo(() => {
		const missingDoc = !user?.document_number?.trim();
		const missingPhone = !user?.phone_number?.trim();
		if (missingDoc && !missingPhone) return "tu número de documento (DNI/CE/Pasaporte)";
		if (!missingDoc && missingPhone) return "un número de teléfono de contacto";
		return "tu número de documento (DNI/CE/Pasaporte) y un número de teléfono de contacto";
	}, [user?.document_number, user?.phone_number]);

	// Derived enrollment lists — memoized so filter/sort/slice don't run on
	// every render (this component re-renders ~8 times during initial page load
	// as user, enrollments, certificates and courses queries resolve)
	const { activeEnrollments, completedEnrollments, inProgressEnrollments } =
		useMemo(() => {
			const activeEnrollments =
				enrollments?.filter((e) => e.status === "ACTIVE") ?? [];
			const completedEnrollments =
				enrollments?.filter((e) => e.status === "COMPLETED") ?? [];
			const inProgressEnrollments = activeEnrollments
				.filter((e) => e.progress_percentage < 100)
				.sort((a, b) => b.progress_percentage - a.progress_percentage)
				.slice(0, 3);
			return { activeEnrollments, completedEnrollments, inProgressEnrollments };
		}, [enrollments]);

	const stats = useMemo(
		() => [
			{
				label: "Cursos activos",
				value: activeEnrollments.length,
				icon: BookOpen,
				color: "text-ring",
				bg: "bg-ring/10",
				loading: loadingEnrollments,
			},
			{
				label: "Completados",
				value: completedEnrollments.length,
				icon: CheckCircle,
				color: "text-emerald-500",
				bg: "bg-emerald-500/10",
				loading: loadingEnrollments,
			},
			{
				label: "Certificados",
				value: certificates?.length ?? 0,
				icon: Award,
				color: "text-gold",
				bg: "bg-gold/10",
				loading: loadingCerts,
			},
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[activeEnrollments.length, completedEnrollments.length, certificates?.length, loadingEnrollments, loadingCerts],
	);

	return (
		<div className="p-4 lg:p-8 max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)]">
			<div className="flex flex-col lg:flex-row gap-0">
				{/* ── MAIN CONTENT (Left Column) — ordered after the sidebar on mobile
				    so account/access banners surface before the course grid ── */}
				<div className="order-2 lg:order-1 flex-1 space-y-10 min-w-0 lg:pr-8 lg:border-r border-border">
					{/* ── Continue learning ──────────────────────────────────────────── */}
					{(loadingEnrollments || inProgressEnrollments.length > 0) && (
						<section>
							<div className="flex items-end justify-between mb-5 gap-4">
								<div>
									<p className="text-[11px] font-bold text-ring uppercase tracking-widest mb-1.5">
										En progreso
									</p>
									<h2 className="text-2xl font-black text-foreground tracking-tight">
										Continúa aprendiendo
									</h2>
								</div>
								<a
									href="/dashboard/mis-cursos"
									className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-foreground border border-border hover:border-ring/40 hover:bg-secondary/50 rounded-full px-4 py-2 transition-all">
									Ver todos
									<span aria-hidden>→</span>
								</a>
							</div>

							{loadingEnrollments ? (
								<div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
									{[1, 2, 3].map((i) => (
										<div
											key={i}
											className="rounded-2xl border border-border bg-card animate-pulse">
											<div className="aspect-video bg-muted rounded-t-2xl" />
											<div className="p-4 space-y-3">
												<div className="h-4 bg-muted rounded w-3/4" />
												<div className="h-3 bg-muted rounded w-full" />
												<div className="h-8 bg-muted rounded-xl w-full" />
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
									{inProgressEnrollments.map((enrollment) => (
										<EnrollmentProgressCard
											key={enrollment.id}
											enrollment={enrollment}
										/>
									))}
								</div>
							)}
						</section>
					)}

					{/* ── Recommended courses ───────────────────────────────────────── */}
					<section>
						<div className="flex items-end justify-between mb-5 gap-4">
							<div>
								<p className="text-[11px] font-bold text-ring uppercase tracking-widest mb-1.5">
									Catálogo
								</p>
								<h2 className="text-2xl font-black text-foreground tracking-tight">
									Explora nuevos cursos
								</h2>
								<p className="text-sm text-muted-foreground mt-1">
									Amplía tus conocimientos y habilidades
								</p>
							</div>
							<a
								href="/dashboard/catalogo"
								className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-foreground border border-border hover:border-ring/40 hover:bg-secondary/50 rounded-full px-4 py-2 transition-all">
								Ver catálogo
								<span aria-hidden>→</span>
							</a>
						</div>

						{loadingCourses ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
								{[1, 2, 3, 4, 5, 6].map((i) => (
									<div
										key={i}
										className="rounded-2xl border border-border bg-card animate-pulse">
										<div className="aspect-video bg-muted rounded-t-2xl" />
										<div className="p-5 space-y-3">
											<div className="h-4 bg-muted rounded w-3/4" />
											<div className="h-3 bg-muted rounded w-full" />
											<div className="h-3 bg-muted rounded w-2/3" />
										</div>
									</div>
								))}
							</div>
						) : courses && courses.length > 0 ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
								{courses.map((course) => (
									<CourseCard key={course.id} {...toCardProps(course)} href={`/dashboard/cursos/${course.slug}`} />
								))}
							</div>
						) : (
							<div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-border">
								<TrendingUp className="w-10 h-10 text-muted-foreground/40 mb-3" />
								<p className="text-muted-foreground font-semibold">
									No hay cursos disponibles
								</p>
							</div>
						)}
					</section>
				</div>

				{/* ── SIDEBAR (Right Column) — first on mobile (account status takes
				    priority), second on desktop (content leads, panel supports) ── */}
				<div className="order-1 lg:order-2 w-full lg:w-85 xl:w-95 shrink-0 space-y-6 pb-8 lg:pb-0 lg:pt-0 lg:pl-8">
					{/* ── Account Inactive Banner (takes priority over everything) ── */}
					{user && !user.is_active && (
						<div className="relative flex items-start gap-3 overflow-hidden rounded-2xl border border-border bg-card pl-6 pr-5 py-5">
							<span className="absolute left-0 top-0 bottom-0 w-1 bg-muted-foreground/30" />
							<UserX className="h-5 w-5 mt-0.5 shrink-0 text-muted-foreground" />
							<div>
								<p className="font-semibold text-foreground text-sm">
									Cuenta inactiva
								</p>
								<p className="text-xs text-muted-foreground mt-1 leading-relaxed">
									Tu cuenta aún no ha sido activada por un administrador. Cuando
									sea activada recibirás una notificación y podrás acceder al
									contenido de la plataforma.
								</p>
							</div>
						</div>
					)}

					{/* ── User Course Access Banners (only shown when account is active) ── */}
					{user?.is_active &&
						user?.course_access === "NONE" &&
						(hasRequiredProfileData(user) ? (
							/* Profile complete → show the request button */
							<div className="relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-border bg-card pl-6 pr-5 py-5">
								<span className="absolute left-0 top-0 bottom-0 w-1 bg-ring" />
								<div className="flex items-start gap-3">
									<AlertCircle className="h-5 w-5 mt-0.5 shrink-0 text-ring" />
									<div>
										<p className="font-semibold text-foreground text-sm">
											Activa tu acceso a los cursos
										</p>
										<p className="text-xs text-muted-foreground mt-1 tracking-wide">
											Solicita acceso para poder inscribirte en cualquier curso
											de la plataforma.
										</p>
									</div>
								</div>
								<Button
									size="sm"
									onClick={() => requestAccessMutation.mutate()}
									disabled={requestAccessMutation.isPending}
									className="w-full font-bold bg-ring text-white dark:text-background hover:bg-ring/90">
									{requestAccessMutation.isPending
										? "Enviando..."
										: "Solicitar acceso"}
								</Button>
							</div>
						) : (
							/* Profile incomplete → guide them to fill in DNI + phone first */
							<div className="relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-border bg-card pl-6 pr-5 py-5">
								<span className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />
								<div className="flex items-start gap-3">
									<ClipboardList className="h-5 w-5 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
									<div>
										<p className="font-semibold text-foreground text-sm">
											Completa tu perfil para solicitar acceso
										</p>
										<p className="text-xs text-muted-foreground mt-1 leading-relaxed">
											Para solicitar acceso a los cursos necesitamos {missingText}. Puedes seguir explorando el catálogo mientras tanto.
										</p>
									</div>
								</div>
								<Button
									size="sm"
									variant="outline"
									asChild
									className="w-full font-bold border-amber-500/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500/10">
									<Link href="/dashboard/perfil">Completar mi perfil →</Link>
								</Button>
							</div>
						))}

					{user?.is_active && user?.course_access === "PENDING" && (
						<div className="relative flex items-start gap-3 overflow-hidden rounded-2xl border border-border bg-card pl-6 pr-5 py-5">
							<span className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500" />
							<Clock className="h-5 w-5 mt-0.5 shrink-0 text-yellow-600 dark:text-yellow-400" />
							<div>
								<p className="font-semibold text-foreground text-sm">
									Solicitud en revisión
								</p>
								<p className="text-xs text-muted-foreground mt-1 tracking-wide">
									Tu solicitud de acceso está siendo revisada por un
									administrador. Te notificaremos pronto.
								</p>
							</div>
						</div>
					)}

					{user?.is_active && user?.course_access === "APPROVED" && (
						<div className="relative flex items-start gap-3 overflow-hidden rounded-2xl border border-border bg-card pl-6 pr-5 py-5">
							<span className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
							<ShieldCheck className="h-5 w-5 mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
							<div>
								<p className="font-semibold text-foreground text-sm">
									¡Acceso aprobado!
								</p>
								<p className="text-xs text-muted-foreground mt-1 tracking-wide">
									Puedes inscribirte en todos los cursos gratuitos de la
									plataforma y potenciar tu perfil.
								</p>
							</div>
						</div>
					)}

					{user?.is_active && user?.course_access === "REJECTED" && (
						<div className="relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-border bg-card pl-6 pr-5 py-5">
							<span className="absolute left-0 top-0 bottom-0 w-1 bg-destructive" />
							<div className="flex items-start gap-3">
								<ShieldX className="h-5 w-5 mt-0.5 shrink-0 text-destructive" />
								<div>
									<p className="font-semibold text-foreground text-sm">
										Solicitud rechazada
									</p>
									<p className="text-xs text-muted-foreground mt-1 tracking-wide">
										Tu solicitud fue rechazada. Puedes volver a solicitarla si
										crees que fue un error.
									</p>
								</div>
							</div>
							<Button
								size="sm"
								variant="outline"
								onClick={() => requestAccessMutation.mutate()}
								disabled={requestAccessMutation.isPending}
								className="w-full font-bold border-destructive/40 text-destructive hover:bg-destructive/10">
								{requestAccessMutation.isPending
									? "Enviando..."
									: "Solicitar nuevamente"}
							</Button>
						</div>
					)}

					{/* ── Stats — 3-col horizontal on mobile, ledger rows on desktop ── */}
					<div>
						<p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2.5 px-1">
							Tu progreso
						</p>
						<div className="rounded-2xl border border-border bg-card overflow-hidden">
							{/* Mobile: 3 equal columns with vertical dividers
							    Desktop: single column with horizontal dividers */}
							<div className="grid grid-cols-3 divide-x lg:grid-cols-1 lg:divide-x-0 lg:divide-y divide-border">
								{stats.map((stat) => (
									<DashboardStatCard key={stat.label} {...stat} />
								))}
							</div>
						</div>
					</div>

					{/* ── Support Panel — 2-col buttons on mobile, stacked on desktop ── */}
					<div className="bg-card border border-border rounded-2xl p-5">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-9 h-9 rounded-lg bg-ring/10 flex items-center justify-center shrink-0">
								<LifeBuoy className="w-4 h-4 text-ring" />
							</div>
							<div>
								<h3 className="font-bold text-foreground text-sm">
									Soporte Técnico
								</h3>
								<p className="text-xs text-muted-foreground">
									Estamos para ayudarte
								</p>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-3">
							<a
								href="https://wa.me/51945115998"
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center lg:justify-start gap-2.5 px-3 py-3 lg:px-4 lg:py-3.5 bg-muted/50 border border-border hover:border-green-500/50 hover:bg-green-500/10 rounded-xl transition-all duration-200 group">
								<MessageCircle className="w-4 h-4 text-green-600 dark:text-green-500 shrink-0 group-hover:scale-110 transition-transform" />
								<span className="text-sm font-semibold text-foreground group-hover:text-green-700 dark:group-hover:text-green-400">
									WhatsApp
								</span>
							</a>
							<a
								href="mailto:soporte@ccapglobal.com"
								className="flex items-center justify-center lg:justify-start gap-2.5 px-3 py-3 lg:px-4 lg:py-3.5 bg-muted/50 border border-border hover:border-ring/40 hover:bg-ring/5 rounded-xl transition-all duration-200 group">
								<Mail className="w-4 h-4 text-ring shrink-0 group-hover:scale-110 transition-transform" />
								<span className="text-sm font-semibold text-foreground group-hover:text-ring">
									<span className="lg:hidden">Correo</span>
									<span className="hidden lg:inline">Correo Electrónico</span>
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
