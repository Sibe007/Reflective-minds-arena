"use client";

import { useState } from "react";

export default function BuySibtechButton({ slug, price, className = "btn btn-primary btn-block" }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);

    if (typeof window !== "undefined") {
      window.fbq && window.fbq("track", "InitiateCheckout", { currency: "NGN", value: price });
      window.gtag && window.gtag("event", "begin_checkout", { currency: "NGN", value: price });
    }

    try {
      const res = await fetch("/api/sibtech-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch (e) {
      setError("Could not reach checkout. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div>
      <label htmlFor={`sibtech-email-${slug}`} style={{ display: "block", fontFamily: "var(--font-ui)", fontSize: ".82rem", fontWeight: 600, marginBottom: 6 }}>
        Email — your download link will be sent here
      </label>
      <input
        id={`sibtech-email-${slug}`}
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ width: "100%", padding: "13px 14px", marginBottom: 12, border: "1px solid var(--line)", borderRadius: "var(--radius)", fontFamily: "var(--font-ui)", fontSize: ".9rem", background: "var(--parchment)", color: "var(--ink)" }}
      />
      {error && (
        <p style={{ color: "var(--uli-red)", fontSize: ".85rem", marginBottom: 10 }}>{error}</p>
      )}
      <button className={className} onClick={handleClick} disabled={loading}>
        {loading ? "Redirecting to Paystack…" : `Get It Now — ₦${price.toLocaleString()}`}
      </button>
    </div>
  );
}