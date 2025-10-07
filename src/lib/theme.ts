/**
 * Centralized theme configuration for token list UI
 */

export const theme = {
  // Typography
  text: {
    amount: "text-2xl font-bold text-gray-900",
    symbol: "text-2xl font-medium text-gray-500",
    price: "text-2xl font-semibold text-gray-700",
    priceChange: "text-2xl font-semibold",
    usdValue: "text-2xl font-semibold text-gray-700",
    header: "text-2xl font-bold text-gray-400 uppercase tracking-wider",
  },

  // Colors
  colors: {
    positive: "text-green-600",
    negative: "text-red-600",
  },

  // Layout
  layout: {
    cardBg: "bg-white",
    cardBorder: "border-gray-100",
    gridCols: "grid-cols-[2fr_1.5fr_1.5fr]",
    gap: "gap-6",
  },
} as const;
