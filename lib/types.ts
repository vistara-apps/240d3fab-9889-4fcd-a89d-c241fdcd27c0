export interface User {
  userId: string;
  walletAddress: string;
  subscriptionTier: 'free' | 'pro' | 'premium';
  createdAt: Date;
  updatedAt: Date;
}

export interface Trade {
  tradeId: string;
  userId: string;
  symbol: string;
  entryPrice: number;
  exitPrice?: number;
  quantity: number;
  entryTime: Date;
  exitTime?: Date;
  side: 'buy' | 'sell';
  status: 'open' | 'closed' | 'cancelled';
  emotionBefore?: string;
  emotionAfter?: string;
  notes?: string;
  pnl?: number;
}

export interface TradingRule {
  ruleId: string;
  userId: string;
  name: string;
  description: string;
  type: 'entry' | 'exit' | 'risk_management';
  parameters: Record<string, any>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SlippageAnalysis {
  analysisId: string;
  symbol: string;
  timestamp: Date;
  marketCondition: 'low_volatility' | 'medium_volatility' | 'high_volatility';
  suggestedOrderType: 'market' | 'limit' | 'stop_limit';
  suggestedTiming: 'immediate' | 'wait_5min' | 'wait_15min';
  expectedSlippage: number;
}

export interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  timestamp: Date;
}

export interface EmotionTag {
  id: string;
  label: string;
  color: string;
  category: 'positive' | 'negative' | 'neutral';
}

export interface DisciplineMetric {
  ruleId: string;
  adherenceRate: number;
  violationCount: number;
  lastViolation?: Date;
}
