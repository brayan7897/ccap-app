"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Search, X, ArrowRight, TrendingUp, Layers } from "lucide-react";
import { useUser } from "@/features/auth/hooks/useAuth";
import { categoriesService } from "@/features/categories/services/categories.service";

interface SearchModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const POPULAR_SEARCHES = [
	"AutoCAD",
	"Revit",
	"Estructuras",
	"Civil 3D",
	"SketchUp",
	"SAP2000",
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [query, setQuery] = useState("");
	const router = useRouter();
	const { data: user } = useUser();

	const basePath = user ? "/dashboard/catalogo" : "/courses";

	const { data: categories } = useQuery({
		queryKey: ["categories-list"],
		queryFn: () => categoriesService.list(0, 50),
		enabled: isOpen,
		staleTime: 5 * 60 * 1000,
	});

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
			setTimeout(() => inputRef.current?.focus(), 100);
		} else {
			document.body.style.overflow = "unset";
			setQuery("");
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				onClose();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const goToSearch = (term: string) => {
		const trimmed = term.trim();
		if (!trimmed) return;
		router.push(`${basePath}?q=${encodeURIComponent(trimmed)}`);
		onClose();
	};

	const goToCategory = (slug: string) => {
		router.push(`${basePath}?category=${encodeURIComponent(slug)}`);
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-start justify-center pt-[8vh] sm:pt-[12vh]">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-background/60 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden mx-4 animate-in fade-in slide-in-from-top-4 duration-200">
				{/* Search input */}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						goToSearch(query);
					}}
					className="flex items-center gap-3 px-6 py-5 border-b border-border bg-background">
					<Search className="w-5 h-5 text-muted-foreground shrink-0" />
					<input
						ref={inputRef}
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Buscar cursos, instructores..."
						maxLength={200}
						className="flex-1 min-w-0 bg-transparent border-none outline-none text-base lg:text-lg text-foreground placeholder:text-muted-foreground"
					/>
					{query && (
						<button
							type="button"
							onClick={() => setQuery("")}
							aria-label="Limpiar búsqueda"
							className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-muted shrink-0">
							<X className="w-5 h-5" />
						</button>
					)}
					{query.trim() ? (
						<button
							type="submit"
							className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-bold bg-ring text-white dark:text-background hover:bg-ring/90 transition-colors shrink-0">
							Buscar
							<ArrowRight className="w-4 h-4" />
						</button>
					) : (
						<kbd className="hidden sm:inline-flex items-center px-2 py-1 rounded-md text-xs font-mono text-muted-foreground bg-background border border-border shadow-sm shrink-0">
							Esc
						</kbd>
					)}
				</form>

				<div className="p-6 space-y-8 max-h-[60vh] overflow-y-auto">
					{/* Popular tags */}
					<div>
						<p className="text-sm font-semibold text-muted-foreground mb-3.5 flex items-center gap-2">
							<TrendingUp className="w-4 h-4" />
							Búsquedas Populares
						</p>
						<div className="flex flex-wrap gap-2">
							{POPULAR_SEARCHES.map((term) => (
								<button
									key={term}
									type="button"
									onClick={() => goToSearch(term)}
									className="px-4 py-1.5 text-sm font-medium rounded-full bg-transparent text-muted-foreground hover:bg-ring/10 hover:text-ring transition-colors">
									{term}
								</button>
							))}
						</div>
					</div>

					{/* Categories */}
					<div>
						<p className="text-sm font-semibold text-muted-foreground mb-3.5 flex items-center gap-2">
							Explorar Categorías
						</p>
						{categories && categories.length > 0 ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
								{categories.map((cat) => (
									<button
										key={cat.id}
										type="button"
										onClick={() => goToCategory(cat.slug)}
										className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-transparent bg-transparent hover:bg-ring/5 hover:border-ring/15 transition-all group text-left">
										<div className="flex items-center justify-center w-9 h-9 rounded-lg bg-ring/10 text-ring shrink-0">
											<Layers className="w-4 h-4" />
										</div>
										<span className="block text-base font-semibold text-foreground group-hover:text-ring transition-colors truncate">
											{cat.name}
										</span>
									</button>
								))}
							</div>
						) : (
							<p className="text-sm text-muted-foreground">Cargando categorías...</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
