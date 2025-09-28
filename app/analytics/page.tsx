'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Chart } from '../components/Chart';
import { Badge } from '../components/Badge';
import { formatCurrency, formatPercentage, generateMockTrades } from '@/lib/utils';
import { Trade } from '@/lib/types';
import { EMOTION_TAGS } from '@/lib/constants';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Brain,
  BarChart3,
  PieChart,
  Calendar,
  Award
} from 'lucide-react';

export default function Analytics() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('30d');

  useEffect(() => {
    // Load analytics data
    const loadData = async () => {
      setLoading(true);
      const mockTrades = generateMockTrades('user_1', 50);
      setTrades(mockTrades);
      setLoading(false);
    };

    loadData();
  }, []);

  // Calculate analytics metrics
  const closedTrades = trades.filter(t => t.status === 'closed' && t.pnl !== undefined);
  const winningTrades = closedTrades.filter(t => (t.pnl || 0) > 0);
  const losingTrades = closedTrades.filter(t => (t.pnl || 0) < 0);
  
  const totalPnL = closedTrades.reduce((sum, trade) => sum + (trade.pnl || 0), 0);
  const winRate = closedTrades.length > 0 ? (winningTrades.length / closedTrades.length) * 100 : 0;
  const avgWin = winningTrades.length > 0 ? winningTrades.reduce((sum, t) => sum + (t.pnl || 0), 0) / winningTrades.length : 0;
  const avgLoss = losingTrades.length > 0 ? Math.abs(losingTrades.reduce((sum, t) => sum + (t.pnl || 0), 0) / losingTrades.length) : 0;
  const profitFactor = avgLoss > 0 ? avgWin / avgLoss : 0;

  // Generate P&L chart data
  const pnlChartData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const dayTrades = trades.filter(t => {
      const tradeDate = new Date(t.entryTime);
      return tradeDate.toDateString() === date.toDateString();
    });
    const dayPnL = dayTrades.reduce((sum, t) => sum + (t.pnl || 0), 0);
    
    return {
      timestamp: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: dayPnL,
    };
  });

  // Emotion analysis
  const emotionStats = EMOTION_TAGS.map(emotion => {
    const beforeCount = trades.filter(t => t.emotionBefore === emotion.id).length;
    const afterCount = trades.filter(t => t.emotionAfter === emotion.id).length;
    const emotionTrades = trades.filter(t => 
      t.emotionBefore === emotion.id || t.emotionAfter === emotion.id
    );
    const emotionPnL = emotionTrades.reduce((sum, t) => sum + (t.pnl || 0), 0);
    
    return {
      ...emotion,
      beforeCount,
      afterCount,
      totalCount: beforeCount + afterCount,
      avgPnL: emotionTrades.length > 0 ? emotionPnL / emotionTrades.length : 0,
    };
  }).sort((a, b) => b.totalCount - a.totalCount);

  // Trading pair performance
  const pairStats = trades.reduce((acc, trade) => {
    if (!acc[trade.symbol]) {
      acc[trade.symbol] = {
        symbol: trade.symbol,
        trades: 0,
        pnl: 0,
        wins: 0,
      };
    }
    acc[trade.symbol].trades++;
    acc[trade.symbol].pnl += trade.pnl || 0;
    if ((trade.pnl || 0) > 0) acc[trade.symbol].wins++;
    return acc;
  }, {} as Record<string, any>);

  const topPairs = Object.values(pairStats)
    .sort((a: any, b: any) => b.pnl - a.pnl)
    .slice(0, 5);

  if (loading) {
    return (
      <AppShell currentPage="analytics">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-surface rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-surface rounded-lg"></div>
            ))}
          </div>
          <div className="h-96 bg-surface rounded-lg"></div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell currentPage="analytics">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Analytics</h1>
            <p className="text-text-secondary mt-1">
              Deep insights into your trading performance and psychology
            </p>
          </div>
          <div className="flex gap-2">
            {['7d', '30d', '90d', '1y'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  timeframe === period
                    ? 'bg-accent text-bg font-medium'
                    : 'bg-surface text-text-secondary hover:text-accent'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Key Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Total P&L</p>
                  <p className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-success' : 'text-danger'}`}>
                    {formatCurrency(totalPnL)}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${totalPnL >= 0 ? 'bg-success/20' : 'bg-danger/20'}`}>
                  {totalPnL >= 0 ? (
                    <TrendingUp className="h-6 w-6 text-success" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-danger" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Win Rate</p>
                  <p className="text-2xl font-bold text-text-primary">
                    {formatPercentage(winRate)}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-primary/20">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Profit Factor</p>
                  <p className="text-2xl font-bold text-text-primary">
                    {profitFactor.toFixed(2)}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-accent/20">
                  <Award className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Total Trades</p>
                  <p className="text-2xl font-bold text-text-primary">{trades.length}</p>
                </div>
                <div className="p-3 rounded-lg bg-warning/20">
                  <BarChart3 className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* P&L Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily P&L Performance</CardTitle>
            <CardDescription>Your profit and loss over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart data={pnlChartData} height={400} />
          </CardContent>
        </Card>

        {/* Performance Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Win/Loss Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Win/Loss Analysis</CardTitle>
              <CardDescription>Detailed breakdown of your trading performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <p className="text-2xl font-bold text-success">{winningTrades.length}</p>
                  <p className="text-sm text-text-secondary">Winning Trades</p>
                  <p className="text-xs text-success mt-1">
                    Avg: {formatCurrency(avgWin)}
                  </p>
                </div>
                <div className="text-center p-4 bg-danger/10 rounded-lg">
                  <p className="text-2xl font-bold text-danger">{losingTrades.length}</p>
                  <p className="text-sm text-text-secondary">Losing Trades</p>
                  <p className="text-xs text-danger mt-1">
                    Avg: -{formatCurrency(avgLoss)}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Best Trade:</span>
                  <span className="text-success font-medium">
                    {formatCurrency(Math.max(...closedTrades.map(t => t.pnl || 0)))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Worst Trade:</span>
                  <span className="text-danger font-medium">
                    {formatCurrency(Math.min(...closedTrades.map(t => t.pnl || 0)))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Avg Trade Size:</span>
                  <span className="text-text-primary font-medium">
                    {formatCurrency(trades.reduce((sum, t) => sum + (t.entryPrice * t.quantity), 0) / trades.length)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Trading Pairs */}
          <Card>
            <CardHeader>
              <CardTitle>Top Trading Pairs</CardTitle>
              <CardDescription>Your most profitable trading pairs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPairs.map((pair: any, index) => (
                <div key={pair.symbol} className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-accent">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{pair.symbol}</p>
                      <p className="text-sm text-text-secondary">
                        {pair.trades} trades • {formatPercentage((pair.wins / pair.trades) * 100)} win rate
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${pair.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                      {formatCurrency(pair.pnl)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Emotional Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-accent" />
              Emotional Trading Patterns
            </CardTitle>
            <CardDescription>How your emotions correlate with trading performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {emotionStats.slice(0, 6).map((emotion) => (
                <div key={emotion.id} className="p-4 bg-surface/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      variant="outline"
                      style={{ borderColor: emotion.color, color: emotion.color }}
                    >
                      {emotion.label}
                    </Badge>
                    <span className="text-sm text-text-secondary">
                      {emotion.totalCount} times
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Before trades:</span>
                      <span className="text-text-primary">{emotion.beforeCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">After trades:</span>
                      <span className="text-text-primary">{emotion.afterCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Avg P&L:</span>
                      <span className={`font-medium ${emotion.avgPnL >= 0 ? 'text-success' : 'text-danger'}`}>
                        {formatCurrency(emotion.avgPnL)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trading Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights & Recommendations</CardTitle>
            <CardDescription>AI-powered analysis of your trading patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium text-text-primary">Strong Performance Pattern</p>
                    <p className="text-sm text-text-secondary">
                      Your trades when feeling "confident" have a {formatPercentage(75)} win rate, 
                      significantly higher than average. Consider identifying what makes you feel confident.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium text-text-primary">Emotional Risk Alert</p>
                    <p className="text-sm text-text-secondary">
                      Trades made when feeling "greedy" show {formatPercentage(-15)} average returns. 
                      Consider implementing cooling-off periods during high-emotion states.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-text-primary">Optimization Opportunity</p>
                    <p className="text-sm text-text-secondary">
                      Your BTC/USD trades have the highest profit factor ({profitFactor.toFixed(2)}). 
                      Consider increasing allocation to this pair while maintaining risk management.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
