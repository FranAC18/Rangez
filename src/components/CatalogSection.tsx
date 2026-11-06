import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useSwipeNavigation } from '../hooks/useSwipeNavigation';

interface CatalogSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  sectionId?: string;
  eyebrow?: string;
}

const getPageSize = () => {
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
};

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  onSelectProduct,
  sectionId = 'catalogo',
  eyebrow = 'BOOTCUT',
}) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const pageCount = Math.max(1, Math.ceil(products.length / pageSize));
  const visibleProducts = products.slice(page * pageSize, (page + 1) * pageSize);
  const title = eyebrow === 'HENLEY' ? 'Henley manga larga' : 'Bootcut denim';

  useEffect(() => {
    const updatePageSize = () => setPageSize(getPageSize());
    updatePageSize();
    window.addEventListener('resize', updatePageSize, { passive: true });
    return () => window.removeEventListener('resize', updatePageSize);
  }, []);

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, pageCount - 1));
  }, [pageCount]);

  const changePage = (nextPage: number) => setPage(nextPage);
  const swipeHandlers = useSwipeNavigation(
    () => setPage((currentPage) => Math.min(pageCount - 1, currentPage + 1)),
    () => setPage((currentPage) => Math.max(0, currentPage - 1)),
  );

  return (
    <section id={sectionId} className="catalog-section scroll-mt-20 bg-[#080808] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="section-heading reveal-on-scroll mb-7 flex flex-col gap-5 border-b border-white/10 pb-5 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[8px] uppercase tracking-[0.3em] text-zinc-500">{eyebrow} · RANGEZ</p>
            <h2 className="font-editorial text-3xl font-bold text-[#f0eee9] sm:text-4xl">{title}</h2>
            <p className="mt-2 font-editorial text-xs italic text-zinc-500">
              {products.length} piezas · Selección de la colección de noviembre
            </p>
            <p className="mt-2 text-[8px] uppercase tracking-[0.12em] text-zinc-600 sm:hidden">
              Desliza para cambiar de prenda
            </p>
          </div>

          {pageCount > 1 && (
            <div className="flex items-center gap-2 self-end sm:self-auto" aria-label={`${title}, página ${page + 1} de ${pageCount}`}>
              <span className="mr-1 font-mono text-[9px] tracking-[0.12em] text-zinc-500">
                {String(page + 1).padStart(2, '0')} / {String(pageCount).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={() => changePage(Math.max(0, page - 1))}
                disabled={page === 0}
                aria-label="Página anterior"
                className="rounded-full border border-white/15 p-2 text-zinc-300 transition-colors hover:border-white/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => changePage(Math.min(pageCount - 1, page + 1))}
                disabled={page === pageCount - 1}
                aria-label="Página siguiente"
                className="rounded-full border border-white/15 p-2 text-zinc-300 transition-colors hover:border-white/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </header>

        <div
          {...swipeHandlers}
          style={{ touchAction: 'pan-y' }}
          role="group"
          aria-label={`${title}, página ${page + 1} de ${pageCount}. Desliza para cambiar de prenda.`}
          aria-live="polite"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              index={page * pageSize + index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
