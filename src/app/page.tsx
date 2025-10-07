"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useYields } from "@/hooks/useYields";
import { useAccount } from "wagmi";
import { TokenCard } from "@/components/token-card";
import { TokenListHeader } from "@/components/token-list-header";
import { TokenListLoading } from "@/components/token-list-loading";
import { TokenListError } from "@/components/token-list-error";
import { TokenListEmpty } from "@/components/token-list-empty";
import { LowValueTokens } from "@/components/low-value-tokens";
import { TestModeToggle, useBinanceWalletToggle } from "@/components/test-mode-toggle";
import { useMemo } from "react";
import { CONSTANTS } from "@/config/constants";

export default function Home() {
  const { address } = useAccount();
  const useBinanceWallet = useBinanceWalletToggle();

  // Determine which address to use
  const binanceAddress = "0x28C6c06298d514Db089934071355E5743bf21d60";

  let walletAddress: string;
  let useMockData: boolean;

  if (useBinanceWallet) {
    // Toggle is ON: Always use Binance wallet with real data
    walletAddress = binanceAddress;
    useMockData = false;
  } else if (address) {
    // Toggle is OFF + wallet connected: Use connected wallet with real data
    walletAddress = address;
    useMockData = false;
  } else {
    // Toggle is OFF + no wallet: Use mock data
    walletAddress = binanceAddress;
    useMockData = true;
  }

  const { data: tokens, isLoading, error } = useYields(walletAddress, useMockData);

  // Separate tokens into regular and low value
  const { regularTokens, lowValueTokens } = useMemo(() => {
    if (!tokens) return { regularTokens: [], lowValueTokens: [] };

    return tokens.reduce(
      (acc, token) => {
        if (token.usdValue < CONSTANTS.LOW_VALUE_THRESHOLD) {
          acc.lowValueTokens.push(token);
        } else {
          acc.regularTokens.push(token);
        }
        return acc;
      },
      {
        regularTokens: [] as typeof tokens,
        lowValueTokens: [] as typeof tokens,
      }
    );
  }, [tokens]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header with Controls */}
      <header className="fixed top-0 right-0 p-6 z-50 flex items-center gap-4">
        <TestModeToggle />
        <ConnectButton />
      </header>

      {/* Main content - Token List */}
      <main className="flex-1 flex items-center justify-center p-8 pt-24">
        <div className="w-full max-w-3xl">
          <div className="space-y-4">
            <TokenListHeader />

            {isLoading && <TokenListLoading />}

            {error && <TokenListError error={error} />}

            {tokens && tokens.length === 0 && <TokenListEmpty />}

            {tokens && tokens.length > 0 && (
              <>
                {/* Regular Value Tokens */}
                {regularTokens.map((token) => (
                  <TokenCard key={token.id} token={token} />
                ))}

                {/* Low Value Tokens */}
                <LowValueTokens tokens={lowValueTokens} />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
