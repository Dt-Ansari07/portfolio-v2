/**
 * Minimal in-memory fixed-window rate limiter.
 *
 * Deliberately NOT backed by Redis/Upstash: this portfolio has no database
 * and adding one purely to throttle a contact form would be the kind of
 * over-engineering the audit report explicitly warns against (Section 4,
 * "Overengineering"). This limiter is correct for a single long-lived
 * server process (Docker/Node deployment).
 *
 * Caveat for serverless (Vercel) deployments: each function instance has
 * its own memory, so the effective limit is "N requests per instance" not
 * globally. That's an acceptable tradeoff for a low-traffic contact form;
 * if you outgrow it, swap this module for Upstash Ratelimit without
 * touching the API route's call site.
 */

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5;

const hits = new Map<string, { count: number; windowStart: number }>();

export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const entry = hits.get(identifier);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(identifier, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

/** Periodically evict stale entries so the map doesn't grow unbounded. */
export function pruneRateLimitStore(): void {
  const now = Date.now();
  for (const [key, entry] of hits.entries()) {
    if (now - entry.windowStart > WINDOW_MS) hits.delete(key);
  }
}
