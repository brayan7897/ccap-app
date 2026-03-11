import Image from "next/image";
import { User as UserIcon, Award, Star, Users } from "lucide-react";
import type { User } from "@/types";

interface CourseInstructorProps {
  instructor?: Pick<User, "id" | "first_name" | "last_name" | "avatar_url"> & { bio?: string | null };
}

export function CourseInstructor({ instructor }: CourseInstructorProps) {
  if (!instructor) return null;

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-card border border-border/60 shadow-lg relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
        <Award className="w-32 h-32" />
      </div>

      <h3 className="text-xl font-bold text-foreground mb-6">Tu Instructor</h3>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Avatar */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 shrink-0 shadow-md">
          {instructor.avatar_url ? (
            <Image
              src={instructor.avatar_url}
              alt={`${instructor.first_name} ${instructor.last_name}`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
              <UserIcon className="w-10 h-10" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h4 className="text-lg font-bold text-foreground mb-1">
            {instructor.first_name} {instructor.last_name}
          </h4>
          <p className="text-sm font-medium text-primary mb-4">Instructor Experto</p>

          {/* Stats placeholder */}
          <div className="flex flex-wrap gap-4 mb-4 text-xs font-semibold text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>4.9 Valoración</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              <span>+2,500 Estudiantes</span>
            </div>
          </div>

          <p className="text-sm text-foreground/80 leading-relaxed">
            {instructor.bio ||
              "Profesional altamente capacitado con años de experiencia en la industria. Apasionado por compartir conocimientos y guiar a estudiantes hacia el éxito profesional."}
          </p>
        </div>
      </div>
    </div>
  );
}
