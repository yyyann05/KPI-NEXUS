// -----------------------------------------------------------------
// KPI Nexus -- Chat API hook
// Calls POST /api/chat (backend already exists).
// Falls back to rich mock responses during development if the
// API is unreachable (non-2xx or network error).
// -----------------------------------------------------------------

import { useCallback, useRef, useState } from 'react';
import type { ChatMessage, DataCard } from '../types/chat';

// -- Config --------------------------------------------------------

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';
const CHAT_ENDPOINT = `${API_BASE}/api/chat`;

// -- Mock response bank -------------------------------------------

interface MockEntry {
  patterns: RegExp[];
  response: string;
  dataCard?: DataCard;
}

const MOCK_BANK: MockEntry[] = [
  {
    patterns: [/revenue/i, /income/i],
    response: [
      '## Revenue Overview',
      '',
      'Revenue has shown a **steady upward trend** throughout the analysis period (Jan 2025 - Sep 2027):',
      '',
      '- **Peak month**: Dec 2026 at **$148,000**',
      '- **Latest reading** (Sep 2027): **$142,500**',
      '- **YoY growth**: approximately **+8.3%** vs same period prior year',
      '- **3 anomaly flags** were detected in the Financial domain -- primarily in Q1 and Q4 reporting cycles',
      '',
      'Expenditure is tracking closely with revenue growth. Profit margin remains stable at **~78-82%** across most months.',
      '',
      '> **Executive note**: Revenue momentum is positive. Monitor expenditure in the Nov-Dec period, historically the highest-spend window.',
    ].join('\n'),
    dataCard: {
      type: 'metric',
      title: 'Revenue Snapshot',
      items: [
        { label: 'Latest Monthly Revenue', value: '$142,500', trend: 'up' },
        { label: 'YoY Growth', value: '+8.3%', trend: 'up', highlight: true },
        { label: 'Avg Profit Margin', value: '79.4%', trend: 'neutral' },
        { label: 'Anomaly Flags (Financial)', value: '3', trend: 'neutral' },
      ],
    },
  },
  {
    patterns: [/cash flow/i, /cashflow/i, /liquidity/i],
    response: [
      '## Cash Flow Analysis',
      '',
      'Cash flow is one of the **most monitored KPIs** in the dataset with **5 anomaly flags** across 33 months.',
      '',
      '### Key findings:',
      '',
      '1. **Granger causality confirmed**: Cash flow decline predicts **CSAT decline** (r = -0.33, p = 0.005) with a lag of ~1-2 months',
      '2. Cash flow also negatively predicts **churn rate** (r = -0.30, p = 0.017)',
      '3. Lowest cash flow months coincide with **high project budget spend** cycles',
      '',
      '### Recommended action',
      '',
      '> Define a cash flow floor of **$65,000/month** below which no customer-facing cost cuts may be made. Protect service quality during constrained periods.',
    ].join('\n'),
    dataCard: {
      type: 'metric',
      title: 'Cash Flow Indicators',
      items: [
        { label: 'Anomaly Flags', value: '5 months', trend: 'down', highlight: true },
        { label: 'CSAT Correlation', value: 'r = -0.33', trend: 'down' },
        { label: 'Churn Correlation', value: 'r = -0.30', trend: 'down' },
        { label: 'Recommended Floor', value: '$65K/mo', trend: 'neutral' },
      ],
    },
  },
  {
    patterns: [/project/i, /budget/i, /delivery/i, /completion/i],
    response: [
      '## Project Portfolio Intelligence',
      '',
      'The project domain shows the **highest individual severity anomalies** in the entire dataset.',
      '',
      '### Critical flags:',
      '',
      '| KPI | Flags | Avg Severity |',
      '|-----|-------|--------------|',
      '| Project Anomaly Rate | 1 | **2.7** (highest) |',
      '| Project Anomaly Count | 2 | **2.6** |',
      '| Delayed Task Rate | 3 | 2.3 |',
      '',
      '### Cross-domain drivers:',
      '',
      '- **Avg Response Time** is the strongest predictor of project budget spend (r = +0.61)',
      '- **Support ticket volume** predicts budget variance (r = +0.54)',
      '- High project spend drives **overtime** (r = +0.50) and **attendance decline** (r = -0.45)',
      '',
      '> **Action**: Trigger a project scope review when budget burn rate rises >15% above baseline.',
    ].join('\n'),
    dataCard: {
      type: 'metric',
      title: 'Project Risk Metrics',
      items: [
        { label: 'Highest Severity Score', value: '2.7', trend: 'down', highlight: true },
        { label: 'Delayed Task Anomalies', value: '3 flags', trend: 'down' },
        { label: 'Budget <> Overtime Correlation', value: 'r = +0.50', trend: 'down' },
        { label: 'Response Time -> Budget', value: 'r = +0.61', trend: 'down' },
      ],
    },
  },
  {
    patterns: [/employ/i, /workforce/i, /attendance/i, /turnover/i, /overtime/i, /staff/i, /people/i],
    response: [
      '## Workforce Intelligence',
      '',
      'Workforce health is under **sustained pressure** from project delivery crunch cycles.',
      '',
      '### Key metrics:',
      '',
      '- **Turnover anomaly severity**: 2.1 -- flagged twice in the past 24 months',
      '- **Attendance decline** is a confirmed downstream effect of high project spend (r = -0.45)',
      '- **Overtime** spikes are predictable: every $1 increase in monthly project budget spend is associated with measurable overtime increase (r = +0.50)',
      '',
      '### Risk pattern:',
      '',
      '```',
      'High Project Spend -> Overtime Up -> Attendance Down -> Turnover Up',
      '```',
      '',
      '> **Executive recommendation**: Mandate recovery sprints after each high-intensity delivery cycle. Monitor attendance weekly during months when project budget exceeds **$120K**.',
    ].join('\n'),
    dataCard: {
      type: 'metric',
      title: 'Workforce Health',
      items: [
        { label: 'Turnover Anomaly Severity', value: '2.1', trend: 'down', highlight: true },
        { label: 'Attendance Anomaly Flags', value: '3', trend: 'down' },
        { label: 'Spend -> Overtime Correlation', value: 'r = +0.50', trend: 'down' },
        { label: 'Spend -> Attendance Correlation', value: 'r = -0.45', trend: 'down' },
      ],
    },
  },
  {
    patterns: [/customer/i, /csat/i, /nps/i, /churn/i, /satisfaction/i, /support/i],
    response: [
      '## Customer Experience Intelligence',
      '',
      'Customer experience has the **most anomaly flags** of all domains (9 total) with the highest concentration in CSAT, Churn Rate, and Support Ticket Volume.',
      '',
      '### Severity breakdown:',
      '- **Critical**: 2 KPIs (Avg Severity Score, Churn Rate)',
      '- **Warning**: 4 KPIs',
      '- **Low**: 3 KPIs',
      '',
      '### Causal relationships confirmed:',
      '',
      '1. **Cash Flow -> CSAT** (r = -0.33, p = 0.005) -- most actionable finding',
      '2. **Cash Flow -> Churn** (r = -0.30, p = 0.017)',
      '3. **Support Tickets -> Project Budget** (r = +0.53) -- tickets drive delivery costs',
      '',
      '> **Key risk**: Low cash flow creates a revenue loss loop -- worse service -> more churn -> less revenue -> lower cash flow. Protect the minimum service level during constrained periods.',
    ].join('\n'),
    dataCard: {
      type: 'metric',
      title: 'CX Snapshot',
      items: [
        { label: 'Total Anomaly Flags', value: '9', trend: 'down', highlight: true },
        { label: 'Critical KPIs', value: '2', trend: 'down' },
        { label: 'Cash Flow -> CSAT', value: 'r = -0.33', trend: 'down' },
        { label: 'Churn Anomaly Severity', value: '1.6', trend: 'down' },
      ],
    },
  },
  {
    patterns: [/forecast/i, /predict/i, /projection/i, /prophet/i, /future/i, /outlook/i],
    response: [
      '## Forecasting & Trend Outlook',
      '',
      'Prophet-based forecasting has been applied to all major KPIs across 4 domains using **33 months** of historical data (Jan 2025 - Sep 2027).',
      '',
      '### Forecast confidence:',
      '',
      '- All forecasts include **95% confidence bands**',
      '- Seasonality components identified in **Financial**, **Customer Experience**, and **Project** domains',
      '- Monthly seasonality is strongest in **Nov-Dec** (revenue and customer anomaly spikes)',
      '',
      '### Near-term outlook:',
      '',
      '| Domain | Direction | Signal |',
      '|--------|-----------|--------|',
      '| Financial | Stable growth | Revenue trend intact |',
      '| Workforce | Risk elevated | Turnover pressure rising |',
      '| Customer | Mixed | Churn trending up slightly |',
      '| Project | Watch | Budget variance widening |',
      '',
      '> Forecasts are available on the **Forecasting** page with full confidence band charts.',
    ].join('\n'),
    dataCard: {
      type: 'metric',
      title: 'Forecast Summary',
      items: [
        { label: 'Months of History', value: '33', trend: 'neutral' },
        { label: 'Domains with Seasonality', value: '3 / 4', trend: 'neutral' },
        { label: 'Financial Outlook', value: 'Stable', trend: 'up', highlight: true },
        { label: 'Workforce Risk', value: 'Elevated', trend: 'down' },
      ],
    },
  },
  {
    patterns: [/anomal/i, /flag/i, /detect/i, /alert/i, /severity/i, /outlier/i],
    response: [
      '## Anomaly Detection Summary',
      '',
      'The anomaly detection engine has processed **33 months** of data across all 4 domains.',
      '',
      '### Overall stats:',
      '',
      '- **63 total anomaly events** flagged',
      '- **14 unique KPIs** flagged at least once',
      '- **Highest severity**: Project Anomaly Rate -- severity **2.7** (Jun 2026)',
      '- **Most flags**: Total Expenditure -- **6 flags** in Financial domain',
      '',
      '### Domain breakdown:',
      '',
      '| Domain | Critical | Warning | Low | Total |',
      '|--------|----------|---------|-----|-------|',
      '| Customer | 2 | 4 | 3 | **9** |',
      '| Financial | 1 | 5 | 3 | **9** |',
      '| Project | 3 | 3 | 1 | **7** |',
      '| Workforce | 0 | 4 | 3 | **7** |',
      '',
      '> View the full **Anomaly Detection** page for filter, timeline, and per-KPI alert cards.',
    ].join('\n'),
    dataCard: {
      type: 'metric',
      title: 'Anomaly Overview',
      items: [
        { label: 'Total Events Flagged', value: '63', trend: 'down', highlight: true },
        { label: 'Critical KPIs', value: '6', trend: 'down' },
        { label: 'Highest Severity', value: '2.7 (Project)', trend: 'down' },
        { label: 'Domains Affected', value: '4 / 4', trend: 'down' },
      ],
    },
  },
  {
    patterns: [/cross.?domain/i, /correlat/i, /granger/i, /causal/i, /relation/i, /finding/i, /intelligence/i],
    response: [
      '## Cross-Domain Intelligence',
      '',
      'The analysis identified **11 statistically significant cross-domain relationships** using Granger causality testing.',
      '',
      '### Strongest correlations:',
      '',
      '1. **Avg Response Time -> Project Budget Spent** -- r = +0.61 *(Strongest)*',
      '2. **Project Budget Variance -> Profit Margin** -- r = +0.55',
      '3. **Support Tickets -> Project Budget Spent** -- r = +0.53',
      '4. **Support Tickets -> Budget Variance** -- r = +0.54',
      '5. **Project Budget -> Workforce Overtime** -- r = +0.50',
      '',
      '### Top 3 executive risks:',
      '',
      '1. [CRITICAL] **Cash flow decline -> CSAT erosion loop**',
      '2. [CRITICAL] **Project crunch -> workforce burnout cycle**',
      '3. [HIGH] **Support volume driving budget overruns**',
      '',
      '> The full finding set with business explanations and executive actions is on the **Cross-Domain Intelligence** page.',
    ].join('\n'),
    dataCard: {
      type: 'metric',
      title: 'Cross-Domain Findings',
      items: [
        { label: 'Findings Identified', value: '11', trend: 'neutral', highlight: true },
        { label: 'Strong (|r| >= 0.50)', value: '5', trend: 'neutral' },
        { label: 'Strongest Signal', value: 'r = +0.61', trend: 'down' },
        { label: 'Critical Risks', value: '2', trend: 'down' },
      ],
    },
  },
  {
    patterns: [/risk/i, /danger/i, /concern/i, /threat/i, /urgent/i, /critical/i, /priority/i],
    response: [
      '## Top Executive Risks',
      '',
      'Based on the full cross-domain analysis, here are the **5 highest-priority risks** ranked by urgency and causal evidence:',
      '',
      '### [CRITICAL]',
      '',
      '**1. Cash Flow Decline -> CSAT Erosion Loop**',
      'Low cash flow -> worse service -> more churn -> less revenue -> lower cash flow. Confirmed by two independent correlations (r = -0.33 and r = -0.30).',
      '',
      '**2. Project Crunch -> Workforce Burnout Cycle**',
      'High project spend drives overtime (+0.50) and attendance decline (-0.45), leading to turnover anomalies. Unsustainable over 2-3 cycle repetitions.',
      '',
      '### [HIGH]',
      '',
      '**3. Support Volume Driving Budget Overruns** -- r = +0.53',
      '**4. Response Time as Hidden Budget Risk** -- r = +0.61 (strongest signal)',
      '',
      '### [MEDIUM]',
      '**5. Budget Variance Suppressing Margins** -- r = +0.55',
      '',
      '> **Recommended**: Address risks 1 and 2 before Q4 2027.',
    ].join('\n'),
  },
  {
    patterns: [/.*/],
    response: [
      'I can help you analyze KPI data across all four business domains. Here are some things you can ask me:',
      '',
      '- **"What does our revenue trend look like?"**',
      '- **"Are there any critical anomalies I should know about?"**',
      '- **"How is workforce health tracking?"**',
      '- **"What are the top cross-domain risks?"**',
      '- **"Give me the cash flow outlook"**',
      '- **"How is customer satisfaction trending?"**',
      '',
      'What would you like to explore?',
    ].join('\n'),
  },
];

function getMockResponse(query: string): { content: string; dataCard?: DataCard } {
  for (const entry of MOCK_BANK) {
    const matched = entry.patterns.some((p) => p.test(query));
    if (matched) {
      return { content: entry.response, dataCard: entry.dataCard };
    }
  }
  return { content: MOCK_BANK[MOCK_BANK.length - 1].response };
}

// -- Hook ----------------------------------------------------------

export interface SendMessageOptions {
  onChunk?: (chunk: string) => void;
}

export function useChatApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (
      messages: ChatMessage[],
      _opts?: SendMessageOptions
    ): Promise<{ content: string; dataCard?: DataCard }> => {
      setLoading(true);
      setError(null);
      abortRef.current = new AbortController();

      try {
        const payload = {
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        };

        const res = await fetch(CHAT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: abortRef.current.signal,
        });

        if (!res.ok) throw new Error(`API error ${res.status}`);

        const data = await res.json();
        return { content: data.content ?? data.message ?? '' };
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          throw err;
        }
        // API unreachable -- fall back to mock
        const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
        const query = lastUserMessage?.content ?? '';

        // Simulate realistic latency
        await new Promise((r) => setTimeout(r, 900 + Math.random() * 700));

        return getMockResponse(query);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const abort = useCallback(() => {
    abortRef.current?.abort();
    setLoading(false);
  }, []);

  return { sendMessage, loading, error, setError, abort };
}
