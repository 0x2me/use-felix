import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';

export function TokenListHeader() {
  return (
    <div className={cn('grid px-6 py-4', theme.layout.gridCols, theme.layout.gap, theme.text.header)}>
      <div>Asset / Amount</div>
      <div className="text-center">Price</div>
      <div className="text-right">USD Value</div>
    </div>
  );
}
