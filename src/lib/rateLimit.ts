/**
 * Simple token bucket rate limiter using 'limiter' package
 */

import { RateLimiter } from 'limiter';
import { CONSTANTS } from '@/config/constants';

// Store rate limiters per identifier (wallet address, IP, etc)
const limiters = new Map<string, RateLimiter>();

/**
 * Get or create a rate limiter for an identifier
 */
function getLimiter(identifier: string): RateLimiter {
  let limiter = limiters.get(identifier);

  if (!limiter) {
    // Token bucket: configured requests per minute
    limiter = new RateLimiter({
      tokensPerInterval: CONSTANTS.RATE_LIMIT.REQUESTS_PER_MINUTE,
      interval: 'minute'
    });
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
