"use client";

import { useCart } from "../../components/CartProvider";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong starting checkout.");
      }
    } catch (e) {
      setError("Could not reach checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <h1>Your cart is empty</h1>
          <p style={{ opacity: 0.7 }}>Add a few books before checking out.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ paddingTop: 60 }}>
      <div className="container">
        <div className="breadcrumb">Home / Checkout</div>
        <h1>Checkout</h1>
        <div className="order-summary" style={{ maxWidth: 480, marginTop: 30 }}>
          <h3>Order Summary</h3>
          {items.map((i) => (
            <div className="summary-line" key={i.slug}>
              <span>
                {i.title} {i.qty > 1 ? `× ${i.qty}` : ""}
              </span>
              <span>${(i.price * i.qty).toFixed(2)}</span>
            </div>
          ))}
          <div
            className="summary-line"
            style={{ borderBottom: "none", fontWeight: 700, fontSize: "1.05rem", paddingTop: 18 }}
          >
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          {error && (
            <p style={{ color: "var(--uli-red)", fontSize: ".85rem", marginTop: 10 }}>
              {error}
            </p>
          )}
          <button
            className="btn btn-primary btn-block"
            style={{ marginTop: 20 }}
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? "Redirecting to secure payment…" : "Pay with Stripe"}
          </button>
          <p style={{ fontFamily: "var(--font-ui)", fontSize: ".74rem", opacity: 0.5, marginTop: 14 }}>
            You'll be redirected to Stripe's secure checkout to complete payment.
          </p>
        </div>
      </div>
    </section>
  );
}
