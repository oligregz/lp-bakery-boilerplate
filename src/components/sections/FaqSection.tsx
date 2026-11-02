import React, { useState } from 'react';
import { database } from '../../data/database';
import { renderIcon } from '../../utils/iconResolver';

export const FaqSection: React.FC = () => {
  const { faq, store_location } = database;
  const [openFaqId, setOpenFaqId] = useState<string | null>(faq.items[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const whatsappUrl = `https://wa.me/${store_location.contact.whatsappNumber}?text=${encodeURIComponent(
    'Olá Levain & Co.! Gostaria de tirar uma dúvida sobre os pães ou encomendas.'
  )}`;

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[var(--color-bg)] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] mb-3">
            {renderIcon('Hourglass', { size: 14 })}
            <span>{faq.badge}</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[var(--color-text)] tracking-tight">
            {faq.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[var(--color-text-secondary)]">
            {faq.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faq.items.map((item) => {
            const isOpen = openFaqId === item.id;

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[var(--color-surface-muted)] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[var(--color-surface-muted)] text-[var(--color-primary)]">
                      {item.category}
                    </span>
                    <span className="font-heading font-bold text-base sm:text-lg text-[var(--color-text)]">
                      {item.question}
                    </span>
                  </div>

                  <span className="shrink-0 text-[var(--color-primary)]">
                    {isOpen ? renderIcon('ChevronUp', { size: 20 }) : renderIcon('ChevronDown', { size: 20 })}
                  </span>
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border-light)] bg-[var(--color-surface)]">
                    <p className="mt-3">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Prompt */}
        <div className="mt-12 p-6 rounded-2xl bg-[var(--color-surface-muted)] border border-[var(--color-border)] text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm font-medium text-[var(--color-text)]">
            {faq.supportPrompt.text}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-all shrink-0 shadow-xs"
          >
            {renderIcon('MessageCircle', { size: 16 })}
            <span>{faq.supportPrompt.actionLabel}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
