import { Card, CardContent } from '@/components/ui/card';
import { Coins } from 'lucide-react';

export function TokenListEmpty() {
  return (
    <Card className="bg-white border-gray-100">
      <CardContent className="p-12">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
            <Coins className="h-8 w-8 text-gray-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Tokens Found
            </h3>
            <p className="text-base text-gray-500 max-w-md">
              This wallet doesn&apos;t have any tokens yet, or the tokens you hold are not currently tracked.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
