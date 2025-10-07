import { useQuery } from '@tanstack/react-query';

export interface YieldData {
  id: number;
  symbol: string;
  name: string;
  amount: number;
  price: number;
  priceChange: number;
  usdValue: number;
}

export function useYields(address?: string, useMockData: boolean = false) {
  return useQuery<YieldData[]>({
    queryKey: ['yields', address, useMockData],
    queryFn: async () => {
      if (!address) {
        throw new Error('Wallet address is required');
      }
      const res = await fetch(`/api/tokens?address=${address}&useTestData=${useMockData}`);
      if (!res.ok) throw new Error('Failed to fetch tokens');
      return res.json();
    },
    enabled: !!address,
  });
}
