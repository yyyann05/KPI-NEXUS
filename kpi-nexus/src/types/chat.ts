// ─────────────────────────────────────────────────────────────
// KPI Nexus — Chat types
// ─────────────────────────────────────────────────────────────

export type MessageRole = 'user' | 'assistant' | 'system';

export type MessageStatus = 'sending' | 'delivered' | 'error';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  status?: MessageStatus;
  /** optional structured data card attached to the response */
  dataCard?: DataCard;
}

export interface DataCard {
  type: 'metric' | 'table' | 'list';
  title: string;
  items: DataCardItem[];
}

export interface DataCardItem {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  highlight?: boolean;
}

export interface SuggestedPrompt {
  id: string;
  category: 'financial' | 'workforce' | 'customer' | 'project' | 'forecast' | 'anomaly' | 'cross-domain';
  label: string;
  prompt: string;
  icon: string; // lucide icon name
}

export interface ChatSession {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
  messageCount: number;
}
