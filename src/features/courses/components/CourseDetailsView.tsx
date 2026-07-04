"use client";

import { CourseCurriculum } from "@/features/courses/components/CourseCurriculum";
import { CourseInstructor } from "@/features/courses/components/CourseInstructor";
import { CourseEnrollCard } from "@/features/courses/components/CourseEnrollCard";
import {
	CheckCircle2,
	ChevronRight,
	Home,
	Star,
	Users,
	Award,
	BookOpen,
	ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { useEnrollmentsStore } from "@/store/enrollments-store";
import type { CourseDetail } from "@/types";

export function CourseDetailsView({
	course,
	slug,
}: {
	course: CourseDetail;
	slug: string;
}) {
	const isEnrolled = useEnrollmentsStore((s) => s.isEnrolled(course.id));

	const categoryColor = course.category_color || course.category?.color || "#4f46e5"; // default indigo
	const priceDisplay =
		course.course_type === "PAID" && course.price != null
			? `S/. ${course.price.toFixed(2)}`
			: "Gratis";

	return (
		<div className="min-h-screen bg-background w-full flex flex-col pb-28 relative">
			{/* Breadcrumbs */}
			<div className="bg-muted/10 border-b border-border/20">
				<div className="container mx-auto px-4 lg:px-8 py-3">
					<nav className="flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto whitespace-nowrap font-medium">
						<Link
							href="/"
							className="hover:text-primary transition-colors flex items-center gap-1.5">
							<Home className="w-4 h-4" /> Inicio
						</Link>
						<ChevronRight className="w-4 h-4 shrink-0" />
						<Link
							href="/courses"
							className="hover:text-primary transition-colors">
							Cursos
						</Link>
						<ChevronRight className="w-4 h-4 shrink-0" />
						<span className="text-foreground truncate max-w-[200px] sm:max-w-xs md:max-w-md">
							{course.title}
						</span>
					</nav>
				</div>
			</div>

			<section className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
				<div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-10 items-start">
					{/* Left column */}
					<div className="space-y-10">
						{/* Header Section */}
						<div className="space-y-6">
							{course.category && (
								<div
									className="inline-flex px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wider"
									style={{
										backgroundColor: `${categoryColor}15`,
										color: categoryColor,
										border: `1px solid ${categoryColor}30`,
									}}>
									{course.category.name}
								</div>
							)}

							<h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-black leading-[1.08] tracking-tight text-foreground">
								{course.title}
							</h1>

							{course.short_description && (
								<p className="text-xl md:text-2xl text-foreground/80 font-medium leading-relaxed max-w-4xl">
									{course.short_description}
								</p>
							)}

							{/* Rating & Stats row */}
							<div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4">
								<div className="flex flex-col items-center sm:items-start">
									<div className="flex items-center gap-1.5">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={`w-5 h-5 md:w-6 md:h-6 ${
													i < 4
														? "fill-amber-400 text-amber-400"
														: "fill-amber-400/30 text-amber-400/30"
												}`}
											/>
										))}
									</div>
									<div className="flex items-center gap-2 mt-1">
										<span className="font-bold text-foreground text-lg">4.8</span>
										<span className="text-muted-foreground text-sm">Valoración del curso</span>
									</div>
								</div>

								<div className="w-px h-12 bg-border hidden sm:block"></div>

								<div className="flex items-center gap-3">
									<Users className="w-7 h-7 opacity-70 text-ring" />
									<div className="flex flex-col">
										<span className="font-black text-lg text-foreground">
											{(course.enrolled_count ?? 0).toLocaleString("es-PE")}+
										</span>
										<span className="text-sm text-muted-foreground">Estudiantes</span>
									</div>
								</div>

								<div className="w-px h-10 bg-border hidden sm:block"></div>

								<div className="flex items-center gap-3">
									<Award className="w-7 h-7 opacity-70 text-gold" />
									<div className="flex flex-col">
										<span className="font-bold text-foreground">Certificado</span>
										<span className="text-sm font-bold text-gold">incluido</span>
									</div>
								</div>
							</div>
						</div>

						{/* What you'll learn */}
						{course.what_you_will_learn && course.what_you_will_learn.length > 0 && (
							<div
								className="p-6 md:p-8 rounded-2xl border relative overflow-hidden"
								style={{
									borderColor: `${categoryColor}25`,
									backgroundColor: `${categoryColor}0d`,
								}}>
								<div className="flex items-center gap-3 mb-6 relative z-10">
									<div
										className="p-2.5 rounded-xl text-white dark:text-background"
										style={{ backgroundColor: categoryColor }}>
										<CheckCircle2 className="w-6 h-6" />
									</div>
									<h3 className="text-2xl font-bold text-foreground">
										Lo que aprenderás
									</h3>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 relative z-10">
									{course.what_you_will_learn.map((item: string, idx: number) => (
										<div key={idx} className="flex items-start gap-3">
											<div
												className="mt-1 shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white dark:text-background"
												style={{ backgroundColor: categoryColor }}>
												<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
											</div>
											<span className="text-base text-foreground/80 font-medium leading-relaxed">
												{item}
											</span>
										</div>
									))}
								</div>
							</div>
						)}

						{/* About + Requisitos: condensed, paired side by side */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* About */}
							<div className="p-6 rounded-2xl bg-muted/40 border border-border h-full">
								<div className="flex items-center gap-3 mb-4">
									<div
										className="p-2.5 rounded-xl"
										style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}>
										<BookOpen className="w-5 h-5" />
									</div>
									<h3 className="text-lg font-bold text-foreground">
										Acerca del curso
									</h3>
								</div>
								<p className="whitespace-pre-line text-foreground/80 text-sm leading-relaxed">
									{course.description || "Este curso no proporciona una descripción detallada en este momento."}
								</p>
							</div>

							{/* Requisitos */}
							<div className="p-6 rounded-2xl bg-muted/40 border border-border h-full">
								<div className="flex items-center gap-3 mb-4">
									<div
										className="p-2.5 rounded-xl"
										style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}>
										<ClipboardList className="w-5 h-5" />
									</div>
									<h3 className="text-lg font-bold text-foreground">
										Requisitos
									</h3>
								</div>
								{course.requirements && course.requirements.length > 0 ? (
									<ul className="space-y-3.5">
										{course.requirements.map((req: string, idx: number) => (
											<li key={idx} className="flex items-start gap-3 text-foreground/80 text-sm font-medium">
												<div
													className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
													style={{ backgroundColor: categoryColor }} />
												<span className="leading-relaxed">{req}</span>
											</li>
										))}
									</ul>
								) : (
									<p className="text-muted-foreground text-sm">No hay requisitos específicos.</p>
								)}
							</div>
						</div>

						{/* Plan de estudios */}
						<div className="p-6 rounded-2xl bg-muted/40 border border-border">
							<CourseCurriculum
								modules={course.modules || []}
								courseSlug={slug}
								courseId={course.id}
								accentColor={categoryColor}
							/>
						</div>

						{/* Instructor */}
						{course.instructor && (
							<CourseInstructor instructor={course.instructor} />
						)}
					</div>

					{/* Right: sticky sidebar (desktop only) */}
					<div className="hidden xl:block">
						<CourseEnrollCard course={course} />
					</div>
				</div>
			</section>

			{/* Mobile: inline enrollment card */}
			<div className="xl:hidden container mx-auto px-4 pb-8" id="mobile-enroll">
				<CourseEnrollCard course={course} />
			</div>

			{/* Mobile FAB */}
			<div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border/50 xl:hidden z-50 flex gap-4 items-center">
				<div className="flex-1">
					<p className="text-xs text-muted-foreground mb-0.5">Precio</p>
					<p className="font-bold text-foreground text-xl">{priceDisplay}</p>
				</div>
				{isEnrolled ? (
					<Link
						href="/dashboard/mis-cursos"
						className="flex-1 h-12 rounded-xl font-bold shadow-lg text-center flex items-center justify-center bg-ring text-white dark:text-background">
						Ir a mis cursos
					</Link>
				) : (
					<button
						onClick={() =>
							document
								.getElementById("mobile-enroll")
								?.scrollIntoView({ behavior: "smooth" })
						}
						className="flex-1 h-12 rounded-xl font-bold shadow-lg bg-ring text-white dark:text-background">
						Inscribirme
					</button>
				)}
			</div>
		</div>
	);
}
