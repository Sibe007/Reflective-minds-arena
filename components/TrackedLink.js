"use client";

export default function TrackedLink({ href, className, children, eventName = "Lead", eventLabel = "", target, rel }) {
  function handleClick() {
    if (typeof window === "undefined") return;
    window.fbq && window.fbq("track", eventName, eventLabel ? { content_name: eventLabel } : undefined);
    window.gtag && window.gtag("event", eventName === "Lead" ? "generate_lead" : eventName, { label: eventLabel });
  }

  return (
    <a href={href} className={className} target={target} rel={rel} onClick={handleClick}>
      {children}
    </a>
  );
}