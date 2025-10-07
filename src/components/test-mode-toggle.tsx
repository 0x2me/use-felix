'use client'

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';

export function TestModeToggle() {
  const [useBinanceWallet, setUseBinanceWallet] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('useBinanceWallet');
    if (stored !== null) {
      setUseBinanceWallet(stored === 'true');
    }
  }, []);

  // Save to localStorage
  const handleToggle = (checked: boolean) => {
    setUseBinanceWallet(checked);
    localStorage.setItem('useBinanceWallet', String(checked));
    window.dispatchEvent(new CustomEvent('binanceWalletToggle', { detail: checked }));
  };

  return (
    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
      <Label htmlFor="test-mode" className="text-sm font-medium text-gray-700 cursor-pointer">
        Use Binance Test Wallet
      </Label>
      <Switch
        id="test-mode"
        checked={useBinanceWallet}
        onCheckedChange={handleToggle}
      />
    </div>
  );
}

export function useBinanceWalletToggle() {
  const [useBinanceWallet, setUseBinanceWallet] = useState(false);

  useEffect(() => {
    // Initial load
    const stored = localStorage.getItem('useBinanceWallet');
    if (stored !== null) {
      setUseBinanceWallet(stored === 'true');
    }

    // Listen for changes
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setUseBinanceWallet(customEvent.detail);
    };

    window.addEventListener('binanceWalletToggle', handler);
    return () => window.removeEventListener('binanceWalletToggle', handler);
  }, []);

  return useBinanceWallet;
}
