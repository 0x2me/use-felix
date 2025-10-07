import { NextResponse } from "next/server";
import { isAddress } from "viem";
import { fetchTokenBalances } from "@/lib/tokenBalances";
import { fetchTokenPrices } from "@/lib/tokenPrices";
import { MOCK_TOKENS } from "@/config/mockData";
import { TOKEN_MAP } from "@/config/tokens";
import { checkRateLimit } from "@/lib/rateLimit";

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

    // Validate Ethereum address format
    if (!isAddress(walletAddress)) {
      return NextResponse.json(
        { error: "Invalid Ethereum address format" },
        { status: 400 }
      );
    }

    // Return mock data for testing (skip rate limit)
    if (useTestData) {
      return NextResponse.json(MOCK_TOKENS);
    }

    // Rate limiting: 60 requests per minute per wallet
    const allowed = await checkRateLimit(walletAddress);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Fetch token balances and prices in parallel
    // walletAddress is validated with isAddress() above, safe to cast
    const [tokenBalances, priceData] = await Promise.all([
      fetchTokenBalances(walletAddress as `0x${string}`),
      fetchTokenPrices(),
    ]);

    // Transform data into our format
    const tokens = tokenBalances
      .map((tokenBalance, index) => {
        const normalizedAddress = tokenBalance.address.toLowerCase();
        const tokenPrice = priceData[normalizedAddress];
        const amount =
          Number(tokenBalance.balance) / Math.pow(10, tokenBalance.decimals);
        const tokenInfo = TOKEN_MAP[normalizedAddress] || {
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
