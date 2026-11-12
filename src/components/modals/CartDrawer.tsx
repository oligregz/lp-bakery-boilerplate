import React, { useState } from 'react';
import { database } from '../../data/database';
import { useBakery } from '../../context/BakeryContext';
import { useCart } from '../../context/CartContext';
import { MediaImage } from '../common/MediaImage';
import { renderIcon } from '../../utils/iconResolver';

export const CartDrawer: React.FC = () => {
  const { currentBakery } = useBakery();
  const { cart_checkout } = database;
  const { store_location, products } = currentBakery;
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    appliedCoupon,
    applyCoupon,
    discountAmount,
    finalTotal,
  } = useCart();

  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (!success) {
      setCouponError(true);
      setTimeout(() => setCouponError(false), 2000);
    } else {
      setCouponInput('');
    }
  };

  const handleCheckoutWhatsApp = () => {
    const deliveryLabel =
      deliveryType === 'pickup'
        ? cart_checkout.pickupOptionLabel
        : cart_checkout.deliveryOptionLabel;

    let message = `${cart_checkout.whatsappMessageHeader}\n\n`;

    if (customerName.trim()) {
      message += `👤 *Cliente:* ${customerName.trim()}\n`;
    }

    message += `${cart_checkout.whatsappTypePrefix} ${deliveryLabel}\n`;

    if (deliveryType === 'delivery' && address.trim()) {
      message += `🏠 *Endereço:* ${address.trim()}\n`;
    }

    message += `\n📦 *Itens do Pedido:*\n`;
    items.forEach((item) => {
      const itemSub = (item.product.price * item.quantity).toFixed(2).replace('.', ',');
      message += `${cart_checkout.whatsappItemPrefix} ${item.quantity}x ${item.product.name} (${products.currencySymbol} ${itemSub})\n`;
    });

    message += `\n${cart_checkout.subtotalLabel}: ${products.currencySymbol} ${subtotal.toFixed(2).replace('.', ',')}\n`;

    if (appliedCoupon && discountAmount > 0) {
      message += `🎟️ Cupom (${appliedCoupon}): -${products.currencySymbol} ${discountAmount.toFixed(2).replace('.', ',')}\n`;
    }

    message += `${cart_checkout.whatsappTotalPrefix} ${products.currencySymbol} ${finalTotal.toFixed(2).replace('.', ',')}\n`;

    if (notes.trim()) {
      message += `\n${cart_checkout.whatsappNotesPrefix} ${notes.trim()}\n`;
    }

    const whatsappUrl = `https://wa.me/${store_location.contact.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[var(--color-surface)] border-l border-[var(--color-border)] shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[var(--color-border-light)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-[var(--color-primary)]">
                {renderIcon('ShoppingBag', { size: 22 })}
              </span>
              <h3 className="font-heading font-bold text-xl text-[var(--color-text)]">
                {cart_checkout.drawerTitle}
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-muted)] cursor-pointer"
              aria-label="Fechar sacola"
            >
              {renderIcon('X', { size: 20 })}
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] flex items-center justify-center">
                  {renderIcon('ShoppingBag', { size: 30 })}
                </div>
                <h4 className="font-heading font-bold text-lg text-[var(--color-text)]">
                  {cart_checkout.emptyCartText}
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)] max-w-xs mx-auto">
                  {cart_checkout.emptyCartSubtext}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-colors cursor-pointer"
                >
                  {cart_checkout.exploreMenuLabel}
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                    <span>{cart_checkout.itemsLabel} ({items.length})</span>
                    <button
                      onClick={clearCart}
                      className="text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {renderIcon('Trash2', { size: 12 })}
                      <span>{cart_checkout.clearCartLabel}</span>
                    </button>
                  </div>

                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-border-light)] bg-[var(--color-surface-muted)]"
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                        <MediaImage
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm text-[var(--color-text)] truncate">
                          {item.product.name}
                        </h4>
                        <span className="text-xs font-semibold text-[var(--color-primary)]">
                          {products.currencySymbol} {item.product.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:text-[var(--color-primary)] text-[var(--color-text-secondary)] cursor-pointer"
                          aria-label="Diminuir"
                        >
                          {renderIcon('Minus', { size: 14 })}
                        </button>
                        <span className="font-mono font-bold text-xs px-2 text-[var(--color-text)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:text-[var(--color-primary)] text-[var(--color-text-secondary)] cursor-pointer"
                          aria-label="Aumentar"
                        >
                          {renderIcon('Plus', { size: 14 })}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Type Toggle */}
                <div className="space-y-2 pt-2 border-t border-[var(--color-border-light)]">
                  <label className="block text-xs font-bold text-[var(--color-text)]">
                    {cart_checkout.deliveryTypePrompt}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('pickup')}
                      className={`p-2.5 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                        deliveryType === 'pickup'
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-xs'
                          : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
                      }`}
                    >
                      {cart_checkout.pickupOptionLabel}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('delivery')}
                      className={`p-2.5 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                        deliveryType === 'delivery'
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-xs'
                          : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
                      }`}
                    >
                      {cart_checkout.deliveryOptionLabel}
                    </button>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-muted)] italic">
                    {deliveryType === 'pickup'
                      ? cart_checkout.freePickupText
                      : cart_checkout.deliveryFeeText}
                  </p>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-3 pt-2 border-t border-[var(--color-border-light)]">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={cart_checkout.nameInputPlaceholder}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  />

                  {deliveryType === 'delivery' && (
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={cart_checkout.addressInputPlaceholder}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:ring-1 focus:ring-[var(--color-primary)]"
                    />
                  )}

                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={cart_checkout.notesInputPlaceholder}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:ring-1 focus:ring-[var(--color-primary)]"
                  />
                </div>

                {/* Coupon Code Applicator */}
                <div className="pt-2 border-t border-[var(--color-border-light)]">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                      <span className="flex items-center gap-1.5">
                        {renderIcon('Check', { size: 14 })}
                        Cupom ativo: {appliedCoupon}
                      </span>
                      <span className="text-xs">
                        -{products.currencySymbol} {discountAmount.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Cupom de desconto..."
                        className="flex-1 px-3 py-2 text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] uppercase"
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 rounded-lg text-xs font-bold bg-[var(--color-surface-muted)] hover:bg-[var(--color-border)] text-[var(--color-text)] cursor-pointer"
                      >
                        Aplicar
                      </button>
                    </form>
                  )}
                  {couponError && (
                    <span className="text-[11px] text-red-500 block mt-1">
                      Cupom inválido. Tente PRIMEIRAFORNADA
                    </span>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer with Totals & WhatsApp CTA */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[var(--color-border-light)] bg-[var(--color-surface-muted)] space-y-3">
              <div className="space-y-1 text-xs text-[var(--color-text-secondary)]">
                <div className="flex justify-between">
                  <span>{cart_checkout.subtotalLabel}</span>
                  <span className="font-semibold text-[var(--color-text)]">
                    {products.currencySymbol} {subtotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Desconto Aplicado</span>
                    <span>-{products.currencySymbol} {discountAmount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-[var(--color-text)] pt-2 border-t border-[var(--color-border-light)]">
                  <span>{cart_checkout.totalLabel}</span>
                  <span className="text-[var(--color-primary)]">
                    {products.currencySymbol} {finalTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98"
              >
                {renderIcon('MessageCircle', { size: 18 })}
                <span>{cart_checkout.submitOrderWhatsappLabel}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
