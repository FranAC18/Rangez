import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { SizeGuideSection } from './components/SizeGuideSection';
import { BootsSection } from './components/BootsSection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { BrandStatement } from './components/BrandStatement';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { PRODUCTS } from './data/catalog';
import { Product } from './types';

export function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash.startsWith('#producto-')) return;

      const productId = hash.replace('#producto-', '');
      const found = PRODUCTS.find((product) => product.id === productId);
      if (found) setSelectedProduct(found);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const selector = '.reveal-on-scroll, .reveal-fade, .reveal-slide-left, .reveal-slide-right';
    const revealAll = () => {
      document.querySelectorAll(selector).forEach((element) => element.classList.add('is-visible'));
    };

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

    const observeNewElements = () => {
      document.querySelectorAll(`${selector}:not([data-reveal-observed])`).forEach((element) => {
        element.setAttribute('data-reveal-observed', 'true');
        observer.observe(element);
      });
    };

    observeNewElements();
    const mutations = new MutationObserver(observeNewElements);
    mutations.observe(document.getElementById('root') ?? document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    window.history.replaceState(null, '', `#producto-${product.id}`);
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
    window.history.replaceState(null, '', window.location.pathname);
  };

  const handleNavigateSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const jeans = PRODUCTS.filter((product) => product.category === 'jeans');
  const henleys = PRODUCTS.filter((product) => product.category === 'henleys');
  const bootsProduct = PRODUCTS.find((product) => product.category === 'boots') ?? PRODUCTS[0];

  return (
    <div className="min-h-screen bg-[#080808] font-sans text-[#f0eee9] selection:bg-[#c5a880] selection:text-black">
      <Header
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
        onNavigateSection={handleNavigateSection}
      />
      <main className="pb-24 lg:pb-0">
        <Hero onExploreClick={() => handleNavigateSection('catalogo')} />
        <CustomerReviewsSection />
        <CatalogSection
          products={jeans}
          onSelectProduct={handleOpenProduct}
        />
        <CatalogSection
          sectionId="henleys"
          eyebrow="HENLEY"
          products={henleys}
          onSelectProduct={handleOpenProduct}
        />
        <SizeGuideSection />
        <BootsSection
          product={bootsProduct}
          onSelectProduct={handleOpenProduct}
        />
        <BrandStatement />
      </main>

      <Footer onNavigateSection={handleNavigateSection} />
      <MobileBottomBar
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
        onExploreCatalog={() => handleNavigateSection('catalogo')}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={handleCloseProduct}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
        isSizeGuideOpen={sizeGuideOpen}
      />
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </div>
  );
}

export default App;
