import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lightbulb, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { CrossDomainInsight } from '../../types/kpi';
import { DomainTag } from '../ui/Tag';
import { Badge } from '../ui/Badge';

interface InsightCardProps {
  insight: CrossDomainInsight;
  compact?: boolean;
}

export function InsightCard({ insight, compact }: InsightCardProps) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const isPositive = insight.correlation > 0;
  const absCorr = Math.abs(insight.correlation);
  const strength = absCorr >= 0.5 ? 'Strong' : absCorr >= 0.3 ? 'Moderate' : 'Weak';
  const corrBadge = absCorr >= 0.5 ? 'warning' : 'info';

  return (
    <div className="glass-card p-4 space-y-3 hover:shadow-elevated transition-all duration-150">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <DomainTag domain={insight.driverDomain} size="sm" />
          <ArrowRight className="h-3.5 w-3.5 text-text-muted shrink-0" />
          <DomainTag domain={insight.targetDomain} size="sm" />
        </div>
        <Badge
          variant={corrBadge}
          label={`${strength} r=${insight.correlation > 0 ? '+' : ''}${insight.correlation.toFixed(2)}`}
          size="sm"
        />
      </div>

      {/* KPI relationship */}
      <div>
        <p className="text-xs font-semibold text-text-primary">
          {insight.driverKpi.replace(/_/g, ' ')}
          <span className="text-text-muted font-normal"> → </span>
          {insight.targetKpi.replace(/_/g, ' ')}
        </p>
        <p className={cn('text-[11px] text-text-muted mt-0.5', compact && !expanded ? 'line-clamp-2' : '')}>
          {insight.plainEnglishSummary}
        </p>
      </div>

      {/* Alert */}
      {insight.alertText && (
        <div className="flex items-start gap-2 rounded-lg bg-amber-500/10 border border-amber-500/25 px-3 py-2">
          <AlertCircle className="h-3.5 w-3.5 text-accent-amber shrink-0 mt-0.5" />
          <p className="text-[11px] text-accent-amber">{insight.alertText}</p>
        </div>
      )}

      {/* Recommendation (expanded) */}
      {expanded && insight.recommendedAction && (
        <div className="flex items-start gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/25 px-3 py-2 animate-fade-in">
          <CheckCircle2 className="h-3.5 w-3.5 text-accent-teal shrink-0 mt-0.5" />
          <p className="text-[11px] text-accent-teal">{insight.recommendedAction}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] text-text-muted">{insight.monthsOfData} months · p={insight.pValue.toFixed(4)}</span>
        <div className="flex items-center gap-2">
          {insight.recommendedAction && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-[11px] text-accent-purple hover:text-purple-300 transition-colors"
            >
              <Lightbulb className="h-3 w-3" />
              {expanded ? 'Hide action' : 'View action'}
            </button>
          )}
          <button
            onClick={() => navigate('/cross-domain')}
            className="flex items-center gap-1 text-[11px] text-accent-blue hover:text-blue-400 transition-colors"
          >
            Investigate
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
