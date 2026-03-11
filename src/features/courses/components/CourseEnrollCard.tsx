"use client";

import Image from "next/image";
import { BookOpen, Infinity as InfinityIcon, Trophy, Smartphone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Course } from "@/types";
import { useEnroll } from "../hooks/useCourses";

interface CourseEnrollCardProps {
  course: Course;
}

export function CourseEnrollCard({ course }: CourseEnrollCardProps) {
  const enrollMutation = useEnroll();

  const handleEnroll = () => {
    // We pass a dummy user ID here for testing or integrate it with an auth hook natively
    // Using a fallback for demo purposes.
    const mockUserId = "some-user-id";
    enrollMutation.mutate({ courseId: course.id, userId: mockUserId });
  };

  return (
    <div className="rounded-3xl bg-card border border-border/60 shadow-xl overflow-hidden sticky top-24">
      {/* Thumbnail Header inside the card for desktop (optional, depends on design, but lets put it) */}
      <div className="relative aspect-video w-full bg-muted">
        {course.thumbnail_url ? (
          <Image
            src={course.thumbnail_url}
            alt={course.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground bg-muted/50">
            <BookOpen className="h-12 w-12 opacity-50" />
          </div>
        )}
      </div>

      <div className="p-6 md:p-8">
        <div className="text-3xl font-black text-foreground mb-6">Free</div>

        <Button
          onClick={handleEnroll}
          disabled={enrollMutation.isPending}
          className="w-full h-14 text-base font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_8px_30px_-10px_rgba(var(--primary-rgb),0.5)] transition-all hover:-translate-y-1 mb-6"
        >
          {enrollMutation.isPending ? "Inscribiendo..." : "Inscribirme Ahora"}
        </Button>

        <div className="space-y-4">
          <h4 className="text-sm font-bold text-foreground">Este curso incluye:</h4>
          
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <Video className="w-4 h-4 text-primary" />
              <span>{course.total_lessons || 0} lecciones en video/texto</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <InfinityIcon className="w-4 h-4 text-primary" />
              <span>Acceso de por vida</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <Smartphone className="w-4 h-4 text-primary" />
              <span>Acceso en dispositivos móviles y TV</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <Trophy className="w-4 h-4 text-primary" />
              <span>Certificado de finalización</span>
            </li>
          </ul>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            Garantía de reembolso de 30 días
          </p>
        </div>
      </div>
    </div>
  );
}
