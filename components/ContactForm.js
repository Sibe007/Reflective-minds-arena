"use client";

import { useState } from "react";

function getRecaptchaToken(action) {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.grecaptcha || !window.grecaptcha.enterprise) {
      resolve(null);
      return;
    }
    window.grecaptcha.enterprise.ready(() => {
      window.grecaptcha.enterprise
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action })
        .then(resolve)
        .catch(reject);
    });
  });
}
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSending(true);

    const form = e.target;

    if (form.website && form.website.value) {
      setError("Something went wrong. Please try again.");
      setSending(false);
      return;
    }

    const payload = {
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value,
      message: form.message.value.trim(),
      website: form.website ? form.website.value : "",
    };

    try {
      payload.recaptchaToken = await getRecaptchaToken("contact");
    } catch (err) {
      console.error("reCAPTCHA error:", err);
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSending(false);
        return;
      }

      if (typeof window !== "undefined") {
        window.fbq && window.fbq("track", "Contact");
        window.gtag && window.gtag("event", "generate_lead", { form: "contact" });
      }

      setSent(true);
    } catch (err) {
      setError("Could not send your message. Please check your connection and try again.");
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div style={{ padding: "40px 0" }}>
        <h3 style={{ color: "var(--gold)" }}>✓ Message sent!</h3>
        <p style={{ opacity: 0.7 }}>Thank you for reaching out. I'll get back to you within 2-3 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div><label>First name</label><input name="firstName" required /></div>
        <div><label>Last name</label><input name="lastName" required /></div>
      </div>
      <div className="form-row full">
        <div><label>Email</label><input name="email" type="email" required /></div>
      </div>
      <div className="form-row full">
        <div>
          <label>Subject</label>
          <select name="subject">
            <option>General inquiry</option>
            <option>Interview request</option>
            <option>Speaking engagement</option>
            <option>Book order</option>
            <option>Rights & permissions</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div className="form-row full">
        <div>
          <label>Message</label>
          <textarea name="message" rows="6" required style={{
            width: "100%", padding: "13px 14px",
            border: "1px solid var(--line)", borderRadius: 2,
            fontFamily: "var(--font-body)", background: "var(--parchment)",
            color: "var(--ink)"
          }}></textarea>
        </div>
      </div>
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }} aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input type="text" id="website" name="website" tabIndex="-1" autoComplete="off" />
      </div>
      {error && (
        <p style={{ color: "var(--uli-red)", fontSize: ".9rem", marginBottom: 14 }}>{error}</p>
      )}
      <button className="btn btn-primary" type="submit" disabled={sending}>
        {sending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}