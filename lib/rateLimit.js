// Simple in-memory sliding-window rate limiter, keyed by IP + a named bucket.
// Resets when the serverless function cold-starts, so it's a deterrent against
// casual abuse, not a hard guarantee — good enough without adding a database.

const buckets = new Map();

export function rateLimit(request, { key, limit, windowMs }) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const bucketKey = `${key}:${ip}`;
  const now = Date.now();

  const existing = buckets.get(bucketKey);

  if (!existing || now - existing.windowStart > windowMs) {
    buckets.set(bucketKey, { count: 1, windowStart: now });
    return { limited: false };
  }

  if (existing.count >= limit) {
    const retryAfterMs = windowMs - (now - existing.windowStart);
    return { limited: true, retryAfterMs };
  }

  existing.count++;
  return { limited: false };
}