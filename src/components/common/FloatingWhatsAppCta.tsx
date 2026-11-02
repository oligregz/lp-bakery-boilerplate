import React, { useState } from 'react';
import { database } from '../../data/database';
import { renderIcon } from '../../utils/iconResolver';

export const FloatingWhatsAppCta: React.FC = () => {
  const { store_location, hero_section } = database;
  const [isDismissed, setIsDismissed] = useState(false);

  const whatsappUrl = `https://wa.me/${store_location.contact.whatsappNumber}?text=${encodeURIComponent(
    store_location.contact.whatsappMessagePreset
  )}`;

  return (
    <aside
      aria-label="Atendimento rápido pelo WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
    >
      {/* Tooltip prompt bubble */}
      {!isDismissed && (
        <div className="relative mb-1 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl text-xs text-[var(--color-text)] animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-medium">
            Fornada saindo! <strong>Pedir no WhatsApp</strong>
          </span>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] ml-1"
            aria-label="Fechar aviso"
          >
            {renderIcon('X', { size: 12 })}
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chamar no WhatsApp"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ring-4 ring-emerald-500/20"
      >
        {renderIcon('MessageCircle', { size: 28 })}
      </a>
    </aside>
  );
};
