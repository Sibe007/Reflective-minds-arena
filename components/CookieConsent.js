"use client";

import { useEffect, useState } from "react";

export const CONSENT_KEY = "cookieConsent";
export const CONSENT_EVENT = "cookieConsentChanged";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) setVisible(true);

    function handleReopen() {
      setVisible(true);
    }
    window.addEventListener("openCookiePreferences", handleReopen);
    return () => window.removeEventListener("openCookiePreferences", handleReopen);
  }, []);

  function choose(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {}
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 600,
        background: "var(--green-deep)",
        color: "var(--parchment)",
        padding: "18px 20px",
        boxShadow: "0 -8px 30px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <p style={{ margin: 0, fontSize: ".9rem", opacity: 0.9, flex: "1 1 320px" }}>
          We use cookies for analytics, advertising measurement, and live chat support.
          See our{" "}
          <a href="/privacy-policy" style={{ color: "var(--gold-bright)", textDecoration: "underline" }}>
            Privacy Policy
          </a>{" "}
          for details.
        </p>
        <div style={{ display: "flex", gap: 10, flex: "0 0 auto" }}>
          <button
            onClick={() => choose("declined")}
            style={{
              padding: "9px 16px",
              background: "transparent",
              border: "1px solid rgba(245,237,225,0.4)",
              color: "var(--parchment)",
              borderRadius: 2,
              cursor: "pointer",
              fontFamily: "var(--font-ui)",
              fontSize: ".85rem",
            }}
          >
            Decline
          </button>
          <button
            onClick={() => choose("accepted")}
            className="btn btn-primary"
            style={{ padding: "9px 18px", fontSize: ".85rem" }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export function getStoredConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch (e) {
    return null;
  }
}