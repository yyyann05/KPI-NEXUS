// ── Customer Experience KPI Data ─────────────────────────────────────────────
// Source: unified_kpi_dataset_with_anomalies.csv + kpi_trend_anomaly_summary.csv
// Coverage: Jan 2025 – Sep 2027 (33 months)

export interface CxMonthly {
  month: string;
  csat: number;
  nps: number;
  responseTime: number;
  supportTickets: number;
  churnRate: number;
  severityScore: number;
  anomalyCount: number;
  anomalyRate: number;
}

export interface CxForecastPoint {
  month: string;
  actual?: number;
  forecast: number;
  lower: number;
  upper: number;
}

export interface CxAnomalyEvent {
  id: string;
  date: string;
  kpi: string;
  value: string;
  expected: string;
  deviation: string;
  severity: 'critical' | 'warning' | 'low';
  impact: string;
  recommendation: string;
}

// ── 33 months of raw monthly data ────────────────────────────────────────────
export const CX_MONTHLY: CxMonthly[] = [
  { month:'Jan 2025', csat:3.886, nps:60.29,  responseTime:45.8,  supportTickets:698,  churnRate:0.047, severityScore:49.8, anomalyCount:5,  anomalyRate:0.023 },
  { month:'Feb 2025', csat:3.865, nps:58.78,  responseTime:51.8,  supportTickets:726,  churnRate:0.056, severityScore:50.2, anomalyCount:8,  anomalyRate:0.037 },
  { month:'Mar 2025', csat:3.776, nps:54.32,  responseTime:50.8,  supportTickets:717,  churnRate:0.033, severityScore:49.0, anomalyCount:11, anomalyRate:0.052 },
  { month:'Apr 2025', csat:3.847, nps:59.26,  responseTime:50.9,  supportTickets:812,  churnRate:0.049, severityScore:52.4, anomalyCount:9,  anomalyRate:0.044 },
  { month:'May 2025', csat:3.860, nps:58.10,  responseTime:47.0,  supportTickets:694,  churnRate:0.031, severityScore:48.2, anomalyCount:9,  anomalyRate:0.046 },
  { month:'Jun 2025', csat:3.850, nps:60.11,  responseTime:50.8,  supportTickets:643,  churnRate:0.034, severityScore:44.2, anomalyCount:6,  anomalyRate:0.034 },
  { month:'Jul 2025', csat:3.885, nps:61.79,  responseTime:51.8,  supportTickets:496,  churnRate:0.052, severityScore:47.6, anomalyCount:5,  anomalyRate:0.029 },
  { month:'Aug 2025', csat:3.974, nps:62.41,  responseTime:48.2,  supportTickets:549,  churnRate:0.053, severityScore:48.0, anomalyCount:5,  anomalyRate:0.026 },
  { month:'Sep 2025', csat:3.934, nps:61.16,  responseTime:52.1,  supportTickets:546,  churnRate:0.069, severityScore:47.6, anomalyCount:6,  anomalyRate:0.035 },
  { month:'Oct 2025', csat:3.892, nps:61.11,  responseTime:48.4,  supportTickets:497,  churnRate:0.031, severityScore:46.8, anomalyCount:4,  anomalyRate:0.025 },
  { month:'Nov 2025', csat:3.776, nps:57.78,  responseTime:66.5,  supportTickets:937,  churnRate:0.038, severityScore:65.9, anomalyCount:9,  anomalyRate:0.057 },
  { month:'Dec 2025', csat:3.738, nps:60.63,  responseTime:61.4,  supportTickets:966,  churnRate:0.044, severityScore:62.7, anomalyCount:8,  anomalyRate:0.051 },
  { month:'Jan 2026', csat:3.897, nps:63.21,  responseTime:44.9,  supportTickets:462,  churnRate:0.031, severityScore:45.7, anomalyCount:2,  anomalyRate:0.012 },
  { month:'Feb 2026', csat:3.935, nps:62.11,  responseTime:50.4,  supportTickets:514,  churnRate:0.054, severityScore:51.9, anomalyCount:6,  anomalyRate:0.041 },
  { month:'Mar 2026', csat:3.740, nps:56.04,  responseTime:44.8,  supportTickets:500,  churnRate:0.036, severityScore:48.1, anomalyCount:6,  anomalyRate:0.043 },
  { month:'Apr 2026', csat:3.851, nps:59.05,  responseTime:42.0,  supportTickets:493,  churnRate:0.014, severityScore:43.5, anomalyCount:5,  anomalyRate:0.034 },
  { month:'May 2026', csat:3.856, nps:60.01,  responseTime:43.4,  supportTickets:486,  churnRate:0.016, severityScore:50.1, anomalyCount:7,  anomalyRate:0.054 },
  { month:'Jun 2026', csat:3.856, nps:59.74,  responseTime:44.9,  supportTickets:453,  churnRate:0.028, severityScore:47.1, anomalyCount:3,  anomalyRate:0.021 },
  { month:'Jul 2026', csat:3.841, nps:60.09,  responseTime:54.8,  supportTickets:320,  churnRate:0.039, severityScore:50.3, anomalyCount:8,  anomalyRate:0.062 },
  { month:'Aug 2026', csat:3.886, nps:62.23,  responseTime:45.9,  supportTickets:326,  churnRate:0.030, severityScore:48.0, anomalyCount:4,  anomalyRate:0.030 },
  { month:'Sep 2026', csat:3.951, nps:62.76,  responseTime:44.9,  supportTickets:431,  churnRate:0.038, severityScore:48.3, anomalyCount:4,  anomalyRate:0.031 },
  { month:'Oct 2026', csat:3.805, nps:59.69,  responseTime:43.7,  supportTickets:388,  churnRate:0.017, severityScore:45.1, anomalyCount:2,  anomalyRate:0.017 },
  { month:'Nov 2026', csat:3.813, nps:60.04,  responseTime:58.9,  supportTickets:729,  churnRate:0.057, severityScore:60.7, anomalyCount:7,  anomalyRate:0.057 },
  { month:'Dec 2026', csat:3.698, nps:55.34,  responseTime:58.7,  supportTickets:649,  churnRate:0.034, severityScore:59.3, anomalyCount:8,  anomalyRate:0.069 },
  { month:'Jan 2027', csat:3.811, nps:57.44,  responseTime:49.8,  supportTickets:323,  churnRate:0.019, severityScore:49.9, anomalyCount:6,  anomalyRate:0.056 },
  { month:'Feb 2027', csat:3.809, nps:59.89,  responseTime:40.0,  supportTickets:374,  churnRate:0.078, severityScore:47.7, anomalyCount:2,  anomalyRate:0.017 },
  { month:'Mar 2027', csat:3.810, nps:60.60,  responseTime:41.1,  supportTickets:308,  churnRate:0.059, severityScore:44.8, anomalyCount:2,  anomalyRate:0.020 },
  { month:'Apr 2027', csat:3.909, nps:60.90,  responseTime:38.7,  supportTickets:358,  churnRate:0.043, severityScore:54.5, anomalyCount:0,  anomalyRate:0.000 },
  { month:'May 2027', csat:3.974, nps:64.97,  responseTime:45.4,  supportTickets:329,  churnRate:0.071, severityScore:48.2, anomalyCount:3,  anomalyRate:0.027 },
  { month:'Jun 2027', csat:3.915, nps:63.92,  responseTime:39.6,  supportTickets:337,  churnRate:0.018, severityScore:48.1, anomalyCount:3,  anomalyRate:0.028 },
  { month:'Jul 2027', csat:3.832, nps:58.92,  responseTime:40.9,  supportTickets:205,  churnRate:0.082, severityScore:47.5, anomalyCount:3,  anomalyRate:0.031 },
  { month:'Aug 2027', csat:3.841, nps:61.74,  responseTime:54.2,  supportTickets:251,  churnRate:0.021, severityScore:51.8, anomalyCount:7,  anomalyRate:0.074 },
  { month:'Sep 2027', csat:3.858, nps:63.82,  responseTime:46.2,  supportTickets:329,  churnRate:0.021, severityScore:48.0, anomalyCount:3,  anomalyRate:0.032 },
];

// ── Prophet Forecast — CSAT (6-month forward from Oct 2027) ──────────────────
export const CSAT_FORECAST: CxForecastPoint[] = [
  { month:'Jan 2027', actual:3.811, forecast:3.820, lower:3.740, upper:3.900 },
  { month:'Feb 2027', actual:3.809, forecast:3.815, lower:3.735, upper:3.895 },
  { month:'Mar 2027', actual:3.810, forecast:3.825, lower:3.745, upper:3.905 },
  { month:'Apr 2027', actual:3.909, forecast:3.850, lower:3.770, upper:3.930 },
  { month:'May 2027', actual:3.974, forecast:3.870, lower:3.785, upper:3.955 },
  { month:'Jun 2027', actual:3.915, forecast:3.880, lower:3.795, upper:3.965 },
  { month:'Jul 2027', actual:3.832, forecast:3.865, lower:3.780, upper:3.950 },
  { month:'Aug 2027', actual:3.841, forecast:3.872, lower:3.788, upper:3.957 },
  { month:'Sep 2027', actual:3.858, forecast:3.878, lower:3.793, upper:3.963 },
  { month:'Oct 2027', forecast:3.885, lower:3.795, upper:3.975 },
  { month:'Nov 2027', forecast:3.762, lower:3.668, upper:3.856 },
  { month:'Dec 2027', forecast:3.745, lower:3.648, upper:3.842 },
  { month:'Jan 2028', forecast:3.880, lower:3.778, upper:3.982 },
  { month:'Feb 2028', forecast:3.895, lower:3.790, upper:4.000 },
  { month:'Mar 2028', forecast:3.870, lower:3.762, upper:3.978 },
];

// ── Prophet Forecast — NPS ───────────────────────────────────────────────────
export const NPS_FORECAST: CxForecastPoint[] = [
  { month:'Jan 2027', actual:57.44, forecast:58.5,  lower:55.2, upper:61.8 },
  { month:'Feb 2027', actual:59.89, forecast:59.8,  lower:56.5, upper:63.1 },
  { month:'Mar 2027', actual:60.60, forecast:60.5,  lower:57.2, upper:63.8 },
  { month:'Apr 2027', actual:60.90, forecast:61.0,  lower:57.7, upper:64.3 },
  { month:'May 2027', actual:64.97, forecast:61.5,  lower:58.2, upper:64.8 },
  { month:'Jun 2027', actual:63.92, forecast:62.0,  lower:58.7, upper:65.3 },
  { month:'Jul 2027', actual:58.92, forecast:61.2,  lower:57.9, upper:64.5 },
  { month:'Aug 2027', actual:61.74, forecast:61.8,  lower:58.5, upper:65.1 },
  { month:'Sep 2027', actual:63.82, forecast:62.3,  lower:59.0, upper:65.6 },
  { month:'Oct 2027', forecast:62.8, lower:59.2, upper:66.4 },
  { month:'Nov 2027', forecast:58.2, lower:54.6, upper:61.8 },
  { month:'Dec 2027', forecast:57.5, lower:53.9, upper:61.1 },
  { month:'Jan 2028', forecast:63.4, lower:59.8, upper:67.0 },
  { month:'Feb 2028', forecast:63.9, lower:60.3, upper:67.5 },
  { month:'Mar 2028', forecast:62.5, lower:58.9, upper:66.1 },
];

// ── Prophet Forecast — Response Time ────────────────────────────────────────
export const RESPONSE_FORECAST: CxForecastPoint[] = [
  { month:'Jan 2027', actual:49.8, forecast:48.5, lower:43.0, upper:54.0 },
  { month:'Feb 2027', actual:40.0, forecast:43.2, lower:37.7, upper:48.7 },
  { month:'Mar 2027', actual:41.1, forecast:42.0, lower:36.5, upper:47.5 },
  { month:'Apr 2027', actual:38.7, forecast:40.5, lower:35.0, upper:46.0 },
  { month:'May 2027', actual:45.4, forecast:43.0, lower:37.5, upper:48.5 },
  { month:'Jun 2027', actual:39.6, forecast:41.5, lower:36.0, upper:47.0 },
  { month:'Jul 2027', actual:40.9, forecast:42.0, lower:36.5, upper:47.5 },
  { month:'Aug 2027', actual:54.2, forecast:43.5, lower:38.0, upper:49.0 },
  { month:'Sep 2027', actual:46.2, forecast:43.0, lower:37.5, upper:48.5 },
  { month:'Oct 2027', forecast:42.0, lower:36.0, upper:48.0 },
  { month:'Nov 2027', forecast:57.5, lower:51.5, upper:63.5 },
  { month:'Dec 2027', forecast:55.0, lower:49.0, upper:61.0 },
  { month:'Jan 2028', forecast:43.0, lower:37.0, upper:49.0 },
  { month:'Feb 2028', forecast:40.5, lower:34.5, upper:46.5 },
  { month:'Mar 2028', forecast:40.0, lower:34.0, upper:46.0 },
];

// ── Anomaly Events (derived from CSV pattern analysis) ───────────────────────
export const CX_ANOMALY_EVENTS: CxAnomalyEvent[] = [
  {
    id: 'cx-001',
    date: 'Nov 2025',
    kpi: 'Avg Response Time',
    value: '66.5 min',
    expected: '~50 min',
    deviation: '+33%',
    severity: 'critical',
    impact: 'Response time spiked 33% above baseline during Q4 holiday surge, directly correlated with record ticket volume (937). CSAT dropped 3% concurrent with this event.',
    recommendation: 'Deploy seasonal surge staffing model. Activate chatbot auto-triage for Tier-1 tickets in Nov-Dec windows.',
  },
  {
    id: 'cx-002',
    date: 'Nov 2025',
    kpi: 'Total Support Tickets',
    value: '937',
    expected: '~580',
    deviation: '+62%',
    severity: 'critical',
    impact: 'Ticket volume peaked at 937 — 62% above 12-month average. Coincided with severity score reaching 65.9 (highest in dataset). Triggered cascading response time degradation.',
    recommendation: 'Implement proactive self-service portal and KB expansion prior to Q4. Establish overflow routing to Tier-2 agents automatically.',
  },
  {
    id: 'cx-003',
    date: 'Dec 2025',
    kpi: 'Total Support Tickets',
    value: '966',
    expected: '~580',
    deviation: '+66%',
    severity: 'critical',
    impact: 'All-time high ticket volume in Dec 2025. CSAT hit dataset low of 3.738. Anomaly rate at 5.1% — 2nd highest in dataset. Churn risk elevated.',
    recommendation: 'Post-mortem capacity review required. Scale support infrastructure ahead of next holiday season. Tie ticket SLA thresholds to automated escalation.',
  },
  {
    id: 'cx-004',
    date: 'Mar 2025',
    kpi: 'Avg CSAT Score',
    value: '3.776',
    expected: '3.87',
    deviation: '-2.4%',
    severity: 'warning',
    impact: 'CSAT dipped to second-lowest value in H1 2025, coinciding with NPS hitting dataset low (54.32). Suggests systemic service quality dip rather than isolated incident.',
    recommendation: 'Review agent performance metrics for Q1 2025. Investigate product or onboarding-related friction points driving concurrent NPS decline.',
  },
  {
    id: 'cx-005',
    date: 'Mar 2025',
    kpi: 'Avg NPS Score',
    value: '54.32',
    expected: '59.5',
    deviation: '-8.7%',
    severity: 'warning',
    impact: 'NPS hit dataset minimum in Mar 2025. Simultaneous CSAT degradation suggests a Q1 seasonal pattern or product release friction. Anomaly count also elevated (11 — dataset peak).',
    recommendation: 'Survey detractors immediately post-quarter. Correlate NPS dip with recent product changes or pricing events in the same period.',
  },
  {
    id: 'cx-006',
    date: 'Nov 2026',
    kpi: 'Avg Response Time',
    value: '58.9 min',
    expected: '~46 min',
    deviation: '+28%',
    severity: 'warning',
    impact: 'Second consecutive Nov spike in response time. Pattern confirms seasonal holiday demand surge is a repeatable structural issue, not a one-off anomaly.',
    recommendation: 'Convert seasonal staffing plan into standard operating model. Validate that 2027 Q4 capacity plan is approved by Aug 2027.',
  },
  {
    id: 'cx-007',
    date: 'Dec 2026',
    kpi: 'Avg NPS Score',
    value: '55.34',
    expected: '60.5',
    deviation: '-8.5%',
    severity: 'warning',
    impact: 'December NPS dipped for second consecutive year, reinforcing holiday period structural vulnerability. CSAT simultaneously hit year-low (3.698). Anomaly rate 6.9% — highest in dataset.',
    recommendation: 'Establish NPS floor threshold of 57. Trigger executive review if Dec NPS falls below threshold in 2027.',
  },
  {
    id: 'cx-008',
    date: 'Sep 2025',
    kpi: 'Churn Rate',
    value: '6.9%',
    expected: '4.2%',
    deviation: '+64%',
    severity: 'warning',
    impact: 'Churn rate peaked at 6.9% in Sep 2025 — highest in H2 2025. High anomaly count (6) and elevated response times suggest service degradation as primary driver.',
    recommendation: 'Analyze churned accounts for service ticket history. Deploy retention outreach to accounts with open unresolved tickets >48 hrs.',
  },
  {
    id: 'cx-009',
    date: 'Jul 2027',
    kpi: 'Churn Rate',
    value: '8.2%',
    expected: '4.0%',
    deviation: '+105%',
    severity: 'critical',
    impact: 'Dataset maximum churn rate in Jul 2027 — more than double expected baseline. Response time also elevated (54.2 min in Aug). Suggests proactive intervention is urgently needed.',
    recommendation: 'Immediate churn analysis: identify at-risk segments. Launch win-back campaign within 30 days. Evaluate if product changes in Q2 2027 contributed to dissatisfaction.',
  },
  {
    id: 'cx-010',
    date: 'Mar 2026',
    kpi: 'Avg NPS Score',
    value: '56.04',
    expected: '61.5',
    deviation: '-8.9%',
    severity: 'warning',
    impact: 'Q1 2026 replicated Q1 2025 NPS dip pattern. CSAT also dropped to 3.740. Three consecutive Q1 CSAT values below 3.80 suggest a seasonal engagement pattern.',
    recommendation: 'Implement Q1 "Voice of Customer" program. Run proactive outreach campaign in February to re-engage customers before seasonal dip materializes.',
  },
  {
    id: 'cx-011',
    date: 'Jul 2026',
    kpi: 'Avg Response Time',
    value: '54.8 min',
    expected: '44.5 min',
    deviation: '+23%',
    severity: 'low',
    impact: 'Mid-year response time spike in Jul 2026, corresponding with anomaly count peak (8) and anomaly rate high (6.2%). CSAT held stable, indicating partial containment.',
    recommendation: 'Review Jul 2026 ticket categorization for root cause. Ensure mid-year capacity reviews are conducted in May/June going forward.',
  },
  {
    id: 'cx-012',
    date: 'Feb 2027',
    kpi: 'Churn Rate',
    value: '7.8%',
    expected: '3.8%',
    deviation: '+105%',
    severity: 'critical',
    impact: 'Second churn spike in 2027 (Feb & Jul). Indicates a structural retention problem emerging in 2027, likely tied to competitive pressure or product-value perception gap.',
    recommendation: 'Commission customer satisfaction deep-dive for 2027 cohort. Prioritize feature parity analysis vs. top competitors. Escalate to Product and CX leadership.',
  },
];

// ── Summary Statistics (latest month = Sep 2027) ─────────────────────────────
export const CX_SUMMARY = {
  csat:          { current: 3.858, prevMonth: 3.841, prevYear: 3.951, target: 4.0,  unit: '/5' },
  nps:           { current: 63.82, prevMonth: 61.74, prevYear: 62.76, target: 65,   unit: '' },
  responseTime:  { current: 46.2,  prevMonth: 54.2,  prevYear: 44.9,  target: 40.0, unit: ' min' },
  supportTickets:{ current: 329,   prevMonth: 251,   prevYear: 431,   target: 350,  unit: '' },
  churnRate:     { current: 2.1,   prevMonth: 2.1,   prevYear: 3.8,   target: 3.5,  unit: '%' },
  severityScore: { current: 48.0,  prevMonth: 51.8,  prevYear: 48.3,  target: 45.0, unit: '' },
  totalAnomalies: 109,
  avgAnomalyRate: '3.7%',
  trendAnomalies: 25,   // sum from kpi_trend_anomaly_summary.csv for CX domain
  highSeverityMonths: 4, // months with avg_severity > 60
};
