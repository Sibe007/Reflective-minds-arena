"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{slug, title, price, qty, format}]

  function addItem(book) {
    const format = book.format || "ebook";
    const lineKey = `${book.slug}-${format}`;

    setItems((prev) => {
      const existing = prev.find((i) => `${i.slug}-${i.format}` === lineKey);
      if (existing) {
        return prev.map((i) =>
          `${i.slug}-${i.format}` === lineKey ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...book, format, qty: 1 }];
    });
  }

  function removeItem(slug, format = "ebook") {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.format === format)));
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const hasPhysicalItems = items.some((i) => i.format === "paperback");

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, total, count, hasPhysicalItems }}
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