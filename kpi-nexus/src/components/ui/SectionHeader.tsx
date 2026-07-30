import { type ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  rightContent?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, subtitle, rightContent, icon, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-4', className)}>
      <div className="flex items-center gap-2.5">
        {icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg-elevated text-text-secondary">
            {icon}
          </span>
        )}
        <div>
          <h2 className="text-base font-semibold text-text-primary">{title}</h2>
          {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {rightContent && <div className="shrink-0">{rightContent}</div>}
    </div>
  );
}
