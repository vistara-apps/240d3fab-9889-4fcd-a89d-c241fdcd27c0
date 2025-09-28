import { formatDate, formatCurrency, formatPercentage } from '@/lib/utils';
import { Trade, EmotionTag } from '@/lib/types';
import { EMOTION_TAGS } from '@/lib/constants';
import { Card, CardContent } from './Card';
import { Badge } from './Badge';

interface JournalEntryProps {
  trade: Trade;
  onClick?: () => void;
}

export function JournalEntry({ trade, onClick }: JournalEntryProps) {
  const getEmotionTag = (emotionId: string): EmotionTag | undefined => {
    return EMOTION_TAGS.find(tag => tag.id === emotionId);
  };

  const beforeEmotion = trade.emotionBefore ? getEmotionTag(trade.emotionBefore) : null;
  const afterEmotion = trade.emotionAfter ? getEmotionTag(trade.emotionAfter) : null;

  const pnlColor = trade.pnl && trade.pnl > 0 ? 'text-success' : 'text-danger';

  return (
    <Card variant="interactive" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold text-text-primary">{trade.symbol}</h4>
            <p className="text-sm text-text-secondary">{formatDate(trade.entryTime)}</p>
          </div>
          <div className="text-right">
            <Badge variant={trade.status === 'open' ? 'warning' : trade.status === 'closed' ? 'success' : 'secondary'}>
              {trade.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <p className="text-xs text-text-secondary">Entry Price</p>
            <p className="font-medium text-text-primary">{formatCurrency(trade.entryPrice)}</p>
          </div>
          {trade.exitPrice && (
            <div>
              <p className="text-xs text-text-secondary">Exit Price</p>
              <p className="font-medium text-text-primary">{formatCurrency(trade.exitPrice)}</p>
            </div>
          )}
        </div>

        {trade.pnl !== undefined && (
          <div className="mb-3">
            <p className="text-xs text-text-secondary">P&L</p>
            <p className={`font-semibold ${pnlColor}`}>
              {formatCurrency(trade.pnl)} ({formatPercentage((trade.pnl / (trade.entryPrice * trade.quantity)) * 100)})
            </p>
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          {beforeEmotion && (
            <Badge variant="outline" style={{ borderColor: beforeEmotion.color, color: beforeEmotion.color }}>
              Before: {beforeEmotion.label}
            </Badge>
          )}
          {afterEmotion && (
            <Badge variant="outline" style={{ borderColor: afterEmotion.color, color: afterEmotion.color }}>
              After: {afterEmotion.label}
            </Badge>
          )}
        </div>

        {trade.notes && (
          <p className="text-sm text-text-secondary italic">{trade.notes}</p>
        )}
      </CardContent>
    </Card>
  );
}
