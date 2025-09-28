import { cn } from '@/lib/utils';

interface NotificationBadgeProps {
  count: number;
  className?: string;
}

export function NotificationBadge({ count, className }: NotificationBadgeProps) {
  if (count === 0) return null;

  return (
    <span
      className={cn(
        'absolute -top-1 -right-1 h-5 w-5 rounded-full bg-danger text-white text-xs font-medium flex items-center justify-center',
        className
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}
