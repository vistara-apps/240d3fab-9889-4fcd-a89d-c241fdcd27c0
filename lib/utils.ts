import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function calculatePnL(entryPrice: number, exitPrice: number, quantity: number, side: 'buy' | 'sell'): number {
  if (side === 'buy') {
    return (exitPrice - entryPrice) * quantity;
  } else {
    return (entryPrice - exitPrice) * quantity;
  }
}

export function generateMockMarketData() {
  const symbols = ['BTC/USD', 'ETH/USD', 'SOL/USD', 'MATIC/USD'];
  return symbols.map(symbol => ({
    symbol,
    price: Math.random() * 50000 + 1000,
    change24h: (Math.random() - 0.5) * 20,
    volume24h: Math.random() * 1000000000,
    timestamp: new Date(),
  }));
}

export function generateMockTrades(userId: string, count = 10) {
  const trades = [];
  const symbols = ['BTC/USD', 'ETH/USD', 'SOL/USD'];
  const emotions = ['confident', 'fearful', 'greedy', 'calm', 'anxious'];
  
  for (let i = 0; i < count; i++) {
    const entryPrice = Math.random() * 50000 + 1000;
    const exitPrice = entryPrice * (1 + (Math.random() - 0.5) * 0.1);
    const quantity = Math.random() * 10 + 0.1;
    const side = Math.random() > 0.5 ? 'buy' : 'sell';
    
    trades.push({
      tradeId: `trade_${i + 1}`,
      userId,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      entryPrice,
      exitPrice: Math.random() > 0.3 ? exitPrice : undefined,
      quantity,
      entryTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      exitTime: Math.random() > 0.3 ? new Date() : undefined,
      side,
      status: Math.random() > 0.3 ? 'closed' : 'open',
      emotionBefore: emotions[Math.floor(Math.random() * emotions.length)],
      emotionAfter: Math.random() > 0.3 ? emotions[Math.floor(Math.random() * emotions.length)] : undefined,
      notes: Math.random() > 0.5 ? 'Sample trade note' : undefined,
      pnl: Math.random() > 0.3 ? calculatePnL(entryPrice, exitPrice, quantity, side) : undefined,
    });
  }
  
  return trades;
}
