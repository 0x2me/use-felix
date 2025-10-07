import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface TokenListErrorProps {
  error: Error | null;
}

export function TokenListError({ error }: TokenListErrorProps) {
  return (
    <Card className="bg-white border-red-100">
      <CardContent className="p-12">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-900">
              Failed to Load Tokens
            </h3>
            <p className="text-base text-gray-600 max-w-md">
              {error instanceof Error ? error.message : 'An unexpected error occurred'}
            </p>
          </div>
          <Button
            onClick={() => window.location.reload()}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-6 text-lg"
          >
            Retry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
