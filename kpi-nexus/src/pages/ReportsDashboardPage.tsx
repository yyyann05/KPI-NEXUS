import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Cell,
} from 'recharts';
import {
  FileText,
  Download,
  FileSpreadsheet,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronUp,
  Mail,
  Play,
  Pause,
  Eye,
  RefreshCw,
  Shield,
  Users,
  Heart,
  Briefcase,
  DollarSign,
  Plus,
  Trash2,
} from 'lucide-react';
import {
  EXECUTIVE_SUMMARY,
  FINANCIAL_QUARTERLY,
  FINANCIAL_KPI_CARDS,
  FINANCIAL_INSIGHTS,
  WORKFORCE_QUARTERLY,
  WORKFORCE_KPI_CARDS,
  WORKFORCE_INSIGHTS,
  CX_QUARTERLY,
  CX_KPI_CARDS,
  CX_INSIGHTS,
  PROJECT_QUARTERLY,
  PROJECT_KPI_CARDS,
  PROJECT_INSIGHTS,
  RECENT_REPORTS,
  SCHEDULED_REPORTS,
  type ReportType,
  type ScheduledReport,
  type RecentReport,
} from '../data/reportData';

// ── constants ─────────────────────────────────────────────────────────────────

const TABS: { id: ReportType; label: string; icon: React.ReactNode }[] = [
  { id: 'executive',  label: 'Executive Summary',        icon: <Shield className="w-4 h-4" /> },
  { id: 'financial',  label: 'Financial Report',         icon: <DollarSign className="w-4 h-4" /> },
  { id: 'workforce',  label: 'Workforce Report',         icon: <Users className="w-4 h-4" /> },
  { id: 'customer',   label: 'Customer Experience',      icon: <Heart className="w-4 h-4" /> },
  { id: 'project',    label: 'Project Report',           icon: <Briefcase className="w-4 h-4" /> },
];

const TYPE_COLORS: Record<ReportType, string> = {
  executive:  '#6366f1',
  financial:  '#22d3ee',
  workforce:  '#34d399',
  customer:   '#a78bfa',
  project:    '#f59e0b',
};

const TYPE_LABELS: Record<ReportType, string> = {
  executive:  'Executive',
  financial:  'Financial',
  workforce:  'Workforce',
  customer:   'Customer',
  project:    'Project',
};

const FREQ_LABELS: Record<string, string> = {
  daily:     'Daily',
  weekly:    'Weekly',
  monthly:   'Monthly',
  quarterly: 'Quarterly',
  'one-time':'One-time',
};

// ── helpers ───────────────────────────────────────────────────────────────────

const fmtDateTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    + ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

const pct = (v: number) => `${v.toFixed(1)}%`;

const dirIcon = (dir: 'up' | 'down' | 'neutral') =>
  dir === 'up'   ? <TrendingUp   className="w-3.5 h-3.5 text-emerald-400" /> :
  dir === 'down' ? <TrendingDown className="w-3.5 h-3.5 text-red-400"    /> :
                   <Minus        className="w-3.5 h-3.5 text-slate-400"   />;

const dirClass = (dir: 'up' | 'down' | 'neutral') =>
  dir === 'up'   ? 'text-emerald-400' :
  dir === 'down' ? 'text-red-400'     : 'text-slate-400';

// ── sub-components ────────────────────────────────────────────────────────────

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">{children}</h3>
);

const KpiGrid = ({ cards }: { cards: typeof FINANCIAL_KPI_CARDS }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
    {cards.map((c, i) => (
      <div key={i} className="bg-white/5 rounded-xl border border-white/10 p-4">
        <p className="text-xs text-slate-400 mb-1">{c.label}</p>
        <p className="text-xl font-bold text-white">{c.value}</p>
        <div className="flex items-center gap-1 mt-1">
          {dirIcon(c.changeDir)}
          <span className={`text-xs font-medium ${dirClass(c.changeDir)}`}>{c.change}</span>
          <span className="text-xs text-slate-500 ml-1">{c.sub}</span>
        </div>
        <div className="mt-2 h-1 rounded-full bg-white/10">
          <div className="h-1 rounded-full" style={{ width: '60%', background: c.color }} />
        </div>
      </div>
    ))}
  </div>
);

const InsightsBox = ({ items }: { items: string[] }) => (
  <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-xl p-4 mb-6">
    <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3">AI-Generated Insights</p>
    <ul className="space-y-2">
      {items.map((s, i) => (
        <li key={i} className="flex gap-2 text-sm text-slate-300">
          <span className="text-indigo-400 mt-0.5">•</span>
          <span>{s}</span>
        </li>
      ))}
    </ul>
  </div>
);

// ── Executive Summary Tab ─────────────────────────────────────────────────────

const ExecutiveTab = () => {
  const ex = EXECUTIVE_SUMMARY;

  const radarData = ex.domainScores.map(d => ({ subject: d.domain, score: d.score }));

  return (
    <div className="space-y-6">
      {/* Header strip */}
      <div className="flex flex-wrap gap-4 items-start justify-between">
        <div>
          <p className="text-xs text-slate-400">Report Period</p>
          <p className="text-white font-semibold">{ex.period}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Report Date</p>
          <p className="text-white font-semibold">{ex.reportDate}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Overall Health Score</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">{ex.overallScore}</span>
            <span className="text-slate-400 text-sm">/100</span>
            <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {ex.overallScore >= 80 ? 'Healthy' : ex.overallScore >= 60 ? 'Moderate' : 'At Risk'}
            </span>
          </div>
          <div className="mt-1 h-2 w-48 rounded-full bg-white/10">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-indigo-500"
              style={{ width: `${ex.overallScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <KpiGrid cards={ex.kpis} />

      {/* Domain Scores + Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-xl border border-white/10 p-5">
          <SectionTitle>Domain Health Scores</SectionTitle>
          <div className="space-y-4">
            {ex.domainScores.map((d) => (
              <div key={d.domain}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-slate-300">{d.domain}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{d.score}</span>
                    {d.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> :
                     d.trend === 'down' ? <TrendingDown className="w-3.5 h-3.5 text-red-400" /> :
                     <Minus className="w-3.5 h-3.5 text-slate-400" />}
                  </div>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{ width: `${d.score}%`, background: d.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-xl border border-white/10 p-5">
          <SectionTitle>Performance Radar</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#475569', fontSize: 10 }} tickCount={4} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.25}
                dot={{ r: 3, fill: '#818cf8' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Highlights / Risks / Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Key Highlights', items: ex.highlights, cls: 'border-emerald-500/30 bg-emerald-500/5', dot: 'text-emerald-400' },
          { title: 'Risks',          items: ex.risks,       cls: 'border-red-500/30 bg-red-500/5',         dot: 'text-red-400'     },
          { title: 'Opportunities',  items: ex.opportunities,cls: 'border-indigo-500/30 bg-indigo-500/5',  dot: 'text-indigo-400'  },
        ].map(({ title, items, cls, dot }) => (
          <div key={title} className={`rounded-xl border p-4 ${cls}`}>
            <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">{title}</p>
            <ul className="space-y-2">
              {items.map((s, i) => (
                <li key={i} className="flex gap-2 text-xs text-slate-300">
                  <span className={`${dot} mt-0.5 shrink-0`}>•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Financial Report Tab ──────────────────────────────────────────────────────

const FinancialTab = () => {
  const [expanded, setExpanded] = useState(false);

  const barData = FINANCIAL_QUARTERLY.map(r => ({
    period: r.period,
    Revenue: Math.round(r.revenue / 1000),
    'Cash Flow': Math.round(r.cashFlow / 1000),
    'Net Income': Math.round(r.netIncome / 1000),
  }));

  const marginData = FINANCIAL_QUARTERLY.map(r => ({
    period: r.period,
    'Profit Margin %': +(r.profitMargin * 100).toFixed(1),
    'D/E Ratio': +r.debtToEquity.toFixed(2),
  }));

  return (
    <div className="space-y-6">
      <KpiGrid cards={FINANCIAL_KPI_CARDS} />

      {/* Revenue / CF / NI Chart */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-5">
        <SectionTitle>Revenue, Cash Flow & Net Income — Quarterly ($K)</SectionTitle>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={barData} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="period" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={v => `$${v}K`} />
            <Tooltip
              contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
              labelStyle={{ color: '#e2e8f0' }}
              itemStyle={{ color: '#94a3b8' }}
              formatter={(v: number) => [`$${v}K`, '']}
            />
            <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
            <Bar dataKey="Revenue"     fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Cash Flow"   fill="#22d3ee" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Net Income"  fill="#34d399" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Margin + D/E Chart */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-5">
        <SectionTitle>Profit Margin & Debt-to-Equity Ratio — Quarterly</SectionTitle>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={marginData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="period" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis yAxisId="left"  tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={v => `${v}%`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={v => `${v}×`} />
            <Tooltip
              contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
            <Line yAxisId="left"  dataKey="Profit Margin %" stroke="#a78bfa" strokeWidth={2} dot={{ r: 3 }} />
            <Line yAxisId="right" dataKey="D/E Ratio"       stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Data Table */}
      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <div
          className="flex items-center justify-between px-5 py-3 border-b border-white/10 cursor-pointer hover:bg-white/5"
          onClick={() => setExpanded(!expanded)}
        >
          <SectionTitle>Quarterly Data Table</SectionTitle>
          {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
        {expanded && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-slate-400 text-xs uppercase">
                  {['Period','Revenue','Cash Flow','Net Income','Expenditure','Profit Margin','D/E','Anomalies'].map(h => (
                    <th key={h} className="px-4 py-2 text-right first:text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FINANCIAL_QUARTERLY.map((r, i) => (
                  <tr key={i} className="border-t border-white/5 hover:bg-white/5">
                    <td className="px-4 py-2 text-slate-200 font-medium">{r.period}</td>
                    <td className="px-4 py-2 text-right text-slate-300">${(r.revenue/1000).toFixed(1)}K</td>
                    <td className="px-4 py-2 text-right text-slate-300">${(r.cashFlow/1000).toFixed(1)}K</td>
                    <td className="px-4 py-2 text-right text-slate-300">${(r.netIncome/1000).toFixed(1)}K</td>
                    <td className="px-4 py-2 text-right text-slate-300">${(r.expenditure/1000).toFixed(1)}K</td>
                    <td className="px-4 py-2 text-right text-slate-300">{pct(r.profitMargin * 100)}</td>
                    <td className="px-4 py-2 text-right text-slate-300">{r.debtToEquity.toFixed(2)}×</td>
                    <td className="px-4 py-2 text-right">
                      <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
                        r.anomalyCount > 3 ? 'bg-red-500/20 text-red-300' :
                        r.anomalyCount > 0 ? 'bg-amber-500/20 text-amber-300' :
                        'bg-emerald-500/20 text-emerald-300'
                      }`}>{r.anomalyCount}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <InsightsBox items={FINANCIAL_INSIGHTS} />
    </div>
  );
};

// ── Workforce Report Tab ──────────────────────────────────────────────────────

const WorkforceTab = () => {
  const [expanded, setExpanded] = useState(false);

  const prodData = WORKFORCE_QUARTERLY.map(r => ({
    period: r.period,
    Productivity: +r.productivity.toFixed(1),
    Engagement:   +r.engagement.toFixed(1),
    Attendance:   +r.attendance.toFixed(1),
  }));

  const turnoverData = WORKFORCE_QUARTERLY.map(r => ({
    period: r.period,
    'Turnover %':   +r.turnoverRate.toFixed(2),
    'Overtime hrs': +r.overtimeHours.toFixed(1),
    Anomalies:      r.anomalyCount,
  }));

  return (
    <div className="space-y-6">
      <KpiGrid cards={WORKFORCE_KPI_CARDS} />

      <div className="bg-white/5 rounded-xl border border-white/10 p-5">
        <SectionTitle>Productivity, Engagement & Attendance — Quarterly (Score / %)</SectionTitle>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={prodData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="period" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis domain={[60, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
            <Line dataKey="Productivity" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} />
            <Line dataKey="Engagement"   stroke="#34d399" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="5 3" />
            <Line dataKey="Attendance"   stroke="#22d3ee" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="2 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/5 rounded-xl border border-white/10 p-5">
        <SectionTitle>Turnover Rate & Overtime Hours — Quarterly</SectionTitle>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={turnoverData} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="period" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis yAxisId="left"  tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
            <Bar yAxisId="left"  dataKey="Turnover %"   fill="#f87171" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="Overtime hrs" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <div
          className="flex items-center justify-between px-5 py-3 border-b border-white/10 cursor-pointer hover:bg-white/5"
          onClick={() => setExpanded(!expanded)}
        >
          <SectionTitle>Quarterly Data Table</SectionTitle>
          {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
        {expanded && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-slate-400 text-xs uppercase">
                  {['Period','Attendance %','Productivity','Engagement','Training h','Overtime h','Turnover %','Anomalies'].map(h => (
                    <th key={h} className="px-4 py-2 text-right first:text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WORKFORCE_QUARTERLY.map((r, i) => (
                  <tr key={i} className="border-t border-white/5 hover:bg-white/5">
                    <td className="px-4 py-2 text-slate-200 font-medium">{r.period}</td>
                    <td className="px-4 py-2 text-right text-slate-300">{r.attendance.toFixed(1)}%</td>
                    <td className="px-4 py-2 text-right text-slate-300">{r.productivity.toFixed(1)}</td>
                    <td className="px-4 py-2 text-right text-slate-300">{r.engagement.toFixed(1)}</td>
                    <td className="px-4 py-2 text-right text-slate-300">{r.trainingHours.toFixed(1)}</td>
                    <td className="px-4 py-2 text-right text-slate-300">{r.overtimeHours.toFixed(1)}</td>
                    <td className="px-4 py-2 text-right text-slate-300">{pct(r.turnoverRate)}</td>
                    <td className="px-4 py-2 text-right">
                      <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
                        r.anomalyCount > 15 ? 'bg-red-500/20 text-red-300' :
                        r.anomalyCount > 8  ? 'bg-amber-500/20 text-amber-300' :
                        'bg-emerald-500/20 text-emerald-300'
                      }`}>{r.anomalyCount}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <InsightsBox items={WORKFORCE_INSIGHTS} />
    </div>
  );
};

// ── Customer Experience Report Tab ────────────────────────────────────────────

const CustomerTab = () => {
  const [expanded, setExpanded] = useState(false);

  const satisfactionData = CX_QUARTERLY.map(r => ({
    period: r.period,
    'CSAT ×10': +(r.csat * 10).toFixed(2),
    NPS: +r.nps.toFixed(1),
  }));

  const ticketsData = CX_QUARTERLY.map(r => ({
    period: r.period,
    'Support Tickets': r.supportTickets,
    'Response Time (min)': +r.responseTime.toFixed(1),
    'Churn %': +(r.churnRate * 100).toFixed(1),
  }));

  return (
    <div className="space-y-6">
      <KpiGrid cards={CX_KPI_CARDS} />

      <div className="bg-white/5 rounded-xl border border-white/10 p-5">
        <SectionTitle>CSAT & NPS Trends — Quarterly</SectionTitle>
        <p className="text-xs text-slate-500 mb-3">CSAT shown ×10 to align scale with NPS</p>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={satisfactionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="period" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis domain={[30, 70]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
            <Line dataKey="CSAT ×10" stroke="#a78bfa" strokeWidth={2.5} dot={{ r: 4 }} />
            <Line dataKey="NPS"      stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/5 rounded-xl border border-white/10 p-5">
        <SectionTitle>Support Volume & Churn — Quarterly</SectionTitle>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={ticketsData} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="period" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis yAxisId="left"  tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
            <Bar yAxisId="left"  dataKey="Support Tickets"      fill="#22d3ee" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="left"  dataKey="Response Time (min)"  fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="Churn %"              fill="#f87171" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <div
          className="flex items-center justify-between px-5 py-3 border-b border-white/10 cursor-pointer hover:bg-white/5"
          onClick={() => setExpanded(!expanded)}
        >
          <SectionTitle>Quarterly Data Table</SectionTitle>
          {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
        {expanded && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-slate-400 text-xs uppercase">
                  {['Period','CSAT','NPS','Response Time','Support Tickets','Churn Rate','Anomalies'].map(h => (
                    <th key={h} className="px-4 py-2 text-right first:text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CX_QUARTERLY.map((r, i) => (
                  <tr key={i} className="border-t border-white/5 hover:bg-white/5">
                    <td className="px-4 py-2 text-slate-200 font-medium">{r.period}</td>
                    <td className="px-4 py-2 text-right text-slate-300">{r.csat.toFixed(3)}</td>
                    <td className="px-4 py-2 text-right text-slate-300">{r.nps.toFixed(1)}</td>
                    <td className="px-4 py-2 text-right text-slate-300">{r.responseTime.toFixed(1)} min</td>
                    <td className="px-4 py-2 text-right text-slate-300">{r.supportTickets.toLocaleString()}</td>
                    <td className="px-4 py-2 text-right text-slate-300">{pct(r.churnRate * 100)}</td>
                    <td className="px-4 py-2 text-right">
                      <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
                        r.anomalyCount > 25 ? 'bg-red-500/20 text-red-300' :
                        r.anomalyCount > 15 ? 'bg-amber-500/20 text-amber-300' :
                        'bg-emerald-500/20 text-emerald-300'
                      }`}>{r.anomalyCount}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <InsightsBox items={CX_INSIGHTS} />
    </div>
  );
};

// ── Project Report Tab ────────────────────────────────────────────────────────

const ProjectTab = () => {
  const [expanded, setExpanded] = useState(false);

  const completionData = PROJECT_QUARTERLY.map(r => ({
    period: r.period,
    'Completion %':     +r.completionRate.toFixed(1),
    'Budget Variance %':+r.budgetVariancePct.toFixed(1),
    'Delayed Task %':   +(r.delayedTaskRate * 100).toFixed(1),
  }));

  const budgetData = PROJECT_QUARTERLY.map(r => ({
    period: r.period,
    'Budget Spent $K': Math.round(r.totalBudgetSpent / 1000),
    Anomalies: r.anomalyCount,
  }));

  return (
    <div className="space-y-6">
      <KpiGrid cards={PROJECT_KPI_CARDS} />

      <div className="bg-white/5 rounded-xl border border-white/10 p-5">
        <SectionTitle>Completion Rate, Budget Variance & Delay Rate — Quarterly (%)</SectionTitle>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={completionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="period" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={v => `${v}%`} />
            <Tooltip
              contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
              labelStyle={{ color: '#e2e8f0' }}
              formatter={(v: number) => [`${v}%`, '']}
            />
            <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
            <Line dataKey="Completion %"      stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
            <Line dataKey="Budget Variance %" stroke="#f59e0b" strokeWidth={2}   dot={{ r: 3 }} strokeDasharray="5 3" />
            <Line dataKey="Delayed Task %"    stroke="#f87171" strokeWidth={2}   dot={{ r: 3 }} strokeDasharray="3 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/5 rounded-xl border border-white/10 p-5">
        <SectionTitle>Budget Spent & Anomalies — Quarterly</SectionTitle>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={budgetData} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="period" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis yAxisId="left"  tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={v => `$${v}K`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
            <Bar yAxisId="left"  dataKey="Budget Spent $K" radius={[4, 4, 0, 0]}>
              {budgetData.map((d, i) => (
                <Cell key={i} fill={d['Budget Spent $K'] > 2000 ? '#f87171' : '#6366f1'} />
              ))}
            </Bar>
            <Bar yAxisId="right" dataKey="Anomalies" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <div
          className="flex items-center justify-between px-5 py-3 border-b border-white/10 cursor-pointer hover:bg-white/5"
          onClick={() => setExpanded(!expanded)}
        >
          <SectionTitle>Quarterly Data Table</SectionTitle>
          {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
        {expanded && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-slate-400 text-xs uppercase">
                  {['Period','Completion %','Budget Variance %','Delayed Task %','Budget Spent','Anomalies'].map(h => (
                    <th key={h} className="px-4 py-2 text-right first:text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PROJECT_QUARTERLY.map((r, i) => (
                  <tr key={i} className="border-t border-white/5 hover:bg-white/5">
                    <td className="px-4 py-2 text-slate-200 font-medium">{r.period}</td>
                    <td className={`px-4 py-2 text-right font-medium ${r.completionRate < 80 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {r.completionRate.toFixed(1)}%
                    </td>
                    <td className={`px-4 py-2 text-right ${r.budgetVariancePct < 0 ? 'text-red-400' : 'text-amber-400'}`}>
                      {r.budgetVariancePct > 0 ? '+' : ''}{r.budgetVariancePct.toFixed(1)}%
                    </td>
                    <td className="px-4 py-2 text-right text-slate-300">{pct(r.delayedTaskRate * 100)}</td>
                    <td className="px-4 py-2 text-right text-slate-300">${(r.totalBudgetSpent / 1000).toFixed(0)}K</td>
                    <td className="px-4 py-2 text-right">
                      <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
                        r.anomalyCount >= 5  ? 'bg-red-500/20 text-red-300' :
                        r.anomalyCount >= 2  ? 'bg-amber-500/20 text-amber-300' :
                        'bg-emerald-500/20 text-emerald-300'
                      }`}>{r.anomalyCount}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <InsightsBox items={PROJECT_INSIGHTS} />
    </div>
  );
};

// ── Recent Reports Table ──────────────────────────────────────────────────────

const RecentReportsSection = () => {
  const [filter, setFilter] = useState<ReportType | 'all'>('all');
  const [sortAsc, setSortAsc] = useState(false);
  const [viewingReport, setViewingReport] = useState<RecentReport | null>(null);

  const filtered = RECENT_REPORTS
    .filter(r => filter === 'all' || r.type === filter)
    .sort((a, b) => {
      const diff = new Date(a.generatedAt).getTime() - new Date(b.generatedAt).getTime();
      return sortAsc ? diff : -diff;
    });

  const FMT_ICON: Record<string, React.ReactNode> = {
    PDF:   <FileText        className="w-3.5 h-3.5" />,
    Excel: <FileSpreadsheet className="w-3.5 h-3.5" />,
    CSV:   <FileText        className="w-3.5 h-3.5" />,
  };

  return (
    <>
    <ViewReportModal report={viewingReport} onClose={() => setViewingReport(null)} />
    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center justify-between px-5 py-4 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Recent Reports</h3>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'executive', 'financial', 'workforce', 'customer', 'project'] as const).map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                filter === t
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {t === 'all' ? 'All Types' : TYPE_LABELS[t]}
            </button>
          ))}
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Clock className="w-3 h-3" />
            {sortAsc ? 'Oldest first' : 'Newest first'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/5 text-slate-400 text-xs uppercase">
              <th className="px-5 py-3 text-left font-medium">Report Name</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Generated</th>
              <th className="px-4 py-3 text-left font-medium">By</th>
              <th className="px-4 py-3 text-right font-medium">Size</th>
              <th className="px-4 py-3 text-right font-medium">Pages</th>
              <th className="px-4 py-3 text-center font-medium">Format</th>
              <th className="px-4 py-3 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-white/5 hover:bg-white/5 group">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-slate-200 group-hover:text-white">{r.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      background: TYPE_COLORS[r.type] + '22',
                      color: TYPE_COLORS[r.type],
                      border: `1px solid ${TYPE_COLORS[r.type]}44`,
                    }}
                  >
                    {TYPE_LABELS[r.type]}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-400 text-xs">{fmtDateTime(r.generatedAt)}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{r.generatedBy}</td>
                <td className="px-4 py-3 text-right text-slate-400 text-xs">{r.size}</td>
                <td className="px-4 py-3 text-right text-slate-400 text-xs">
                  {r.pages > 0 ? r.pages : '—'}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${
                    r.format === 'PDF'   ? 'bg-red-500/15 text-red-300' :
                    r.format === 'Excel' ? 'bg-emerald-500/15 text-emerald-300' :
                    'bg-slate-500/15 text-slate-300'
                  }`}>
                    {FMT_ICON[r.format]}
                    {r.format}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setViewingReport(r)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-300 transition-colors"
                      title="View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => r.format === 'PDF' ? exportTabPDF(r.type) : exportTabCSV(r.type)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-300 transition-colors"
                      title="Download"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 border-t border-white/5 text-xs text-slate-500">
        Showing {filtered.length} of {RECENT_REPORTS.length} reports
      </div>
    </div>
    </>
  );
};

// ── Schedule Reports Section ──────────────────────────────────────────────────

const ScheduleSection = () => {
  const [schedules, setSchedules] = useState<ScheduledReport[]>(SCHEDULED_REPORTS);
  const [newOpen, setNewOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<ReportType>('executive');
  const [newFreq, setNewFreq] = useState<ScheduledReport['frequency']>('monthly');
  const [newEmail, setNewEmail] = useState('');

  const toggle = (id: string) =>
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));

  const remove = (id: string) =>
    setSchedules(prev => prev.filter(s => s.id !== id));

  const add = () => {
    if (!newName.trim()) return;
    const s: ScheduledReport = {
      id: `s${Date.now()}`,
      name: newName.trim(),
      type: newType,
      frequency: newFreq,
      nextRun: new Date(Date.now() + 86400000).toISOString(),
      recipients: newEmail.split(',').map(e => e.trim()).filter(Boolean),
      enabled: true,
    };
    setSchedules(prev => [...prev, s]);
    setNewName(''); setNewEmail(''); setNewOpen(false);
  };

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Schedule Reports</h3>
        <button
          onClick={() => setNewOpen(!newOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          New Schedule
        </button>
      </div>

      {/* New schedule form */}
      {newOpen && (
        <div className="px-5 py-4 border-b border-white/10 bg-indigo-950/30">
          <p className="text-xs font-semibold text-indigo-300 mb-3 uppercase tracking-wider">New Scheduled Report</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Report name"
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <select
              value={newType}
              onChange={e => setNewType(e.target.value as ReportType)}
              className="px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              {(['executive','financial','workforce','customer','project'] as ReportType[]).map(t => (
                <option key={t} value={t}>{TYPE_LABELS[t]}</option>
              ))}
            </select>
            <select
              value={newFreq}
              onChange={e => setNewFreq(e.target.value as ScheduledReport['frequency'])}
              className="px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500"
            >
              {(['daily','weekly','monthly','quarterly'] as const).map(f => (
                <option key={f} value={f}>{FREQ_LABELS[f]}</option>
              ))}
            </select>
            <input
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              placeholder="Recipients (comma-separated)"
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={add} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors">
              Save Schedule
            </button>
            <button onClick={() => setNewOpen(false)} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Schedule rows */}
      <div className="divide-y divide-white/5">
        {schedules.map((s) => (
          <div key={s.id} className="px-5 py-4 hover:bg-white/5 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex items-start gap-3 min-w-0">
              <div
                className="mt-0.5 w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: s.enabled ? TYPE_COLORS[s.type] : '#475569' }}
              />
              <div className="min-w-0">
                <p className={`text-sm font-medium truncate ${s.enabled ? 'text-white' : 'text-slate-500'}`}>{s.name}</p>
                <div className="flex flex-wrap gap-2 mt-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {FREQ_LABELS[s.frequency]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Next: {fmtDate(s.nextRun)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {s.recipients.length} recipient{s.recipients.length !== 1 ? 's' : ''}
                  </span>
                </div>
                {s.recipients.length > 0 && (
                  <p className="text-xs text-slate-600 mt-0.5 truncate">{s.recipients.join(', ')}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className="px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  background: TYPE_COLORS[s.type] + '22',
                  color: TYPE_COLORS[s.type],
                  border: `1px solid ${TYPE_COLORS[s.type]}44`,
                }}
              >
                {TYPE_LABELS[s.type]}
              </span>
              <button
                onClick={() => toggle(s.id)}
                title={s.enabled ? 'Pause' : 'Resume'}
                className={`p-1.5 rounded-lg transition-colors ${
                  s.enabled
                    ? 'bg-amber-500/15 hover:bg-amber-500/30 text-amber-300'
                    : 'bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300'
                }`}
              >
                {s.enabled ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => remove(s.id)}
                title="Delete"
                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {schedules.length === 0 && (
        <p className="px-5 py-6 text-sm text-slate-500 text-center">No scheduled reports. Click "New Schedule" to add one.</p>
      )}
    </div>
  );
};

// ── Export helpers ────────────────────────────────────────────────────────────

const downloadCSV = (filename: string, rows: string[][], headers: string[]) => {
  const escape = (v: string | number) => {
    const s = String(v);
    return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [headers.map(escape).join(','), ...rows.map(r => r.map(escape).join(','))];
  // \uFEFF BOM ensures Excel opens UTF-8 correctly
  const blob = new Blob(['\uFEFF' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const exportTabCSV = (tab: ReportType) => {
  if (tab === 'financial') {
    downloadCSV(
      'financial-report.csv',
      FINANCIAL_QUARTERLY.map(r => [
        r.period, String(r.revenue), String(r.cashFlow), String(r.netIncome),
        String(r.expenditure), (r.profitMargin * 100).toFixed(1) + '%',
        r.debtToEquity.toFixed(2), String(r.anomalyCount),
      ]),
      ['Period', 'Revenue', 'Cash Flow', 'Net Income', 'Expenditure', 'Profit Margin', 'D/E Ratio', 'Anomalies'],
    );
  } else if (tab === 'workforce') {
    downloadCSV(
      'workforce-report.csv',
      WORKFORCE_QUARTERLY.map(r => [
        r.period, r.attendance.toFixed(1) + '%', r.productivity.toFixed(1),
        r.engagement.toFixed(1), r.trainingHours.toFixed(1), r.overtimeHours.toFixed(1),
        r.turnoverRate.toFixed(2) + '%', String(r.anomalyCount),
      ]),
      ['Period', 'Attendance %', 'Productivity', 'Engagement', 'Training h', 'Overtime h', 'Turnover %', 'Anomalies'],
    );
  } else if (tab === 'customer') {
    downloadCSV(
      'customer-experience-report.csv',
      CX_QUARTERLY.map(r => [
        r.period, r.csat.toFixed(3), r.nps.toFixed(1), r.responseTime.toFixed(1) + ' min',
        String(r.supportTickets), (r.churnRate * 100).toFixed(1) + '%', String(r.anomalyCount),
      ]),
      ['Period', 'CSAT', 'NPS', 'Response Time', 'Support Tickets', 'Churn Rate', 'Anomalies'],
    );
  } else if (tab === 'project') {
    downloadCSV(
      'project-report.csv',
      PROJECT_QUARTERLY.map(r => [
        r.period, r.completionRate.toFixed(1) + '%',
        (r.budgetVariancePct > 0 ? '+' : '') + r.budgetVariancePct.toFixed(1) + '%',
        (r.delayedTaskRate * 100).toFixed(1) + '%',
        '$' + (r.totalBudgetSpent / 1000).toFixed(0) + 'K', String(r.anomalyCount),
      ]),
      ['Period', 'Completion %', 'Budget Variance %', 'Delayed Task %', 'Budget Spent', 'Anomalies'],
    );
  } else {
    // executive — export KPI summary
    downloadCSV(
      'executive-summary.csv',
      EXECUTIVE_SUMMARY.kpis.map(k => [k.label, k.value, k.change, k.sub]),
      ['KPI', 'Value', 'Change', 'Note'],
    );
  }
};

const exportTabPDF = (tab: ReportType) => {
  const label =
    tab === 'executive' ? 'Executive Summary Report' :
    tab === 'financial' ? 'Financial Performance Report' :
    tab === 'workforce' ? 'Workforce Analytics Report' :
    tab === 'customer'  ? 'Customer Experience Report' :
    'Project Portfolio Report';

  const getRows = (): { headers: string[]; rows: (string | number)[][] } => {
    if (tab === 'financial') return {
      headers: ['Period', 'Revenue', 'Cash Flow', 'Net Income', 'Expenditure', 'Profit Margin', 'D/E', 'Anomalies'],
      rows: FINANCIAL_QUARTERLY.map(r => [
        r.period, `$${(r.revenue/1000).toFixed(1)}K`, `$${(r.cashFlow/1000).toFixed(1)}K`,
        `$${(r.netIncome/1000).toFixed(1)}K`, `$${(r.expenditure/1000).toFixed(1)}K`,
        (r.profitMargin * 100).toFixed(1) + '%', r.debtToEquity.toFixed(2) + '×', r.anomalyCount,
      ]),
    };
    if (tab === 'workforce') return {
      headers: ['Period', 'Attendance', 'Productivity', 'Engagement', 'Training h', 'Overtime h', 'Turnover', 'Anomalies'],
      rows: WORKFORCE_QUARTERLY.map(r => [
        r.period, r.attendance.toFixed(1)+'%', r.productivity.toFixed(1), r.engagement.toFixed(1),
        r.trainingHours.toFixed(1), r.overtimeHours.toFixed(1), r.turnoverRate.toFixed(2)+'%', r.anomalyCount,
      ]),
    };
    if (tab === 'customer') return {
      headers: ['Period', 'CSAT', 'NPS', 'Response Time', 'Tickets', 'Churn', 'Anomalies'],
      rows: CX_QUARTERLY.map(r => [
        r.period, r.csat.toFixed(3), r.nps.toFixed(1), r.responseTime.toFixed(1)+' min',
        r.supportTickets, (r.churnRate*100).toFixed(1)+'%', r.anomalyCount,
      ]),
    };
    if (tab === 'project') return {
      headers: ['Period', 'Completion', 'Budget Variance', 'Delayed Tasks', 'Budget Spent', 'Anomalies'],
      rows: PROJECT_QUARTERLY.map(r => [
        r.period, r.completionRate.toFixed(1)+'%',
        (r.budgetVariancePct>0?'+':'')+r.budgetVariancePct.toFixed(1)+'%',
        (r.delayedTaskRate*100).toFixed(1)+'%',
        '$'+(r.totalBudgetSpent/1000).toFixed(0)+'K', r.anomalyCount,
      ]),
    };
    return {
      headers: ['KPI', 'Value', 'Change', 'Period'],
      rows: EXECUTIVE_SUMMARY.kpis.map(k => [k.label, k.value, k.change, k.sub]),
    };
  };

  const { headers, rows } = getRows();
  const thCells = headers.map(h => `<th style="padding:6px 10px;text-align:left;background:#1e293b;color:#94a3b8;font-size:11px;text-transform:uppercase">${h}</th>`).join('');
  const trRows = rows.map((r, i) =>
    `<tr style="background:${i%2===0?'#0f172a':'#1e293b'}">` +
    r.map(c => `<td style="padding:6px 10px;color:#e2e8f0;font-size:12px;border-bottom:1px solid #334155">${c}</td>`).join('') +
    '</tr>'
  ).join('');

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${label}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, Helvetica, sans-serif; background: #fff; color: #1e293b; padding: 40px; }
    h1 { font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 6px; }
    p.sub { color: #64748b; font-size: 12px; margin-bottom: 24px; }
    table { border-collapse: collapse; width: 100%; font-size: 12px; }
    thead tr { background: #1e293b; }
    thead th { padding: 8px 12px; text-align: left; color: #94a3b8; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; }
    tbody tr:nth-child(even) { background: #f8fafc; }
    tbody tr:nth-child(odd)  { background: #ffffff; }
    tbody td { padding: 7px 12px; color: #334155; border-bottom: 1px solid #e2e8f0; }
    p.footer { margin-top: 20px; font-size: 10px; color: #94a3b8; }
    @media print {
      body { padding: 20px; }
      thead tr { background: #1e293b !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      tbody tr:nth-child(even) { background: #f8fafc !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <h1>${label}</h1>
  <p class="sub">Generated: ${new Date().toLocaleString()} &nbsp;&middot;&nbsp; KPI Nexus Dashboard</p>
  <table>
    <thead><tr>${thCells}</tr></thead>
    <tbody>${trRows}</tbody>
  </table>
  <p class="footer">KPI Nexus &middot; Sourced from unified dataset &middot; Jan 2024 &ndash; Jul 2026</p>
  <script>window.onload = function(){ window.print(); }<\/script>
</body>
</html>`;

  // Use Blob URL + anchor click — avoids popup blocker entirely
  const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href   = url;
  a.target = '_blank';
  a.rel    = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
};

// ── View Report Modal ─────────────────────────────────────────────────────────

const ViewReportModal = ({
  report,
  onClose,
}: {
  report: RecentReport | null;
  onClose: () => void;
}) => {
  if (!report) return null;

  const typeInsights: Record<ReportType, string[]> = {
    executive:  EXECUTIVE_SUMMARY.highlights,
    financial:  FINANCIAL_INSIGHTS,
    workforce:  WORKFORCE_INSIGHTS,
    customer:   CX_INSIGHTS,
    project:    PROJECT_INSIGHTS,
  };

  const typeKpis: Record<ReportType, typeof FINANCIAL_KPI_CARDS> = {
    executive:  EXECUTIVE_SUMMARY.kpis,
    financial:  FINANCIAL_KPI_CARDS,
    workforce:  WORKFORCE_KPI_CARDS,
    customer:   CX_KPI_CARDS,
    project:    PROJECT_KPI_CARDS,
  };

  const insights = typeInsights[report.type];
  const kpis = typeKpis[report.type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-white/15 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-white/10">
          <div>
            <h2 className="text-white font-semibold text-base leading-tight">{report.name}</h2>
            <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{fmtDateTime(report.generatedAt)}</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" />{report.generatedBy}</span>
              <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{report.format}{report.pages > 0 ? ` · ${report.pages} pages` : ''} · {report.size}</span>
            </div>
          </div>
          <button onClick={onClose} className="ml-4 p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors text-lg leading-none">✕</button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          {/* Status badge */}
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400 font-medium">Report Ready</span>
            <span
              className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{ background: TYPE_COLORS[report.type] + '22', color: TYPE_COLORS[report.type], border: `1px solid ${TYPE_COLORS[report.type]}44` }}
            >
              {TYPE_LABELS[report.type]}
            </span>
          </div>

          {/* KPI Summary */}
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Key Metrics</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {kpis.slice(0, 6).map((k, i) => (
                <div key={i} className="bg-white/5 rounded-xl border border-white/10 p-3">
                  <p className="text-xs text-slate-400 mb-0.5">{k.label}</p>
                  <p className="text-base font-bold text-white">{k.value}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {dirIcon(k.changeDir)}
                    <span className={`text-xs ${dirClass(k.changeDir)}`}>{k.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Key Insights</p>
            <ul className="space-y-2">
              {insights.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-300">
                  <span className="text-indigo-400 mt-0.5 shrink-0">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex gap-2 justify-end">
          <button
            onClick={() => exportTabCSV(report.type)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button
            onClick={() => exportTabPDF(report.type)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600/90 hover:bg-red-500 text-white text-sm font-semibold transition-colors"
          >
            <FileText className="w-4 h-4" /> Print / PDF
          </button>
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-semibold transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Export Modal ──────────────────────────────────────────────────────────────

const ExportModal = ({
  open,
  onClose,
  activeTab,
  fmt,
}: {
  open: boolean;
  onClose: () => void;
  activeTab: ReportType;
  fmt: 'PDF' | 'Excel';
}) => {
  const [exporting, setExporting] = useState(false);
  const [done, setDone] = useState(false);
  const [selectedFmt, setSelectedFmt] = useState<'PDF' | 'Excel'>(fmt);

  React.useEffect(() => { setSelectedFmt(fmt); }, [fmt]);
  React.useEffect(() => { if (!open) { setDone(false); setExporting(false); } }, [open]);

  if (!open) return null;

  const reportLabel =
    activeTab === 'executive' ? 'Executive Summary Report' :
    activeTab === 'financial' ? 'Financial Performance Report' :
    activeTab === 'workforce' ? 'Workforce Analytics Report' :
    activeTab === 'customer'  ? 'Customer Experience Report' :
    'Project Portfolio Report';

  const doExport = () => {
    setExporting(true);
    // Execute export synchronously (inside user gesture) to avoid popup blocker
    if (selectedFmt === 'Excel') {
      exportTabCSV(activeTab);
    } else {
      exportTabPDF(activeTab);
    }
    setExporting(false);
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/15 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        {done ? (
          <>
            <div className="flex flex-col items-center gap-3 py-4">
              <CheckCircle className="w-12 h-12 text-emerald-400" />
              <p className="text-white font-semibold text-lg">Export Complete</p>
              <p className="text-slate-400 text-sm text-center">
                {reportLabel} has been exported as {selectedFmt === 'Excel' ? 'CSV' : 'PDF'}.
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-2 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
            >
              Close
            </button>
          </>
        ) : (
          <>
            <h2 className="text-white font-semibold text-base mb-1">Export Report</h2>
            <p className="text-slate-400 text-sm mb-4">{reportLabel}</p>

            <div className="flex gap-3 mb-5">
              {(['PDF', 'Excel'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setSelectedFmt(f)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${
                    selectedFmt === f
                      ? 'border-indigo-500 bg-indigo-600/30 text-indigo-300'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  {f === 'PDF' ? <FileText className="w-4 h-4" /> : <FileSpreadsheet className="w-4 h-4" />}
                  {f === 'Excel' ? 'CSV/Excel' : f}
                </button>
              ))}
            </div>

            <p className="text-xs text-slate-500 mb-4">
              {selectedFmt === 'Excel'
                ? 'Downloads a .csv file — open in Excel, Numbers, or Google Sheets.'
                : 'Opens a print dialog — save as PDF using your browser.'}
            </p>

            <div className="flex gap-2">
              <button
                onClick={doExport}
                disabled={exporting}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold text-sm transition-colors"
              >
                {exporting ? (
                  <><RefreshCw className="w-4 h-4 animate-spin" /> Generating…</>
                ) : (
                  <><Download className="w-4 h-4" /> Export {selectedFmt === 'Excel' ? 'CSV' : 'PDF'}</>
                )}
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────

const ReportsDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ReportType>('executive');
  const [exportOpen, setExportOpen] = useState(false);
  const [exportFmt, setExportFmt] = useState<'PDF' | 'Excel'>('PDF');

  const openExport = (fmt: 'PDF' | 'Excel') => {
    setExportFmt(fmt);
    setExportOpen(true);
  };

  const totalReports = RECENT_REPORTS.length;
  const activeSchedules = SCHEDULED_REPORTS.filter(s => s.enabled).length;
  const totalPages = RECENT_REPORTS.reduce((a, r) => a + r.pages, 0);
  const latestDate = fmtDate(
    RECENT_REPORTS.reduce((best, r) =>
      r.generatedAt > best ? r.generatedAt : best, ''
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} activeTab={activeTab} fmt={exportFmt} />

      {/* Page Header */}
      <div className="flex flex-wrap gap-4 items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Reports Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">
            Generate, schedule, and export reports across all KPI domains
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => openExport('PDF')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600/90 hover:bg-red-500 text-white text-sm font-semibold shadow transition-colors"
          >
            <FileText className="w-4 h-4" />
            Export PDF
          </button>
          <button
            onClick={() => openExport('Excel')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-sm font-semibold shadow transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Reports Generated',    value: totalReports,       sub: 'in recent history',       icon: <FileText        className="w-5 h-5 text-indigo-400" />, color: '#6366f1' },
          { label: 'Active Schedules',      value: activeSchedules,    sub: 'automated reports',       icon: <Calendar        className="w-5 h-5 text-emerald-400" />, color: '#34d399' },
          { label: 'Total Pages',           value: totalPages,         sub: 'across PDF reports',      icon: <FileText        className="w-5 h-5 text-amber-400" />, color: '#f59e0b' },
          { label: 'Latest Report',         value: latestDate,         sub: 'most recent generation',  icon: <Clock           className="w-5 h-5 text-violet-400" />, color: '#a78bfa' },
        ].map((s, i) => (
          <div key={i} className="bg-white/5 rounded-xl border border-white/10 p-4 flex gap-3 items-start">
            <div className="p-2 rounded-lg bg-white/5 shrink-0">{s.icon}</div>
            <div>
              <p className="text-xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-slate-400">{s.label}</p>
              <p className="text-xs text-slate-600">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Nav */}
      <div className="flex gap-1 flex-wrap mb-6 bg-white/5 rounded-xl p-1 border border-white/10">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === t.id
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Report Panel header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 rounded-full" style={{ background: TYPE_COLORS[activeTab] }} />
          <h2 className="text-base font-semibold text-white">
            {TABS.find(t => t.id === activeTab)?.label}
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          Sourced from unified KPI dataset · Jan 2024 – Jul 2026
        </div>
      </div>

      {/* Active Report Tab */}
      <div className="mb-8">
        {activeTab === 'executive' && <ExecutiveTab />}
        {activeTab === 'financial'  && <FinancialTab  />}
        {activeTab === 'workforce'  && <WorkforceTab  />}
        {activeTab === 'customer'   && <CustomerTab   />}
        {activeTab === 'project'    && <ProjectTab    />}
      </div>

      {/* Recent Reports Table */}
      <div className="mb-8">
        <RecentReportsSection />
      </div>

      {/* Schedule Section */}
      <div className="mb-4">
        <ScheduleSection />
      </div>
    </div>
  );
};

export default ReportsDashboardPage;
