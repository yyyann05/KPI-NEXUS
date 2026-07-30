import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import {
  Network,
  Zap,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  BookOpen,
  Target,
  ShieldAlert,
  Filter,
  AlertTriangle,
} from 'lucide-react';
import {
  CROSS_DOMAIN_FINDINGS,
  TOP_RISKS,
  type CrossDomainFinding,
  type TopRisk,
} from '../data/anomalyData';
import type { DomainType } from '../types/kpi';

// ── Palette ──────────────────────────────────────────────────

const DOMAIN_COLORS: Record<DomainType | string, string> = {
  Financial:             '#6366f1',
  Workforce:             '#22d3ee',
  'Customer Experience': '#f59e0b',
  Project:               '#34d399',
};

const RISK_COLORS: Record<string, string> = {
  'Revenue Risk':     '#6366f1',
  'Operational Risk': '#f59e0b',
  'People Risk':      '#22d3ee',
  'Delivery Risk':    '#34d399',
};

const URGENCY_STYLE: Record<string, string> = {
  Critical: 'bg-red-500/15 border-red-500/40 text-red-400',
  High:     'bg-amber-500/15 border-amber-500/40 text-amber-400',
  Medium:   'bg-indigo-500/15 border-indigo-500/40 text-indigo-400',
};

// ── Custom correlation tooltip ───────────────────────────────

const CorrelationTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d: CrossDomainFinding = payload[0]?.payload?._full;
  if (!d) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-2xl max-w-xs">
      <p className="text-white text-xs font-semibold mb-1">
        {d.driverKpi.replace(/_/g, ' ')}
        <span className="text-gray-500 mx-1">→</span>
        {d.targetKpi.replace(/_/g, ' ')}
      </p>
      <div className="flex gap-3 text-xs mb-2">
        <span style={{ color: d.correlation >= 0 ? '#34d399' : '#ef4444' }} className="font-bold text-sm">
          r = {d.correlation.toFixed(2)}
        </span>
        <span className="text-gray-500">p = {d.pValue.toFixed(4)}</span>
        <span className="text-gray-500">{d.monthsOfData}mo</span>
      </div>
      <p className="text-gray-400 text-xs leading-relaxed">{d.plainEnglish}</p>
    </div>
  );
};

// ── Finding card ─────────────────────────────────────────────

function FindingCard({ finding, rank }: { finding: CrossDomainFinding; rank: number }) {
  const [expanded, setExpanded] = useState(false);
  const isPos = finding.causalDirection === 'positive';

  return (
    <div className="bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-2xl p-5 flex flex-col gap-4 transition-all">
      {/* header */}
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-bold text-gray-400">
          {rank}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span
              className="px-2 py-0.5 rounded-md text-[10px] font-semibold"
              style={{ background: DOMAIN_COLORS[finding.driverDomain] + '25', color: DOMAIN_COLORS[finding.driverDomain] }}
            >
              {finding.driverDomain}
            </span>
            <ArrowRight size={12} className="text-gray-600 self-center" />
            <span
              className="px-2 py-0.5 rounded-md text-[10px] font-semibold"
              style={{ background: DOMAIN_COLORS[finding.targetDomain] + '25', color: DOMAIN_COLORS[finding.targetDomain] }}
            >
              {finding.targetDomain}
            </span>
          </div>
          <p className="text-white text-sm font-medium leading-snug">
            {finding.driverKpi.replace(/_/g, ' ')}
            <span className="text-gray-500 mx-1.5">→</span>
            {finding.targetKpi.replace(/_/g, ' ')}
          </p>
        </div>
      </div>

      {/* correlation badges */}
      <div className="flex flex-wrap gap-2">
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-bold ${
          isPos
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {isPos ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          r = {finding.correlation.toFixed(2)}
        </div>
        <div className="px-2.5 py-1 rounded-lg border border-gray-700 text-gray-400 text-xs">
          p = {finding.pValue.toFixed(4)}
        </div>
        <div className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
          finding.strengthLabel === 'Strong'
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
            : finding.strengthLabel === 'Moderate'
            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
            : 'bg-gray-800 text-gray-500 border border-gray-700'
        }`}>
          {finding.strengthLabel}
        </div>
        <div
          className="px-2.5 py-1 rounded-lg text-xs font-medium border"
          style={{
            background: RISK_COLORS[finding.riskCategory] + '18',
            borderColor: RISK_COLORS[finding.riskCategory] + '40',
            color: RISK_COLORS[finding.riskCategory],
          }}
        >
          {finding.riskCategory}
        </div>
      </div>

      {/* plain English */}
      <p className="text-gray-300 text-xs leading-relaxed">{finding.plainEnglish}</p>

      {/* expand toggle */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="text-indigo-400 hover:text-indigo-300 text-xs font-medium text-left transition-colors"
      >
        {expanded ? '▲ Hide details' : '▼ Business explanation & action'}
      </button>

      {expanded && (
        <div className="space-y-3 border-t border-gray-800 pt-3">
          {/* Business explanation */}
          <div className="flex gap-2.5">
            <BookOpen size={14} className="text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-indigo-400 text-[10px] font-semibold uppercase tracking-wide mb-1">Business Explanation</p>
              <p className="text-gray-400 text-xs leading-relaxed">{finding.businessExplanation}</p>
            </div>
          </div>
          {/* Executive action */}
          <div className="flex gap-2.5">
            <Target size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-emerald-400 text-[10px] font-semibold uppercase tracking-wide mb-1">Recommended Executive Action</p>
              <p className="text-gray-400 text-xs leading-relaxed">{finding.executiveAction}</p>
            </div>
          </div>
          {/* Alert if present */}
          {finding.alertText && (
            <div className="flex gap-2.5 bg-amber-500/8 border border-amber-500/25 rounded-lg p-3">
              <AlertTriangle size={13} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-amber-300 text-xs leading-relaxed">{finding.alertText}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Risk card ────────────────────────────────────────────────

function RiskCard({ risk }: { risk: TopRisk }) {
  return (
    <div className={`rounded-2xl border p-5 flex flex-col gap-3 ${URGENCY_STYLE[risk.urgency]}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-gray-700">#{risk.rank}</span>
          <div>
            <div className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 ${
              risk.urgency === 'Critical' ? 'text-red-400' :
              risk.urgency === 'High'     ? 'text-amber-400' : 'text-indigo-400'
            }`}>
              {risk.urgency}
            </div>
            <h4 className="text-white font-semibold text-sm leading-snug">{risk.title}</h4>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {risk.domains.map((d) => (
          <span
            key={d}
            className="px-2 py-0.5 rounded-md text-[10px] font-semibold"
            style={{ background: DOMAIN_COLORS[d] + '25', color: DOMAIN_COLORS[d] }}
          >
            {d}
          </span>
        ))}
      </div>

      <p className="text-gray-300 text-xs leading-relaxed">{risk.description}</p>

      <div className="border-t border-gray-800 pt-2">
        <p className="text-gray-500 text-[10px] font-medium">Key signal</p>
        <p className="text-gray-300 text-xs mt-0.5 font-medium">{risk.linkedCorrelation}</p>
      </div>
    </div>
  );
}

// ── Filters ──────────────────────────────────────────────────

const DOMAIN_FILTERS: (DomainType | 'All')[] = [
  'All', 'Financial', 'Workforce', 'Customer Experience', 'Project',
];

const STRENGTH_FILTERS = ['All', 'Strong', 'Moderate', 'Weak'] as const;

// ── Main page ────────────────────────────────────────────────

const CrossDomainIntelligencePage: React.FC = () => {
  const [domainFilter, setDomainFilter] = useState<DomainType | 'All'>('All');
  const [strengthFilter, setStrengthFilter] = useState<'All' | 'Strong' | 'Moderate' | 'Weak'>('All');

  const filteredFindings = useMemo(() => {
    return CROSS_DOMAIN_FINDINGS.filter((f) => {
      const domOk = domainFilter === 'All' || f.driverDomain === domainFilter || f.targetDomain === domainFilter;
      const strOk = strengthFilter === 'All' || f.strengthLabel === strengthFilter;
      return domOk && strOk;
    });
  }, [domainFilter, strengthFilter]);

  // Chart data: sorted by |correlation|
  const chartData = useMemo(() => {
    return CROSS_DOMAIN_FINDINGS
      .slice()
      .sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation))
      .map((f, i) => ({
        label: `${f.driverKpi.split('_').slice(-2).join(' ')} → ${f.targetKpi.split('_').slice(-2).join(' ')}`,
        shortLabel: `${i + 1}`,
        correlation: f.correlation,
        _full: f,
      }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-8">
      {/* ── Page header ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <Network size={22} className="text-indigo-400" />
            <h1 className="text-2xl font-bold">Cross-Domain Intelligence</h1>
          </div>
          <p className="text-gray-400 text-sm">
            Granger causality findings and strongest correlations across all business domains
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-gray-400">
          <Zap size={13} className="text-indigo-400" />
          <span>{CROSS_DOMAIN_FINDINGS.length} causal relationships identified</span>
        </div>
      </div>

      {/* ── Summary stat row ──────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Findings', value: CROSS_DOMAIN_FINDINGS.length, sub: 'Causal relationships', icon: <Network size={16} className="text-indigo-400" /> },
          { label: 'Strong Correlations', value: CROSS_DOMAIN_FINDINGS.filter(f => f.strengthLabel === 'Strong').length, sub: '|r| ≥ 0.50', icon: <Zap size={16} className="text-emerald-400" /> },
          { label: 'Risk Categories', value: 4, sub: 'Revenue · Ops · People · Delivery', icon: <ShieldAlert size={16} className="text-amber-400" /> },
          { label: 'Domains Linked', value: 4, sub: 'All domains interconnected', icon: <Network size={16} className="text-cyan-400" /> },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-gray-800 bg-gray-900 p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm font-medium">{s.label}</span>
              {s.icon}
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Correlation strength chart ────────────────────────── */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="mb-1">
          <h2 className="text-lg font-semibold">Correlation Strength Overview</h2>
          <p className="text-gray-500 text-xs mt-0.5">
            All {CROSS_DOMAIN_FINDINGS.length} cross-domain correlations, sorted by |r|. Green = positive, red = negative.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 8, right: 40, left: 220, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
            <XAxis
              type="number"
              domain={[-1, 1]}
              tick={{ fill: '#6b7280', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: '#374151' }}
              tickFormatter={(v) => v.toFixed(1)}
            />
            <YAxis
              type="category"
              dataKey="label"
              tick={{ fill: '#9ca3af', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              width={215}
            />
            <ReferenceLine x={0} stroke="#374151" strokeWidth={1.5} />
            <Tooltip content={<CorrelationTooltip />} />
            <Bar dataKey="correlation" radius={[0, 4, 4, 0]}>
              {chartData.map((d, i) => (
                <Cell
                  key={i}
                  fill={d.correlation >= 0 ? '#34d399' : '#ef4444'}
                  fillOpacity={0.8 + 0.2 * (Math.abs(d.correlation) / 0.7)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Top Risks ─────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <ShieldAlert size={18} className="text-red-400" />
          <h2 className="text-lg font-semibold">Top Risks</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {TOP_RISKS.map((r) => (
            <RiskCard key={r.id} risk={r} />
          ))}
        </div>
      </div>

      {/* ── Individual findings ───────────────────────────────── */}
      <div>
        {/* filters */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Filter size={14} />
            <span>Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {DOMAIN_FILTERS.map((d) => (
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
            {STRENGTH_FILTERS.map((sv) => (
              <button
                key={sv}
                onClick={() => setStrengthFilter(sv)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                  strengthFilter === sv
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500'
                }`}
              >
                {sv}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Causal Findings</h2>
            <p className="text-gray-500 text-xs mt-0.5">
              Expand any card for business explanation and recommended executive action
            </p>
          </div>
          <span className="text-xs text-gray-500 bg-gray-900 border border-gray-800 px-3 py-1 rounded-full">
            {filteredFindings.length} of {CROSS_DOMAIN_FINDINGS.length} findings
          </span>
        </div>

        {filteredFindings.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            No findings match the selected filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredFindings.map((f, i) => (
              <FindingCard key={f.id} finding={f} rank={i + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrossDomainIntelligencePage;
