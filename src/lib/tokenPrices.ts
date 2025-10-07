import { TOKEN_ADDRESSES } from '@/config/contracts';
import { unstable_cache } from 'next/cache';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second
const CACHE_TTL = 60; // Cache for 60 seconds

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchTokenPricesUncached() {
  let lastError: Error | null = null;

  // Get API key from server-side env only (not NEXT_PUBLIC_)
  const apiKey = process.env.COINGECKO_API_KEY;

  if (!apiKey) {
    throw new Error('CoinGecko API key is not configured');
  }

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(
        `https://pro-api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${TOKEN_ADDRESSES.join(
          ','
        )}&vs_currencies=usd&include_24hr_change=true`,
        {
          headers: {
            'x-cg-pro-api-key': apiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch token prices from CoinGecko: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');

      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY * attempt);
      }
    }
  }

  throw new Error(`Failed to fetch token prices after ${MAX_RETRIES} attempts: ${lastError?.message}`);
}

// Cached version - revalidates every 60 seconds
export const fetchTokenPrices = unstable_cache(
  fetchTokenPricesUncached,
  ['token-prices'],
  {
    revalidate: CACHE_TTL,
    tags: ['token-prices'],
  }
);
