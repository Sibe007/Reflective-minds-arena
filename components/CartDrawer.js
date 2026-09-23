"use client";

import { useCart } from "./CartProvider";
import Link from "next/link";
import { useEffect, useRef } from "react";

function fmt(n) {
  return "$" + n.toFixed(2);
}

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, total } = useCart();
  const closeBtnRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement;
    closeBtnRef.current?.focus();

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <>
      <div
        className={`cart-overlay ${open ? "open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`cart-drawer ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <div className="cart-head">
          <h3 id="cart-drawer-title" style={{ margin: 0, fontSize: "1.2rem" }}>Your Cart</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close cart" ref={closeBtnRef}>
            ✕
          </button>
        </div>
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-state">
              Your cart is empty.
              <br />
              <br />
              <Link href="/store" onClick={onClose}>
                <button className="btn btn-primary btn-sm">
                  Browse the store
                </button>
              </Link>
            </div>
          ) : (
            items.map((i) => (
              <div className="cart-item" key={`${i.slug}-${i.format}`}>
                <div className="thumb" />
                <div className="cart-item-info">
                  <h5>{i.title}</h5>
                  <div style={{ fontSize: ".75rem", opacity: 0.6, textTransform: "capitalize" }}>
                    {i.format === "paperback" ? "Paperback" : "eBook"}
                  </div>
                  <div className="cart-item-price">
                    {fmt(i.price)} {i.qty > 1 ? `× ${i.qty}` : ""}
                  </div>
                  <button
                    className="cart-remove"
                    onClick={() => removeItem(i.slug, i.format)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="cart-foot">
            <div className="cart-total-row">
              <span>Total</span>
              <span>{fmt(total)}</span>
            </div>
            <Link href="/checkout" onClick={onClose}>
              <button className="btn btn-primary btn-block">Checkout</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}