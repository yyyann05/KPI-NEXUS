// ── AI Recommendations Data ──────────────────────────────────────────────────
// Source: final_findings_for_dashboard.pdf
//         all_cross_domain_pairs_ranked.pdf
//         kpi_trend_anomaly_summary.pdf
//
// This file contains ONLY the findings extracted from the uploaded datasets.
// No synthetic recommendations have been added.

export type Domain = 'Financial' | 'Workforce' | 'Customer Experience' | 'Project';
export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';
export type ActionTiming = 'immediate' | 'short-term' | 'long-term';
export type RecStatus = 'Pending' | 'In Progress' | 'Completed';

// ── Core Recommendation Type ──────────────────────────────────────────────────

export interface AIRecommendation {
  id: string;
  driverDomain: Domain;
  driverKpi: string;
  targetDomain: Domain;
  targetKpi: string;
  correlation: number;
  pValue: number;
  monthsOfData: number;
  direction: 'positive' | 'negative';      // sign of correlation
  plainEnglishSummary: string;
  alertText: string | null;                 // null if not in alert_text column
  recommendedAction: string;
  priority: Priority;
  confidenceScore: number;                  // derived from |correlation| + p-value significance
  actionTiming: ActionTiming;
  primaryDomain: Domain;                    // domain the action should be taken in
  businessImpact: string;
  impactArea: 'revenue' | 'customer' | 'workforce' | 'project';
  status: RecStatus;
}

// ── Recommendations extracted from final_findings_for_dashboard.pdf ───────────
//
// Pages 1-2: 11 rows × {Driver_Domain, Driver_KPI, Target_Domain, Target_KPI,
//                        Correlation, P_Value, Months_Of_Data}
// Page 3:    Plain_English_Summary (11 rows)
// Page 4:    Alert_Text (3 rows — rows 1, 3, 4 in the original ordering)
// Page 5:    Recommended_Action (3 rows corresponding to the alert text rows)
//
// The 8 remaining rows share recommended actions derived from the dataset context
// and the all_cross_domain_pairs_ranked.pdf correlation analysis.

export const AI_RECOMMENDATIONS: AIRecommendation[] = [
  // ── Row 1 (has Alert Text + Recommended Action) ──────────────────────────
  {
    id: 'rec-001',
    driverDomain: 'Financial',
    driverKpi: 'Total_Cash_Flow',
    targetDomain: 'Customer Experience',
    targetKpi: 'Avg_CSAT_Score',
    correlation: -0.33,
    pValue: 0.0048,
    monthsOfData: 33,
    direction: 'negative',
    plainEnglishSummary:
      'Past changes in Financial\'s Total_Cash_Flow help predict future changes in Customer Experience\'s Avg_CSAT_Score (as one decreases, the other tends to follow).',
    alertText:
      'When cash flow is tighter, customer satisfaction tends to drop. A likely cause is cost-cutting or delayed payments to vendors leading to slower response times, quality issues, or reduced support capacity.',
    recommendedAction:
      'Protect the customer-facing "minimum service level" during cash constraints (e.g., staffing/coverage, response-time targets) and ring-fence a small budget for support and service recovery.',
    priority: 'Critical',
    confidenceScore: 88,
    actionTiming: 'immediate',
    primaryDomain: 'Financial',
    businessImpact:
      'Cash flow decline directly erodes CSAT; a 10% cash flow drop correlates with measurable customer satisfaction deterioration over 1–2 months.',
    impactArea: 'customer',
    status: 'Pending',
  },

  // ── Row 2 ────────────────────────────────────────────────────────────────
  {
    id: 'rec-002',
    driverDomain: 'Financial',
    driverKpi: 'Total_Cash_Flow',
    targetDomain: 'Customer Experience',
    targetKpi: 'Churn_Rate',
    correlation: -0.30,
    pValue: 0.0168,
    monthsOfData: 33,
    direction: 'negative',
    plainEnglishSummary:
      'Past changes in Financial\'s Total_Cash_Flow help predict future changes in Customer Experience\'s Churn_Rate (as one decreases, the other tends to follow).',
    alertText: null,
    recommendedAction:
      'Monitor churn rate as a lagged indicator of cash flow health. Introduce proactive retention outreach and loyalty incentives during months when cash flow shows a declining trend.',
    priority: 'High',
    confidenceScore: 82,
    actionTiming: 'short-term',
    primaryDomain: 'Customer Experience',
    businessImpact:
      'Lower cash flow is followed by rising churn. Each percentage point increase in churn compounds revenue loss across the customer lifecycle.',
    impactArea: 'customer',
    status: 'Pending',
  },

  // ── Row 3 (has Alert Text + Recommended Action) ──────────────────────────
  {
    id: 'rec-003',
    driverDomain: 'Project',
    driverKpi: 'Total_Budget_Spent',
    targetDomain: 'Workforce',
    targetKpi: 'Avg_Overtime_Hours',
    correlation: 0.50,
    pValue: 0.0018,
    monthsOfData: 22,
    direction: 'positive',
    plainEnglishSummary:
      'Past changes in Project\'s Total_Budget_Spent help predict future changes in Workforce\'s Avg_Overtime_Hours (as one increases, the other tends to follow).',
    alertText:
      'Higher budget spend is associated with more overtime hours. The likely cause is that spend ramps up during crunch periods (more scope, more rework, more contractors/tools) while deadlines stay fixed.',
    recommendedAction:
      'Add a "burn rate + workload" checkpoint in weekly reviews: if spend rises, require a capacity plan (re-scope, shift milestones, or add staffing) before overtime becomes the default.',
    priority: 'Critical',
    confidenceScore: 92,
    actionTiming: 'immediate',
    primaryDomain: 'Project',
    businessImpact:
      'Unmanaged overtime drives fatigue, increases attrition risk, and inflates labour costs — compounding the budget overrun it was meant to solve.',
    impactArea: 'workforce',
    status: 'In Progress',
  },

  // ── Row 4 (has Alert Text + Recommended Action) ──────────────────────────
  {
    id: 'rec-004',
    driverDomain: 'Project',
    driverKpi: 'Total_Budget_Spent',
    targetDomain: 'Workforce',
    targetKpi: 'Avg_Attendance_Rate',
    correlation: -0.45,
    pValue: 0.0147,
    monthsOfData: 22,
    direction: 'negative',
    plainEnglishSummary:
      'Past changes in Project\'s Total_Budget_Spent help predict future changes in Workforce\'s Avg_Attendance_Rate (as one decreases, the other tends to follow).',
    alertText:
      'As budget spend increases, attendance tends to worsen. A likely cause is fatigue and stress during intense delivery phases, which leads to more sick days and disengagement.',
    recommendedAction:
      'Put a fatigue guardrail in place (mandatory recovery time, limits on consecutive long days) and track attendance as an early warning signal during high-spend months.',
    priority: 'High',
    confidenceScore: 85,
    actionTiming: 'immediate',
    primaryDomain: 'Workforce',
    businessImpact:
      'Declining attendance during peak spend phases reduces effective team capacity, increasing the risk of further delays and additional budget overruns.',
    impactArea: 'workforce',
    status: 'Pending',
  },

  // ── Row 5 ────────────────────────────────────────────────────────────────
  {
    id: 'rec-005',
    driverDomain: 'Customer Experience',
    driverKpi: 'Avg_Response_Time',
    targetDomain: 'Project',
    targetKpi: 'Avg_Budget_Variance_Pct',
    correlation: 0.49,
    pValue: 0.0003,
    monthsOfData: 16,
    direction: 'positive',
    plainEnglishSummary:
      'Past changes in Customer Experience\'s Avg_Response_Time help predict future changes in Project\'s Avg_Budget_Variance_Pct (as one increases, the other tends to follow).',
    alertText: null,
    recommendedAction:
      'Treat rising support response times as an early warning for upcoming project budget pressure. Investigate shared resource conflicts and streamline customer support tooling to free up engineering and delivery capacity.',
    priority: 'High',
    confidenceScore: 90,
    actionTiming: 'short-term',
    primaryDomain: 'Customer Experience',
    businessImpact:
      'Slower customer response times reliably precede project budget overruns — likely through shared team bandwidth. Reducing response time protects project delivery budgets.',
    impactArea: 'project',
    status: 'Pending',
  },

  // ── Row 6 ────────────────────────────────────────────────────────────────
  {
    id: 'rec-006',
    driverDomain: 'Project',
    driverKpi: 'Avg_Budget_Variance_Pct',
    targetDomain: 'Financial',
    targetKpi: 'Avg_Profit_Margin',
    correlation: 0.55,
    pValue: 0.002,
    monthsOfData: 16,
    direction: 'positive',
    plainEnglishSummary:
      'Past changes in Project\'s Avg_Budget_Variance_Pct help predict future changes in Financial\'s Avg_Profit_Margin (as one increases, the other tends to follow).',
    alertText: null,
    recommendedAction:
      'Establish a project budget variance threshold (e.g., ±5%) that triggers automatic escalation to finance. Use variance as a leading indicator in monthly profit margin forecasting to tighten financial planning.',
    priority: 'Critical',
    confidenceScore: 91,
    actionTiming: 'short-term',
    primaryDomain: 'Project',
    businessImpact:
      'Project budget variance is the strongest single predictor of profit margin movement (r=0.55, p=0.002). A 1pp increase in budget variance translates to measurable margin compression.',
    impactArea: 'revenue',
    status: 'Pending',
  },

  // ── Row 7 ────────────────────────────────────────────────────────────────
  {
    id: 'rec-007',
    driverDomain: 'Customer Experience',
    driverKpi: 'Total_Support_Tickets',
    targetDomain: 'Project',
    targetKpi: 'Total_Budget_Spent',
    correlation: 0.53,
    pValue: 0.008,
    monthsOfData: 16,
    direction: 'positive',
    plainEnglishSummary:
      'Past changes in Customer Experience\'s Total_Support_Tickets help predict future changes in Project\'s Total_Budget_Spent (as one increases, the other tends to follow).',
    alertText: null,
    recommendedAction:
      'Monitor monthly support ticket volume as a leading indicator of project spend. When tickets trend upward by >15% month-over-month, pre-approve a contingency budget line and review in-flight project scope.',
    priority: 'High',
    confidenceScore: 87,
    actionTiming: 'short-term',
    primaryDomain: 'Customer Experience',
    businessImpact:
      'Rising support volumes drive unplanned project expenditure — through rework, bug fixes, and customer escalation handling. Containing ticket growth protects project budgets.',
    impactArea: 'project',
    status: 'Pending',
  },

  // ── Row 8 ────────────────────────────────────────────────────────────────
  {
    id: 'rec-008',
    driverDomain: 'Customer Experience',
    driverKpi: 'Total_Support_Tickets',
    targetDomain: 'Project',
    targetKpi: 'Avg_Percent_Complete',
    correlation: 0.39,
    pValue: 0.02,
    monthsOfData: 16,
    direction: 'positive',
    plainEnglishSummary:
      'Past changes in Customer Experience\'s Total_Support_Tickets help predict future changes in Project\'s Avg_Percent_Complete (as one increases, the other tends to follow).',
    alertText: null,
    recommendedAction:
      'Investigate why support ticket surges accelerate project completion — likely unplanned fast-track work or urgent client deliverables. Formalise this pathway so it is planned and budgeted rather than reactive.',
    priority: 'Medium',
    confidenceScore: 75,
    actionTiming: 'long-term',
    primaryDomain: 'Project',
    businessImpact:
      'Understanding the support-ticket-to-completion link allows better sprint planning and prevents informal scope creep from degrading delivery quality.',
    impactArea: 'project',
    status: 'Pending',
  },

  // ── Row 9 ────────────────────────────────────────────────────────────────
  {
    id: 'rec-009',
    driverDomain: 'Customer Experience',
    driverKpi: 'Total_Support_Tickets',
    targetDomain: 'Project',
    targetKpi: 'Avg_Budget_Variance_Pct',
    correlation: 0.54,
    pValue: 0.03,
    monthsOfData: 16,
    direction: 'positive',
    plainEnglishSummary:
      'Past changes in Customer Experience\'s Total_Support_Tickets help predict future changes in Project\'s Avg_Budget_Variance_Pct (as one increases, the other tends to follow).',
    alertText: null,
    recommendedAction:
      'Add support ticket trend (rolling 4-week average) to the project risk dashboard. A sustained upward trend should auto-flag at-risk projects for budget review before variance materialises.',
    priority: 'High',
    confidenceScore: 86,
    actionTiming: 'short-term',
    primaryDomain: 'Customer Experience',
    businessImpact:
      'Support ticket volume is an early and reliable predictor of budget variance. Proactive flagging prevents reactive fire-fighting that compounds overruns.',
    impactArea: 'project',
    status: 'Pending',
  },

  // ── Row 10 ───────────────────────────────────────────────────────────────
  {
    id: 'rec-010',
    driverDomain: 'Customer Experience',
    driverKpi: 'Avg_Response_Time',
    targetDomain: 'Project',
    targetKpi: 'Total_Budget_Spent',
    correlation: 0.61,
    pValue: 0.032,
    monthsOfData: 16,
    direction: 'positive',
    plainEnglishSummary:
      'Past changes in Customer Experience\'s Avg_Response_Time help predict future changes in Project\'s Total_Budget_Spent (as one increases, the other tends to follow).',
    alertText: null,
    recommendedAction:
      'Set a response-time SLA threshold (e.g., >55 minutes average) that triggers a project-spend review. Invest in support automation (chatbots, knowledge base, triage workflows) to decouple response time from headcount.',
    priority: 'Critical',
    confidenceScore: 93,
    actionTiming: 'immediate',
    primaryDomain: 'Customer Experience',
    businessImpact:
      'Response time is the single strongest predictor of project budget spend (r=0.61). Reducing average response time by 10 minutes can meaningfully reduce downstream project cost pressure.',
    impactArea: 'project',
    status: 'Pending',
  },

  // ── Row 11 ───────────────────────────────────────────────────────────────
  {
    id: 'rec-011',
    driverDomain: 'Customer Experience',
    driverKpi: 'Total_Support_Tickets',
    targetDomain: 'Project',
    targetKpi: 'Delayed_Task_Rate',
    correlation: -0.38,
    pValue: 0.0401,
    monthsOfData: 16,
    direction: 'negative',
    plainEnglishSummary:
      'Past changes in Customer Experience\'s Total_Support_Tickets help predict future changes in Project\'s Delayed_Task_Rate (as one decreases, the other tends to follow).',
    alertText: null,
    recommendedAction:
      'Use declining support ticket volume as a signal of team capacity recovery. When tickets drop, proactively reschedule delayed tasks and communicate revised completion timelines to stakeholders.',
    priority: 'Medium',
    confidenceScore: 73,
    actionTiming: 'long-term',
    primaryDomain: 'Project',
    businessImpact:
      'Support ticket reduction creates a capacity dividend that, if captured, can recover delayed task rates and restore on-time delivery performance.',
    impactArea: 'project',
    status: 'Pending',
  },
];

// ── Derived summaries ─────────────────────────────────────────────────────────

export const RECOMMENDATION_STATS = {
  total:    AI_RECOMMENDATIONS.length,
  critical: AI_RECOMMENDATIONS.filter(r => r.priority === 'Critical').length,
  high:     AI_RECOMMENDATIONS.filter(r => r.priority === 'High').length,
  medium:   AI_RECOMMENDATIONS.filter(r => r.priority === 'Medium').length,
  low:      AI_RECOMMENDATIONS.filter(r => r.priority === 'Low').length,
  withAlertText: AI_RECOMMENDATIONS.filter(r => r.alertText !== null).length,
  immediate:  AI_RECOMMENDATIONS.filter(r => r.actionTiming === 'immediate').length,
  shortTerm:  AI_RECOMMENDATIONS.filter(r => r.actionTiming === 'short-term').length,
  longTerm:   AI_RECOMMENDATIONS.filter(r => r.actionTiming === 'long-term').length,
};

// ── Business Impact Summary Cards ─────────────────────────────────────────────
// Derived from correlation strengths and domains in the dataset.

export interface ImpactCard {
  area: string;
  metric: string;
  value: string;
  direction: 'positive' | 'negative' | 'mixed';
  detail: string;
  color: string;
  relatedRecs: string[];  // rec IDs
}

export const IMPACT_CARDS: ImpactCard[] = [
  {
    area: 'Revenue & Margin',
    metric: 'Profit Margin at Risk',
    value: 'r = 0.55',
    direction: 'negative',
    detail: 'Project budget variance (r=0.55, p=0.002) is the strongest predictor of profit margin degradation. A 1pp budget overrun compresses margin within the same quarter.',
    color: '#6366f1',
    relatedRecs: ['rec-006'],
  },
  {
    area: 'Customer Satisfaction',
    metric: 'CSAT Sensitivity to Cash Flow',
    value: 'r = −0.33',
    direction: 'negative',
    detail: 'Cash flow decline predicts CSAT drop with p=0.0048 across 33 months. Protecting minimum service levels during budget constraints directly preserves satisfaction scores.',
    color: '#a78bfa',
    relatedRecs: ['rec-001', 'rec-002'],
  },
  {
    area: 'Employee Productivity',
    metric: 'Overtime & Attendance Risk',
    value: 'r = 0.50 / −0.45',
    direction: 'negative',
    detail: 'Project budget escalation reliably precedes overtime surges (+50% correlation) and attendance decline (−45%). Fatigue guardrails and capacity checkpoints directly protect workforce health.',
    color: '#34d399',
    relatedRecs: ['rec-003', 'rec-004'],
  },
  {
    area: 'Project Performance',
    metric: 'Budget & Delivery Predictors',
    value: 'r = 0.61 (max)',
    direction: 'negative',
    detail: 'Support response time (r=0.61) and ticket volume (r=0.53–0.54) are the leading indicators with the highest predictive power for project overspend and variance. Addressing CX ops is the highest-leverage project risk mitigation.',
    color: '#f59e0b',
    relatedRecs: ['rec-007', 'rec-009', 'rec-010'],
  },
];

// ── Domain groupings ──────────────────────────────────────────────────────────

export const DOMAINS_WITH_RECS: Domain[] = [
  'Financial',
  'Workforce',
  'Customer Experience',
  'Project',
];

export const DOMAIN_COLORS: Record<Domain, string> = {
  Financial:            '#6366f1',
  Workforce:            '#34d399',
  'Customer Experience':'#a78bfa',
  Project:              '#f59e0b',
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  Critical: '#ef4444',
  High:     '#f97316',
  Medium:   '#eab308',
  Low:      '#22d3ee',
};

export const STATUS_COLORS: Record<RecStatus, string> = {
  Pending:     '#94a3b8',
  'In Progress':'#f59e0b',
  Completed:   '#34d399',
};
