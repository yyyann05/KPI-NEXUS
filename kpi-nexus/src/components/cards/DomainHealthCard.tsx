import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, AlertTriangle, ChevronRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '../../utils/cn';
import { DOMAIN_CONFIG } from '../../constants/domains';
import type { DomainHealthSummary } from '../../types/kpi';
import type { DomainType } from '../../types/kpi';
import { Badge } from '../ui/Badge';

const DOMAIN_ROUTES: Record<DomainType, string> = {
  Financial: '/domain/financial',
  Workforce: '/domain/workforce',
  'Customer Experience': '/domain/customer-experience',
  Project: '/domain/project',
};

const DOMAIN_ICONS: Record<DomainType, string> = {
  Financial: '💰',
  Workforce: '👥',
  'Customer Experience': '💙',
  Project: '📁',
};

interface DomainHealthCardProps {
  data: DomainHealthSummary;
}

export function DomainHealthCard({ data }: DomainHealthCardProps) {
  const navigate = useNavigate();
  const config = DOMAIN_CONFIG[data.domain];
  const isPositive = data.deltaPercent > 0;
  const invertBad: DomainType[] = [];
  const anomalyBadge = data.anomalyCount >= 4 ? 'critical' : data.anomalyCount >= 2 ? 'warning' : 'success';

  const sparkData = data.sparklineData.map((v, i) => ({ i, v }));

  return (
    <div
      className="glass-card p-5 cursor-pointer hover:border-bg-border/80 hover:shadow-elevated group transition-all duration-150 relative overflow-hidden"
      style={{ borderTopColor: `${config.color}50`, borderTopWidth: 2 }}
      onClick={() => navigate(DOMAIN_ROUTES[data.domain])}
    >
      {/* Subtle domain glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${config.color}08 0%, transparent 60%)` }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-base"
            style={{ backgroundColor: `${config.color}18`, border: `1px solid ${config.color}30` }}
          >
            {DOMAIN_ICONS[data.domain]}
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">{data.domain}</p>
            <p className="text-[11px] text-text-muted">{data.primaryKpi}</p>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-text-muted group-hover:text-text-secondary group-hover:translate-x-0.5 transition-all duration-150" />
      </div>

      {/* Primary Metric */}
      <div className="mb-3">
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold tracking-tight text-text-primary" style={{ color: config.color }}>
            {data.primaryValue}
          </span>
          <span className="text-sm text-text-secondary mb-0.5">{data.primaryUnit}</span>
        </div>

        {/* Delta */}
        <div className={cn('flex items-center gap-1 mt-1', isPositive ? 'text-accent-teal' : 'text-accent-red')}>
          {isPositive
            ? <ArrowUpRight className="h-3.5 w-3.5" />
            : <ArrowDownRight className="h-3.5 w-3.5" />}
          <span className="text-xs font-semibold">{Math.abs(data.deltaPercent)}% vs prior month</span>
        </div>
      </div>

      {/* Sparkline */}
      <div className="h-12 -mx-1 mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparkData}>
            <Line
              type="monotone"
              dataKey="v"
              stroke={config.color}
              strokeWidth={1.5}
              dot={false}
              strokeOpacity={0.8}
            />
            <Tooltip
              contentStyle={{ display: 'none' }}
              cursor={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-bg-border">
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="h-3 w-3 text-text-muted" />
          <span className="text-[11px] text-text-muted">{data.anomalyCount} trend anomalies</span>
        </div>
        <Badge
          variant={anomalyBadge}
          label={data.status === 'healthy' ? 'Healthy' : data.status === 'warning' ? 'Watch' : 'Alert'}
          size="sm"
        />
      </div>
    </div>
  );
}
