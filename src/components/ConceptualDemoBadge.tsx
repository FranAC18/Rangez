import React, { useState } from 'react';
import { Info, X, Check } from 'lucide-react';

export const ConceptualDemoBadge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-black/90 border-b border-white/[0.06] py-1.5 px-4 text-[10px] font-mono text-zinc-500 z-50 relative select-none">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            <span className="font-medium text-zinc-300">DEMO CONCEPTUAL · CATÁLOGO DIGITAL</span>
            <span className="hidden sm:inline text-zinc-600">— Dirección visual minimalista inspirada en SVZ para RANGEZ</span>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors text-[10px] underline decoration-white/20 underline-offset-2"
          >
            <Info className="w-3 h-3" />
            <span>Detalles de la demo</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
          <div className="bg-zinc-950 border border-white/10 rounded-2xl max-w-md w-full p-6 text-zinc-300 relative shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors"
              aria-label="Cerrar modal de información"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">
                PROYECTO & IDENTIDAD
              </span>
            </div>
            <h3 className="font-editorial text-2xl text-white mb-2">Demostración Conceptual para RANGEZ</h3>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              Propuesta de catálogo digital interactivo de alta gama para presentar a la marca de ropa y calzado <strong>RANGEZ</strong> (Guayaquil, Ecuador).
            </p>
            <ul className="text-xs text-zinc-300 space-y-2.5 mb-6 border-y border-white/[0.08] py-4">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Prendas, calzado, fotografías, precios ($30, $120, $145) y tallas 100% fieles al PDF oficial.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Arquitectura visual ultra-minimalista inspirada en la agencia global SVZ.io.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Flujo de conversión directa sin pasarelas de pago, integrando WhatsApp pre-llenado.</span>
              </li>
            </ul>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-zinc-200 transition-colors"
            >
              Continuar Explorando
            </button>
          </div>
        </div>
      )}
    </>
  );
};

