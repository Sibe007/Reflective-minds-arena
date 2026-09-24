"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function BuyEbookButton({ book, className = "btn btn-primary" }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem({ slug: book.slug, title: book.title, price: book.price, format: "ebook" });

    if (typeof window !== "undefined") {
      window.fbq && window.fbq("track", "AddToCart", {
        content_name: book.title,
        content_type: "product",
        currency: "USD",
        value: book.price,
      });
      window.gtag && window.gtag("event", "add_to_cart", {
        currency: "USD",
        value: book.price,
        items: [{ item_name: book.title, price: book.price }],
      });
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button className={className} onClick={handleClick}>
      {added ? "Added ✓" : "Add to Cart"}
    </button>
  );
}
