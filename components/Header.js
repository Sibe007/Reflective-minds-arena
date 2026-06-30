"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import CartDrawer from "./CartDrawer";

const NAV = [
  ["/", "Home"],
  ["/about", "About"],
  ["/books", "Books"],
  ["/blog", "Blog"],
  ["/store", "Store"],
  ["/contact", "Contact"],
];

export default function Header() {
  const { count } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="container">
          <Link href="/" className="logo">
            Solomon B. Ibe
            <span>Author &amp; Publisher</span>
          </Link>
          <ul className="nav-links">
            {NAV.map(([href, label]) => (
              <li key={href}>
                <Link href={href}>
                  <button type="button">{label}</button>
                </Link>
              </li>
            ))}
          </ul>
          <div className="header-actions">
            <button
              className="icon-btn"
              aria-label="Cart"
              onClick={() => setCartOpen(true)}
            >
              🛍️
              {count > 0 && <span className="cart-count">{count}</span>}
            </button>
            <button
              className="icon-btn mobile-toggle"
              aria-label="Menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        {NAV.map(([href, label]) => (
          <Link key={href} href={href} onClick={() => setMobileOpen(false)}>
            <button type="button">{label}</button>
          </Link>
        ))}
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
