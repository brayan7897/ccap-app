import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DashboardHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/10 p-8 sm:p-12">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-64 h-64 rounded-full bg-primary/20 blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl opacity-50 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Bienvenido de vuelta</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Continúa tu aprendizaje
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
            Estás a un paso de alcanzar tus metas. Retoma tus cursos donde los dejaste y sigue construyendo tu futuro con CCAP.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="gap-2 rounded-full font-medium">
              <Link href="/courses">
                Ir a mis cursos <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full bg-background/50 backdrop-blur-sm">
              <Link href="/catalog">
                Explorar catálogo
              </Link>
            </Button>
          </div>
        </div>

        {/* Optional: Add an illustration or quick stats here in the future */}
        <div className="hidden lg:flex flex-col gap-4 min-w-[300px]">
          <div className="p-6 rounded-xl bg-card border border-border/50 shadow-sm backdrop-blur-sm">
            <p className="text-sm font-medium text-muted-foreground mb-1">Último curso visto</p>
            <h3 className="font-semibold text-lg line-clamp-1">Estrategias de Marketing Digital</h3>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-2 flex-1 rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-primary w-[45%] rounded-full" />
              </div>
              <span className="text-sm font-medium">45%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
