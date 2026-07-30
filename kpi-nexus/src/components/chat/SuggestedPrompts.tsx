import React from 'react';
import {
  DollarSign, Users, HeartHandshake, FolderKanban,
  TrendingUp, AlertTriangle, Network, Zap,
} from 'lucide-react';
import type { SuggestedPrompt } from '../../types/chat';

const ICON_MAP: Record<string, React.ElementType> = {
  DollarSign, Users, HeartHandshake, FolderKanban,
  TrendingUp, AlertTriangle, Network, Zap,
};

const CATEGORY_COLOR: Record<string, string> = {
  financial:    'text-domain-financial border-domain-financial/30 bg-domain-financial/8 hover:bg-domain-financial/15',
  workforce:    'text-domain-workforce border-domain-workforce/30 bg-domain-workforce/8 hover:bg-domain-workforce/15',
  customer:     'text-domain-customer border-domain-customer/30 bg-domain-customer/8 hover:bg-domain-customer/15',
  project:      'text-domain-project border-domain-project/30 bg-domain-project/8 hover:bg-domain-project/15',
  forecast:     'text-accent-purple border-accent-purple/30 bg-accent-purple/8 hover:bg-accent-purple/15',
  anomaly:      'text-accent-red border-accent-red/30 bg-accent-red/8 hover:bg-accent-red/15',
  'cross-domain': 'text-accent-blue border-accent-blue/30 bg-accent-blue/8 hover:bg-accent-blue/15',
};

export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  { id: 'sp1',  category: 'financial',     icon: 'DollarSign',    label: 'Revenue trend',               prompt: 'What does our revenue trend look like and are there any concerns?' },
  { id: 'sp2',  category: 'financial',     icon: 'DollarSign',    label: 'Cash flow status',             prompt: 'Give me a cash flow analysis and highlight any anomalies.' },
  { id: 'sp3',  category: 'workforce',     icon: 'Users',         label: 'Workforce health',             prompt: 'How is workforce health tracking? Include turnover and attendance.' },
  { id: 'sp4',  category: 'workforce',     icon: 'Users',         label: 'Overtime & burnout risk',      prompt: 'Is there a workforce burnout risk from project crunch cycles?' },
  { id: 'sp5',  category: 'customer',      icon: 'HeartHandshake',label: 'CSAT & NPS',                   prompt: 'How is customer satisfaction and NPS trending?' },
  { id: 'sp6',  category: 'customer',      icon: 'HeartHandshake',label: 'Churn risk',                   prompt: 'What is the current churn rate trend and what is driving it?' },
  { id: 'sp7',  category: 'project',       icon: 'FolderKanban',  label: 'Project delivery',             prompt: 'Give me a project portfolio summary including completion rates and delays.' },
  { id: 'sp8',  category: 'project',       icon: 'FolderKanban',  label: 'Budget variance',              prompt: 'What is the current budget variance situation and risks?' },
  { id: 'sp9',  category: 'forecast',      icon: 'TrendingUp',    label: 'Forecast outlook',             prompt: 'What does the forecast outlook look like for the next 6 months?' },
  { id: 'sp10', category: 'anomaly',       icon: 'AlertTriangle', label: 'Critical anomalies',           prompt: 'What are the most critical anomalies detected across all domains?' },
  { id: 'sp11', category: 'cross-domain',  icon: 'Network',       label: 'Cross-domain risks',           prompt: 'What are the top cross-domain risks and strongest correlations?' },
  { id: 'sp12', category: 'cross-domain',  icon: 'Zap',           label: 'Executive priorities',         prompt: 'What are the top 5 executive priorities based on the data?' },
];

interface Props {
  onSelect: (prompt: string) => void;
}

export const SuggestedPrompts: React.FC<Props> = ({ onSelect }) => (
  <div className="px-4 pb-4">
    <p className="text-[11px] text-text-muted font-medium uppercase tracking-wider mb-3 text-center">
      Suggested questions
    </p>
    <div className="flex flex-wrap gap-2 justify-center">
      {SUGGESTED_PROMPTS.map((p) => {
        const Icon = ICON_MAP[p.icon] ?? Zap;
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p.prompt)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-150 ${CATEGORY_COLOR[p.category]}`}
          >
            <Icon size={11} />
            {p.label}
          </button>
        );
      })}
    </div>
  </div>
);
