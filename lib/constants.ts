export const EMOTION_TAGS = [
  { id: 'confident', label: 'Confident', color: '#10b981', category: 'positive' as const },
  { id: 'excited', label: 'Excited', color: '#f59e0b', category: 'positive' as const },
  { id: 'calm', label: 'Calm', color: '#3b82f6', category: 'positive' as const },
  { id: 'focused', label: 'Focused', color: '#8b5cf6', category: 'positive' as const },
  { id: 'fearful', label: 'Fearful', color: '#ef4444', category: 'negative' as const },
  { id: 'greedy', label: 'Greedy', color: '#dc2626', category: 'negative' as const },
  { id: 'anxious', label: 'Anxious', color: '#f97316', category: 'negative' as const },
  { id: 'frustrated', label: 'Frustrated', color: '#be123c', category: 'negative' as const },
  { id: 'neutral', label: 'Neutral', color: '#6b7280', category: 'neutral' as const },
  { id: 'uncertain', label: 'Uncertain', color: '#64748b', category: 'neutral' as const },
];

export const TRADING_PAIRS = [
  'BTC/USD',
  'ETH/USD',
  'SOL/USD',
  'MATIC/USD',
  'LINK/USD',
  'UNI/USD',
  'AAVE/USD',
  'COMP/USD',
];

export const ORDER_TYPES = [
  { value: 'market', label: 'Market Order' },
  { value: 'limit', label: 'Limit Order' },
  { value: 'stop_limit', label: 'Stop Limit' },
  { value: 'ioc', label: 'Immediate or Cancel' },
  { value: 'fok', label: 'Fill or Kill' },
];

export const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    features: ['Basic journal', 'Discipline tracker', 'Limited analytics'],
  },
  pro: {
    name: 'Pro',
    price: 15,
    features: ['Automated orders', 'Slippage tool', 'Advanced analytics', 'All free features'],
  },
  premium: {
    name: 'Premium',
    price: 25,
    features: ['Custom automation', 'Priority support', 'Advanced customization', 'All pro features'],
  },
};
