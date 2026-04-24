"use client";

import { useState } from "react";
import { BookOpen, CheckCircle, Layers } from "lucide-react";
import { useMyEnrollments } from "@/features/dashboard/hooks/useDashboard";
import { EnrollmentProgressCard } from "@/features/dashboard/components/EnrollmentProgressCard";
import { useUser } from "@/features/auth/hooks/useAuth";
import { InactiveAccountBanner } from "@/components/ui/InactiveAccountBanner";
import type { EnrollmentStatus } from "@/types";

type TabKey = "all" | "active" | "completed";

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
	{ key: "all", label: "Todos", icon: Layers },
	{ key: "active", label: "En progreso", icon: BookOpen },
	{ key: "completed", label: "Completados", icon: CheckCircle },
];

export default function MisCursosPage() {
	const { data: user } = useUser();
	const { data: enrollments, isLoading } = useMyEnrollments();
	const [activeTab, setActiveTab] = useState<TabKey>("all");

	if (user && !user.is_active) {
		return (
			<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
				<div>
					<h1 className="text-2xl font-black text-foreground">Mis Cursos</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Necesitas una cuenta activa para ver tus inscripciones.
					</p>
				</div>
				<InactiveAccountBanner />
			</div>
		);
	}

	const filtered = (enrollments ?? []).filter((e) => {
		if (activeTab === "all") return true;
		if (activeTab === "active") return e.status === "ACTIVE";
		if (activeTab === "completed") return e.status === "COMPLETED";
		return true;
	});

	const counts = {
		all: enrollments?.length ?? 0,
		active: enrollments?.filter((e) => e.status === "ACTIVE").length ?? 0,
		completed: enrollments?.filter((e) => e.status === "COMPLETED").length ?? 0,
	};

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
			{/* Header */}
			<div>
				<h1 className="text-2xl font-black text-foreground">Mis Cursos</h1>
				<p className="text-sm text-muted-foreground mt-1">
					Gestiona y sigue el progreso de tus cursos inscritos.
				</p>
			</div>

			{/* Tabs */}
			<div className="flex items-center gap-1 p-1 rounded-2xl bg-muted/60 w-fit">
				{TABS.map(({ key, label, icon: Icon }) => {
					const isActive = activeTab === key;
					return (
						<button
							key={key}
							onClick={() => setActiveTab(key)}
							className={[
								"flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all",
								isActive
									? "bg-background text-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground",
							].join(" ")}>
							<Icon className="w-4 h-4" />
							{label}
							<span
								className={[
									"text-xs px-1.5 py-0.5 rounded-full font-bold",
									isActive
										? "bg-primary/10 text-primary"
										: "bg-muted text-muted-foreground",
								].join(" ")}>
								{counts[key]}
							</span>
						</button>
					);
				})}
			</div>

			{/* Grid */}
			{isLoading ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{[1, 2, 3, 4, 5, 6].map((i) => (
						<div
							key={i}
							className="rounded-2xl border border-border bg-card animate-pulse">
							<div className="aspect-video bg-muted rounded-t-2xl" />
							<div className="p-4 space-y-3">
								<div className="h-4 bg-muted rounded w-3/4" />
								<div className="h-2.5 bg-muted rounded w-full" />
								<div className="h-8 bg-muted rounded-xl" />
							</div>
						</div>
					))}
				</div>
			) : filtered.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filtered.map((enrollment) => (
						<EnrollmentProgressCard
							key={enrollment.id}
							enrollment={enrollment}
						/>
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed border-border">
					<BookOpen className="w-12 h-12 text-muted-foreground/30 mb-4" />
					<p className="text-lg font-bold text-muted-foreground">
						{activeTab === "all"
							? "Aún no tienes cursos inscritos"
							: activeTab === "active"
								? "No tienes cursos en progreso"
								: "Aún no has completado ningún curso"}
					</p>
					<p className="text-sm text-muted-foreground/70 mt-1">
						¡Explora el catálogo y empieza a aprender!
					</p>
					<a
						href="/dashboard/catalogo"
						className="mt-5 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors">
						Ir al catálogo
					</a>
				</div>
			)}
		</div>
	);
}
