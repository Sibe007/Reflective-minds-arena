"use client";

import * as Sentry from "@sentry/nextjs";

export default function SentryTestPage() {
  return (
    <div style={{ padding: 60, textAlign: "center" }}>
      <h1>Sentry Test Page</h1>
      <p style={{ marginBottom: 20 }}>Click the button below to send a real test error to Sentry.</p>
      <button
        onClick={() => {
          Sentry.captureException(new Error("Manual test error from Reflective Minds Arena"));
          alert("Test error sent to Sentry!");
        }}
        style={{
          padding: "12px 24px",
          background: "#333",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Send Test Error to Sentry
      </button>
    </div>
  );
}