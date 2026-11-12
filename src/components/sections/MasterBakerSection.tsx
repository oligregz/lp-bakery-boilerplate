import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { MediaImage } from '../common/MediaImage';
import { renderIcon } from '../../utils/iconResolver';

export const MasterBakerSection: React.FC = () => {
  const { currentBakery } = useBakery();
  const { master_baker } = currentBakery;

  return (
    <section id="padeiro" className="py-16 sm:py-24 bg-[var(--color-bg)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Chef Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[var(--color-surface)] aspect-4/5">
              <MediaImage
                src={master_baker.photo}
                alt={master_baker.photoAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="font-heading font-extrabold text-2xl block">
                  {master_baker.chefName}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary-light)]">
                  {master_baker.chefTitle}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Bio & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-[var(--color-badge-bg)] text-[var(--color-badge-text)]">
              {renderIcon('Award', { size: 14 })}
              <span>{master_baker.badge}</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[var(--color-text)] tracking-tight">
              {master_baker.title}
            </h2>

            {/* Quote block */}
            <blockquote className="p-4 rounded-xl border-l-4 border-[var(--color-primary)] bg-[var(--color-surface-muted)] text-sm sm:text-base font-serif italic text-[var(--color-text)]">
              "{master_baker.quote}"
            </blockquote>

            {/* Bio Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {master_baker.bioParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Credentials / Honors */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[var(--color-border-light)]">
              {master_baker.credentials.map((cred) => (
                <div
                  key={cred.id}
                  className="p-3.5 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-border-light)]"
                >
                  <span className="font-mono text-xs font-extrabold text-[var(--color-primary)] block mb-1">
                    {cred.year}
                  </span>
                  <p className="font-bold text-xs text-[var(--color-text)] leading-snug">
                    {cred.title}
                  </p>
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                    {cred.institution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
