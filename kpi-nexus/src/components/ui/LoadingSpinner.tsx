import { cn } from '../../utils/cn';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE: Record<string, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-[3px]',
};

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'rounded-full border-bg-border border-t-accent-blue animate-spin',
        SIZE[size],
        className
      )}
    />
  );
}

export function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn('skeleton rounded-lg', className)} />;
}

export function CardSkeleton() {
  return (
    <div className="glass-card p-5 space-y-3">
      <SkeletonBlock className="h-4 w-1/3" />
      <SkeletonBlock className="h-8 w-1/2" />
      <SkeletonBlock className="h-3 w-2/3" />
    </div>
  );
}
