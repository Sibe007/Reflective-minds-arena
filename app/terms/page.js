import LegalLayout from "../../components/LegalLayout";

export const metadata = {
  title: "Terms of Service — Solomon B. Ibe",
  description: "The terms governing your use of reflectivemindsarena.com.ng.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="August 20, 2026">
      <p>
        These terms govern your use of reflectivemindsarena.com.ng, operated by Solomon
        B. Ibe under the Reflective Minds Arena imprint. By using this site, you agree
        to these terms.
      </p>

      <h2>Use of This Site</h2>
      <p>
        You may browse this site, read published content, and purchase books for
        personal use. You may not copy, redistribute, or reproduce our written content,
        book excerpts, or images without permission, except for standard fair-use
        purposes such as quoting a short passage with attribution.
      </p>

      <h2>Purchases</h2>
      <p>
        Books are sold either directly through this site's checkout (processed by
        Paystack) or through Selar, depending on the format and title. Prices are shown
        in the currency displayed at checkout at the time of purchase. Once a payment is
        confirmed, we will make reasonable efforts to deliver your purchased content
        promptly.
      </p>

      <h2>Digital Products</h2>
      <p>
        Ebooks and audiobooks purchased through this site are for personal use only.
        You may not resell, redistribute, or share purchased digital files.
      </p>

      <h2>Architecture Inquiries</h2>
      <p>
        Contacting us through the Architecture page regarding interior design or
        finishing work does not constitute a binding agreement. Any project engagement,
        scope, and pricing will be confirmed separately in writing.
      </p>

      <h2>Content Accuracy</h2>
      <p>
        We make reasonable efforts to keep information on this site accurate and
        up to date, but we do not guarantee that all content, pricing, or availability
        information is free of errors at all times.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Reflective Minds Arena and Solomon B.
        Ibe are not liable for any indirect, incidental, or consequential damages
        arising from your use of this site or its content.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update these terms from time to time. Continued use of the site after
        changes are posted constitutes acceptance of the updated terms.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about these terms can be sent via our <a href="/contact">Contact page</a>.
      </p>
    </LegalLayout>
  );
}