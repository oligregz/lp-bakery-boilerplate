import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { MediaImage } from '../common/MediaImage';
import { renderIcon } from '../../utils/iconResolver';

export const ArtisanalProcessSection: React.FC = () => {
  const { currentBakery } = useBakery();
  const { artisanal_process } = currentBakery;

  return (
    <section id="processo" className="py-16 sm:py-24 bg-[var(--color-bg-alt)] transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] mb-3">
            {renderIcon('Hourglass', { size: 14 })}
            <span>{artisanal_process.badge}</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text)] tracking-tight">
            {artisanal_process.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[var(--color-text-secondary)]">
            {artisanal_process.subtitle}
          </p>
        </div>

        {/* Master Baker Quote Card */}
        <div className="mb-16 p-8 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 text-[var(--color-primary)]">
            {renderIcon('Wheat', { size: 140 })}
          </div>
          <div className="max-w-3xl relative z-10">
            <p className="font-heading italic text-xl sm:text-2xl text-[var(--color-text)] leading-relaxed mb-4">
              "{artisanal_process.quote.text}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm">
                ML
              </div>
              <div>
                <p className="font-bold text-sm text-[var(--color-text)]">
                  {artisanal_process.quote.author}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {artisanal_process.quote.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {artisanal_process.steps.map((step) => (
            <div
              key={step.stepNumber}
              className="rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Step Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-[var(--color-surface-muted)]">
                  <MediaImage
                    src={step.image}
                    alt={step.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-[var(--color-primary)] text-white font-mono font-bold text-sm flex items-center justify-center shadow-md">
                    {step.stepNumber}
                  </div>
                  <div className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-1 rounded bg-black/70 text-white backdrop-blur-xs flex items-center gap-1">
                    {renderIcon('Clock', { size: 12 })}
                    <span>{step.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="font-heading font-bold text-lg text-[var(--color-text)]">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Bottom Key Benefit Highlight */}
              <div className="p-6 pt-0">
                <div className="p-3 rounded-xl bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] text-xs font-medium flex items-start gap-2">
                  <span className="shrink-0 mt-0.5">
                    {renderIcon('Check', { size: 14 })}
                  </span>
                  <span>{step.keyHighlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
