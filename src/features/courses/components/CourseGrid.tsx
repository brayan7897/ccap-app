"use client";

import { useState } from "react";
import { useCourses } from "../hooks/useCourses";
import { CourseCard } from "./CourseCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";

function CourseSkeleton() {
	return (
		<div className="space-y-3">
			<Skeleton className="aspect-video w-full rounded-lg" />
			<Skeleton className="h-4 w-3/4" />
			<Skeleton className="h-3 w-full" />
			<Skeleton className="h-3 w-1/2" />
		</div>
	);
}

export function CourseGrid() {
	const searchParams = useSearchParams();
	const category = searchParams.get("category") || undefined;

	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 400);
	
	const [sortValue, setSortValue] = useState("created_at-desc");
	const [sortBy, sortOrder] = sortValue.split("-") as [string, "asc" | "desc"];
	
	const limit = 12;
	const [skip, setSkip] = useState(0);

	const { data: courses, isLoading, isError, isFetching } = useCourses(
		skip, 
		limit, 
		category, 
		debouncedSearchTerm, 
		sortBy, 
		sortOrder
	);

	const handleNextPage = () => {
		setSkip((prev) => prev + limit);
	};

	const handlePrevPage = () => {
		setSkip((prev) => Math.max(0, prev - limit));
	};

	// Reset pagination when filters change
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		setSkip(0);
	};

	const handleSortChange = (val: string) => {
		setSortValue(val);
		setSkip(0);
	};

	const clearSearch = () => {
		setSearchTerm("");
		setSkip(0);
	};

	return (
		<div className="space-y-6">
			{/* Filters Header */}
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-card p-4 rounded-xl shadow-sm border">
				<div className="relative flex-1 max-w-md">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
						<Search className="h-4 w-4" />
					</div>
					<Input
						type="text"
						placeholder="Buscar cursos..."
						value={searchTerm}
						onChange={handleSearchChange}
						className="pl-9 pr-10 bg-background"
					/>
					{searchTerm && (
						<button 
							onClick={clearSearch}
							className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
						>
							<X className="h-4 w-4" />
						</button>
					)}
				</div>
				<div className="flex items-center gap-3">
					<span className="text-sm text-muted-foreground whitespace-nowrap">Ordenar por:</span>
					<Select value={sortValue} onValueChange={handleSortChange}>
						<SelectTrigger className="w-[180px] bg-background">
							<SelectValue placeholder="Seleccionar orden" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="created_at-desc">Más recientes</SelectItem>
							<SelectItem value="created_at-asc">Más antiguos</SelectItem>
							<SelectItem value="price-asc">Precio (Menor a mayor)</SelectItem>
							<SelectItem value="price-desc">Precio (Mayor a menor)</SelectItem>
							<SelectItem value="title-asc">Título (A-Z)</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Grid Content */}
			{isError ? (
				<div className="flex flex-col items-center justify-center py-20 bg-card rounded-xl border border-destructive/20 text-muted-foreground">
					<p className="text-sm">No se pudieron cargar los cursos. Intenta de nuevo.</p>
				</div>
			) : isLoading ? (
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{Array.from({ length: limit }).map((_, i) => (
						<CourseSkeleton key={i} />
					))}
				</div>
			) : !courses?.length ? (
				<div className="flex flex-col items-center justify-center py-20 bg-card rounded-xl border border-dashed text-muted-foreground">
					<Search className="h-12 w-12 mb-4 text-muted" />
					<h3 className="text-lg font-medium text-foreground mb-1">No se encontraron cursos</h3>
					<p className="text-sm max-w-sm text-center">
						No hay cursos que coincidan con tu búsqueda. Intenta usar otros términos o cambiar los filtros.
					</p>
					{searchTerm && (
						<Button variant="outline" className="mt-4" onClick={clearSearch}>
							Limpiar búsqueda
						</Button>
					)}
				</div>
			) : (
				<div className="relative">
					<div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-opacity duration-300 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
						{courses.map((course) => (
							<CourseCard key={course.id} course={course} />
						))}
					</div>
					
					{/* Pagination Controls */}
					<div className="flex items-center justify-between mt-10 p-4 border-t">
						<p className="text-sm text-muted-foreground hidden sm:block">
							Mostrando {skip + 1} a {skip + courses.length} resultados
						</p>
						<div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
							<Button
								variant="outline"
								size="sm"
								onClick={handlePrevPage}
								disabled={skip === 0 || isFetching}
								className="gap-1"
							>
								<ChevronLeft className="h-4 w-4" /> Anterior
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={handleNextPage}
								disabled={courses.length < limit || isFetching}
								className="gap-1"
							>
								Siguiente <ChevronRight className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
