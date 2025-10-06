import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface TokenListErrorProps {
  error: Error | null;
}

export function TokenListError({ error }: TokenListErrorProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error loading tokens</AlertTitle>
      <AlertDescription>
        {error instanceof Error ? error.message : 'An unexpected error occurred'}
        <button
          onClick={() => window.location.reload()}
          className="block mt-2 text-sm font-medium hover:underline"
        >
          Try again
        </button>
      </AlertDescription>
    </Alert>
  );
}
