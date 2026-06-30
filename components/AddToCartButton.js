"use client";

import { useCart } from "./CartProvider";

export default function AddToCartButton({ book }) {
  const { addItem } = useCart();

  return (
    <button
      className="btn btn-primary btn-block"
      onClick={() =>
        addItem({ slug: book.slug, title: book.title, price: book.price })
      }
    >
      Add to Cart — ${book.price.toFixed(2)}
    </button>
  );
}
