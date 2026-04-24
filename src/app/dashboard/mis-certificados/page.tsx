"use client";

import { Award } from "lucide-react";
import { useMyCertificates } from "@/features/dashboard/hooks/useDashboard";
import { CertificateCard } from "@/features/dashboard/components/CertificateCard";

export default function MisCertificadosPage() {
	const { data: certificates, isLoading } = useMyCertificates();

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
			{/* Header */}
			<div className="flex items-start justify-between">
				<div>
					<h1 className="text-2xl font-black text-foreground">
						Mis Certificados
					</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Todos los certificados que has obtenido al completar tus cursos.
					</p>
				</div>
				{!isLoading && certificates && certificates.length > 0 && (
					<div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
						<Award className="w-4 h-4 text-yellow-500" />
						<span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
							{certificates.length} certificado
							{certificates.length !== 1 ? "s" : ""}
						</span>
					</div>
				)}
			</div>

			{/* Grid */}
			{isLoading ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="rounded-2xl border border-border bg-card animate-pulse">
							<div className="h-24 bg-muted rounded-t-2xl" />
							<div className="p-5 space-y-3">
								<div className="h-4 bg-muted rounded w-3/4" />
								<div className="h-3 bg-muted rounded w-1/2" />
								<div className="h-14 bg-muted rounded-xl" />
								<div className="h-9 bg-muted rounded-xl" />
							</div>
						</div>
					))}
				</div>
			) : certificates && certificates.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{certificates.map((cert) => (
						<CertificateCard key={cert.id} certificate={cert} />
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center py-24 rounded-2xl border border-dashed border-yellow-500/30 bg-yellow-500/5">
					<div className="w-20 h-20 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-5">
						<Award className="w-10 h-10 text-yellow-500/50" />
					</div>
					<p className="text-lg font-black text-foreground">
						Aún no tienes certificados
					</p>
					<p className="text-sm text-muted-foreground mt-2 text-center max-w-xs">
						Completa tus cursos para obtener certificados oficiales y demostrar
						tus habilidades.
					</p>
					<a
						href="/dashboard/mis-cursos"
						className="mt-6 px-5 py-2.5 rounded-xl bg-yellow-500 text-white text-sm font-bold hover:bg-yellow-600 transition-colors">
						Ver mis cursos
					</a>
				</div>
			)}
		</div>
	);
}
