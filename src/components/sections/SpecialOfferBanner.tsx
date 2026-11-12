import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { useCart } from '../../context/CartContext';
import { MediaImage } from '../common/MediaImage';
import { renderIcon } from '../../utils/iconResolver';

export const SpecialOfferBanner: React.FC = () => {
  const { currentBakery } = useBakery();
  const { special_offers } = currentBakery;
  const { applyCoupon, setIsCartOpen } = useCart();
  const [copied, setCopied] = useState(false);

  if (!special_offers.enabled) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(special_offers.couponCode);
    applyCoupon(special_offers.couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApplyAndShop = () => {
    applyCoupon(special_offers.couponCode);
    const element = document.getElementById('cardapio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[var(--color-bg)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-surface)] border border-[var(--color-border)] shadow-xl p-8 sm:p-12 text-white">
          {/* Subtle background ambient pattern */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 opacity-10 pointer-events-none text-white">
            {renderIcon('Wheat', { size: 380 })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[var(--color-primary)] text-white shadow-xs">
                {renderIcon('Sparkles', { size: 14 })}
                <span>{special_offers.badge}</span>
              </span>

              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                {special_offers.title}
              </h2>

              <p className="text-sm sm:text-base text-stone-200 max-w-xl leading-relaxed">
                {special_offers.subtitle}
              </p>

              {/* Coupon Box */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-xl bg-black/40 border border-white/20 p-1.5 backdrop-blur-sm">
                  <span className="font-mono font-extrabold text-lg sm:text-xl tracking-widest px-4 py-1.5 text-amber-300">
                    {special_offers.couponCode}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? renderIcon('Check', { size: 15 }) : renderIcon('Copy', { size: 15 })}
                    <span>{copied ? special_offers.copiedButtonLabel : special_offers.copyButtonLabel}</span>
                  </button>
                </div>

                <button
                  onClick={handleApplyAndShop}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>{special_offers.ctaText}</span>
                  {renderIcon('ArrowRight', { size: 16 })}
                </button>
              </div>

              <p className="text-[11px] text-stone-300 italic pt-1">
                {special_offers.terms}
              </p>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 aspect-4/3">
                <MediaImage
                  src={special_offers.image}
                  alt={special_offers.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
