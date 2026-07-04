"use client";

import { useCart } from "../../components/CartProvider";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  async function handleCheckout() {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
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
        <div className="checkout-grid">
          <div>
            <span className="eyebrow">Your Details</span>
            <div className="form-row full" style={{ marginTop: 16 }}>
              <div>
                <label>Email address — your receipt and download links will be sent here</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <span className="eyebrow" style={{ marginTop: 28, display: "inline-flex" }}>
              Payment
            </span>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: ".88rem", opacity: 0.7, marginTop: 10 }}>
              You'll be redirected to Paystack's secure payment page to complete your purchase.
              Accepts Nigerian cards, bank transfer, and USSD.
            </p>

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
              {loading ? "Redirecting to Paystack…" : `Pay ${fmt(total)}`}
            </button>

            <p style={{ fontFamily: "var(--font-ui)", fontSize: ".74rem", opacity: 0.5, marginTop: 14 }}>
              Secured by Paystack. Your payment details are never stored on this site.
            </p>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            {items.map((i) => (
              <div className="summary-line" key={i.slug}>
                <span>{i.title} {i.qty > 1 ? `× ${i.qty}` : ""}</span>
                <span>{fmt(i.price * i.qty)}</span>
              </div>
            ))}
            <div
              className="summary-line"
              style={{ borderBottom: "none", fontWeight: 700, fontSize: "1.05rem", paddingTop: 18 }}
            >
              <span>Total</span>
              <span>{fmt(total)}</span>
            </div>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: ".78rem", opacity: 0.6, marginTop: 14 }}>
              Prices shown in USD. Payment processed in NGN at current exchange rate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function fmt(n) {
  return "$" + n.toFixed(2);
}