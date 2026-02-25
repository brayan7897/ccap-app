const STATS = [
  { value: "+50", label: "Cursos Especializados" },
  { value: "+10k", label: "Estudiantes Activos" },
  { value: "4.9/5", label: "Calificación Promedio" },
  { value: "98%", label: "Tasa de Empleabilidad" },
];

export function PlatformStats() {
  return (
    <section className="w-full bg-slate-900 py-20 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-300 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-slate-800">
          {STATS.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-4">
              <span className="text-4xl md:text-5xl font-extrabold text-[#2ecc71] mb-2">
                {stat.value}
              </span>
              <span className="text-sm md:text-base text-slate-300 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
