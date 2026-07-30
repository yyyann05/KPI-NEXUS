import { cn } from '../../utils/cn';

type BadgeVariant = 'critical' | 'warning' | 'info' | 'success' | 'muted' | 'purple';

interface BadgeProps {
  variant?: BadgeVariant;
  label: string;
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  critical: 'bg-red-500/15 text-accent-red border border-red-500/30',
  warning: 'bg-amber-500/15 text-accent-amber border border-amber-500/30',
  info: 'bg-blue-500/15 text-accent-blue border border-blue-500/30',
  success: 'bg-emerald-500/15 text-accent-teal border border-emerald-500/30',
  muted: 'bg-bg-elevated text-text-secondary border border-bg-border',
  purple: 'bg-purple-500/15 text-accent-purple border border-purple-500/30',
};

const DOT_STYLES: Record<BadgeVariant, string> = {
  critical: 'bg-accent-red',
  warning: 'bg-accent-amber',
  info: 'bg-accent-blue',
  success: 'bg-accent-teal',
  muted: 'bg-text-muted',
  purple: 'bg-accent-purple',
};

export function Badge({ variant = 'info', label, size = 'md', dot = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        VARIANT_STYLES[variant],
        className
      )}
    >
      {dot && (
        <span className={cn('h-1.5 w-1.5 rounded-full animate-pulse-soft', DOT_STYLES[variant])} />
      )}
      {label}
    </span>
  );
}
