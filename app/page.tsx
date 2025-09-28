'use client';

import { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/Card';
import { Button } from './components/Button';
import { Chart } from './components/Chart';
import { WalletConnect } from './components/WalletConnect';
import { Badge } from './components/Badge';
import { formatCurrency, formatPercentage, generateMockMarketData, generateMockTrades } from '@/lib/utils';
import { MarketData, Trade } from '@/lib/types';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  BookOpen, 
  AlertTriangle,
  DollarSign,
  Activity,
  Users
} from 'lucide-react';

export default function Dashboard() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [recentTrades, setRecentTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);
      
      // Generate mock data
      const mockMarketData = generateMockMarketData();
      const mockTrades = generateMockTrades('user_1', 5);
      
      setMarketData(mockMarketData);
      setRecentTrades(mockTrades);
      setLoading(false);
    };

    loadData();
  }, []);

  // Generate chart data
  const chartData = Array.from({ length: 24 }, (_, i) => ({
    timestamp: `${i}:00`,
    price: 45000 + Math.random() * 5000,
  }));

  // Calculate portfolio metrics
  const totalPnL = recentTrades.reduce((sum, trade) => sum + (trade.pnl || 0), 0);
  const winRate = recentTrades.length > 0 
    ? (recentTrades.filter(trade => (trade.pnl || 0) > 0).length / recentTrades.length) * 100 
    : 0;
  const activeRules = 3; // Mock data
  const disciplineScore = 85; // Mock data

  if (loading) {
    return (
      <AppShell currentPage="dashboard">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-surface rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
    <AppShell currentPage="dashboard">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
            <p className="text-text-secondary mt-1">
              Welcome back! Here's your trading overview.
            </p>
          </div>
          <WalletConnect />
        </div>

        {/* Key Metrics */}
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
                  <p className="text-sm text-text-secondary">Active Rules</p>
                  <p className="text-2xl font-bold text-text-primary">{activeRules}</p>
                </div>
                <div className="p-3 rounded-lg bg-accent/20">
                  <Activity className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Discipline Score</p>
                  <p className="text-2xl font-bold text-text-primary">{disciplineScore}%</p>
                </div>
                <div className="p-3 rounded-lg bg-warning/20">
                  <Users className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Market Data */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Price Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>BTC/USD Price Chart</CardTitle>
              <CardDescription>24-hour price movement</CardDescription>
            </CardHeader>
            <CardContent>
              <Chart data={chartData} height={300} />
            </CardContent>
          </Card>

          {/* Market Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Market Overview</CardTitle>
              <CardDescription>Top trading pairs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {marketData.slice(0, 4).map((market) => (
                <div key={market.symbol} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-text-primary">{market.symbol}</p>
                    <p className="text-sm text-text-secondary">{formatCurrency(market.price)}</p>
                  </div>
                  <Badge variant={market.change24h >= 0 ? 'success' : 'danger'}>
                    {formatPercentage(market.change24h)}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Trades */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Trades</CardTitle>
                  <CardDescription>Your latest trading activity</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTrades.slice(0, 3).map((trade) => (
                <div key={trade.tradeId} className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                  <div>
                    <p className="font-medium text-text-primary">{trade.symbol}</p>
                    <p className="text-sm text-text-secondary">
                      {trade.side.toUpperCase()} • {formatCurrency(trade.entryPrice)}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={trade.status === 'open' ? 'warning' : 'success'}>
                      {trade.status}
                    </Badge>
                    {trade.pnl !== undefined && (
                      <p className={`text-sm font-medium ${trade.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                        {formatCurrency(trade.pnl)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common trading tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="h-4 w-4 mr-3" />
                Add Journal Entry
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Target className="h-4 w-4 mr-3" />
                Create Automation Rule
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <AlertTriangle className="h-4 w-4 mr-3" />
                Check Slippage Analysis
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <DollarSign className="h-4 w-4 mr-3" />
                Execute Quick Trade
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Trading Alerts
            </CardTitle>
            <CardDescription>Important notifications and rule violations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <p className="font-medium text-text-primary">Risk Management Alert</p>
                  <p className="text-sm text-text-secondary">
                    Your position size on ETH/USD exceeds 5% of portfolio. Consider reducing exposure.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                <Target className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium text-text-primary">Automation Success</p>
                  <p className="text-sm text-text-secondary">
                    BTC buy order executed at $45,200 according to your DCA rule.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
