/**
 * Small in-memory sliding-window rate limiter for server functions.
 * Good enough to stop casual abuse/spam bursts on a personal portfolio.
 */
const buckets = new Map<string, number[]>();

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return { allowed: false as const, retryAfterMs: windowMs - (now - (hits[0] ?? now)) };
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (v.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }
  return { allowed: true as const, retryAfterMs: 0 };
}
