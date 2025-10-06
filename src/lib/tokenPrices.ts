import { TOKEN_ADDRESSES } from '@/config/contracts';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchTokenPrices() {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(
        `https://pro-api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${TOKEN_ADDRESSES.join(
          ','
        )}&vs_currencies=usd&include_24hr_change=true`,
        {
          headers: {
            'x-cg-pro-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY || '',
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
