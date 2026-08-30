"use client";

import { useCart } from "../../components/CartProvider";
import { useState, useEffect } from "react";
import { getShippingSettings } from "../../sanity/queries";

export default function CheckoutPage() {
  const { items, total, hasPhysicalItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const [shippingSettings, setShippingSettings] = useState(null);
  const [shippingCountryType, setShippingCountryType] = useState("Nigeria");
  const [shippingName, setShippingName] = useState("");
  const [shippingAddress1, setShippingAddress1] = useState("");
  const [shippingAddress2, setShippingAddress2] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingPostalCode, setShippingPostalCode] = useState("");
  const [shippingCountryName, setShippingCountryName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");

  useEffect(() => {
    if (hasPhysicalItems) {
      getShippingSettings()
        .then(setShippingSettings)
        .catch(() => setShippingSettings(null));
    }
  }, [hasPhysicalItems]);

  function shippingFeeLabel() {
    if (!shippingSettings) return "Calculating…";
    if (shippingCountryType === "Nigeria") {
      return `₦${shippingSettings.nigeriaFeeNaira?.toLocaleString() ?? "—"}`;
    }
    return `$${shippingSettings.internationalFeeUsd?.toFixed(2) ?? "—"}`;
  }

  async function handleCheckout() {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (hasPhysicalItems) {
      const required = [shippingName, shippingAddress1, shippingCity, shippingState, shippingPostalCode, shippingPhone];
      if (shippingCountryType === "International") required.push(shippingCountryName);
      if (required.some((v) => !v || !v.trim())) {
        setError("Please fill in your full shipping address — it's required for the paperback in your cart.");
        return;
      }
    }

    setLoading(true);
    setError("");

    if (typeof window !== "undefined") {
      window.fbq && window.fbq("track", "InitiateCheckout", {
        currency: "USD",
        value: total,
        num_items: items.reduce((n, i) => n + i.qty, 0),
      });
      window.gtag && window.gtag("event", "begin_checkout", {
        currency: "USD",
        value: total,
        items: items.map((i) => ({ item_name: i.title, price: i.price, quantity: i.qty })),
      });
      try {
        sessionStorage.setItem(
          "pendingOrder",
          JSON.stringify({ items, total, currency: "USD" })
        );
      } catch (e) {}
    }

    const shippingAddress = hasPhysicalItems
      ? {
          countryType: shippingCountryType,
          name: shippingName,
          address1: shippingAddress1,
          address2: shippingAddress2,
          city: shippingCity,
          state: shippingState,
          postalCode: shippingPostalCode,
          country: shippingCountryType === "Nigeria" ? "Nigeria" : shippingCountryName,
          phone: shippingPhone,
        }
      : null;

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, email, shippingAddress }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (e) {
      setError("Could not reach checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <h1>Your cart is empty</h1>
          <p style={{ opacity: 0.7 }}>Add a few books before checking out.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ paddingTop: 60 }}>
      <div className="container">
        <div className="breadcrumb">Home / Checkout</div>
        <h1>Checkout</h1>
        <div className="checkout-grid">
          <div>
            <span className="eyebrow">Your Details</span>
            <div className="form-row full" style={{ marginTop: 16 }}>
              <div>
                <label>Email address — your receipt and download links will be sent here</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {hasPhysicalItems && (
              <>
                <span className="eyebrow" style={{ marginTop: 28, display: "inline-flex" }}>
                  Shipping Address
                </span>
                <p style={{ fontFamily: "var(--font-ui)", fontSize: ".85rem", opacity: 0.7, marginTop: 8 }}>
                  Your cart includes a paperback — we need an address to ship it to.
                </p>

                <div className="form-row full" style={{ marginTop: 14 }}>
                  <div>
                    <label>Shipping to</label>
                    <div style={{ display: "flex", gap: 20, marginTop: 6 }}>
                      <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 400 }}>
                        <input
                          type="radio"
                          name="shippingCountryType"
                          value="Nigeria"
                          checked={shippingCountryType === "Nigeria"}
                          onChange={() => setShippingCountryType("Nigeria")}
                        />
                        Nigeria
                      </label>
                      <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 400 }}>
                        <input
                          type="radio"
                          name="shippingCountryType"
                          value="International"
                          checked={shippingCountryType === "International"}
                          onChange={() => setShippingCountryType("International")}
                        />
                        International
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-row full" style={{ marginTop: 14 }}>
                  <div>
                    <label>Full name</label>
                    <input type="text" value={shippingName} onChange={(e) => setShippingName(e.target.value)} required />
                  </div>
                </div>

                <div className="form-row full" style={{ marginTop: 14 }}>
                  <div>
                    <label>Address line 1</label>
                    <input type="text" value={shippingAddress1} onChange={(e) => setShippingAddress1(e.target.value)} required />
                  </div>
                </div>

                <div className="form-row full" style={{ marginTop: 14 }}>
                  <div>
                    <label>Address line 2 (optional)</label>
                    <input type="text" value={shippingAddress2} onChange={(e) => setShippingAddress2(e.target.value)} />
                  </div>
                </div>

                <div className="form-row" style={{ marginTop: 14, display: "flex", gap: 14 }}>
                  <div style={{ flex: 1 }}>
                    <label>City</label>
                    <input type="text" value={shippingCity} onChange={(e) => setShippingCity(e.target.value)} required />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label>State / Region</label>
                    <input type="text" value={shippingState} onChange={(e) => setShippingState(e.target.value)} required />
                  </div>
                </div>

                <div className="form-row" style={{ marginTop: 14, display: "flex", gap: 14 }}>
                  <div style={{ flex: 1 }}>
                    <label>Postal code</label>
                    <input type="text" value={shippingPostalCode} onChange={(e) => setShippingPostalCode(e.target.value)} required />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label>Phone number</label>
                    <input type="tel" value={shippingPhone} onChange={(e) => setShippingPhone(e.target.value)} required />
                  </div>
                </div>

                {shippingCountryType === "International" && (
                  <div className="form-row full" style={{ marginTop: 14 }}>
                    <div>
                      <label>Country</label>
                      <input type="text" value={shippingCountryName} onChange={(e) => setShippingCountryName(e.target.value)} required />
                    </div>
                  </div>
                )}
              </>
            )}

            <span className="eyebrow" style={{ marginTop: 28, display: "inline-flex" }}>
              Payment
            </span>
            <p style={{ fontFamily: "var(--font-ui)", fontSize: ".88rem", opacity: 0.7, marginTop: 10 }}>
              You'll be redirected to Paystack's secure payment page to complete your purchase.
              Accepts Nigerian cards, bank transfer, and USSD.
            </p>

            {error && (
              <p style={{ color: "var(--uli-red)", fontSize: ".85rem", marginTop: 10 }}>
                {error}
              </p>
            )}

            <button
              className="btn btn-primary btn-block"
              style={{ marginTop: 20 }}
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading
                ? "Redirecting to Paystack…"
                : hasPhysicalItems
                ? "Continue to Paystack"
                : `Pay ${fmt(total)}`}
            </button>

            <p style={{ fontFamily: "var(--font-ui)", fontSize: ".74rem", opacity: 0.5, marginTop: 14 }}>
              Secured by Paystack. Your payment details are never stored on this site.
            </p>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            {items.map((i) => (
              <div className="summary-line" key={`${i.slug}-${i.format}`}>
                <span>
                  {i.title}
                  {i.format === "paperback" ? " (Paperback)" : ""}
                  {i.qty > 1 ? ` × ${i.qty}` : ""}
                </span>
                <span>{fmt(i.price * i.qty)}</span>
              </div>
            ))}
            <div
              className="summary-line"
              style={{ fontWeight: 700, fontSize: "1.05rem", paddingTop: 18 }}
            >
              <span>Books Subtotal</span>
              <span>{fmt(total)}</span>
            </div>
            {hasPhysicalItems && (
              <div className="summary-line" style={{ borderBottom: "none" }}>
                <span>Shipping ({shippingCountryType})</span>
                <span>{shippingFeeLabel()}</span>
              </div>
            )}
            <p style={{ fontFamily: "var(--font-ui)", fontSize: ".78rem", opacity: 0.6, marginTop: 14 }}>
              Book prices shown in USD.{" "}
              {hasPhysicalItems
                ? "Shipping is charged in the currency shown above. "
                : ""}
              Payment is processed in NGN — the exact amount charged will be shown on the Paystack payment page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function fmt(n) {
  return "$" + n.toFixed(2);
}