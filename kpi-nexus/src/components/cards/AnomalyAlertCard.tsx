import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { DOMAIN_CONFIG } from '../../constants/domains';
import type { AlertItem } from '../../types/ui';
import { formatDate, getSeverityLabel } from '../../utils/formatters';
import { Badge } from '../ui/Badge';
import { DomainTag } from '../ui/Tag';

interface AnomalyAlertCardProps {
  alert: AlertItem;
  compact?: boolean;
}

export function AnomalyAlertCard({ alert, compact }: AnomalyAlertCardProps) {
  const navigate = useNavigate();
  const config = DOMAIN_CONFIG[alert.domain];
  const severityLevel = getSeverityLabel(alert.severityScore);

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-xl border bg-bg-elevated/50 cursor-pointer hover:bg-bg-elevated transition-all duration-150 group',
        compact ? 'p-3' : 'p-4',
        severityLevel === 'critical' ? 'border-red-500/30' : 'border-bg-border'
      )}
      style={{ borderLeftColor: config.color, borderLeftWidth: 3 }}
      onClick={() => navigate(`/anomalies?domain=${alert.domain}&kpi=${alert.kpiName}`)}
    >
      {/* Icon */}
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-lg',
          compact ? 'h-7 w-7' : 'h-9 w-9'
        )}
        style={{ backgroundColor: `${config.color}18` }}
      >
        <AlertTriangle
          className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'}
          style={{ color: config.color }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <DomainTag domain={alert.domain} size="sm" />
          <span className="text-xs font-semibold text-text-primary truncate">
            {alert.kpiName.replace(/_/g, ' ')}
          </span>
        </div>

        {!compact && (
          <div className="flex flex-col gap-0.5 mt-1">
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-text-muted">
                Actual: <span className="text-text-secondary font-medium">{alert.actualValue.toFixed(2)}</span>
              </span>
              <span className="text-[11px] text-text-muted">
                Expected: <span className="text-text-secondary font-medium">{alert.expectedValue.toFixed(2)}</span>
              </span>
            </div>
            {alert.projectedValue !== undefined && alert.projectedPctChange !== undefined && (
              <span className="text-[11px] text-text-muted">
                Projected: <span className="text-text-secondary font-medium">{alert.projectedValue.toLocaleString()}</span>
                <span className={cn('ml-1 font-semibold', alert.projectedPctChange >= 0 ? 'text-green-400' : 'text-red-400')}>
                  ({alert.projectedPctChange > 0 ? '+' : ''}{alert.projectedPctChange.toFixed(1)}%)
                </span>
              </span>
            )}
            {alert.escalationTier && alert.escalationTier !== 'Low' && (
              <span className="text-[11px] text-amber-400 font-medium">↑ Escalated to {alert.escalationNotify}</span>
            )}
          </div>
        )}

        <p className="text-[11px] text-text-muted mt-0.5">{formatDate(alert.date)}</p>
      </div>

      {/* Severity */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <Badge
          variant={severityLevel === 'critical' ? 'critical' : severityLevel === 'warning' ? 'warning' : 'info'}
          label={`${alert.severityScore.toFixed(1)}`}
          size="sm"
        />
        <ArrowRight className="h-3.5 w-3.5 text-text-muted group-hover:text-text-secondary group-hover:translate-x-0.5 transition-all duration-150" />
      </div>
    </div>
  );
}
