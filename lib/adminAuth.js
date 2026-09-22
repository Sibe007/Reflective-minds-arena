// Checks an email against the ADMIN_EMAILS env var — a comma-separated
// allowlist (e.g. "solomon@reflectivemindsarena.com.ng,ozioma@example.com").
// Set this in Vercel as a Config-type env var (not Secret, so it can be
// viewed/verified after saving — see the lesson learned on this project).
export function isAdminEmail(email) {
  if (!email) return false;
  const allowed = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.trim().toLowerCase());
}