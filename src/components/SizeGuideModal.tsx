import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, Ruler, Check, Info, ArrowUpRight, MessageCircle } from 'lucide-react';
import { SIZE_MEASUREMENTS } from '../data/catalog';
import { buildGeneralWhatsAppUrl } from '../utils/whatsapp';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SizeGuideModalContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [inputWidth, setInputWidth] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);

  const recommendedSize = useMemo(() => {
    const value = Number.parseFloat(inputWidth);
    if (!Number.isFinite(value) || value <= 0) return null;

    return SIZE_MEASUREMENTS.reduce((closest, row) =>
      Math.abs(row.waistWidthCm - value) < Math.abs(closest.waistWidthCm - value) ? row : closest
    );
  }, [inputWidth]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/80 backdrop-blur-md animate-fade-in sm:items-center sm:p-4 sm:py-6">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-label="Cerrar guía de tallas"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-modal-title"
        tabIndex={-1}
        className="relative z-10 flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-zinc-200 bg-white text-zinc-900 shadow-2xl outline-none sm:max-h-[90dvh] sm:rounded-2xl"
      >
        <header className="relative shrink-0 border-b border-zinc-200 px-4 pb-4 pt-5 text-center sm:px-8 sm:pb-5 sm:pt-7">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full border border-zinc-200 bg-zinc-100 p-2.5 text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-black sm:right-5 sm:top-5"
            aria-label="Cerrar guía de tallas"
          >
            <X className="h-4 w-4" />
          </button>
          <span className="mb-1 block text-[8px] font-mono uppercase tracking-[0.2em] text-zinc-500 sm:mb-2 sm:text-[10px] sm:tracking-wideEditorial">
            TABLA OFICIAL DE MEDIDAS
          </span>
          <h2 id="size-modal-title" className="pr-8 font-editorial text-2xl font-bold tracking-tight text-black sm:pr-0 sm:text-4xl">
            Guía de Tallas — Bootcut
          </h2>
          <p className="mt-1 font-editorial text-[11px] italic leading-relaxed text-zinc-600 sm:mt-2 sm:text-xs">
            Medidas en centímetros sobre la prenda extendida sin estirar.
          </p>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-8 sm:py-6">
          <section className="mb-4 rounded-xl border border-zinc-200 bg-zinc-50 p-3 sm:mb-6 sm:p-5">
            <div className="mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-700 sm:mb-2.5 sm:text-[11px] sm:tracking-wider">
              <Ruler className="h-3.5 w-3.5 text-black" />
              <span>Calculador interactivo</span>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
              <label className="min-w-0 flex-1">
                <span className="sr-only">Ancho de cintura en centímetros</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="1"
                  value={inputWidth}
                  onChange={(event) => setInputWidth(event.target.value)}
                  placeholder="Ancho de cintura (ej. 40 cm)"
                  className="min-h-11 w-full rounded-full border border-zinc-300 bg-white px-4 py-2.5 text-xs text-black shadow-inner placeholder:text-zinc-400 focus:border-black focus:outline-none"
                />
              </label>
              {recommendedSize ? (
                <div aria-live="polite" className="flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-black px-4 py-2 text-xs font-bold text-white animate-fade-in sm:shrink-0">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Talla sugerida: {recommendedSize.size}</span>
                </div>
              ) : (
                <span className="text-center text-[9px] italic text-zinc-500 sm:shrink-0 sm:text-left sm:text-[10px]">
                  Ingresa tus cm para ver la sugerencia
                </span>
              )}
            </div>
          </section>

          <div className="mb-1 overflow-x-auto overscroll-x-contain rounded-xl border border-zinc-200 bg-white shadow-sm">
            <table className="w-full min-w-[360px] text-left text-[10px] sm:min-w-0 sm:text-sm">
              <caption className="sr-only">Medidas oficiales de tallas Bootcut RANGEZ</caption>
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-100 text-[8px] uppercase tracking-[0.08em] text-zinc-700 sm:text-[10px] sm:tracking-wider">
                  <th scope="col" className="whitespace-nowrap px-3 py-3 sm:px-6">Talla</th>
                  <th scope="col" className="whitespace-nowrap px-3 py-3 sm:px-6">Ancho cintura (cm)</th>
                  <th scope="col" className="whitespace-nowrap px-3 py-3 sm:px-6">Largo total (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 font-mono text-zinc-800">
                {SIZE_MEASUREMENTS.map((row) => {
                  const isHighlight = recommendedSize?.size === row.size;
                  return (
                    <tr
                      key={row.size}
                      className={`transition-colors ${isHighlight ? 'bg-zinc-900 font-bold text-white' : 'hover:bg-zinc-50'}`}
                    >
                      <th scope="row" className="px-3 py-2.5 text-left font-semibold sm:px-6 sm:py-3">
                        <span className="flex items-center gap-2">
                          {row.size}
                          {isHighlight && (
                            <span className="rounded-full bg-emerald-400 px-1.5 py-0.5 font-sans text-[7px] font-bold uppercase tracking-wide text-black sm:px-2 sm:text-[9px]">
                              Tu talla
                            </span>
                          )}
                        </span>
                      </th>
                      <td className="whitespace-nowrap px-3 py-2.5 sm:px-6 sm:py-3">{row.waistWidthCm} cm</td>
                      <td className="whitespace-nowrap px-3 py-2.5 sm:px-6 sm:py-3">{row.lengthCm} cm</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mb-4 mt-1 text-right text-[8px] text-zinc-500 sm:hidden">
            Desliza la tabla para ver todas las medidas
          </p>

          <div className="rounded-r-xl border-l-2 border-black bg-zinc-50 p-3 font-serif text-[11px] italic leading-relaxed text-zinc-700 sm:mb-6 sm:p-4 sm:text-xs">
            <p>
              <strong>¿Cómo saber tu talla?</strong> Toma una cinta métrica y un pantalón que te quede bien. Mide la cintura de costura a costura y compara el ancho con la tabla. La medida más cercana indica tu talla Bootcut RANGEZ.
            </p>
          </div>
        </div>

        <footer className="modal-safe-bottom flex shrink-0 flex-col gap-3 border-t border-zinc-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-4">
          <div className="flex items-start gap-2 text-[10px] leading-relaxed text-zinc-600 sm:max-w-[56%] sm:text-xs">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
            <p><strong>Harness Boots:</strong> tallas 38 al 44. Consulta si necesitas otra medida.</p>
          </div>
          <a
            href={buildGeneralWhatsAppUrl('Hola RANGEZ, deseo consultar disponibilidad de mi talla')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-black px-4 py-3 text-[9px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-zinc-800 sm:w-auto sm:shrink-0 sm:text-[10px]"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
            Consulta tu talla
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </footer>
      </div>
    </div>
  );
};

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return <SizeGuideModalContent onClose={onClose} />;
};
