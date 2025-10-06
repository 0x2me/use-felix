"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useYields } from "@/hooks/useYields";
import { useAccount } from "wagmi";
import { TokenCard } from "@/components/token-card";
import { TokenListHeader } from "@/components/token-list-header";
import { TokenListLoading } from "@/components/token-list-loading";
import { TokenListError } from "@/components/token-list-error";
import { LowValueTokens } from "@/components/low-value-tokens";
import { useMemo } from "react";

const LOW_VALUE_THRESHOLD = 0.1; // $0.10 USD

export default function Home() {
  const { address } = useAccount();
  // TODO: Replace with actual connected wallet address
  const hardcodedAddress = "0x28C6c06298d514Db089934071355E5743bf21d60"; // Binance hot wallet
  const { data: tokens, isLoading, error } = useYields(hardcodedAddress);

  // Separate tokens into regular and low value
  const { regularTokens, lowValueTokens } = useMemo(() => {
    if (!tokens) return { regularTokens: [], lowValueTokens: [] };

    return tokens.reduce(
      (acc, token) => {
        if (token.usdValue < LOW_VALUE_THRESHOLD) {
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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header with Connect Button */}
      <header className="fixed top-0 right-0 p-6 z-50">
        <ConnectButton />
      </header>

      {/* Main content - Token List */}
      <main className="flex-1 flex items-center justify-center p-8 pt-24">
        <div className="w-full max-w-4xl">
          <div className="space-y-4">
            <TokenListHeader />

            {isLoading && <TokenListLoading />}

            {error && <TokenListError error={error} />}

            {tokens && (
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
