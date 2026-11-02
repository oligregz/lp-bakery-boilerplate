/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { FreshBatchesSection } from './components/sections/FreshBatchesSection';
import { ProductCatalogSection } from './components/sections/ProductCatalogSection';
import { ArtisanalProcessSection } from './components/sections/ArtisanalProcessSection';
import { SpecialOfferBanner } from './components/sections/SpecialOfferBanner';
import { CustomerReviewsSection } from './components/sections/CustomerReviewsSection';
import { MasterBakerSection } from './components/sections/MasterBakerSection';
import { StoreLocationSection } from './components/sections/StoreLocationSection';
import { FaqSection } from './components/sections/FaqSection';
import { NewsletterSection } from './components/sections/NewsletterSection';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/modals/CartDrawer';
import { ThemeCustomizerModal } from './components/modals/ThemeCustomizerModal';
import { FloatingWhatsAppCta } from './components/common/FloatingWhatsAppCta';

const LandingPageContent: React.FC = () => {
  const [themeDrawerOpen, setThemeDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300 selection:bg-[var(--color-primary-light)] selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenThemeDrawer={() => setThemeDrawerOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection />
        <FreshBatchesSection />
        <ProductCatalogSection />
        <ArtisanalProcessSection />
        <SpecialOfferBanner />
        <CustomerReviewsSection />
        <MasterBakerSection />
        <StoreLocationSection />
        <FaqSection />
        <NewsletterSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Overlays & Modals */}
      <CartDrawer />
      <ThemeCustomizerModal
        isOpen={themeDrawerOpen}
        onClose={() => setThemeDrawerOpen(false)}
      />
      <FloatingWhatsAppCta />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <LandingPageContent />
      </CartProvider>
    </ThemeProvider>
  );
}
