import { useState } from 'react';
import { Check, X, Eye, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { RecommendationItem } from '../../types/ui';
import { DomainTag } from '../ui/Tag';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatDate } from '../../utils/formatters';

const PRIORITY_CONFIG = {
  critical: {
    border: 'border-l-accent-red',
    badge: 'critical' as const,
    label: 'CRITICAL',
    barColor: 'bg-accent-red',
  },
  moderate: {
    border: 'border-l-accent-amber',
    badge: 'warning' as const,
    label: 'MODERATE',
    barColor: 'bg-accent-amber',
  },
  informational: {
    border: 'border-l-accent-blue',
    badge: 'info' as const,
    label: 'INFO',
    barColor: 'bg-accent-blue',
  },
};

interface RecommendationCardProps {
  recommendation: RecommendationItem;
  compact?: boolean;
}

export function RecommendationCard({ recommendation, compact }: RecommendationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [actioned, setActioned] = useState(recommendation.status === 'actioned');
  const config = PRIORITY_CONFIG[recommendation.priority];

  return (
    <div
      className={cn(
        'glass-card overflow-hidden border-l-2 transition-all duration-150',
        `border-l-[${config.barColor}]`,
        actioned && 'opacity-50',
        recommendation.priority === 'critical' ? 'border-l-accent-red' :
        recommendation.priority === 'moderate' ? 'border-l-accent-amber' : 'border-l-accent-blue'
      )}
    >
      <div className={cn('p-4', compact ? 'space-y-2' : 'space-y-3')}>
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={config.badge} label={config.label} size="sm" dot />
            {recommendation.domains.map((d) => (
              <DomainTag key={d} domain={d} size="sm" />
            ))}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-accent-purple" />
            <span className="text-[10px] text-accent-purple font-medium">AI</span>
          </div>
        </div>

        {/* Title */}
        <p className="text-sm font-semibold text-text-primary">{recommendation.title}</p>

        {/* Summary */}
        <p className={cn('text-xs text-text-secondary leading-relaxed', compact && !expanded ? 'line-clamp-2' : '')}>
          {recommendation.summary}
        </p>

        {/* Action (expanded) */}
        {expanded && (
          <div className="rounded-lg bg-accent-blue/8 border border-accent-blue/20 p-3 animate-fade-in">
            <p className="text-[11px] font-semibold text-accent-blue mb-1">Recommended Action</p>
            <p className="text-[11px] text-text-secondary leading-relaxed">{recommendation.action}</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div>
            <p className="text-[10px] text-text-muted">{recommendation.source}</p>
            <p className="text-[10px] text-text-muted">{formatDate(recommendation.timestamp)}</p>
          </div>
          <div className="flex items-center gap-1.5">
            {!compact && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-[11px] text-text-muted hover:text-text-secondary transition-colors"
              >
                {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {expanded ? 'Less' : 'Action'}
              </button>
            )}
            {!actioned && (
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Check className="h-3.5 w-3.5 text-accent-teal" />}
                onClick={() => setActioned(true)}
                className="text-accent-teal hover:bg-emerald-500/10"
              >
                Done
              </Button>
            )}
            {actioned && (
              <span className="flex items-center gap-1 text-xs text-accent-teal">
                <Check className="h-3.5 w-3.5" /> Actioned
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
