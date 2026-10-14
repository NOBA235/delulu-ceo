import test from "node:test";
import assert from "node:assert/strict";

function createRateLimiter(maxRequests = 5) {
  const store = new Map();
  const windowMs = 60 * 1000;

  return function checkLimit(ip) {
    const now = Date.now();
    const record = store.get(ip);
    if (!record || now > record.resetTime) {
      store.set(ip, { count: 1, resetTime: now + windowMs });
      return { allowed: true, remaining: maxRequests - 1 };
    }
    if (record.count >= maxRequests) {
      return { allowed: false, remaining: 0 };
    }
    record.count += 1;
    return { allowed: true, remaining: maxRequests - record.count };
  };
}

test("allows requests up to configured limit", () => {
  const checkLimit = createRateLimiter(3);
  const ip = "192.168.1.10";

  assert.equal(checkLimit(ip).allowed, true);
  assert.equal(checkLimit(ip).allowed, true);
  assert.equal(checkLimit(ip).allowed, true);
  assert.equal(checkLimit(ip).allowed, false); // 4th request blocked
});
