"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutSuccessPage() {
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    if (tracked) return;
    try {
      const raw = sessionStorage.getItem("pendingOrder");
      if (raw) {
        const order = JSON.parse(raw);
        window.fbq && window.fbq("track", "Purchase", {
          currency: order.currency || "USD",
          value: order.total,
        });
        window.gtag && window.gtag("event", "purchase", {
          currency: order.currency || "USD",
          value: order.total,
          items: (order.items || []).map((i) => ({ item_name: i.title, price: i.price, quantity: i.qty })),
        });
        sessionStorage.removeItem("pendingOrder");
      }
    } catch (e) {}
    setTracked(true);
  }, [tracked]);

  return (
    <section className="section" style={{ paddingTop: 120 }}>
      <div className="container" style={{ textAlign: "center", maxWidth: 560 }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          Order Confirmed
        </span>
        <h1 style={{ margin: "18px 0" }}>Thank you — your order is complete.</h1>
        <p style={{ opacity: 0.75 }}>
          A confirmation email with your receipt is on its way from Paystack. Download
          delivery emails are a feature we'll add next — for now, reach out and you'll
          be sent your files directly.
        </p>
        <Link href="/store">
          <button className="btn btn-primary" style={{ marginTop: 20 }}>
            Continue Shopping
          </button>
        </Link>
      </div>
    </section>
  );
}