"use client";

import { useParams } from "next/navigation";
import { useCourse } from "@/features/courses/hooks/useCourses";
import { CourseCurriculum } from "@/features/courses/components/CourseCurriculum";
import { CourseInstructor } from "@/features/courses/components/CourseInstructor";
import { CourseEnrollCard } from "@/features/courses/components/CourseEnrollCard";
import { Loader2, AlertCircle, CheckCircle2, ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export default function CourseDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: course, isLoading, isError, error } = useCourse(slug);

  console.log(`[CourseDetailsPage] Render for slug: "${slug}"`, { course, isLoading, isError, error });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Cargando detalles del curso...</p>
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-2" />
        <h1 className="text-2xl font-bold text-foreground">Curso no encontrado o hubo un error</h1>
        <p className="text-muted-foreground max-w-md">
          Lo sentimos, no pudimos cargar la información de este curso.
        </p>
        {isError && (
          <div className="bg-rose-500/10 text-rose-500 border border-rose-500/20 p-4 rounded-xl mt-2 text-sm max-w-xl text-left overflow-auto">
            <p className="font-bold mb-1">Detalle del error (API):</p>
            <pre className="whitespace-pre-wrap">
              {error instanceof Error ? error.message : JSON.stringify(error, null, 2)}
            </pre>
          </div>
        )}
        <Link 
          href="/courses" 
          className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors"
        >
          Volver a Cursos
        </Link>
      </div>
    );
  }

  // Calculate dynamic data
  const totalDuration = course.total_duration_seconds ?? course.modules?.reduce(
    (acc: number, m: any) => acc + (m.lessons?.reduce((s: number, l: any) => s + (l.duration_seconds ?? 0), 0) ?? 0),
    0
  );
  
  const levelLabels: Record<string, string> = {
    BASIC: "Básico",
    INTERMEDIATE: "Intermedio",
    ADVANCED: "Avanzado"
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Breadcrumbs */}
      <div className="bg-muted/30 border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <Home className="w-4 h-4" /> Inicio
            </Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <Link href="/courses" className="hover:text-primary transition-colors">
              Cursos
            </Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {course.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-card border-b border-border/60 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24 relative z-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
                {levelLabels[course.course_level] || course.course_level}
              </span>
              {course.category && (
                <span className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-bold uppercase tracking-wider border border-border/50">
                  {course.category.name}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] mb-6">
              {course.title}
            </h1>

            {course.short_description && (
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl font-medium">
                {course.short_description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">Última actualización</span>
                  <span className="text-foreground">
                    {new Date(course.updated_at).toLocaleDateString("es-ES", {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs">Estudiantes</span>
                  <span className="text-foreground">
                    {course.enrolled_count ? course.enrolled_count.toLocaleString() : 0} inscritos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
          
          {/* Left Column (Content) */}
          <div className="space-y-16">
            
            {/* What you'll learn */}
            {course.what_you_will_learn && course.what_you_will_learn.length > 0 && (
              <div className="p-8 rounded-3xl bg-muted/20 border border-border/50">
                <h3 className="text-2xl font-bold text-foreground mb-6">Lo que aprenderás</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.what_you_will_learn.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/80 leading-relaxed text-sm md:text-base">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed">
              <h3 className="text-2xl font-bold text-foreground mb-4">Acerca de este curso</h3>
              <p className="whitespace-pre-line text-lg">
                {course.description || "Este curso no proporciona una descripción detallada en este momento."}
              </p>
            </div>

            {/* Requirements */}
            {course.requirements && course.requirements.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Requisitos</h3>
                <ul className="space-y-3">
                  {course.requirements.map((req: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 text-muted-foreground bg-muted/10 p-4 rounded-xl border border-border/30">
                      <div className="w-2 h-2 rounded-full bg-primary/50" />
                      <span className="font-medium text-[15px]">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Curriculum */}
            <CourseCurriculum modules={course.modules || []} />

            {/* Instructor */}
            {course.instructor && (
              <CourseInstructor instructor={course.instructor} />
            )}

          </div>

          {/* Right Column (Sidebar) */}
          <div className="hidden lg:block">
            <CourseEnrollCard course={course} />
          </div>

        </div>
      </section>

      {/* Floating Action Button for Mobile Enrollment */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-border/50 lg:hidden z-50 flex gap-4 items-center">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium mb-0.5">Precio</p>
          <p className="font-bold text-foreground">Gratis</p>
        </div>
        <button className="flex-1 bg-primary text-primary-foreground h-12 rounded-xl font-bold shadow-lg shadow-primary/25">
          Inscribirme Ahora
        </button>
      </div>

    </div>
  );
}
