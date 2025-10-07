# Token Tracker

A production-ready cryptocurrency portfolio tracker built with Next.js 15, featuring real-time blockchain data and optimized performance.

## Technical Overview

### Architecture
- **Framework**: Next.js 15.5.4 (App Router) with TypeScript
- **API Layer**: Next.js API routes (`/api/tokens`) for secure server-side data fetching
- **Blockchain**: Viem for Ethereum RPC calls with multicall pattern (batch requests)
- **Wallet Integration**: RainbowKit + Wagmi for wallet connection
- **UI**: Tailwind CSS + shadcn/ui component library
- **State Management**: TanStack Query (React Query) for client-side caching

### Data Fetching Strategy

**Two-tier caching system** for optimal performance:

1. **Blockchain Data** (`/src/lib/tokenBalances.ts`)
   - Fetches ERC-20 balances using `viem` multicall (single RPC call for all tokens)
   - Server-side cache: 15 seconds (Next.js `unstable_cache`)
   - Handles BigInt serialization for cache compatibility

2. **Price Data** (`/src/lib/tokenPrices.ts`)
   - CoinGecko Pro API for USD prices and 24h changes
   - Server-side cache: 15 seconds with automatic revalidation
   - Retry logic with exponential backoff (3 attempts)
   - API key secured server-side only (not exposed to browser)

3. **Rate Limiting** (`/src/lib/rateLimit.ts`)
   - Token bucket algorithm (60 requests/minute per wallet)
   - Prevents API abuse and protects against excessive RPC calls
   - Uses `limiter` package with per-identifier tracking

### Security Features
- ✅ Server-side API key storage (no client exposure)
- ✅ Ethereum address validation (`isAddress` from viem)
- ✅ Rate limiting per wallet address
- ✅ Input sanitization and error boundaries
- ✅ Type-safe contracts with viem's strict typing

### Key Technical Decisions
- **Multicall Pattern**: Batch all token balance calls into single RPC request (reduces latency from ~8 calls to 1)
- **Parallel Fetching**: Balance and price data fetched concurrently with `Promise.all`
- **Cache TTL**: 15s balances trade-offs between freshness and API costs
- **Centralized Config**: Single source of truth for tokens, constants, and theme (`/src/config/*`)

## Getting Started

### Installation

```bash
pnpm install
```

### Environment Setup

Copy `.env.example` to `.env.local` and add your API keys:

```bash
cp .env.example .env.local
```

### Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test Data & Wallet Connection

The app includes a **"Use Binance Test Wallet"** toggle in the top-right corner that controls which data source is used:

### Toggle ON (Binance Test Wallet)
- Always uses Binance hot wallet address (`0x28C6c06298d514Db089934071355E5743bf21d60`)
- Fetches **real blockchain data** from this wallet (~$900M+ in tokens)
- Ignores any connected wallet
- Useful for testing with real data without needing your own tokens

### Toggle OFF (Normal Mode)
- **Wallet Connected**: Uses your connected wallet address with **real blockchain data**
- **No Wallet**: Uses **mock data** for demo purposes (8 sample tokens with fake balances)

### How It Works
1. The toggle state persists in localStorage across page reloads
2. When toggled, the app automatically refetches data from the appropriate source
3. Empty state shown if wallet has no tokens or no tracked tokens
