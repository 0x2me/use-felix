'use client'

import { useAccount, useBalance } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export function EthBalance() {
  const { address, isConnected, chain } = useAccount()
  const { data: balance, isLoading, error } = useBalance({
    address: address,
  })

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Ethereum Balance</CardTitle>
          <CardDescription>
            Connect your wallet to see your ETH balance
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Ethereum Balance</CardTitle>
          <CardDescription>Loading balance...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-md border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
          <CardDescription>
            Error fetching balance: {error.message}
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Ethereum Balance</CardTitle>
        <CardDescription>
          {chain?.name || 'Connected'} • {address?.slice(0, 6)}...{address?.slice(-4)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">
          {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '0 ETH'}
        </div>
      </CardContent>
    </Card>
  )
}
