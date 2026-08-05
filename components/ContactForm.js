"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
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
        <div><label>First name</label><input required /></div>
        <div><label>Last name</label><input required /></div>
      </div>
      <div className="form-row full">
        <div><label>Email</label><input type="email" required /></div>
      </div>
      <div className="form-row full">
        <div>
          <label>Subject</label>
          <select>
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
          <textarea rows="6" required style={{
            width: "100%", padding: "13px 14px",
            border: "1px solid var(--line)", borderRadius: 2,
            fontFamily: "var(--font-body)", background: "var(--parchment)",
            color: "var(--ink)"
          }}></textarea>
        </div>
      </div>
      <button className="btn btn-primary" type="submit">Send Message</button>
    </form>
  );
}