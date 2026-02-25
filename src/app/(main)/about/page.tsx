import Image from "next/image";
import Link from "next/link";
import { Users, Target, Zap } from "lucide-react";

const TEAM_MEMBERS = [
  {
    name: "Ing. Roberto Díaz",
    role: "Director Académico, CIAR",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  },
  {
    name: "Arq. Sofia Paredes",
    role: "Líder de Especialidades BIM",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    name: "Ing. Carlos Mendoza",
    role: "Experto en Estructuras",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    name: "Ing. Laura Jiménez",
    role: "Gerente de Proyectos PMP",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#11141d]">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden border-b border-slate-800/60">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11141d] to-transparent" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.1]">
              Construyendo la próxima generación de <span className="text-blue-500">líderes técnicos.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light mb-10">
              En CIAR creemos que la ingeniería y la arquitectura son los pilares del progreso humano. Nuestra misión es democratizar el acceso a la educación técnica de más alta calidad, cerrando la brecha entre la teoría académica y la excelencia profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/courses" className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-center transition-colors">
                Explorar Catálogo
              </Link>
              <Link href="/contact" className="px-8 py-3.5 bg-[#171b26] border border-slate-700 hover:border-slate-500 text-white rounded-full font-bold text-center transition-all">
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#11141d]">
        <div className="container mx-auto px-4 lg:px-8 hover:cursor-default">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Misión</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Empoderar a profesionales de la construcción e ingeniería con herramientas tecnológicas de última generación, impulsando su competitividad en un mercado global cada vez más exigente.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Visión</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Ser la plataforma E-Learning referente y líder indiscutible en habla hispana para la especialización técnica, formando a los arquitectos e ingenieros que construirán las ciudades del mañana.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 rounded-xl bg-[#2ecc71]/10 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-[#2ecc71]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Comunidad</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                No solo impartimos clases, fomentamos ecosistemas de networking activo donde docentes de élite mentorizan a la próxima oleada de talentos hispanos.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-[#171b26] border-y border-slate-800/60">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-white mb-4">Conoce a nuestros expertos</h2>
            <p className="text-slate-400">Instructores con años de experiencia real en campo y proyectos internacionales a gran escala.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, idx) => (
              <div key={idx} className="bg-[#11141d] rounded-2xl p-6 border border-slate-800 text-center hover:border-slate-700 transition-colors">
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-slate-800">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <h4 className="text-white font-bold text-base mb-1">{member.name}</h4>
                <p className="text-blue-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Únete a la revolución técnica</h2>
          <p className="text-xl text-slate-300 mb-10">Más de 20,000 estudiantes ya han acelerado sus carreras. ¿Estás listo para dar el siguiente paso?</p>
          <Link href="/register" className="inline-block px-10 py-4 bg-white text-[#11141d] hover:bg-slate-200 rounded-full font-extrabold text-lg transition-colors shadow-2xl shadow-white/10">
            Comenzar mi educación hoy
          </Link>
        </div>
      </section>

    </div>
  );
}
