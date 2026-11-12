import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { renderIcon } from '../../utils/iconResolver';

export const StoreLocationSection: React.FC = () => {
  const { currentBakery } = useBakery();
  const { store_location } = currentBakery;

  const whatsappUrl = `https://wa.me/${store_location.contact.whatsappNumber}?text=${encodeURIComponent(
    store_location.contact.whatsappMessagePreset
  )}`;

  return (
    <section id="localizacao" className="py-16 sm:py-24 bg-[var(--color-bg-alt)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] mb-3">
            {renderIcon('MapPin', { size: 14 })}
            <span>{store_location.badge}</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text)] tracking-tight">
            {store_location.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[var(--color-text-secondary)]">
            {store_location.subtitle}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Schedule & Direct Contact */}
          <div className="lg:col-span-6 space-y-6">
            {/* Opening Hours Schedule */}
            <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[var(--color-border-light)] text-[var(--color-text)]">
                {renderIcon('Clock', { size: 20, className: 'text-[var(--color-primary)]' })}
                <h3 className="font-heading font-bold text-lg">Horários de Atendimento & Forno</h3>
              </div>

              <div className="space-y-3">
                {store_location.schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2.5 rounded-lg hover:bg-[var(--color-surface-muted)] transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-xs sm:text-sm text-[var(--color-text)] block">
                        {item.days}
                      </span>
                      {item.note && (
                        <span className="text-[11px] text-[var(--color-primary)] font-medium">
                          {item.note}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs sm:text-sm font-bold text-[var(--color-text-secondary)]">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Fast Contact Channels */}
            <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] flex items-center justify-center shrink-0 mt-0.5">
                  {renderIcon('MapPin', { size: 20 })}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--color-text)]">Endereço da Padaria</h4>
                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-0.5">
                    {store_location.address.fullFormatted}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    {store_location.parkingInfo}
                  </p>
                  <a
                    href={store_location.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:underline mt-2"
                  >
                    <span>Como Chegar (Google Maps)</span>
                    {renderIcon('ExternalLink', { size: 12 })}
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--color-border-light)] grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-xs transition-colors"
                >
                  {renderIcon('MessageCircle', { size: 18 })}
                  <span>WhatsApp Encomendas</span>
                </a>

                <a
                  href={`tel:${store_location.contact.phoneFormatted.replace(/[^0-9]/g, '')}`}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--color-surface-muted)] hover:bg-[var(--color-border-light)] text-[var(--color-text)] font-semibold text-xs transition-colors"
                >
                  {renderIcon('Phone', { size: 18, className: 'text-[var(--color-primary)]' })}
                  <span>{store_location.contact.phoneFormatted}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Delivery Services & Map */}
          <div className="lg:col-span-6 space-y-6">
            {/* Delivery Apps / Channels */}
            <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-4">
              <h4 className="font-heading font-bold text-lg text-[var(--color-text)]">
                Opções de Pedido & Entrega
              </h4>

              <div className="grid grid-cols-1 gap-3">
                {store_location.deliveryServices.map((service, idx) => (
                  <a
                    key={idx}
                    href={service.link}
                    target={service.link.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] bg-[var(--color-surface-muted)] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-primary)] shadow-2xs">
                        {renderIcon('ShoppingBag', { size: 16 })}
                      </div>
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors block">
                          {service.name}
                        </span>
                        <span className="text-[11px] text-[var(--color-text-muted)]">
                          {service.rating}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[var(--color-badge-bg)] text-[var(--color-badge-text)]">
                      {service.badge}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Stylized Map View Frame */}
            <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
                <span className="font-semibold text-[var(--color-text)] flex items-center gap-1.5">
                  {renderIcon('MapPin', { size: 15, className: 'text-[var(--color-primary)]' })}
                  Localização Geográfica
                </span>
                <span className="font-mono text-[11px]">Pinheiros / Jardins</span>
              </div>

              {/* Responsive Map Embed */}
              <div className="aspect-16/9 rounded-xl overflow-hidden relative bg-[var(--color-surface-muted)] border border-[var(--color-border-light)]">
                <iframe
                  title="Mapa Levain and Co"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    store_location.address.fullFormatted
                  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full filter saturate-90 contrast-95"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
