"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const reference = searchParams.get("reference") || searchParams.get("trxref");

    if (!reference) {
      setStatus("failed");
      return;
    }

    fetch(`/api/verify-payment?reference=${encodeURIComponent(reference)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.verified) {
          setStatus("failed");
          return;
        }

        try {
          const raw = sessionStorage.getItem("pendingOrder");
          const order = raw ? JSON.parse(raw) : null;

          window.fbq && window.fbq("track", "Purchase", {
            currency: data.currency || order?.currency || "USD",
            value: data.amount,
          });
          window.gtag && window.gtag("event", "purchase", {
            currency: data.currency || order?.currency || "USD",
            value: data.amount,
            transaction_id: data.reference,
            items: (order?.items || []).map((i) => ({ item_name: i.title, price: i.price, quantity: i.qty })),
          });
          sessionStorage.removeItem("pendingOrder");
        } catch (e) {}

        setStatus("verified");
      })
      .catch(() => setStatus("failed"));
  }, [searchParams]);

  if (status === "checking") {
    return (
      <section className="section" style={{ paddingTop: 120 }}>
        <div className="container" style={{ textAlign: "center", maxWidth: 560 }}>
          <p style={{ opacity: 0.7 }}>Confirming your payment…</p>
        </div>
      </section>
    );
  }

  if (status === "failed") {
    return (
      <section className="section" style={{ paddingTop: 120 }}>
        <div className="container" style={{ textAlign: "center", maxWidth: 560 }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Payment Not Confirmed
          </span>
          <h1 style={{ margin: "18px 0" }}>We couldn't confirm this payment.</h1>
          <p style={{ opacity: 0.75 }}>
            If you completed a payment and see this message, please contact us with your
            payment reference so we can confirm it manually — nothing has been charged
            twice, and we'll sort it out quickly.
          </p>
          <Link href="/contact">
            <button className="btn btn-primary" style={{ marginTop: 20 }}>
              Contact Support
            </button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ paddingTop: 120 }}>
      <div className="container" style={{ textAlign: "center", maxWidth: 560 }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          Order Confirmed
        </span>
        <h1 style={{ margin: "18px 0" }}>Thank you — your order is complete.</h1>
        <p style={{ opacity: 0.75 }}>
          A confirmation email with your receipt is on its way from Paystack. Download
          delivery emails are a feature we'll add next — for now, reach out and you'll
          be sent your files directly.
        </p>
        <Link href="/store">
          <button className="btn btn-primary" style={{ marginTop: 20 }}>
            Continue Shopping
          </button>
        </Link>
      </div>
    </section>
  );
}