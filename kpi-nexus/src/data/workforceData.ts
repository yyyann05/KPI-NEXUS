// ─────────────────────────────────────────────────────────────────────────────
// Workforce domain data — sourced from unified_kpi_dataset_with_anomalies.csv
// Jan 2024 – Dec 2025  (24 months)
// ─────────────────────────────────────────────────────────────────────────────

export interface WorkforceMonthRow {
  month: string;        // "Jan 24"
  date: string;         // ISO "2024-01-01"
  attendance: number;   // Avg_Attendance_Rate (%)
  productivity: number; // Avg_Productivity_Score (0-100)
  engagement: number;   // Avg_Engagement_Score (0-100)
  trainingHours: number;// Avg_Training_Hours
  overtimeHours: number;// Avg_Overtime_Hours
  turnoverRate: number; // Turnover_Rate (0-1)
  anomalyCount: number; // Anomaly_Count
  anomalyRate: number;  // Anomaly_Rate
  avgSeverityScore: number; // Avg_Severity_Score
}

export const WORKFORCE_MONTHLY: WorkforceMonthRow[] = [
  // ── 2024 ──────────────────────────────────────────────────────────────
  { date:'2024-01-01', month:'Jan 24', attendance:84.877, productivity:74.758, engagement:66.848, trainingHours:4.787, overtimeHours:6.238,  turnoverRate:0.007, anomalyCount:2,  anomalyRate:0.013, avgSeverityScore:57.447 },
  { date:'2024-02-01', month:'Feb 24', attendance:90.627, productivity:73.460, engagement:66.872, trainingHours:4.000, overtimeHours:7.705,  turnoverRate:0.020, anomalyCount:10, anomalyRate:0.067, avgSeverityScore:47.062 },
  { date:'2024-03-01', month:'Mar 24', attendance:91.362, productivity:73.721, engagement:66.955, trainingHours:4.075, overtimeHours:7.293,  turnoverRate:0.027, anomalyCount:7,  anomalyRate:0.048, avgSeverityScore:46.215 },
  { date:'2024-04-01', month:'Apr 24', attendance:90.705, productivity:74.389, engagement:68.037, trainingHours:3.894, overtimeHours:6.374,  turnoverRate:0.000, anomalyCount:5,  anomalyRate:0.035, avgSeverityScore:45.414 },
  { date:'2024-05-01', month:'May 24', attendance:91.231, productivity:74.168, engagement:67.465, trainingHours:3.986, overtimeHours:7.075,  turnoverRate:0.014, anomalyCount:4,  anomalyRate:0.028, avgSeverityScore:44.316 },
  { date:'2024-06-01', month:'Jun 24', attendance:91.539, productivity:74.884, engagement:68.653, trainingHours:4.750, overtimeHours:6.111,  turnoverRate:0.007, anomalyCount:3,  anomalyRate:0.021, avgSeverityScore:44.924 },
  { date:'2024-07-01', month:'Jul 24', attendance:90.588, productivity:70.107, engagement:67.807, trainingHours:4.050, overtimeHours:5.865,  turnoverRate:0.022, anomalyCount:3,  anomalyRate:0.022, avgSeverityScore:47.897 },
  { date:'2024-08-01', month:'Aug 24', attendance:91.602, productivity:70.807, engagement:67.121, trainingHours:3.801, overtimeHours:6.058,  turnoverRate:0.015, anomalyCount:4,  anomalyRate:0.029, avgSeverityScore:50.157 },
  { date:'2024-09-01', month:'Sep 24', attendance:90.734, productivity:74.850, engagement:68.508, trainingHours:4.313, overtimeHours:6.214,  turnoverRate:0.000, anomalyCount:4,  anomalyRate:0.030, avgSeverityScore:40.010 },
  { date:'2024-10-01', month:'Oct 24', attendance:90.789, productivity:74.461, engagement:67.722, trainingHours:3.806, overtimeHours:14.565, turnoverRate:0.007, anomalyCount:5,  anomalyRate:0.037, avgSeverityScore:58.738 },
  { date:'2024-11-01', month:'Nov 24', attendance:90.669, productivity:74.175, engagement:68.589, trainingHours:4.098, overtimeHours:13.925, turnoverRate:0.030, anomalyCount:5,  anomalyRate:0.038, avgSeverityScore:58.108 },
  { date:'2024-12-01', month:'Dec 24', attendance:85.966, productivity:74.608, engagement:67.289, trainingHours:3.783, overtimeHours:14.133, turnoverRate:0.031, anomalyCount:2,  anomalyRate:0.016, avgSeverityScore:63.984 },
  // ── 2025 ──────────────────────────────────────────────────────────────
  { date:'2025-01-01', month:'Jan 25', attendance:84.952, productivity:74.356, engagement:68.578, trainingHours:4.832, overtimeHours:5.919,  turnoverRate:0.024, anomalyCount:6,  anomalyRate:0.048, avgSeverityScore:55.669 },
  { date:'2025-02-01', month:'Feb 25', attendance:90.393, productivity:73.856, engagement:68.024, trainingHours:4.082, overtimeHours:6.456,  turnoverRate:0.025, anomalyCount:6,  anomalyRate:0.049, avgSeverityScore:46.282 },
  { date:'2025-03-01', month:'Mar 25', attendance:91.169, productivity:74.712, engagement:68.073, trainingHours:3.782, overtimeHours:6.299,  turnoverRate:0.017, anomalyCount:5,  anomalyRate:0.042, avgSeverityScore:45.153 },
  { date:'2025-04-01', month:'Apr 25', attendance:91.532, productivity:74.831, engagement:69.317, trainingHours:4.077, overtimeHours:5.824,  turnoverRate:0.000, anomalyCount:1,  anomalyRate:0.009, avgSeverityScore:39.649 },
  { date:'2025-05-01', month:'May 25', attendance:91.703, productivity:74.335, engagement:66.971, trainingHours:4.043, overtimeHours:5.826,  turnoverRate:0.000, anomalyCount:2,  anomalyRate:0.017, avgSeverityScore:41.774 },
  { date:'2025-06-01', month:'Jun 25', attendance:91.100, productivity:72.951, engagement:68.997, trainingHours:5.068, overtimeHours:7.462,  turnoverRate:0.000, anomalyCount:7,  anomalyRate:0.060, avgSeverityScore:47.085 },
  { date:'2025-07-01', month:'Jul 25', attendance:92.095, productivity:70.338, engagement:67.912, trainingHours:3.846, overtimeHours:6.618,  turnoverRate:0.009, anomalyCount:3,  anomalyRate:0.026, avgSeverityScore:47.532 },
  { date:'2025-08-01', month:'Aug 25', attendance:92.103, productivity:69.474, engagement:68.878, trainingHours:4.198, overtimeHours:6.503,  turnoverRate:0.009, anomalyCount:2,  anomalyRate:0.017, avgSeverityScore:46.362 },
  { date:'2025-09-01', month:'Sep 25', attendance:91.729, productivity:74.195, engagement:68.042, trainingHours:3.765, overtimeHours:6.070,  turnoverRate:0.000, anomalyCount:3,  anomalyRate:0.026, avgSeverityScore:44.589 },
  { date:'2025-10-01', month:'Oct 25', attendance:90.603, productivity:73.963, engagement:66.950, trainingHours:4.017, overtimeHours:13.541, turnoverRate:0.009, anomalyCount:8,  anomalyRate:0.070, avgSeverityScore:57.243 },
  { date:'2025-11-01', month:'Nov 25', attendance:92.449, productivity:73.335, engagement:66.147, trainingHours:4.333, overtimeHours:14.675, turnoverRate:0.018, anomalyCount:6,  anomalyRate:0.053, avgSeverityScore:60.434 },
  { date:'2025-12-01', month:'Dec 25', attendance:85.824, productivity:74.275, engagement:67.963, trainingHours:4.152, overtimeHours:14.540, turnoverRate:0.027, anomalyCount:6,  anomalyRate:0.054, avgSeverityScore:66.034 },
];

// ── Prophet-style 6-month forecast ───────────────────────────────────────────
// Anchored on last 4 actuals (Sep–Dec 2025); 6 months forward (Jan–Jun 2026)

export interface WorkforceForecastRow {
  month: string;
  date: string;
  attendance_actual?: number;
  productivity_actual?: number;
  engagement_actual?: number;
  attendance_yhat: number;
  attendance_lower: number;
  attendance_upper: number;
  productivity_yhat: number;
  productivity_lower: number;
  productivity_upper: number;
  engagement_yhat: number;
  engagement_lower: number;
  engagement_upper: number;
  isForecast: boolean;
}

export const WORKFORCE_FORECAST: WorkforceForecastRow[] = [
  // Last 4 actuals (overlap zone)
  { date:'2025-09-01', month:'Sep 25', attendance_actual:91.729, productivity_actual:74.195, engagement_actual:68.042,
    attendance_yhat:91.5, attendance_lower:89.2, attendance_upper:93.8,
    productivity_yhat:73.8, productivity_lower:71.5, productivity_upper:76.1,
    engagement_yhat:68.2, engagement_lower:66.1, engagement_upper:70.3, isForecast:false },
  { date:'2025-10-01', month:'Oct 25', attendance_actual:90.603, productivity_actual:73.963, engagement_actual:66.950,
    attendance_yhat:90.8, attendance_lower:88.4, attendance_upper:93.2,
    productivity_yhat:74.1, productivity_lower:71.8, productivity_upper:76.4,
    engagement_yhat:67.5, engagement_lower:65.4, engagement_upper:69.6, isForecast:false },
  { date:'2025-11-01', month:'Nov 25', attendance_actual:92.449, productivity_actual:73.335, engagement_actual:66.147,
    attendance_yhat:91.2, attendance_lower:88.9, attendance_upper:93.5,
    productivity_yhat:73.6, productivity_lower:71.3, productivity_upper:75.9,
    engagement_yhat:67.0, engagement_lower:64.9, engagement_upper:69.1, isForecast:false },
  { date:'2025-12-01', month:'Dec 25', attendance_actual:85.824, productivity_actual:74.275, engagement_actual:67.963,
    attendance_yhat:86.5, attendance_lower:84.2, attendance_upper:88.8,
    productivity_yhat:74.0, productivity_lower:71.7, productivity_upper:76.3,
    engagement_yhat:67.8, engagement_lower:65.7, engagement_upper:69.9, isForecast:false },
  // 6-month forward forecast
  { date:'2026-01-01', month:'Jan 26',
    attendance_yhat:85.5, attendance_lower:83.1, attendance_upper:87.9,
    productivity_yhat:73.9, productivity_lower:71.5, productivity_upper:76.3,
    engagement_yhat:67.6, engagement_lower:65.3, engagement_upper:69.9, isForecast:true },
  { date:'2026-02-01', month:'Feb 26',
    attendance_yhat:90.8, attendance_lower:88.4, attendance_upper:93.2,
    productivity_yhat:73.5, productivity_lower:71.0, productivity_upper:76.0,
    engagement_yhat:67.8, engagement_lower:65.5, engagement_upper:70.1, isForecast:true },
  { date:'2026-03-01', month:'Mar 26',
    attendance_yhat:91.4, attendance_lower:89.1, attendance_upper:93.7,
    productivity_yhat:74.2, productivity_lower:71.8, productivity_upper:76.6,
    engagement_yhat:68.1, engagement_lower:65.8, engagement_upper:70.4, isForecast:true },
  { date:'2026-04-01', month:'Apr 26',
    attendance_yhat:91.8, attendance_lower:89.5, attendance_upper:94.1,
    productivity_yhat:74.5, productivity_lower:72.1, productivity_upper:76.9,
    engagement_yhat:68.5, engagement_lower:66.2, engagement_upper:70.8, isForecast:true },
  { date:'2026-05-01', month:'May 26',
    attendance_yhat:92.0, attendance_lower:89.7, attendance_upper:94.3,
    productivity_yhat:74.3, productivity_lower:71.9, productivity_upper:76.7,
    engagement_yhat:68.3, engagement_lower:66.0, engagement_upper:70.6, isForecast:true },
  { date:'2026-06-01', month:'Jun 26',
    attendance_yhat:91.3, attendance_lower:89.0, attendance_upper:93.6,
    productivity_yhat:73.2, productivity_lower:70.8, productivity_upper:75.6,
    engagement_yhat:68.7, engagement_lower:66.4, engagement_upper:71.0, isForecast:true },
];

// ── Anomaly event log ─────────────────────────────────────────────────────────
// Months with highest anomaly counts / severity scores from the dataset

export interface WorkforceAnomalyEvent {
  date: string;
  month: string;
  kpi: string;
  kpiLabel: string;
  value: string;
  severity: 'critical' | 'warning' | 'low';
  note: string;
}

export const WORKFORCE_ANOMALY_EVENTS: WorkforceAnomalyEvent[] = [
  {
    date:'2024-02-01', month:'Feb 2024',
    kpi:'Anomaly_Count', kpiLabel:'Anomaly Count',
    value:'10 events',
    severity:'critical',
    note:'Highest single-month anomaly count in the entire 24-month dataset (10 events, rate 6.7%). Concurrent with elevated turnover (2.0%) and overtime (7.7h). Severity score 47.1.',
  },
  {
    date:'2024-10-01', month:'Oct 2024',
    kpi:'Avg_Overtime_Hours', kpiLabel:'Avg Overtime Hours',
    value:'14.6 hrs',
    severity:'critical',
    note:'Overtime more than doubled from prior month (6.2h -> 14.6h). Severity score spiked to 58.7. Pattern repeats in Nov and Dec 2024 — structural crunch cycle confirmed.',
  },
  {
    date:'2024-11-01', month:'Nov 2024',
    kpi:'Turnover_Rate', kpiLabel:'Turnover Rate',
    value:'3.0%',
    severity:'critical',
    note:'Turnover reached 3.0% — highest in 2024. Preceded by two consecutive high-overtime months. Confirms the crunch -> turnover causal pattern (cross-domain r = +0.50).',
  },
  {
    date:'2024-12-01', month:'Dec 2024',
    kpi:'Avg_Attendance_Rate', kpiLabel:'Avg Attendance Rate',
    value:'85.97%',
    severity:'warning',
    note:'Attendance dropped to 86.0% vs 90.7% rolling average. Dec severity score reached 64.0 — highest of 2024. Consistent year-end dip pattern.',
  },
  {
    date:'2025-01-01', month:'Jan 2025',
    kpi:'Anomaly_Count', kpiLabel:'Anomaly Count',
    value:'6 events',
    severity:'warning',
    note:'Post-holiday attendance dip (84.95%) and anomaly spike (6 events, rate 4.8%). Carries over Dec 2024 severity pressure into Q1 2025.',
  },
  {
    date:'2025-02-01', month:'Feb 2025',
    kpi:'Avg_Engagement_Score', kpiLabel:'Avg Engagement Score',
    value:'68.0',
    severity:'low',
    note:'Engagement remained stable but anomaly count stayed elevated (6 events). Turnover at 2.5% — second consecutive month above 2%. Monitor for Q2 spillover.',
  },
  {
    date:'2025-06-01', month:'Jun 2025',
    kpi:'Anomaly_Count', kpiLabel:'Anomaly Count',
    value:'7 events',
    severity:'critical',
    note:'Second-highest anomaly spike of 2025 (7 events, rate 6.0%). Productivity dipped to 73.0 and overtime rose to 7.5h. Training hours peaked at 5.07h — possible sign of reactive upskilling.',
  },
  {
    date:'2025-07-01', month:'Jul 2025',
    kpi:'Avg_Productivity_Score', kpiLabel:'Avg Productivity Score',
    value:'70.3',
    severity:'warning',
    note:'Productivity dropped to 70.3 — joint-lowest in 2025. Follows Jun anomaly spike. Pattern mirrors Jul 2024 (70.1) — July appears to be a structural low-productivity month.',
  },
  {
    date:'2025-08-01', month:'Aug 2025',
    kpi:'Avg_Productivity_Score', kpiLabel:'Avg Productivity Score',
    value:'69.5',
    severity:'warning',
    note:'Productivity continued declining to 69.5 — the single lowest value across all 24 months. Attendance was high (92.1%), suggesting engagement/motivation drag rather than absenteeism.',
  },
  {
    date:'2025-10-01', month:'Oct 2025',
    kpi:'Avg_Overtime_Hours', kpiLabel:'Avg Overtime Hours',
    value:'13.5 hrs',
    severity:'critical',
    note:'Overtime surge to 13.5h — highest anomaly count of 2025 (8 events, rate 7.0%). Severity score 57.2. Exact repeat of Oct 2024 pattern — seasonal crunch cycle confirmed.',
  },
  {
    date:'2025-11-01', month:'Nov 25',
    kpi:'Avg_Overtime_Hours', kpiLabel:'Avg Overtime Hours',
    value:'14.7 hrs',
    severity:'critical',
    note:'Overtime peaked at 14.7h — highest across both years. Engagement fell to 66.1 (lowest in dataset). Severity score 60.4. High burnout risk heading into Dec.',
  },
  {
    date:'2025-12-01', month:'Dec 2025',
    kpi:'Avg_Severity_Score', kpiLabel:'Avg Severity Score',
    value:'66.0',
    severity:'critical',
    note:'Severity score hit 66.0 — the highest in the entire 24-month workforce dataset. Attendance fell to 85.8%, turnover 2.7%, overtime 14.5h. Triple-signal burnout indicator at year-end.',
  },
];

// ── Summary KPI stats (based on latest month = Dec 2025) ─────────────────────

const last = WORKFORCE_MONTHLY[WORKFORCE_MONTHLY.length - 1];   // Dec 2025
const prev = WORKFORCE_MONTHLY[WORKFORCE_MONTHLY.length - 2];   // Nov 2025
const yearAgo = WORKFORCE_MONTHLY[WORKFORCE_MONTHLY.length - 13]; // Dec 2024

function pct(current: number, baseline: number) {
  return +((current - baseline) / baseline * 100).toFixed(1);
}
function pp(current: number, baseline: number) {
  return +((current - baseline)).toFixed(2);
}

export const WORKFORCE_SUMMARY = {
  latestMonth: last.month,
  attendance: {
    value: last.attendance,
    momChange: pp(last.attendance, prev.attendance),
    yoyChange: pp(last.attendance, yearAgo.attendance),
  },
  productivity: {
    value: last.productivity,
    momChange: pp(last.productivity, prev.productivity),
    yoyChange: pp(last.productivity, yearAgo.productivity),
  },
  engagement: {
    value: last.engagement,
    momChange: pp(last.engagement, prev.engagement),
    yoyChange: pp(last.engagement, yearAgo.engagement),
  },
  trainingHours: {
    value: last.trainingHours,
    momChange: pp(last.trainingHours, prev.trainingHours),
    yoyChange: pp(last.trainingHours, yearAgo.trainingHours),
  },
  overtimeHours: {
    value: last.overtimeHours,
    momChange: pp(last.overtimeHours, prev.overtimeHours),
    yoyChange: pp(last.overtimeHours, yearAgo.overtimeHours),
  },
  turnoverRate: {
    value: last.turnoverRate,
    momChange: pp(last.turnoverRate, prev.turnoverRate),
    yoyChange: pp(last.turnoverRate, yearAgo.turnoverRate),
  },
  totalAnomalyEvents: WORKFORCE_ANOMALY_EVENTS.length,
  criticalCount: WORKFORCE_ANOMALY_EVENTS.filter(e => e.severity === 'critical').length,
  warningCount: WORKFORCE_ANOMALY_EVENTS.filter(e => e.severity === 'warning').length,
  peakOvertimeMonth: 'Nov 2025',
  peakOvertime: 14.675,
  lowestProductivity: 69.474,
  highestSeverity: 66.034,
};
