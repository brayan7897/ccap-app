import Link from "next/link";
import { CourseCard } from "@/components/courses/CourseCard";
import { Target, Zap, Users } from "lucide-react";
import Image from "next/image";

// Mock Data for the courses
const MOCK_COURSES = [
  {
    id: "civ-01",
    title: "Diseño Estructural Avanzado con SAP2000 v24",
    instructor: {
      name: "Ing. Carlos Mendoza",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    thumbnail: "https://images.unsplash.com/photo-1541888086425-d81bb190408?w=800&q=80",
    category: "Ing. Civil",
    duration: "40 horas",
    rating: 4.8,
    students: 1250,
    price: 350,
    originalPrice: 450,
  },
  {
    id: "arq-01",
    title: "Modelado BIM Arquitectónico con Revit 2024",
    instructor: {
      name: "Arq. Sofia Paredes",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
    },
    thumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    category: "Arquitectura",
    duration: "35 horas",
    rating: 4.9,
    students: 890,
    price: 280,
    originalPrice: 380,
  },
  {
    id: "min-01",
    title: "Planeamiento y Operaciones Mineras Subterráneas",
    instructor: {
      name: "Ing. Roberto Díaz",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
    },
    thumbnail: "https://images.unsplash.com/photo-1578589318433-39b0051e5e66?w=800&q=80",
    category: "Minería",
    duration: "45 horas",
    rating: 4.7,
    students: 620,
    price: 420,
    originalPrice: 500,
  },
  {
    id: "ges-01",
    title: "Gestión de Proyectos PMI para Construcción",
    instructor: {
      name: "Ing. Laura Jiménez (PMP)",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    },
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    category: "Gestión",
    duration: "50 horas",
    rating: 4.9,
    students: 2100,
    price: 290,
    originalPrice: 400,
  }
];

export function HomeCourses() {
  return (
    <section className="py-24 bg-[#11141d]">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Cursos Destacados
            </h2>
            <p className="text-slate-400 text-lg">
              Aprende de los líderes de la industria y domina las herramientas que exige el mercado laboral actual.
            </p>
          </div>
          <Link href="/courses" className="shrink-0 text-blue-400 hover:text-blue-300 font-semibold group flex items-center gap-2">
            Ver catálogo completo
            <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_COURSES.map(course => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

      </div>
    </section>
  );
}
