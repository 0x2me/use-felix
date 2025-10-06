'use client'

import { useForm } from 'react-hook-form';
import { useUSDCTransfer } from '@/hooks/useUSDCTransfer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { useEffect } from 'react';

interface DepositFormData {
  amount: string;
  recipient: string;
}

export function DepositForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<DepositFormData>();
  const { transfer, hash, isPending, isConfirming, isSuccess } = useUSDCTransfer();

  const onSubmit = (data: DepositFormData) => {
    transfer(data.recipient, data.amount);
    toast.loading('Initiating transaction...', { id: 'transfer' });
  };

  useEffect(() => {
    if (isPending) {
      toast.loading('Confirming in wallet...', { id: 'transfer' });
    }
    if (isConfirming) {
      toast.loading('Processing transaction...', { id: 'transfer' });
    }
    if (isSuccess) {
      toast.success('Transaction successful!', { id: 'transfer' });
      setTimeout(() => reset(), 2000);
    }
  }, [isPending, isConfirming, isSuccess, reset]);

  return (
    <div className="w-full max-w-md p-6 rounded-lg border border-border bg-card">
      <h2 className="text-2xl font-bold mb-6">Deposit USDC</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            {...register('recipient', {
              required: 'Recipient address is required',
              pattern: {
                value: /^0x[a-fA-F0-9]{40}$/,
                message: 'Invalid Ethereum address'
              }
            })}
            placeholder="0x..."
          />
          {errors.recipient && (
            <p className="text-sm text-destructive">{errors.recipient.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount (USDC)</Label>
          <Input
            id="amount"
            type="number"
            step="0.000001"
            {...register('amount', {
              required: 'Amount is required',
              min: { value: 0.000001, message: 'Amount must be greater than 0' }
            })}
            placeholder="0.00"
          />
          {errors.amount && (
            <p className="text-sm text-destructive">{errors.amount.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending || isConfirming}
          className="w-full"
        >
          {isPending ? 'Confirming...' : isConfirming ? 'Processing...' : 'Deposit'}
        </Button>

        {hash && (
          <Alert>
            <AlertDescription>
              <p className="font-medium mb-1">Transaction Hash:</p>
              <p className="break-all text-xs text-muted-foreground">{hash}</p>
            </AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  );
}
