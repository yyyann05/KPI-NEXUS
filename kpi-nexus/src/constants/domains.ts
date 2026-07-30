import type { DomainType } from '../types/kpi';

export const DOMAIN_CONFIG: Record<DomainType, {
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  lightBg: string;
}> = {
  'Financial': {
    color: '#10B981',
    bgColor: 'bg-domain-financial',
    borderColor: 'border-domain-financial',
    textColor: 'text-domain-financial',
    lightBg: 'bg-emerald-500/10',
  },
  'Workforce': {
    color: '#F43F5E',
    bgColor: 'bg-domain-workforce',
    borderColor: 'border-domain-workforce',
    textColor: 'text-domain-workforce',
    lightBg: 'bg-rose-500/10',
  },
  'Customer Experience': {
    color: '#6366F1',
    bgColor: 'bg-domain-customer',
    borderColor: 'border-domain-customer',
    textColor: 'text-domain-customer',
    lightBg: 'bg-indigo-500/10',
  },
  'Project': {
    color: '#F59E0B',
    bgColor: 'bg-domain-project',
    borderColor: 'border-domain-project',
    textColor: 'text-domain-project',
    lightBg: 'bg-amber-500/10',
  },
};

export const DOMAIN_KPIS: Record<DomainType, string[]> = {
  'Financial': [
    'Total_Revenue', 'Total_Net_Income', 'Total_Cash_Flow',
    'Avg_Profit_Margin', 'Total_Expenditure', 'Avg_Debt_to_Equity',
    'Total_Transaction_Amount', 'Anomaly_Count', 'Anomaly_Rate',
  ],
  'Workforce': [
    'Avg_Productivity_Score', 'Avg_Engagement_Score', 'Avg_Attendance_Rate',
    'Avg_Overtime_Hours', 'Turnover_Rate', 'Avg_Training_Hours',
    'Anomaly_Count', 'Anomaly_Rate',
  ],
  'Customer Experience': [
    'Avg_CSAT_Score', 'Avg_NPS_Score', 'Churn_Rate',
    'Avg_Response_Time', 'Total_Support_Tickets', 'Avg_Severity_Score',
    'Anomaly_Count', 'Anomaly_Rate',
  ],
  'Project': [
    'Avg_Percent_Complete', 'Avg_Budget_Variance_Pct', 'Delayed_Task_Rate',
    'Total_Budget_Spent', 'Anomaly_Count', 'Anomaly_Rate',
  ],
};
