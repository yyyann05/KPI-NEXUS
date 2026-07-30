import type { LucideIcon } from 'lucide-react';
import type { DomainType } from './kpi';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  badge?: number;
  group?: 'main' | 'domains' | 'analytics' | 'utility';
}

export interface FilterState {
  activeDomain: DomainType | 'All';
  activeKpi: string | null;
  dateRange: { start: string; end: string };
}

export interface TabItem {
  id: string;
  label: string;
}

export interface Notification {
  id: string;
  type: 'anomaly' | 'insight' | 'forecast' | 'system';
  title: string;
  message: string;
  domain?: DomainType;
  severity?: 'critical' | 'warning' | 'info';
  timestamp: string;
  read: boolean;
}

export interface AlertItem {
  id: string;
  domain: DomainType;
  kpiName: string;
  date: string;
  severityScore: number;
  actualValue: number;
  expectedValue: number;
}

export interface RecommendationItem {
  id: string;
  priority: 'critical' | 'moderate' | 'informational';
  domains: DomainType[];
  title: string;
  summary: string;
  action: string;
  source: string;
  timestamp: string;
  status: 'pending' | 'actioned' | 'dismissed';
}
