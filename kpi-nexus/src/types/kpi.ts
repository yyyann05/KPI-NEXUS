export type DomainType =
  | 'Customer Experience'
  | 'Financial'
  | 'Project'
  | 'Workforce';

export interface KpiDataPoint {
  date: string;
  domain: DomainType;
  kpiName: string;
  kpiValue: number;
  dimension: string;
}

export interface AnomalyRecord extends KpiDataPoint {
  isTrendAnomaly: boolean;
  trendAnomalySeverity: number;
}

export interface AnomalySummary {
  domain: DomainType;
  kpiName: string;
  nMonths: number;
  trendAnomaliesFlagged: number;
  avgTrendAnomalySeverity: number;
  usedYearlySeasonality: boolean;
}

export interface ForecastPoint {
  date: string;
  domain: DomainType;
  kpiName: string;
  actualValue: number;
  trendComponent: number;
  seasonalAdjustedForecast: number;
  yhatLower: number;
  yhatUpper: number;
  isTrendAnomaly: boolean;
  trendAnomalySeverity: number;
  usedYearlySeasonality: boolean;
  isAnomalyOutputKpi: boolean;
}

export interface CrossDomainInsight {
  driverDomain: DomainType;
  driverKpi: string;
  targetDomain: DomainType;
  targetKpi: string;
  correlation: number;
  pValue: number;
  monthsOfData: number;
  plainEnglishSummary: string;
  alertText: string | null;
  recommendedAction: string | null;
}

export interface DomainHealthSummary {
  domain: DomainType;
  primaryKpi: string;
  primaryValue: number;
  primaryUnit: string;
  deltaPercent: number;
  anomalyCount: number;
  sparklineData: number[];
  status: 'healthy' | 'warning' | 'critical';
}
