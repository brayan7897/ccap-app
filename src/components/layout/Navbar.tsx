"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Sun, ShoppingCart, User } from "lucide-react";
import { SearchModal } from "@/components/ui/SearchModal";
import { useUiStore } from "@/store/ui-store";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { toggleDarkMode } = useUiStore();

  // Keyboard shortcut to open search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#11141d]/95 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand & Main Links */}
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-sm flex items-center justify-center text-white font-black text-xl">
                C
              </div>
              <span className="text-white font-black text-2xl tracking-tight">CIAR</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/courses" className="text-sm font-bold text-white hover:text-blue-400 transition-colors">
                Cursos
              </Link>
              <Link href="/certificates" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">
                Certificados
              </Link>
              <Link href="/about" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">
                Nosotros
              </Link>
            </nav>
          </div>

          {/* Search, Action Icons & Avatar */}
          <div className="flex items-center gap-6">
            
            {/* Search Trigger Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-3 px-4 py-2 w-72 bg-[#171b26] border border-slate-700/50 hover:border-blue-500/50 rounded-lg text-slate-400 transition-all group"
            >
              <Search className="w-4 h-4 group-hover:text-blue-400" />
              <span className="text-sm truncate mr-auto">Buscar cursos de ingeniería...</span>
              <kbd className="hidden lg:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-800 text-slate-300">
                Ctrl+K
              </kbd>
            </button>

            {/* Icons */}
            <div className="flex items-center gap-4 text-slate-400">
              <button onClick={toggleDarkMode} className="hover:text-white transition-colors">
                <Sun className="w-5 h-5" />
              </button>
              <Link href="/cart" className="hover:text-white transition-colors">
                <ShoppingCart className="w-5 h-5" />
              </Link>
              
              {/* User Avatar Circle */}
              <Link href="/dashboard" className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold hover:ring-2 hover:ring-blue-400 hover:ring-offset-2 hover:ring-offset-[#11141d] transition-all">
                JP
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Render the Modal Component */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
