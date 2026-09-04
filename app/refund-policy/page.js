import LegalLayout from "../../components/LegalLayout";

export const metadata = {
  title: "Refund Policy — Solomon B. Ibe",
  description: "Our policy on refunds for book purchases made through reflectivemindsarena.com.ng.",
  openGraph: {
    title: "Refund Policy — Solomon B. Ibe",
    description: "Our policy on refunds for book purchases made through reflectivemindsarena.com.ng.",
    url: "https://reflectivemindsarena.com.ng/refund-policy",
    type: "website",
  },
};

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="August 20, 2026">
      <p>
        This policy explains when refunds are available for purchases made through
        reflectivemindsarena.com.ng and our Selar store.
      </p>

      <h2>Digital Products (Ebooks &amp; Audiobooks)</h2>
      <p>
        Because ebooks and audiobooks are delivered instantly and irreversibly once
        purchased, <strong>we do not offer refunds once a digital file has been
        downloaded or accessed</strong>, except in the following situations:
      </p>
      <ul>
        <li>You were charged more than once for the same order (duplicate charge).</li>
        <li>The file you received is corrupted, incomplete, or otherwise unusable, and we are unable to resolve this by re-sending it.</li>
        <li>You did not receive access to your purchase within a reasonable time after payment was confirmed, and the issue could not be resolved after contacting us.</li>
      </ul>

      <h2>Physical Products</h2>
      <p>
        If you purchase a paperback or hardcover copy, please contact us within 48 hours
        of delivery if the item arrives damaged or if you received the wrong item, and
        we will arrange a replacement or refund.
      </p>

      <h2>How to Request a Refund</h2>
      <p>
        To request a refund under the conditions above, please contact us via the{" "}
        <a href="/contact">Contact page</a> with your order/payment reference and a
        description of the issue. We aim to respond within 2-3 business days.
      </p>

      <h2>Approved Refunds</h2>
      <p>
        Approved refunds will be issued back to your original payment method through
        Paystack, or in accordance with Selar's own refund process for purchases made
        through Selar's checkout.
      </p>
    </LegalLayout>
  );
}