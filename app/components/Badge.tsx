import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';
  className?: string;
  style?: React.CSSProperties;
}

export function Badge({ children, variant = 'default', className, style }: BadgeProps) {
  const variants = {
    default: 'bg-accent text-bg',
    secondary: 'bg-surface text-text-primary border border-border',
    success: 'bg-success text-white',
    warning: 'bg-warning text-bg',
    danger: 'bg-danger text-white',
    outline: 'border border-current text-current bg-transparent',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 text-xs font-medium rounded-md',
        variants[variant],
        className
      )}
      style={style}
    >
      {children}
    </span>
  );
}
