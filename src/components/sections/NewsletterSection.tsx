import React, { useState } from 'react';
import { database } from '../../data/database';
import { useCart } from '../../context/CartContext';
import { renderIcon } from '../../utils/iconResolver';

export const NewsletterSection: React.FC = () => {
  const { newsletter } = database;
  const { applyCoupon } = useCart();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      applyCoupon(newsletter.instantCoupon);
    }, 600);
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(newsletter.instantCoupon);
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2000);
  };

  return (
    <section className="py-16 sm:py-20 bg-[var(--color-bg-alt)] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl text-center space-y-6 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-[var(--color-badge-bg)] text-[var(--color-badge-text)]">
            {renderIcon('Sparkles', { size: 14 })}
            <span>{newsletter.badge}</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[var(--color-text)] tracking-tight">
            {newsletter.title}
          </h2>

          <p className="text-xs sm:text-base text-[var(--color-text-secondary)] max-w-xl mx-auto">
            {newsletter.subtitle}
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={newsletter.inputPlaceholder}
                  className="flex-1 px-4 py-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-all shadow-md cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {isSubmitting ? newsletter.submittingText : newsletter.submitButtonText}
                </button>
              </div>

              <p className="text-[11px] text-[var(--color-text-muted)]">
                {newsletter.benefitText}
              </p>
            </form>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 max-w-md mx-auto animate-fadeIn space-y-3">
              <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                {renderIcon('Check', { size: 20 })}
              </div>
              <h3 className="font-heading font-bold text-lg text-emerald-800 dark:text-emerald-200">
                {newsletter.successTitle}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300">
                {newsletter.successMessage}
              </p>
              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="font-mono font-extrabold text-lg text-[var(--color-primary)] px-3 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)]">
                  {newsletter.instantCoupon}
                </span>
                <button
                  onClick={handleCopyCoupon}
                  className="p-2 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90 cursor-pointer"
                  title="Copiar cupom"
                >
                  {copiedCoupon ? renderIcon('Check', { size: 16 }) : renderIcon('Copy', { size: 16 })}
                </button>
              </div>
            </div>
          )}

          <p className="text-[10px] text-[var(--color-text-muted)]">
            {newsletter.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};
