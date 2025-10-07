/**
 * Simple token bucket rate limiter using 'limiter' package
 */

import { RateLimiter } from 'limiter';

// Store rate limiters per identifier (wallet address, IP, etc)
const limiters = new Map<string, RateLimiter>();

/**
 * Get or create a rate limiter for an identifier
 * 10 requests per minute per identifier
 */
function getLimiter(identifier: string): RateLimiter {
  let limiter = limiters.get(identifier);

  if (!limiter) {
    // Token bucket: 60 tokens, refill 60 per minute
    limiter = new RateLimiter({ tokensPerInterval: 60, interval: 'minute' });
    limiters.set(identifier, limiter);

    // Cleanup after 10 minutes of inactivity
    setTimeout(() => limiters.delete(identifier), 10 * 60 * 1000);
  }

  return limiter;
}

/**
 * Check if request is allowed under rate limit
 */
export async function checkRateLimit(identifier: string): Promise<boolean> {
  const limiter = getLimiter(identifier);
  return limiter.tryRemoveTokens(1);
}
