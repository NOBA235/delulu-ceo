interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory store suitable for single-process local development and hackathon demonstrations
const ipRequestStore = new Map<string, RateLimitRecord>();

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 15; // 15 requests per minute

/**
 * Basic in-memory rate limiter for local demonstration.
 * Returns true if the request is within limits, false if rate limited.
 */
export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = ipRequestStore.get(ip);

  // Clean up old entries periodically
  if (ipRequestStore.size > 1000) {
    ipRequestStore.forEach((val, key) => {
      if (now > val.resetTime) {
        ipRequestStore.delete(key);
      }
    });
  }

  if (!record || now > record.resetTime) {
    ipRequestStore.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count };
}
