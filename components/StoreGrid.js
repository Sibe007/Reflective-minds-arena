"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

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
        <div className="product-card" key={b._id}>
          <Link href={`/books/${b.slug}`}>
            <div className="product-thumb">
              <span className="product-format">eBook</span>
              <div className="t">{b.title}</div>
            </div>
          </Link>
          <h3>{b.title}</h3>
          <div className="product-price">
            {b.oldPrice && <del>${b.oldPrice.toFixed(2)}</del>} ${b.price.toFixed(2)}
          </div>
          <button
            className="btn btn-dark btn-sm btn-block"
            onClick={() =>
              addItem({ slug: b.slug, title: b.title, price: b.price })
            }
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}
