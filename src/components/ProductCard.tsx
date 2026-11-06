import React from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { buildWhatsAppInquiryUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, index = 0 }) => {
  const quickWhatsAppUrl = buildWhatsAppInquiryUrl({
    product,
    selectedSize: product.defaultSize,
    selectedColor: product.defaultColor,
  });

  const staggerDelay = (index % 6) * 100;
  const productImage = product.images[0];
  const mobileImage = productImage.replace('.webp', '-mobile.webp');
  const desktopImageWidth = product.category === 'henleys' ? 847 : 1600;
  const mobileImageWidth = product.category === 'henleys' ? 600 : 1200;

  return (
    <div
      className="group bg-zinc-950/40 border border-white/10 hover:border-white/30 rounded-2xl overflow-hidden transition-all duration-500 flex flex-col h-full hover:shadow-2xl hover:shadow-black reveal-on-scroll"
      style={{ transitionDelay: `${staggerDelay}ms` }}
    >
      {/* Product Image Frame */}
      <button
        type="button"
        onClick={() => onSelect(product)}
        aria-label={`Ver detalles de ${product.name}`}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-black text-left luxury-image-hover"
      >
        <img
          src={productImage}
          srcSet={`${mobileImage} ${mobileImageWidth}w, ${productImage} ${desktopImageWidth}w`}
          sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(50vw - 2rem), 33vw"
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges & Micro-Interactions (SVZ style) */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5">
            {product.badge ? (
              <span className="bg-black/75 backdrop-blur-md text-white text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                {product.badge}
              </span>
            ) : (
              <span className="bg-black/75 backdrop-blur-md text-zinc-300 text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10">
                {product.categoryLabel}
              </span>
            )}

            {product.isOffer && (
              <span className="bg-rose-500/90 text-white text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full">
                Oferta
              </span>
            )}
          </div>

          {/* SVZ Signature Diagonal Arrow Indicator */}
          <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-110">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Bottom hover bar hint */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-md border border-white/20 py-2 px-3 rounded-full text-center text-[10px] uppercase tracking-wider font-semibold text-white">
            Abrir Ficha Técnica y Medidas ↗
          </div>
        </div>
      </button>

      {/* Content Details */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between bg-zinc-950/60">
        <div>
          {/* Category & Color indicators */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] uppercase font-mono tracking-wideEditorial text-zinc-500">
              {product.categoryLabel}
            </span>

            {/* Color Swatches */}
            <div className="flex items-center gap-1.5" title={`Colores: ${product.colors.map(c => c.name).join(', ')}`}>
              {product.colors.map((color, idx) => (
                <span
                  key={idx}
                  className="w-2.5 h-2.5 rounded-full border border-white/30"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(product)}
            className="font-editorial text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors cursor-pointer mb-1 leading-snug"
          >
            {product.name}
          </h3>

          {/* Slogan from PDF */}
          {product.slogan && (
            <p className="font-editorial italic text-xs text-zinc-400 mb-3 line-clamp-1">
              {product.slogan}
            </p>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-black text-white font-sans">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-500 line-through font-mono">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
              USD
            </span>
          </div>

          <div className="mb-4 min-h-8">
            <span className="text-[9px] uppercase tracking-wider text-zinc-500 block mb-1.5 font-mono">
              {product.sizes.length ? 'Tallas en catálogo:' : 'Tallas:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.length ? product.sizes.map((size) => (
                <span
                  key={size}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-zinc-300"
                >
                  {size}
                </span>
              )) : (
                <span className="text-[10px] text-zinc-400">Consulta tallas disponibles</span>
              )}
            </div>
          </div>
        </div>

        {/* Card Actions (SVZ style) */}
        <div className="pt-4 border-t border-white/[0.06] flex flex-col gap-2">
          <button
            onClick={() => onSelect(product)}
            className="w-full py-2.5 bg-white/[0.04] hover:bg-white text-zinc-200 hover:text-black border border-white/10 hover:border-white rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 group/btn"
          >
            <span>Ver Ficha y Medidas</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
          
          <a
            href={quickWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-emerald-950/20 hover:bg-emerald-900/40 text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 hover:border-emerald-500/40 rounded-full text-[11px] uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

