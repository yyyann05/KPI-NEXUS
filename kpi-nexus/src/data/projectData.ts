// ── Project KPI Data ──────────────────────────────────────────────────────────
// Source: unified_kpi_dataset_with_anomalies.csv
// Coverage: Mar 2024 – Mar 2027 (37 months)

export interface ProjectMonthly {
  month: string;
  completionRate: number;       // Avg_Percent_Complete (%)
  budgetVariancePct: number;    // Avg_Budget_Variance_Pct (%)
  delayedTaskRate: number;      // Delayed_Task_Rate (0–1 ratio)
  totalBudgetSpent: number;     // Total_Budget_Spent ($)
  severityScore: number;        // Avg_Severity_Score
  anomalyCount: number;         // Anomaly_Count
  anomalyRate: number;          // Anomaly_Rate
}

export interface ProjectForecastPoint {
  month: string;
  actual?: number;
  forecast: number;
  lower: number;
  upper: number;
}

export interface ProjectAnomalyEvent {
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

// ── 37 months of raw monthly data (Mar 2024 – Mar 2027) ──────────────────────
export const PROJECT_MONTHLY: ProjectMonthly[] = [
  { month:'Mar 2024', completionRate:100.0,  budgetVariancePct:0.952,    delayedTaskRate:0.000, totalBudgetSpent:215082,   severityScore:22.92,  anomalyCount:0, anomalyRate:0.000 },
  { month:'Apr 2024', completionRate:100.0,  budgetVariancePct:3.906,    delayedTaskRate:0.000, totalBudgetSpent:658511,   severityScore:33.96,  anomalyCount:1, anomalyRate:0.083 },
  { month:'May 2024', completionRate:100.0,  budgetVariancePct:1.376,    delayedTaskRate:0.000, totalBudgetSpent:135646,   severityScore:44.87,  anomalyCount:0, anomalyRate:0.000 },
  { month:'Jun 2024', completionRate:100.0,  budgetVariancePct:2.650,    delayedTaskRate:0.000, totalBudgetSpent:626010,   severityScore:40.74,  anomalyCount:0, anomalyRate:0.000 },
  { month:'Jul 2024', completionRate:100.0,  budgetVariancePct:5.996,    delayedTaskRate:0.000, totalBudgetSpent:427252,   severityScore:44.01,  anomalyCount:0, anomalyRate:0.000 },
  { month:'Aug 2024', completionRate:100.0,  budgetVariancePct:4.975,    delayedTaskRate:0.000, totalBudgetSpent:446961,   severityScore:23.41,  anomalyCount:0, anomalyRate:0.000 },
  { month:'Sep 2024', completionRate:99.98,  budgetVariancePct:7.370,    delayedTaskRate:0.000, totalBudgetSpent:894625,   severityScore:49.42,  anomalyCount:2, anomalyRate:0.087 },
  { month:'Oct 2024', completionRate:100.0,  budgetVariancePct:3.708,    delayedTaskRate:0.000, totalBudgetSpent:439297,   severityScore:62.03,  anomalyCount:0, anomalyRate:0.000 },
  { month:'Nov 2024', completionRate:100.0,  budgetVariancePct:2.138,    delayedTaskRate:0.000, totalBudgetSpent:469375,   severityScore:61.24,  anomalyCount:0, anomalyRate:0.000 },
  { month:'Dec 2024', completionRate:100.0,  budgetVariancePct:-0.170,   delayedTaskRate:0.000, totalBudgetSpent:460964,   severityScore:44.39,  anomalyCount:0, anomalyRate:0.000 },
  { month:'Jan 2025', completionRate:100.0,  budgetVariancePct:0.836,    delayedTaskRate:0.000, totalBudgetSpent:559589,   severityScore:42.07,  anomalyCount:0, anomalyRate:0.000 },
  { month:'Feb 2025', completionRate:100.0,  budgetVariancePct:-3.274,   delayedTaskRate:0.000, totalBudgetSpent:90510,    severityScore:37.77,  anomalyCount:0, anomalyRate:0.000 },
  { month:'Mar 2025', completionRate:100.0,  budgetVariancePct:3.903,    delayedTaskRate:0.000, totalBudgetSpent:103661,   severityScore:44.57,  anomalyCount:0, anomalyRate:0.000 },
  { month:'Apr 2025', completionRate:100.0,  budgetVariancePct:-0.570,   delayedTaskRate:0.000, totalBudgetSpent:137395,   severityScore:58.64,  anomalyCount:0, anomalyRate:0.000 },
  { month:'May 2025', completionRate:100.0,  budgetVariancePct:1.966,    delayedTaskRate:0.000, totalBudgetSpent:190097,   severityScore:38.93,  anomalyCount:0, anomalyRate:0.000 },
  { month:'Jun 2025', completionRate:92.52,  budgetVariancePct:7.423,    delayedTaskRate:0.077, totalBudgetSpent:232066,   severityScore:48.72,  anomalyCount:1, anomalyRate:0.077 },
  { month:'Jul 2025', completionRate:100.0,  budgetVariancePct:0.742,    delayedTaskRate:0.000, totalBudgetSpent:142228,   severityScore:51.82,  anomalyCount:0, anomalyRate:0.000 },
  { month:'Aug 2025', completionRate:100.0,  budgetVariancePct:2.784,    delayedTaskRate:0.000, totalBudgetSpent:285665,   severityScore:27.53,  anomalyCount:0, anomalyRate:0.000 },
  { month:'Sep 2025', completionRate:100.0,  budgetVariancePct:3.964,    delayedTaskRate:0.000, totalBudgetSpent:773810,   severityScore:44.16,  anomalyCount:0, anomalyRate:0.000 },
  { month:'Oct 2025', completionRate:100.0,  budgetVariancePct:10.637,   delayedTaskRate:0.000, totalBudgetSpent:995342,   severityScore:34.16,  anomalyCount:1, anomalyRate:0.053 },
  { month:'Nov 2025', completionRate:100.0,  budgetVariancePct:5.078,    delayedTaskRate:0.000, totalBudgetSpent:779394,   severityScore:44.88,  anomalyCount:0, anomalyRate:0.000 },
  { month:'Dec 2025', completionRate:78.26,  budgetVariancePct:8.157,    delayedTaskRate:0.172, totalBudgetSpent:1908897,  severityScore:68.75,  anomalyCount:4, anomalyRate:0.138 },
  { month:'Jan 2026', completionRate:1.37,   budgetVariancePct:-78.148,  delayedTaskRate:0.750, totalBudgetSpent:71302,    severityScore:90.95,  anomalyCount:1, anomalyRate:0.083 },
  { month:'Feb 2026', completionRate:2.59,   budgetVariancePct:-97.364,  delayedTaskRate:0.545, totalBudgetSpent:6337,     severityScore:88.23,  anomalyCount:0, anomalyRate:0.000 },
  { month:'Mar 2026', completionRate:0.00,   budgetVariancePct:-100.000, delayedTaskRate:1.000, totalBudgetSpent:0,        severityScore:87.05,  anomalyCount:0, anomalyRate:0.000 },
  { month:'Apr 2026', completionRate:96.70,  budgetVariancePct:-95.485,  delayedTaskRate:0.000, totalBudgetSpent:556,      severityScore:97.20,  anomalyCount:1, anomalyRate:1.000 },
  // ── 2026 continued ────────────────────────────────────────────────────────
  { month:'May 2026', completionRate:100.00, budgetVariancePct:1.11,     delayedTaskRate:0.000, totalBudgetSpent:1765,     severityScore:0.00,   anomalyCount:0, anomalyRate:0.000 },
  { month:'Jun 2026', completionRate:91.90,  budgetVariancePct:-28.95,   delayedTaskRate:0.083, totalBudgetSpent:197745,   severityScore:48.80,  anomalyCount:5, anomalyRate:0.025 },
  { month:'Jul 2026', completionRate:100.00, budgetVariancePct:5.58,     delayedTaskRate:0.000, totalBudgetSpent:1565,     severityScore:0.00,   anomalyCount:0, anomalyRate:0.000 },
  { month:'Aug 2026', completionRate:100.00, budgetVariancePct:4.15,     delayedTaskRate:0.000, totalBudgetSpent:2088,     severityScore:0.00,   anomalyCount:0, anomalyRate:0.000 },
  { month:'Sep 2026', completionRate:100.00, budgetVariancePct:4.82,     delayedTaskRate:0.000, totalBudgetSpent:1812,     severityScore:0.00,   anomalyCount:0, anomalyRate:0.000 },
  { month:'Oct 2026', completionRate:100.00, budgetVariancePct:7.01,     delayedTaskRate:0.000, totalBudgetSpent:2212,     severityScore:0.00,   anomalyCount:0, anomalyRate:0.000 },
  { month:'Nov 2026', completionRate:100.00, budgetVariancePct:7.01,     delayedTaskRate:0.000, totalBudgetSpent:2212,     severityScore:0.00,   anomalyCount:0, anomalyRate:0.000 },
  { month:'Dec 2026', completionRate:96.70,  budgetVariancePct:-9.03,    delayedTaskRate:0.000, totalBudgetSpent:1938949,  severityScore:41.50,  anomalyCount:2, anomalyRate:0.016 },
  // ── 2027 ──────────────────────────────────────────────────────────────────
  { month:'Jan 2027', completionRate:93.60,  budgetVariancePct:9.96,     delayedTaskRate:0.067, totalBudgetSpent:188,      severityScore:33.80,  anomalyCount:2, anomalyRate:0.029 },
  { month:'Feb 2027', completionRate:100.00, budgetVariancePct:12.46,    delayedTaskRate:0.000, totalBudgetSpent:1320,     severityScore:0.00,   anomalyCount:0, anomalyRate:0.000 },
  { month:'Mar 2027', completionRate:98.35,  budgetVariancePct:-46.036,  delayedTaskRate:0.000, totalBudgetSpent:1148,     severityScore:60.40,  anomalyCount:3, anomalyRate:0.033 },
];

// ── Prophet Forecast — Completion Rate ───────────────────────────────────────
export const COMPLETION_FORECAST: ProjectForecastPoint[] = [
  { month:'Sep 2025', actual:100.0, forecast:99.8,  lower:97.5,  upper:100.0 },
  { month:'Oct 2025', actual:100.0, forecast:99.5,  lower:97.0,  upper:100.0 },
  { month:'Nov 2025', actual:100.0, forecast:99.2,  lower:96.5,  upper:100.0 },
  { month:'Dec 2025', actual:78.26, forecast:98.5,  lower:95.0,  upper:100.0 },
  { month:'Jan 2026', actual:1.37,  forecast:92.0,  lower:82.0,  upper:100.0 },
  { month:'Feb 2026', actual:2.59,  forecast:75.0,  lower:60.0,  upper:90.0  },
  { month:'Mar 2026', actual:0.00,  forecast:65.0,  lower:48.0,  upper:82.0  },
  { month:'Apr 2026', actual:96.70,  forecast:72.0,  lower:55.0,  upper:89.0  },
  { month:'May 2026', actual:100.00, forecast:85.0,  lower:68.0,  upper:100.0 },
  { month:'Jun 2026', actual:91.90,  forecast:90.0,  lower:74.0,  upper:100.0 },
  { month:'Jul 2026', actual:100.00, forecast:93.5,  lower:78.0,  upper:100.0 },
  { month:'Aug 2026', actual:100.00, forecast:95.8,  lower:81.0,  upper:100.0 },
  { month:'Sep 2026', actual:100.00, forecast:97.2,  lower:83.5,  upper:100.0 },
  { month:'Oct 2026', actual:100.00, forecast:98.5,  lower:85.0,  upper:100.0 },
  { month:'Nov 2026', actual:100.00, forecast:99.0,  lower:86.5,  upper:100.0 },
  { month:'Dec 2026', actual:96.70,  forecast:99.0,  lower:86.5,  upper:100.0 },
  { month:'Jan 2027', actual:93.60,  forecast:98.5,  lower:85.0,  upper:100.0 },
  { month:'Feb 2027', actual:100.00, forecast:99.0,  lower:86.5,  upper:100.0 },
  { month:'Mar 2027', actual:98.35,  forecast:98.8,  lower:85.5,  upper:100.0 },
  { month:'Apr 2027', forecast:99.0,  lower:86.0,  upper:100.0 },
  { month:'May 2027', forecast:99.2,  lower:86.5,  upper:100.0 },
  { month:'Jun 2027', forecast:99.3,  lower:87.0,  upper:100.0 },
];

// ── Prophet Forecast — Budget Variance % ─────────────────────────────────────
export const BUDGET_VARIANCE_FORECAST: ProjectForecastPoint[] = [
  { month:'Sep 2025', actual:3.96,   forecast:4.2,   lower:1.5,   upper:6.9  },
  { month:'Oct 2025', actual:10.64,  forecast:5.1,   lower:2.0,   upper:8.2  },
  { month:'Nov 2025', actual:5.08,   forecast:5.5,   lower:2.4,   upper:8.6  },
  { month:'Dec 2025', actual:8.16,   forecast:6.0,   lower:2.8,   upper:9.2  },
  { month:'Jan 2026', actual:-78.15, forecast:5.8,   lower:2.0,   upper:9.6  },
  { month:'Feb 2026', actual:-97.36, forecast:4.5,   lower:0.5,   upper:8.5  },
  { month:'Mar 2026', actual:-100.0, forecast:3.8,   lower:-0.2,  upper:7.8  },
  { month:'Apr 2026', actual:-95.49, forecast:4.2,   lower:0.5,   upper:7.9  },
  { month:'May 2026', actual:1.11,   forecast:4.5,   lower:0.8,   upper:8.2  },
  { month:'Jun 2026', actual:-28.95, forecast:4.0,   lower:0.4,   upper:7.6  },
  { month:'Jul 2026', actual:5.58,   forecast:3.8,   lower:0.2,   upper:7.4  },
  { month:'Aug 2026', actual:4.15,   forecast:3.5,   lower:0.0,   upper:7.0  },
  { month:'Sep 2026', actual:4.82,   forecast:3.2,   lower:-0.3,  upper:6.7  },
  { month:'Oct 2026', actual:7.01,   forecast:3.0,   lower:-0.5,  upper:6.5  },
  { month:'Nov 2026', actual:7.01,   forecast:3.2,   lower:-0.3,  upper:6.7  },
  { month:'Dec 2026', actual:-9.03,  forecast:3.5,   lower:0.0,   upper:7.0  },
  { month:'Jan 2027', actual:9.96,   forecast:3.8,   lower:0.2,   upper:7.4  },
  { month:'Feb 2027', actual:12.46,  forecast:4.0,   lower:0.4,   upper:7.6  },
  { month:'Mar 2027', actual:-46.04, forecast:4.2,   lower:0.5,   upper:7.9  },
  { month:'Apr 2027', forecast:4.5,   lower:0.8,   upper:8.2  },
  { month:'May 2027', forecast:4.0,   lower:0.4,   upper:7.6  },
  { month:'Jun 2027', forecast:3.8,   lower:0.2,   upper:7.4  },
];

// ── Anomaly Events ────────────────────────────────────────────────────────────
export const PROJECT_ANOMALY_EVENTS: ProjectAnomalyEvent[] = [
  {
    id: 'proj-001',
    date: 'Jan 2026',
    kpi: 'Avg Completion Rate',
    value: '1.37%',
    expected: '~99%',
    deviation: '-98.6%',
    severity: 'critical',
    impact: 'Completion rate collapsed from 100% to 1.37% in a single month. Combined with a 75% delayed task rate and a severity score hitting 90.95 (highest prior to Apr 2026), this indicates a near-total project execution breakdown — likely a portfolio restructuring, mass re-prioritisation, or system data reset.',
    recommendation: 'Conduct immediate post-incident review. Determine if collapse was a measurement artefact or genuine delivery failure. Establish project health dashboard alerting when completion falls below 80% MoM.',
  },
  {
    id: 'proj-002',
    date: 'Feb 2026',
    kpi: 'Avg Budget Variance %',
    value: '-97.4%',
    expected: '~3–5%',
    deviation: '-102%',
    severity: 'critical',
    impact: 'Budget variance swung to -97.4% — meaning projects consumed far less budget than allocated. Combined with near-zero completion (2.59%) and 54.5% delayed tasks, this points to a full work stoppage rather than under-spend efficiency. Budget burn of only $6,337 vs prior months averaging $400K+.',
    recommendation: 'Review project portfolio status for Feb 2026. Confirm whether projects were paused, cancelled, or migrated. Restate budget baseline for all active projects and re-forecast spend trajectory.',
  },
  {
    id: 'proj-003',
    date: 'Mar 2026',
    kpi: 'Delayed Task Rate',
    value: '100%',
    expected: '< 5%',
    deviation: '+100%',
    severity: 'critical',
    impact: 'Every tracked task in March 2026 was delayed — a 100% delayed task rate is an unprecedented dataset maximum. Zero budget was spent ($0) and completion rate was 0.0%. This confirms a complete operational stall for the entire project portfolio in this month.',
    recommendation: 'Investigate root cause of Mar 2026 full stoppage. Review dependency blockers, resource availability, and any organisational changes occurring in Q1 2026. Implement real-time delayed task rate alerting with a 15% threshold.',
  },
  {
    id: 'proj-004',
    date: 'Apr 2026',
    kpi: 'Avg Severity Score',
    value: '97.2',
    expected: '~45',
    deviation: '+116%',
    severity: 'critical',
    impact: 'Severity score reached 97.2 — dataset maximum — in Apr 2026, despite completion rate recovering to 96.7%. Budget variance remains deeply negative (-95.5%) and anomaly rate hit 100%. Indicates persistent systemic instability even as surface-level completion recovered.',
    recommendation: 'Do not treat Apr 2026 completion recovery as normalisation. Root cause of severity score elevation must be identified and resolved. Monitor Q2 2026 closely with weekly project health checks.',
  },
  {
    id: 'proj-005',
    date: 'Dec 2025',
    kpi: 'Total Budget Spent',
    value: '$1,908,897',
    expected: '~$450K',
    deviation: '+325%',
    severity: 'critical',
    impact: 'Budget spend in Dec 2025 was 4.3x the 12-month average — the single highest monthly spend in the dataset. Concurrent anomaly count peaked at 4 and severity jumped to 68.75. Completion rate dropped to 78.26% for the first time since dataset inception, suggesting a chaotic year-end delivery crunch.',
    recommendation: 'Review Dec 2025 project portfolio for gold-plating or scope creep. Enforce budget freeze for year-end projects unless explicitly approved. Implement quarterly budget velocity reviews.',
  },
  {
    id: 'proj-006',
    date: 'Oct 2025',
    kpi: 'Avg Budget Variance %',
    value: '10.64%',
    expected: '< 5%',
    deviation: '+113%',
    severity: 'warning',
    impact: 'Budget variance hit 10.6% in Oct 2025 — the highest positive variance in the dataset and double the typical range. This precedes the Dec 2025 spend explosion and completion collapse, suggesting the over-run pattern began in Q4 2025.',
    recommendation: 'Flag projects with budget variance > 7% for immediate review. Introduce mid-quarter budget checkpoints to catch variance before it escalates.',
  },
  {
    id: 'proj-007',
    date: 'Jun 2025',
    kpi: 'Avg Completion Rate',
    value: '92.52%',
    expected: '100%',
    deviation: '-7.5%',
    severity: 'warning',
    impact: 'First completion rate below 100% in 2025 (and the only dip prior to Dec 2025). Concurrent delayed task rate of 7.7% and budget variance at 7.4% suggest early-stage delivery pressure emerging in mid-2025 — a precursor to later Q4 degradation.',
    recommendation: 'Treat Jun 2025 dip as an early warning signal. Review whether the projects that slipped in June recovered on schedule or became the Dec 2025 problem projects.',
  },
  {
    id: 'proj-008',
    date: 'Sep 2024',
    kpi: 'Avg Budget Variance %',
    value: '7.37%',
    expected: '< 5%',
    deviation: '+47%',
    severity: 'warning',
    impact: 'Sep 2024 was the first month to exceed 7% budget variance, alongside the highest budget spend month of H2 2024 ($894K) and first anomaly cluster (2 events). Anomaly rate of 8.7% was the first elevated signal in the dataset.',
    recommendation: 'Retrospect Q3 2024 budget drivers. Confirm that Sep 2024 over-run was accounted for in Q4 planning.',
  },
  {
    id: 'proj-009',
    date: 'Dec 2025',
    kpi: 'Avg Completion Rate',
    value: '78.26%',
    expected: '~100%',
    deviation: '-21.7%',
    severity: 'warning',
    impact: 'The Dec 2025 completion rate drop to 78.26% is the clearest leading indicator of the Q1 2026 collapse. In hindsight, this was the moment the portfolio entered a stress regime that continued for 3+ months.',
    recommendation: 'Set completion rate early warning threshold at 90%. If any month falls below this, trigger a cross-functional project review within 5 business days.',
  },
  {
    id: 'proj-010',
    date: 'Oct 2024',
    kpi: 'Avg Severity Score',
    value: '62.03',
    expected: '~40',
    deviation: '+55%',
    severity: 'low',
    impact: 'Severity score elevated in Oct–Nov 2024 (62.0 and 61.2 respectively) despite 100% completion rates and zero anomalies. Suggests underlying quality or risk signals not yet surfacing as execution failures.',
    recommendation: 'Investigate what is driving elevated severity score during otherwise healthy execution periods. Ensure severity scoring model captures leading-indicator risk factors.',
  },
  {
    id: 'proj-011',
    date: 'Jun 2026',
    kpi: 'Delayed Task Rate',
    value: '8.3%',
    expected: '< 5%',
    deviation: '+66%',
    severity: 'warning',
    impact: 'Delayed task rate returned to 8.3% in Jun 2026 after Q1 2026 recovery, with budget variance swinging to -28.95%. Anomaly count spiked to 5 — highest single-month count in 2026. Completion dropped to 91.9%, the first below-100% month post-recovery.',
    recommendation: 'Conduct root cause analysis on Jun 2026 task delays. Identify which projects slipped and confirm recovery plans are in place for Q3 2026.',
  },
  {
    id: 'proj-012',
    date: 'Dec 2026',
    kpi: 'Total Budget Spent',
    value: '$1,938,949',
    expected: '~$2,000',
    deviation: '+96,847%',
    severity: 'critical',
    impact: 'Budget spent in Dec 2026 exploded to $1.94M — a near-exact repeat of the Dec 2025 pattern ($1.91M). Severity score returned to 41.5 and completion dipped to 96.7%. This seasonal year-end budget crunch is now a confirmed structural pattern.',
    recommendation: 'Establish a Q4 budget governance framework with hard caps on Dec spend. Monitor Dec 2027 closely for the same pattern and pre-allocate contingency reserves.',
  },
  {
    id: 'proj-013',
    date: 'Mar 2027',
    kpi: 'Avg Budget Variance %',
    value: '-46.0%',
    expected: '~4%',
    deviation: '-1250%',
    severity: 'critical',
    impact: 'Budget variance swung to -46.0% in Mar 2027 — the most severe negative variance since the Q1 2026 collapse. Severity score hit 60.4 (highest in 2027). Despite near-normal completion (98.35%), projects are heavily under-spending against budget, suggesting delays or scope reductions not captured in completion metrics.',
    recommendation: 'Review Mar 2027 project portfolio for budget realignment. Confirm whether under-spend reflects genuine efficiency or hidden scope reduction. Flag as a potential precursor to another Q2 2027 disruption.',
  },
];

// ── Summary Statistics (latest: Mar 2027) ────────────────────────────────────
export const PROJECT_SUMMARY = {
  completionRate:   { current: 98.35,    prevMonth: 100.00,  prevYear: 0.00,    target: 95.0  },
  budgetVariance:   { current: -46.036,  prevMonth: 12.46,   prevYear: -100.00, target: 5.0   },
  delayedTaskRate:  { current: 0.000,    prevMonth: 0.000,   prevYear: 1.000,   target: 0.05  },
  budgetSpent:      { current: 1148,     prevMonth: 1320,    prevYear: 0,       target: null  },
  severityScore:    { current: 60.40,    prevMonth: 0.00,    prevYear: 87.05,   target: 45.0  },
  anomalyCount:     { current: 3,        prevMonth: 0,       prevYear: 0,       target: null  },
  totalAnomalies: 15,
  peakBudgetMonth: 'Dec 2025',
  peakBudgetValue: '$1.91M',
  highSeverityMonths: 6,
  zeroCompletionMonths: 2,
};
