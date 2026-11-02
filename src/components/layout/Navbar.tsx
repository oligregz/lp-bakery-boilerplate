import React, { useState } from 'react';
import { database } from '../../data/database';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { renderIcon } from '../../utils/iconResolver';

interface NavbarProps {
  onOpenThemeDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenThemeDrawer }) => {
  const { navigation, brand_profile } = database;
  const { mode, toggleMode } = useTheme();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--color-bg)]/90 border-b border-[var(--color-border)] transition-colors duration-300">
      {/* Top Announcement Bar */}
      {navigation.announcement.enabled && (
        <aside
          aria-label={navigation.announcement.badge}
          className="w-full bg-[var(--color-primary)] text-white text-xs sm:text-sm py-2 px-4 transition-colors"
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-wider px-2 py-0.5 rounded-full text-[10px] uppercase bg-black/20 text-white">
                {navigation.announcement.badge}
              </span>
              <p className="font-medium truncate max-w-xs sm:max-w-md md:max-w-none">
                {navigation.announcement.text}
              </p>
            </div>
            <a
              href={navigation.announcement.linkHref}
              className="text-white underline hover:opacity-80 font-semibold text-xs whitespace-nowrap transition-opacity"
            >
              {navigation.announcement.linkText}
            </a>
          </div>
        </aside>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <span className="text-3xl transition-transform group-hover:scale-110 duration-200">
              {brand_profile.logo.symbol}
            </span>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-2xl tracking-tight text-[var(--color-text)]">
                {brand_profile.logo.text}
              </span>
              <span className="text-[11px] font-medium tracking-widest uppercase text-[var(--color-primary)]">
                {brand_profile.logo.badgeText}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigation.links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1.5"
              >
                {link.label}
                {link.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--color-badge-bg)] text-[var(--color-badge-text)]">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* White-Label Theme Customizer Drawer Trigger */}
            <button
              onClick={onOpenThemeDrawer}
              title="Personalizar Tema (White-Label)"
              className="p-2.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] bg-[var(--color-surface)] transition-all cursor-pointer shadow-xs"
              aria-label="Abrir customizador de tema"
            >
              {renderIcon('Palette', { size: 18 })}
            </button>

            {/* Dark/Light Mode Switcher */}
            <button
              onClick={toggleMode}
              title={navigation.themeToggleLabel}
              className="p-2.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] bg-[var(--color-surface)] transition-all cursor-pointer shadow-xs"
              aria-label={navigation.themeToggleLabel}
            >
              {mode === 'dark' ? renderIcon('Sun', { size: 18 }) : renderIcon('Moon', { size: 18 })}
            </button>

            {/* Interactive Cart Button with Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] bg-[var(--color-surface)] transition-all cursor-pointer shadow-xs"
              aria-label={navigation.cartButtonLabel}
            >
              {renderIcon('ShoppingBag', { size: 18 })}
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[var(--color-primary)] text-white text-[11px] font-bold flex items-center justify-center animate-bounce">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* CTA Button */}
            <a
              href={`#${navigation.ctaButton.targetId}`}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-all shadow-md hover:shadow-lg transform active:scale-95 cursor-pointer"
            >
              {renderIcon(navigation.ctaButton.icon, { size: 16 })}
              <span>{navigation.ctaButton.label}</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] hover:text-[var(--color-primary)] bg-[var(--color-surface)] cursor-pointer"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? renderIcon('X', { size: 20 }) : renderIcon('Grid', { size: 20 })}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {navigation.links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--color-badge-bg)] text-[var(--color-badge-text)]">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
          <div className="pt-3">
            <a
              href={`#${navigation.ctaButton.targetId}`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-colors shadow-sm"
            >
              {renderIcon(navigation.ctaButton.icon, { size: 18 })}
              <span>{navigation.ctaButton.label}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
