import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Star } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/catalog';
import { useSwipeNavigation } from '../hooks/useSwipeNavigation';

const getPageSize = () => {
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
};

export const CustomerReviewsSection: React.FC = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const pageCount = Math.max(1, Math.ceil(CUSTOMER_REVIEWS.length / pageSize));
  const visibleReviews = CUSTOMER_REVIEWS.slice(page * pageSize, (page + 1) * pageSize);
  const firstReview = page * pageSize + 1;
  const lastReview = Math.min(CUSTOMER_REVIEWS.length, (page + 1) * pageSize);

  useEffect(() => {
    const updatePageSize = () => setPageSize(getPageSize());
    updatePageSize();
    window.addEventListener('resize', updatePageSize, { passive: true });
    return () => window.removeEventListener('resize', updatePageSize);
  }, []);

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, pageCount - 1));
  }, [pageCount]);

  useEffect(() => {
    if (isPaused || pageCount < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = window.setInterval(() => {
      const section = sectionRef.current;
      if (!section || document.hidden) return;

      const bounds = section.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;

      const pauseButton = section.querySelector('[data-carousel-toggle]');
      const activeElement = document.activeElement as HTMLElement | null;
      const focusedInside = activeElement && section.contains(activeElement) && activeElement.matches(':focus-visible');
      if (focusedInside && !pauseButton?.contains(activeElement)) return;

      const canHover = window.matchMedia('(hover: hover)').matches;
      if (canHover && section.matches(':hover') && !pauseButton?.matches(':hover')) return;

      setPage((currentPage) => (currentPage + 1) % pageCount);
    }, 6000);
    return () => window.clearInterval(interval);
  }, [isPaused, page, pageCount]);

  const showPreviousPage = () => setPage((currentPage) => (currentPage - 1 + pageCount) % pageCount);
  const showNextPage = () => setPage((currentPage) => (currentPage + 1) % pageCount);
  const swipeHandlers = useSwipeNavigation(showNextPage, showPreviousPage);

  return (
    <section
      ref={sectionRef}
      id="clientes"
      className="scroll-mt-20 bg-[#efede8] px-4 py-14 text-[#171614] sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <header className="section-heading reveal-on-scroll mb-7 flex flex-col gap-5 border-b border-[#d4d0c9] pb-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[8px] uppercase tracking-[0.3em] text-[#77726c]">CONFIANZA REAL</p>
            <h2 className="font-editorial text-3xl font-bold sm:text-4xl">Nuestros Clientes</h2>
            <p className="mt-2 font-editorial text-xs italic text-[#6c6760]">
              Cada entrega, una historia de confianza.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#77726c]">
              {String(firstReview).padStart(2, '0')}–{String(lastReview).padStart(2, '0')} / {String(CUSTOMER_REVIEWS.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={showPreviousPage}
              aria-label="Reseñas anteriores"
              className="rounded-full border border-[#bdb8b0] p-2 text-[#514c46] transition-colors hover:border-[#171614] hover:text-black"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={showNextPage}
              aria-label="Más reseñas"
              className="rounded-full border border-[#bdb8b0] p-2 text-[#514c46] transition-colors hover:border-[#171614] hover:text-black"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsPaused((paused) => !paused)}
              aria-label={isPaused ? 'Reanudar carrusel automático' : 'Pausar carrusel automático'}
              aria-pressed={isPaused}
              data-carousel-toggle
              className="rounded-full border border-[#bdb8b0] p-2 text-[#514c46] transition-colors hover:border-[#171614] hover:text-black"
            >
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
          </div>
        </header>

        <div
          {...swipeHandlers}
          style={{ touchAction: 'pan-y' }}
          role="group"
          aria-label={`Reseñas ${firstReview} a ${lastReview} de ${CUSTOMER_REVIEWS.length}. Desliza para ver más.`}
          aria-live="polite"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleReviews.map((review, index) => (
            <article
              key={review.id}
              className="review-card reveal-on-scroll flex flex-col"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#ddd8d0]">
                {review.image ? (
                  <img
                    src={review.image}
                    srcSet={review.imageSmall
                      ? `${review.imageSmall} ${review.imageSmallWidth ?? 480}w, ${review.image} ${review.imageWidth ?? 748}w`
                      : undefined}
                    sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) 50vw, 33vw"
                    alt={`Entrega de pedido a ${review.author}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.025]"
                  />
                ) : (
                  <div
                    aria-label={`Testimonio de ${review.author}`}
                    className="flex h-full flex-col items-center justify-center bg-[#090909] text-[#c5a880]"
                  >
                    <span className="font-editorial text-8xl leading-none">“</span>
                    <span className="mt-2 text-[9px] font-semibold uppercase tracking-[0.52em] text-white">
                      RANGEZ
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-3 flex min-h-28 flex-col bg-white p-4 sm:p-5">
                <div className="mb-2 flex gap-0.5" aria-label={`${review.rating} de 5 estrellas`}>
                  {Array.from({ length: review.rating }, (_, index) => (
                    <Star key={index} className="h-2.5 w-2.5 fill-[#c5a880] text-[#c5a880]" />
                  ))}
                </div>
                <p className="font-editorial text-sm italic leading-relaxed text-[#393631]">
                  {review.comment}
                </p>
                <p className="mt-3 text-[8px] uppercase tracking-[0.19em] text-[#8a847c]">
                  — {review.author}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-[8px] uppercase tracking-[0.18em] text-[#89837b]">
          Envíos locales en Guayaquil · Cobertura a nivel nacional
        </p>
      </div>
    </section>
  );
};
