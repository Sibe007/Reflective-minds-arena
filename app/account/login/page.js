"use client";

import { useState } from "react";

export default function AccountLoginPage() {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      await fetch("/api/account/request-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, hp }),
      });
    } catch (err) {
      // Same message either way — see note below
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <section className="page-hero" style={{ minHeight: "50vh", display: "flex", alignItems: "center" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
          <h1 style={{ fontSize: "1.8rem" }}>Check your email</h1>
          <p>
            If that email has any orders with us, a sign-in link is on its way.
            It can take a few minutes to arrive — please check your spam folder too.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="page-hero" style={{ minHeight: "50vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ maxWidth: 420, margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.8rem" }}>Sign In to Your Account</h1>
        <p style={{ marginBottom: 24 }}>
          Enter the email you used at checkout, and we'll send you a sign-in link — no password needed.
        </p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "13px 14px", border: "1px solid var(--line)", borderRadius: "var(--radius)", fontFamily: "var(--font-ui)", fontSize: ".9rem", background: "var(--parchment)", color: "var(--ink)" }}
          />
          <input
            type="text"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            tabIndex={-1}
            autoComplete="off"
          />
          <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Send Sign-In Link"}
          </button>
        </form>
      </div>
    </section>
  );
}