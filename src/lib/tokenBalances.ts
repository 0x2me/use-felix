import { createPublicClient, http, erc20Abi, Address } from "viem";
import { mainnet } from "viem/chains";
import { TOKEN_ADDRESSES } from "@/config/contracts";
import { unstable_cache } from "next/cache";

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export interface TokenBalanceData {
  address: string;
  balance: bigint;
  decimals: number;
}

/**
 * Fetch token balances and decimals for a given wallet address using multicall
 * @param walletAddress - The wallet address to fetch balances for
 * @returns Array of token balances with decimals
 */
async function fetchTokenBalancesUncached(
  walletAddress: Address
): Promise<TokenBalanceData[]> {
  // Fetch balances and decimals in parallel using multicall
  const [balances, decimals] = await Promise.all([
    // Fetch balances
    publicClient.multicall({
      contracts: TOKEN_ADDRESSES.map((tokenAddress) => ({
        address: tokenAddress as Address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [walletAddress],
      })),
    }),
    // Fetch decimals
    publicClient.multicall({
      contracts: TOKEN_ADDRESSES.map((tokenAddress) => ({
        address: tokenAddress as Address,
        abi: erc20Abi,
        functionName: "decimals",
      })),
    }),
  ]);

  // Combine data
  return TOKEN_ADDRESSES.map((address, index) => ({
    address,
    balance:
      balances[index].status === "success"
        ? (balances[index].result as bigint)
        : 0n,
    decimals:
      decimals[index].status === "success"
        ? (decimals[index].result as number)
        : 18,
  }));
}

// Cached version - revalidates every 15 seconds
export const fetchTokenBalances = (walletAddress: Address) =>
  unstable_cache(
    () => fetchTokenBalancesUncached(walletAddress),
    ["token-balances", walletAddress],
    {
      revalidate: 15, // 15 seconds
      tags: ["token-balances", walletAddress],
    }
  )();
