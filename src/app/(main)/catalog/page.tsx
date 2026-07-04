import { Suspense } from "react";
import type { Metadata } from "next";
import { CourseGrid } from "@/features/courses/components/CourseGrid";

export const metadata: Metadata = {
  title: "Catálogo de Cursos Online Certificados — Ingeniería, Arquitectura y Tecnología",
  description:
    "Explora nuestro catálogo completo de cursos online con certificados avalados por CIP, Autodesk y RIB Presto. Cursos de ingeniería, arquitectura, gestión de proyectos y más. Empieza hoy.",
  alternates: {
    canonical: "https://ccapglobal.com/catalog",
  },
  openGraph: {
    title: "Catálogo de Cursos Online Certificados | CCAP Global",
    description:
      "Todos nuestros cursos online con certificación oficial. Filtra por categoría, nivel y especialidad. Inscripciones abiertas 2026.",
    url: "https://ccapglobal.com/catalog",
  },
};

export default function CatalogPage() {
  return (
    <section className="container mx-auto py-12">
      <h1 className="mb-8 text-3xl font-bold">Catálogo de Cursos</h1>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3 animate-pulse">
                <div className="aspect-video w-full rounded-lg bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-1/2 rounded bg-muted" />
              </div>
            ))}
          </div>
        }>
        <CourseGrid />
      </Suspense>
    </section>
  );
}
