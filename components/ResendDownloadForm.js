"use client";

import { useState } from "react";

export default function ResendDownloadForm() {
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !reference.trim()) {
      setError("Please enter your email and order reference.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      await fetch("/api/resend-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reference, hp }),
      });
    } catch (err) {
      // Even on a network error, show the same generic message —
      // this form never confirms or denies whether a match exists.
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <p style={{ color: "var(--gold)", fontWeight: 600, fontFamily: "var(--font-ui)", fontSize: ".95rem" }}>
        If we found a matching order, a fresh download link is on its way to your email.
        It can take a few minutes to arrive — please check your spam folder too.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 420 }}>
      <div>
        <label style={{ display: "block", fontFamily: "var(--font-ui)", fontSize: ".82rem", fontWeight: 600, marginBottom: 6 }}>
          Email used at checkout
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "13px 14px", border: "1px solid var(--line)", borderRadius: "var(--radius)", fontFamily: "var(--font-ui)", fontSize: ".9rem", background: "var(--parchment)", color: "var(--ink)" }}
        />
      </div>
      <div>
        <label style={{ display: "block", fontFamily: "var(--font-ui)", fontSize: ".82rem", fontWeight: 600, marginBottom: 6 }}>
          Order / Payment reference
        </label>
        <input
          type="text"
          placeholder="From your confirmation email"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          required
          style={{ width: "100%", padding: "13px 14px", border: "1px solid var(--line)", borderRadius: "var(--radius)", fontFamily: "var(--font-ui)", fontSize: ".9rem", background: "var(--parchment)", color: "var(--ink)" }}
        />
      </div>
      {/* Honeypot — hidden from real users, bots often fill every field they can find */}
      <input
        type="text"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        tabIndex={-1}
        autoComplete="off"
      />
      {error && <p style={{ color: "var(--uli-red)", fontSize: ".82rem", margin: 0 }}>{error}</p>}
      <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Resend My Download Link"}
      </button>
    </form>
  );
}