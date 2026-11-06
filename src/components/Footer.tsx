import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { BRAND_CONFIG } from '../data/catalog';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';
import { InstagramIcon } from './InstagramIcon';

interface FooterProps {
  onOpenSizeGuide?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (id: string) => {
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-zinc-400 border-t border-white/[0.08] pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 flex flex-col justify-between reveal-on-scroll delay-100">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/images/brand/rangez-official-logo-transparent.webp"
                  alt="RANGEZ — Catálogo Oficial"
                  className="h-9 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                />
              </div>
              <p className="text-xs text-zinc-400 font-mono uppercase tracking-wideEditorial mb-3">
                HERENCIA VAQUERA · ESPÍRITU MODERNO
              </p>
              <p className="text-xs text-zinc-500 max-w-sm leading-relaxed mb-6">
                Catálogo digital oficial. Bootcut de algodón, camisetas Henley y calzado artesanal en Guayaquil, Ecuador.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <a
                href={BRAND_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>@{BRAND_CONFIG.instagramHandle.replace('@', '')}</span>
              </a>
              <span className="text-zinc-700">·</span>
              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5 text-emerald-400"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>WhatsApp Oficial</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 reveal-on-scroll delay-200">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-4">
              NAVEGACIÓN DEL CATÁLOGO
            </span>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleNav('catalogo')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span className="text-zinc-600 font-mono text-[10px]">01</span>
                  <span>Colección Bootcut</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('henleys')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span className="text-zinc-600 font-mono text-[10px]">02</span>
                  <span>Colección Henley</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tallas')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span className="text-zinc-600 font-mono text-[10px]">03</span>
                  <span>Guía de Tallas</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('botas')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span className="text-zinc-600 font-mono text-[10px]">04</span>
                  <span>Harness Boots</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('clientes')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span className="text-zinc-600 font-mono text-[10px]">05</span>
                  <span>Entregas Verificadas</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contacto')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span className="text-zinc-600 font-mono text-[10px]">06</span>
                  <span>Atelier Guayaquil</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Origin & Direct Order */}
          <div className="md:col-span-3 flex flex-col justify-between reveal-on-scroll delay-300">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-4">
                ATENCIÓN & PEDIDOS
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Atención personalizada y asesoría de tallas directa por WhatsApp. Envíos locales y nacionales vía Servientrega.
              </p>
              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-full hover:bg-zinc-200 transition-colors"
              >
                <span>Escribir al Atelier</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-6">
              <span className="text-[10px] font-mono text-zinc-600 block">
                GUAYAQUIL · ECUADOR
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 reveal-on-scroll delay-400">
          <div>
            © {new Date().getFullYear()} {BRAND_CONFIG.brandName}. Catálogo Oficial. Todos los derechos reservados.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors py-1 px-3 rounded-full hover:bg-white/5 border border-white/10"
          >
            <span>VOLVER AL INICIO</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
