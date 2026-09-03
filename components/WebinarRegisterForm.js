"use client";

import { useState } from "react";

export default function WebinarRegisterForm({ slug }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/webinar-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, slug }),
      });
      const data = await res.json();
      if (data.registered) {
        setStatus("done");
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("idle");
      }
    } catch (err) {
      setError("Could not reach the server. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <p style={{ color: "var(--gold)", fontWeight: 600, fontFamily: "var(--font-ui)", fontSize: ".9rem" }}>
        You're registered! Check your email for the join link.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {error && (
        <p style={{ color: "var(--uli-red)", fontSize: ".82rem", margin: 0 }}>{error}</p>
      )}
      <button className="btn btn-dark btn-sm btn-block" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Registering…" : "Register — Free"}
      </button>
    </form>
  );
}
