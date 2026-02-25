import { Compass, TrendingUp, Calculator, Building2, HardHat, ShieldAlert } from "lucide-react";

const SPECIALTIES = [
  {
    title: "Lean Six Sigma",
    description: "Optimiza procesos y gestiona proyectos con metodologías ágiles aplicadas a la construcción.",
    icon: Compass,
    hours: "120 Horas",
    badge: "NUEVO",
    badgeColor: "bg-emerald-100 text-emerald-700"
  },
  {
    title: "Mejora de Procesos",
    description: "Aprende a identificar cuellos de botella y mejorar la eficiencia operativa en proyectos industriales.",
    icon: TrendingUp,
    hours: "80 Horas"
  },
  {
    title: "Analista de Costos",
    description: "Domina el análisis de precios unitarios, presupuestos y control de costos en obras civiles.",
    icon: Calculator,
    hours: "160 Horas",
    badge: "TOP VENTAS",
    badgeColor: "bg-amber-100 text-amber-700"
  },
  {
    title: "Residencia de Obras",
    description: "Gestión integral de obras públicas y privadas cumpliendo la normativa vigente.",
    icon: Building2,
    hours: "200 Horas"
  },
  {
    title: "Gestión BIM",
    description: "Modelado de información de construcción 3D, 4D y 5D para proyectos modernos.",
    icon: HardHat,
    hours: "150 Horas",
    badge: "ESPECIAL",
    badgeColor: "bg-purple-100 text-purple-700"
  },
  {
    title: "SSOMA",
    description: "Seguridad, Salud Ocupacional y Medio Ambiente aplicado a proyectos mineros.",
    icon: ShieldAlert,
    hours: "120 Horas"
  }
];

export function MotivationAndSpecialties() {
  return (
    <section className="w-full bg-[#f8fafc] dark:bg-slate-900 py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-bold text-blue-600 dark:text-blue-500 tracking-[0.2em] uppercase">
              Educación que si funciona
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Especializaciones Destacadas
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              Domina y potencia tus conocimientos en el sector de gestión e ingeniería con nuestras rutas de aprendizaje certificadas.
            </p>
          </div>
          <button className="hidden md:inline-flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors">
            Ver todas las rutas →
          </button>
        </div>

        {/* White Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIALTIES.map((spec, index) => (
            <div 
              key={index}
              className="group flex flex-col bg-white dark:bg-slate-950 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <spec.icon className="w-6 h-6" />
                </div>
                {spec.badge && (
                  <span className={`px-2.5 py-1 text-[10px] font-black tracking-wider uppercase rounded-full ${spec.badgeColor}`}>
                    {spec.badge}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {spec.title}
              </h3>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
                {spec.description}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 mt-auto">
                <span className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {spec.hours}
                </span>
                
                <button className="text-xs font-bold text-blue-600 dark:text-blue-500 hover:text-blue-800 transition-colors flex items-center gap-1">
                  Ver detalles <span>›</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile View All Button */}
        <button className="w-full mt-8 py-4 inline-flex md:hidden justify-center items-center text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
          Ver todas las rutas →
        </button>
      </div>
    </section>
  );
}
