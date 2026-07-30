import { useLocation } from 'react-router-dom';
import { Construction } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

const PAGE_META: Record<string, { title: string; description: string; color: string }> = {
  '/domain/financial': {
    title: 'Financial Intelligence',
    description: 'Revenue, profit margin, cash flow, and expenditure deep-dive with Prophet forecasting.',
    color: '#10B981',
  },
  '/domain/workforce': {
    title: 'Workforce Intelligence',
    description: 'Productivity, engagement, attendance, overtime, and turnover trends.',
    color: '#F43F5E',
  },
  '/domain/customer-experience': {
    title: 'Customer Experience',
    description: 'CSAT, NPS, churn rate, response time, and support ticket analysis.',
    color: '#6366F1',
  },
  '/domain/project': {
    title: 'Project Intelligence',
    description: 'Completion rates, budget variance, delayed tasks, and spend analysis.',
    color: '#F59E0B',
  },
  '/forecast': {
    title: 'AI Forecasting',
    description: 'Prophet seasonal trend decomposition with confidence intervals for all KPIs.',
    color: '#A78BFA',
  },
  '/anomalies': {
    title: 'Anomaly Detection',
    description: 'Full anomaly explorer across all domains with severity heatmap and scatter analysis.',
    color: '#F05252',
  },
  '/cross-domain': {
    title: 'Cross-Domain Intelligence',
    description: 'AI-discovered causal correlations between KPIs across all business domains.',
    color: '#4F8EF7',
  },
  '/ai-recommendations': {
    title: 'AI Recommendations',
    description: 'Actionable recommendations derived from anomaly patterns and cross-domain insights.',
    color: '#A78BFA',
  },
  '/reports': {
    title: 'Reports',
    description: 'Generate, schedule, and export executive and domain-level reports.',
    color: '#8B91B5',
  },
  '/ai-chatbot': {
    title: 'AI Chatbot',
    description: 'Natural language interface for querying any KPI, anomaly, or cross-domain insight.',
    color: '#2ECFCF',
  },
};

export function PlaceholderPage() {
  const location = useLocation();
  const meta = PAGE_META[location.pathname] ?? {
    title: 'Coming Soon',
    description: 'This page is under construction.',
    color: '#4F8EF7',
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center gap-6">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${meta.color}18`, border: `1px solid ${meta.color}30` }}
        >
          <Construction className="h-8 w-8" style={{ color: meta.color }} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-text-primary">{meta.title}</h2>
          <p className="text-text-secondary mt-2 max-w-md">{meta.description}</p>
        </div>

        <div
          className="rounded-xl border px-6 py-4 text-sm text-text-muted max-w-md"
          style={{ borderColor: `${meta.color}30`, backgroundColor: `${meta.color}08` }}
        >
          <p>
            This page is part of the <span className="font-semibold text-text-secondary">KPI Nexus</span> full
            dashboard. Implementation ready per UI specification.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
