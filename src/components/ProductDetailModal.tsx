import React, { useState, useEffect, useRef } from 'react';
import { X, Ruler, Check, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { buildWhatsAppInquiryUrl } from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenSizeGuide: () => void;
  isSizeGuideOpen?: boolean;
}

const ProductDetailModalContent: React.FC<{
  product: Product;
  onClose: () => void;
  onOpenSizeGuide: () => void;
  isSizeGuideOpen: boolean;
}> = ({
  product,
  onClose,
  onOpenSizeGuide,
  isSizeGuideOpen,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.defaultColor);
  const [selectedSize, setSelectedSize] = useState(product.defaultSize);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Reset state when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedColor(product.defaultColor);
    setSelectedSize(product.defaultSize);
  }, [product]);

  // Handle ESC key press
  useEffect(() => {
    if (isSizeGuideOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isSizeGuideOpen]);

  // Lock the page behind the modal and return focus when it closes.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  const whatsAppUrl = buildWhatsAppInquiryUrl({
    product,
    selectedSize,
    selectedColor,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/85 backdrop-blur-md animate-fade-in sm:items-center sm:p-4 md:p-6">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-label="Cerrar ficha de producto"
      />

      {/* Modal Container */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        tabIndex={-1}
        className="relative z-10 flex h-[min(94dvh,58rem)] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-zinc-950 text-zinc-200 shadow-2xl outline-none sm:h-[min(92dvh,58rem)] sm:rounded-2xl md:flex-row"
      >
        {/* Close button stays visible while product details scroll */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-30 rounded-full border border-white/20 bg-black/80 p-2.5 text-zinc-200 backdrop-blur-md transition-colors hover:bg-white hover:text-black sm:right-4 sm:top-4"
          aria-label="Cerrar ficha de producto"
        >
          <X className="w-4 h-4" />
        </button>

        {/* LEFT COLUMN: Gallery */}
        <div className="relative flex h-[34dvh] min-h-[220px] max-h-[320px] w-full shrink-0 flex-col justify-between bg-black sm:h-[38dvh] sm:max-h-[400px] md:h-full md:max-h-none md:w-1/2">
          {/* Main Photo Display */}
          <div className="relative min-h-0 flex-1 overflow-hidden bg-black">
            <img
              src={product.images[activeImageIndex]}
              alt={`${product.name} - Fotografía ${activeImageIndex + 1}`}
              className="h-full w-full object-contain object-center md:object-cover"
            />

            {/* Navigation arrows if multiple images */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === 0 ? product.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/75 hover:bg-white hover:text-black text-white rounded-full border border-white/15 transition-colors"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === product.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/75 hover:bg-white hover:text-black text-white rounded-full border border-white/15 transition-colors"
                  aria-label="Foto siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.badge && (
                <span className="bg-black/75 backdrop-blur-md text-white text-[9px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
                  {product.badge}
                </span>
              )}
              {!product.inStock && (
                <span className="bg-white/90 text-black text-[9px] font-mono uppercase tracking-wider px-3 py-1 rounded-full">
                  Agotados
                </span>
              )}
              {product.isOffer && (
                <span className="bg-rose-500 text-white text-[9px] font-mono uppercase tracking-wider px-3 py-0.5 rounded-full shadow-lg">
                  Oferta Combo
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails Row if multiple images */}
          {product.images.length > 1 && (
            <div className="flex shrink-0 items-center justify-start gap-2 overflow-x-auto border-t border-white/10 bg-zinc-950/90 p-2.5 sm:justify-center sm:p-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-12 w-10 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:h-16 sm:w-14 sm:rounded-xl ${
                    activeImageIndex === idx
                      ? 'border-white scale-105'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Product Details & Selectors */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:w-1/2">
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-5 pt-5 sm:p-8">
            {/* Header info */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-mono tracking-wideEditorial text-zinc-500">
                {product.categoryLabel}
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                REF: {product.id}
              </span>
            </div>

            <h2 id="product-modal-title" className="font-editorial text-2xl font-bold leading-tight text-white sm:mb-2 sm:text-4xl">
              {product.name}
            </h2>

            {/* Price display */}
            <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-white/[0.08]">
              <span className="text-3xl font-black text-white font-sans">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-base text-zinc-500 line-through font-mono">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-xs text-zinc-400 uppercase tracking-widest font-mono">
                USD
              </span>
              {product.isOffer && (
                <span className="ml-auto text-[11px] text-white font-mono uppercase bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                  Ahorro en conjunto
                </span>
              )}
            </div>

            {/* Slogan pull quote from PDF */}
            {product.slogan && (
              <blockquote className="font-editorial italic text-base text-zinc-300 border-l-2 border-white/30 pl-3.5 mb-5 py-0.5">
                {product.slogan}
              </blockquote>
            )}

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
              {product.description}
            </p>

            {/* Selectors Section */}
            <div className="mb-5 space-y-4 rounded-xl border border-white/10 bg-black/60 p-3 sm:mb-6 sm:space-y-5 sm:p-5">
              {/* Color Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-zinc-400 font-mono">
                    Tono / Color: <strong className="text-white">{selectedColor}</strong>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, idx) => {
                    const isSelected = selectedColor === color.name;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(color.name)}
                        className={`flex min-h-10 items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all ${
                          isSelected
                            ? 'bg-white text-black border-white shadow'
                            : 'bg-zinc-950 border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-white/30 flex-shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                        {isSelected && <Check className="w-3 h-3 text-black" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector */}
              {product.sizes.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-zinc-400 font-mono">
                      Seleccionar Talla: <strong className="text-white">{selectedSize}</strong>
                    </span>
                    {product.category === 'jeans' && (
                      <button
                        onClick={onOpenSizeGuide}
                        className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors underline decoration-white/20 underline-offset-4"
                      >
                        <Ruler className="w-3.5 h-3.5" />
                        <span>Tabla de medidas (cm)</span>
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, idx) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedSize(size)}
                          className={`min-h-10 min-w-[42px] rounded-full border px-3 py-1.5 text-xs font-mono font-semibold transition-all ${
                            isSelected
                              ? 'bg-white text-black border-white shadow-md'
                              : 'bg-zinc-950 border-white/10 text-zinc-300 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="text-xs leading-relaxed text-zinc-400">
                  Confirma la talla disponible por WhatsApp.
                </p>
              )}

              {/* Model Info Note */}
              {product.modelInfo && (
                <div className="pt-2 border-t border-white/[0.06] flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{product.modelInfo}</span>
                </div>
              )}
            </div>

            {/* Checklist Features */}
            <div className="mb-6">
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-semibold block mb-2.5">
                ESPECIFICACIONES TÉCNICAS
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Primary CTA: WhatsApp Conversion */}
          <div className="modal-safe-bottom shrink-0 border-t border-white/[0.08] bg-zinc-950/95 px-4 py-3 backdrop-blur sm:px-8 sm:py-4">
            {product.inStock ? (
              <>
                <div className="mb-2 rounded-xl border border-white/10 bg-white/[0.02] p-2.5 text-xs text-zinc-400 sm:mb-3 sm:p-3">
                  <div className="flex items-center gap-1.5 text-white font-semibold mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                    <span>Atención directa por WhatsApp</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Se abrirá WhatsApp con el modelo, talla (<strong className="text-zinc-200">{selectedSize}</strong>) y color (<strong className="text-zinc-200">{selectedColor}</strong>) listos para coordinar tu pedido.
                  </p>
                </div>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-[10px] font-extrabold uppercase tracking-[0.14em] text-black shadow-xl transition-all duration-300 hover:bg-zinc-200 sm:py-4 sm:text-xs sm:tracking-[0.2em] group"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Consultar por WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </>
            ) : (
              <div className="border border-white/10 bg-white/[0.02] p-3 text-center sm:p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white">Agotados</p>
                {product.detailsNote && (
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">{product.detailsNote}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenSizeGuide,
  isSizeGuideOpen = false,
}) => {
  if (!product) return null;

  return (
    <ProductDetailModalContent
      key={product.id}
      product={product}
      onClose={onClose}
      onOpenSizeGuide={onOpenSizeGuide}
      isSizeGuideOpen={isSizeGuideOpen}
    />
  );
};

