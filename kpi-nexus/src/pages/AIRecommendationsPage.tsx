import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import {
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  FileText,
  FileSpreadsheet,
  Share2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Zap,
  Calendar,
  CalendarDays,
  CalendarCheck,
  DollarSign,
  Heart,
  Users,
  Briefcase,
  Target,
  Info,
  RefreshCw,
  X,
  SlidersHorizontal,
  Eye,
} from 'lucide-react';
import {
  AI_RECOMMENDATIONS,
  RECOMMENDATION_STATS,
  IMPACT_CARDS,
  DOMAIN_COLORS,
  PRIORITY_COLORS,
  STATUS_COLORS,
  type AIRecommendation,
  type Domain,
  type Priority,
  type RecStatus,
  type ActionTiming,
} from '../data/aiRecommendationsData';

// ── helpers ───────────────────────────────────────────────────────────────────

const priorityOrder: Record<Priority, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };

const PRIORITY_ICON = (p: Priority, cls = 'w-4 h-4') =>
  p === 'Critical' ? <AlertTriangle className={`${cls} text-red-400`}    /> :
  p === 'High'     ? <AlertCircle   className={`${cls} text-orange-400`} /> :
  p === 'Medium'   ? <Clock         className={`${cls} text-yellow-400`} /> :
                     <Info          className={`${cls} text-cyan-400`}   />;

const TIMING_ICON = (t: ActionTiming) =>
  t === 'immediate'  ? <Zap         className="w-3.5 h-3.5 text-red-400"     /> :
  t === 'short-term' ? <CalendarDays className="w-3.5 h-3.5 text-amber-400"  /> :
                       <CalendarCheck className="w-3.5 h-3.5 text-emerald-400" />;

const TIMING_LABEL: Record<ActionTiming, string> = {
  immediate:  'Immediate Action',
  'short-term':'This Week',
  'long-term': 'This Month',
};

const IMPACT_ICON = (area: string) =>
  area === 'revenue'   ? <DollarSign className="w-5 h-5 text-indigo-400"  /> :
  area === 'customer'  ? <Heart       className="w-5 h-5 text-violet-400" /> :
  area === 'workforce' ? <Users       className="w-5 h-5 text-emerald-400"/> :
                         <Briefcase   className="w-5 h-5 text-amber-400"  />;

const corrBadge = (c: number) => {
  const abs = Math.abs(c);
  const dir = c < 0 ? '−' : '+';
  const cls = abs >= 0.5 ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' :
              abs >= 0.35 ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
              'bg-slate-500/20 text-slate-300 border-slate-500/30';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono font-semibold border ${cls}`}>
      r = {dir}{abs.toFixed(2)}
    </span>
  );
};

const statusBadge = (s: RecStatus) => {
  const cls =
    s === 'Completed'   ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' :
    s === 'In Progress' ? 'bg-amber-500/15  text-amber-300  border-amber-500/30'   :
                          'bg-slate-500/15  text-slate-400  border-slate-500/30';
  const icon =
    s === 'Completed'   ? <CheckCircle2 className="w-3 h-3" /> :
    s === 'In Progress' ? <RefreshCw    className="w-3 h-3" /> :
                          <Clock        className="w-3 h-3" />;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${cls}`}>
      {icon}{s}
    </span>
  );
};

const priorityBadge = (p: Priority, small = false) => {
  const cls =
    p === 'Critical' ? 'bg-red-500/15    text-red-300    border-red-500/30'    :
    p === 'High'     ? 'bg-orange-500/15 text-orange-300 border-orange-500/30' :
    p === 'Medium'   ? 'bg-yellow-500/15 text-yellow-300 border-yellow-500/30' :
                       'bg-cyan-500/15   text-cyan-300   border-cyan-500/30';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold border ${small ? 'text-xs' : 'text-xs'} ${cls}`}>
      {PRIORITY_ICON(p, 'w-3 h-3')}{p}
    </span>
  );
};

const domainBadge = (d: Domain) => (
  <span
    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border"
    style={{
      background: DOMAIN_COLORS[d] + '22',
      color:      DOMAIN_COLORS[d],
      borderColor:DOMAIN_COLORS[d] + '44',
    }}
  >
    {d}
  </span>
);

// ── Export / Share helpers ────────────────────────────────────────────────────

const exportRecsCSV = (recs: AIRecommendation[]) => {
  const headers = ['#', 'Priority', 'Driver Domain', 'Driver KPI', 'Target Domain', 'Target KPI', 'Correlation', 'p-value', 'Confidence %', 'Timing', 'Status', 'Summary', 'Recommended Action'];
  const escape = (v: string | number) => {
    const s = String(v);
    return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const rows = recs.map((r, i) => [
    String(i + 1).padStart(2, '0'), r.priority,
    r.driverDomain, r.driverKpi, r.targetDomain, r.targetKpi,
    r.correlation.toFixed(2), String(r.pValue), String(r.confidenceScore),
    r.actionTiming, r.status, r.plainEnglishSummary, r.recommendedAction,
  ]);
  const csv = [headers.map(escape).join(','), ...rows.map(r => r.map(escape).join(','))].join('\r\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'ai-recommendations.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const exportRecsPDF = (recs: AIRecommendation[]) => {
  const thCells = ['#', 'Priority', 'Domain Flow', 'Correlation', 'Confidence', 'Timing', 'Status', 'Recommended Action']
    .map(h => `<th style="padding:7px 10px;text-align:left;background:#1e293b;color:#94a3b8;font-size:10px;text-transform:uppercase;white-space:nowrap">${h}</th>`)
    .join('');

  const priorityColor: Record<string, string> = { Critical: '#ef4444', High: '#f97316', Medium: '#eab308', Low: '#22d3ee' };
  const timingLabel: Record<string, string>   = { immediate: 'Immediate', 'short-term': 'This Week', 'long-term': 'This Month' };

  const trRows = recs.map((r, i) =>
    `<tr style="background:${i % 2 === 0 ? '#f8fafc' : '#ffffff'}">
      <td style="padding:6px 10px;font-size:11px;color:#475569">${String(i + 1).padStart(2, '0')}</td>
      <td style="padding:6px 10px;font-size:11px;font-weight:700;color:${priorityColor[r.priority] ?? '#64748b'}">${r.priority}</td>
      <td style="padding:6px 10px;font-size:11px;color:#334155;white-space:nowrap">${r.driverDomain} → ${r.targetDomain}</td>
      <td style="padding:6px 10px;font-size:11px;color:#475569;font-family:monospace">r = ${r.correlation.toFixed(2)}</td>
      <td style="padding:6px 10px;font-size:11px;color:#475569">${r.confidenceScore}%</td>
      <td style="padding:6px 10px;font-size:11px;color:#475569;white-space:nowrap">${timingLabel[r.actionTiming]}</td>
      <td style="padding:6px 10px;font-size:11px;color:#475569">${r.status}</td>
      <td style="padding:6px 10px;font-size:11px;color:#1e293b;max-width:300px">${r.recommendedAction}</td>
    </tr>`
  ).join('');

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/><title>AI Recommendations Report</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Arial,Helvetica,sans-serif;background:#fff;color:#1e293b;padding:36px}
  h1{font-size:20px;font-weight:700;margin-bottom:6px}
  p.sub{color:#64748b;font-size:12px;margin-bottom:24px}
  table{border-collapse:collapse;width:100%;font-size:12px}
  p.footer{margin-top:20px;font-size:10px;color:#94a3b8}
  @media print{
    thead tr{-webkit-print-color-adjust:exact;print-color-adjust:exact}
    tr{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  }
</style>
</head><body>
<h1>AI Recommendations Report</h1>
<p class="sub">Generated: ${new Date().toLocaleString()} &nbsp;&middot;&nbsp; KPI Nexus &nbsp;&middot;&nbsp; ${recs.length} recommendations</p>
<table><thead><tr>${thCells}</tr></thead><tbody>${trRows}</tbody></table>
<p class="footer">Source: final_findings_for_dashboard.pdf &middot; KPI Nexus Dashboard</p>
<script>window.onload=function(){window.print();}<\/script>
</body></html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
};

const copyShareLink = (): Promise<void> => {
  const url = window.location.href;
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(url);
  }
  // Fallback for browsers without clipboard API
  const ta = document.createElement('textarea');
  ta.value = url;
  ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.focus(); ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  return Promise.resolve();
};

// ── Share Toast ───────────────────────────────────────────────────────────────

const ShareToast = ({ visible, onHide }: { visible: boolean; onHide: () => void }) => {
  React.useEffect(() => {
    if (visible) { const t = setTimeout(onHide, 3000); return () => clearTimeout(t); }
  }, [visible, onHide]);
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-800 border border-white/15 shadow-2xl">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      <div>
        <p className="text-white text-sm font-semibold">Link copied to clipboard</p>
        <p className="text-slate-400 text-xs truncate max-w-xs">{window.location.href}</p>
      </div>
    </div>
  );
};

// ── Export modal ──────────────────────────────────────────────────────────────

const ExportModal = ({
  open,
  onClose,
  recs,
}: {
  open: boolean;
  onClose: () => void;
  recs: AIRecommendation[];
}) => {
  const [fmt, setFmt] = useState<'PDF' | 'Excel'>('PDF');
  const [done, setDone] = useState(false);

  React.useEffect(() => { if (!open) setDone(false); }, [open]);

  if (!open) return null;

  const doExport = () => {
    if (fmt === 'Excel') exportRecsCSV(recs);
    else exportRecsPDF(recs);
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/15 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        {done ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            <p className="text-white font-semibold text-lg">Export Complete</p>
            <p className="text-slate-400 text-sm text-center">
              AI Recommendations exported as {fmt === 'Excel' ? 'CSV' : 'PDF'}.
            </p>
            <button onClick={onClose} className="mt-2 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors">
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-white font-semibold text-base mb-4">Export Recommendations</h2>
            <p className="text-slate-400 text-xs mb-4">{recs.length} recommendation{recs.length !== 1 ? 's' : ''} will be exported</p>
            <div className="flex gap-2 mb-4">
              {(['PDF', 'Excel'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFmt(f)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-semibold transition-colors ${
                    fmt === f ? 'border-indigo-500 bg-indigo-600/30 text-indigo-300' : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  {f === 'PDF'   ? <FileText className="w-3.5 h-3.5" /> : <FileSpreadsheet className="w-3.5 h-3.5" />}
                  {f === 'Excel' ? 'CSV / Excel' : f}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mb-4">
              {fmt === 'Excel'
                ? 'Downloads a .csv file — open in Excel, Numbers, or Google Sheets.'
                : 'Opens a print-ready page — save as PDF using your browser print dialog.'}
            </p>
            <div className="flex gap-2">
              <button
                onClick={doExport}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
              >
                <Download className="w-4 h-4" /> Export {fmt === 'Excel' ? 'CSV' : 'PDF'}
              </button>
              <button onClick={onClose} className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-sm transition-colors">
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ── Recommendation Card ───────────────────────────────────────────────────────

const RecCard = ({
  rec,
  onStatusChange,
}: {
  rec: AIRecommendation;
  onStatusChange: (id: string, s: RecStatus) => void;
}) => {
  const [expanded, setExpanded] = useState(false);

  const leftBorderColor =
    rec.priority === 'Critical' ? '#ef4444' :
    rec.priority === 'High'     ? '#f97316' :
    rec.priority === 'Medium'   ? '#eab308' : '#22d3ee';

  return (
    <div
      className="bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all overflow-hidden"
      style={{ borderLeft: `3px solid ${leftBorderColor}` }}
    >
      {/* Card header */}
      <div className="px-5 py-4">
        <div className="flex flex-wrap gap-2 items-start justify-between mb-3">
          <div className="flex flex-wrap gap-2 items-center">
            {priorityBadge(rec.priority)}
            {domainBadge(rec.driverDomain)}
            <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
            {domainBadge(rec.targetDomain)}
          </div>
          <div className="flex items-center gap-2">
            {TIMING_ICON(rec.actionTiming)}
            <span className="text-xs text-slate-400">{TIMING_LABEL[rec.actionTiming]}</span>
          </div>
        </div>

        {/* KPI line */}
        <p className="text-xs text-slate-500 mb-1 font-mono">
          {rec.driverKpi} → {rec.targetKpi}
        </p>

        {/* Summary */}
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          {rec.plainEnglishSummary}
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-3 items-center mb-3">
          {corrBadge(rec.correlation)}
          <span className="text-xs text-slate-500 font-mono">p = {rec.pValue}</span>
          <span className="text-xs text-slate-500">{rec.monthsOfData}mo data</span>
          <span className="ml-auto flex items-center gap-1 text-xs text-slate-400">
            <Target className="w-3 h-3 text-indigo-400" />
            Confidence: <span className="text-white font-semibold ml-1">{rec.confidenceScore}%</span>
          </span>
        </div>

        {/* Confidence bar */}
        <div className="h-1 rounded-full bg-white/10 mb-4">
          <div
            className="h-1 rounded-full transition-all"
            style={{
              width: `${rec.confidenceScore}%`,
              background: leftBorderColor,
            }}
          />
        </div>

        {/* Recommended action (always visible) */}
        <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-lg p-3 mb-3">
          <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1.5">Recommended Action</p>
          <p className="text-sm text-slate-300 leading-relaxed">{rec.recommendedAction}</p>
        </div>

        {/* Footer row */}
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex items-center gap-2">
            {statusBadge(rec.status)}
            <select
              value={rec.status}
              onChange={e => onStatusChange(rec.id, e.target.value as RecStatus)}
              className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 hover:bg-white/10 transition-colors"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
          >
            {expanded ? <><ChevronUp className="w-3.5 h-3.5" /> Less</> : <><ChevronDown className="w-3.5 h-3.5" /> More details</>}
          </button>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-white/10 px-5 py-4 space-y-3 bg-white/2">
          {rec.alertText && (
            <div className="bg-red-950/30 border border-red-500/25 rounded-lg p-3">
              <p className="text-xs font-semibold text-red-300 uppercase tracking-wider mb-1.5">Alert Context</p>
              <p className="text-sm text-slate-300 leading-relaxed">{rec.alertText}</p>
            </div>
          )}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Business Impact</p>
            <p className="text-sm text-slate-400 leading-relaxed">{rec.businessImpact}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-500">
            <div><span className="text-slate-400 block">Direction</span>{rec.direction === 'positive' ? '↑ Both rise' : '↓ Inverse'}</div>
            <div><span className="text-slate-400 block">Impact Area</span>{rec.impactArea}</div>
            <div><span className="text-slate-400 block">Primary Domain</span>{rec.primaryDomain}</div>
            <div><span className="text-slate-400 block">Months of Data</span>{rec.monthsOfData}</div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Filters panel ─────────────────────────────────────────────────────────────

interface Filters {
  domain: Domain | 'All';
  priority: Priority | 'All';
  timing: ActionTiming | 'All';
  status: RecStatus | 'All';
  search: string;
}

const DEFAULT_FILTERS: Filters = {
  domain: 'All', priority: 'All', timing: 'All', status: 'All', search: '',
};

const DOMAIN_OPTIONS: (Domain | 'All')[] = ['All', 'Financial', 'Workforce', 'Customer Experience', 'Project'];
const PRIORITY_OPTIONS: (Priority | 'All')[] = ['All', 'Critical', 'High', 'Medium', 'Low'];
const TIMING_OPTIONS: (ActionTiming | 'All')[] = ['All', 'immediate', 'short-term', 'long-term'];
const STATUS_OPTIONS: (RecStatus | 'All')[] = ['All', 'Pending', 'In Progress', 'Completed'];

// ── Main Page ─────────────────────────────────────────────────────────────────

const AIRecommendationsPage: React.FC = () => {
  const [recs, setRecs] = useState<AIRecommendation[]>(AI_RECOMMENDATIONS);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [activeSection, setActiveSection] = useState<'domain' | 'table'>('domain');
  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(new Set(['Financial','Workforce','Customer Experience','Project']));

  const setStatus = (id: string, status: RecStatus) =>
    setRecs(prev => prev.map(r => r.id === id ? { ...r, status } : r));

  const filtered = useMemo(() => {
    return recs
      .filter(r => {
        if (filters.domain !== 'All' && r.primaryDomain !== filters.domain && r.driverDomain !== filters.domain && r.targetDomain !== filters.domain) return false;
        if (filters.priority !== 'All' && r.priority !== filters.priority) return false;
        if (filters.timing !== 'All' && r.actionTiming !== filters.timing) return false;
        if (filters.status !== 'All' && r.status !== filters.status) return false;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          return (
            r.driverKpi.toLowerCase().includes(q) ||
            r.targetKpi.toLowerCase().includes(q) ||
            r.plainEnglishSummary.toLowerCase().includes(q) ||
            r.recommendedAction.toLowerCase().includes(q) ||
            r.driverDomain.toLowerCase().includes(q) ||
            r.targetDomain.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }, [recs, filters]);

  const filterActive = filters.domain !== 'All' || filters.priority !== 'All' ||
                       filters.timing !== 'All' || filters.status !== 'All' || filters.search !== '';

  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  // Radar data: confidence by domain (max confidence rec per domain)
  const radarData = (['Financial','Workforce','Customer Experience','Project'] as Domain[]).map(d => ({
    domain: d === 'Customer Experience' ? 'CX' : d,
    count: recs.filter(r => r.driverDomain === d || r.targetDomain === d).length,
    avgConf: Math.round(
      recs.filter(r => r.driverDomain === d || r.targetDomain === d)
          .reduce((s, r) => s + r.confidenceScore, 0) /
      (recs.filter(r => r.driverDomain === d || r.targetDomain === d).length || 1)
    ),
  }));

  // Priority bar data
  const priorityBar = (['Critical','High','Medium','Low'] as Priority[]).map(p => ({
    priority: p,
    count: recs.filter(r => r.priority === p).length,
  }));

  const toggleDomain = (d: string) =>
    setExpandedDomains(prev => {
      const next = new Set(prev);
      next.has(d) ? next.delete(d) : next.add(d);
      return next;
    });

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-6">
      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} recs={filtered} />
      <ShareToast visible={showToast} onHide={() => setShowToast(false)} />

      {/* ── Page Header ── */}
      <div className="flex flex-wrap gap-4 items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">AI Recommendations</h1>
          <p className="text-slate-400 text-sm mt-1">
            Cross-domain insights from <span className="text-indigo-300 font-medium">final_findings_for_dashboard.pdf</span>
            {' '}· {recs.length} recommendations from {recs[0]?.monthsOfData}–33 months of data
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold transition-colors ${
              filterActive
                ? 'border-indigo-500 bg-indigo-600/30 text-indigo-300'
                : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {filterActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />}
          </button>
          <button
            onClick={() => exportRecsPDF(filtered)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-600/90 hover:bg-red-500 text-white text-sm font-semibold shadow transition-colors"
          >
            <FileText className="w-4 h-4" />
            Export PDF
          </button>
          <button
            onClick={() => exportRecsCSV(filtered)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-sm font-semibold shadow transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Export Excel
          </button>
          <button
            onClick={() => { copyShareLink().then(() => setShowToast(true)).catch(() => setShowToast(true)); }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm font-semibold transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* ── Filters Panel ── */}
      {showFilters && (
        <div className="mb-6 bg-white/5 rounded-xl border border-white/10 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-white/70 uppercase tracking-wider flex items-center gap-2">
              <Filter className="w-3.5 h-3.5" /> Filters
            </p>
            {filterActive && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors">
                <X className="w-3 h-3" /> Clear all
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <input
              value={filters.search}
              onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
              placeholder="Search KPI / domain…"
              className="lg:col-span-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            {[
              { key: 'domain',   label: 'Domain',   opts: DOMAIN_OPTIONS },
              { key: 'priority', label: 'Priority', opts: PRIORITY_OPTIONS },
              { key: 'timing',   label: 'Timing',   opts: TIMING_OPTIONS.map(t => t === 'All' ? 'All' : t === 'immediate' ? 'Immediate' : t === 'short-term' ? 'This Week' : 'This Month') },
              { key: 'status',   label: 'Status',   opts: STATUS_OPTIONS },
            ].map(({ key, label, opts }) => (
              <select
                key={key}
                value={(filters as Record<string, string>)[key]}
                onChange={e => setFilters(f => ({ ...f, [key]: e.target.value === 'Immediate' ? 'immediate' : e.target.value === 'This Week' ? 'short-term' : e.target.value === 'This Month' ? 'long-term' : e.target.value }))}
                className="px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                {opts.map(o => <option key={String(o)} value={String(o)}>{String(o) === 'All' ? `All ${label}s` : String(o)}</option>)}
              </select>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Showing <span className="text-white font-semibold">{filtered.length}</span> of{' '}
            <span className="text-white font-semibold">{recs.length}</span> recommendations
          </p>
        </div>
      )}

      {/* ── Executive Summary Strip ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Recommendations', value: RECOMMENDATION_STATS.total,    icon: <Target        className="w-5 h-5 text-indigo-400"  />, color: '#6366f1', sub: 'from dataset'           },
          { label: 'Critical',              value: RECOMMENDATION_STATS.critical, icon: <AlertTriangle  className="w-5 h-5 text-red-400"     />, color: '#ef4444', sub: 'require immediate action'},
          { label: 'High Priority',         value: RECOMMENDATION_STATS.high,     icon: <AlertCircle    className="w-5 h-5 text-orange-400"  />, color: '#f97316', sub: 'action this week'        },
          { label: 'Medium Priority',       value: RECOMMENDATION_STATS.medium,   icon: <Clock          className="w-5 h-5 text-yellow-400"  />, color: '#eab308', sub: 'action this month'       },
        ].map((s, i) => (
          <div key={i} className="bg-white/5 rounded-xl border border-white/10 p-4 flex gap-3 items-start">
            <div className="p-2 rounded-lg bg-white/5 shrink-0">{s.icon}</div>
            <div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-slate-400 leading-tight">{s.label}</p>
              <p className="text-xs text-slate-600">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Priority distribution */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-5">
          <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-4">Priority Distribution</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={priorityBar} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="priority" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8 }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {priorityBar.map((entry, i) => (
                  <Cell key={i} fill={PRIORITY_COLORS[entry.priority as Priority]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Confidence by domain radar */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-5">
          <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-4">Avg Confidence by Domain</p>
          <ResponsiveContainer width="100%" height={160}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="domain" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#475569', fontSize: 10 }} tickCount={4} />
              <Radar name="Confidence" dataKey="avgConf" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} dot={{ r: 3, fill: '#818cf8' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Action timing summary */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-5">
          <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-4">Action Timeline Overview</p>
          <div className="space-y-4 mt-2">
            {[
              { label: 'Immediate Action (Today)', count: RECOMMENDATION_STATS.immediate,  color: '#ef4444', icon: <Zap className="w-4 h-4 text-red-400" /> },
              { label: 'Short-term (This Week)',   count: RECOMMENDATION_STATS.shortTerm,  color: '#f97316', icon: <CalendarDays className="w-4 h-4 text-orange-400" /> },
              { label: 'Long-term (This Month)',   count: RECOMMENDATION_STATS.longTerm,   color: '#22d3ee', icon: <CalendarCheck className="w-4 h-4 text-cyan-400" /> },
            ].map(({ label, count, color, icon }) => (
              <div key={label}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">{icon}<span className="text-sm text-slate-300">{label}</span></div>
                  <span className="text-sm font-bold text-white">{count}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10">
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${(count / RECOMMENDATION_STATS.total) * 100}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Business Impact Cards ── */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3 px-1">Business Impact</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {IMPACT_CARDS.map((card, i) => (
            <div key={i} className="bg-white/5 rounded-xl border border-white/10 p-4 hover:border-white/20 transition-all">
              <div className="flex items-center gap-2 mb-3">
                {IMPACT_ICON(card.relatedRecs.length > 0
                  ? AI_RECOMMENDATIONS.find(r => r.id === card.relatedRecs[0])?.impactArea ?? 'revenue'
                  : 'revenue'
                )}
                <p className="text-xs font-semibold text-white/80">{card.area}</p>
              </div>
              <p className="text-lg font-bold mb-0.5" style={{ color: card.color }}>{card.value}</p>
              <p className="text-xs text-slate-400 font-medium mb-2">{card.metric}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{card.detail}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {card.relatedRecs.map(id => {
                  const rec = AI_RECOMMENDATIONS.find(r => r.id === id);
                  const label = rec ? `${rec.driverKpi.replace(/_/g,' ')} → ${rec.targetKpi.replace(/_/g,' ')}` : id;
                  return (
                    <span
                      key={id}
                      title={label}
                      className="px-2 py-0.5 rounded text-xs bg-white/5 text-slate-400 border border-white/10 truncate max-w-[180px]"
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section Nav ── */}
      <div className="flex gap-1 flex-wrap mb-5 bg-white/5 rounded-xl p-1 border border-white/10">
        {([
          { id: 'domain',   label: 'By Domain',            icon: <Briefcase className="w-3.5 h-3.5" /> },
          { id: 'table',    label: 'Details Table',        icon: <Eye className="w-3.5 h-3.5" /> },
        ] as const).map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSection === s.id ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {s.icon}{s.label}
          </button>
        ))}
        {filterActive && (
          <span className="ml-auto flex items-center gap-1 text-xs text-indigo-300 px-2">
            <Filter className="w-3 h-3" /> {filtered.length} filtered
          </span>
        )}
      </div>

      {/* ── SECTION: By Domain ── */}
      {activeSection === 'domain' && (
        <div className="space-y-4">
          {(['Financial', 'Workforce', 'Customer Experience', 'Project'] as Domain[]).map(domain => {
            const domainRecs = filtered.filter(
              r => r.driverDomain === domain || r.targetDomain === domain || r.primaryDomain === domain
            );
            if (domainRecs.length === 0) return null;
            const isOpen = expandedDomains.has(domain);
            return (
              <div key={domain} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors"
                  onClick={() => toggleDomain(domain)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: DOMAIN_COLORS[domain] }} />
                    <span className="font-semibold text-white">{domain}</span>
                    <span className="text-xs text-slate-400 bg-white/10 px-2 py-0.5 rounded-full">
                      {domainRecs.length} recommendation{domainRecs.length !== 1 ? 's' : ''}
                    </span>
                    <div className="flex gap-1">
                      {(['Critical','High','Medium','Low'] as Priority[]).map(p => {
                        const n = domainRecs.filter(r => r.priority === p).length;
                        return n > 0 ? (
                          <span key={p} className="text-xs px-1.5 py-0.5 rounded font-semibold" style={{ background: PRIORITY_COLORS[p] + '22', color: PRIORITY_COLORS[p] }}>
                            {n} {p}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="border-t border-white/10 p-4 space-y-3">
                    {domainRecs.map(r => <RecCard key={r.id} rec={r} onStatusChange={setStatus} />)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── SECTION: Details Table ── */}
      {activeSection === 'table' && (
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">Recommendation Details Table</p>
            <p className="text-xs text-slate-500">{filtered.length} rows</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-slate-400 text-xs uppercase">
                  {['#', 'Driver KPI', 'Domain', 'Target KPI', 'Domain', 'Corr.', 'p-val', 'Summary', 'Recommended Action', 'Priority', 'Confidence', 'Timing', 'Status'].map(h => (
                    <th key={h} className="px-3 py-3 text-left font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.id} className="border-t border-white/5 hover:bg-white/5 align-top">
                    <td className="px-3 py-3 text-slate-500 font-mono text-xs">{String(i + 1).padStart(2, '0')}</td>
                    <td className="px-3 py-3 text-slate-300 font-mono text-xs whitespace-nowrap">{r.driverKpi}</td>
                    <td className="px-3 py-3">{domainBadge(r.driverDomain)}</td>
                    <td className="px-3 py-3 text-slate-300 font-mono text-xs whitespace-nowrap">{r.targetKpi}</td>
                    <td className="px-3 py-3">{domainBadge(r.targetDomain)}</td>
                    <td className="px-3 py-3">{corrBadge(r.correlation)}</td>
                    <td className="px-3 py-3 text-slate-400 font-mono text-xs whitespace-nowrap">{r.pValue}</td>
                    <td className="px-3 py-3 text-slate-400 text-xs max-w-xs">
                      <p className="line-clamp-3">{r.plainEnglishSummary}</p>
                    </td>
                    <td className="px-3 py-3 text-slate-300 text-xs max-w-xs">
                      <p className="line-clamp-3">{r.recommendedAction}</p>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">{priorityBadge(r.priority, true)}</td>
                    <td className="px-3 py-3 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-bold text-white">{r.confidenceScore}%</span>
                        <div className="w-12 h-1 rounded-full bg-white/10">
                          <div className="h-1 rounded-full bg-indigo-500" style={{ width: `${r.confidenceScore}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        {TIMING_ICON(r.actionTiming)}
                        <span className="whitespace-nowrap">{TIMING_LABEL[r.actionTiming]}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <select
                        value={r.status}
                        onChange={e => setStatus(r.id, e.target.value as RecStatus)}
                        className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 hover:bg-white/10 whitespace-nowrap"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <p className="px-5 py-8 text-sm text-slate-500 text-center">No recommendations match the current filters.</p>
          )}
          <div className="px-5 py-3 border-t border-white/5 text-xs text-slate-500">
            Source: final_findings_for_dashboard.pdf · {recs.filter(r => r.status === 'Completed').length} completed,{' '}
            {recs.filter(r => r.status === 'In Progress').length} in progress,{' '}
            {recs.filter(r => r.status === 'Pending').length} pending
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendationsPage;
