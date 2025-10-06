'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function WalletConnectButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-4">
        <p className="text-sm font-medium">
          Connected: {address.slice(0, 6)}...{address.slice(-4)}
        </p>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Connect {connector.name}
        </button>
      ))}
    </div>
  )
}
