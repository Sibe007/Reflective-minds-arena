"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCartButton({ book }) {
  const { addItem } = useCart();
  const hasPaperback = typeof book.paperbackPrice === "number" && book.paperbackPrice > 0;
  const [format, setFormat] = useState("ebook");

  const activePrice = hasPaperback && format === "paperback" ? book.paperbackPrice : book.price;

  function handleClick() {
    addItem({ slug: book.slug, title: book.title, price: activePrice, format });

    if (typeof window !== "undefined") {
      window.fbq && window.fbq("track", "AddToCart", {
        content_name: book.title,
        content_type: "product",
        currency: "USD",
        value: activePrice,
      });
      window.gtag && window.gtag("event", "add_to_cart", {
        currency: "USD",
        value: activePrice,
        items: [{ item_name: book.title, price: activePrice }],
      });
    }
  }

  return (
    <div>
      {hasPaperback && (
        <div className="format-select" role="radiogroup" aria-label="Choose format">
          <label>
            <input
              type="radio"
              name={`format-${book.slug}`}
              value="ebook"
              checked={format === "ebook"}
              onChange={() => setFormat("ebook")}
            />
            eBook — ${book.price.toFixed(2)}
          </label>
          <label>
            <input
              type="radio"
              name={`format-${book.slug}`}
              value="paperback"
              checked={format === "paperback"}
              onChange={() => setFormat("paperback")}
            />
            Paperback — ${book.paperbackPrice.toFixed(2)}
          </label>
        </div>
      )}
      <button className="btn btn-primary btn-block" onClick={handleClick}>
        Add to Cart — ${activePrice.toFixed(2)}
      </button>
    </div>
  );
}