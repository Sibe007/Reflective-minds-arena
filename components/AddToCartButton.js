"use client";

import { useCart } from "./CartProvider";

export default function AddToCartButton({ book }) {
  const { addItem } = useCart();

  function handleClick() {
    addItem({ slug: book.slug, title: book.title, price: book.price });

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
  }

  return (
    <button className="btn btn-primary btn-block" onClick={handleClick}>
      Add to Cart — ${book.price.toFixed(2)}
    </button>
  );
}