import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { MediaImage } from '../common/MediaImage';
import { renderIcon } from '../../utils/iconResolver';

export const CustomerReviewsSection: React.FC = () => {
  const { currentBakery } = useBakery();
  const { customer_reviews } = currentBakery;

  return (
    <section id="avaliacoes" className="py-16 sm:py-24 bg-[var(--color-bg-alt)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] mb-3">
            {renderIcon('Star', { size: 14 })}
            <span>{customer_reviews.badge}</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text)] tracking-tight">
            {customer_reviews.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[var(--color-text-secondary)]">
            {customer_reviews.subtitle}
          </p>
        </div>

        {/* Stats Strip */}
        <div className="mb-12 max-w-2xl mx-auto grid grid-cols-2 gap-6 p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs text-center">
          <div>
            <div className="flex items-center justify-center gap-1.5 text-amber-500 mb-1">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{renderIcon('Star', { size: 18 })}</span>
              ))}
            </div>
            <span className="font-heading font-extrabold text-3xl text-[var(--color-text)]">
              {customer_reviews.averageRating}
            </span>
            <span className="block text-xs text-[var(--color-text-muted)] mt-0.5">
              {customer_reviews.totalReviewsLabel}
            </span>
          </div>

          <div className="border-l border-[var(--color-border-light)]">
            <div className="flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-1">
              {renderIcon('ShieldCheck', { size: 22 })}
            </div>
            <span className="font-heading font-extrabold text-3xl text-[var(--color-text)]">
              {customer_reviews.satisfactionRate}
            </span>
            <span className="block text-xs text-[var(--color-text-muted)] mt-0.5">
              {customer_reviews.satisfactionLabel}
            </span>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {customer_reviews.items.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-[var(--color-primary-light)]">
                    <MediaImage
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[var(--color-text)]">
                      {rev.author}
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {rev.location}
                    </p>
                  </div>
                </div>

                {/* Rating & Verified Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span key={i}>{renderIcon('Star', { size: 14 })}</span>
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    {renderIcon('Check', { size: 11 })}
                    <span>{rev.verifiedText}</span>
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Product Favorite Badge */}
              <div className="pt-3 border-t border-[var(--color-border-light)] text-[11px] text-[var(--color-text-muted)] flex items-center gap-1.5">
                <span className="font-semibold text-[var(--color-text)]">Item favorito:</span>
                <span className="text-[var(--color-primary)] font-medium truncate">
                  {rev.favoriteItem}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews CTA */}
        <div className="text-center">
          <a
            href={customer_reviews.googleReviewCta.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--color-primary)] hover:underline"
          >
            <span>{customer_reviews.googleReviewCta.label}</span>
            {renderIcon(customer_reviews.googleReviewCta.icon, { size: 15 })}
          </a>
        </div>
      </div>
    </section>
  );
};
