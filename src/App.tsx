/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { BakeryProvider, useBakery } from './context/BakeryContext';
import { CartProvider } from './context/CartContext';
import { DeveloperHub } from './components/developer/DeveloperHub';
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
  const { currentBakery, isHub } = useBakery();
  const { setPresetId } = useTheme();
  const [themeDrawerOpen, setThemeDrawerOpen] = useState(false);

  // Sync theme preset whenever active bakery changes
  useEffect(() => {
    if (currentBakery.theme_preset) {
      setPresetId(currentBakery.theme_preset);
    }
  }, [currentBakery.slug, currentBakery.theme_preset, setPresetId]);

  const { sections_visibility } = currentBakery;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300 selection:bg-[var(--color-primary-light)] selection:text-white">
      {/* Conditional View: Developer Hub vs Bakery Landing Page */}
      {isHub ? (
        <main className="flex-1 flex items-center justify-center">
          <DeveloperHub />
        </main>
      ) : (
        <>
          {/* Main Bakery Navbar */}
          <Navbar onOpenThemeDrawer={() => setThemeDrawerOpen(true)} />

          {/* Conditional Sections - Governed by database.ts sections_visibility */}
          <main className="flex-1">
            {sections_visibility.hero && <HeroSection />}
            {sections_visibility.fresh_batches && <FreshBatchesSection />}
            {sections_visibility.products && <ProductCatalogSection />}
            {sections_visibility.artisanal_process && <ArtisanalProcessSection />}
            {sections_visibility.special_offers && <SpecialOfferBanner />}
            {sections_visibility.customer_reviews && <CustomerReviewsSection />}
            {sections_visibility.master_baker && <MasterBakerSection />}
            {sections_visibility.store_location && <StoreLocationSection />}
            {sections_visibility.faq && <FaqSection />}
            {sections_visibility.newsletter && <NewsletterSection />}
          </main>
        </>
      )}

      {/* Footer (Rendered on bakery pages when enabled) */}
      {!isHub && sections_visibility.footer && <Footer />}

      {/* Interactive Overlays & Modals */}
      <CartDrawer />
      <ThemeCustomizerModal
        isOpen={themeDrawerOpen}
        onClose={() => setThemeDrawerOpen(false)}
      />
      {!isHub && sections_visibility.floating_whatsapp && <FloatingWhatsAppCta />}
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <BakeryProvider>
        <CartProvider>
          <LandingPageContent />
        </CartProvider>
      </BakeryProvider>
    </ThemeProvider>
  );
}
