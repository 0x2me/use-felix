import { Card, CardContent } from '@/components/ui/card';
import { YieldData } from '@/hooks/useYields';
import Image from 'next/image';

interface TokenCardProps {
  token: YieldData;
}

export function TokenCard({ token }: TokenCardProps) {
  const getTokenIcon = (symbol: string) => {
    return `/tokens/${symbol.toLowerCase()}.png`;
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4 items-center">
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
              <div className="font-semibold text-lg">
                {token.amount.toFixed(4)}
              </div>
              <div className="text-sm text-muted-foreground">
                {token.symbol}
              </div>
            </div>
          </div>

          {/* Price Column */}
          <div className="text-center">
            <div className="font-semibold text-lg">
              ${token.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={`text-sm font-medium ${token.priceChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {token.priceChange >= 0 ? '+' : ''}{token.priceChange.toFixed(2)}%
            </div>
          </div>

          {/* USD Value Column */}
          <div className="text-right">
            <div className="font-semibold text-lg">
              ${token.usdValue.toFixed(2)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
