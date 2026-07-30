import { type ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  accentColor?: string;
  onClick?: () => void;
}

export function Card({
  title,
  subtitle,
  actions,
  children,
  className,
  noPadding,
  accentColor,
  onClick,
}: CardProps) {
  return (
    <div
      className={cn(
        'glass-card relative overflow-hidden transition-all duration-150',
        onClick && 'cursor-pointer hover:border-accent-blue/40 hover:shadow-elevated',
        className
      )}
      onClick={onClick}
    >
      {accentColor && (
        <div
          className="absolute top-0 left-0 w-full h-0.5"
          style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
        />
      )}
      {(title || actions) && (
        <div className={cn('flex items-start justify-between gap-3', noPadding ? 'px-5 pt-5' : 'px-5 pt-5 pb-0')}>
          {title && (
            <div>
              <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
              {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
            </div>
          )}
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
      )}
      <div className={cn(!noPadding && 'p-5', title && !noPadding && 'pt-4')}>{children}</div>
    </div>
  );
}
