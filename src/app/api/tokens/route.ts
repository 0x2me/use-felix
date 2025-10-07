import { NextResponse } from "next/server";
import { fetchTokenBalances } from "@/lib/tokenBalances";
import { fetchTokenPrices } from "@/lib/tokenPrices";

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
      const mockData = [
        {
          id: 1,
          symbol: "WETH",
          name: "Wrapped Ether",
          amount: 1.5,
          price: 2500,
          priceChange: 2.3,
          usdValue: 3750,
        },
        {
          id: 2,
          symbol: "WBTC",
          name: "Wrapped Bitcoin",
          amount: 0.1,
          price: 45000,
          priceChange: -1.2,
          usdValue: 4500,
        },
        {
          id: 3,
          symbol: "SOL",
          name: "Wrapped Solana",
          amount: 0.015,
          price: 3.5,
          priceChange: -0.5,
          usdValue: 0.05,
        },
        {
          id: 4,
          symbol: "BNB",
          name: "Binance Coin",
          amount: 2.5,
          price: 320,
          priceChange: 1.8,
          usdValue: 800,
        },
        {
          id: 5,
          symbol: "stETH",
          name: "Lido Staked Ether",
          amount: 0.8,
          price: 2480,
          priceChange: 2.1,
          usdValue: 1984,
        },
        {
          id: 6,
          symbol: "LINK",
          name: "Chainlink",
          amount: 0.12,
          price: 0.45,
          priceChange: -2.3,
          usdValue: 0.054,
        },
        {
          id: 7,
          symbol: "USDC",
          name: "USD Coin",
          amount: 500,
          price: 1.0,
          priceChange: 0.1,
          usdValue: 500,
        },
        {
          id: 8,
          symbol: "USDT",
          name: "Tether USD",
          amount: 0.075,
          price: 1.0,
          priceChange: 0.0,
          usdValue: 0.075,
        },
      ];
      return NextResponse.json(mockData);
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
