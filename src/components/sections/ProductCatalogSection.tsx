import React, { useState, useMemo } from 'react';
import { database } from '../../data/database';
import { useBakery } from '../../context/BakeryContext';
import { useCart } from '../../context/CartContext';
import { MediaImage } from '../common/MediaImage';
import { renderIcon } from '../../utils/iconResolver';
import { ProductItem } from '../../types/database.types';

export const ProductCatalogSection: React.FC = () => {
  const { currentBakery } = useBakery();
  const { products } = currentBakery;
  const { product_categories } = database;
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [expandedDetailsId, setExpandedDetailsId] = useState<string | null>(null);

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return products.items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'todos' || item.categoryId === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [products.items, selectedCategory, searchQuery]);

  const handleAddToCart = (product: ProductItem) => {
    addToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1200);
  };

  const toggleDetails = (id: string) => {
    setExpandedDetailsId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="cardapio" className="py-16 sm:py-24 bg-[var(--color-bg)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] mb-3">
            {renderIcon('Wheat', { size: 14 })}
            <span>{products.badge}</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text)] tracking-tight">
            {products.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[var(--color-text-secondary)]">
            {products.subtitle}
          </p>
        </div>

        {/* Search Bar & Category Tabs */}
        <div className="space-y-6 mb-12">
          {/* Live Search Input */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--color-text-muted)]">
              {renderIcon('Search', { size: 18 })}
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar pão, croissant, doce, ingrediente..."
              className="w-full pl-10 pr-4 py-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all shadow-xs text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                {renderIcon('X', { size: 16 })}
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {product_categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--color-primary)] text-white shadow-md'
                      : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                  }`}
                >
                  {renderIcon(cat.icon, { size: 16 })}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[var(--color-border)] rounded-2xl bg-[var(--color-surface)]">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-surface-muted)] flex items-center justify-center text-[var(--color-text-muted)]">
              {renderIcon('Wheat', { size: 32 })}
            </div>
            <h3 className="font-heading font-bold text-xl text-[var(--color-text)] mb-2">
              Nenhum item encontrado
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Tente pesquisar por outro termo ou selecione a categoria "Todos os Produtos".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-colors"
            >
              Ver Cardápio Completo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const isAdded = addedProductId === product.id;
              const isDetailsOpen = expandedDetailsId === product.id;

              return (
                <div
                  key={product.id}
                  className="rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Product Image Container */}
                  <div className="relative aspect-4/3 overflow-hidden bg-[var(--color-surface-muted)]">
                    <MediaImage
                      src={product.image}
                      alt={product.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Tags on Image */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      {product.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Fermentation Time Badge */}
                    {product.fermentationTime && (
                      <div className="absolute bottom-3 right-3 bg-[var(--color-surface)]/90 backdrop-blur-xs text-[var(--color-text)] border border-[var(--color-border)] text-[11px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-xs">
                        {renderIcon('Hourglass', { size: 12, className: 'text-[var(--color-primary)]' })}
                        <span>{product.fermentationTime}</span>
                      </div>
                    )}
                  </div>

                  {/* Product Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Name & Weight */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-heading font-bold text-xl text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                          {product.name}
                        </h3>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] shrink-0">
                          {product.weight}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
                        {product.description}
                      </p>
                    </div>

                    {/* Technical details toggle (Allergens, fermentation) */}
                    <div>
                      <button
                        onClick={() => toggleDetails(product.id)}
                        className="text-xs font-medium text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>{products.detailsLabel}</span>
                        {isDetailsOpen
                          ? renderIcon('ChevronUp', { size: 14 })
                          : renderIcon('ChevronDown', { size: 14 })}
                      </button>

                      {isDetailsOpen && (
                        <div className="mt-2.5 p-3 rounded-lg bg-[var(--color-surface-muted)] text-[11px] space-y-1.5 border border-[var(--color-border-light)] animate-fadeIn">
                          {product.fermentationTime && (
                            <p className="text-[var(--color-text)]">
                              <strong>{products.fermentationLabel}</strong> {product.fermentationTime}
                            </p>
                          )}
                          <p className="text-[var(--color-text-muted)]">
                            <strong>{products.allergensLabel}</strong>{' '}
                            {product.allergens.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Price and CTA Button */}
                    <div className="pt-3 border-t border-[var(--color-border-light)] flex items-center justify-between gap-3">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-semibold text-[var(--color-primary)]">
                            {products.currencySymbol}
                          </span>
                          <span className="font-heading font-extrabold text-2xl text-[var(--color-text)]">
                            {product.price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                        {product.originalPrice && (
                          <span className="text-xs text-[var(--color-text-muted)] line-through">
                            {products.currencySymbol} {product.originalPrice.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                      </div>

                      {/* Add to order button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white'
                        }`}
                      >
                        {isAdded ? renderIcon('Check', { size: 16 }) : renderIcon('ShoppingBag', { size: 16 })}
                        <span>{isAdded ? products.addedLabel : products.addToOrderLabel}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
