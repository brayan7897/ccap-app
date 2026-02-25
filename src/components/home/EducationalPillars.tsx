import { MapPin, ShieldCheck, Globe } from "lucide-react";

const PILLARS = [
  {
    title: "Aprendizaje Práctico",
    description: "Enfoque hands-on con casos reales del sector construcción y minería para aplicar lo aprendido inmediatamente.",
    icon: MapPin,
  },
  {
    title: "Instructores Expertos",
    description: "Profesionales activos y líderes en grandes proyectos de infraestructura comparten su experiencia directa.",
    icon: ShieldCheck,
  },
  {
    title: "Certificación Internacional",
    description: "Validez global con estándares internacionales y convenios con instituciones de prestigio.",
    icon: Globe,
  }
];

export function EducationalPillars() {
  return (
    <section className="w-full bg-white dark:bg-slate-950 py-24 border-b border-slate-100 dark:border-slate-800">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <p className="text-xs font-bold text-blue-600 dark:text-blue-500 tracking-[0.2em] uppercase">
            Por qué elegirnos
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Nuestros Pilares Educativos
          </h2>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((pillar, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-3xl bg-[#f8fafc] dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <pillar.icon className="w-7 h-7" />
              </div>
              
              {/* Text Content */}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {pillar.title}
              </h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
