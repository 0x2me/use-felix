/**
 * Formatting utilities for token data display
 */

/**
 * Format a dollar amount with proper locale and precision
 */
export function formatCurrency(value: number, decimals: number = 2): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format a percentage change with sign
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
}

/**
 * Format a token amount with fixed decimals
 */
export function formatTokenAmount(value: number, decimals: number = 4): string {
  return value.toFixed(decimals);
}

/**
 * Get token icon path from symbol
 */
export function getTokenIcon(symbol: string): string {
  return `/tokens/${symbol.toLowerCase()}.png`;
}
