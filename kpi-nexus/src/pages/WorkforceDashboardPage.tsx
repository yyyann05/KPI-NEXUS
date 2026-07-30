import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  BookOpen,
  AlertTriangle,
  AlertCircle,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ChevronDown,
  ChevronUp,
  Zap,
  ShieldAlert,
  UserMinus,
  Heart,
} from 'lucide-react';
import {
  WORKFORCE_MONTHLY,
  WORKFORCE_FORECAST,
  WORKFORCE_ANOMALY_EVENTS,
  WORKFORCE_SUMMARY,
  type WorkforceAnomalyEvent,
} from '../data/workforceData';

// ── Colour tokens ─────────────────────────────────────────────────────────────
const C = {
  attendance:   '#22d3ee',   // cyan
  productivity: '#6366f1',   // indigo
  engagement:   '#a78bfa',   // violet
  training:     '#34d399',   // emerald
  overtime:     '#f59e0b',   // amber
  turnover:     '#f87171',   // red
  forecast:     '#6366f1',
} as const;

// ── Severity styles ───────────────────────────────────────────────────────────
const SEV: Record<string, { bg: string; border: string; text: string; icon: React.ReactNode }> = {
  critical: { bg:'bg-red-500/10',    border:'border-red-500/40',    text:'text-red-400',    icon:<AlertCircle  size={14} className="text-red-400 shrink-0" /> },
  warning:  { bg:'bg-amber-500/10',  border:'border-amber-500/40',  text:'text-amber-400',  icon:<AlertTriangle size={14} className="text-amber-400 shrink-0" /> },
  low:      { bg:'bg-indigo-500/10', border:'border-indigo-500/40', text:'text-indigo-400', icon:<Info size={14} className="text-indigo-400 shrink-0" /> },
};

// ── Formatters ────────────────────────────────────────────────────────────────
const fmtPct  = (v: number, d = 1) => `${v.toFixed(d)}%`;
const fmtNum  = (v: number, d = 1) => v.toFixed(d);
const fmtRate = (v: number) => `${(v * 100).toFixed(1)}%`;

// ── Delta Badge ───────────────────────────────────────────────────────────────
function DeltaBadge({ value, unit = 'pp', inverse = false }: { value: number; unit?: string; inverse?: boolean }) {
  const isPositive = inverse ? value < 0 : value > 0;
  if (Math.abs(value) < 0.001)
    return <span className="flex items-center gap-0.5 text-xs text-text-muted"><Minus size={10} />0{unit}</span>;
  return (
    <span className={`flex items-center gap-0.5 text-xs font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
      {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
      {Math.abs(value).toFixed(Math.abs(value) < 1 ? 2 : 1)}{unit}
    </span>
  );
}

// ── Custom tooltip ────────────────────────────────────────────────────────────
function ChartTooltip({ active, payload, label, fmt }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900/95 border border-gray-700 rounded-xl p-3 shadow-2xl text-xs min-w-[160px]">
      <p className="text-gray-400 font-medium mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex justify-between items-center gap-4 py-0.5">
          <span style={{ color: p.stroke || p.fill || p.color }}>{p.name}</span>
          <span className="font-semibold text-white">{fmt ? fmt(p.value) : p.value}</span>
        </div>
      ))}
    </div>
  );
}

function ForecastTooltip({ active, payload, label, metricKey }: any) {
  if (!active || !payload?.length) return null;
  const actual = payload.find((p: any) => p.name === `${metricKey}_actual`);
  const yhat   = payload.find((p: any) => p.name === `${metricKey}_yhat`);
  const lower  = payload.find((p: any) => p.name === `${metricKey}_lower`);
  const upper  = payload.find((p: any) => p.name === `${metricKey}_upper`);
  return (
    <div className="bg-gray-900/95 border border-gray-700 rounded-xl p-3 shadow-2xl text-xs min-w-[170px]">
      <p className="text-gray-400 font-medium mb-2">{label}</p>
      {actual?.value != null && <div className="flex justify-between gap-4 py-0.5"><span className="text-gray-300">Actual</span><span className="font-semibold text-white">{actual.value.toFixed(1)}</span></div>}
      {yhat    && <div className="flex justify-between gap-4 py-0.5"><span style={{ color: C.forecast }}>Forecast</span><span className="font-semibold text-white">{yhat.value.toFixed(1)}</span></div>}
      {lower && upper && <div className="flex justify-between gap-4 py-0.5 text-gray-500"><span>95% band</span><span>{lower.value.toFixed(1)} – {upper.value.toFixed(1)}</span></div>}
    </div>
  );
}

// ── KPI Stat Card ─────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string; value: string; momChange: number; yoyChange: number;
  icon: React.ReactNode; accentColor: string; unit?: string; inverse?: boolean;
}
function StatCard({ label, value, momChange, yoyChange, icon, accentColor, unit = 'pp', inverse = false }: StatCardProps) {
  return (
    <div className="bg-bg-elevated border border-border-subtle rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-muted uppercase tracking-wider">{label}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background:`${accentColor}20`, color:accentColor }}>
          {icon}
        </span>
      </div>
      <div className="text-2xl font-bold text-text-primary">{value}</div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-text-muted">MoM</span>
          <DeltaBadge value={momChange} unit={unit} inverse={inverse} />
        </div>
        <div className="h-6 w-px bg-border-subtle" />
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-text-muted">YoY</span>
          <DeltaBadge value={yoyChange} unit={unit} inverse={inverse} />
        </div>
      </div>
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, subtitle, icon, children, rightContent }: {
  title: string; subtitle?: string; icon?: React.ReactNode;
  children: React.ReactNode; rightContent?: React.ReactNode;
}) {
  return (
    <section className="bg-bg-elevated border border-border-subtle rounded-2xl overflow-hidden">
      <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-2.5">
          {icon && <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg-base text-text-secondary">{icon}</span>}
          <div>
            <h2 className="text-sm font-semibold text-text-primary">{title}</h2>
            {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {rightContent && <div className="shrink-0">{rightContent}</div>}
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

// ── Anomaly Row ───────────────────────────────────────────────────────────────
function AnomalyRow({ event, expanded, onToggle }: {
  event: WorkforceAnomalyEvent; expanded: boolean; onToggle: () => void;
}) {
  const s = SEV[event.severity];
  return (
    <div className={`border rounded-xl overflow-hidden transition-colors ${s.border} ${expanded ? s.bg : 'bg-transparent'}`}>
      <button onClick={onToggle} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors">
        {s.icon}
        <div className="flex-1 grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-6 items-center min-w-0">
          <span className="text-xs font-medium text-text-primary truncate">{event.kpiLabel}</span>
          <span className="text-xs text-text-muted">{event.month}</span>
          <span className="text-xs font-mono font-semibold text-text-primary">{event.value}</span>
          <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${s.border} ${s.bg} ${s.text}`}>{event.severity}</span>
          {expanded ? <ChevronUp size={14} className="text-text-muted" /> : <ChevronDown size={14} className="text-text-muted" />}
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-3 ml-5 text-xs text-text-secondary leading-relaxed border-t border-border-subtle pt-2.5">
          {event.note}
        </div>
      )}
    </div>
  );
}

// ── Executive Insights ────────────────────────────────────────────────────────
const INSIGHTS = [
  {
    type:'critical' as const,
    headline:'Seasonal crunch cycle confirmed: Oct–Dec overtime surge',
    detail:'Overtime hours tripled in Oct–Dec of both 2024 and 2025 (from ~6h to 14–15h avg). This is a structural pattern, not random. Pre-emptive capacity planning in Q3 each year is essential to prevent burnout and turnover cascades.',
  },
  {
    type:'critical' as const,
    headline:'Dec 2025 triple-signal burnout indicator — highest severity in dataset',
    detail:'Severity score of 66.0 (highest recorded), attendance 85.8%, turnover 2.7%, and overtime 14.5h all peaked simultaneously. Without intervention, Q1 2026 carries significant attrition risk.',
  },
  {
    type:'warning' as const,
    headline:'Jul–Aug productivity dip is a recurring structural pattern',
    detail:'Productivity dropped to 70.3 in Jul 2025 and 69.5 in Aug 2025 — mirroring the same dip in Jul–Aug 2024 (70.1, 70.8). High attendance (92%) rules out absenteeism. The driver is likely engagement or task complexity fatigue mid-year.',
  },
  {
    type:'warning' as const,
    headline:'Engagement trending downward in H2 2025',
    detail:'Engagement score fell from 69.3 (Apr 2025 peak) to 66.1 in Nov 2025 — a 3.2pp decline over 7 months. Lowest engagement aligns with highest overtime months, confirming the workload-engagement negative relationship.',
  },
  {
    type:'positive' as const,
    headline:'Training hours holding steady at 3.8–5.1h range',
    detail:'Training investment has remained consistent across 24 months. The Jun 2025 spike to 5.07h (highest recorded) during the anomaly period suggests reactive upskilling is occurring — a positive signal worth reinforcing proactively.',
  },
  {
    type:'action' as const,
    headline:'Recommended: Mandate recovery sprints after crunch cycles',
    detail:'Cross-domain Granger causality confirms: high project budget spend -> overtime up (r = +0.50) -> attendance down (r = -0.45) -> turnover risk. Define a rule: for every month above 10h overtime, the next month includes mandatory load-balancing. Monitor attendance weekly when overtime exceeds the 10h threshold.',
  },
];

const INSIGHT_STYLES = {
  critical: { bg:'bg-red-500/10',     border:'border-red-500/30',     icon:<AlertCircle  size={15} className="text-red-400    mt-0.5 shrink-0" />, label:'CRITICAL' },
  warning:  { bg:'bg-amber-500/10',   border:'border-amber-500/30',   icon:<AlertTriangle size={15} className="text-amber-400  mt-0.5 shrink-0" />, label:'WATCH'    },
  positive: { bg:'bg-emerald-500/10', border:'border-emerald-500/30', icon:<TrendingUp   size={15} className="text-emerald-400 mt-0.5 shrink-0" />, label:'POSITIVE' },
  action:   { bg:'bg-indigo-500/10',  border:'border-indigo-500/30',  icon:<Zap          size={15} className="text-indigo-400  mt-0.5 shrink-0" />, label:'ACTION'   },
};

// ── X-axis skip helper ────────────────────────────────────────────────────────
const skipTick = (_: string, i: number) => (i % 3 === 0 ? _ : '');

// ═════════════════════════════════════════════════════════════════════════════
// Main Page
// ═════════════════════════════════════════════════════════════════════════════

export default function WorkforceDashboardPage() {
  const [expandedAnomaly, setExpandedAnomaly] = useState<number | null>(null);
  const [sevFilter, setSevFilter] = useState<'all' | 'critical' | 'warning' | 'low'>('all');
  const [forecastMetric, setForecastMetric] = useState<'attendance' | 'productivity' | 'engagement'>('attendance');

  const S = WORKFORCE_SUMMARY;

  // Recharts-friendly trend rows
  const trend = WORKFORCE_MONTHLY.map(r => ({
    month: r.month,
    Attendance:    +r.attendance.toFixed(2),
    Productivity:  +r.productivity.toFixed(2),
    Engagement:    +r.engagement.toFixed(2),
    'Training Hrs':+r.trainingHours.toFixed(2),
    'Overtime Hrs':+r.overtimeHours.toFixed(2),
    'Turnover %':  +(r.turnoverRate * 100).toFixed(2),
    'Anomaly Count':r.anomalyCount,
    Severity:      +r.avgSeverityScore.toFixed(1),
  }));

  const filteredAnomalies = useMemo(
    () => sevFilter === 'all' ? WORKFORCE_ANOMALY_EVENTS : WORKFORCE_ANOMALY_EVENTS.filter(e => e.severity === sevFilter),
    [sevFilter],
  );

  const fmKey = forecastMetric;

  return (
    <div className="space-y-6 p-6">

      {/* ── Page header ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Workforce Dashboard</h1>
          <p className="text-xs text-text-muted mt-0.5">
            Jan 2024 – Dec 2025 &nbsp;·&nbsp; All Departments &nbsp;·&nbsp; Latest: <span className="text-text-secondary font-medium">{S.latestMonth}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-muted bg-bg-elevated border border-border-subtle rounded-lg px-3 py-1.5">
          <ShieldAlert size={13} className="text-amber-400" />
          <span>
            <span className="font-semibold text-red-400">{S.criticalCount} Critical</span>
            &nbsp;·&nbsp;
            <span className="font-semibold text-amber-400">{S.warningCount} Warning</span>
            &nbsp;anomalies — peak severity <span className="font-semibold text-red-400">{S.highestSeverity.toFixed(1)}</span>
          </span>
        </div>
      </div>

      {/* ── KPI Stat Cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          label="Attendance Rate"
          value={fmtPct(S.attendance.value)}
          momChange={S.attendance.momChange}
          yoyChange={S.attendance.yoyChange}
          icon={<Users size={16} />}
          accentColor={C.attendance}
        />
        <StatCard
          label="Productivity Score"
          value={fmtNum(S.productivity.value)}
          momChange={S.productivity.momChange}
          yoyChange={S.productivity.yoyChange}
          icon={<TrendingUp size={16} />}
          accentColor={C.productivity}
        />
        <StatCard
          label="Engagement Score"
          value={fmtNum(S.engagement.value)}
          momChange={S.engagement.momChange}
          yoyChange={S.engagement.yoyChange}
          icon={<Heart size={16} />}
          accentColor={C.engagement}
        />
        <StatCard
          label="Training Hrs / Mo"
          value={`${fmtNum(S.trainingHours.value)}h`}
          momChange={S.trainingHours.momChange}
          yoyChange={S.trainingHours.yoyChange}
          icon={<BookOpen size={16} />}
          accentColor={C.training}
          unit="h"
        />
        <StatCard
          label="Avg Overtime Hrs"
          value={`${fmtNum(S.overtimeHours.value)}h`}
          momChange={S.overtimeHours.momChange}
          yoyChange={S.overtimeHours.yoyChange}
          icon={<Clock size={16} />}
          accentColor={C.overtime}
          unit="h"
          inverse
        />
        <StatCard
          label="Turnover Rate"
          value={fmtRate(S.turnoverRate.value)}
          momChange={+(S.turnoverRate.momChange * 100).toFixed(2)}
          yoyChange={+(S.turnoverRate.yoyChange * 100).toFixed(2)}
          icon={<UserMinus size={16} />}
          accentColor={C.turnover}
          unit="pp"
          inverse
        />
      </div>

      {/* ── Attendance, Productivity & Engagement trends ─────────────── */}
      <Section
        title="Attendance, Productivity & Engagement"
        subtitle="Monthly scores — Jan 2024 to Dec 2025"
        icon={<Activity size={15} />}
      >
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={trend} margin={{ top:4, right:16, left:0, bottom:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="month" tick={{ fill:'#6b7280', fontSize:11 }} tickFormatter={skipTick} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill:'#6b7280', fontSize:11 }} domain={[60, 100]} tickFormatter={v => `${v}`} axisLine={false} tickLine={false} width={36} />
            <Tooltip content={<ChartTooltip fmt={(v: number) => v.toFixed(1)} />} />
            <Legend wrapperStyle={{ fontSize:11, paddingTop:12 }} />
            <ReferenceLine y={90} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 2" label={{ value:'90%', fill:'#6b7280', fontSize:9, position:'insideTopRight' }} />
            <Line type="monotone" dataKey="Attendance"   stroke={C.attendance}   strokeWidth={2}   dot={false} activeDot={{ r:4 }} />
            <Line type="monotone" dataKey="Productivity" stroke={C.productivity} strokeWidth={2}   dot={false} activeDot={{ r:4 }} />
            <Line type="monotone" dataKey="Engagement"   stroke={C.engagement}  strokeWidth={1.5} dot={false} activeDot={{ r:4 }} strokeDasharray="5 3" />
          </LineChart>
        </ResponsiveContainer>
      </Section>

      {/* ── Overtime & Turnover ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Section
          title="Overtime Hours"
          subtitle="Avg Overtime Hours per employee / month"
          icon={<Clock size={15} />}
        >
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={trend} margin={{ top:4, right:16, left:0, bottom:0 }}>
              <defs>
                <linearGradient id="gradOT" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={C.overtime} stopOpacity={0.30} />
                  <stop offset="95%" stopColor={C.overtime} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" tick={{ fill:'#6b7280', fontSize:10 }} tickFormatter={skipTick} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:'#6b7280', fontSize:10 }} tickFormatter={v => `${v}h`} axisLine={false} tickLine={false} width={36} />
              <ReferenceLine y={10} stroke="#ef4444" strokeDasharray="4 2" strokeWidth={1}
                label={{ value:'10h threshold', fill:'#ef4444', fontSize:9, position:'insideTopRight' }} />
              <Tooltip content={<ChartTooltip fmt={(v: number) => `${v.toFixed(1)}h`} />} />
              <Area type="monotone" dataKey="Overtime Hrs" stroke={C.overtime} strokeWidth={2} fill="url(#gradOT)" dot={false} activeDot={{ r:4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </Section>

        <Section
          title="Turnover Rate"
          subtitle="Monthly employee turnover rate (%)"
          icon={<UserMinus size={15} />}
        >
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={trend} margin={{ top:4, right:16, left:0, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" tick={{ fill:'#6b7280', fontSize:10 }} tickFormatter={skipTick} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:'#6b7280', fontSize:10 }} tickFormatter={v => `${v}%`} axisLine={false} tickLine={false} width={36} />
              <ReferenceLine y={2.5} stroke="#ef4444" strokeDasharray="4 2" strokeWidth={1}
                label={{ value:'2.5% alert', fill:'#ef4444', fontSize:9, position:'insideTopRight' }} />
              <Tooltip content={<ChartTooltip fmt={(v: number) => `${v.toFixed(2)}%`} />} />
              <Bar dataKey="Turnover %" maxBarSize={18} radius={[3,3,0,0]}>
                {trend.map((entry, i) => (
                  <Cell key={i} fill={entry['Turnover %'] >= 2.5 ? '#ef4444' : entry['Turnover %'] >= 1.5 ? '#f59e0b' : '#22d3ee'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Section>
      </div>

      {/* ── Training Hours ────────────────────────────────────────────── */}
      <Section
        title="Training Hours & Severity Score"
        subtitle="Monthly Avg Training Hours vs Anomaly Severity Score"
        icon={<BookOpen size={15} />}
      >
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={trend} margin={{ top:4, right:16, left:0, bottom:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="month" tick={{ fill:'#6b7280', fontSize:11 }} tickFormatter={skipTick} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left"  tick={{ fill:'#6b7280', fontSize:10 }} tickFormatter={v => `${v}h`}  axisLine={false} tickLine={false} width={36} domain={[3, 6]} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill:'#6b7280', fontSize:10 }} axisLine={false} tickLine={false} width={40} domain={[35, 70]} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontSize:11, paddingTop:12 }} />
            <Bar   yAxisId="left"  dataKey="Training Hrs" fill={C.training}  opacity={0.75} maxBarSize={14} radius={[3,3,0,0]} />
            <Line  yAxisId="right" dataKey="Severity"     stroke={C.turnover} strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
          </ComposedChart>
        </ResponsiveContainer>
      </Section>

      {/* ── Anomaly Count ─────────────────────────────────────────────── */}
      <Section
        title="Monthly Anomaly Activity"
        subtitle="Workforce domain anomaly count per month"
        icon={<AlertTriangle size={15} />}
      >
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={trend} margin={{ top:4, right:16, left:0, bottom:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="month" tick={{ fill:'#6b7280', fontSize:10 }} tickFormatter={skipTick} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill:'#6b7280', fontSize:10 }} axisLine={false} tickLine={false} width={24} allowDecimals={false} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="Anomaly Count" maxBarSize={18} radius={[3,3,0,0]}>
              {trend.map((e, i) => (
                <Cell key={i} fill={e['Anomaly Count'] >= 7 ? '#ef4444' : e['Anomaly Count'] >= 5 ? '#f59e0b' : '#6366f1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-6 mt-3 text-xs text-text-muted">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-500 inline-block" />7+ events</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block" />5–6 events</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 inline-block" />1–4 events</span>
        </div>
      </Section>

      {/* ── Prophet Forecast ──────────────────────────────────────────── */}
      <Section
        title="Prophet Forecast — 6-Month Outlook"
        subtitle="Prophet-based forecast with 95% confidence band (Jan – Jun 2026)"
        icon={<Zap size={15} />}
        rightContent={
          <div className="flex rounded-lg overflow-hidden border border-border-subtle text-xs">
            {(['attendance','productivity','engagement'] as const).map(m => (
              <button key={m} onClick={() => setForecastMetric(m)}
                className={`px-3 py-1.5 capitalize transition-colors ${forecastMetric === m ? 'bg-accent-primary text-white' : 'text-text-muted hover:text-text-primary'}`}>
                {m === 'attendance' ? 'Attendance' : m === 'productivity' ? 'Productivity' : 'Engagement'}
              </button>
            ))}
          </div>
        }
      >
        {/* Legend */}
        <div className="flex items-center gap-6 mb-4 text-xs text-text-muted">
          <span className="flex items-center gap-1.5"><span className="inline-block w-6 h-0.5" style={{ background: C[forecastMetric] }} />Actual</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-6 h-0.5 opacity-60" style={{ background: C.forecast, borderTop:'2px dashed' }} />Forecast</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm bg-indigo-500/20 border border-indigo-500/30" />95% CI Band</span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={WORKFORCE_FORECAST} margin={{ top:4, right:16, left:0, bottom:0 }}>
            <defs>
              <linearGradient id="gradBandWF" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={C.forecast} stopOpacity={0.20} />
                <stop offset="95%" stopColor={C.forecast} stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="month" tick={{ fill:'#6b7280', fontSize:11 }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fill:'#6b7280', fontSize:11 }}
              axisLine={false} tickLine={false} width={40}
              domain={fmKey === 'attendance' ? [80,98] : fmKey === 'productivity' ? [68,80] : [63,73]}
              tickFormatter={v => `${v.toFixed(0)}`}
            />
            <Tooltip content={<ForecastTooltip metricKey={fmKey} />} />
            {/* CI upper fill */}
            <Area type="monotone" dataKey={`${fmKey}_upper`} stroke="none" fill="url(#gradBandWF)" isAnimationActive={false} />
            {/* CI lower fill (mask) */}
            <Area type="monotone" dataKey={`${fmKey}_lower`} stroke="none" fill="#0f172a"           isAnimationActive={false} />
            {/* Forecast line */}
            <Line type="monotone" dataKey={`${fmKey}_yhat`} stroke={C.forecast} strokeWidth={2} dot={false} strokeDasharray="6 3" />
            {/* Actual line */}
            <Line type="monotone" dataKey={`${fmKey}_actual`}
              stroke={C[fmKey]} strokeWidth={2.5}
              dot={{ r:3, fill: C[fmKey] }}
              connectNulls={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </Section>

      {/* ── Anomaly Events Table ──────────────────────────────────────── */}
      <Section
        title="Workforce Anomaly Events"
        subtitle={`${WORKFORCE_ANOMALY_EVENTS.length} flagged events across 24 months — click any row to expand`}
        icon={<AlertCircle size={15} />}
        rightContent={
          <div className="flex rounded-lg overflow-hidden border border-border-subtle text-xs">
            {(['all','critical','warning','low'] as const).map(s => (
              <button key={s} onClick={() => setSevFilter(s)}
                className={`px-3 py-1.5 capitalize transition-colors ${sevFilter === s ? 'bg-accent-primary text-white' : 'text-text-muted hover:text-text-primary'}`}>
                {s === 'all' ? `All (${WORKFORCE_ANOMALY_EVENTS.length})` : s}
              </button>
            ))}
          </div>
        }
      >
        <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-x-6 px-4 pb-2 text-[10px] font-semibold uppercase tracking-wider text-text-muted border-b border-border-subtle">
          <span>KPI</span><span>Month</span><span>Value</span><span>Severity</span><span />
        </div>
        <div className="mt-2 space-y-1.5">
          {filteredAnomalies.length === 0 && (
            <p className="text-center text-xs text-text-muted py-8">No events match the selected filter.</p>
          )}
          {filteredAnomalies.map((event, i) => (
            <AnomalyRow
              key={event.date + event.kpi}
              event={event}
              expanded={expandedAnomaly === i}
              onToggle={() => setExpandedAnomaly(expandedAnomaly === i ? null : i)}
            />
          ))}
        </div>
      </Section>

      {/* ── Executive Insights ────────────────────────────────────────── */}
      <Section
        title="Executive Insights"
        subtitle="AI-synthesised findings from Workforce KPI analysis"
        icon={<Zap size={15} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INSIGHTS.map((ins, i) => {
            const st = INSIGHT_STYLES[ins.type];
            return (
              <div key={i} className={`rounded-xl border p-4 flex flex-col gap-2 ${st.bg} ${st.border}`}>
                <div className="flex items-start gap-2">
                  {st.icon}
                  <div className="flex-1 min-w-0">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      ins.type === 'critical' ? 'text-red-400'
                      : ins.type === 'warning' ? 'text-amber-400'
                      : ins.type === 'positive' ? 'text-emerald-400'
                      : 'text-indigo-400'
                    }`}>{st.label}</span>
                    <p className="text-xs font-semibold text-text-primary mt-0.5 leading-snug">{ins.headline}</p>
                  </div>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed pl-5">{ins.detail}</p>
              </div>
            );
          })}
        </div>
      </Section>

    </div>
  );
}
