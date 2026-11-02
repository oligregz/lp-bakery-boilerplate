import React, { useState } from 'react';
import { database } from '../../data/database';
import { renderIcon } from '../../utils/iconResolver';

export const FreshBatchesSection: React.FC = () => {
  const { fresh_batches, store_location } = database;
  const [reservedBatchId, setReservedBatchId] = useState<string | null>(null);

  const handleReserve = (item: typeof fresh_batches.items[0]) => {
    setReservedBatchId(item.id);
    const message = fresh_batches.whatsappReminderTemplate
      .replace('{time}', item.time)
      .replace('{product}', item.productName);

    const whatsappUrl = `https://wa.me/${store_location.contact.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setReservedBatchId(null);
    }, 400);
  };

  return (
    <section id="fornadas" className="py-16 sm:py-24 bg-[var(--color-bg-alt)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]" />
            </span>
            <span>{fresh_batches.badge}</span>
            <span className="text-[var(--color-border)]">•</span>
            <span>{fresh_batches.liveBadgeText}</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text)] tracking-tight">
            {fresh_batches.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[var(--color-text-secondary)]">
            {fresh_batches.subtitle}
          </p>
        </div>

        {/* Batches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fresh_batches.items.map((batch) => {
            const isNow = batch.status === 'saindo_agora';
            const isNext = batch.status === 'proxima';

            return (
              <div
                key={batch.id}
                className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between border bg-[var(--color-surface)] shadow-md hover:shadow-xl hover:-translate-y-1 ${
                  isNow
                    ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20'
                    : isNext
                    ? 'border-[var(--color-accent)]/60'
                    : 'border-[var(--color-border)]'
                }`}
              >
                {/* Top Status & Time */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 ${
                        isNow
                          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold'
                          : isNext
                          ? 'bg-[var(--color-badge-bg)] text-[var(--color-badge-text)]'
                          : 'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]'
                      }`}
                    >
                      {isNow && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      )}
                      {batch.statusLabel}
                    </span>

                    <div className="flex items-center gap-1 font-mono text-xl font-extrabold text-[var(--color-primary)]">
                      {renderIcon('Clock', { size: 16 })}
                      <span>{batch.time}</span>
                    </div>
                  </div>

                  {/* Batch Product Title */}
                  <h3 className="font-heading font-bold text-xl text-[var(--color-text)] mb-2 leading-snug">
                    {batch.productName}
                  </h3>

                  {/* Fermentation Info */}
                  <p className="text-xs text-[var(--color-text-secondary)] mb-4 font-medium flex items-center gap-1.5">
                    {renderIcon('Hourglass', { size: 13, className: 'shrink-0 text-[var(--color-primary)]' })}
                    <span>{batch.fermentationType}</span>
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {batch.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action & Availability */}
                <div className="pt-4 border-t border-[var(--color-border-light)]">
                  <div className="flex items-center justify-between text-xs mb-3 text-[var(--color-text-muted)]">
                    <span>Disponibilidade:</span>
                    <span className="font-bold text-[var(--color-text)]">
                      ~{batch.unitsAvailable} unidades
                    </span>
                  </div>

                  <button
                    onClick={() => handleReserve(batch)}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    {reservedBatchId === batch.id
                      ? renderIcon('Check', { size: 16 })
                      : renderIcon('MessageCircle', { size: 16 })}
                    <span>{fresh_batches.notifyButtonText}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
