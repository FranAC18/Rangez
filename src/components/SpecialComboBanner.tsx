import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { buildWhatsAppInquiryUrl } from '../utils/whatsapp';

interface SpecialComboBannerProps {
  comboProduct: Product;
  onSelectCombo: (product: Product) => void;
}

export const SpecialComboBanner: React.FC<SpecialComboBannerProps> = ({ comboProduct, onSelectCombo }) => {
  const whatsAppUrl = buildWhatsAppInquiryUrl({
    product: comboProduct,
    selectedSize: 'Combo Personalizado',
    selectedColor: 'Negro + Boots',
  });

  return (
    <section id="combo-oferta" className="bg-[#080808] px-6 py-20 text-[#f0eee9] sm:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-4 text-[9px] uppercase tracking-[0.32em] text-[#c5a880]">
          OFERTA ESPECIAL
        </p>
        <h2 className="font-editorial text-4xl font-bold sm:text-5xl">Promoción Combo</h2>
        <p className="mt-4 font-editorial text-5xl font-bold sm:text-6xl">$145</p>
        <p className="mt-3 font-editorial text-sm italic text-zinc-300">
          1 Bootcut Jean + 1 par de Boots
        </p>
        <p className="mx-auto mt-4 max-w-xl text-[11px] leading-[1.8] text-zinc-400">
          Lleva un jean Bootcut y un par de nuestras botas artesanales por un precio único. La combinación perfecta para armar tu look RANGEZ.
        </p>

        <div className="mx-auto mt-9 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
          <button
            onClick={() => onSelectCombo(comboProduct)}
            className="group aspect-[4/3] overflow-hidden bg-[#161615]"
            aria-label="Ver el combo con jean Bootcut"
          >
            <img
              src="/images/products/combo-model-look-ai.webp"
              alt="Jean Bootcut RANGEZ combinado con Harness Boots"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </button>
          <button
            onClick={() => onSelectCombo(comboProduct)}
            className="group aspect-[4/3] overflow-hidden bg-[#161615]"
            aria-label="Ver el combo con Harness Boots"
          >
            <img
              src="/images/products/harness-boots-combo-ai.webp"
              alt="Harness Boots RANGEZ de cuero genuino"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </button>
        </div>

        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-7 inline-flex min-h-11 items-center gap-3 border border-[#c5a880]/70 px-5 py-3 text-[9px] uppercase tracking-[0.19em] text-[#d3c1a1] transition-colors hover:bg-[#c5a880] hover:text-[#080808]"
        >
          Aprovecha ahora · Escríbenos por WhatsApp
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
};
