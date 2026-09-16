"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "rma_cart";

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load saved cart on first mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Could not load saved cart:", err);
    }
    setHydrated(true);
  }, []);

  // Save cart on every change, but only after the initial load completes —
  // otherwise this would overwrite a saved cart with an empty one on first render
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("Could not save cart:", err);
    }
  }, [items, hydrated]);

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