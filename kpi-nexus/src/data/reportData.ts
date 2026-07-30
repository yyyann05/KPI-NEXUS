// ── Report Data ───────────────────────────────────────────────────────────────
// Aggregated from: financialData, workforceData, customerExperienceData,
//                  projectData, forecastData
// Generated: July 2026

// ── Types ────────────────────────────────────────────────────────────────────

export type ReportType =
  | 'executive'
  | 'financial'
  | 'workforce'
  | 'customer'
  | 'project';

export type ReportStatus = 'ready' | 'generating' | 'scheduled';
export type ReportFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'one-time';

export interface RecentReport {
  id: string;
  name: string;
  type: ReportType;
  generatedAt: string;   // ISO datetime string
  generatedBy: string;
  size: string;
  pages: number;
  status: ReportStatus;
  format: 'PDF' | 'Excel' | 'CSV';
}

export interface ScheduledReport {
  id: string;
  name: string;
  type: ReportType;
  frequency: ReportFrequency;
  nextRun: string;
  recipients: string[];
  enabled: boolean;
}

export interface KpiCard {
  label: string;
  value: string;
  change: string;
  changeDir: 'up' | 'down' | 'neutral';
  sub: string;
  color: string;
}

// ── Executive Summary ────────────────────────────────────────────────────────

export interface ExecutiveSummary {
  reportDate: string;
  period: string;
  overallScore: number;   // 0-100 composite health score
  highlights: string[];
  risks: string[];
  opportunities: string[];
  kpis: KpiCard[];
  domainScores: { domain: string; score: number; color: string; trend: 'up' | 'down' | 'stable' }[];
}

export const EXECUTIVE_SUMMARY: ExecutiveSummary = {
  reportDate: 'July 30, 2026',
  period: 'Jan 2025 – Jul 2026',
  overallScore: 74,
  highlights: [
    'Revenue reached $94K in Oct 2026, the highest single-month figure in the dataset.',
    'Customer CSAT improved to 3.95 in Q3 2026, approaching the 4.0 target.',
    'Project completion rate stabilised at 96.7% through H1 2026 before a forecast correction.',
    'Turnover rate declined to 1.8% in Nov 2025, the lowest since tracking began.',
    'NPS scored 62.76 in Sep 2026 — near the 5-year peak.',
  ],
  risks: [
    'Revenue anomaly detected Nov 2025 ($58.6K, −28% vs forecast) — partially recovered.',
    'Project budget variance jumped to 10.6% in Oct 2025 and 8.2% in Dec 2025.',
    'Cash Flow anomaly in Oct 2026 ($87K actual vs $75.6K forecast, +18.4σ) warrants review.',
    'Prophet model flags declining project completion through 2026–Q4 (forecast: 70.8%).',
    'NPS trending down −3% from latest actuals — customer retention risk.',
  ],
  opportunities: [
    'Productivity seasonally peaks in Apr–May; align launches and key initiatives accordingly.',
    'Cash Flow peaks in Dec each year — leverage for capital allocation and debt servicing.',
    'Customer churn rate dropped to 1.4% in Apr 2026 — expand upsell programmes.',
    'Revenue forecast shows recovery to $80K+ baseline through 2027.',
    'Workforce engagement 69.3 in Apr 2025 — leadership investment could push past 70.',
  ],
  kpis: [
    { label: 'Avg Monthly Revenue',  value: '$79.5K', change: '+2.1%',  changeDir: 'up',   sub: 'vs prior 12 months', color: '#6366f1' },
    { label: 'Avg Cash Flow',         value: '$74.4K', change: '+4.3%',  changeDir: 'up',   sub: 'vs prior 12 months', color: '#22d3ee' },
    { label: 'Avg Profit Margin',     value: '49.6%',  change: '+0.8pp', changeDir: 'up',   sub: 'Jan 2026 – Jul 2026', color: '#34d399' },
    { label: 'Workforce Productivity',value: '73.7',   change: '−0.4',   changeDir: 'down', sub: 'avg score (2025)',    color: '#f59e0b' },
    { label: 'CSAT Score',            value: '3.87',   change: '+0.03',  changeDir: 'up',   sub: '5-pt scale',          color: '#a78bfa' },
    { label: 'NPS',                   value: '60.5',   change: '−1.2',   changeDir: 'down', sub: 'avg 2025-2026',       color: '#f87171' },
    { label: 'Project Completion',    value: '97.4%',  change: '−2.6pp', changeDir: 'down', sub: 'latest 12 months',    color: '#10b981' },
    { label: 'Total Anomalies',       value: '187',    change: '+12',    changeDir: 'down', sub: 'cross-domain detected',color: '#fb923c' },
  ],
  domainScores: [
    { domain: 'Financial',           score: 76, color: '#6366f1', trend: 'up'    },
    { domain: 'Workforce',           score: 81, color: '#34d399', trend: 'stable'},
    { domain: 'Customer Experience', score: 78, color: '#a78bfa', trend: 'up'    },
    { domain: 'Project',             score: 62, color: '#f59e0b', trend: 'down'  },
  ],
};

// ── Financial Report ─────────────────────────────────────────────────────────

export interface FinancialReportRow {
  period: string;
  revenue: number;
  cashFlow: number;
  netIncome: number;
  expenditure: number;
  profitMargin: number;
  debtToEquity: number;
  anomalyCount: number;
}

// Quarterly aggregates (Jan 2025 – Sep 2026)
export const FINANCIAL_QUARTERLY: FinancialReportRow[] = [
  {
    period: 'Q1 2025',
    revenue: 255086,  cashFlow: 215498, netIncome: 193136, expenditure: 186038,
    profitMargin: 0.521, debtToEquity: 1.776, anomalyCount: 4,
  },
  {
    period: 'Q2 2025',
    revenue: 254878,  cashFlow: 213134, netIncome: 187731, expenditure: 151245,
    profitMargin: 0.507, debtToEquity: 1.846, anomalyCount: 2,
  },
  {
    period: 'Q3 2025',
    revenue: 236153,  cashFlow: 204872, netIncome: 196256, expenditure: 191644,
    profitMargin: 0.500, debtToEquity: 1.761, anomalyCount: 3,
  },
  {
    period: 'Q4 2025',
    revenue: 218579,  cashFlow: 227521, netIncome: 197674, expenditure: 186364,
    profitMargin: 0.517, debtToEquity: 1.759, anomalyCount: 3,
  },
  {
    period: 'Q1 2026',
    revenue: 229519,  cashFlow: 210395, netIncome: 198443, expenditure: 178205,
    profitMargin: 0.473, debtToEquity: 1.717, anomalyCount: 1,
  },
  {
    period: 'Q2 2026',
    revenue: 248672,  cashFlow: 234096, netIncome: 185442, expenditure: 197260,
    profitMargin: 0.470, debtToEquity: 1.763, anomalyCount: 3,
  },
  {
    period: 'Q3 2026',
    revenue: 224377,  cashFlow: 218226, netIncome: 203566, expenditure: 193488,
    profitMargin: 0.519, debtToEquity: 1.752, anomalyCount: 4,
  },
];

export const FINANCIAL_KPI_CARDS: KpiCard[] = [
  { label: 'Total Revenue (YTD)',    value: '$951.7K', change: '+3.2%', changeDir: 'up',   sub: 'Jan–Sep 2026',      color: '#6366f1' },
  { label: 'Total Cash Flow (YTD)',  value: '$739.0K', change: '+5.1%', changeDir: 'up',   sub: 'Jan–Sep 2026',      color: '#22d3ee' },
  { label: 'Avg Profit Margin',      value: '49.5%',   change: '+1.1pp',changeDir: 'up',   sub: 'Jan–Sep 2026',      color: '#34d399' },
  { label: 'Avg Debt / Equity',      value: '1.74×',   change: '−0.03', changeDir: 'up',   sub: 'improving leverage', color: '#a78bfa' },
  { label: 'Total Anomalies',        value: '8',       change: '−4',    changeDir: 'up',   sub: 'vs H1 2025',         color: '#f59e0b' },
  { label: 'Oct 2026 Revenue Peak',  value: '$94.0K',  change: '+13%',  changeDir: 'up',   sub: 'highest on record',  color: '#f87171' },
];

export const FINANCIAL_INSIGHTS: string[] = [
  'Revenue is trending downward at −0.5% per month in Prophet trend component — monitor Q4 2026.',
  'Cash Flow shows strong seasonality with December averaging +6.2% above annual mean.',
  'Profit margins have compressed from 52% (2025-Q1) to 47% (2026-Q1) — cost management needed.',
  'D/E ratio declining from 1.95 peak (May 2025) toward 1.63 — balance sheet strengthening.',
  '4 anomalies detected in Q3 2026; Oct 2026 cash flow surge (+18σ) is the most significant.',
];

// ── Workforce Report ─────────────────────────────────────────────────────────

export interface WorkforceReportRow {
  period: string;
  attendance: number;
  productivity: number;
  engagement: number;
  trainingHours: number;
  overtimeHours: number;
  turnoverRate: number;
  anomalyCount: number;
}

export const WORKFORCE_QUARTERLY: WorkforceReportRow[] = [
  { period: 'Q1 2024', attendance: 88.96, productivity: 73.98, engagement: 66.89, trainingHours: 4.29, overtimeHours: 7.08, turnoverRate: 1.80, anomalyCount: 19 },
  { period: 'Q2 2024', attendance: 91.16, productivity: 74.48, engagement: 68.05, trainingHours: 4.21, overtimeHours: 6.52, turnoverRate: 0.70, anomalyCount: 12 },
  { period: 'Q3 2024', attendance: 91.31, productivity: 71.92, engagement: 67.81, trainingHours: 4.05, overtimeHours: 6.05, turnoverRate: 1.23, anomalyCount: 11 },
  { period: 'Q4 2024', attendance: 89.14, productivity: 74.41, engagement: 67.87, trainingHours: 3.90, overtimeHours: 14.21,turnoverRate: 2.27, anomalyCount: 12 },
  { period: 'Q1 2025', attendance: 88.84, productivity: 74.31, engagement: 68.22, trainingHours: 4.23, overtimeHours: 6.22, turnoverRate: 2.20, anomalyCount: 17 },
  { period: 'Q2 2025', attendance: 91.44, productivity: 74.04, engagement: 68.43, trainingHours: 4.40, overtimeHours: 6.37, turnoverRate: 0.00, anomalyCount: 15 },
  { period: 'Q3 2025', attendance: 91.98, productivity: 71.34, engagement: 68.28, trainingHours: 3.94, overtimeHours: 6.40, turnoverRate: 0.60, anomalyCount:  8 },
  { period: 'Q4 2025', attendance: 89.63, productivity: 73.86, engagement: 67.02, trainingHours: 4.17, overtimeHours: 14.25,turnoverRate: 1.80, anomalyCount: 20 },
];

export const WORKFORCE_KPI_CARDS: KpiCard[] = [
  { label: 'Avg Attendance Rate',  value: '90.7%', change: '+0.3pp', changeDir: 'up',   sub: '2025 annual avg',          color: '#34d399' },
  { label: 'Avg Productivity',     value: '73.6',  change: '−0.7',   changeDir: 'down', sub: 'score; slight decline',     color: '#6366f1' },
  { label: 'Avg Engagement',       value: '68.1',  change: '+0.5',   changeDir: 'up',   sub: 'score; improving',          color: '#a78bfa' },
  { label: 'Avg Training Hours',   value: '4.1 h', change: '+0.1h',  changeDir: 'up',   sub: 'per employee/month',        color: '#22d3ee' },
  { label: 'Avg Turnover Rate',    value: '1.3%',  change: '−0.6pp', changeDir: 'up',   sub: 'improving retention',       color: '#f59e0b' },
  { label: 'Q4 Overtime Spike',    value: '14.3h', change: '+8.0h',  changeDir: 'down', sub: 'Oct–Dec (year-end load)',    color: '#f87171' },
];

export const WORKFORCE_INSIGHTS: string[] = [
  'Productivity dips in Jul–Aug each year (summer trough: −4.5% seasonality) — plan accordingly.',
  'Turnover hit 3.1% in Dec 2024 but improved to 0.0% in Q2 2025 — retention initiatives working.',
  'Q4 overtime averages 14.2h/month vs 6.3h in other quarters — capacity planning gap identified.',
  'Engagement score crossed 69.0 in Apr 2025 for the first time; leadership development contributing.',
  'Prophet forecast projects turnover declining further to ~1.1% by Dec 2025.',
];

// ── Customer Experience Report ────────────────────────────────────────────────

export interface CxReportRow {
  period: string;
  csat: number;
  nps: number;
  responseTime: number;
  supportTickets: number;
  churnRate: number;
  anomalyCount: number;
}

export const CX_QUARTERLY: CxReportRow[] = [
  { period: 'Q1 2025', csat: 3.843, nps: 57.80, responseTime: 49.5, supportTickets: 2141, churnRate: 0.045, anomalyCount: 28 },
  { period: 'Q2 2025', csat: 3.852, nps: 59.16, responseTime: 49.6, supportTickets: 2149, churnRate: 0.038, anomalyCount: 24 },
  { period: 'Q3 2025', csat: 3.931, nps: 61.79, responseTime: 50.7, supportTickets: 1591, churnRate: 0.058, anomalyCount: 16 },
  { period: 'Q4 2025', csat: 3.802, nps: 59.84, responseTime: 58.8, supportTickets: 2400, churnRate: 0.038, anomalyCount: 21 },
  { period: 'Q1 2026', csat: 3.857, nps: 60.45, responseTime: 46.7, supportTickets: 1476, churnRate: 0.040, anomalyCount: 14 },
  { period: 'Q2 2026', csat: 3.854, nps: 59.60, responseTime: 43.4, supportTickets: 1432, churnRate: 0.026, anomalyCount: 15 },
  { period: 'Q3 2026', csat: 3.894, nps: 61.36, responseTime: 48.2, supportTickets: 1135, churnRate: 0.029, anomalyCount: 14 },
];

export const CX_KPI_CARDS: KpiCard[] = [
  { label: 'Avg CSAT Score',       value: '3.87',  change: '+0.03', changeDir: 'up',   sub: '5-point scale (2026 avg)',  color: '#a78bfa' },
  { label: 'Avg NPS',              value: '60.5',  change: '−0.8',  changeDir: 'down', sub: '2026 YTD avg',              color: '#6366f1' },
  { label: 'Avg Response Time',    value: '46.1m', change: '−8.7m', changeDir: 'up',   sub: 'improving (Q1–Q3 2026)',    color: '#34d399' },
  { label: 'Support Tickets',      value: '481/mo',change: '−32%',  changeDir: 'up',   sub: 'tickets per month (2026)',  color: '#22d3ee' },
  { label: 'Avg Churn Rate',       value: '3.2%',  change: '−1.2pp',changeDir: 'up',   sub: '2026 avg vs 2025 avg',      color: '#f59e0b' },
  { label: 'Anomaly Events',       value: '43',    change: '−46',   changeDir: 'up',   sub: 'H1 2026 vs H1 2025',        color: '#f87171' },
];

export const CX_INSIGHTS: string[] = [
  'Q4 2025 saw a response time spike to 58.8 min and 2,400 support tickets — holiday load.',
  'CSAT peaked at 3.97 in Aug 2025; NPS peaked at 63.2 in Jan 2026 — strong Q1 starts.',
  'Churn rate dropped from 5.6% (Feb 2025) to 1.4% (Apr 2026) — significant retention gain.',
  'Support ticket volume halved from 966/mo (Dec 2025) to ~320–430/mo in 2026 — efficiency gain.',
  'Prophet CSAT forecast: stable at 3.91 ±0.15 through Q4 2026; no major deterioration expected.',
];

// ── Project Report ────────────────────────────────────────────────────────────

export interface ProjectReportRow {
  period: string;
  completionRate: number;
  budgetVariancePct: number;
  delayedTaskRate: number;
  totalBudgetSpent: number;
  anomalyCount: number;
}

export const PROJECT_QUARTERLY: ProjectReportRow[] = [
  { period: 'Q2 2024', completionRate: 100.00, budgetVariancePct: 3.18,  delayedTaskRate: 0.000, totalBudgetSpent: 1420163, anomalyCount: 1  },
  { period: 'Q3 2024', completionRate: 99.99,  budgetVariancePct: 6.11,  delayedTaskRate: 0.000, totalBudgetSpent: 1767838, anomalyCount: 2  },
  { period: 'Q4 2024', completionRate: 100.00, budgetVariancePct: 1.89,  delayedTaskRate: 0.000, totalBudgetSpent: 1369636, anomalyCount: 0  },
  { period: 'Q1 2025', completionRate: 100.00, budgetVariancePct: 0.49,  delayedTaskRate: 0.000, totalBudgetSpent: 753760,  anomalyCount: 0  },
  { period: 'Q2 2025', completionRate: 97.51,  budgetVariancePct: 3.27,  delayedTaskRate: 0.026, totalBudgetSpent: 564558,  anomalyCount: 1  },
  { period: 'Q3 2025', completionRate: 100.00, budgetVariancePct: 5.80,  delayedTaskRate: 0.000, totalBudgetSpent: 1201703, anomalyCount: 1  },
  { period: 'Q4 2025', completionRate: 92.75,  budgetVariancePct: 7.96,  delayedTaskRate: 0.103, totalBudgetSpent: 3683633, anomalyCount: 5  },
  { period: 'Q1 2026', completionRate: 42.53,  budgetVariancePct: -38.5, delayedTaskRate: 0.347, totalBudgetSpent: 498891,  anomalyCount: 3  },
  { period: 'Q2 2026', completionRate: 96.23,  budgetVariancePct: 3.64,  delayedTaskRate: 0.017, totalBudgetSpent: 1213455, anomalyCount: 2  },
];

export const PROJECT_KPI_CARDS: KpiCard[] = [
  { label: 'Avg Completion Rate',    value: '96.2%',   change: '−3.8pp', changeDir: 'down', sub: 'Q2 2026 recovery',           color: '#10b981' },
  { label: 'Avg Budget Variance',    value: '+3.6%',   change: '+2.1pp', changeDir: 'down', sub: 'Q2 2026 over budget',         color: '#f59e0b' },
  { label: 'Delayed Task Rate',      value: '1.7%',    change: '−8.6pp', changeDir: 'up',   sub: 'Q2 2026 recovery from Q1',    color: '#f87171' },
  { label: 'Total Budget Spent',     value: '$1.21M',  change: '+21%',   changeDir: 'down', sub: 'Q2 2026 vs Q2 2025',          color: '#6366f1' },
  { label: 'Q1 2026 Crisis',         value: '42.5%',   change: '−57.5pp',changeDir: 'down', sub: 'completion rate (anomaly)',    color: '#ef4444' },
  { label: 'Anomaly Events',         value: '15',      change: '+5',     changeDir: 'down', sub: 'H2 2025 + H1 2026',           color: '#a78bfa' },
];

export const PROJECT_INSIGHTS: string[] = [
  'Q1 2026 experienced a major project delivery crisis: 42.5% completion, 34.7% task delay rate.',
  'Budget spiked to $3.7M in Q4 2025 — large multi-project deliverables; variance exceeded 8%.',
  'Q2 2026 showed strong recovery to 96.2% completion — crisis appears contained.',
  'Q3 2024 had the highest budget variance at 6.1% with $1.77M spend — portfolio-heavy quarter.',
  'Prophet forecast warns of completion regression to 70.8% if current trends persist into H2 2026.',
];

// ── Recent Reports ────────────────────────────────────────────────────────────

export const RECENT_REPORTS: RecentReport[] = [
  {
    id: 'r001',
    name: 'Monthly Executive Summary — Jun 2026',
    type: 'executive',
    generatedAt: '2026-07-02T09:15:00',
    generatedBy: 'System (Scheduled)',
    size: '2.4 MB',
    pages: 18,
    status: 'ready',
    format: 'PDF',
  },
  {
    id: 'r002',
    name: 'Financial Performance Report — Q2 2026',
    type: 'financial',
    generatedAt: '2026-07-05T14:30:00',
    generatedBy: 'Admin',
    size: '1.8 MB',
    pages: 24,
    status: 'ready',
    format: 'PDF',
  },
  {
    id: 'r003',
    name: 'Workforce Analytics Export — Q2 2026',
    type: 'workforce',
    generatedAt: '2026-07-06T08:45:00',
    generatedBy: 'HR Manager',
    size: '980 KB',
    pages: 0,
    status: 'ready',
    format: 'Excel',
  },
  {
    id: 'r004',
    name: 'Customer Experience Metrics — Jun 2026',
    type: 'customer',
    generatedAt: '2026-07-03T11:00:00',
    generatedBy: 'System (Scheduled)',
    size: '1.2 MB',
    pages: 14,
    status: 'ready',
    format: 'PDF',
  },
  {
    id: 'r005',
    name: 'Project Portfolio Status — Q2 2026',
    type: 'project',
    generatedAt: '2026-07-07T16:20:00',
    generatedBy: 'PMO',
    size: '3.1 MB',
    pages: 32,
    status: 'ready',
    format: 'PDF',
  },
  {
    id: 'r006',
    name: 'Cross-Domain Anomaly Report — Jun 2026',
    type: 'executive',
    generatedAt: '2026-07-01T07:00:00',
    generatedBy: 'System (Scheduled)',
    size: '760 KB',
    pages: 8,
    status: 'ready',
    format: 'PDF',
  },
  {
    id: 'r007',
    name: 'Workforce Raw Data Export — Jun 2026',
    type: 'workforce',
    generatedAt: '2026-07-01T07:05:00',
    generatedBy: 'System (Scheduled)',
    size: '420 KB',
    pages: 0,
    status: 'ready',
    format: 'CSV',
  },
  {
    id: 'r008',
    name: 'Financial KPI Drill-Down — May 2026',
    type: 'financial',
    generatedAt: '2026-06-04T10:00:00',
    generatedBy: 'CFO',
    size: '1.5 MB',
    pages: 20,
    status: 'ready',
    format: 'PDF',
  },
  {
    id: 'r009',
    name: 'Customer NPS Trend Analysis — H1 2026',
    type: 'customer',
    generatedAt: '2026-07-10T09:00:00',
    generatedBy: 'CX Team',
    size: '870 KB',
    pages: 10,
    status: 'ready',
    format: 'PDF',
  },
  {
    id: 'r010',
    name: 'Project Budget Audit — Q1 2026',
    type: 'project',
    generatedAt: '2026-04-15T14:00:00',
    generatedBy: 'Finance',
    size: '2.2 MB',
    pages: 28,
    status: 'ready',
    format: 'PDF',
  },
];

// ── Scheduled Reports ─────────────────────────────────────────────────────────

export const SCHEDULED_REPORTS: ScheduledReport[] = [
  {
    id: 's001',
    name: 'Monthly Executive Summary',
    type: 'executive',
    frequency: 'monthly',
    nextRun: '2026-08-01T07:00:00',
    recipients: ['ceo@company.com', 'cfo@company.com', 'coo@company.com'],
    enabled: true,
  },
  {
    id: 's002',
    name: 'Weekly Financial Snapshot',
    type: 'financial',
    frequency: 'weekly',
    nextRun: '2026-08-03T08:00:00',
    recipients: ['cfo@company.com', 'finance-team@company.com'],
    enabled: true,
  },
  {
    id: 's003',
    name: 'Monthly Workforce Analytics',
    type: 'workforce',
    frequency: 'monthly',
    nextRun: '2026-08-01T07:05:00',
    recipients: ['hr-director@company.com', 'coo@company.com'],
    enabled: true,
  },
  {
    id: 's004',
    name: 'Monthly Customer Experience Report',
    type: 'customer',
    frequency: 'monthly',
    nextRun: '2026-08-01T07:10:00',
    recipients: ['cx-manager@company.com', 'coo@company.com'],
    enabled: true,
  },
  {
    id: 's005',
    name: 'Quarterly Project Portfolio Report',
    type: 'project',
    frequency: 'quarterly',
    nextRun: '2026-10-01T09:00:00',
    recipients: ['pmo@company.com', 'ceo@company.com'],
    enabled: true,
  },
  {
    id: 's006',
    name: 'Daily Anomaly Alert Digest',
    type: 'executive',
    frequency: 'daily',
    nextRun: '2026-07-31T07:00:00',
    recipients: ['ops-team@company.com'],
    enabled: false,
  },
];
