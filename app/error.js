"use client";

import Link from "next/link";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function Error({ error, reset }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <section className="page-hero" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>Error</span>
        <h1 style={{ marginTop: 18 }}>Something went wrong.</h1>
        <p style={{ margin: "0 auto 40px" }}>
          We hit an unexpected snag loading this page. It's been logged, and trying again
          usually clears it up.
        </p>
        <div className="hero-ctas" style={{ justifyContent: "center" }}>
          <button className="btn btn-primary" onClick={() => reset()}>
            Try Again
          </button>
          <Link href="/">
            <button className="btn btn-outline" style={{ color: "var(--parchment)" }}>
              Back to Home
            </button>
          </Link>
          <Link href="/contact">
            <button className="btn btn-ghost" style={{ color: "var(--gold-bright)" }}>
              Contact Us →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}