import Image from "next/image";
import Link from "next/link";
import { Users, Target, Zap } from "lucide-react";

export function HomeAbout() {
  return (
    <section className="py-24 bg-[#11141d] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-900/40 rounded-l-[100px] skew-x-[-10deg] translate-x-12 hidden lg:block" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8 max-w-xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Construyendo <br />la generación de <br/>
              <span className="text-blue-500">líderes técnicos.</span>
            </h2>
            
            <p className="text-lg text-slate-400 leading-relaxed font-light">
              En CIAR, creemos que la arquitectura y la ingeniería son los motores del progreso. Nuestra misión es democratizar el aprendizaje de élite, acortando la brecha entre la academia y la excelencia profesional real.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <h3 className="text-4xl font-black text-white mb-2">+20M</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Horas de clase impartidas</p>
              </div>
              <div>
                <h3 className="text-4xl font-black text-white mb-2">+150</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Docentes Expertos</p>
              </div>
            </div>

            <div className="pt-6">
              <Link href="/about" className="inline-block px-8 py-3.5 bg-[#171b26] border border-slate-700 text-white hover:bg-slate-800 hover:border-slate-500 transition-all font-bold rounded-full">
                Conoce a nuestro equipo
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg aspect-square">
            <div className="absolute inset-4 rounded-[2rem] overflow-hidden border-2 border-slate-800">
              <Image 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                alt="Nosotros CIAR"
                fill
                className="object-cover mix-blend-luminosity opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#11141d]/80 via-transparent to-blue-500/20" />
            </div>
            
            {/* Mission Badge overlay */}
            <div className="absolute -bottom-6 -left-6 bg-[#171b26] p-6 rounded-2xl border border-slate-700 shadow-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Misión CIAR</h4>
                <p className="text-sm text-slate-400">Excelencia académica global</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
