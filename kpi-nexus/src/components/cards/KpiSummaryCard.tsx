import { cn } from '../../utils/cn';
import { getDeltaArrow, getDeltaClass } from '../../utils/formatters';

interface KpiSummaryCardProps {
  label: string;
  value: string;
  delta: number;
  invertColors?: boolean;
  className?: string;
}

export function KpiSummaryCard({ label, value, delta, invertColors = false, className }: KpiSummaryCardProps) {
  const deltaClass = getDeltaClass(delta, invertColors);
  const arrow = getDeltaArrow(delta);

  return (
    <div className={cn('glass-card p-4 hover:shadow-elevated transition-all duration-150', className)}>
      <p className="text-[11px] font-medium text-text-muted uppercase tracking-wide">{label}</p>
      <p className="text-xl font-bold text-text-primary mt-1">{value}</p>
      <div className={cn('flex items-center gap-1 mt-1 text-xs font-semibold', deltaClass)}>
        <span>{arrow}</span>
        <span>{Math.abs(delta)}% MoM</span>
      </div>
    </div>
  );
}
