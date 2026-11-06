import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => (
  <section
    id="hero"
    className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden bg-[#080808] px-5 py-12 text-center text-[#f0eee9] lg:min-h-[calc(100svh-4.5rem)] lg:px-6"
  >
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.055)_0%,transparent_58%)]" />

    <div className="relative z-10 flex flex-col items-center">
      <p className="animate-fade-in-up mb-6 text-[8px] uppercase tracking-[0.3em] text-zinc-400 sm:mb-8 sm:text-[11px] sm:tracking-[0.34em]">
        HERENCIA VAQUERA · ESPÍRITU MODERNO
      </p>

      <h1 className="animate-fade-in-scale font-editorial text-[clamp(3.5rem,18vw,7rem)] font-bold leading-none tracking-[0.045em] text-metallic-silver drop-shadow-[0_0_24px_rgba(255,255,255,0.24)] sm:text-8xl md:text-[9rem]">
        RANGEZ
      </h1>

      <div className="animate-fade-in-up my-6 h-px w-20 bg-white/30 [animation-delay:180ms] sm:my-7 sm:w-24" />

      <p className="animate-fade-in-up font-editorial text-xl italic text-zinc-200 [animation-delay:240ms] sm:text-4xl">
        Catálogo Oficial
      </p>
      <p className="animate-fade-in-up mt-3 text-[7px] uppercase tracking-[0.24em] text-zinc-500 [animation-delay:320ms] sm:text-[10px] sm:tracking-[0.3em]">
        COLECCIÓN BOOTCUT &amp; BOOTS
      </p>

      <button
        onClick={onExploreClick}
        className="animate-fade-in-up mt-11 inline-flex min-h-11 items-center gap-2 border border-white/25 px-5 py-3 text-[9px] uppercase tracking-[0.2em] text-zinc-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:text-white sm:mt-16"
      >
        Explorar colección
        <ArrowDown className="h-3 w-3" />
      </button>
    </div>

    <p className="absolute bottom-7 text-[8px] uppercase tracking-[0.28em] text-zinc-600">
      GUAYAQUIL · ECUADOR
    </p>
  </section>
);
