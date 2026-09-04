import LegalLayout from "../../components/LegalLayout";

export const metadata = {
  title: "Privacy Policy — Solomon B. Ibe",
  description: "How Reflective Minds Arena collects, uses, and protects your personal information.",
  openGraph: {
    title: "Privacy Policy — Solomon B. Ibe",
    description: "How Reflective Minds Arena collects, uses, and protects your personal information.",
    url: "https://reflectivemindsarena.com.ng/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="August 20, 2026">
      <p>
        Reflective Minds Arena ("we", "us", "our") operates reflectivemindsarena.com.ng.
        This policy explains what personal information we collect when you use this
        website, why we collect it, and how it is handled.
      </p>

      <h2>Information We Collect</h2>
      <p>We collect information in the following ways:</p>
      <ul>
        <li><strong>Contact form submissions</strong> — first name, last name, email address, subject, and message content, when you use the Contact page.</li>
        <li><strong>Newsletter signups</strong> — your email address, and name if provided, when you subscribe via the footer form or signup popup.</li>
        <li><strong>Purchases</strong> — when you buy a book through this site, payment is processed directly by Paystack; we do not receive or store your card details. We receive confirmation of the transaction (amount, reference, and the email you provide at checkout).</li>
        <li><strong>Automatically collected data</strong> — when you browse the site, we automatically collect standard technical information such as your IP address, browser type, pages visited, and referring site, via Google Analytics and Meta (Facebook) Pixel.</li>
        <li><strong>Live chat</strong> — if you use the chat widget (powered by Tawk.to), your messages and any information you share in that conversation are stored by Tawk.to and accessible to us.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To respond to messages sent through the Contact form.</li>
        <li>To send newsletter updates about new books, blog posts, and announcements, if you have subscribed.</li>
        <li>To process and fulfill book orders.</li>
        <li>To understand how visitors use the site, so we can improve it (via Google Analytics).</li>
        <li>To measure the effectiveness of any advertising we run (via Meta Pixel).</li>
        <li>To respond to inquiries via live chat.</li>
      </ul>

      <h2>Third-Party Services We Use</h2>
      <p>This site relies on the following third-party services, each of which has its own privacy practices:</p>
      <ul>
        <li><strong>Paystack</strong> — payment processing for book purchases.</li>
        <li><strong>Selar</strong> — digital delivery for certain ebook and audiobook purchases.</li>
        <li><strong>Sanity</strong> — our content management system, used to store site content and information submitted through our forms.</li>
        <li><strong>Brevo</strong> — our email newsletter provider, used to send updates to subscribers.</li>
        <li><strong>Google Analytics</strong> — website usage analytics.</li>
        <li><strong>Meta (Facebook) Pixel</strong> — advertising measurement.</li>
        <li><strong>Tawk.to</strong> — live chat support.</li>
        <li><strong>Vercel</strong> — website hosting.</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        This site uses cookies and similar technologies set by Google Analytics, Meta
        Pixel, and Tawk.to to recognize your browser across visits, measure site usage
        and advertising performance, and power live chat support. These are only
        activated if you accept cookies via the banner shown on your first visit. You
        can change your choice at any time using the "Cookie Preferences" link in the
        footer, or control or delete cookies through your browser settings.
      </p>

      <h2>Data Retention</h2>
      <p>
        We retain contact form submissions and newsletter subscriber information for as
        long as necessary to respond to your inquiry or for as long as you remain
        subscribed. You may request deletion of your information at any time using the
        contact details below.
      </p>

      <h2>Your Rights</h2>
      <p>
        You have the right to request access to, correction of, or deletion of your
        personal information held by us. You may unsubscribe from newsletter emails at
        any time using the unsubscribe link in any email we send.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy or how your information is
        handled, please reach out via our <a href="/contact">Contact page</a>.
      </p>
    </LegalLayout>
  );
}