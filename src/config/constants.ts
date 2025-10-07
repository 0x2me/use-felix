/**
 * Application constants
 */

export const CONSTANTS = {
  // Threshold for low-value tokens (USD)
  LOW_VALUE_THRESHOLD: 0.1,

  // Cache TTLs (seconds)
  CACHE: {
    TOKEN_BALANCES: 15,
    TOKEN_PRICES: 15,
  },

  // Rate limiting
  RATE_LIMIT: {
    REQUESTS_PER_MINUTE: 60,
    WINDOW_MS: 60 * 1000,
  },

  // API retry configuration
  API: {
    MAX_RETRIES: 3,
    RETRY_DELAY_MS: 1000,
  },
} as const;
