import React, { useState, useEffect } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { MediaImage } from '../common/MediaImage';
import { renderIcon } from '../../utils/iconResolver';

export const HeroSection: React.FC = () => {
  const { currentBakery } = useBakery();
  const { hero_section, brand_profile } = currentBakery;
  const [countdown, setCountdown] = useState(hero_section.liveBatchBadge.countdownMinutes * 60);

  // Live countdown ticker simulation for CRO freshness urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 45 * 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const formattedCountdown = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Subtle background ambient gradient glows */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-15 blur-[120px] pointer-events-none rounded-full bg-[var(--color-primary)]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: CRO Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Live Oven Batch Alert Ticker */}
            <a
              href="#fornadas"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs hover:border-[var(--color-primary)] transition-all group"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-warning)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-warning)]" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                {hero_section.liveBatchBadge.statusLabel}
              </span>
              <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                {hero_section.liveBatchBadge.nextBatchLabel}{' '}
                <strong className="text-[var(--color-text)] font-mono">{formattedCountdown}</strong>
              </span>
              {renderIcon('ArrowRight', {
                size: 14,
                className: 'text-[var(--color-primary)] transition-transform group-hover:translate-x-1',
              })}
            </a>

            {/* Quality Award Badge */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-md bg-[var(--color-badge-bg)] text-[var(--color-badge-text)]">
              {renderIcon(hero_section.badge.icon, { size: 14 })}
              <span>{hero_section.badge.text}</span>
            </div>

            {/* Main Headline with Highlighted Word */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-[var(--color-text)]">
              {hero_section.headlinePrefix}{' '}
              <span className="text-[var(--color-primary)] underline decoration-[var(--color-primary-light)]/40 decoration-wavy underline-offset-8">
                {hero_section.headlineHighlight}
              </span>{' '}
              {hero_section.headlineSuffix}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
              {hero_section.subheadline}
            </p>

            {/* High-Conversion Action Buttons */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href={hero_section.primaryCta.href}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-base text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-all shadow-lg hover:shadow-xl transform active:scale-98 cursor-pointer"
              >
                {renderIcon(hero_section.primaryCta.icon, { size: 20 })}
                <span>{hero_section.primaryCta.label}</span>
              </a>

              <a
                href={hero_section.secondaryCta.href}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-semibold text-base text-[var(--color-text)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all shadow-xs cursor-pointer"
              >
                {renderIcon(hero_section.secondaryCta.icon, { size: 18 })}
                <span>{hero_section.secondaryCta.label}</span>
              </a>
            </div>

            {/* Social Proof & Google Ratings Avatars */}
            <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-[var(--color-border-light)] w-full">
              <div className="flex -space-x-2 overflow-hidden">
                {hero_section.socialProof.avatars.map((avatar, idx) => (
                  <div
                    key={idx}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-[var(--color-surface)] overflow-hidden"
                  >
                    <MediaImage
                      src={avatar}
                      alt={hero_section.socialProof.reviewsCountText}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-500">
                      {renderIcon('Star', { size: 16 })}
                    </span>
                  ))}
                  <span className="font-bold text-sm text-[var(--color-text)] ml-1">
                    {hero_section.socialProof.rating}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    /{hero_section.socialProof.maxRating}
                  </span>
                </div>
                <span className="text-xs text-[var(--color-text-secondary)] font-medium">
                  {hero_section.socialProof.reviewsCountText}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Showcase Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[var(--color-surface)] aspect-4/5">
                <MediaImage
                  src={hero_section.heroMedia.mainImage}
                  alt={hero_section.heroMedia.mainImageAlt}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-5 left-5 right-5 text-white p-4 rounded-xl backdrop-blur-md bg-black/40 border border-white/20">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary-light)]">
                    {hero_section.liveBatchBadge.batchName}
                  </p>
                  <p className="text-sm font-medium opacity-90">
                    {brand_profile.tagline}
                  </p>
                </div>
              </div>

              {/* Floating Croissant Preview Card */}
              <div className="absolute -bottom-6 -left-6 sm:-left-10 w-44 sm:w-52 rounded-2xl overflow-hidden shadow-xl border-3 border-[var(--color-surface)] hidden sm:block bg-[var(--color-surface)]">
                <div className="h-28 overflow-hidden">
                  <MediaImage
                    src={hero_section.heroMedia.floatingImage}
                    alt={hero_section.heroMedia.floatingImageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-[11px] font-bold text-[var(--color-primary)] uppercase tracking-wider">
                    {hero_section.heroMedia.floatingBadge.number} {hero_section.heroMedia.floatingBadge.label}
                  </p>
                  <p className="text-[10px] text-[var(--color-text-secondary)]">
                    {hero_section.heroMedia.floatingBadge.caption}
                  </p>
                </div>
              </div>

              {/* Floating 36h Badge */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-4 shadow-xl flex items-center gap-3 backdrop-blur-md">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] flex items-center justify-center font-bold text-lg">
                  {renderIcon('Hourglass', { size: 24 })}
                </div>
                <div>
                  <span className="block font-heading font-bold text-xl text-[var(--color-text)] leading-none">
                    36 Horas
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)] font-medium">
                    Fermentação Viva
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Strip (White-Label Parameterized) */}
        <div className="mt-16 pt-8 border-t border-[var(--color-border)] grid grid-cols-2 md:grid-cols-4 gap-6">
          {brand_profile.badges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[var(--color-surface)]/60 border border-[var(--color-border-light)] hover:border-[var(--color-primary)] transition-colors"
            >
              <div className="w-10 h-10 shrink-0 rounded-lg bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] flex items-center justify-center">
                {renderIcon(badge.icon, { size: 20 })}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-[var(--color-text)]">
                  {badge.title}
                </span>
                <span className="text-xs text-[var(--color-text-secondary)] line-clamp-2">
                  {badge.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
