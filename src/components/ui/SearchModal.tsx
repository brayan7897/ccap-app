"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X, ArrowRight, TrendingUp } from "lucide-react";

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

const CATEGORIES = [
	{ name: "Ingeniería Civil", courses: 25, emoji: "🏗️" },
	{ name: "Arquitectura", courses: 18, emoji: "📐" },
	{ name: "Estructuras", courses: 15, emoji: "🔩" },
	{ name: "Construcción", courses: 12, emoji: "🏢" },
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [query, setQuery] = useState("");

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
				<div className="flex items-center gap-4 px-6 py-5 border-b border-border bg-background">
					<Search className="w-5 h-5 text-muted-foreground shrink-0" />
					<input
						ref={inputRef}
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Buscar cursos, instructores..."
						className="flex-1 bg-transparent border-none outline-none text-base lg:text-lg text-foreground placeholder:text-muted-foreground"
					/>
					{query ? (
						<button
							onClick={() => setQuery("")}
							className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-muted">
							<X className="w-5 h-5" />
						</button>
					) : (
						<kbd className="hidden sm:inline-flex items-center px-2 py-1 rounded-md text-xs font-mono text-muted-foreground bg-background border border-border shadow-sm">
							Esc
						</kbd>
					)}
				</div>

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
									className="px-4 py-1.5 text-sm font-medium rounded-full bg-transparent text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-colors">
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
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
							{CATEGORIES.map((cat) => (
								<button
									key={cat.name}
									className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border border-transparent bg-transparent hover:bg-secondary/30 transition-all group text-left">
									<div className="flex-1 min-w-0">
										<span className="block text-base font-semibold text-foreground group-hover:text-primary transition-colors">
											{cat.name}
										</span>
										<span className="block text-xs text-muted-foreground mt-0.5">
											{cat.courses} cursos
										</span>
									</div>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
