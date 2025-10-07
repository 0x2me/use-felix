import { Card, CardContent } from "@/components/ui/card";
import { YieldData } from "@/hooks/useYields";
import Image from "next/image";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import {
  formatCurrency,
  formatPercentage,
  formatTokenAmount,
  getTokenIcon,
} from "@/lib/formatters";

interface TokenCardProps {
  token: YieldData;
}

export function TokenCard({ token }: TokenCardProps) {
  return (
    <Card
      className={cn(
        theme.layout.cardBg,
        theme.layout.cardBorder,
        "transition-all hover:shadow-md"
      )}
    >
      <CardContent className="px-10 py-6">
        <div
          className={cn(
            "grid items-center",
            theme.layout.gridCols,
            theme.layout.gap
          )}
        >
          {/* Asset / Amount Column */}
          <div className="flex items-center gap-3">
            <Image
              src={getTokenIcon(token.symbol)}
              alt={token.symbol}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <div className={theme.text.amount}>
                {formatTokenAmount(token.amount)}
              </div>
              <div className={theme.text.symbol}>{token.symbol}</div>
            </div>
          </div>

          {/* Price Column */}
          <div className="text-center">
            <div className={theme.text.price}>
              ${formatCurrency(token.price)}
            </div>
            <div
              className={cn(
                theme.text.priceChange,
                token.priceChange >= 0
                  ? theme.colors.positive
                  : theme.colors.negative
              )}
            >
              {formatPercentage(token.priceChange)}
            </div>
          </div>

          {/* USD Value Column */}
          <div className="text-right">
            <div className={theme.text.usdValue}>
              ${formatCurrency(token.usdValue)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
