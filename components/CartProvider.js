"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{slug, title, price, qty}]

  function addItem(book) {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === book.slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === book.slug ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...book, qty: 1 }];
    });
  }

  function removeItem(slug) {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
