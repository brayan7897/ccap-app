import { ShieldCheck, Search, Globe, Lock, Briefcase } from "lucide-react";

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-[#11141d]">
      
      {/* Hero Verifier Section */}
      <section className="relative pt-24 pb-32 overflow-hidden border-b border-slate-800/60">
        {/* Background Gradients */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-1/4 w-[500px] h-[500px] bg-[#2ecc71]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/20 border border-blue-800/30 text-blue-400 font-semibold text-sm">
              <ShieldCheck className="w-5 h-5" />
              Verificación Oficial de Certificados
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Asegura el valor de tu <br /> <span className="text-blue-500">conocimiento.</span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Ingresa el código único ubicado en la parte inferior de tu certificado CIAR para validar su autenticidad ante empresas e instituciones.
            </p>

            {/* Verification Input Box */}
            <div className="relative max-w-xl mx-auto mt-12 bg-[#171b26] p-2 rounded-2xl border border-slate-800 shadow-2xl flex items-center focus-within:border-blue-500/50 transition-colors">
              <div className="pl-4 pr-2 text-slate-500">
                <Search className="w-6 h-6" />
              </div>
              <input 
                type="text" 
                placeholder="Ej. CIAR-2026-A1X9B" 
                className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-slate-600 uppercase"
              />
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/25">
                Verificar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white">El valor de certificarse con CIAR</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Benefit 1 */}
            <div className="bg-[#171b26]/50 border border-slate-800/80 rounded-2xl p-8 hover:bg-[#171b26] transition-colors group">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Respaldo Internacional</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Avalados por el Colegio de Ingenieros, Colegio de Arquitectos y principales firmas tecnológicas como Autodesk.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-[#171b26]/50 border border-slate-800/80 rounded-2xl p-8 hover:bg-[#171b26] transition-colors group">
              <div className="w-14 h-14 bg-[#2ecc71]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-7 h-7 text-[#2ecc71]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Tecnología Inmutable</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Generados con firma digital encriptada para evitar falsificaciones, garantizando un registro permanente y seguro.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-[#171b26]/50 border border-slate-800/80 rounded-2xl p-8 hover:bg-[#171b26] transition-colors group">
              <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-7 h-7 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Impacto Laboral</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Agrega tu credencial a LinkedIn con un clic. El 85% de nuestros egresados mejora sus oportunidades profesionales.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
