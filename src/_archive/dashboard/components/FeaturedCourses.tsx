import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Star, PlayCircle } from "lucide-react";
import Image from "next/image";

// Simulated mock data
const FEATURED_COURSES = [
  {
    id: 1,
    title: "Gestión Estratégica",
    instructor: "Ana Martínez",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
    duration: "4h 30m",
    rating: 4.8,
    category: "Negocios"
  },
  {
    id: 2,
    title: "Análisis de Datos con Excel",
    instructor: "Carlos Rivera",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    duration: "6h 15m",
    rating: 4.9,
    category: "Tecnología"
  },
  {
    id: 3,
    title: "Liderazgo Efectivo",
    instructor: "Laura Gómez",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop",
    duration: "3h 45m",
    rating: 4.7,
    category: "Desarrollo Personal"
  }
];

export function FeaturedCourses() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Cursos Recomendados</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Impulsa tu carrera con nuestra selección especial
          </p>
        </div>
        <Button variant="link" className="hidden sm:flex" asChild>
          <a href="/catalog">Ver todo el catálogo →</a>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_COURSES.map((course) => (
          <Card key={course.id} className="group overflow-hidden border-border/50 bg-card hover:shadow-md transition-all duration-300">
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
              <Badge className="absolute top-3 right-3 bg-background/80 text-foreground backdrop-blur-md border-none">
                {course.category}
              </Badge>
            </div>
            
            <CardContent className="p-5">
              <h3 className="font-semibold text-lg line-clamp-1 mb-2 group-hover:text-primary transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                por {course.instructor}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-zinc-700 dark:text-zinc-300">{course.rating}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-5 pt-0">
              <Button className="w-full gap-2 rounded-xl" variant="secondary">
                <PlayCircle className="w-4 h-4" />
                Ver detalles
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Button variant="outline" className="w-full sm:hidden mt-4" asChild>
        <a href="/catalog">Ver todo el catálogo</a>
      </Button>
    </section>
  );
}
