import { CourseCard } from "@/components/courses/CourseCard";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

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
  },
  {
    id: "civ-02",
    title: "Análisis Sísmico Dinámico en Edificaciones de Concreto",
    instructor: {
      name: "Ing. Carlos Mendoza",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    thumbnail: "https://images.unsplash.com/photo-1481253127861-534498168948?w=800&q=80",
    category: "Estructuras",
    duration: "60 horas",
    rating: 5.0,
    students: 430,
    price: 490,
  },
  {
    id: "arq-02",
    title: "Visualización Arquitectónica Fotorrealista en Lumion",
    instructor: {
      name: "Arq. Mateo Ríos",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    category: "Visualización",
    duration: "25 horas",
    rating: 4.6,
    students: 1150,
    price: 180,
    originalPrice: 250,
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#11141d] pt-8 pb-20">
      
      {/* Page Header */}
      <div className="container mx-auto px-4 lg:px-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          Explora nuestros <span className="text-blue-500">Cursos</span>
        </h1>
        
        {/* Search Bar Container */}
        <div className="w-full max-w-3xl flex items-center bg-[#171b26] border border-slate-800 rounded-xl overflow-hidden focus-within:border-blue-500/50 transition-colors shadow-lg">
          <div className="pl-4 flex items-center justify-center text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input 
            type="text" 
            placeholder="Buscar por curso, instructor, software..." 
            className="w-full bg-transparent border-none outline-none text-white px-4 py-4 placeholder:text-slate-500"
          />
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 font-semibold transition-colors">
            Buscar
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            <div className="flex items-center gap-2 text-white font-bold mb-4 pb-4 border-b border-slate-800">
              <SlidersHorizontal className="w-5 h-5 text-blue-500" />
              <h2>Filtros</h2>
            </div>

            {/* Filter Category */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Categoría</h3>
              <ul className="space-y-2">
                {["Ingeniería Civil", "Arquitectura", "Gestión BIM", "Minería", "Software Premium"].map(cat => (
                  <li key={cat}>
                    <label className="flex items-center gap-3 text-sm text-slate-400 hover:text-white cursor-pointer group transition-colors">
                      <div className="w-4 h-4 rounded border border-slate-700 group-hover:border-blue-500 flex items-center justify-center bg-[#171b26]">
                        {/* Checkbox logic will go here later */}
                      </div>
                      {cat}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Filter Level */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Nivel</h3>
              <ul className="space-y-2">
                {["Básico", "Intermedio", "Avanzado", "Experto"].map(level => (
                  <li key={level}>
                    <label className="flex items-center gap-3 text-sm text-slate-400 hover:text-white cursor-pointer group transition-colors">
                      <div className="w-4 h-4 rounded border border-slate-700 group-hover:border-blue-500 flex items-center justify-center bg-[#171b26]">
                      </div>
                      {level}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-400 text-sm">Mostrando <span className="text-white font-bold">{MOCK_COURSES.length}</span> resultados</p>
              
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Filter className="w-4 h-4" />
                <span>Ordenar por:</span>
                <select className="bg-[#171b26] border border-slate-800 rounded-md px-3 py-1.5 text-white outline-none focus:border-blue-500">
                  <option>Más Populares</option>
                  <option>Nuevos</option>
                  <option>Precio: Menor a Mayor</option>
                </select>
              </div>
            </div>

            {/* Grid of Course Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {MOCK_COURSES.map(course => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
            
            {/* Pagination Placeholder */}
            <div className="mt-12 flex items-center justify-center gap-2">
              <button className="w-10 h-10 rounded-lg border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#171b26] hover:text-white transition-colors">&lt;</button>
              <button className="w-10 h-10 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center">1</button>
              <button className="w-10 h-10 rounded-lg border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#171b26] hover:text-white transition-colors">2</button>
              <button className="w-10 h-10 rounded-lg border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#171b26] hover:text-white transition-colors">3</button>
              <span className="text-slate-500">...</span>
              <button className="w-10 h-10 rounded-lg border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#171b26] hover:text-white transition-colors">&gt;</button>
            </div>
            
          </main>
          
        </div>
      </div>

    </div>
  );
}
