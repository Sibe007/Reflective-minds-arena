import Link from "next/link";

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
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Solomon B. Ibe. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
