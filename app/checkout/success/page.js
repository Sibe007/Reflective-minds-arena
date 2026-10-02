"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function CheckoutSuccessInner() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("checking");
  const [info, setInfo] = useState({ formats: [], reference: "" });

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

        // What the buyer ordered saved by the checkout page / webinar button (may be missing)
        let order = null;
        try {
          const raw = sessionStorage.getItem("pendingOrder");
          order = raw ? JSON.parse(raw) : null;
        } catch (e) {}

        // Prefer what the server says was ordered; fall back to the browser's copy.
        const formats =
          Array.isArray(data.formats) && data.formats.length > 0
            ? data.formats
            : (order?.items || []).map((i) => i.format || "ebook");

        setInfo({ formats, reference: data.reference || reference });

        try {
          const trackedKey = `purchase_tracked_${data.reference || reference}`;

          // Only record the purchase once, even if the page is refreshed.
          if (!sessionStorage.getItem(trackedKey)) {
            const currency = data.currency || order?.currency || "NGN";

            // Item prices are only included when they are in the same currency as the charge.
            const itemsMatchCurrency = !order || order.currency === currency;
            const items = (order?.items || []).map((i) =>
              itemsMatchCurrency
                ? { item_name: i.title, price: i.price, quantity: i.qty }
                : { item_name: i.title, quantity: i.qty }
            );

            window.fbq &&
              window.fbq("track", "Purchase", {
                currency,
                value: data.amount,
              });
            window.gtag &&
              window.gtag("event", "purchase", {
                currency,
                value: data.amount,
                transaction_id: data.reference,
                items,
              });

            sessionStorage.setItem(trackedKey, "1");
          }

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

  // ---- Verified: choose the wording based on what was bought ----
  const hasWebinar = info.formats.includes("webinar");
  const hasPaperback = info.formats.includes("paperback");
  const hasDownloads = info.formats.some(
    (f) => f !== "webinar" && f !== "paperback"
  );
  // If we couldn't tell what was ordered, use the general download wording.
  const showDownloads = hasDownloads || info.formats.length === 0;
  const webinarOnly = hasWebinar && !hasDownloads && !hasPaperback;

  return (
    <section className="section" style={{ paddingTop: 120 }}>
      <div className="container" style={{ textAlign: "center", maxWidth: 560 }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          {webinarOnly ? "Registration Confirmed" : "Order Confirmed"}
        </span>
        <h1 style={{ margin: "18px 0" }}>
          {webinarOnly
            ? "You're registered — see you there!"
            : "Thank you — your order is complete."}
        </h1>

        <p style={{ opacity: 0.75 }}>
          A confirmation email with your receipt is on its way from Paystack.
        </p>

        {hasWebinar && (
          <p style={{ opacity: 0.75 }}>
            A separate email from us has your webinar joining link and your free guide.
          </p>
        )}

        {showDownloads && (
          <p style={{ opacity: 0.75 }}>
            A separate email from us has your download link.
          </p>
        )}

        {hasPaperback && (
          <p style={{ opacity: 0.75 }}>
            Your paperback will be prepared for shipping, and we'll email you again once
            it ships.
          </p>
        )}

        <p style={{ opacity: 0.75 }}>
          Check your inbox (and spam folder, just in case) in the next few minutes.
        </p>

        {info.reference && (
          <p style={{ opacity: 0.5, fontSize: ".8rem", marginTop: 14 }}>
            Payment reference: {info.reference}
          </p>
        )}

        <Link href={webinarOnly ? "/events" : "/store"}>
          <button className="btn btn-primary" style={{ marginTop: 20 }}>
            {webinarOnly ? "Back to Events" : "Continue Shopping"}
          </button>
        </Link>
      </div>
    </section>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <section className="section" style={{ paddingTop: 120 }}>
          <div className="container" style={{ textAlign: "center", maxWidth: 560 }}>
            <p style={{ opacity: 0.7 }}>Loading…</p>
          </div>
        </section>
      }
    >
      <CheckoutSuccessInner />
    </Suspense>
  );
}