import type { Metadata } from "next";
import { CourseGrid } from "@/features/courses/components/CourseGrid";

export const metadata: Metadata = {
  title: "Catálogo de Cursos Online Certificados — Ingeniería, Arquitectura y Tecnología",
  description:
    "Explora nuestro catálogo completo de cursos online con certificados avalados por CIP, Autodesk y RIB Presto. Cursos de ingeniería, arquitectura, gestión de proyectos y más. Empieza hoy.",
  alternates: {
    canonical: "https://www.ccapglobal.com/catalog",
  },
  openGraph: {
    title: "Catálogo de Cursos Online Certificados | CCAP Global",
    description:
      "Todos nuestros cursos online con certificación oficial. Filtra por categoría, nivel y especialidad. Inscripciones abiertas 2026.",
    url: "https://www.ccapglobal.com/catalog",
  },
};

export default function CatalogPage() {
  return (
    <section className="container mx-auto py-12">
      <h1 className="mb-8 text-3xl font-bold">Catálogo de Cursos</h1>
      <CourseGrid />
    </section>
  );
}
