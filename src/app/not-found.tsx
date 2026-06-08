import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-8 bg-background relative overflow-hidden">
        {/* Background blobs for aesthetics */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-muted/50 border border-border/50 shadow-sm mb-4">
            <Compass className="w-12 h-12 text-muted-foreground/50" />
          </div>
          
          <h1 className="text-7xl font-black text-foreground tracking-tight">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Página no encontrada
          </h2>
          
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
            Lo sentimos, no pudimos encontrar la página que estás buscando. Es posible que el enlace sea incorrecto o que la página haya sido movida.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-auto">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Link>
            <Link
              href="/catalog"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-card text-foreground font-bold border border-border/60 hover:bg-muted transition-all text-center"
            >
              Ver catálogo de cursos
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
