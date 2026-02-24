import Link from "next/link";
import Image from "next/image";
import { BookOpen, BarChart2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { Course } from "@/types";

const levelLabel: Record<string, string> = {
  BASIC:        "Básico",
  INTERMEDIATE: "Intermedio",
  ADVANCED:     "Avanzado",
};

const levelVariant: Record<string, "default" | "secondary" | "destructive"> = {
  BASIC:        "secondary",
  INTERMEDIATE: "default",
  ADVANCED:     "destructive",
};

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="group h-full overflow-hidden transition-shadow hover:shadow-md">
        {/* Thumbnail */}
        <div className="relative aspect-video w-full bg-muted">
          {course.thumbnail_url ? (
            <Image
              src={course.thumbnail_url}
              alt={course.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <BookOpen className="h-10 w-10" />
            </div>
          )}
        </div>

        <CardHeader className="p-4 pb-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
              {course.title}
            </h3>
            <Badge variant={levelVariant[course.course_level]} className="shrink-0 text-xs">
              {levelLabel[course.course_level] ?? course.course_level}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="px-4 pb-2">
          {course.short_description && (
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {course.short_description}
            </p>
          )}
        </CardContent>

        <CardFooter className="flex items-center gap-2 px-4 pb-4 pt-0 text-xs text-muted-foreground">
          <BarChart2 className="h-3.5 w-3.5" />
          <span>{levelLabel[course.course_level] ?? course.course_level}</span>
          {course.tags.slice(0, 2).map((t) => (
            <Badge key={t} variant="outline" className="text-[10px] px-1.5 py-0">
              {t}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
