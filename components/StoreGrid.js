"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";

function ProductCard({ book, addItem }) {
  const hasPaperback = typeof book.paperbackPrice === "number" && book.paperbackPrice > 0;
  const [format, setFormat] = useState("ebook");
  const activePrice = hasPaperback && format === "paperback" ? book.paperbackPrice : book.price;

  return (
    <div className="product-card">
      <Link href={`/books/${book.slug}`}>
        <div className="product-thumb">
          <span className="product-format">{hasPaperback ? (format === "paperback" ? "Paperback" : "eBook") : "eBook"}</span>
          <div className="t">{book.title}</div>
        </div>
      </Link>
      <h3>{book.title}</h3>
      <div className="product-price">
        {book.oldPrice && <del>${book.oldPrice.toFixed(2)}</del>} ${activePrice.toFixed(2)}
      </div>
      {hasPaperback && (
        <select
          className="format-select-sm"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          aria-label={`Choose format for ${book.title}`}
        >
          <option value="ebook">eBook — ${book.price.toFixed(2)}</option>
          <option value="paperback">Paperback — ${book.paperbackPrice.toFixed(2)}</option>
        </select>
      )}
      <button
        className="btn btn-dark btn-sm btn-block"
        onClick={() =>
          addItem({ slug: book.slug, title: book.title, price: activePrice, format })
        }
      >
        Add to cart
      </button>
    </div>
  );
}

export default function StoreGrid({ books }) {
  const { addItem } = useCart();

  if (!books || books.length === 0) {
    return (
      <div className="empty-state">
        No products published yet. Add a book in the{" "}
        <Link href="/studio">Content Studio</Link>.
      </div>
    );
  }

  return (
    <div className="grid-4">
      {books.map((b) => (
        <ProductCard key={b._id} book={b} addItem={addItem} />
      ))}
    </div>
  );
}