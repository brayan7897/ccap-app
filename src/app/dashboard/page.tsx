"use client";

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
} from "lucide-react";
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
import type { Course } from "@/types";



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
		category_name: course.category?.name,
		tags: course.tags,
		total_lessons: course.total_lessons,
		total_duration: course.total_duration_seconds
			? `${Math.round(course.total_duration_seconds / 3600)} horas`
			: undefined,
		enrolled_count: course.enrolled_count,
	};
}

export default function DashboardHomePage() {
	const { data: user } = useUser();
	const { data: enrollments, isLoading: loadingEnrollments } =
		useMyEnrollments();
	const { data: certificates, isLoading: loadingCerts } = useMyCertificates();
	const { data: courses, isLoading: loadingCourses } = useCourses(0, 6);
	const requestAccessMutation = useRequestAccess();

	const activeEnrollments =
		enrollments?.filter((e) => e.status === "ACTIVE") ?? [];
	const completedEnrollments =
		enrollments?.filter((e) => e.status === "COMPLETED") ?? [];
	const inProgressEnrollments = activeEnrollments
		.filter((e) => e.progress_percentage < 100)
		.sort((a, b) => b.progress_percentage - a.progress_percentage)
		.slice(0, 3);

	const stats = [
		{
			label: "Cursos activos",
			value: activeEnrollments.length,
			icon: BookOpen,
			color: "text-primary",
			bg: "bg-primary/10",
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
			color: "text-yellow-500",
			bg: "bg-yellow-500/10",
			loading: loadingCerts,
		},
	];

	return (
		<div className="p-4 lg:p-8 max-w-[1400px] mx-auto min-h-[calc(100vh-4rem)]">
			<div className="flex flex-col lg:flex-row gap-0">
				
				{/* ── MAIN CONTENT (Left Column) ─────────────────────────────────── */}
				<div className="flex-1 space-y-10 min-w-0 lg:pr-8 lg:border-r border-border">
					{/* ── Continue learning ──────────────────────────────────────────── */}
					{(loadingEnrollments || inProgressEnrollments.length > 0) && (
						<section>
							<div className="flex items-center justify-between mb-5">
								<div>
									<h2 className="text-xl font-black text-foreground">
										Continúa aprendiendo
									</h2>
									<p className="text-sm text-muted-foreground mt-0.5">
										Retoma donde lo dejaste
									</p>
								</div>
								<a
									href="/dashboard/mis-cursos"
									className="text-sm font-bold text-primary hover:underline">
									Ver todos →
								</a>
							</div>

							{loadingEnrollments ? (
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
						<div className="flex items-center justify-between mb-5">
							<div>
								<h2 className="text-xl font-black text-foreground">
									Explorar catálogo
								</h2>
								<p className="text-sm text-muted-foreground mt-0.5">
									Amplía tus conocimientos y habilidades
								</p>
							</div>
							<a
								href="/dashboard/catalogo"
								className="text-sm font-bold text-primary hover:underline">
								Ver catálogo →
							</a>
						</div>

						{loadingCourses ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
								{courses.map((course) => (
									<CourseCard key={course.id} {...toCardProps(course)} />
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

				{/* ── SIDEBAR (Right Column) ─────────────────────────────────────── */}
				<div className="w-full lg:w-[340px] xl:w-[380px] shrink-0 space-y-6 pt-8 lg:pt-0 lg:pl-8">
					
				{/* ── Account Inactive Banner (takes priority over everything) ── */}
				{user && !user.is_active && (
					<div className="flex items-start gap-3 rounded-2xl border border-border bg-muted p-5">
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
				{user?.is_active && user?.course_access === "NONE" && (
						<div className="flex flex-col items-start gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-5">
							<div className="flex items-start gap-3">
								<AlertCircle className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
								<div>
									<p className="font-semibold text-foreground text-sm">
										Activa tu acceso a los cursos
									</p>
									<p className="text-xs text-muted-foreground mt-1 tracking-wide">
										Solicita acceso para poder inscribirte en cualquier curso de la
										plataforma.
									</p>
								</div>
							</div>
							<Button
								size="sm"
								onClick={() => requestAccessMutation.mutate()}
								disabled={requestAccessMutation.isPending}
								className="w-full font-bold shadow-md hover:shadow-lg transition-shadow">
								{requestAccessMutation.isPending
									? "Enviando..."
									: "Solicitar acceso"}
							</Button>
						</div>
					)}

					{user?.is_active && user?.course_access === "PENDING" && (
						<div className="flex items-start gap-3 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5">
							<Clock className="h-5 w-5 mt-0.5 shrink-0 text-yellow-600 dark:text-yellow-400" />
							<div>
								<p className="font-semibold text-yellow-700 dark:text-yellow-300 text-sm">
									Solicitud en revisión
								</p>
								<p className="text-xs text-yellow-600/80 dark:text-yellow-400/80 mt-1 tracking-wide">
									Tu solicitud de acceso está siendo revisada por un administrador.
									Te notificaremos pronto.
								</p>
							</div>
						</div>
					)}

					{user?.is_active && user?.course_access === "APPROVED" && (
						<div className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
							<ShieldCheck className="h-5 w-5 mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
							<div>
								<p className="font-semibold text-emerald-700 dark:text-emerald-300 text-sm">
									¡Acceso aprobado!
								</p>
								<p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-1 tracking-wide">
									Puedes inscribirte en todos los cursos gratuitos de la plataforma y potenciar tu perfil.
								</p>
							</div>
						</div>
					)}

					{user?.is_active && user?.course_access === "REJECTED" && (
						<div className="flex flex-col items-start gap-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
							<div className="flex items-start gap-3">
								<ShieldX className="h-5 w-5 mt-0.5 shrink-0 text-destructive" />
								<div>
									<p className="font-semibold text-foreground text-sm">
										Solicitud rechazada
									</p>
									<p className="text-xs text-muted-foreground mt-1 tracking-wide">
										Tu solicitud fue rechazada. Puedes volver a solicitarla si crees
										que fue un error.
									</p>
								</div>
							</div>
							<Button
								size="sm"
								variant="outline"
								onClick={() => requestAccessMutation.mutate()}
								disabled={requestAccessMutation.isPending}
								className="w-full font-bold border-destructive/50 text-destructive hover:bg-destructive/10">
								{requestAccessMutation.isPending
									? "Enviando..."
									: "Solicitar nuevamente"}
							</Button>
						</div>
					)}

					{/* ── Stats ── */}
					<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
						{stats.map((stat) => (
							<DashboardStatCard key={stat.label} {...stat} />
						))}
					</div>

					{/* ── Support Panel ── */}
					<div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
						<div className="flex items-center gap-3 mb-4">
							<div className="p-2.5 bg-primary/10 rounded-xl">
								<LifeBuoy className="w-5 h-5 text-primary" />
							</div>
							<div>
								<h3 className="font-bold text-foreground text-sm">Soporte Técnico</h3>
								<p className="text-xs text-muted-foreground">Estamos para ayudarte</p>
							</div>
						</div>
						<div className="space-y-3">
							<a 
								href="https://wa.me/51945115998" 
								target="_blank" 
								rel="noopener noreferrer" 
								className="flex items-center gap-3 px-4 py-3.5 bg-muted/50 border border-border hover:border-green-500/50 hover:bg-green-500/10 rounded-xl transition-all duration-300 group"
							>
								<MessageCircle className="w-4 h-4 text-green-600 dark:text-green-500 group-hover:scale-110 transition-transform" />
								<span className="text-sm font-semibold text-foreground group-hover:text-green-700 dark:group-hover:text-green-400">WhatsApp</span>
							</a>
							<a 
								href="mailto:soporte@ccapglobal.com" 
								className="flex items-center gap-3 px-4 py-3.5 bg-muted/50 border border-border hover:border-primary/50 hover:bg-primary/10 rounded-xl transition-all duration-300 group"
							>
								<Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
								<span className="text-sm font-semibold text-foreground group-hover:text-primary">Correo Electrónico</span>
							</a>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}
