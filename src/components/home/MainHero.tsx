import Link from "next/link";
import Image from "next/image";
import { Building2, HardHat, Briefcase } from "lucide-react";

export function MainHero() {
  return (
    <section className="relative w-full pt-20 pb-28 md:pt-32 md:pb-40 overflow-hidden bg-[#11141d]">
      {/* Background Subtle Highlights */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-40 left-20 w-2 h-2 rounded-full bg-slate-500/50" />
      <div className="absolute top-20 right-1/3 w-1.5 h-1.5 rounded-full bg-slate-400/50" />
      <div className="absolute bottom-40 right-20 w-3 h-3 rounded-full bg-blue-500/30" />

      <div className="container mx-auto px-4 lg:px-8 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Column: Text Content */}
          <div className="text-left space-y-8 max-w-2xl relative z-20">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/30 border border-blue-800/50">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-xs font-semibold text-blue-300 tracking-wide">
                Inscripciones Abiertas 2026
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              Este 2026, <br />
              <span className="text-white">el mercado </span>
              <span className="text-blue-500">exige más.</span>
            </h1>
            
            {/* Subheadline Highlight */}
            <h2 className="text-xl md:text-2xl text-slate-300 font-semibold max-w-xl">
              Para destacar, necesitas <span className="text-blue-400">Nuevo Conocimiento</span>.
            </h2>

            {/* Paragraph */}
            <p className="text-base md:text-lg text-slate-400 font-normal max-w-xl leading-relaxed">
              El mercado evoluciona y tú también deberías. Domina las nuevas herramientas con el respaldo de la <strong className="text-white">élite nacional (CIP, CAP, CEL)</strong> y los <strong className="text-white">líderes globales (Autodesk, RIB Presto)</strong>.
            </p>

            {/* Custom Stats block */}
            <div className="flex gap-12 pt-2 pb-6">
              <div>
                <p className="text-3xl font-extrabold text-white">+13</p>
                <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mt-1">Especializaciones</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">+204</p>
                <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mt-1">Cursos Disponibles</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/register" 
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-full transition-all duration-300"
              >
                Descubrir mi Especialización 
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              
              <Link 
                href="/catalog" 
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-slate-300 bg-slate-800/50 border border-slate-700 hover:bg-slate-800 hover:text-white rounded-full transition-colors duration-300"
              >
                Registrarse
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Component Layout */}
          <div className="relative mx-auto w-full lg:h-[600px] flex items-end justify-center lg:justify-end lg:pr-10 z-10">
            {/* Engineer Image */}
            <div className="relative w-full max-w-md aspect-[3/4] z-10 bottom-0 pointer-events-none">
              <Image 
                src="https://images.unsplash.com/photo-1541888086425-d81bb190408?q=80&w=1000&auto=format&fit=crop"
                alt="Ingeniero con tablet transparente"
                fill
                className="object-cover object-top opacity-90 rounded-[3rem] mix-blend-luminosity brightness-110" 
                // Using blend modes to make a normal image look cool and integrated into the dark background
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11141d] via-transparent to-transparent z-20" />
            </div>

            {/* Floating Cards (Real React Components, not part of the image) */}
            <div className="absolute bottom-8 left-0 right-0 lg:left-[-10%] lg:right-auto z-30 flex flex-col sm:flex-row gap-4 justify-center">
              
              {/* Card 1 */}
              <div className="bg-[#171b26]/90 backdrop-blur-md border border-slate-800 p-4 rounded-xl flex items-center gap-4 hover:border-blue-500/50 hover:bg-[#1a1f2c] transition-colors shadow-2xl w-full sm:w-auto">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">Ingeniería Civil<br />y Arquitectura</h4>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#171b26]/90 backdrop-blur-md border border-slate-800 p-4 rounded-xl flex items-center gap-4 hover:border-blue-500/50 hover:bg-[#1a1f2c] transition-colors shadow-2xl w-full sm:w-auto">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <HardHat className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">Construcción<br />y Minería</h4>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#171b26]/90 backdrop-blur-md border border-slate-800 p-4 rounded-xl flex items-center gap-4 hover:border-blue-500/50 hover:bg-[#1a1f2c] transition-colors shadow-2xl w-full sm:w-auto">
                <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Briefcase className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">Gestión y<br />Administración</h4>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
