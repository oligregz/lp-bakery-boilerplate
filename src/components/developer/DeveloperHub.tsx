import React from 'react';
import { database } from '../../data/database';
import { renderIcon } from '../../utils/iconResolver';

export const DeveloperHub: React.FC = () => {
  const { developer_profile } = database;

  const whatsappRedirectUrl = `https://wa.me/${developer_profile.whatsappNumber}?text=${encodeURIComponent(
    developer_profile.whatsappMessagePreset
  )}`;

  return (
    <div className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[85vh]">
      <div className="w-full max-w-4xl mx-auto">
        {/* Main Developer Presentation Card with var(--color-primary-light) background */}
        <div
          style={{ backgroundColor: 'var(--color-primary-light)' }}
          className="relative rounded-3xl overflow-hidden border border-black/10 shadow-2xl p-8 sm:p-14 text-stone-950 transition-colors"
        >
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none text-stone-900">
            {renderIcon('Wheat', { size: 280 })}
          </div>

          <div className="max-w-3xl relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase px-3.5 py-1 rounded-full bg-stone-900 text-white shadow-xs">
              {renderIcon('Award', { size: 14 })}
              <span>{developer_profile.title}</span>
            </div>

            {/* Exact required headline copy */}
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-snug text-stone-950">
              {developer_profile.headline}
            </h1>

            <p className="text-sm sm:text-base text-stone-900/90 max-w-2xl leading-relaxed font-medium">
              Desenvolvimento de soluções web sob medida para estabelecimentos gastronômicos com alta taxa de conversão, carregamento instantâneo e integração direta de pedidos.
            </p>

            {/* CTAs: WhatsApp & Portfolio */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={whatsappRedirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-700 hover:bg-emerald-800 transition-all shadow-md hover:shadow-lg transform active:scale-95 cursor-pointer"
              >
                {renderIcon('MessageCircle', { size: 18 })}
                <span>{developer_profile.whatsappButtonLabel}</span>
              </a>

              <a
                href={developer_profile.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-stone-950 bg-white/70 hover:bg-white border border-black/15 transition-all backdrop-blur-sm cursor-pointer shadow-xs"
              >
                {renderIcon('ExternalLink', { size: 16 })}
                <span>{developer_profile.portfolioLabel}</span>
              </a>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-stone-800 font-mono">
              <span>Contato direto:</span>
              <strong className="text-stone-950 font-bold">+55 75 99168-9780</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
