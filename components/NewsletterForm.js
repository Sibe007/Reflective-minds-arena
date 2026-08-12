"use client";

import { useState } from "react";

export default function NewsletterForm({ source = "footer", onSuccess }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      if (typeof window !== "undefined") {
        window.fbq && window.fbq("track", "Subscribe");
        window.gtag && window.gtag("event", "sign_up", { method: "newsletter" });
      }

      setStatus("done");
      onSuccess && onSuccess();
    } catch (err) {
      setError("Could not subscribe. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p style={{ color: "var(--gold-bright)", fontSize: ".92rem" }}>✓ You're subscribed — thank you!</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <input
        type="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          flex: "1 1 180px",
          padding: "10px 12px",
          borderRadius: 2,
          border: "1px solid rgba(245,237,225,0.25)",
          background: "rgba(245,237,225,0.06)",
          color: "var(--parchment)",
          fontFamily: "var(--font-ui)",
          fontSize: ".9rem",
        }}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary"
        style={{ flex: "0 0 auto" }}
      >
        {status === "sending" ? "Subscribing…" : "Subscribe"}
      </button>
      {error && <p style={{ color: "#e08a8a", fontSize: ".85rem", width: "100%", margin: 0 }}>{error}</p>}
    </form>
  );
}