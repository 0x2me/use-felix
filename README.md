This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env.local` file with your CoinGecko API key:

```
NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key_here
```

### Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
