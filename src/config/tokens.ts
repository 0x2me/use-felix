/**
 * Token configuration - Single source of truth for all token metadata
 */

export interface TokenMetadata {
  address: string;
  symbol: string;
  name: string;
}

export const TOKENS: TokenMetadata[] = [
  {
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    symbol: "WETH",
    name: "Wrapped Ether",
  },
  {
    address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
  },
  {
    address: "0xd31a59c85ae9d8edefec411d448f90841571b89c",
    symbol: "SOL",
    name: "Wrapped Solana",
  },
  {
    address: "0xb8c77482e45f1f44de1745f52c74426c631bdd52",
    symbol: "BNB",
    name: "Binance Coin",
  },
  {
    address: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
    symbol: "stETH",
    name: "Lido Staked Ether",
  },
  {
    address: "0x514910771af9ca656af840dff83e8264ecf986ca",
    symbol: "LINK",
    name: "Chainlink",
  },
  {
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    symbol: "USDC",
    name: "USD Coin",
  },
  {
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    symbol: "USDT",
    name: "Tether USD",
  },
];

// Create a map for fast lookups by address
export const TOKEN_MAP = TOKENS.reduce(
  (acc, token) => {
    acc[token.address.toLowerCase()] = {
      symbol: token.symbol,
      name: token.name,
    };
    return acc;
  },
  {} as Record<string, { symbol: string; name: string }>
);

// Export addresses for compatibility with existing code
export const TOKEN_ADDRESSES = TOKENS.map((token) => token.address);
