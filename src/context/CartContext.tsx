import React, { createContext, useContext, useState } from 'react';
import { ProductItem } from '../types/database.types';

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: ProductItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  discountAmount: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const addToCart = (product: ProductItem) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'PRIMEIRAFORNADA' || clean === 'VIP-FORNADA-20') {
      setAppliedCoupon(clean);
      return true;
    }
    return false;
  };

  const discountRate = appliedCoupon === 'VIP-FORNADA-20' ? 0.2 : appliedCoupon === 'PRIMEIRAFORNADA' ? 0.15 : 0;
  const discountAmount = subtotal * discountRate;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        applyCoupon,
        discountAmount,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
