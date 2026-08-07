import React, { useState, useMemo } from 'react';
import { useFilterStore } from '../store';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  AlertTriangle,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  Shield,
  Info,
  Filter,
} from 'lucide-react';
import {
  ANOMALY_TIMELINE,
  FLAGGED_KPIS,
  SEVERITY_DISTRIBUTION,
  ANOMALY_SUMMARY_STATS,
  type FlaggedKpi,
} from '../data/anomalyData';
import type { DomainType } from '../types/kpi';

// ── Palette ──────────────────────────────────────────────────

const DOMAIN_COLORS: Record<DomainType | string, string> = {
  Financial:            '#6366f1',
  Workforce:            '#22d3ee',
  'Customer Experience':'#f59e0b',
  Project:              '#34d399',
};

const SEVERITY_COLORS = {
  critical: '#ef4444',
  warning:  '#f59e0b',
  low:      '#6366f1',
} as const;

const SEVERITY_BG: Record<string, string> = {
  critical: 'bg-red-500/15 border-red-500/40 text-red-400',
  warning:  'bg-amber-500/15 border-amber-500/40 text-amber-400',
  low:      'bg-indigo-500/15 border-indigo-500/40 text-indigo-400',
};

const SEVERITY_ICON: Record<string, React.ReactNode> = {
  critical: <AlertCircle size={14} className="text-red-400" />,
  warning:  <AlertTriangle size={14} className="text-amber-400" />,
  low:      <Info size={14} className="text-indigo-400" />,
};

const DOMAIN_LIST: (DomainType | 'All')[] = [
  'All', 'Financial', 'Workforce', 'Customer Experience', 'Project',
];

// ── Custom tooltip for timeline chart ───────────────────────

const TimelineTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-3 shadow-2xl min-w-[180px]">
      <p className="text-gray-400 text-xs font-medium mb-2">{label}</p>
      {payload.map((p: any) => (
        p.name !== 'total' && (
          <div key={p.name} className="flex justify-between items-center gap-4 text-xs py-0.5">
            <span style={{ color: p.fill || p.color }} className="capitalize">{p.name}</span>
            <span className="font-semibold text-white">{p.value}</span>
          </div>
        )
      ))}
      <div className="border-t border-gray-700 mt-1.5 pt-1.5 flex justify-between text-xs">
        <span className="text-gray-400">Total</span>
        <span className="font-bold text-white">{payload.find((p: any) => p.name === 'total')?.value ?? 0}</span>
      </div>
    </div>
  );
};

// ── Custom tooltip for severity distribution ─────────────────

const SeverityTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-3 shadow-2xl">
      <p className="text-gray-400 text-xs font-medium mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex justify-between items-center gap-4 text-xs py-0.5">
          <span style={{ color: p.fill || p.color }} className="capitalize">{p.name}</span>
          <span className="font-semibold text-white">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

// ── Stat card ────────────────────────────────────────────────

function StatCard({
  icon, label, value, sub, accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className={`rounded-2xl border bg-gray-900 p-5 flex flex-col gap-3 ${accent ?? 'border-gray-800'}`}>
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">{label}</span>
        <span className="text-gray-600">{icon}</span>
      </div>
      <div>
        <div className="text-3xl font-bold text-white">{value}</div>
        {sub && <div className="text-xs text-gray-500 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

// ── Alert card for a single flagged KPI ─────────────────────

function AlertCard({ kpi }: { kpi: FlaggedKpi }) {
  const TrendIcon = kpi.trend === 'up' ? TrendingUp : kpi.trend === 'down' ? TrendingDown : Minus;
  return (
    <div className={`rounded-2xl border p-5 flex flex-col gap-3 bg-gray-900 ${SEVERITY_BG[kpi.severity]}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
            {SEVERITY_ICON[kpi.severity]}
            <span className={
              kpi.severity === 'critical' ? 'text-red-400' :
              kpi.severity === 'warning'  ? 'text-amber-400' :
              'text-indigo-400'
            }>
              {kpi.severity}
            </span>
          </div>
          <h4 className="text-white font-semibold text-sm leading-snug">{kpi.displayName}</h4>
          <span className="text-gray-500 text-xs">{kpi.domain}</span>
        </div>
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border"
          style={{
            borderColor: DOMAIN_COLORS[kpi.domain] + '60',
            background:  DOMAIN_COLORS[kpi.domain] + '20',
            color:       DOMAIN_COLORS[kpi.domain],
          }}
        >
          <TrendIcon size={16} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="text-center">
          <div className="text-white font-bold text-lg">{kpi.flagged}</div>
          <div className="text-gray-500 text-[10px]">Flags</div>
        </div>
        <div className="text-center border-x border-gray-800">
          <div className="text-white font-bold text-lg">{kpi.avgSeverity.toFixed(1)}</div>
          <div className="text-gray-500 text-[10px]">Avg Severity</div>
        </div>
        <div className="text-center">
          <div className="text-white font-bold text-lg">{kpi.nMonths}</div>
          <div className="text-gray-500 text-[10px]">Months</div>
        </div>
      </div>

      <p className="text-gray-400 text-xs leading-relaxed">{kpi.description}</p>

      <div className="text-xs text-gray-500">
        Last flagged: <span className="text-gray-300 font-medium">{kpi.lastFlaggedMonth}</span>
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────

const AnomalyDetectionPage: React.FC = () => {
  const [domainFilter, setDomainFilter] = useState<DomainType | 'All'>('All');
  const [severityFilter, setSeverityFilter] = useState<'All' | 'critical' | 'warning' | 'low'>('All');
  const { dateRange } = useFilterStore();

  const filteredKpis = useMemo(() => {
    return FLAGGED_KPIS.filter((k) => {
      const domainOk = domainFilter === 'All' || k.domain === domainFilter;
      const sevOk    = severityFilter === 'All' || k.severity === severityFilter;
      // Filter by last anomaly month within selected period
      const inPeriod = !k.lastAnomaly || (k.lastAnomaly >= dateRange.start && k.lastAnomaly <= dateRange.end);
      return domainOk && sevOk && inPeriod;
    });
  }, [domainFilter, severityFilter, dateRange]);

  const s = ANOMALY_SUMMARY_STATS;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-8">
      {/* ── Page header ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <Activity size={22} className="text-red-400" />
            <h1 className="text-2xl font-bold">Anomaly Detection</h1>
          </div>
          <p className="text-gray-400 text-sm">
            Flagged KPI deviations across all domains — Jan 2025 – Sep 2027
          </p>
        </div>
        <div className="text-xs bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-gray-400">
          Last updated: <span className="text-white font-medium">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      {/* ── Summary stat cards ────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<AlertTriangle size={18} className="text-red-400" />}
          label="Total Anomalies Flagged"
          value={s.totalFlagged}
          sub={`${s.domainsAffected} domains affected`}
          accent="border-red-500/30"
        />
        <StatCard
          icon={<AlertCircle size={18} className="text-red-400" />}
          label="Critical Severity KPIs"
          value={s.criticalCount}
          sub="Avg severity ≥ 2.0"
          accent="border-red-500/20"
        />
        <StatCard
          icon={<Shield size={18} className="text-amber-400" />}
          label="Warning Severity KPIs"
          value={s.warningCount}
          sub="Avg severity 1.0 – 1.9"
          accent="border-amber-500/20"
        />
        <StatCard
          icon={<Activity size={18} className="text-indigo-400" />}
          label="Highest Severity Score"
          value={s.highestSeverityScore}
          sub={s.highestSeverityKpi}
          accent="border-indigo-500/20"
        />
      </div>

      {/* ── Timeline chart ────────────────────────────────────── */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">Anomaly Timeline</h2>
          <p className="text-gray-500 text-xs mt-0.5">Monthly anomaly counts by business domain</p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={ANOMALY_TIMELINE.filter(r => r.month >= dateRange.start && r.month <= dateRange.end)} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis
              dataKey="month"
              tick={{ fill: '#6b7280', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: '#374151' }}
              interval={3}
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<TimelineTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
              formatter={(v) => <span style={{ color: '#9ca3af' }}>{v}</span>}
            />
            <Bar dataKey="financial" name="Financial"              stackId="a" fill={DOMAIN_COLORS.Financial}              radius={[0,0,0,0]} />
            <Bar dataKey="workforce" name="Workforce"              stackId="a" fill={DOMAIN_COLORS.Workforce}              radius={[0,0,0,0]} />
            <Bar dataKey="customer"  name="Customer Experience"    stackId="a" fill={DOMAIN_COLORS['Customer Experience']} radius={[0,0,0,0]} />
            <Bar dataKey="project"   name="Project"                stackId="a" fill={DOMAIN_COLORS.Project}               radius={[4,4,0,0]} />
            <Line
              dataKey="total"
              name="total"
              stroke="#f9fafb"
              strokeWidth={1.5}
              dot={false}
              strokeDasharray="4 2"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* ── Severity distribution ─────────────────────────────── */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">Severity Distribution by Domain</h2>
          <p className="text-gray-500 text-xs mt-0.5">Breakdown of critical / warning / low anomalies per domain</p>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart
            data={SEVERITY_DISTRIBUTION}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fill: '#6b7280', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: '#374151' }}
              allowDecimals={false}
            />
            <YAxis
              type="category"
              dataKey="domain"
              tick={{ fill: '#d1d5db', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={160}
            />
            <Tooltip content={<SeverityTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
              formatter={(v) => <span style={{ color: '#9ca3af' }}>{v}</span>}
            />
            <Bar dataKey="critical" name="Critical" stackId="s" fill={SEVERITY_COLORS.critical} />
            <Bar dataKey="warning"  name="Warning"  stackId="s" fill={SEVERITY_COLORS.warning} />
            <Bar dataKey="low"      name="Low"       stackId="s" fill={SEVERITY_COLORS.low} radius={[0,4,4,0]} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* ── Alert Cards: filters + grid ──────────────────────── */}
      <div>
        {/* filters */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Filter size={14} />
            <span>Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {DOMAIN_LIST.map((d) => (
              <button
                key={d}
                onClick={() => setDomainFilter(d as any)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                  domainFilter === d
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="w-px h-4 bg-gray-700 mx-1 hidden sm:block" />
          <div className="flex flex-wrap gap-2">
            {(['All', 'critical', 'warning', 'low'] as const).map((sv) => (
              <button
                key={sv}
                onClick={() => setSeverityFilter(sv)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all capitalize ${
                  severityFilter === sv
                    ? sv === 'critical' ? 'bg-red-600 border-red-500 text-white'
                      : sv === 'warning' ? 'bg-amber-600 border-amber-500 text-white'
                      : sv === 'low' ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500'
                }`}
              >
                {sv}
              </button>
            ))}
          </div>
        </div>

        {/* heading */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Alert Cards</h2>
          <span className="text-xs text-gray-500 bg-gray-900 border border-gray-800 px-3 py-1 rounded-full">
            {filteredKpis.length} of {FLAGGED_KPIS.length} KPIs
          </span>
        </div>

        {/* card grid */}
        {filteredKpis.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            No KPIs match the selected filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredKpis.map((kpi) => (
              <AlertCard key={kpi.id} kpi={kpi} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnomalyDetectionPage;
