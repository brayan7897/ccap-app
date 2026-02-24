import { CourseGrid } from "@/features/courses/components/CourseGrid";

export default function CatalogPage() {
  return (
    <section className="container mx-auto py-12">
      <h1 className="mb-8 text-3xl font-bold">Catálogo de Cursos</h1>
      <CourseGrid />
    </section>
  );
}
