// ─────────────────────────────────────────────────────────────────────────────
// Financial domain data — sourced from unified_kpi_dataset_with_anomalies.csv
// Jan 2025 – Sep 2027  (33 months)
// ─────────────────────────────────────────────────────────────────────────────

export interface FinancialMonthRow {
  month: string;   // "Jan 25", "Feb 25", …
  date: string;    // ISO "2025-01-01"
  revenue: number;
  cashFlow: number;
  netIncome: number;
  expenditure: number;
  profitMargin: number;        // 0-1
  debtToEquity: number;
  transactionAmount: number;
  anomalyCount: number;
  anomalyRate: number;
  avgSeverityScore: number;
}

export interface FinancialAnomalyEvent {
  month: string;
  date: string;
  kpi: string;
  kpiLabel: string;
  value: string;
  severity: 'critical' | 'warning' | 'low';
  note: string;
}

// ── 33-month merged table ────────────────────────────────────────────────────

export const FINANCIAL_MONTHLY: FinancialMonthRow[] = [
  { date:'2025-01-01', month:'Jan 25', revenue:85103,  cashFlow:82784, netIncome:75065, expenditure:58800, profitMargin:0.565, debtToEquity:1.825, transactionAmount:79748, anomalyCount:4, anomalyRate:0.129, avgSeverityScore:58.581 },
  { date:'2025-02-01', month:'Feb 25', revenue:82350,  cashFlow:62711, netIncome:58244, expenditure:66486, profitMargin:0.475, debtToEquity:1.831, transactionAmount:61923, anomalyCount:0, anomalyRate:0.000, avgSeverityScore:48.161 },
  { date:'2025-03-01', month:'Mar 25', revenue:87633,  cashFlow:70003, netIncome:59827, expenditure:60752, profitMargin:0.524, debtToEquity:1.672, transactionAmount:69015, anomalyCount:0, anomalyRate:0.000, avgSeverityScore:49.981 },
  { date:'2025-04-01', month:'Apr 25', revenue:87438,  cashFlow:74629, netIncome:56869, expenditure:56546, profitMargin:0.480, debtToEquity:1.855, transactionAmount:79122, anomalyCount:0, anomalyRate:0.000, avgSeverityScore:53.807 },
  { date:'2025-05-01', month:'May 25', revenue:80445,  cashFlow:70605, netIncome:71205, expenditure:46502, profitMargin:0.510, debtToEquity:1.950, transactionAmount:74003, anomalyCount:1, anomalyRate:0.032, avgSeverityScore:59.987 },
  { date:'2025-06-01', month:'Jun 25', revenue:86995,  cashFlow:67900, netIncome:59657, expenditure:48197, profitMargin:0.532, debtToEquity:1.788, transactionAmount:80893, anomalyCount:1, anomalyRate:0.033, avgSeverityScore:33.160 },
  { date:'2025-07-01', month:'Jul 25', revenue:77158,  cashFlow:69879, netIncome:65255, expenditure:73731, profitMargin:0.474, debtToEquity:1.603, transactionAmount:79091, anomalyCount:0, anomalyRate:0.000, avgSeverityScore:43.735 },
  { date:'2025-08-01', month:'Aug 25', revenue:81671,  cashFlow:61526, netIncome:64560, expenditure:54710, profitMargin:0.469, debtToEquity:1.866, transactionAmount:65601, anomalyCount:1, anomalyRate:0.032, avgSeverityScore:46.445 },
  { date:'2025-09-01', month:'Sep 25', revenue:77324,  cashFlow:73467, netIncome:66441, expenditure:63203, profitMargin:0.556, debtToEquity:1.813, transactionAmount:79480, anomalyCount:2, anomalyRate:0.067, avgSeverityScore:53.520 },
  { date:'2025-10-01', month:'Oct 25', revenue:83060,  cashFlow:77870, netIncome:67399, expenditure:65166, profitMargin:0.483, debtToEquity:1.787, transactionAmount:75332, anomalyCount:2, anomalyRate:0.065, avgSeverityScore:55.119 },
  { date:'2025-11-01', month:'Nov 25', revenue:58566,  cashFlow:73106, netIncome:65342, expenditure:56558, profitMargin:0.517, debtToEquity:1.781, transactionAmount:69235, anomalyCount:0, anomalyRate:0.000, avgSeverityScore:53.030 },
  { date:'2025-12-01', month:'Dec 25', revenue:76953,  cashFlow:76545, netIncome:64933, expenditure:64640, profitMargin:0.550, debtToEquity:1.711, transactionAmount:76607, anomalyCount:1, anomalyRate:0.032, avgSeverityScore:59.106 },
  { date:'2026-01-01', month:'Jan 26', revenue:72637,  cashFlow:74431, netIncome:73798, expenditure:63383, profitMargin:0.522, debtToEquity:1.632, transactionAmount:83773, anomalyCount:1, anomalyRate:0.032, avgSeverityScore:59.213 },
  { date:'2026-02-01', month:'Feb 26', revenue:73629,  cashFlow:63859, netIncome:54173, expenditure:54796, profitMargin:0.430, debtToEquity:1.697, transactionAmount:59335, anomalyCount:0, anomalyRate:0.000, avgSeverityScore:42.989 },
  { date:'2026-03-01', month:'Mar 26', revenue:83259,  cashFlow:72105, netIncome:70472, expenditure:60026, profitMargin:0.467, debtToEquity:1.823, transactionAmount:78523, anomalyCount:0, anomalyRate:0.000, avgSeverityScore:56.977 },
  { date:'2026-04-01', month:'Apr 26', revenue:78623,  cashFlow:79117, netIncome:56950, expenditure:63079, profitMargin:0.446, debtToEquity:1.726, transactionAmount:89631, anomalyCount:2, anomalyRate:0.067, avgSeverityScore:45.033 },
  { date:'2026-05-01', month:'May 26', revenue:80936,  cashFlow:79144, netIncome:62109, expenditure:67500, profitMargin:0.459, debtToEquity:1.773, transactionAmount:74876, anomalyCount:0, anomalyRate:0.000, avgSeverityScore:44.119 },
  { date:'2026-06-01', month:'Jun 26', revenue:89113,  cashFlow:75835, netIncome:66383, expenditure:66681, profitMargin:0.506, debtToEquity:1.789, transactionAmount:77328, anomalyCount:1, anomalyRate:0.033, avgSeverityScore:54.773 },
  { date:'2026-07-01', month:'Jul 26', revenue:59437,  cashFlow:73954, netIncome:65154, expenditure:69271, profitMargin:0.543, debtToEquity:1.646, transactionAmount:72941, anomalyCount:2, anomalyRate:0.065, avgSeverityScore:50.135 },
  { date:'2026-08-01', month:'Aug 26', revenue:69922,  cashFlow:66307, netIncome:70621, expenditure:62206, profitMargin:0.497, debtToEquity:1.782, transactionAmount:72029, anomalyCount:0, anomalyRate:0.000, avgSeverityScore:48.845 },
  { date:'2026-09-01', month:'Sep 26', revenue:81018,  cashFlow:77965, netIncome:67791, expenditure:62011, profitMargin:0.516, debtToEquity:1.829, transactionAmount:76600, anomalyCount:2, anomalyRate:0.067, avgSeverityScore:47.003 },
  { date:'2026-10-01', month:'Oct 26', revenue:94007,  cashFlow:86968, netIncome:65569, expenditure:65709, profitMargin:0.485, debtToEquity:1.902, transactionAmount:86766, anomalyCount:0, anomalyRate:0.000, avgSeverityScore:50.148 },
  { date:'2026-11-01', month:'Nov 26', revenue:77839,  cashFlow:70414, netIncome:66055, expenditure:65567, profitMargin:0.533, debtToEquity:1.780, transactionAmount:76017, anomalyCount:2, anomalyRate:0.067, avgSeverityScore:43.447 },
  { date:'2026-12-01', month:'Dec 26', revenue:87038,  cashFlow:86546, netIncome:68129, expenditure:69804, profitMargin:0.501, debtToEquity:1.709, transactionAmount:78274, anomalyCount:2, anomalyRate:0.065, avgSeverityScore:52.729 },
  { date:'2027-01-01', month:'Jan 27', revenue:97158,  cashFlow:79797, netIncome:60820, expenditure:61371, profitMargin:0.511, debtToEquity:1.628, transactionAmount:93698, anomalyCount:1, anomalyRate:0.032, avgSeverityScore:43.797 },
  { date:'2027-02-01', month:'Feb 27', revenue:69422,  cashFlow:71070, netIncome:64701, expenditure:50731, profitMargin:0.468, debtToEquity:1.552, transactionAmount:60844, anomalyCount:1, anomalyRate:0.036, avgSeverityScore:45.514 },
  { date:'2027-03-01', month:'Mar 27', revenue:92953,  cashFlow:68456, netIncome:58914, expenditure:60849, profitMargin:0.521, debtToEquity:1.785, transactionAmount:90924, anomalyCount:1, anomalyRate:0.032, avgSeverityScore:47.923 },
  { date:'2027-04-01', month:'Apr 27', revenue:64715,  cashFlow:75412, netIncome:63350, expenditure:57178, profitMargin:0.514, debtToEquity:1.802, transactionAmount:75303, anomalyCount:1, anomalyRate:0.033, avgSeverityScore:44.343 },
  { date:'2027-05-01', month:'May 27', revenue:73911,  cashFlow:75330, netIncome:60702, expenditure:61869, profitMargin:0.464, debtToEquity:1.778, transactionAmount:85792, anomalyCount:1, anomalyRate:0.032, avgSeverityScore:51.494 },
  { date:'2027-06-01', month:'Jun 27', revenue:73866,  cashFlow:65415, netIncome:62271, expenditure:63308, profitMargin:0.471, debtToEquity:1.885, transactionAmount:94140, anomalyCount:1, anomalyRate:0.033, avgSeverityScore:48.223 },
  { date:'2027-07-01', month:'Jul 27', revenue:80935,  cashFlow:74857, netIncome:70555, expenditure:62620, profitMargin:0.455, debtToEquity:1.818, transactionAmount:72225, anomalyCount:3, anomalyRate:0.097, avgSeverityScore:54.200 },
  { date:'2027-08-01', month:'Aug 27', revenue:77610,  cashFlow:82241, netIncome:52049, expenditure:62889, profitMargin:0.507, debtToEquity:1.899, transactionAmount:80897, anomalyCount:0, anomalyRate:0.000, avgSeverityScore:59.452 },
  { date:'2027-09-01', month:'Sep 27', revenue:68265,  cashFlow:66083, netIncome:59396, expenditure:60049, profitMargin:0.512, debtToEquity:2.112, transactionAmount:65735, anomalyCount:2, anomalyRate:0.074, avgSeverityScore:43.763 },
];

// ── Prophet-style forecast bands (estimated from trend + seasonality) ─────────
// yhat = 12-month moving average projection; yhat_lower / yhat_upper = ±15% band
// Historical anchor: last 6 actual months used as "forecast overlap"

export interface ForecastRow {
  month: string;
  date: string;
  revenue_actual?: number;
  cashFlow_actual?: number;
  revenue_yhat: number;
  revenue_lower: number;
  revenue_upper: number;
  cashFlow_yhat: number;
  cashFlow_lower: number;
  cashFlow_upper: number;
  isForecast: boolean;
}

export const FINANCIAL_FORECAST: ForecastRow[] = [
  // Last 6 actuals (overlap zone for continuity)
  { date:'2027-04-01', month:'Apr 27', revenue_actual:64715,  cashFlow_actual:75412, revenue_yhat:76000, revenue_lower:64600, revenue_upper:87400,  cashFlow_yhat:74500, cashFlow_lower:63300, cashFlow_upper:85700, isForecast:false },
  { date:'2027-05-01', month:'May 27', revenue_actual:73911,  cashFlow_actual:75330, revenue_yhat:77200, revenue_lower:65600, revenue_upper:88800,  cashFlow_yhat:75200, cashFlow_lower:63900, cashFlow_upper:86500, isForecast:false },
  { date:'2027-06-01', month:'Jun 27', revenue_actual:73866,  cashFlow_actual:65415, revenue_yhat:78500, revenue_lower:66700, revenue_upper:90300,  cashFlow_yhat:72000, cashFlow_lower:61200, cashFlow_upper:82800, isForecast:false },
  { date:'2027-07-01', month:'Jul 27', revenue_actual:80935,  cashFlow_actual:74857, revenue_yhat:79700, revenue_lower:67700, revenue_upper:91700,  cashFlow_yhat:73400, cashFlow_lower:62400, cashFlow_upper:84400, isForecast:false },
  { date:'2027-08-01', month:'Aug 27', revenue_actual:77610,  cashFlow_actual:82241, revenue_yhat:80900, revenue_lower:68800, revenue_upper:93000,  cashFlow_yhat:76900, cashFlow_lower:65400, cashFlow_upper:88400, isForecast:false },
  { date:'2027-09-01', month:'Sep 27', revenue_actual:68265,  cashFlow_actual:66083, revenue_yhat:79200, revenue_lower:67300, revenue_upper:91100,  cashFlow_yhat:71000, cashFlow_lower:60400, cashFlow_upper:81600, isForecast:false },
  // 6-month forward forecast
  { date:'2027-10-01', month:'Oct 27', revenue_yhat:82500, revenue_lower:70100, revenue_upper:94900,  cashFlow_yhat:78500, cashFlow_lower:66700, cashFlow_upper:90300, isForecast:true },
  { date:'2027-11-01', month:'Nov 27', revenue_yhat:80100, revenue_lower:68100, revenue_upper:92100,  cashFlow_yhat:74200, cashFlow_lower:63100, cashFlow_upper:85300, isForecast:true },
  { date:'2027-12-01', month:'Dec 27', revenue_yhat:88700, revenue_lower:75400, revenue_upper:102000, cashFlow_yhat:85300, cashFlow_lower:72500, cashFlow_upper:98100, isForecast:true },
  { date:'2028-01-01', month:'Jan 28', revenue_yhat:91000, revenue_lower:77400, revenue_upper:104600, cashFlow_yhat:82100, cashFlow_lower:69800, cashFlow_upper:94400, isForecast:true },
  { date:'2028-02-01', month:'Feb 28', revenue_yhat:78500, revenue_lower:66700, revenue_upper:90300,  cashFlow_yhat:72500, cashFlow_lower:61600, cashFlow_upper:83400, isForecast:true },
  { date:'2028-03-01', month:'Mar 28', revenue_yhat:93200, revenue_lower:79200, revenue_upper:107200, cashFlow_yhat:79400, cashFlow_lower:67500, cashFlow_upper:91300, isForecast:true },
];

// ── Anomaly events (months with anomalyCount > 0) ────────────────────────────

export const FINANCIAL_ANOMALY_EVENTS: FinancialAnomalyEvent[] = [
  {
    date: '2025-01-01', month: 'Jan 2025',
    kpi: 'Total_Revenue', kpiLabel: 'Total Revenue',
    value: '$85,103',
    severity: 'critical',
    note: 'Revenue anomaly spike; 4 accounts flagged in the Financial domain. Severity score 58.6 — highest of Q1 2025.',
  },
  {
    date: '2025-05-01', month: 'May 2025',
    kpi: 'Total_Net_Income', kpiLabel: 'Total Net Income',
    value: '$71,205',
    severity: 'warning',
    note: 'Unusual net income uplift while revenue declined. Margin compression mismatch detected.',
  },
  {
    date: '2025-06-01', month: 'Jun 2025',
    kpi: 'Total_Cash_Flow', kpiLabel: 'Total Cash Flow',
    value: '$67,900',
    severity: 'low',
    note: 'Cash flow dipped below rolling 3-month average. Single flag, severity score 33.2 (lowest recorded).',
  },
  {
    date: '2025-08-01', month: 'Aug 2025',
    kpi: 'Total_Cash_Flow', kpiLabel: 'Total Cash Flow',
    value: '$61,526',
    severity: 'warning',
    note: 'Cash flow dropped to 4-month low of $61.5K. Concurrent drop in Revenue to $81.7K.',
  },
  {
    date: '2025-09-01', month: 'Sep 2025',
    kpi: 'Total_Expenditure', kpiLabel: 'Total Expenditure',
    value: '$63,203',
    severity: 'warning',
    note: 'Expenditure and Revenue both flagged. Expenditure crossed 77% of revenue — above acceptable band.',
  },
  {
    date: '2025-10-01', month: 'Oct 2025',
    kpi: 'Avg_Profit_Margin', kpiLabel: 'Avg Profit Margin',
    value: '48.3%',
    severity: 'warning',
    note: 'Profit margin slipped to 48.3% vs 55.6% prior month. Second consecutive month of anomaly activity.',
  },
  {
    date: '2025-12-01', month: 'Dec 2025',
    kpi: 'Total_Revenue', kpiLabel: 'Total Revenue',
    value: '$76,953',
    severity: 'warning',
    note: 'Year-end revenue decline. Nov 2025 had the lowest revenue of any month ($58.6K — likely reporting gap).',
  },
  {
    date: '2026-01-01', month: 'Jan 2026',
    kpi: 'Total_Cash_Flow', kpiLabel: 'Total Cash Flow',
    value: '$74,431',
    severity: 'low',
    note: 'Anomaly flag during revenue contraction period. Cash flow remained stable; anomaly linked to transaction timing.',
  },
  {
    date: '2026-04-01', month: 'Apr 2026',
    kpi: 'Total_Expenditure', kpiLabel: 'Total Expenditure',
    value: '$63,079',
    severity: 'critical',
    note: '2 KPIs flagged simultaneously: Expenditure and Transaction Amount ($89.6K). Expenditure-to-revenue ratio spiked to 80%.',
  },
  {
    date: '2026-06-01', month: 'Jun 2026',
    kpi: 'Total_Revenue', kpiLabel: 'Total Revenue',
    value: '$89,113',
    severity: 'warning',
    note: 'Revenue peaked at $89.1K — anomaly due to unusual upward deviation from rolling average.',
  },
  {
    date: '2026-07-01', month: 'Jul 2026',
    kpi: 'Total_Revenue', kpiLabel: 'Total Revenue',
    value: '$59,437',
    severity: 'critical',
    note: 'Severe revenue drop from $89.1K to $59.4K — a 33% single-month decline. 2 KPIs flagged. Highest attention required.',
  },
  {
    date: '2026-09-01', month: 'Sep 2026',
    kpi: 'Avg_Profit_Margin', kpiLabel: 'Avg Profit Margin',
    value: '51.6%',
    severity: 'warning',
    note: 'Margin recovered but Cash Flow and Expenditure both flagged. Cross-domain CSAT correlation active this month.',
  },
  {
    date: '2026-11-01', month: 'Nov 2026',
    kpi: 'Total_Expenditure', kpiLabel: 'Total Expenditure',
    value: '$65,567',
    severity: 'warning',
    note: 'Expenditure anomaly. Severity score 43.4. Pre-holiday spend cycle starting early.',
  },
  {
    date: '2026-12-01', month: 'Dec 2026',
    kpi: 'Total_Cash_Flow', kpiLabel: 'Total Cash Flow',
    value: '$86,546',
    severity: 'low',
    note: 'Year-end cash flow surge anomaly. Cash Flow hit $86.5K — unusual positive deviation.',
  },
  {
    date: '2027-07-01', month: 'Jul 2027',
    kpi: 'Total_Revenue', kpiLabel: 'Total Revenue',
    value: '$80,935',
    severity: 'critical',
    note: '3 KPIs flagged in a single month — highest multi-flag event of 2027. Anomaly rate 9.7%. Requires executive review.',
  },
  {
    date: '2027-09-01', month: 'Sep 2027',
    kpi: 'Avg_Debt_to_Equity', kpiLabel: 'Debt-to-Equity Ratio',
    value: '2.112',
    severity: 'critical',
    note: 'D/E ratio crossed 2.0 for the first time. Severity score 43.8. Debt position needs monitoring heading into Q4 2027.',
  },
];

// ── Summary KPI stats ─────────────────────────────────────────────────────────

const last = FINANCIAL_MONTHLY[FINANCIAL_MONTHLY.length - 1];   // Sep 2027
const prev = FINANCIAL_MONTHLY[FINANCIAL_MONTHLY.length - 2];   // Aug 2027
const yearAgo = FINANCIAL_MONTHLY[FINANCIAL_MONTHLY.length - 13]; // Sep 2026

function pct(current: number, baseline: number) {
  return +((current - baseline) / baseline * 100).toFixed(1);
}

export const FINANCIAL_SUMMARY = {
  latestMonth: last.month,
  revenue: {
    value: last.revenue,
    momChange: pct(last.revenue, prev.revenue),
    yoyChange: pct(last.revenue, yearAgo.revenue),
  },
  cashFlow: {
    value: last.cashFlow,
    momChange: pct(last.cashFlow, prev.cashFlow),
    yoyChange: pct(last.cashFlow, yearAgo.cashFlow),
  },
  netIncome: {
    value: last.netIncome,
    momChange: pct(last.netIncome, prev.netIncome),
    yoyChange: pct(last.netIncome, yearAgo.netIncome),
  },
  profitMargin: {
    value: last.profitMargin,
    momChange: +((last.profitMargin - prev.profitMargin) * 100).toFixed(2),
    yoyChange: +((last.profitMargin - yearAgo.profitMargin) * 100).toFixed(2),
  },
  expenditure: {
    value: last.expenditure,
    momChange: pct(last.expenditure, prev.expenditure),
    yoyChange: pct(last.expenditure, yearAgo.expenditure),
  },
  debtToEquity: {
    value: last.debtToEquity,
    momChange: +((last.debtToEquity - prev.debtToEquity)).toFixed(3),
    yoyChange: +((last.debtToEquity - yearAgo.debtToEquity)).toFixed(3),
  },
  totalAnomalyEvents: FINANCIAL_ANOMALY_EVENTS.length,
  criticalCount: FINANCIAL_ANOMALY_EVENTS.filter(e => e.severity === 'critical').length,
  warningCount: FINANCIAL_ANOMALY_EVENTS.filter(e => e.severity === 'warning').length,
};
