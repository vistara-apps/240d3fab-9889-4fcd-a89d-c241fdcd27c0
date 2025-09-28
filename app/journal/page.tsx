'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { JournalEntry } from '../components/JournalEntry';
import { Badge } from '../components/Badge';
import { generateMockTrades } from '@/lib/utils';
import { Trade } from '@/lib/types';
import { EMOTION_TAGS, TRADING_PAIRS } from '@/lib/constants';
import { Plus, Search, Filter, BookOpen } from 'lucide-react';

export default function Journal() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [filteredTrades, setFilteredTrades] = useState<Trade[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [emotionFilter, setEmotionFilter] = useState('');
  const [showNewEntryForm, setShowNewEntryForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load trades data
    const loadTrades = async () => {
      setLoading(true);
      const mockTrades = generateMockTrades('user_1', 15);
      setTrades(mockTrades);
      setFilteredTrades(mockTrades);
      setLoading(false);
    };

    loadTrades();
  }, []);

  useEffect(() => {
    // Filter trades based on search and filters
    let filtered = trades;

    if (searchTerm) {
      filtered = filtered.filter(trade => 
        trade.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trade.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(trade => trade.status === statusFilter);
    }

    if (emotionFilter) {
      filtered = filtered.filter(trade => 
        trade.emotionBefore === emotionFilter || trade.emotionAfter === emotionFilter
      );
    }

    setFilteredTrades(filtered);
  }, [trades, searchTerm, statusFilter, emotionFilter]);

  const handleNewEntry = () => {
    setShowNewEntryForm(true);
  };

  const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'closed', label: 'Closed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const emotionOptions = EMOTION_TAGS.map(tag => ({
    value: tag.id,
    label: tag.label,
  }));

  if (loading) {
    return (
      <AppShell currentPage="journal">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-surface rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-surface rounded-lg"></div>
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell currentPage="journal">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Trade Journal</h1>
            <p className="text-text-secondary mt-1">
              Track your trades and emotional patterns
            </p>
          </div>
          <Button onClick={handleNewEntry}>
            <Plus className="h-4 w-4 mr-2" />
            New Entry
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-text-primary">{trades.length}</p>
                <p className="text-sm text-text-secondary">Total Trades</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">
                  {trades.filter(t => (t.pnl || 0) > 0).length}
                </p>
                <p className="text-sm text-text-secondary">Winning Trades</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-danger">
                  {trades.filter(t => (t.pnl || 0) < 0).length}
                </p>
                <p className="text-sm text-text-secondary">Losing Trades</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">
                  {trades.filter(t => t.status === 'open').length}
                </p>
                <p className="text-sm text-text-secondary">Open Positions</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Search trades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder="Filter by status"
              />
              <Select
                options={emotionOptions}
                value={emotionFilter}
                onChange={setEmotionFilter}
                placeholder="Filter by emotion"
              />
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Emotion Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Emotional Patterns</CardTitle>
            <CardDescription>Your most common emotions before and after trades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {EMOTION_TAGS.slice(0, 8).map((emotion) => {
                const count = trades.filter(t => 
                  t.emotionBefore === emotion.id || t.emotionAfter === emotion.id
                ).length;
                
                return (
                  <Badge 
                    key={emotion.id}
                    variant="outline"
                    style={{ borderColor: emotion.color, color: emotion.color }}
                  >
                    {emotion.label} ({count})
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Trade Entries */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">
              Trade Entries ({filteredTrades.length})
            </h2>
          </div>

          {filteredTrades.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="h-12 w-12 text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No trades found</h3>
                <p className="text-text-secondary mb-4">
                  {trades.length === 0 
                    ? "Start by adding your first trade entry"
                    : "Try adjusting your search or filter criteria"
                  }
                </p>
                <Button onClick={handleNewEntry}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Entry
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrades.map((trade) => (
                <JournalEntry
                  key={trade.tradeId}
                  trade={trade}
                  onClick={() => {
                    // Handle trade entry click - could open detailed view
                    console.log('Trade clicked:', trade.tradeId);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* New Entry Form Modal */}
        {showNewEntryForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>New Trade Entry</CardTitle>
                <CardDescription>Record your trade details and emotions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    options={TRADING_PAIRS.map(pair => ({ value: pair, label: pair }))}
                    placeholder="Select trading pair"
                    label="Trading Pair"
                  />
                  <Select
                    options={[
                      { value: 'buy', label: 'Buy' },
                      { value: 'sell', label: 'Sell' },
                    ]}
                    placeholder="Select side"
                    label="Side"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="0.00"
                    label="Entry Price"
                    step="0.01"
                  />
                  <Input
                    type="number"
                    placeholder="0.00"
                    label="Quantity"
                    step="0.001"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    options={emotionOptions}
                    placeholder="How did you feel before?"
                    label="Emotion Before Trade"
                  />
                  <Select
                    options={emotionOptions}
                    placeholder="How do you feel after?"
                    label="Emotion After Trade"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Notes
                  </label>
                  <textarea
                    className="input-field w-full h-24 resize-none"
                    placeholder="Add any notes about this trade..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowNewEntryForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      // Handle form submission
                      setShowNewEntryForm(false);
                    }}
                  >
                    Save Entry
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  );
}
