import { NextResponse } from "next/server";
import { fetchTokenBalances } from "@/lib/tokenBalances";
import { fetchTokenPrices } from "@/lib/tokenPrices";
import { MOCK_TOKENS } from "@/config/mockData";

export async function GET(request: Request) {
  try {
    // Get wallet address from query params
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get("address");
    const useTestData = searchParams.get("useTestData") === "true";

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Return mock data for testing
    if (useTestData) {
      return NextResponse.json(MOCK_TOKENS);
    }

    // Fetch token balances and prices in parallel
    const [tokenBalances, priceData] = await Promise.all([
      fetchTokenBalances(walletAddress as `0x${string}`),
      fetchTokenPrices(),
    ]);

    // Token names mapping
    const tokenNames: Record<string, { symbol: string; name: string }> = {
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
        symbol: "WETH",
        name: "Wrapped Ether",
      },
      "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599": {
        symbol: "WBTC",
        name: "Wrapped Bitcoin",
      },
      "0xd31a59c85ae9d8edefec411d448f90841571b89c": {
        symbol: "SOL",
        name: "Wrapped Solana",
      },
      "0xb8c77482e45f1f44de1745f52c74426c631bdd52": {
        symbol: "BNB",
        name: "Binance Coin",
      },
      "0xae7ab96520de3a18e5e111b5eaab095312d7fe84": {
        symbol: "stETH",
        name: "Lido Staked Ether",
      },
      "0x514910771af9ca656af840dff83e8264ecf986ca": {
        symbol: "LINK",
        name: "Chainlink",
      },
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
        symbol: "USDC",
        name: "USD Coin",
      },
      "0xdac17f958d2ee523a2206206994597c13d831ec7": {
        symbol: "USDT",
        name: "Tether USD",
      },
    };

    // Transform data into our format
    const tokens = tokenBalances
      .map((tokenBalance, index) => {
        const normalizedAddress = tokenBalance.address.toLowerCase();
        const tokenPrice = priceData[normalizedAddress];
        const amount =
          Number(tokenBalance.balance) / Math.pow(10, tokenBalance.decimals);
        const tokenInfo = tokenNames[normalizedAddress] || {
          symbol: "UNKNOWN",
          name: "Unknown Token",
        };

        return {
          id: index + 1,
          symbol: tokenInfo.symbol,
          name: tokenInfo.name,
          amount,
          price: tokenPrice?.usd || 0,
          priceChange: tokenPrice?.usd_24h_change || 0,
          usdValue: amount * (tokenPrice?.usd || 0),
        };
      })
      .filter((token) => token.amount > 0 && token.price > 0); // Filter out tokens with no balance or price

    return NextResponse.json(tokens);
  } catch (error) {
    console.error("Error fetching token data:", error);
    return NextResponse.json(
      { error: "Failed to fetch token data" },
      { status: 500 }
    );
  }
}
