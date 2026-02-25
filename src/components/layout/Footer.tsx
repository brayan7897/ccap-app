import Link from "next/link";
import { Heart, FileText, Lock, Shield, Settings, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#11141d] border-t border-slate-800/60 pt-16 pb-8 text-slate-400">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="h-10 w-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-md flex items-center justify-center text-white font-black text-2xl">
                C
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black text-3xl tracking-tight leading-none">CIAR</span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-slate-300 mt-1">Capacitación Global</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              La comunidad de ingenieros y arquitectos más grande de Latinoamérica.
            </p>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer text-white">f</span>
              <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer text-white">y</span>
              <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer text-white">ig</span>
            </div>
          </div>

          {/* Column 2: Únete a CIAR */}
          <div>
            <h4 className="text-white font-bold flex items-center gap-2 mb-6">
              <Heart className="w-4 h-4 text-[#2ecc71]" /> Únete a CIAR
            </h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/instructor" className="hover:text-blue-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-700" /> Sé instructor</Link></li>
              <li><Link href="/affiliates" className="hover:text-blue-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Programa de afiliados</Link></li>
              <li><Link href="/business" className="hover:text-blue-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Empresas</Link></li>
              <li><Link href="/resources" className="hover:text-blue-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-500" /> Biblioteca de recursos</Link></li>
            </ul>
          </div>

          {/* Column 3: Información Legal */}
          <div>
            <h4 className="text-white font-bold flex items-center gap-2 mb-6">
              <Shield className="w-4 h-4 text-[#2ecc71]" /> Información Legal
            </h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors flex items-center gap-2"><FileText className="w-4 h-4 text-slate-500" /> Términos y condiciones</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors flex items-center gap-2"><Lock className="w-4 h-4 text-slate-500" /> Política de privacidad</Link></li>
              <li><Link href="/security" className="hover:text-blue-400 transition-colors flex items-center gap-2"><Shield className="w-4 h-4 text-slate-500" /> Política de seguridad</Link></li>
              <li><Link href="/cookies" className="hover:text-blue-400 transition-colors flex items-center gap-2"><Settings className="w-4 h-4 text-slate-500" /> Política de cookies</Link></li>
            </ul>
          </div>

          {/* Column 4: Contáctanos */}
          <div>
            <h4 className="text-white font-bold flex items-center gap-2 mb-6">
              <Mail className="w-4 h-4 text-[#2ecc71]" /> Contáctanos
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#2ecc71] mt-0.5 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#2ecc71] mt-0.5 shrink-0" />
                <span>info@ciar.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#2ecc71] mt-0.5 shrink-0" />
                <span>1234 Calle Principal<br />Ciudad, País 12345</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/60 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 CIAR - Centro de Ingeniería y Arquitectura. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1">
            Hecho con <Heart className="w-3 h-3 text-red-500 inline fill-red-500" /> para la comunidad
          </div>
        </div>
      </div>
    </footer>
  );
}
