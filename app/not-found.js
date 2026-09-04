import Link from "next/link";

export const metadata = {
  title: "Page Not Found — Solomon B. Ibe",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>404</span>
        <h1 style={{ marginTop: 18 }}>This page has wandered off.</h1>
        <p style={{ margin: "0 auto 40px" }}>
          The page you're looking for doesn't exist, may have been moved, or the link
          might be outdated. Let's get you back on track.
        </p>
        <div className="hero-ctas" style={{ justifyContent: "center" }}>
          <Link href="/">
            <button className="btn btn-primary">Back to Home</button>
          </Link>
          <Link href="/books">
            <button className="btn btn-outline" style={{ color: "var(--parchment)" }}>
              Browse Books
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