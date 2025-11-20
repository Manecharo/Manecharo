// Server-side rate limiting with IP tracking
// This helps prevent bot attacks by limiting submissions per IP address

interface RateLimitEntry {
  count: number;
  firstAttempt: number;
  blockedUntil?: number;
}

// In-memory store (for production, consider Redis or a database)
const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT_CONFIG = {
  // Max submissions allowed within the time window
  maxAttempts: 3,
  // Time window in milliseconds (15 minutes)
  windowMs: 15 * 60 * 1000,
  // Block duration after exceeding limit (1 hour)
  blockDurationMs: 60 * 60 * 1000,
};

export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  // No previous attempts
  if (!entry) {
    rateLimitStore.set(ip, {
      count: 1,
      firstAttempt: now,
    });
    return { allowed: true };
  }

  // Check if IP is currently blocked
  if (entry.blockedUntil && entry.blockedUntil > now) {
    const retryAfter = Math.ceil((entry.blockedUntil - now) / 1000);
    return { allowed: false, retryAfter };
  }

  // Check if we're outside the time window - reset counter
  if (now - entry.firstAttempt > RATE_LIMIT_CONFIG.windowMs) {
    rateLimitStore.set(ip, {
      count: 1,
      firstAttempt: now,
    });
    return { allowed: true };
  }

  // Within time window - increment counter
  entry.count += 1;

  // Exceeded limit - block the IP
  if (entry.count > RATE_LIMIT_CONFIG.maxAttempts) {
    entry.blockedUntil = now + RATE_LIMIT_CONFIG.blockDurationMs;
    const retryAfter = Math.ceil(RATE_LIMIT_CONFIG.blockDurationMs / 1000);
    return { allowed: false, retryAfter };
  }

  return { allowed: true };
}

// Clean up old entries periodically (run this on a schedule)
export function cleanupRateLimitStore() {
  const now = Date.now();
  const entriesToDelete: string[] = [];

  rateLimitStore.forEach((entry, ip) => {
    // Remove entries that are no longer blocked and outside the window
    if (
      (!entry.blockedUntil || entry.blockedUntil < now) &&
      now - entry.firstAttempt > RATE_LIMIT_CONFIG.windowMs
    ) {
      entriesToDelete.push(ip);
    }
  });

  entriesToDelete.forEach((ip) => rateLimitStore.delete(ip));
}

// Run cleanup every 5 minutes
setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
