import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { buildWhatsAppInquiryUrl } from '../utils/whatsapp';

interface BootsSectionProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

const photoCaptions = ['Vista principal', 'Perfil', 'Detalle del arnés'];

export const BootsSection: React.FC<BootsSectionProps> = ({ product, onSelectProduct }) => {
  const whatsAppUrl = buildWhatsAppInquiryUrl({
    product,
    selectedSize: product.defaultSize,
    selectedColor: product.defaultColor,
  });

  return (
    <section id="botas" className="bg-[#efede8] px-6 py-20 text-[#171614] sm:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-9 text-center">
          <p className="mb-3 text-[9px] uppercase tracking-[0.3em] text-[#77726c]">
            COMPLEMENTA TU ESTILO
          </p>
          <h2 className="font-editorial text-4xl font-bold sm:text-5xl">Harness Boots</h2>
          <p className="mt-2 font-editorial text-xl font-bold">${product.price}</p>
          {!product.inStock && (
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#82786d]">
              Agotados
            </p>
          )}
          <p className="mt-3 font-editorial text-sm italic text-[#5f5a54]">{product.slogan}</p>
          <p className="mt-2 text-[8px] uppercase tracking-[0.23em] text-[#89837b]">
            HECHAS A MANO · A MEDIDA
          </p>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {product.images.map((image, index) => (
            <button
              key={image}
              onClick={() => onSelectProduct(product)}
              className="group text-left"
              aria-label={`Ver Harness Boots: ${photoCaptions[index]}`}
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#ddd8d0]">
                <img
                  src={image}
                  alt={`Harness Boots RANGEZ — ${photoCaptions[index]}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-9 grid gap-7 border-t border-[#d0cbc3] pt-6 sm:grid-cols-2 sm:gap-12">
          <div>
            <h3 className="font-editorial text-lg font-bold italic">Diseño</h3>
            <p className="mt-2 text-[11px] leading-[1.8] text-[#57524c]">
              Bota corta estilo harness, con arnés y hebilla plateada que enmarca el tobillo. Punta afilada y silueta angosta que estiliza cualquier look, del jean bootcut a un pantalón de vestir.
            </p>
          </div>
          <div>
            <h3 className="font-editorial text-lg font-bold italic">Material &amp; Detalles</h3>
            <p className="mt-2 text-[11px] leading-[1.8] text-[#57524c]">
              Hechas a mano y a medida: cuero genuino con acabado pulido, cierre lateral discreto y remaches metálicos en tono plata. Suela resistente pensada para el uso diario, sin sacrificar presencia.
            </p>
          </div>
        </div>

        {product.detailsNote && (
          <p className="mt-7 border border-[#aaa49a] px-5 py-4 text-center font-editorial text-sm italic text-[#5f5a54]">
            {product.detailsNote}
          </p>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {product.inStock ? (
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-3 border border-[#a49d91] px-5 py-3 text-[9px] uppercase tracking-[0.17em] text-[#514c46] transition-colors hover:border-[#171614] hover:text-[#171614]"
            >
              Consultar disponibilidad
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="inline-flex min-h-11 items-center border border-[#a49d91] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#77726c]">
              Agotados
            </span>
          )}
          <button
            onClick={() => onSelectProduct(product)}
            className="text-[9px] uppercase tracking-[0.17em] text-[#77726c] underline decoration-[#bbb5ac] underline-offset-4 hover:text-[#171614]"
          >
            Ver tallas y detalles
          </button>
        </div>
      </div>
    </section>
  );
};
