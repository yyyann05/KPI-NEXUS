import { cn } from '../../utils/cn';
import type { DomainType } from '../../types/kpi';
import { DOMAIN_CONFIG } from '../../constants/domains';

interface DomainTagProps {
  domain: DomainType;
  size?: 'sm' | 'md';
  className?: string;
}

export function DomainTag({ domain, size = 'sm', className }: DomainTagProps) {
  const config = DOMAIN_CONFIG[domain];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        className
      )}
      style={{
        backgroundColor: `${config.color}18`,
        color: config.color,
        border: `1px solid ${config.color}35`,
      }}
    >
      {domain}
    </span>
  );
}

interface TagProps {
  label: string;
  color?: string;
  className?: string;
}

export function Tag({ label, color, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium bg-bg-elevated text-text-secondary border border-bg-border',
        className
      )}
      style={color ? { color, borderColor: `${color}35`, backgroundColor: `${color}12` } : {}}
    >
      {label}
    </span>
  );
}
