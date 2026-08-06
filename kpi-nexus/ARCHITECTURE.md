# KPI Nexus — Complete Architecture & File Guide

## Part 1 — The Complete Project Tree

```
kpi-nexus/
├── public/
│   └── vite.svg                        ← browser tab icon (Vite default)
│
├── src/
│   ├── assets/                         ← images, logos, icons (static files)
│   │
│   ├── components/                     ← reusable building blocks
│   │   ├── cards/                      ← data card components
│   │   │   ├── AnomalyAlertCard.tsx
│   │   │   ├── DomainHealthCard.tsx
│   │   │   ├── InsightCard.tsx
│   │   │   ├── KpiSummaryCard.tsx
│   │   │   └── RecommendationCard.tsx
│   │   │
│   │   ├── charts/                     ← all Recharts chart components
│   │   │   ├── AnomalyRateChart.tsx
│   │   │   ├── AttendanceChart.tsx
│   │   │   ├── BudgetVarianceChart.tsx
│   │   │   ├── CashFlowChart.tsx
│   │   │   ├── ChartCard.tsx
│   │   │   ├── ChurnRateChart.tsx
│   │   │   ├── CrossDomainChart.tsx
│   │   │   ├── CSATNPSChart.tsx
│   │   │   ├── EngagementTrainingChart.tsx
│   │   │   ├── ForecastBandChart.tsx
│   │   │   ├── MultiDomainTrendChart.tsx
│   │   │   ├── NetIncomeChart.tsx
│   │   │   ├── ProfitMarginChart.tsx
│   │   │   ├── ProjectCompletionChart.tsx
│   │   │   ├── RevenueTrendChart.tsx
│   │   │   ├── SeasonalityChart.tsx
│   │   │   ├── SeverityDistributionChart.tsx
│   │   │   ├── WorkforceProductivityChart.tsx
│   │   │   └── index.ts               ← barrel export for all charts
│   │   │
│   │   ├── chat/                       ← AI chatbot UI sub-components
│   │   │   ├── ChatHistorySidebar.tsx
│   │   │   ├── MarkdownRenderer.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── SuggestedPrompts.tsx
│   │   │   └── TypingIndicator.tsx
│   │   │
│   │   ├── layout/                     ← app shell / structural components
│   │   │   ├── AppShell.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── TopBar.tsx
│   │   │
│   │   └── ui/                         ← generic primitive UI elements
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── SectionHeader.tsx
│   │       └── Tag.tsx
│   │
│   ├── constants/                      ← app-wide fixed values
│   │   ├── domains.ts
│   │   └── routes.ts
│   │
│   ├── data/                           ← mock data (acts like a local database)
│   │   ├── aiRecommendationsData.ts
│   │   ├── anomalyData.ts
│   │   ├── chartData.ts
│   │   ├── customerExperienceData.ts
│   │   ├── financialData.ts
│   │   ├── forecastData.ts
│   │   ├── mockData.ts
│   │   ├── projectData.ts
│   │   ├── reportData.ts
│   │   └── workforceData.ts
│   │
│   ├── hooks/                          ← custom React hooks
│   │   └── useChatApi.ts
│   │
│   ├── pages/                          ← one file per full screen/page
│   │   ├── AIChatbotPage.tsx
│   │   ├── AIRecommendationsPage.tsx
│   │   ├── AnomalyDetectionPage.tsx
│   │   ├── CrossDomainIntelligencePage.tsx
│   │   ├── CustomerExperienceDashboardPage.tsx
│   │   ├── FinancialDashboardPage.tsx
│   │   ├── ForecastingDashboardPage.tsx
│   │   ├── OverviewPage.tsx
│   │   ├── PlaceholderPage.tsx
│   │   ├── ProjectDashboardPage.tsx
│   │   ├── ReportsDashboardPage.tsx
│   │   └── WorkforceDashboardPage.tsx
│   │
│   ├── routes/
│   │   └── index.tsx                   ← URL → page mapping
│   │
│   ├── store/
│   │   └── index.ts                    ← global state (Zustand)
│   │
│   ├── types/                          ← TypeScript type definitions
│   │   ├── chat.ts
│   │   ├── kpi.ts
│   │   └── ui.ts
│   │
│   ├── utils/                          ← helper functions
│   │   ├── cn.ts
│   │   └── formatters.ts
│   │
│   ├── App.css                         ← root-level CSS (rarely touched)
│   ├── App.tsx                         ← root React component
│   ├── index.css                       ← Tailwind CSS entry point
│   └── main.tsx                        ← application entry point
│
├── index.html                          ← HTML shell loaded by browser
├── package.json                        ← npm dependencies list
├── tailwind.config.js                  ← Tailwind custom colors/theme
├── tsconfig.json                       ← TypeScript compiler settings
└── vite.config.ts                      ← Vite build tool settings
```

---

## Part 2 — Folder Purposes

### `src/assets/`
**What it is:** A place for static files like images, logos, and SVG icons.

**Currently contains:** The Vite default logo. You would put your company logo or custom icons here.

**Rule:** If a file doesn't have logic — just pixels — it belongs here.

---

### `src/components/`
**What it is:** Reusable pieces of UI that can be used in multiple places.

**Sub-folders:**

| Sub-folder | Purpose |
|---|---|
| `cards/` | Data cards — self-contained boxes showing KPI info |
| `charts/` | Recharts-powered visualizations |
| `chat/` | Everything specific to the AI chatbot UI |
| `layout/` | The structural skeleton (sidebar, top bar, footer) |
| `ui/` | Tiny generic elements (buttons, badges, spinners) |

**Rule:** If a component is used in more than one page, it lives in `components/`.

---

### `src/constants/`
**What it is:** Fixed values that never change while the app runs.

**Rule:** Never write a URL path string directly in a component. Put it in `constants/routes.ts` and import it. That way, if you rename a route, you only change it in one place.

---

### `src/data/`
**What it is:** The fake "database" — TypeScript files that export arrays and objects of pre-made data.

**Rule:** Only data lives here — no components, no functions that modify things. Just clean data exports.

---

### `src/hooks/`
**What it is:** Custom React hooks — functions that start with `use` and contain React logic.

**Rule:** If you find yourself copy-pasting the same `useState` + `useEffect` + `fetch` logic across multiple components, extract it into a hook here.

---

### `src/pages/`
**What it is:** One file per full screen that the user sees.

**Rule:** Pages are NOT reusable. They are assembled from components. A page should not be imported by another page.

---

### `src/routes/`
**What it is:** The routing configuration — maps each URL path to a page component.

---

### `src/store/`
**What it is:** Global state management using Zustand.

---

### `src/types/`
**What it is:** TypeScript interfaces and type aliases — the "contracts" that describe the shape of data.

**Rule:** Types that are used across multiple files belong in `types/`. Types used in only one file can be defined locally in that file.

---

### `src/utils/`
**What it is:** Pure helper functions that do one small job and have no React inside them.

**Rule:** If you can test a function with just inputs and outputs (no React needed), it belongs in `utils/`.

---

## Part 3 — Every File Explained

---

### Entry Points

---

#### `src/main.tsx`
**Purpose:** The very first file that runs when the app starts. It finds the `<div id="root">` in `index.html` and tells React to start rendering inside it.

**Used by:** Nobody imports this. It's the starting gun.

**Reusable?** No. There is only ever one `main.tsx`.

```
Browser loads index.html
  → index.html has <script src="main.tsx">
    → main.tsx calls createRoot().render(<App />)
```

---

#### `src/App.tsx`
**Purpose:** Sets up the two most important providers that the entire app needs:
1. **QueryClientProvider** — enables React Query (for data fetching, caching)
2. **AppRouter** — plugs in the routing system

**Used by:** `main.tsx`

**Reusable?** No. One per app.

---

#### `src/index.css`
**Purpose:** The global CSS file. Contains the three Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`) that inject all Tailwind styles into the app.

**Used by:** `main.tsx` (imported once)

**Reusable?** No. One per app.

---

#### `src/App.css`
**Purpose:** Root-level custom CSS for global overrides. Mostly empty in this project because Tailwind handles styling.

**Used by:** `App.tsx` (imported once, but rarely written to)

**Reusable?** No.

---

### Routes

---

#### `src/routes/index.tsx`
**Purpose:** Creates the browser router. Defines the full URL structure of the app: every path and what page component it renders.

**Structure:**
```
/                        → OverviewPage
/domain/financial        → FinancialDashboardPage
/domain/workforce        → WorkforceDashboardPage
/domain/customer-exp...  → CustomerExperienceDashboardPage
/domain/project          → ProjectDashboardPage
/forecast                → ForecastingDashboardPage
/anomalies               → AnomalyDetectionPage
/cross-domain            → CrossDomainIntelligencePage
/ai-recommendations      → AIRecommendationsPage
/reports                 → ReportsDashboardPage
/ai-chatbot              → AIChatbotPage
*                        → PlaceholderPage (404)
```

All pages are wrapped inside `AppShell`, so they all share the same sidebar + topbar + footer.

**Used by:** `App.tsx`

**Reusable?** No. One routing config per app.

---

### Layout (Shell)

---

#### `src/components/layout/AppShell.tsx`
**Purpose:** The master layout wrapper. Renders the `<Sidebar>`, `<TopBar>`, `<Footer>`, and the `<Outlet>` — the Outlet is where React Router plugs in the current page.

**Think of it like:** The frame of a picture. The frame stays the same; only the picture (the page) inside changes when you navigate.

**Used by:** `src/routes/index.tsx` (set as the root `element`)

**Reusable?** Yes — it's used as the shell for ALL pages.

---

#### `src/components/layout/Sidebar.tsx`
**Purpose:** The left navigation panel. Shows all nav links with icons. Reads `sidebarCollapsed` from the UI store to toggle between full-width and icon-only modes.

**Used by:** `AppShell.tsx`

**Imports from:**
- `constants/routes.ts` (path strings)
- `store/index.ts` (collapse state)
- `types/ui.ts` (NavItem type)

**Reusable?** It exists once, so technically not reused — but it's decoupled from pages.

---

#### `src/components/layout/TopBar.tsx`
**Purpose:** The top navigation bar. Shows:
- Current page title
- Date filter range
- Live clock (updates every minute via `useEffect`)
- Notification bell → opens notification panel
- User profile avatar

**Used by:** `AppShell.tsx`

**Imports from:**
- `store/index.ts` (UI state, filter state)
- `utils/formatters.ts`

**Reusable?** Appears once, but could be reused in different shell layouts.

---

#### `src/components/layout/Footer.tsx`
**Purpose:** The bottom bar. Shows copyright info and app version.

**Used by:** `AppShell.tsx`

**Reusable?** Appears once.

---

### UI Primitives (`src/components/ui/`)

These are the smallest building blocks. Think of them as the atoms that everything else is built from.

---

#### `src/components/ui/Button.tsx`
**Purpose:** A reusable button component with consistent styling variants (primary, secondary, ghost, danger, etc.).

**Why here?** Every page has buttons. Without a shared Button component, each developer would style buttons differently.

**Used by:** Almost all pages and many components.

**Reusable?** Yes — this is the definition of reusable.

---

#### `src/components/ui/Card.tsx`
**Purpose:** A generic container with a dark background, rounded corners, and subtle border — the standard "panel" look used throughout the dashboard.

**Used by:** Almost all pages, chart components, and card components.

**Reusable?** Yes.

---

#### `src/components/ui/Badge.tsx`
**Purpose:** A small colored pill/label showing a status word like "Critical", "Healthy", "Pending".

**Used by:** `AnomalyAlertCard.tsx`, `RecommendationCard.tsx`, `AIRecommendationsPage.tsx`.

**Reusable?** Yes.

---

#### `src/components/ui/Tag.tsx`
**Purpose:** Similar to Badge but used for category labels or domain tags. Typically outlined/borderless.

**Used by:** `InsightCard.tsx`, `DomainHealthCard.tsx`.

**Reusable?** Yes.

---

#### `src/components/ui/LoadingSpinner.tsx`
**Purpose:** An animated spinning circle shown while data is loading.

**Used by:** Pages that have loading states.

**Reusable?** Yes.

---

#### `src/components/ui/SectionHeader.tsx`
**Purpose:** A consistent section title + optional subtitle, used at the top of dashboard sections.

**Used by:** All dashboard pages.

**Reusable?** Yes.

---

### Cards (`src/components/cards/`)

Cards are bigger than UI primitives — they display a specific type of data in a structured way.

---

#### `src/components/cards/KpiSummaryCard.tsx`
**Purpose:** Shows a single KPI metric — title, current value, delta (change), trend arrow, and sparkline bar. This is the most important reusable card in the app.

**Used by:**
- `OverviewPage.tsx`
- `FinancialDashboardPage.tsx`
- `WorkforceDashboardPage.tsx`
- `CustomerExperienceDashboardPage.tsx`
- `ProjectDashboardPage.tsx`

**Reusable?** Yes — highly reusable across all domain dashboards.

---

#### `src/components/cards/DomainHealthCard.tsx`
**Purpose:** A summary card for an entire business domain (e.g., Financial, Workforce). Shows domain status, primary KPI value, anomaly count, and a sparkline.

**Used by:** `OverviewPage.tsx`

**Reusable?** Yes — one card per domain, all using the same component.

---

#### `src/components/cards/AnomalyAlertCard.tsx`
**Purpose:** Displays one anomaly event — which KPI, which domain, how severe, actual vs expected value. Color-coded by severity.

**Used by:** `AnomalyDetectionPage.tsx`, `OverviewPage.tsx`

**Reusable?** Yes.

---

#### `src/components/cards/InsightCard.tsx`
**Purpose:** Displays a cross-domain correlation insight — e.g., "When Workforce Engagement drops, Customer Satisfaction drops 2 months later." Shows correlation strength, p-value, and recommended action.

**Used by:** `CrossDomainIntelligencePage.tsx`, `OverviewPage.tsx`

**Reusable?** Yes.

---

#### `src/components/cards/RecommendationCard.tsx`
**Purpose:** Displays one AI-generated recommendation with priority level, affected domains, action steps, and status buttons (Approve / Dismiss).

**Used by:** `OverviewPage.tsx`, `AIRecommendationsPage.tsx`

**Reusable?** Yes.

---

### Charts (`src/components/charts/`)

Each chart is a self-contained Recharts visualization. They accept data as props and render a chart.

---

#### `src/components/charts/ChartCard.tsx`
**Purpose:** A wrapper that puts a title, subtitle, and action button around any chart. Every chart in the app is wrapped in this card.

**Used by:** All other chart components (as a container).

**Reusable?** Yes — it's the frame for all charts.

---

#### `src/components/charts/RevenueTrendChart.tsx`
**Purpose:** Line chart showing monthly Total Revenue over the full 33-month period.

**Used by:** `FinancialDashboardPage.tsx`

**Data source:** `data/financialData.ts`

**Reusable?** Page-specific chart, but the component is decoupled from the page.

---

#### `src/components/charts/NetIncomeChart.tsx`
**Purpose:** Area chart showing Net Income vs Expenditure comparison over time.

**Used by:** `FinancialDashboardPage.tsx`

**Reusable?** Page-specific.

---

#### `src/components/charts/CashFlowChart.tsx`
**Purpose:** Bar chart showing monthly Cash Flow with positive/negative color coding.

**Used by:** `FinancialDashboardPage.tsx`

**Reusable?** Page-specific.

---

#### `src/components/charts/ProfitMarginChart.tsx`
**Purpose:** Line chart tracking Profit Margin % over time.

**Used by:** `FinancialDashboardPage.tsx`

**Reusable?** Page-specific.

---

#### `src/components/charts/WorkforceProductivityChart.tsx`
**Purpose:** Multi-line chart showing Productivity Score, Engagement Score, and Attendance Rate for the Workforce domain.

**Used by:** `WorkforceDashboardPage.tsx`

**Reusable?** Page-specific.

---

#### `src/components/charts/EngagementTrainingChart.tsx`
**Purpose:** Scatter/dual-axis chart correlating Engagement Score with Training Hours.

**Used by:** `WorkforceDashboardPage.tsx`

**Reusable?** Page-specific.

---

#### `src/components/charts/AttendanceChart.tsx`
**Purpose:** Bar chart showing monthly Attendance Rate and Overtime Hours.

**Used by:** `WorkforceDashboardPage.tsx`

**Reusable?** Page-specific.

---

#### `src/components/charts/CSATNPSChart.tsx`
**Purpose:** Dual-line chart showing CSAT Score and NPS Score trends for Customer Experience.

**Used by:** `CustomerExperienceDashboardPage.tsx`

**Reusable?** Page-specific.

---

#### `src/components/charts/ChurnRateChart.tsx`
**Purpose:** Area chart showing customer Churn Rate over time.

**Used by:** `CustomerExperienceDashboardPage.tsx`

**Reusable?** Page-specific.

---

#### `src/components/charts/ProjectCompletionChart.tsx`
**Purpose:** Bar chart showing Project Completion % and Delayed Task Rate.

**Used by:** `ProjectDashboardPage.tsx`

**Reusable?** Page-specific.

---

#### `src/components/charts/BudgetVarianceChart.tsx`
**Purpose:** Bar chart showing Budget Variance % per month (over/under budget).

**Used by:** `ProjectDashboardPage.tsx`

**Reusable?** Page-specific.

---

#### `src/components/charts/ForecastBandChart.tsx`
**Purpose:** A sophisticated chart that shows actual values + a forecast trend line + confidence interval bands (yhat_lower to yhat_upper). Used in the Forecasting page.

**Used by:** `ForecastingDashboardPage.tsx`

**Reusable?** Yes — takes domain and KPI as props.

---

#### `src/components/charts/SeasonalityChart.tsx`
**Purpose:** Shows the seasonal pattern component extracted from the forecast model — how values predictably rise/fall within a year cycle.

**Used by:** `ForecastingDashboardPage.tsx`

**Reusable?** Page-specific.

---

#### `src/components/charts/AnomalyRateChart.tsx`
**Purpose:** Line chart of Anomaly Rate over time with threshold markers.

**Used by:** `AnomalyDetectionPage.tsx`

**Reusable?** Page-specific.

---

#### `src/components/charts/SeverityDistributionChart.tsx`
**Purpose:** Bar or histogram showing distribution of anomaly severity scores (how many anomalies at each severity level).

**Used by:** `AnomalyDetectionPage.tsx`

**Reusable?** Page-specific.

---

#### `src/components/charts/MultiDomainTrendChart.tsx`
**Purpose:** A chart that overlays trend lines from multiple domains on one axis — used for cross-domain correlation visualization.

**Used by:** `CrossDomainIntelligencePage.tsx`

**Reusable?** Yes — driven entirely by props.

---

#### `src/components/charts/CrossDomainChart.tsx`
**Purpose:** Scatter plot or dual-axis chart showing the relationship between a driver KPI (e.g., Engagement) and a target KPI (e.g., Customer Satisfaction).

**Used by:** `CrossDomainIntelligencePage.tsx`

**Reusable?** Yes — takes driver/target data as props.

---

#### `src/components/charts/index.ts`
**Purpose:** A "barrel" export file. Instead of importing each chart individually from its own file path, other files can do:
```ts
import { RevenueTrendChart, ForecastBandChart } from '../charts';
```

**Used by:** Pages that import multiple charts at once.

**Reusable?** It's not a component — it's an organizational tool.

---

### Chat Components (`src/components/chat/`)

These five components together build the AI Chatbot page UI. They are only used by `AIChatbotPage.tsx`.

---

#### `src/components/chat/ChatHistorySidebar.tsx`
**Purpose:** The left panel in the chat page. Shows a list of previous chat sessions that the user can click to revisit.

**Used by:** `AIChatbotPage.tsx`

**Reusable?** Could be reused if a second chat interface existed, but currently page-specific.

---

#### `src/components/chat/MessageBubble.tsx`
**Purpose:** Renders one chat message — either a user message (right-aligned, blue) or an assistant message (left-aligned, dark). Includes timestamp and status indicator.

**Used by:** `AIChatbotPage.tsx`

**Reusable?** Yes — any future chat interface would use this same component.

---

#### `src/components/chat/MarkdownRenderer.tsx`
**Purpose:** Renders the AI's response text as formatted Markdown (bold, bullet points, code blocks, headers). Without this, the AI's `##` and `**` would show as raw characters.

**Used by:** `MessageBubble.tsx`

**Reusable?** Yes — can be used anywhere Markdown text needs to render.

---

#### `src/components/chat/SuggestedPrompts.tsx`
**Purpose:** Shows clickable suggestion chips like "What's the revenue trend?" when the chat is empty. Tapping one fills the input automatically.

**Used by:** `AIChatbotPage.tsx`

**Reusable?** Page-specific.

---

#### `src/components/chat/TypingIndicator.tsx`
**Purpose:** The animated "..." dots that appear while the AI is generating a response.

**Used by:** `AIChatbotPage.tsx`

**Reusable?** Yes — usable in any chat interface.

---

### Pages (`src/pages/`)

Each page is one full screen. Pages are never imported by other pages.

---

#### `src/pages/OverviewPage.tsx`
**Purpose:** The main dashboard landing page (route: `/`). Shows:
- Dynamic greeting ("Good morning / afternoon / evening, Executive")
- Live date (updates every minute)
- Domain health summary cards (one per domain)
- Recent anomaly alerts
- Pending AI recommendations
- Quick navigation to all dashboard sections

**Components used:**
- `DomainHealthCard`, `AnomalyAlertCard`, `RecommendationCard`
- `Button`, `SectionHeader`

**Data from:** `mockData.ts`

**Page-specific?** Yes.

---

#### `src/pages/FinancialDashboardPage.tsx`
**Purpose:** Full Financial domain analysis. Shows KPI summary cards for Revenue, Net Income, Cash Flow, Profit Margin, and Expenditure, plus four charts.

**Components used:**
- `KpiSummaryCard`, `ChartCard`
- `RevenueTrendChart`, `NetIncomeChart`, `CashFlowChart`, `ProfitMarginChart`

**Data from:** `financialData.ts`

**Page-specific?** Yes.

---

#### `src/pages/WorkforceDashboardPage.tsx`
**Purpose:** Workforce domain analysis — Productivity, Engagement, Attendance, Overtime, Turnover, Training.

**Components used:**
- `KpiSummaryCard`, `ChartCard`
- `WorkforceProductivityChart`, `EngagementTrainingChart`, `AttendanceChart`

**Data from:** `workforceData.ts`

**Page-specific?** Yes.

---

#### `src/pages/CustomerExperienceDashboardPage.tsx`
**Purpose:** Customer Experience domain — CSAT, NPS, Churn Rate, Response Time, Support Tickets.

**Components used:**
- `KpiSummaryCard`
- `CSATNPSChart`, `ChurnRateChart`

**Data from:** `customerExperienceData.ts`

**Page-specific?** Yes.

---

#### `src/pages/ProjectDashboardPage.tsx`
**Purpose:** Project Management domain — Completion Rate, Budget Variance, Delayed Task Rate, Budget Spent.

**Components used:**
- `KpiSummaryCard`
- `ProjectCompletionChart`, `BudgetVarianceChart`

**Data from:** `projectData.ts`

**Page-specific?** Yes.

---

#### `src/pages/ForecastingDashboardPage.tsx`
**Purpose:** Predictive analytics page. Shows AI-generated 6-month forecasts for any selected KPI in any domain. Features domain/KPI selector tabs, confidence bands, and seasonality charts.

**Components used:**
- `ForecastBandChart`, `SeasonalityChart`, `ChartCard`

**Data from:** `forecastData.ts`

**Page-specific?** Yes.

---

#### `src/pages/AnomalyDetectionPage.tsx`
**Purpose:** Lists all detected statistical anomalies across all domains. Users can filter by domain. Shows anomaly rate chart and severity distribution.

**Components used:**
- `AnomalyAlertCard`
- `AnomalyRateChart`, `SeverityDistributionChart`

**Data from:** `anomalyData.ts`

**Page-specific?** Yes.

---

#### `src/pages/CrossDomainIntelligencePage.tsx`
**Purpose:** Shows statistically-proven correlations between KPIs across different domains (e.g., Engagement → NPS). Users can explore driver/target KPI pairs.

**Components used:**
- `InsightCard`
- `CrossDomainChart`, `MultiDomainTrendChart`

**Data from:** `chartData.ts` (cross-domain correlation results)

**Page-specific?** Yes.

---

#### `src/pages/AIRecommendationsPage.tsx`
**Purpose:** Lists AI-generated strategic recommendations based on KPI patterns. Features: filter by domain/priority, export to CSV/PDF, share link copy, business impact tags.

**Components used:**
- `RecommendationCard`, `Badge`, `Button`

**Data from:** `aiRecommendationsData.ts`

**Page-specific?** Yes.

---

#### `src/pages/ReportsDashboardPage.tsx`
**Purpose:** Report generation hub. Users can view executive summaries, export tabs as PDF, download CSV, and view individual recent reports in a modal.

**Components used:**
- `Button`, `Badge`, `SectionHeader`
- Internal modals: `ViewReportModal`, `ExportModal`

**Data from:** `reportData.ts`

**Page-specific?** Yes.

---

#### `src/pages/AIChatbotPage.tsx`
**Purpose:** Interactive AI chatbot interface. Users can ask questions about their KPI data in natural language. Uses mock responses during development; can connect to real `/api/chat` in production.

**Components used:**
- `ChatHistorySidebar`, `MessageBubble`, `MarkdownRenderer`
- `SuggestedPrompts`, `TypingIndicator`

**Hook used:** `useChatApi.ts`

**Page-specific?** Yes.

---

#### `src/pages/PlaceholderPage.tsx`
**Purpose:** A fallback "404 — Page not found" screen shown when the user navigates to a URL that doesn't exist in the router.

**Used by:** Router's `*` wildcard route.

**Page-specific?** Yes (fallback only).

---

### Store (Global State)

---

#### `src/store/index.ts`
**Purpose:** Manages all global application state using Zustand. Contains two stores:

**`useUIStore`** — Controls UI behavior:
| State | What it does |
|---|---|
| `sidebarCollapsed` | Is the sidebar narrow or wide? |
| `activeModal` | Which modal (if any) is open? |
| `notificationPanelOpen` | Is the notification tray visible? |

**`useFilterStore`** — Controls dashboard filtering:
| State | What it does |
|---|---|
| `activeDomain` | Which domain is selected ('All', 'Financial', ...) |
| `activeKpi` | Which specific KPI is highlighted |
| `dateRange` | The start/end month for data display |

**Why Zustand?** Unlike `useState` which lives inside one component, Zustand state is shared across ALL components without passing props. The Sidebar can tell the TopBar to collapse — they don't need to be connected by a parent.

**Used by:** `TopBar.tsx`, `Sidebar.tsx`, `AppShell.tsx`, and every page that uses filters.

---

### Hooks

---

#### `src/hooks/useChatApi.ts`
**Purpose:** Custom hook that manages the entire chat API communication flow:
1. Maintains the list of chat messages (`useState`)
2. Sends user messages to `/api/chat` (real backend)
3. Falls back to intelligent mock responses if the API is unreachable
4. Manages the "typing" state while waiting for a response

**Why a hook?** The chatbot page (`AIChatbotPage.tsx`) would be 400+ lines if all this logic lived inside it. Extracting to a hook keeps the page clean and the logic testable separately.

**Used by:** `AIChatbotPage.tsx`

**Reusable?** Yes — any component that needs chat functionality can use this hook.

---

### Types

---

#### `src/types/kpi.ts`
**Purpose:** Defines the shape of all KPI-related data:

| Type | Describes |
|---|---|
| `DomainType` | The four business domains |
| `KpiDataPoint` | One month of one KPI measurement |
| `AnomalyRecord` | A data point flagged as anomalous |
| `AnomalySummary` | Summary stats for one KPI's anomalies |
| `ForecastPoint` | One forecast data point with confidence bands |
| `CrossDomainInsight` | One correlation finding between two KPIs |
| `DomainHealthSummary` | High-level health status for one domain |

**Used by:** `data/*.ts`, `components/cards/*.tsx`, `components/charts/*.tsx`, many pages.

---

#### `src/types/ui.ts`
**Purpose:** Defines the shape of UI-related data:

| Type | Describes |
|---|---|
| `NavItem` | One sidebar navigation link |
| `FilterState` | The active filter selections |
| `TabItem` | One tab in a tab-bar |
| `Notification` | One notification bell item |
| `AlertItem` | One alert in the overview panel |
| `RecommendationItem` | One recommendation summary |

**Used by:** `store/index.ts`, `components/layout/Sidebar.tsx`, `TopBar.tsx`.

---

#### `src/types/chat.ts`
**Purpose:** Defines the shape of all chat-related data:

| Type | Describes |
|---|---|
| `ChatMessage` | One message (user or AI) in the conversation |
| `DataCard` | An optional structured data table attached to an AI response |
| `SuggestedPrompt` | One clickable suggestion chip |
| `ChatSession` | One saved conversation in the history sidebar |

**Used by:** `hooks/useChatApi.ts`, `components/chat/*.tsx`, `AIChatbotPage.tsx`.

---

### Constants

---

#### `src/constants/routes.ts`
**Purpose:** Exports `ROUTES` — a single object with all URL paths as named constants.

**Why?** Instead of writing `'/domain/financial'` as a string in 10 different files, you write `ROUTES.FINANCIAL` everywhere. If you rename the URL, you change it in ONE place only.

**Used by:** `routes/index.tsx`, `components/layout/Sidebar.tsx`, all pages that use `useNavigate`.

---

#### `src/constants/domains.ts`
**Purpose:** Exports two constants:

- `DOMAIN_CONFIG` — Tailwind color classes for each domain (so Financial is always green, Workforce always rose/red, etc.)
- `DOMAIN_KPIS` — The list of KPI names for each domain

**Used by:** All domain dashboard pages, `Sidebar.tsx`, filter components.

---

### Utils

---

#### `src/utils/cn.ts`
**Purpose:** A helper function that merges Tailwind CSS class names cleanly. Uses `clsx` (handles conditionals) + `tailwind-merge` (removes conflicting classes).

**Example:**
```ts
cn('px-4 py-2', isActive && 'bg-blue-500', 'bg-red-500')
// → 'px-4 py-2 bg-blue-500'  (bg-red-500 removed because bg-blue-500 wins)
```

**Used by:** Nearly every component in the project.

**Reusable?** Yes — this is a standard pattern in all modern React/Tailwind projects.

---

#### `src/utils/formatters.ts`
**Purpose:** Pure formatting functions that convert raw numbers and dates into human-readable strings.

| Function | What it does |
|---|---|
| `formatCurrency(1500000)` | → `"$1.5M"` |
| `formatPercent(-3.2)` | → `"-3.2%"` |
| `formatNumber(45000)` | → `"45.0K"` |
| `formatDate('2026-07-01')` | → `"Jul 2026"` |
| `formatShortDate('2026-07-01')` | → `"Jul 1"` |
| `formatScore(4.2, 5)` | → `"4.2 / 5"` |
| `getDeltaClass(-5)` | → `"text-accent-red"` (red for negative) |
| `getDeltaArrow(3)` | → `"↑"` |
| `getSeverityLabel(6)` | → `"critical"` |

**Used by:** `KpiSummaryCard.tsx`, `TopBar.tsx`, `AnomalyAlertCard.tsx`, and many pages.

**Reusable?** Yes — completely decoupled from React.

---

### Data Files (`src/data/`)

---

#### `src/data/financialData.ts`
**Purpose:** Mock financial KPI data — 33 months (Jan 2025 – Sep 2027) of Revenue, Net Income, Cash Flow, Profit Margin, Expenditure, and Debt-to-Equity.

**Used by:** `FinancialDashboardPage.tsx`, charts in `charts/`

---

#### `src/data/workforceData.ts`
**Purpose:** Mock workforce KPI data — Productivity Score, Engagement, Attendance, Overtime, Turnover, Training Hours.

**Used by:** `WorkforceDashboardPage.tsx`

---

#### `src/data/customerExperienceData.ts`
**Purpose:** Mock customer experience data — CSAT, NPS, Churn Rate, Response Time, Support Tickets, Severity.

**Used by:** `CustomerExperienceDashboardPage.tsx`

---

#### `src/data/projectData.ts`
**Purpose:** Mock project management data — Completion %, Budget Variance, Delayed Task Rate, Budget Spent.

**Used by:** `ProjectDashboardPage.tsx`

---

#### `src/data/forecastData.ts`
**Purpose:** Mock forecast model output data — actual values + predicted trend + confidence bands (yhat_lower, yhat_upper) + seasonal component for all KPIs.

**Used by:** `ForecastingDashboardPage.tsx`, `ForecastBandChart.tsx`, `SeasonalityChart.tsx`

---

#### `src/data/anomalyData.ts`
**Purpose:** Mock anomaly detection results — each record shows which KPI, which month, severity score, actual vs expected value, and whether it's a trend anomaly.

**Used by:** `AnomalyDetectionPage.tsx`, `AnomalyAlertCard.tsx`

---

#### `src/data/chartData.ts`
**Purpose:** Pre-processed chart-ready arrays derived from raw data — cross-domain correlation results, multi-domain trend arrays.

**Used by:** `CrossDomainIntelligencePage.tsx`, `MultiDomainTrendChart.tsx`

---

#### `src/data/aiRecommendationsData.ts`
**Purpose:** Mock AI-generated recommendations — each with priority level, affected domains, business impact, suggested action, driver/target KPI information.

**Used by:** `AIRecommendationsPage.tsx`, `RecommendationCard.tsx`

---

#### `src/data/reportData.ts`
**Purpose:** Mock report data — executive summary (with dynamic date), KPI highlights by domain, insights, recent reports list.

**Used by:** `ReportsDashboardPage.tsx`

---

#### `src/data/mockData.ts`
**Purpose:** Quick summary data used specifically by the Overview page — domain health summaries, recent alerts list, recent recommendations list. Avoids importing the full domain datasets on the overview.

**Used by:** `OverviewPage.tsx`

---

## Part 4 — Overall Data Flow

```
STEP 1: Browser opens index.html
        ↓
        index.html is a blank page with just:
          <div id="root"></div>
          <script type="module" src="/src/main.tsx">

STEP 2: main.tsx runs
        ↓
        createRoot(document.getElementById('root'))
          .render(<StrictMode><App /></StrictMode>)

        → React starts rendering inside the blank div

STEP 3: App.tsx renders
        ↓
        <QueryClientProvider>        ← enables data caching for the whole app
          <AppRouter />              ← plugs in routing
        </QueryClientProvider>

STEP 4: AppRouter (routes/index.tsx) reads the URL
        ↓
        URL = "/"  →  matched to OverviewPage
        URL = "/domain/financial"  →  matched to FinancialDashboardPage
        (etc.)

        All routes are CHILDREN of AppShell, so:
          <AppShell>
            <OverviewPage />    ← fills the <Outlet> slot
          </AppShell>

STEP 5: AppShell renders the full layout
        ↓
        <div className="app-layout">
          <Sidebar />           ← left nav — reads store for collapse state
          <div className="main">
            <TopBar />          ← top bar — live clock, filters, notifications
            <main>
              <Outlet />        ← THIS is where the current page renders
            </main>
            <Footer />
          </div>
        </div>

STEP 6: OverviewPage renders (inside the Outlet)
        ↓
        1. useState initializes: now = new Date()
        2. useEffect starts a 60-second timer to update 'now'
        3. Reads data from mockData.ts (imported directly — no fetch needed)
        4. Renders:
             <h1>{getGreeting()}, Executive</h1>
             <p>{formatFullDate(now)}</p>
             {domainHealthData.map(domain => <DomainHealthCard ... />)}
             {recentAlerts.map(alert => <AnomalyAlertCard ... />)}
             ...

STEP 7: DomainHealthCard renders (inside OverviewPage)
        ↓
        Receives data as props
        Uses formatCurrency(), getDeltaClass() from utils/formatters.ts
        Uses cn() from utils/cn.ts to build Tailwind classes
        Renders a styled card with sparkline bars

STEP 8: User sees the complete dashboard
        ↓
        Sidebar shows all nav links
        TopBar shows live date/time
        Overview shows 4 domain health cards + alerts + recommendations

STEP 9: User clicks "Financial" in sidebar
        ↓
        Sidebar calls: navigate(ROUTES.FINANCIAL)
        React Router changes URL to /domain/financial
        AppShell stays in place (sidebar + topbar + footer don't re-render)
        ONLY the <Outlet> changes → now shows <FinancialDashboardPage>

STEP 10: FinancialDashboardPage renders
         ↓
         Imports FINANCIAL_KPI_SUMMARIES from financialData.ts
         Renders KpiSummaryCard for each KPI
         Renders RevenueTrendChart, NetIncomeChart, CashFlowChart, ProfitMarginChart
         Each chart receives its data array as a prop and renders a Recharts chart
```

### The Key Insight

```
main.tsx
  └── App.tsx (QueryClientProvider)
        └── AppRouter (routes/index.tsx)
              └── AppShell (layout frame — always visible)
                    ├── Sidebar (navigation)
                    ├── TopBar (header)
                    ├── Outlet ← ONLY THIS changes when you navigate
                    │     └── [CurrentPage]
                    │           ├── components/cards/
                    │           ├── components/charts/
                    │           ├── components/ui/
                    │           └── data/*.ts (static mock data)
                    └── Footer
```

The store (`store/index.ts`) floats above all of this — any component at any level can read from or write to the store without passing props through layers.

---

## Part 5 — Where to Add New Features

| What you want to do | Where to put it |
|---|---|
| Add a new page | `pages/NewPage.tsx` + `routes/index.tsx` (add one line) + `constants/routes.ts` (add path) |
| Add a new chart | `components/charts/NewChart.tsx` + `charts/index.ts` (export it) |
| Add a data card | `components/cards/NewCard.tsx` |
| Add a button style | `components/ui/Button.tsx` (add new variant) |
| Add a new KPI type | `types/kpi.ts` |
| Add a formatting function | `utils/formatters.ts` |
| Add a new route constant | `constants/routes.ts` + `routes/index.tsx` |
| Add global state | `store/index.ts` (add field to existing store) |
| Extract complex logic from a component | `hooks/useXxx.ts` |
