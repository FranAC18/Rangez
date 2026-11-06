import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, Ruler, X } from 'lucide-react';
import { BRAND_CONFIG } from '../data/catalog';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';
import { InstagramIcon } from './InstagramIcon';

interface HeaderProps {
  onOpenSizeGuide: () => void;
  onNavigateSection: (sectionId: string) => void;
}

const navigationItems = [
  { id: 'hero', label: 'Inicio' },
  { id: 'catalogo', label: 'Bootcut' },
  { id: 'henleys', label: 'Henley' },
  { id: 'clientes', label: 'Reseñas' },
  { id: 'tallas', label: 'Tallas' },
  { id: 'botas', label: 'Botas' },
  { id: 'contacto', label: 'Contacto' },
];

export const Header: React.FC<HeaderProps> = ({ onOpenSizeGuide, onNavigateSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${
        isScrolled
          ? 'border-white/10 bg-[#080808]/95 shadow-lg shadow-black/30'
          : 'border-white/[0.06] bg-[#080808]/85'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <button
          onClick={() => handleNavClick('hero')}
          className="group flex shrink-0 flex-col text-left"
          aria-label="RANGEZ, ir al inicio"
        >
          <span className="flex items-center font-black leading-none tracking-[-0.08em] text-white transition-colors group-hover:text-zinc-300">
            <span className="text-xl sm:text-2xl">RANGEZ</span>
            <span className="ml-1 self-start text-[8px] font-normal tracking-normal text-zinc-500">®</span>
          </span>
          <span className="mt-1 text-[7px] uppercase tracking-[0.2em] text-zinc-500 sm:text-[8px]">
            Guayaquil · {BRAND_CONFIG.foundationYear}
          </span>
        </button>

        <nav aria-label="Navegación principal" className="hidden items-center gap-3 text-[9px] uppercase tracking-[0.16em] text-zinc-400 lg:flex xl:gap-5 xl:text-[10px]">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="nav-link whitespace-nowrap py-2 transition-colors hover:text-white focus-visible:text-white"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <a
            href={BRAND_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Instagram oficial RANGEZ"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-zinc-200 transition-all hover:border-white hover:bg-white hover:text-black"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            WhatsApp
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-1 lg:hidden">
          <button
            onClick={onOpenSizeGuide}
            className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Abrir guía de tallas"
          >
            <Ruler className="h-4 w-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-full p-2 text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
            aria-controls="rangez-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="rangez-mobile-menu"
          aria-label="Navegación móvil"
          className="mobile-menu-panel border-t border-white/10 bg-[#080808]/98 px-4 pb-5 pt-3 shadow-2xl lg:hidden sm:px-6"
        >
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {navigationItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="flex min-h-11 items-center justify-between gap-2 border-b border-white/[0.06] px-2 text-left text-[9px] uppercase tracking-[0.14em] text-zinc-300 transition-colors hover:text-white"
              >
                <span>{item.label}</span>
                <span className="font-mono text-[8px] text-zinc-600">0{index + 1}</span>
              </button>
            ))}
          </div>
          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-4 text-[9px] font-semibold uppercase tracking-[0.15em] text-black transition-colors hover:bg-zinc-200"
          >
            Escríbenos por WhatsApp <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </nav>
      )}
    </header>
  );
};
