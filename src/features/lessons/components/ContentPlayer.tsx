"use client";

import { ExternalLink, Download, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SmartImage } from "@/components/ui/SmartImage";
import type { Resource } from "@/types";

interface ContentPlayerProps {
	resources: Resource[];
	isLoading: boolean;
}

// ── Drive URL helpers ─────────────────────────────────────────────────────────

export function getDriveEmbedUrl(driveFileId: string): string {
	return `https://drive.google.com/file/d/${driveFileId}/preview`;
}

export function getDriveDownloadUrl(driveFileId: string): string {
	return `https://drive.google.com/uc?export=download&id=${driveFileId}`;
}

export function getDriveViewUrl(driveFileId: string): string {
	return `https://drive.google.com/uc?export=view&id=${driveFileId}`;
}

// ── Main component ────────────────────────────────────────────────────────────

export function ContentPlayer({ resources, isLoading }: ContentPlayerProps) {
	if (isLoading) {
		return (
			<div className="space-y-4">
				<Skeleton className="w-full aspect-video rounded-xl" />
				<Skeleton className="h-5 w-1/2" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-4/5" />
			</div>
		);
	}

	const mainResource = resources.find((r) => r.resource_type === "MAIN");
	const secondaryResources = resources.filter(
		(r) => r.resource_type === "SECONDARY",
	);

	if (!mainResource) {
		return (
			<div className="flex flex-col items-center justify-center aspect-video bg-muted/30 rounded-xl border border-border/50 text-muted-foreground gap-3">
				<Loader2 className="w-12 h-12 opacity-20" />
				<p className="text-sm font-medium">Contenido no disponible aún</p>
			</div>
		);
	}

	function renderMain() {
		if (!mainResource) return null;
		const { resource_format, drive_file_id, external_url, title } =
			mainResource;

		if (resource_format === "VIDEO") {
			const src =
				external_url ??
				(drive_file_id ? getDriveEmbedUrl(drive_file_id) : null);
			if (!src) return <EmptySlot />;

			// NOTE: this is Google Drive's own embedded player (Same-Origin Policy
			// blocks styling anything inside the iframe, including its native
			// controls — play/skip/timestamp/volume/speed/fullscreen icons stay
			// Google's default look no matter what). What we *can* control is the
			// frame around it: full width like before, a brand-colored ring/shadow
			// for contrast against the page and a smooth hover transition instead
			// of a flat black box.
			return (
				<div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-border/60 shadow-lg shadow-primary/5 ring-1 ring-secondary/15 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-secondary/10 hover:ring-secondary/30">
					{/* Overlay to block the Google Drive pop-out button (cannot be removed via JS/CSS inside iframe) */}
					<div className="absolute top-0 right-0 w-15 h-15 bg-transparent z-10" />
					<iframe
						src={src}
						className="w-full h-full border-none"
						allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
						allowFullScreen
						title={title}
					/>
				</div>
			);
		}

		if (resource_format === "PDF") {
			const src = drive_file_id
				? getDriveEmbedUrl(drive_file_id)
				: external_url;
			if (!src) return <EmptySlot />;
			return (
				<iframe
					src={src}
					className="w-full rounded-xl border border-border/50"
					style={{ height: "70vh" }}
					title={title}
					sandbox="allow-scripts allow-same-origin allow-forms"
				/>
			);
		}

		if (resource_format === "LINK") {
			const url =
				external_url ??
				(drive_file_id ? getDriveEmbedUrl(drive_file_id) : null);
			if (!url) return <EmptySlot />;
			return (
				<div className="flex flex-col items-center justify-center aspect-video bg-muted/20 rounded-xl border border-border/50 gap-4">
					<ExternalLink className="w-10 h-10 text-primary opacity-70" />
					<p className="text-sm text-muted-foreground font-medium">{title}</p>
					<Button asChild>
						<a href={url} target="_blank" rel="noopener noreferrer">
							Abrir enlace
						</a>
					</Button>
				</div>
			);
		}

		if (resource_format === "DOCUMENT") {
			const url = drive_file_id
				? getDriveDownloadUrl(drive_file_id)
				: external_url;
			if (!url) return <EmptySlot />;
			return (
				<div className="flex flex-col items-center justify-center aspect-video bg-muted/20 rounded-xl border border-border/50 gap-4">
					<FileText className="w-10 h-10 text-primary opacity-70" />
					<p className="text-sm font-medium text-foreground">{title}</p>
					<Button asChild variant="outline">
						<a href={url} download>
							<Download className="w-4 h-4 mr-2" />
							Descargar documento
						</a>
					</Button>
				</div>
			);
		}

		if (resource_format === "IMAGE") {
			const src = drive_file_id ? getDriveViewUrl(drive_file_id) : external_url;
			if (!src) return <EmptySlot />;
			return (
				<div className="relative w-full h-[70vh] rounded-xl overflow-hidden border border-border/50 bg-muted/20">
					<SmartImage
						src={src}
						alt={title}
						fill
						sizes="100vw"
						className="object-contain"
						fallback={<EmptySlot />}
					/>
				</div>
			);
		}

		return <EmptySlot />;
	}

	return <div className="space-y-6 flex-1 w-full">{renderMain()}</div>;
}

function EmptySlot() {
	return (
		<div className="flex flex-col items-center justify-center aspect-video bg-muted/20 rounded-xl border border-border/50 text-muted-foreground gap-2">
			<FileText className="w-10 h-10 opacity-30" />
			<p className="text-sm font-medium">Recurso no disponible</p>
		</div>
	);
}
