"use client";

import { useEffect, useState } from "react";

export default function NewsletterForm({ source = "footer", onSuccess }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [website, setWebsite] = useState("");
  const widgetId = `turnstile-newsletter-${source}`;
  const callbackName = `onNewsletterTurnstileSuccess_${source}`;

  useEffect(() => {
    window[callbackName] = (token) => setTurnstileToken(token);
    return () => {
      delete window[callbackName];
    };
  }, [callbackName]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (website) {
      setStatus("error");
      setError("Something went wrong.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, website, turnstileToken }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setStatus("error");
        if (window.turnstile) window.turnstile.reset();
        setTurnstileToken("");
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
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
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
          disabled={status === "sending" || !turnstileToken}
          className="btn btn-primary"
          style={{ flex: "0 0 auto" }}
        >
          {status === "sending" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }} aria-hidden="true">
        <label htmlFor={`website-${source}`}>Leave this field empty</label>
        <input
          type="text"
          id={`website-${source}`}
          tabIndex="-1"
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div
        id={widgetId}
        className="cf-turnstile"
        data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        data-callback={callbackName}
        style={{ margin: "10px 0" }}
      ></div>
      {error && <p style={{ color: "#e08a8a", fontSize: ".85rem", width: "100%", margin: "8px 0 0" }}>{error}</p>}
    </form>
  );
}