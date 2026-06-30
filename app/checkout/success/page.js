import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <section className="section" style={{ paddingTop: 120 }}>
      <div className="container" style={{ textAlign: "center", maxWidth: 560 }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          Order Confirmed
        </span>
        <h1 style={{ margin: "18px 0" }}>Thank you — your order is complete.</h1>
        <p style={{ opacity: 0.75 }}>
          A confirmation email with your receipt is on its way from Stripe. Download
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
