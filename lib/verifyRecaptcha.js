export async function verifyRecaptcha(token, expectedAction) {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.error("RECAPTCHA_SECRET_KEY is not set — skipping verification.");
    return { success: false, reason: "Not configured." };
  }

  if (!token) {
    return { success: false, reason: "Missing token." };
  }

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, reason: "Verification failed." };
    }

    if (expectedAction && data.action !== expectedAction) {
      return { success: false, reason: "Action mismatch." };
    }

    // Score ranges 0.0 (likely bot) to 1.0 (likely human). 0.5 is Google's
    // recommended default threshold.
    if (typeof data.score === "number" && data.score < 0.5) {
      return { success: false, reason: `Low score: ${data.score}` };
    }

    return { success: true, score: data.score };
  } catch (err) {
    console.error("reCAPTCHA verification error:", err);
    return { success: false, reason: "Verification request failed." };
  }
}