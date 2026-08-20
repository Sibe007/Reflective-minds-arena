import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo" style={{ color: "var(--parchment)", marginBottom: 14 }}>
              Solomon B. Ibe
              <span>Author &amp; Publisher</span>
            </div>
            <p>Exploring humanity, culture, resilience, belief, and the power of storytelling.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/books">Books</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/store">Store</Link></li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/studio">Content Studio (Admin)</Link></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/refund-policy">Refund Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4>Stay Updated</h4>
            <p style={{ marginBottom: 12 }}>Get notified about new books and posts.</p>
            <NewsletterForm source="footer" />
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Solomon B. Ibe. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}