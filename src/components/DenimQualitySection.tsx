import React from 'react';
import { DENIM_CRAFTSMANSHIP } from '../data/catalog';

export const DenimQualitySection: React.FC = () => (
  <section id="calidad" className="grid bg-[#efede8] text-[#171614] lg:min-h-[min(92vh,900px)] lg:grid-cols-2">
    <div className="relative min-h-[70vh] overflow-hidden bg-[#171614] lg:min-h-[min(92vh,900px)]">
      <img
        src={DENIM_CRAFTSMANSHIP.image}
        alt="Textura de mezclilla negra y costuras reforzadas RANGEZ"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </div>

    <div className="flex items-center px-7 py-16 sm:px-14 lg:px-[clamp(3rem,8vw,8rem)]">
      <div className="mx-auto max-w-lg">
        <p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-[#77726c]">
          {DENIM_CRAFTSMANSHIP.tagline}
        </p>
        <h2 className="font-editorial text-4xl font-bold tracking-tight sm:text-5xl">
          {DENIM_CRAFTSMANSHIP.title}
        </h2>
        <div className="mt-7 space-y-4 font-editorial text-[15px] leading-[1.75] text-[#48443f]">
          {DENIM_CRAFTSMANSHIP.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-9 grid grid-cols-3 border-t border-[#c9c5be] pt-5">
          {DENIM_CRAFTSMANSHIP.stats.map((stat) => (
            <div key={stat.label} className="pr-2">
              <span className="font-editorial text-3xl font-bold sm:text-4xl">{stat.value}</span>
              <span className="mt-1 block text-[8px] uppercase tracking-[0.16em] text-[#7a756e] sm:text-[9px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
