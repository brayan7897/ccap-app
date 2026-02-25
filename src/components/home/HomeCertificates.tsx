import { ShieldCheck, Search, Globe, Lock, Briefcase } from "lucide-react";

export function HomeCertificates() {
  return (
    <section className="py-24 bg-[#171b26] border-y border-slate-800/60 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#2ecc71]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2ecc71]/10 border border-[#2ecc71]/20 text-[#2ecc71] font-semibold text-xs tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>VALIDACIÓN OFICIAL</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Asegura el <span className="text-[#2ecc71]">valor</span> <br />de tus logros.
            </h2>
            
            <p className="text-slate-400 text-lg">
              Empresas y reclutadores confían en nuestros certificados. Ingresa tu código único y demuestra instantáneamente tus habilidades validadas por CIAR.
            </p>

            <div className="relative max-w-md bg-[#11141d] p-1.5 rounded-xl border border-slate-800 flex items-center shadow-lg focus-within:border-[#2ecc71]/50 transition-colors">
              <div className="pl-3 pr-2 text-slate-500">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Código ej. CIAR-2026-X9" 
                className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-slate-600 uppercase"
              />
              <button className="bg-[#2ecc71] hover:bg-[#27ae60] text-[#0f2a1b] px-4 py-2.5 rounded-lg font-bold transition-colors">
                Verificar
              </button>
            </div>
          </div>

          {/* Benefits Cards Side */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-[#11141d]/80 border border-slate-800 p-6 rounded-2xl flex gap-4 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Respaldo Internacional</h3>
                <p className="text-sm text-slate-400">Avalados por los principales Colegios de Ingenieros y Arquitectos.</p>
              </div>
            </div>

            <div className="bg-[#11141d]/80 border border-slate-800 p-6 rounded-2xl flex gap-4 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 bg-[#2ecc71]/10 rounded-xl flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6 text-[#2ecc71]" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Tecnología Inmutable</h3>
                <p className="text-sm text-slate-400">Firmas digitales encriptadas y registro seguro para evitar fraudes.</p>
              </div>
            </div>

            <div className="bg-[#11141d]/80 border border-slate-800 p-6 rounded-2xl flex gap-4 hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Potencial Laboral</h3>
                <p className="text-sm text-slate-400">Agrega tu escudo directo a LinkedIn; el 85% de egresados mejora su sueldo.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
