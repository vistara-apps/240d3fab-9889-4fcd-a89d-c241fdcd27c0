'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  timestamp: string;
  price: number;
  volume?: number;
}

interface ChartProps {
  data: ChartData[];
  variant?: 'line' | 'candlestick';
  height?: number;
}

export function Chart({ data, variant = 'line', height = 300 }: ChartProps) {
  if (variant === 'line') {
    return (
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="timestamp" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                color: 'var(--color-text-primary)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="var(--color-accent)" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Placeholder for candlestick chart
  return (
    <div 
      className="flex items-center justify-center bg-surface rounded-lg border border-border"
      style={{ height }}
    >
      <p className="text-text-secondary">Candlestick chart coming soon</p>
    </div>
  );
}
