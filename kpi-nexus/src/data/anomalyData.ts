// ─────────────────────────────────────────────────────────────
// KPI Nexus — Anomaly Detection & Cross-Domain Data
// Source: unified_kpi_dataset_with_anomalies.csv
//         kpi_trend_anomaly_summary.csv
//         final_findings_for_dashboard.csv
// ─────────────────────────────────────────────────────────────

import type { DomainType } from '../types/kpi';

// ── Types ────────────────────────────────────────────────────

export interface AnomalyTimelinePoint {
  month: string;
  financial: number;
  workforce: number;
  customer: number;
  project: number;
  total: number;
}

export interface FlaggedKpi {
  id: string;
  domain: DomainType;
  kpiName: string;
  displayName: string;
  nMonths: number;
  flagged: number;
  avgSeverity: number;
  severity: 'critical' | 'warning' | 'low';
  usedSeasonality: boolean;
  trend: 'up' | 'down' | 'stable';
  lastFlaggedMonth: string;
  description: string;
}

export interface MonthlyAnomalyPoint {
  month: string;
  financial: number;
  workforce: number;
  customer: number;
  project: number;
}

export interface SeverityBucketPoint {
  domain: DomainType;
  critical: number;   // severity >= 2.0
  warning: number;    // 1.0 – 1.9
  low: number;        // < 1.0
  total: number;
}

export interface CrossDomainFinding {
  id: string;
  driverDomain: DomainType;
  driverKpi: string;
  targetDomain: DomainType;
  targetKpi: string;
  correlation: number;
  pValue: number;
  monthsOfData: number;
  plainEnglish: string;
  alertText: string | null;
  recommendedAction: string | null;
  causalDirection: 'positive' | 'negative';
  strengthLabel: 'Strong' | 'Moderate' | 'Weak';
  businessExplanation: string;
  executiveAction: string;
  riskCategory: 'Revenue Risk' | 'Operational Risk' | 'People Risk' | 'Delivery Risk';
}

export interface TopRisk {
  id: string;
  rank: number;
  title: string;
  domains: DomainType[];
  description: string;
  urgency: 'Critical' | 'High' | 'Medium';
  linkedCorrelation: string;
}

// ── Anomaly Timeline (Monthly totals, Jan 2025 – Sep 2027) ──

export const ANOMALY_TIMELINE: AnomalyTimelinePoint[] = [
  { month: 'Jan 25', financial: 0, workforce: 0, customer: 1, project: 0, total: 1 },
  { month: 'Feb 25', financial: 0, workforce: 0, customer: 2, project: 0, total: 2 },
  { month: 'Mar 25', financial: 1, workforce: 0, customer: 2, project: 1, total: 4 },
  { month: 'Apr 25', financial: 1, workforce: 1, customer: 1, project: 0, total: 3 },
  { month: 'May 25', financial: 0, workforce: 0, customer: 1, project: 1, total: 2 },
  { month: 'Jun 25', financial: 1, workforce: 1, customer: 0, project: 0, total: 2 },
  { month: 'Jul 25', financial: 0, workforce: 0, customer: 0, project: 1, total: 1 },
  { month: 'Aug 25', financial: 1, workforce: 1, customer: 0, project: 0, total: 2 },
  { month: 'Sep 25', financial: 0, workforce: 1, customer: 1, project: 1, total: 3 },
  { month: 'Oct 25', financial: 1, workforce: 0, customer: 0, project: 0, total: 1 },
  { month: 'Nov 25', financial: 2, workforce: 0, customer: 3, project: 0, total: 5 },
  { month: 'Dec 25', financial: 1, workforce: 1, customer: 2, project: 1, total: 5 },
  { month: 'Jan 26', financial: 2, workforce: 0, customer: 1, project: 0, total: 3 },
  { month: 'Feb 26', financial: 1, workforce: 1, customer: 1, project: 1, total: 4 },
  { month: 'Mar 26', financial: 2, workforce: 1, customer: 1, project: 0, total: 4 },
  { month: 'Apr 26', financial: 0, workforce: 1, customer: 0, project: 1, total: 2 },
  { month: 'May 26', financial: 1, workforce: 0, customer: 1, project: 0, total: 2 },
  { month: 'Jun 26', financial: 1, workforce: 0, customer: 0, project: 2, total: 3 },
  { month: 'Jul 26', financial: 2, workforce: 1, customer: 2, project: 0, total: 5 },
  { month: 'Aug 26', financial: 0, workforce: 0, customer: 0, project: 1, total: 1 },
  { month: 'Sep 26', financial: 1, workforce: 2, customer: 1, project: 0, total: 4 },
  { month: 'Oct 26', financial: 0, workforce: 1, customer: 0, project: 0, total: 1 },
  { month: 'Nov 26', financial: 1, workforce: 0, customer: 2, project: 1, total: 4 },
  { month: 'Dec 26', financial: 1, workforce: 1, customer: 2, project: 0, total: 4 },
  { month: 'Jan 27', financial: 0, workforce: 1, customer: 1, project: 0, total: 2 },
  { month: 'Feb 27', financial: 1, workforce: 0, customer: 1, project: 1, total: 3 },
  { month: 'Mar 27', financial: 0, workforce: 1, customer: 0, project: 0, total: 1 },
  { month: 'Apr 27', financial: 1, workforce: 0, customer: 3, project: 0, total: 4 },
  { month: 'May 27', financial: 0, workforce: 0, customer: 1, project: 0, total: 1 },
  { month: 'Jun 27', financial: 1, workforce: 1, customer: 0, project: 0, total: 2 },
  { month: 'Jul 27', financial: 0, workforce: 0, customer: 1, project: 0, total: 1 },
  { month: 'Aug 27', financial: 1, workforce: 0, customer: 3, project: 0, total: 4 },
  { month: 'Sep 27', financial: 0, workforce: 0, customer: 1, project: 0, total: 1 },
];

// ── Monthly Anomaly counts per domain (for heatmap / bar) ───
export const MONTHLY_ANOMALY: MonthlyAnomalyPoint[] = ANOMALY_TIMELINE.map(
  ({ month, financial, workforce, customer, project }) => ({
    month, financial, workforce, customer, project,
  })
);

// ── Flagged KPIs (from kpi_trend_anomaly_summary.csv) ───────

export const FLAGGED_KPIS: FlaggedKpi[] = [
  {
    id: 'f1',
    domain: 'Customer Experience',
    kpiName: 'Avg_Severity_Score',
    displayName: 'Avg Severity Score',
    nMonths: 33,
    flagged: 5,
    avgSeverity: 1.4,
    severity: 'critical',
    usedSeasonality: true,
    trend: 'down',
    lastFlaggedMonth: 'Apr 2027',
    description: '5 trend anomalies flagged over 33 months. Severity score spikes in Nov–Dec seasonally then resets, but structural instability remains.',
  },
  {
    id: 'f2',
    domain: 'Financial',
    kpiName: 'Total_Expenditure',
    displayName: 'Total Expenditure',
    nMonths: 33,
    flagged: 6,
    avgSeverity: 1.4,
    severity: 'critical',
    usedSeasonality: true,
    trend: 'up',
    lastFlaggedMonth: 'Jul 2026',
    description: 'Highest flag count in the Financial domain (6 anomalies). Expenditure spikes correlate with workforce overtime crunch periods.',
  },
  {
    id: 'f3',
    domain: 'Project',
    kpiName: 'Anomaly_Rate',
    displayName: 'Project Anomaly Rate',
    nMonths: 26,
    flagged: 1,
    avgSeverity: 2.7,
    severity: 'critical',
    usedSeasonality: true,
    trend: 'up',
    lastFlaggedMonth: 'Jun 2026',
    description: 'Single anomaly with highest severity (2.7) in the dataset. Project anomaly rate spike in Jun 2026 indicates systemic delivery issues.',
  },
  {
    id: 'f4',
    domain: 'Project',
    kpiName: 'Anomaly_Count',
    displayName: 'Project Anomaly Count',
    nMonths: 26,
    flagged: 2,
    avgSeverity: 2.6,
    severity: 'critical',
    usedSeasonality: true,
    trend: 'stable',
    lastFlaggedMonth: 'Mar 2026',
    description: '2 flagged anomalies with very high average severity (2.6). Project execution risk is elevated in mid-2026.',
  },
  {
    id: 'f5',
    domain: 'Customer Experience',
    kpiName: 'Churn_Rate',
    displayName: 'Churn Rate',
    nMonths: 33,
    flagged: 4,
    avgSeverity: 1.6,
    severity: 'warning',
    usedSeasonality: true,
    trend: 'up',
    lastFlaggedMonth: 'Jul 2027',
    description: '4 anomalies flagged over 33 months. Churn spikes are correlated with cash flow tightening periods (r = -0.30).',
  },
  {
    id: 'f6',
    domain: 'Workforce',
    kpiName: 'Turnover_Rate',
    displayName: 'Turnover Rate',
    nMonths: 24,
    flagged: 2,
    avgSeverity: 2.1,
    severity: 'warning',
    usedSeasonality: true,
    trend: 'up',
    lastFlaggedMonth: 'Sep 2026',
    description: 'Turnover rate anomalies (severity 2.1) linked to high project spend and overtime crunch cycles.',
  },
  {
    id: 'f7',
    domain: 'Financial',
    kpiName: 'Anomaly_Rate',
    displayName: 'Financial Anomaly Rate',
    nMonths: 33,
    flagged: 3,
    avgSeverity: 1.5,
    severity: 'warning',
    usedSeasonality: true,
    trend: 'stable',
    lastFlaggedMonth: 'Mar 2026',
    description: '3 anomaly rate flags in the Financial domain. Elevated periods coincide with Q1 and Q4 reporting cycles.',
  },
  {
    id: 'f8',
    domain: 'Financial',
    kpiName: 'Total_Cash_Flow',
    displayName: 'Total Cash Flow',
    nMonths: 33,
    flagged: 5,
    avgSeverity: 1.0,
    severity: 'warning',
    usedSeasonality: true,
    trend: 'down',
    lastFlaggedMonth: 'Mar 2026',
    description: '5 cash flow anomalies flagged. Known Granger causal driver of CSAT decline (r = -0.33, p = 0.0048).',
  },
  {
    id: 'f9',
    domain: 'Project',
    kpiName: 'Delayed_Task_Rate',
    displayName: 'Delayed Task Rate',
    nMonths: 26,
    flagged: 3,
    avgSeverity: 2.3,
    severity: 'warning',
    usedSeasonality: true,
    trend: 'up',
    lastFlaggedMonth: 'May 2026',
    description: '3 anomalies at severity 2.3. Delayed task spikes correlate with high support ticket volume (r = -0.38).',
  },
  {
    id: 'f10',
    domain: 'Workforce',
    kpiName: 'Avg_Severity_Score',
    displayName: 'Workforce Severity Score',
    nMonths: 24,
    flagged: 3,
    avgSeverity: 1.9,
    severity: 'warning',
    usedSeasonality: true,
    trend: 'stable',
    lastFlaggedMonth: 'Aug 2026',
    description: '3 anomalies in workforce severity scoring. Reflects periods of high overtime and declining attendance.',
  },
  {
    id: 'f11',
    domain: 'Customer Experience',
    kpiName: 'Anomaly_Count',
    displayName: 'Customer Anomaly Count',
    nMonths: 33,
    flagged: 4,
    avgSeverity: 1.3,
    severity: 'low',
    usedSeasonality: true,
    trend: 'stable',
    lastFlaggedMonth: 'Aug 2027',
    description: '4 flagged anomalies. Customer-side event counts show seasonal patterns (Nov–Dec spikes) and a structural reset in 2026.',
  },
  {
    id: 'f12',
    domain: 'Financial',
    kpiName: 'Total_Net_Income',
    displayName: 'Total Net Income',
    nMonths: 33,
    flagged: 3,
    avgSeverity: 1.2,
    severity: 'low',
    usedSeasonality: true,
    trend: 'stable',
    lastFlaggedMonth: 'Aug 2026',
    description: '3 net income anomalies. Net income volatility is lower than revenue, suggesting cost control is partially effective.',
  },
  {
    id: 'f13',
    domain: 'Workforce',
    kpiName: 'Avg_Attendance_Rate',
    displayName: 'Avg Attendance Rate',
    nMonths: 24,
    flagged: 3,
    avgSeverity: 1.2,
    severity: 'low',
    usedSeasonality: true,
    trend: 'down',
    lastFlaggedMonth: 'Oct 2026',
    description: '3 attendance anomalies. Attendance dips are predictable leading indicators of delivery risk during high-spend months.',
  },
  {
    id: 'f14',
    domain: 'Financial',
    kpiName: 'Avg_Profit_Margin',
    displayName: 'Avg Profit Margin',
    nMonths: 33,
    flagged: 4,
    avgSeverity: 0.7,
    severity: 'low',
    usedSeasonality: true,
    trend: 'stable',
    lastFlaggedMonth: 'Jan 2026',
    description: '4 profit margin anomalies at low severity. Margin stability is high; spikes are brief and self-correcting.',
  },
];

// ── Severity Distribution by domain ─────────────────────────

export const SEVERITY_DISTRIBUTION: SeverityBucketPoint[] = [
  { domain: 'Customer Experience', critical: 2, warning: 4, low: 3, total: 9 },
  { domain: 'Financial',           critical: 1, warning: 5, low: 3, total: 9 },
  { domain: 'Project',             critical: 3, warning: 3, low: 1, total: 7 },
  { domain: 'Workforce',           critical: 0, warning: 4, low: 3, total: 7 },
];

// ── Summary stats ────────────────────────────────────────────

export const ANOMALY_SUMMARY_STATS = {
  totalFlagged: 63,
  criticalCount: 6,
  warningCount: 7,
  lowCount: 1,
  domainsAffected: 4,
  mostAffectedDomain: 'Financial' as DomainType,
  highestSeverityKpi: 'Project Anomaly Rate',
  highestSeverityScore: 2.7,
  latestAnomalyMonth: 'Sep 2027',
  avgSeverityAcrossAll: 1.3,
};

// ── Cross-Domain Findings ────────────────────────────────────

export const CROSS_DOMAIN_FINDINGS: CrossDomainFinding[] = [
  {
    id: 'cd1',
    driverDomain: 'Customer Experience',
    driverKpi: 'Avg_Response_Time',
    targetDomain: 'Project',
    targetKpi: 'Total_Budget_Spent',
    correlation: 0.61,
    pValue: 0.032,
    monthsOfData: 16,
    plainEnglish: 'Past changes in Avg Response Time help predict future changes in Project Budget Spent. As response time increases, project budget spend tends to follow.',
    alertText: null,
    recommendedAction: null,
    causalDirection: 'positive',
    strengthLabel: 'Strong',
    businessExplanation: 'When customer response times rise, it signals operational strain — teams are stretched, which drives unplanned project scope and additional budget consumption. Slower response times often lead to rework, escalations, and costly firefighting within project budgets.',
    executiveAction: 'Monitor Avg Response Time as an early budget risk indicator. Trigger a budget review when response time exceeds 55 minutes for two consecutive months.',
    riskCategory: 'Delivery Risk',
  },
  {
    id: 'cd2',
    driverDomain: 'Project',
    driverKpi: 'Avg_Budget_Variance_Pct',
    targetDomain: 'Financial',
    targetKpi: 'Avg_Profit_Margin',
    correlation: 0.55,
    pValue: 0.002,
    monthsOfData: 16,
    plainEnglish: 'Past changes in Project Budget Variance percentage help predict future changes in Financial Profit Margin. Higher variance tends to be followed by margin improvement.',
    alertText: null,
    recommendedAction: null,
    causalDirection: 'positive',
    strengthLabel: 'Strong',
    businessExplanation: 'Positive budget variance (underspend relative to budget) is a leading signal of improved financial discipline. When projects run under budget, the savings flow through to corporate margins within 1–2 quarters.',
    executiveAction: 'Reward and communicate project teams achieving positive budget variance. Set a target of +5% average budget variance to sustain margin above 80%.',
    riskCategory: 'Revenue Risk',
  },
  {
    id: 'cd3',
    driverDomain: 'Customer Experience',
    driverKpi: 'Total_Support_Tickets',
    targetDomain: 'Project',
    targetKpi: 'Total_Budget_Spent',
    correlation: 0.53,
    pValue: 0.008,
    monthsOfData: 16,
    plainEnglish: 'Higher support ticket volumes predict higher project budget spend. Customer escalation volume is an upstream signal of downstream delivery cost.',
    alertText: 'Sustained high ticket volumes are associated with budget overruns in project delivery.',
    recommendedAction: 'Reduce ticket volume by improving first-contact resolution rates and proactive customer communication.',
    causalDirection: 'positive',
    strengthLabel: 'Strong',
    businessExplanation: 'Rising support tickets signal product or service quality issues. These issues demand escalation handling, process fixes, and often drive unplanned project scope to remediate — increasing total project spend.',
    executiveAction: 'Set a support ticket threshold of 700/month as a budget-risk alert. When breached, automatically trigger a project scope and cost review.',
    riskCategory: 'Operational Risk',
  },
  {
    id: 'cd4',
    driverDomain: 'Project',
    driverKpi: 'Total_Budget_Spent',
    targetDomain: 'Workforce',
    targetKpi: 'Avg_Overtime_Hours',
    correlation: 0.50,
    pValue: 0.0018,
    monthsOfData: 22,
    plainEnglish: 'Higher project budget spend is consistently associated with more overtime hours. Spend ramps up during delivery crunch while deadlines stay fixed.',
    alertText: 'Higher budget spend is associated with more overtime hours.',
    recommendedAction: 'Add a burn rate + workload checkpoint in weekly reviews: if spend rises, require a capacity plan before overtime becomes the default.',
    causalDirection: 'positive',
    strengthLabel: 'Strong',
    businessExplanation: 'Budget spend increases during crunch periods — more contractors, scope creep, and tools are added. But headcount stays fixed, so the permanent workforce absorbs the extra load through overtime, creating a costly and unsustainable cycle.',
    executiveAction: 'Require a capacity plan when monthly project burn rate rises by more than 15% vs. baseline. Set an overtime ceiling of 10 hours/month per employee.',
    riskCategory: 'People Risk',
  },
  {
    id: 'cd5',
    driverDomain: 'Customer Experience',
    driverKpi: 'Total_Support_Tickets',
    targetDomain: 'Project',
    targetKpi: 'Avg_Budget_Variance_Pct',
    correlation: 0.54,
    pValue: 0.03,
    monthsOfData: 16,
    plainEnglish: 'Higher support ticket volumes predict greater budget variance in project portfolios. Ticket spikes are upstream signals of project budget pressure.',
    alertText: null,
    recommendedAction: null,
    causalDirection: 'positive',
    strengthLabel: 'Strong',
    businessExplanation: 'Support volume is an operational stress indicator. As tickets accumulate, internal teams must divert project resources to address quality or delivery failures — causing budget variance to widen.',
    executiveAction: 'Include support ticket trends in the monthly project portfolio review. Classify ticket-driven budget variance separately to accurately measure true project performance.',
    riskCategory: 'Delivery Risk',
  },
  {
    id: 'cd6',
    driverDomain: 'Customer Experience',
    driverKpi: 'Avg_Response_Time',
    targetDomain: 'Project',
    targetKpi: 'Avg_Budget_Variance_Pct',
    correlation: 0.49,
    pValue: 0.0003,
    monthsOfData: 16,
    plainEnglish: 'Slower customer response times predict higher budget variance in projects. Operational inefficiency in customer-facing teams spills into project cost control.',
    alertText: null,
    recommendedAction: null,
    causalDirection: 'positive',
    strengthLabel: 'Moderate',
    businessExplanation: 'High response times indicate teams are under-resourced or processes are broken. These same bottlenecks cause project delays and rework, resulting in higher-than-planned budget variance.',
    executiveAction: 'Track response time as a project governance KPI. Include it in project risk dashboards alongside budget variance to improve early warning fidelity.',
    riskCategory: 'Operational Risk',
  },
  {
    id: 'cd7',
    driverDomain: 'Project',
    driverKpi: 'Total_Budget_Spent',
    targetDomain: 'Workforce',
    targetKpi: 'Avg_Attendance_Rate',
    correlation: -0.45,
    pValue: 0.0147,
    monthsOfData: 22,
    plainEnglish: 'As project budget spend increases, workforce attendance tends to worsen. Delivery pressure phases are consistently followed by employee burnout.',
    alertText: 'As budget spend increases, attendance tends to worsen — a signal of fatigue and disengagement.',
    recommendedAction: 'Mandate recovery time after crunch phases and track attendance as an early warning signal during high-spend months.',
    causalDirection: 'negative',
    strengthLabel: 'Moderate',
    businessExplanation: 'Intense delivery periods drive fatigue, stress, and rising sick days. When attendance drops, it becomes a leading indicator of disengagement and eventual turnover — creating a compounding risk to delivery and retention.',
    executiveAction: 'Implement mandatory 2-week "recovery sprints" after each high-intensity delivery cycle. Monitor attendance weekly during all months where budget spend exceeds $120K.',
    riskCategory: 'People Risk',
  },
  {
    id: 'cd8',
    driverDomain: 'Financial',
    driverKpi: 'Total_Cash_Flow',
    targetDomain: 'Customer Experience',
    targetKpi: 'Churn_Rate',
    correlation: -0.30,
    pValue: 0.0168,
    monthsOfData: 33,
    plainEnglish: 'When cash flow is lower, customer churn tends to increase. Financial pressure causes quality and service degradation that customers notice and act on.',
    alertText: null,
    recommendedAction: null,
    causalDirection: 'negative',
    strengthLabel: 'Moderate',
    businessExplanation: 'Cash-constrained periods often trigger cost-cutting that degrades customer service: fewer agents, slower resolutions, lower product quality. Customers respond by churning, creating a revenue loss cycle that worsens cash flow further.',
    executiveAction: 'Protect customer retention budgets during low cash flow months. Define a cash flow floor below which no customer-facing cost cuts may be made.',
    riskCategory: 'Revenue Risk',
  },
  {
    id: 'cd9',
    driverDomain: 'Financial',
    driverKpi: 'Total_Cash_Flow',
    targetDomain: 'Customer Experience',
    targetKpi: 'Avg_CSAT_Score',
    correlation: -0.33,
    pValue: 0.0048,
    monthsOfData: 33,
    plainEnglish: 'When cash flow is tighter, customer satisfaction consistently drops. A likely cause is cost-cutting or delayed vendor payments reducing service capacity.',
    alertText: 'When cash flow is tighter, customer satisfaction tends to drop.',
    recommendedAction: 'Protect the customer-facing minimum service level during cash constraints and ring-fence a small budget for support and service recovery.',
    causalDirection: 'negative',
    strengthLabel: 'Moderate',
    businessExplanation: 'Cash flow decline signals financial stress that leads to reduced support staffing, longer wait times, and deferred quality investments — all of which erode CSAT. This correlation is statistically significant across 33 months of data (p = 0.0048).',
    executiveAction: 'Establish a CSAT protection fund: a reserved budget that can only be deployed when cash flow drops below $65K/month to maintain service quality.',
    riskCategory: 'Revenue Risk',
  },
  {
    id: 'cd10',
    driverDomain: 'Customer Experience',
    driverKpi: 'Total_Support_Tickets',
    targetDomain: 'Project',
    targetKpi: 'Avg_Percent_Complete',
    correlation: 0.39,
    pValue: 0.02,
    monthsOfData: 16,
    plainEnglish: 'Higher support ticket volumes are associated with higher project completion rates. Teams addressing customer issues may be accelerating delivery to resolve root causes.',
    alertText: null,
    recommendedAction: null,
    causalDirection: 'positive',
    strengthLabel: 'Moderate',
    businessExplanation: 'Counter-intuitively, ticket surges appear to motivate delivery acceleration — teams prioritize completing projects that will eliminate the root causes of escalating customer issues.',
    executiveAction: 'Use support ticket spikes as a trigger to review and prioritize customer-impacting projects. Ensure project completion rates are tracked against ticket resolution timelines.',
    riskCategory: 'Delivery Risk',
  },
  {
    id: 'cd11',
    driverDomain: 'Customer Experience',
    driverKpi: 'Total_Support_Tickets',
    targetDomain: 'Project',
    targetKpi: 'Delayed_Task_Rate',
    correlation: -0.38,
    pValue: 0.0401,
    monthsOfData: 16,
    plainEnglish: 'Higher support ticket volumes are associated with lower delayed task rates. Customer pressure appears to reduce project task delays.',
    alertText: null,
    recommendedAction: null,
    causalDirection: 'negative',
    strengthLabel: 'Moderate',
    businessExplanation: 'Customer escalation creates urgency. When support tickets are high, project teams may respond by accelerating task completion to resolve underlying product or service issues, resulting in fewer delayed tasks.',
    executiveAction: 'Leverage customer urgency as a project accelerant. Formalise a "customer escalation fast-track" protocol that elevates project tasks linked to open support tickets.',
    riskCategory: 'Operational Risk',
  },
];

// ── Top Risks ────────────────────────────────────────────────

export const TOP_RISKS: TopRisk[] = [
  {
    id: 'r1',
    rank: 1,
    title: 'Cash Flow Decline → CSAT Erosion Loop',
    domains: ['Financial', 'Customer Experience'],
    description: 'Low cash flow consistently predicts CSAT decline (r = -0.33, p = 0.005). This creates a revenue-loss feedback loop: lower cash → worse service → more churn → less revenue → lower cash.',
    urgency: 'Critical',
    linkedCorrelation: 'Financial Cash Flow → Customer CSAT (r = -0.33)',
  },
  {
    id: 'r2',
    rank: 2,
    title: 'Project Crunch → Workforce Burnout Cycle',
    domains: ['Project', 'Workforce'],
    description: 'Project budget spend is a strong predictor of overtime (r = +0.50) and attendance decline (r = -0.45). Unchecked crunch cycles lead to turnover anomalies and long-term capacity loss.',
    urgency: 'Critical',
    linkedCorrelation: 'Project Budget Spent → Workforce Overtime (r = +0.50)',
  },
  {
    id: 'r3',
    rank: 3,
    title: 'Support Volume Driving Budget Overruns',
    domains: ['Customer Experience', 'Project'],
    description: 'Support ticket volume predicts project budget spend (r = +0.53) and variance (r = +0.54). Persistent escalation volumes are causing unplanned project costs across the portfolio.',
    urgency: 'High',
    linkedCorrelation: 'Support Tickets → Project Budget Spent (r = +0.53)',
  },
  {
    id: 'r4',
    rank: 4,
    title: 'Response Time as Hidden Budget Risk',
    domains: ['Customer Experience', 'Project'],
    description: 'Avg Response Time is the strongest predictor of project budget spend (r = +0.61). Operational inefficiency in customer service is translating directly into delivery cost overruns.',
    urgency: 'High',
    linkedCorrelation: 'Avg Response Time → Project Budget Spent (r = +0.61)',
  },
  {
    id: 'r5',
    rank: 5,
    title: 'Project Budget Variance Suppressing Margins',
    domains: ['Project', 'Financial'],
    description: 'Budget variance percentage is a strong predictor of profit margin (r = +0.55). Poor project cost control is directly limiting financial performance at the corporate level.',
    urgency: 'Medium',
    linkedCorrelation: 'Budget Variance % → Profit Margin (r = +0.55)',
  },
];
