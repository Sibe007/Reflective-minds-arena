"use client";

import { useEffect, useState } from "react";
import NewsletterForm from "./NewsletterForm";

const DISMISS_KEY = "newsletterPopupDismissedAt";
const DISMISS_DAYS = 14;
const SHOW_DELAY_MS = 1800;

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let dismissedAt = null;
    try {
      dismissedAt = localStorage.getItem(DISMISS_KEY);
    } catch (e) {}

    if (dismissedAt) {
      const daysSince = (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60 * 24);
      if (daysSince < DISMISS_DAYS) return;
    }

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch (e) {}
  }

  function handleSubscribed() {
    setSubscribed(true);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch (e) {}
    setTimeout(() => setVisible(false), 1800);
  }

  if (!visible) return null;

  return (
    <div
      onClick={dismiss}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,13,10,0.6)",
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--green-deep)",
          color: "var(--parchment)",
          maxWidth: 440,
          width: "100%",
          borderRadius: 2,
          padding: "36px 32px",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        }}
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 14,
            right: 16,
            background: "none",
            border: "none",
            color: "var(--parchment)",
            opacity: 0.6,
            fontSize: "1.3rem",
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {subscribed ? (
          <p style={{ color: "var(--gold-bright)", fontSize: "1.05rem", margin: 0 }}>
            ✓ You're subscribed — thank you!
          </p>
        ) : (
          <>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: ".75rem", letterSpacing: ".1em", textTransform: "uppercase", opacity: 0.7 }}>
              Stay Updated
            </span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "1.5rem", margin: "10px 0 8px" }}>
              Get notified about new books and posts
            </h3>
            <p style={{ opacity: 0.75, fontSize: ".95rem", marginBottom: 20 }}>
              No spam — just an email when something new is published.
            </p>
            <NewsletterForm source="popup" onSuccess={handleSubscribed} />
          </>
        )}
      </div>
    </div>
  );
}