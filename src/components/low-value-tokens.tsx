'use client'

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Coins } from 'lucide-react';
import { YieldData } from '@/hooks/useYields';
import { TokenCard } from './token-card';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/formatters';

interface LowValueTokensProps {
  tokens: YieldData[];
}

export function LowValueTokens({ tokens }: LowValueTokensProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalValue = tokens.reduce((sum, token) => sum + token.usdValue, 0);

  if (tokens.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Summary Card */}
      <Card className={cn(theme.layout.cardBg, theme.layout.cardBorder, "cursor-pointer hover:shadow-md transition-all")} onClick={() => setIsExpanded(!isExpanded)}>
        <CardContent className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Coins className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">
                  {tokens.length} low value token{tokens.length !== 1 ? 's' : ''}
                </div>
                <div className="text-base text-gray-500">
                  Tokens worth less than $0.10
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className={theme.text.usdValue}>
                  ${formatCurrency(totalValue)}
                </div>
              </div>
              <Button variant="ghost" size="sm">
                {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expanded Token List */}
      {isExpanded && (
        <div className="space-y-4 pl-4 border-l-2 border-muted">
          {tokens.map((token) => (
            <TokenCard key={token.id} token={token} />
          ))}
        </div>
      )}
    </div>
  );
}
