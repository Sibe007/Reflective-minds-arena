"use client";

export default function CookiePreferencesLink() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("openCookiePreferences"))}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        color: "inherit",
        font: "inherit",
        cursor: "pointer",
        textDecoration: "none",
      }}
    >
      Cookie Preferences
    </button>
  );
}