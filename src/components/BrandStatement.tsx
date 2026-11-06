import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BRAND_CONFIG } from '../data/catalog';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';
import { InstagramIcon } from './InstagramIcon';

export const BrandStatement: React.FC = () => (
  <section id="contacto" className="flex min-h-[85svh] flex-col items-center justify-center bg-[#080808] px-6 py-20 text-center text-[#f0eee9]">
    <img
      src="/images/brand/rangez-official-logo-transparent.webp"
      alt="Emblema RANGEZ"
      loading="lazy"
      className="mb-8 w-36 sm:w-44"
    />

    <blockquote className="max-w-md font-editorial text-lg italic leading-relaxed text-zinc-300 sm:text-xl">
      “Cada camino empieza con un mensaje. Escríbenos y arma tu look RANGEZ.”
    </blockquote>

    <a
      href={buildGeneralWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-7 inline-flex min-h-11 items-center gap-2 bg-[#efede8] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#171614] transition-colors hover:bg-white"
    >
      Escríbenos por WhatsApp · {BRAND_CONFIG.whatsappNumber}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>

    <div className="mt-7 flex items-center gap-3 text-[8px] uppercase tracking-[0.2em] text-zinc-500">
      <a
        href={BRAND_CONFIG.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 transition-colors hover:text-zinc-200"
      >
        <InstagramIcon className="h-3 w-3" />
        {BRAND_CONFIG.instagramHandle}
      </a>
      <span>·</span>
      <span>{BRAND_CONFIG.city} · {BRAND_CONFIG.country}</span>
    </div>

    <p className="mt-24 text-[8px] uppercase tracking-[0.25em] text-zinc-700">
      {BRAND_CONFIG.subtitle}
    </p>
  </section>
);
