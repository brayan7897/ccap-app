import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Carlos Rivera",
    role: "Analista Financiero",
    company: "Banco Nacional",
    image: "https://i.pravatar.cc/150?img=11",
    text: "Los cursos de especialización me dieron las herramientas exactas que necesitaba para conseguir mi ascenso. El contenido es directo y sumamente práctico para el entorno real."
  },
  {
    name: "Laura Gómez",
    role: "Ingeniera de Procesos",
    company: "Tech Solutions",
    image: "https://i.pravatar.cc/150?img=5",
    text: "La flexibilidad de la plataforma y el nivel de los instructores superaron todas mis expectativas. Recomiendo totalmente el curso de Lean Six Sigma, cambió mi perspectiva laboral."
  },
  {
    name: "David Chen",
    role: "Director de Operaciones",
    company: "Logistics Pro",
    image: "https://i.pravatar.cc/150?img=12",
    text: "Capacitar a mi equipo corporativo con CCAP ha sido la mejor inversión del año. Hemos notado una mejora sustancial en nuestra eficiencia operativa casi de inmediato."
  }
];

export function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Nuestros estudiantes nos avalan
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Descubre por qué miles de profesionales eligen nuestra plataforma para acelerar su crecimiento profesional e impulsar su carrera al siguiente nivel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex gap-1 text-[#2ecc71] mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-current" />
                ))}
              </div>
              
              <p className="text-slate-700 leading-relaxed flex-grow italic mb-8">
                &quot;{testimonial.text}&quot;
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.image} 
                  alt={`Fotografía de ${testimonial.name}`} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role} en {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
