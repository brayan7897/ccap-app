"use client";

import { useEffect, useRef } from "react";
import { Search, X, CornerDownLeft, Command } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  "AutoCAD", "Revit", "Estructuras", "Civil 3D", "SketchUp", "SAP2000"
];

const CATEGORIES = [
  { name: "Ingeniería Civil", courses: 25 },
  { name: "Arquitectura", courses: 18 },
  { name: "Estructuras", courses: 15 },
  { name: "Construcción", courses: 12 },
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-[#171b26] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden mx-4 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header / Search Input */}
        <div className="flex items-center gap-3 border-b border-slate-800 p-4">
          <Search className="w-5 h-5 text-slate-400" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Buscar cursos, instructores, categorías..." 
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-slate-500 text-lg"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Popular Searches */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Búsquedas populares</h3>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map(term => (
                <button 
                  key={term}
                  className="px-4 py-1.5 text-sm font-medium rounded-full bg-[#2ecc71] text-[#0f2a1b] hover:bg-[#27ae60] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Categorías destacadas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.name}
                  className="flex flex-col text-left p-4 rounded-xl border border-slate-800 hover:bg-slate-800/50 hover:border-slate-700 transition-colors group"
                >
                  <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {cat.name}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    {cat.courses} cursos
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer hints */}
        <div className="border-t border-slate-800 p-4 bg-[#11141d] flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="flex items-center justify-center w-5 h-5 rounded bg-slate-800 border border-slate-700 text-slate-300">
              <CornerDownLeft className="w-3 h-3" />
            </span>
            buscar
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="flex items-center justify-center px-1.5 h-5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">
              Esc
            </span>
            cerrar
          </div>
        </div>

      </div>
    </div>
  );
}
