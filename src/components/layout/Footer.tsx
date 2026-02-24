import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary font-semibold">
          <BookOpen className="h-5 w-5" />
          <span>CCAP E-Learning</span>
        </Link>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} CCAP. Todos los derechos reservados.
        </p>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/catalog" className="hover:text-foreground transition-colors">Catálogo</Link>
          <Link href="/login"   className="hover:text-foreground transition-colors">Iniciar sesión</Link>
        </nav>
      </div>
    </footer>
  );
}
