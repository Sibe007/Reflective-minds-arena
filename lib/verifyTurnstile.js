export async function verifyTurnstile(token) {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.error("TURNSTILE_SECRET_KEY is not set — skipping verification.");
    return { success: false, reason: "Not configured." };
  }

  if (!token) {
    return { success: false, reason: "Missing token." };
  }

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, reason: (data["error-codes"] || []).join(", ") || "Verification failed." };
    }

    return { success: true };
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return { success: false, reason: "Verification request failed." };
  }
}