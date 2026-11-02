import React from 'react';
import { database } from '../../data/database';
import { renderIcon } from '../../utils/iconResolver';

export const Footer: React.FC = () => {
  const { footer, brand_profile } = database;

  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--color-border-light)]">
          {/* Brand Info & Socials */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{brand_profile.logo.symbol}</span>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-2xl text-[var(--color-text)]">
                  {brand_profile.logo.text}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
                  {brand_profile.logo.badgeText}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-sm">
              {footer.description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              {brand_profile.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[var(--color-surface-muted)] hover:bg-[var(--color-primary)] text-[var(--color-text)] hover:text-white flex items-center justify-center transition-all"
                  aria-label={social.platform}
                >
                  {renderIcon(social.icon, { size: 16 })}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {footer.columns.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="font-heading font-bold text-sm text-[var(--color-text)] uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.href}
                      className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors leading-relaxed block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="py-6 border-b border-[var(--color-border-light)] flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
            {footer.paymentMethodsTitle}:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {footer.paymentMethods.map((method, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2.5 py-1 rounded bg-[var(--color-surface-muted)] text-[var(--color-text)] border border-[var(--color-border-light)]"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Credits & White-Label Boilerplate Badge */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-muted)]">
          <p>{footer.copyright}</p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-surface-muted)] border border-[var(--color-border-light)]">
            <span className="font-bold text-[10px] uppercase text-[var(--color-primary)]">
              {footer.whiteLabelNotice.badge}
            </span>
            <span>{footer.whiteLabelNotice.text}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
