"use client";

import { useState } from "react";

export default function WebinarPayButton({ webinar }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const priceLabel = "₦" + Number(webinar.price).toLocaleString("en-US");

  async function handlePay() {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    if (typeof window !== "undefined") {
      window.fbq &&
        window.fbq("track", "InitiateCheckout", {
          currency: "NGN",
          value: webinar.price,
          num_items: 1,
        });
      window.gtag &&
        window.gtag("event", "begin_checkout", {
          currency: "NGN",
          value: webinar.price,
          items: [{ item_name: webinar.title, price: webinar.price, quantity: 1 }],
        });
      try {
        sessionStorage.setItem(
          "pendingOrder",
          JSON.stringify({
            items: [
              {
                slug: webinar.slug,
                title: webinar.title,
                price: webinar.price,
                qty: 1,
                format: "webinar",
              },
            ],
            total: webinar.price,
            currency: "NGN",
          })
        );
      } catch (e) {}
    }

    try {
      const res = await fetch("/api/webinar-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: webinar.slug, email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error || "Something went wrong. Please try again.");
    } catch (e) {
      setError("Could not reach checkout. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div>
      <label
        style={{ display: "block", fontSize: ".85rem", marginBottom: 6, opacity: 0.8 }}
      >
        Your email — the joining link will be sent here
      </label>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: 12 }}
      />

      {error && (
        <p style={{ color: "var(--uli-red)", fontSize: ".85rem", marginBottom: 10 }}>
          {error}
        </p>
      )}

      <button
        className="btn btn-dark btn-sm btn-block"
        onClick={handlePay}
        disabled={loading}
      >
        {loading ? "Redirecting to Paystack…" : `Register — ${priceLabel}`}
      </button>
    </div>
  );
}