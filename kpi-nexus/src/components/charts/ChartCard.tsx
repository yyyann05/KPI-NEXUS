import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface Props {
  title: string;
  subtitle?: string;
  accentColor?: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
  badge?: ReactNode;
}

export default function ChartCard({
  title, subtitle, accentColor = '#4F8EF7',
  children, className, actions, badge,
}: Props) {
  return (
    <div
      className={cn(
        'bg-[#1A1D27] rounded-xl border border-white/[0.06] overflow-hidden',
        className,
      )}
    >
      {/* Accent top border */}
      <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />

      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-4 pb-2">
        <div>
          <h3 className="text-sm font-semibold text-white/90">{title}</h3>
          {subtitle && <p className="text-xs text-white/40 mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {badge}
          {actions}
        </div>
      </div>

      {/* Chart content */}
      <div className="px-2 pb-4">{children}</div>
    </div>
  );
}
