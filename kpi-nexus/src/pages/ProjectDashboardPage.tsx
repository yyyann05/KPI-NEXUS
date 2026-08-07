import React, { useState, useMemo } from 'react';
import { useFilterStore } from '../store';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
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
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  DollarSign,
  Clock,
  AlertTriangle,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Layers,
  ShieldAlert,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  BarChart2,
  Activity,
} from 'lucide-react';
import {
  PROJECT_MONTHLY,
  PROJECT_SUMMARY,
  PROJECT_ANOMALY_EVENTS,
  COMPLETION_FORECAST,
  BUDGET_VARIANCE_FORECAST,
  type ProjectAnomalyEvent,
} from '../data/projectData';

// ── Colour palette ────────────────────────────────────────────────────────────
const C = {
  completion:  '#6366f1',  // indigo
  budget:      '#22d3ee',  // cyan
  delayed:     '#f59e0b',  // amber
  spend:       '#34d399',  // emerald
  severity:    '#fb923c',  // orange
  anomaly:     '#f87171',  // red-400
  forecast:    '#6366f1',
} as const;

// ── Severity row styles ───────────────────────────────────────────────────────
const SEV_STYLES: Record<string, { bg: string; border: string; text: string; icon: React.ReactNode }> = {
  critical: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/40',
    text: 'text-red-400',
    icon: <AlertCircle size={14} className="text-red-400 shrink-0" />,
  },
  warning: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/40',
    text: 'text-amber-400',
    icon: <AlertTriangle size={14} className="text-amber-400 shrink-0" />,
  },
  low: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/40',
    text: 'text-indigo-400',
    icon: <Info size={14} className="text-indigo-400 shrink-0" />,
  },
};

// ── Recommendation card styles ────────────────────────────────────────────────
const REC_STYLES = {
  critical: { border: 'border-red-500/30',     bg: 'bg-red-500/8',     accent: 'text-red-400',     badge: 'bg-red-500/20 text-red-400 border-red-500/30',     icon: <ShieldAlert size={16} /> },
  watch:    { border: 'border-amber-500/30',    bg: 'bg-amber-500/8',   accent: 'text-amber-400',   badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30', icon: <AlertTriangle size={16} /> },
  positive: { border: 'border-emerald-500/30',  bg: 'bg-emerald-500/8', accent: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: <TrendingUp size={16} /> },
  action:   { border: 'border-indigo-500/30',   bg: 'bg-indigo-500/8',  accent: 'text-indigo-400',  badge: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30', icon: <Zap size={16} /> },
};

const RECOMMENDATIONS = [
  {
    type: 'critical' as const,
    title: 'Q1 2026 Portfolio Collapse — Root Cause Unresolved',
    body: 'Three consecutive months (Jan–Mar 2026) of near-zero completion (1.4%, 2.6%, 0.0%), 100% delayed tasks in March, and budget variance hitting -100% represent the most severe project execution failure in the dataset. The Apr 2026 partial recovery (96.7% completion) does NOT confirm system stability — the severity score hit a dataset maximum of 97.2 in the same month.',
    action: 'Commission a formal project portfolio incident review for Q1 2026. Identify root causes (organisational change, system migration, resource loss) and document corrective actions before declaring recovery.',
  },
  {
    type: 'critical' as const,
    title: 'Severity Score at All-Time High (97.2)',
    body: 'The Apr 2026 severity score of 97.2 is the highest in the entire dataset across all domains. This is structurally alarming because it coincides with a reported completion recovery — suggesting the underlying risk profile is far worse than surface metrics indicate.',
    action: 'Audit the severity score calculation model for Apr 2026. If the score accurately reflects underlying risk, escalate to executive leadership immediately. Do not declare recovery until severity falls below 60.',
  },
  {
    type: 'watch' as const,
    title: 'Dec 2025 Budget Explosion Was a Leading Indicator',
    body: 'The $1.91M December 2025 spend — 4.3x the 12-month average — preceded the Q1 2026 collapse by one month. In retrospect, this spend anomaly combined with an 8.2% budget variance and 78% completion rate was the clearest early warning of what followed.',
    action: 'Establish a real-time budget velocity dashboard. Trigger executive review when monthly spend exceeds 2x the rolling 6-month average. Correlate spend anomalies with completion rate trends automatically.',
  },
  {
    type: 'action' as const,
    title: 'Implement Completion Rate Floor Alerting',
    body: 'The dataset shows that once completion fell below 93% (Jun 2025 dip to 92.5%), a 6-month degradation pattern began. The current system had no early warning — completion went from 100% to 78% (Dec 2025) to 1.4% (Jan 2026) in two months.',
    action: 'Set automated alert thresholds: Yellow at 90%, Red at 80%. Any month below 85% should trigger a mandatory project health review within 3 business days.',
  },
  {
    type: 'positive' as const,
    title: '2024 – Mid-2025 Execution Excellence',
    body: 'For 21 consecutive months (Mar 2024 – May 2025), the portfolio maintained 100% completion rates with budget variance consistently below 6%. This establishes a strong baseline and demonstrates that the organisation is capable of high-performance delivery under stable conditions.',
    action: 'Document the operating model and governance practices from the 2024–H1 2025 period. Use these as the standard for post-recovery operations going forward.',
  },
  {
    type: 'watch' as const,
    title: 'Forecast Shows Slow Recovery — Monitor Q3 2026',
    body: 'Prophet forecast projects completion rate recovering to ~90% by Jul 2026 and ~98% by Oct 2026 — but this assumes no further disruptions. Budget variance is forecast to normalise back to 3–5% range by Q3 2026. Both forecasts carry wide confidence intervals due to the unprecedented Q1 2026 volatility.',
    action: 'Conduct monthly forecast vs. actual reviews throughout 2026. If Jul 2026 completion rate is below 85%, escalate recovery timeline and reassess project commitments for H2 2026.',
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const shortMonth = (v: string) => v.replace(' 20', "'");

const fmtBudget = (v: number) =>
  v >= 1_000_000
    ? `$${(v / 1_000_000).toFixed(2)}M`
    : v >= 1_000
      ? `$${(v / 1_000).toFixed(0)}K`
      : `$${v.toFixed(0)}`;

function pctDelta(cur: number, prev: number) {
  if (prev === 0) return 0;
  return ((cur - prev) / Math.abs(prev)) * 100;
}

// ── Tooltip ───────────────────────────────────────────────────────────────────
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900/95 border border-gray-700/60 rounded-lg p-3 text-xs shadow-xl">
      <p className="font-semibold text-gray-200 mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center justify-between gap-4">
          <span style={{ color: p.color }} className="capitalize">{p.name}</span>
          <span className="font-medium text-white">{typeof p.value === 'number' ? p.value.toFixed(2) : p.value}</span>
        </div>
      ))}
    </div>
  );
}

// ── KPI Card ──────────────────────────────────────────────────────────────────
interface KpiCardProps {
  label: string;
  value: string;
  subLabel?: string;
  momPct: number;
  yoyPct: number;
  invertGood?: boolean;
  icon: React.ReactNode;
  accent: string;
  target?: string;
  targetMet?: boolean;
  alert?: boolean;
}

function KpiCard({ label, value, subLabel, momPct, yoyPct, invertGood = false, icon, accent, target, targetMet, alert }: KpiCardProps) {
  const momGood = invertGood ? momPct <= 0 : momPct >= 0;
  const yoyGood = invertGood ? yoyPct <= 0 : yoyPct >= 0;
  const Badge = ({ val, good, prefix }: { val: number; good: boolean; prefix: string }) => (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${good ? 'text-emerald-400' : 'text-red-400'}`}>
      {good ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
      {prefix} {Math.abs(val) > 999 ? '>999' : Math.abs(val).toFixed(1)}%
    </span>
  );
  return (
    <div className={`relative bg-gray-800/60 border rounded-xl p-5 overflow-hidden group hover:border-gray-600/60 transition-all ${alert ? 'border-red-500/40' : 'border-gray-700/50'}`}>
      {alert && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
           style={{ background: `radial-gradient(circle at 70% 30%, ${accent}12 0%, transparent 70%)` }} />
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${accent}20` }}>
            <div style={{ color: accent }}>{icon}</div>
          </div>
          {target && (
            <span className={`text-xs px-2 py-0.5 rounded-full border ${targetMet ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' : 'text-red-400 border-red-500/30 bg-red-500/10'}`}>
              Target: {target}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{label}</p>
        <p className={`text-2xl font-bold mb-0.5 ${alert ? 'text-red-400' : 'text-white'}`}>{value}</p>
        {subLabel && <p className="text-xs text-gray-500 mb-2">{subLabel}</p>}
        <div className="flex items-center gap-3 mt-2">
          <Badge val={momPct} good={momGood} prefix="MoM" />
          <Badge val={yoyPct} good={yoyGood} prefix="YoY" />
        </div>
      </div>
    </div>
  );
}

// ── Section Header ────────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle, icon }: { title: string; subtitle?: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      {icon && (
        <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg mt-0.5">
          <div className="text-indigo-400">{icon}</div>
        </div>
      )}
      <div>
        <h2 className="text-base font-semibold text-white">{title}</h2>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

// ── Anomaly Row ───────────────────────────────────────────────────────────────
function AnomalyRow({ ev }: { ev: ProjectAnomalyEvent }) {
  const [open, setOpen] = useState(false);
  const s = SEV_STYLES[ev.severity];
  return (
    <div className={`rounded-lg border ${s.bg} ${s.border} overflow-hidden transition-all`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors"
      >
        {s.icon}
        <span className={`text-xs font-semibold uppercase tracking-wider w-14 shrink-0 ${s.text}`}>{ev.severity}</span>
        <span className="text-xs text-gray-300 w-20 shrink-0">{ev.date}</span>
        <span className="text-xs text-indigo-300 w-44 shrink-0 truncate">{ev.kpi}</span>
        <span className="text-xs font-medium text-white w-24 shrink-0">{ev.value}</span>
        <span className={`text-xs font-medium shrink-0 ${ev.deviation.startsWith('-') ? 'text-red-400' : 'text-amber-400'}`}>{ev.deviation}</span>
        <span className="ml-auto text-gray-500">{open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-2 border-t border-white/5 pt-3">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Impact</p>
            <p className="text-xs text-gray-300 leading-relaxed">{ev.impact}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Recommendation</p>
            <p className="text-xs text-cyan-300 leading-relaxed">{ev.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Recommendation Card ───────────────────────────────────────────────────────
function RecCard({ rec }: { rec: typeof RECOMMENDATIONS[0] }) {
  const s = REC_STYLES[rec.type];
  return (
    <div className={`rounded-xl border ${s.border} ${s.bg} p-4 space-y-2`}>
      <div className="flex items-center gap-2">
        <span className={s.accent}>{s.icon}</span>
        <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${s.badge}`}>{rec.type}</span>
      </div>
      <p className="text-sm font-medium text-white">{rec.title}</p>
      <p className="text-xs text-gray-400 leading-relaxed">{rec.body}</p>
      <div className="bg-black/20 rounded-lg px-3 py-2 border border-white/5">
        <p className="text-xs text-cyan-300 leading-relaxed">
          <span className="font-semibold text-cyan-400">Action: </span>{rec.action}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────
type ForecastKey = 'completion' | 'budget';
type SevFilter = 'all' | 'critical' | 'warning' | 'low';

export default function ProjectDashboardPage() {
  const [forecastKey, setForecastKey] = useState<ForecastKey>('completion');
  const [sevFilter, setSevFilter] = useState<SevFilter>('all');
  const { dateRange } = useFilterStore();

  const { completionRate, budgetVariance, delayedTaskRate, budgetSpent, severityScore } = PROJECT_SUMMARY;

  // MoM / YoY deltas
  const crMoM = pctDelta(completionRate.current, completionRate.prevMonth);
  const crYoY = pctDelta(completionRate.current, completionRate.prevYear);
  const bvMoM = completionRate.prevMonth === 0 ? 0 : pctDelta(budgetVariance.current, budgetVariance.prevMonth);
  const bvYoY = pctDelta(budgetVariance.current, budgetVariance.prevYear);
  const dtMoM = pctDelta(delayedTaskRate.current, delayedTaskRate.prevMonth);
  const dtYoY = pctDelta(delayedTaskRate.current, delayedTaskRate.prevYear);
  const spMoM = pctDelta(budgetSpent.current, budgetSpent.prevMonth);
  const spYoY = pctDelta(budgetSpent.current, budgetSpent.prevYear);
  const svMoM = pctDelta(severityScore.current, severityScore.prevMonth);
  const svYoY = pctDelta(severityScore.current, severityScore.prevYear);

  // Period-filtered monthly data
  const filteredMonthly = useMemo(() =>
    PROJECT_MONTHLY.filter(r => r.month >= dateRange.start && r.month <= dateRange.end),
    [dateRange]);

  const filteredAnomalies = useMemo(() =>
    PROJECT_ANOMALY_EVENTS.filter(e => {
      const inPeriod = e.month >= dateRange.start && e.month <= dateRange.end;
      const inSev = sevFilter === 'all' || e.severity === sevFilter;
      return inPeriod && inSev;
    }),
    [sevFilter, dateRange]);

  const forecastData = useMemo(() => {
    const raw = forecastKey === 'completion' ? COMPLETION_FORECAST : BUDGET_VARIANCE_FORECAST;
    return raw.filter(r => r.month >= dateRange.start && r.month <= dateRange.end);
  }, [forecastKey, dateRange]);
  const forecastColor = forecastKey === 'completion' ? C.completion : C.budget;
  const forecastLabel = forecastKey === 'completion' ? 'Completion Rate (%)' : 'Budget Variance (%)';

  // bar colours
  const budgetBarColor = (v: number) =>
    v > 8 ? '#f87171' : v > 5 ? '#f59e0b' : v >= 0 ? '#6366f1' : '#f87171';
  const completionBarColor = (v: number) =>
    v >= 95 ? '#34d399' : v >= 75 ? '#f59e0b' : '#f87171';
  const anomalyBarColor = (c: number) =>
    c === 0 ? '#374151' : c <= 1 ? '#6366f1' : c <= 3 ? '#f59e0b' : '#f87171';
  const severityBarColor = (v: number) =>
    v < 40 ? '#34d399' : v < 60 ? '#f59e0b' : '#f87171';

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-8">

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
            <Layers size={20} className="text-indigo-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Project Dashboard</h1>
            <p className="text-xs text-gray-400">Mar 2024 – Apr 2026 &bull; 26 months &bull; Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
          {/* Critical alert banner */}
          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-lg">
            <AlertCircle size={14} className="text-red-400" />
            <span className="text-xs font-medium text-red-400">Portfolio Crisis Detected — Q1 2026</span>
          </div>
        </div>
        {/* Summary strip */}
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Anomalies',       value: String(PROJECT_SUMMARY.totalAnomalies),     color: 'text-amber-400' },
            { label: 'Peak Budget Month',      value: PROJECT_SUMMARY.peakBudgetMonth,            color: 'text-red-400'   },
            { label: 'Peak Spend',             value: PROJECT_SUMMARY.peakBudgetValue,            color: 'text-red-400'   },
            { label: 'Zero-Completion Months', value: String(PROJECT_SUMMARY.zeroCompletionMonths), color: 'text-red-400' },
          ].map(item => (
            <div key={item.label} className="bg-gray-800/50 border border-gray-700/40 rounded-lg px-4 py-2.5">
              <p className="text-xs text-gray-400">{item.label}</p>
              <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── KPI Cards ───────────────────────────────────────────────────── */}
      <div>
        <SectionHeader title="Key Performance Indicators" subtitle="Latest: Apr 2026" icon={<BarChart2 size={16} />} />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          <KpiCard
            label="Completion Rate"
            value={`${completionRate.current.toFixed(1)}%`}
            subLabel="Avg across portfolio"
            momPct={crMoM} yoyPct={crYoY}
            icon={<CheckCircle2 size={18} />} accent={C.completion}
            target={`${completionRate.target}%`} targetMet={completionRate.current >= completionRate.target}
          />
          <KpiCard
            label="Budget Variance"
            value={`${budgetVariance.current.toFixed(1)}%`}
            subLabel="vs allocated budget"
            momPct={bvMoM} yoyPct={bvYoY}
            icon={<DollarSign size={18} />} accent={C.budget}
            target="<5%" targetMet={Math.abs(budgetVariance.current) <= 5}
            alert={Math.abs(budgetVariance.current) > 50}
          />
          <KpiCard
            label="Delayed Task Rate"
            value={`${(delayedTaskRate.current * 100).toFixed(1)}%`}
            subLabel="lower is better"
            momPct={dtMoM} yoyPct={dtYoY}
            invertGood
            icon={<Clock size={18} />} accent={C.delayed}
            target="<5%" targetMet={delayedTaskRate.current < 0.05}
          />
          <KpiCard
            label="Budget Spent"
            value={fmtBudget(budgetSpent.current)}
            subLabel="this month"
            momPct={spMoM} yoyPct={spYoY}
            icon={<DollarSign size={18} />} accent={C.spend}
          />
          <KpiCard
            label="Severity Score"
            value={severityScore.current.toFixed(1)}
            subLabel="composite risk index"
            momPct={svMoM} yoyPct={svYoY}
            invertGood
            icon={<Activity size={18} />} accent={C.severity}
            target="<45" targetMet={severityScore.current < 45}
            alert={severityScore.current > 80}
          />
        </div>
      </div>

      {/* ── Completion Rate Trend ────────────────────────────────────────── */}
      <div>
        <SectionHeader
          title="Project Completion Rate — Full History"
          subtitle="Monthly avg % complete across all projects (Mar 2024 – Apr 2026)"
          icon={<CheckCircle2 size={16} />}
        />
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-5">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={filteredMonthly} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
              <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 10 }} tickFormatter={shortMonth} interval={2} />
              <YAxis domain={[-5, 110]} tick={{ fill: '#9ca3af', fontSize: 10 }} width={38} tickFormatter={v => `${v}%`} />
              <Tooltip content={<ChartTooltip />} />
              <ReferenceLine y={95} stroke="#34d399" strokeDasharray="4 3"
                label={{ value: '95% target', fill: '#34d399', fontSize: 9, position: 'insideTopRight' }} />
              <ReferenceLine y={80} stroke="#f59e0b" strokeDasharray="4 3"
                label={{ value: '80% warning', fill: '#f59e0b', fontSize: 9, position: 'insideBottomRight' }} />
              <Area type="monotone" dataKey="completionRate" name="Completion Rate (%)"
                stroke={C.completion} fill={`${C.completion}20`} strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Budget Variance & Budget Spend ──────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Budget Variance */}
        <div>
          <SectionHeader
            title="Avg Budget Variance %"
            subtitle="Positive = over-budget, Negative = severe under-spend"
            icon={<DollarSign size={16} />}
          />
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-5">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={filteredMonthly} margin={{ top: 5, right: 16, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
                <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 10 }} tickFormatter={shortMonth} interval={2} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} width={45} tickFormatter={v => `${v}%`} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    const v = payload[0].value as number;
                    return (
                      <div className="bg-gray-900/95 border border-gray-700/60 rounded-lg p-3 text-xs shadow-xl">
                        <p className="font-semibold text-gray-200 mb-1">{label}</p>
                        <span className={v < 0 ? 'text-red-400' : 'text-amber-400'}>{v.toFixed(2)}%</span>
                      </div>
                    );
                  }}
                />
                <ReferenceLine y={5} stroke="#f59e0b" strokeDasharray="4 3"
                  label={{ value: '5% threshold', fill: '#f59e0b', fontSize: 9, position: 'insideTopRight' }} />
                <ReferenceLine y={0} stroke="#6b7280" />
                <Bar dataKey="budgetVariancePct" name="Budget Variance %" radius={[3, 3, 0, 0]}>
                  {filteredMonthly.map((entry, i) => (
                    <Cell key={i} fill={budgetBarColor(entry.budgetVariancePct)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Budget Spend */}
        <div>
          <SectionHeader
            title="Monthly Budget Spent"
            subtitle="Total $ spend across all projects per month"
            icon={<DollarSign size={16} />}
          />
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-5">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={filteredMonthly} margin={{ top: 5, right: 16, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
                <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 10 }} tickFormatter={shortMonth} interval={2} />
                <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} width={52} tickFormatter={v => fmtBudget(v)} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="bg-gray-900/95 border border-gray-700/60 rounded-lg p-3 text-xs shadow-xl">
                        <p className="font-semibold text-gray-200 mb-1">{label}</p>
                        <span className="text-emerald-400">{fmtBudget(payload[0].value as number)}</span>
                      </div>
                    );
                  }}
                />
                <Bar dataKey="totalBudgetSpent" name="Budget Spent ($)" fill={C.spend} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Delayed Task Rate & Severity ─────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Delayed Task Rate */}
        <div>
          <SectionHeader
            title="Delayed Task Rate"
            subtitle="Ratio of delayed tasks (0 = none delayed, 1 = all delayed)"
            icon={<Clock size={16} />}
          />
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-5">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={filteredMonthly} margin={{ top: 5, right: 16, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
                <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 10 }} tickFormatter={shortMonth} interval={2} />
                <YAxis domain={[0, 1.1]} tick={{ fill: '#9ca3af', fontSize: 10 }} width={40}
                  tickFormatter={v => `${(v * 100).toFixed(0)}%`} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="bg-gray-900/95 border border-gray-700/60 rounded-lg p-3 text-xs shadow-xl">
                        <p className="font-semibold text-gray-200 mb-1">{label}</p>
                        <span className="text-amber-400">{((payload[0].value as number) * 100).toFixed(1)}% delayed</span>
                      </div>
                    );
                  }}
                />
                <ReferenceLine y={0.05} stroke="#f59e0b" strokeDasharray="4 3"
                  label={{ value: '5% warning', fill: '#f59e0b', fontSize: 9, position: 'insideTopRight' }} />
                <Area type="monotone" dataKey="delayedTaskRate" name="Delayed Task Rate"
                  stroke={C.delayed} fill={`${C.delayed}20`} strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Score */}
        <div>
          <SectionHeader
            title="Avg Severity Score"
            subtitle="Composite project risk index — higher = more severe"
            icon={<Activity size={16} />}
          />
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-5">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={filteredMonthly} margin={{ top: 5, right: 16, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
                <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 10 }} tickFormatter={shortMonth} interval={2} />
                <YAxis domain={[0, 105]} tick={{ fill: '#9ca3af', fontSize: 10 }} width={36} />
                <Tooltip content={<ChartTooltip />} />
                <ReferenceLine y={60} stroke="#f59e0b" strokeDasharray="4 3"
                  label={{ value: 'Warning: 60', fill: '#f59e0b', fontSize: 9, position: 'insideTopRight' }} />
                <ReferenceLine y={80} stroke="#f87171" strokeDasharray="4 3"
                  label={{ value: 'Critical: 80', fill: '#f87171', fontSize: 9, position: 'insideTopLeft' }} />
                <Bar dataKey="severityScore" name="Severity Score" radius={[3, 3, 0, 0]}>
                  {filteredMonthly.map((entry, i) => (
                    <Cell key={i} fill={severityBarColor(entry.severityScore)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Anomaly Activity ─────────────────────────────────────────────── */}
      <div>
        <SectionHeader
          title="Monthly Anomaly Count"
          subtitle="Number of detected anomaly events per month"
          icon={<AlertTriangle size={16} />}
        />
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-5">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={filteredMonthly} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
              <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 10 }} tickFormatter={shortMonth} interval={2} />
              <YAxis domain={[0, 6]} tick={{ fill: '#9ca3af', fontSize: 10 }} width={28} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="anomalyCount" name="Anomaly Count" radius={[3, 3, 0, 0]}>
                {filteredMonthly.map((entry, i) => (
                  <Cell key={i} fill={anomalyBarColor(entry.anomalyCount)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-3 justify-end">
            {[['0', '#374151'], ['1', '#6366f1'], ['2–3', '#f59e0b'], ['4+', '#f87171']].map(([lbl, col]) => (
              <span key={lbl} className="flex items-center gap-1 text-xs text-gray-400">
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: col }} />
                {lbl}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Prophet Forecast ─────────────────────────────────────────────── */}
      <div>
        <SectionHeader
          title="Prophet Forecast"
          subtitle="6-month forward projection with 95% confidence interval"
          icon={<TrendingUp size={16} />}
        />
        <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            {(['completion', 'budget'] as ForecastKey[]).map(k => (
              <button
                key={k}
                onClick={() => setForecastKey(k)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  forecastKey === k
                    ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                    : 'bg-gray-700/50 border-gray-600/40 text-gray-400 hover:text-gray-200'
                }`}
              >
                {k === 'completion' ? 'Completion Rate' : 'Budget Variance'}
              </button>
            ))}
            <span className="ml-auto text-xs text-gray-500">Shaded = 95% CI &bull; Dashed = forecast &bull; Green = actual</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={forecastData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
              <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 10 }} tickFormatter={shortMonth} interval={1} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} width={48}
                tickFormatter={v => forecastKey === 'completion' ? `${v}%` : `${v}%`} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="upper" name="Upper 95%" stroke="none" fill={`${forecastColor}18`} />
              <Area type="monotone" dataKey="lower" name="Lower 95%" stroke="none" fill="#09090b" />
              <Line type="monotone" dataKey="forecast" name={`Forecast ${forecastLabel}`}
                stroke={forecastColor} strokeWidth={2} strokeDasharray="5 3" dot={false} />
              <Line type="monotone" dataKey="actual" name={`Actual ${forecastLabel}`}
                stroke="#34d399" strokeWidth={2} dot={{ r: 3, fill: '#34d399' }} connectNulls={false} />
              <ReferenceLine y={forecastKey === 'completion' ? 95 : 5} stroke="#f59e0b"
                strokeDasharray="3 2" opacity={0.6} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Anomaly Events Table ─────────────────────────────────────────── */}
      <div>
        <SectionHeader
          title="Project Anomaly Events"
          subtitle={`${PROJECT_ANOMALY_EVENTS.length} detected events — click a row to expand`}
          icon={<ShieldAlert size={16} />}
        />
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {(['all', 'critical', 'warning', 'low'] as SevFilter[]).map(f => {
            const counts = {
              all: PROJECT_ANOMALY_EVENTS.length,
              critical: PROJECT_ANOMALY_EVENTS.filter(e => e.severity === 'critical').length,
              warning:  PROJECT_ANOMALY_EVENTS.filter(e => e.severity === 'warning').length,
              low:      PROJECT_ANOMALY_EVENTS.filter(e => e.severity === 'low').length,
            };
            const colorMap: Record<SevFilter, string> = { all: 'indigo', critical: 'red', warning: 'amber', low: 'blue' };
            const col = colorMap[f];
            return (
              <button
                key={f}
                onClick={() => setSevFilter(f)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all capitalize ${
                  sevFilter === f
                    ? `bg-${col}-500/20 border-${col}-500/40 text-${col}-300`
                    : 'bg-gray-700/50 border-gray-600/40 text-gray-400 hover:text-gray-200'
                }`}
              >
                {f} ({counts[f]})
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-3 px-4 py-2 text-xs text-gray-500 uppercase tracking-wider">
          <span className="w-4 shrink-0" />
          <span className="w-14 shrink-0">Sev</span>
          <span className="w-20 shrink-0">Date</span>
          <span className="w-44 shrink-0">KPI</span>
          <span className="w-24 shrink-0">Value</span>
          <span>Deviation</span>
        </div>
        <div className="space-y-2">
          {filteredAnomalies.map(ev => <AnomalyRow key={ev.id} ev={ev} />)}
        </div>
      </div>

      {/* ── AI Recommendations ───────────────────────────────────────────── */}
      <div>
        <SectionHeader
          title="AI Recommendations"
          subtitle="Derived from trend analysis, anomaly detection, and cross-metric correlations"
          icon={<Lightbulb size={16} />}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {RECOMMENDATIONS.map((rec, i) => <RecCard key={i} rec={rec} />)}
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <div className="border-t border-gray-700/40 pt-4 text-center">
        <p className="text-xs text-gray-500">
          KPI Nexus &bull; Project Domain &bull; Data coverage: Mar 2024 – Apr 2026 &bull; Forecast horizon: Oct 2026
        </p>
      </div>
    </div>
  );
}
