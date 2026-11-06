import React from 'react';
import { Ruler, ArrowUpRight } from 'lucide-react';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

interface MobileBottomBarProps {
  onOpenSizeGuide: () => void;
  onExploreCatalog: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onOpenSizeGuide,
  onExploreCatalog,
}) => {
  return (
    <nav aria-label="Accesos rápidos" className="mobile-bottom-bar fixed bottom-3 left-4 right-4 z-40 flex items-center justify-between gap-2 rounded-full border border-white/15 bg-black/90 p-1.5 shadow-2xl shadow-black backdrop-blur-xl lg:hidden">
      <button
        onClick={onExploreCatalog}
        className="flex-1 py-2 px-2.5 bg-white/[0.04] hover:bg-white/10 border border-white/10 rounded-full text-zinc-300 text-[10px] font-semibold uppercase tracking-wider text-center transition-colors"
      >
        Catálogo
      </button>

      <button
        onClick={onOpenSizeGuide}
        className="flex-1 py-2 px-2.5 bg-white/[0.04] hover:bg-white/10 border border-white/10 rounded-full text-zinc-300 text-[10px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1 transition-colors"
      >
        <Ruler className="w-3 h-3 text-zinc-400" />
        <span>Tallas</span>
      </button>

      <a
        href={buildGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-[2] py-2 px-3.5 bg-white hover:bg-zinc-200 text-black rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-colors"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
        <span>WhatsApp</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </a>
    </nav>
  );
};

