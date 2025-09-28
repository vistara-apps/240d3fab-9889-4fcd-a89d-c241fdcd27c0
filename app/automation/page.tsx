'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Toggle } from '../components/Toggle';
import { Badge } from '../components/Badge';
import { TradingRule } from '@/lib/types';
import { TRADING_PAIRS, ORDER_TYPES } from '@/lib/constants';
import { 
  Plus, 
  Target, 
  Play, 
  Pause, 
  Settings2, 
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export default function Automation() {
  const [rules, setRules] = useState<TradingRule[]>([]);
  const [showNewRuleForm, setShowNewRuleForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load automation rules
    const loadRules = async () => {
      setLoading(true);
      
      // Mock automation rules
      const mockRules: TradingRule[] = [
        {
          ruleId: 'rule_1',
          userId: 'user_1',
          name: 'BTC DCA Strategy',
          description: 'Buy BTC every week when RSI < 30',
          type: 'entry',
          parameters: {
            symbol: 'BTC/USD',
            indicator: 'RSI',
            condition: 'less_than',
            value: 30,
            orderType: 'market',
            amount: 100,
            frequency: 'weekly'
          },
          isActive: true,
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-15'),
        },
        {
          ruleId: 'rule_2',
          userId: 'user_1',
          name: 'ETH Profit Taking',
          description: 'Sell 25% of ETH position when price increases 20%',
          type: 'exit',
          parameters: {
            symbol: 'ETH/USD',
            condition: 'price_increase',
            percentage: 20,
            sellPercentage: 25,
            orderType: 'limit'
          },
          isActive: false,
          createdAt: new Date('2024-01-10'),
          updatedAt: new Date('2024-01-20'),
        },
        {
          ruleId: 'rule_3',
          userId: 'user_1',
          name: 'Stop Loss Protection',
          description: 'Set stop loss at 5% below entry for all positions',
          type: 'risk_management',
          parameters: {
            stopLossPercentage: 5,
            applyToAll: true,
            orderType: 'stop_limit'
          },
          isActive: true,
          createdAt: new Date('2024-01-05'),
          updatedAt: new Date('2024-01-05'),
        },
      ];
      
      setRules(mockRules);
      setLoading(false);
    };

    loadRules();
  }, []);

  const toggleRule = (ruleId: string) => {
    setRules(prev => prev.map(rule => 
      rule.ruleId === ruleId 
        ? { ...rule, isActive: !rule.isActive, updatedAt: new Date() }
        : rule
    ));
  };

  const getRuleTypeIcon = (type: string) => {
    switch (type) {
      case 'entry':
        return <TrendingUp className="h-4 w-4" />;
      case 'exit':
        return <Target className="h-4 w-4" />;
      case 'risk_management':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Settings2 className="h-4 w-4" />;
    }
  };

  const getRuleTypeColor = (type: string) => {
    switch (type) {
      case 'entry':
        return 'success';
      case 'exit':
        return 'warning';
      case 'risk_management':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <AppShell currentPage="automation">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-surface rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-surface rounded-lg"></div>
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell currentPage="automation">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Automation</h1>
            <p className="text-text-secondary mt-1">
              Set up rules to automate your trading strategy
            </p>
          </div>
          <Button onClick={() => setShowNewRuleForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Rule
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-text-primary">{rules.length}</p>
                <p className="text-sm text-text-secondary">Total Rules</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">
                  {rules.filter(r => r.isActive).length}
                </p>
                <p className="text-sm text-text-secondary">Active Rules</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">24</p>
                <p className="text-sm text-text-secondary">Executions Today</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">98.5%</p>
                <p className="text-sm text-text-secondary">Success Rate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rule Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-success/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Entry Rules</h3>
                  <p className="text-sm text-text-secondary">Automated buy conditions</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-text-primary">
                {rules.filter(r => r.type === 'entry').length}
              </p>
            </CardContent>
          </Card>

          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-warning/20 rounded-lg">
                  <Target className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Exit Rules</h3>
                  <p className="text-sm text-text-secondary">Automated sell conditions</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-text-primary">
                {rules.filter(r => r.type === 'exit').length}
              </p>
            </CardContent>
          </Card>

          <Card className="metric-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-danger/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-danger" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Risk Management</h3>
                  <p className="text-sm text-text-secondary">Protection rules</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-text-primary">
                {rules.filter(r => r.type === 'risk_management').length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Automation Rules */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">Your Automation Rules</h2>
          
          {rules.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Target className="h-12 w-12 text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">No automation rules</h3>
                <p className="text-text-secondary mb-4">
                  Create your first automation rule to start trading automatically
                </p>
                <Button onClick={() => setShowNewRuleForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Rule
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {rules.map((rule) => (
                <Card key={rule.ruleId} className="hover:bg-opacity-80 transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          rule.type === 'entry' ? 'bg-success/20' :
                          rule.type === 'exit' ? 'bg-warning/20' : 'bg-danger/20'
                        }`}>
                          {getRuleTypeIcon(rule.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{rule.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={getRuleTypeColor(rule.type) as any}>
                              {rule.type.replace('_', ' ')}
                            </Badge>
                            <Badge variant={rule.isActive ? 'success' : 'secondary'}>
                              {rule.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Toggle
                        checked={rule.isActive}
                        onChange={() => toggleRule(rule.ruleId)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-text-secondary mb-4">{rule.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Created:</span>
                        <span className="text-text-primary">
                          {rule.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Last Updated:</span>
                        <span className="text-text-primary">
                          {rule.updatedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings2 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        variant={rule.isActive ? 'secondary' : 'primary'} 
                        size="sm" 
                        className="flex-1"
                        onClick={() => toggleRule(rule.ruleId)}
                      >
                        {rule.isActive ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Activate
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Recent Executions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Executions</CardTitle>
            <CardDescription>Latest automated trades and rule triggers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  rule: 'BTC DCA Strategy',
                  action: 'Buy BTC',
                  amount: '$100',
                  price: '$45,200',
                  time: '2 hours ago',
                  status: 'success'
                },
                {
                  rule: 'Stop Loss Protection',
                  action: 'Set Stop Loss',
                  amount: 'ETH Position',
                  price: '$2,850',
                  time: '4 hours ago',
                  status: 'success'
                },
                {
                  rule: 'ETH Profit Taking',
                  action: 'Sell ETH',
                  amount: '0.5 ETH',
                  price: '$3,100',
                  time: '1 day ago',
                  status: 'failed'
                },
              ].map((execution, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      execution.status === 'success' ? 'bg-success/20' : 'bg-danger/20'
                    }`}>
                      {execution.status === 'success' ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-danger" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{execution.rule}</p>
                      <p className="text-sm text-text-secondary">
                        {execution.action} • {execution.amount} @ {execution.price}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={execution.status === 'success' ? 'success' : 'danger'}>
                      {execution.status}
                    </Badge>
                    <p className="text-xs text-text-secondary mt-1">{execution.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* New Rule Form Modal */}
        {showNewRuleForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Create New Automation Rule</CardTitle>
                <CardDescription>Set up automated trading conditions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Rule name"
                    label="Rule Name"
                  />
                  <Select
                    options={[
                      { value: 'entry', label: 'Entry Rule' },
                      { value: 'exit', label: 'Exit Rule' },
                      { value: 'risk_management', label: 'Risk Management' },
                    ]}
                    placeholder="Select rule type"
                    label="Rule Type"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    options={TRADING_PAIRS.map(pair => ({ value: pair, label: pair }))}
                    placeholder="Select trading pair"
                    label="Trading Pair"
                  />
                  <Select
                    options={ORDER_TYPES}
                    placeholder="Select order type"
                    label="Order Type"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Conditions
                  </label>
                  <div className="space-y-3 p-4 bg-surface/50 rounded-lg">
                    <div className="grid grid-cols-3 gap-2">
                      <Select
                        options={[
                          { value: 'price', label: 'Price' },
                          { value: 'rsi', label: 'RSI' },
                          { value: 'macd', label: 'MACD' },
                          { value: 'volume', label: 'Volume' },
                        ]}
                        placeholder="Indicator"
                      />
                      <Select
                        options={[
                          { value: 'greater_than', label: '>' },
                          { value: 'less_than', label: '<' },
                          { value: 'equals', label: '=' },
                          { value: 'crosses_above', label: 'Crosses Above' },
                          { value: 'crosses_below', label: 'Crosses Below' },
                        ]}
                        placeholder="Condition"
                      />
                      <Input
                        type="number"
                        placeholder="Value"
                        step="0.01"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Condition
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="0.00"
                    label="Amount (USD)"
                    step="0.01"
                  />
                  <Input
                    type="number"
                    placeholder="0"
                    label="Max Executions (0 = unlimited)"
                    step="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Description
                  </label>
                  <textarea
                    className="input-field w-full h-20 resize-none"
                    placeholder="Describe what this rule does..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowNewRuleForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      // Handle form submission
                      setShowNewRuleForm(false);
                    }}
                  >
                    Create Rule
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
