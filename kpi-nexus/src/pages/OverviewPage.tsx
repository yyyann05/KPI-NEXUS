import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, AlertTriangle, Network, Sparkles,
  ArrowRight, BarChart3, Activity,
} from 'lucide-react';
import { DomainHealthCard } from '../components/cards/DomainHealthCard';
import { KpiSummaryCard } from '../components/cards/KpiSummaryCard';
import { AnomalyAlertCard } from '../components/cards/AnomalyAlertCard';
import { InsightCard } from '../components/cards/InsightCard';
import { RecommendationCard } from '../components/cards/RecommendationCard';
import { MultiDomainTrendChart } from '../components/charts/MultiDomainTrendChart';
import { Card } from '../components/ui/Card';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Footer } from '../components/layout/Footer';
import {
  DOMAIN_HEALTH,
  QUICK_KPIS,
  RECENT_ALERTS,
  TOP_INSIGHTS,
  RECENT_RECOMMENDATIONS,
} from '../data/mockData';

export function OverviewPage() {
  const navigate = useNavigate();
  const criticalAlerts = RECENT_ALERTS.filter((a) => a.severityScore >= 5);
  const pendingRecs = RECENT_RECOMMENDATIONS.filter((r) => r.status === 'pending');

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 p-6 space-y-6">

        {/* ── Welcome Banner ─────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-text-primary">
              Good morning, Executive
            </h1>
            <p className="text-sm text-text-muted mt-0.5">
              Thursday, July 30, 2026 · Here's your KPI intelligence summary
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-bg-elevated border border-bg-border rounded-lg px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-accent-teal animate-pulse-soft" />
              <span className="text-xs text-text-secondary">4 domains monitored</span>
            </div>
            <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/25 rounded-lg px-3 py-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-accent-red" />
              <span className="text-xs text-accent-red font-semibold">{criticalAlerts.length} critical alerts</span>
            </div>
          </div>
        </div>

        {/* ── Domain Health Cards ────────────────────────────── */}
        <section>
          <SectionHeader
            title="Domain Health Overview"
            subtitle="Click any domain for full details"
            icon={<Activity className="h-4 w-4" />}
            className="mb-4"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {DOMAIN_HEALTH.map((d) => (
              <DomainHealthCard key={d.domain} data={d} />
            ))}
          </div>
        </section>

        {/* ── Main Content Grid ──────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Left — Trend Chart + Insights (2/3) */}
          <div className="xl:col-span-2 space-y-6">

            {/* KPI Trend Chart */}
            <Card
              title="Cross-Domain KPI Trends"
              subtitle="Normalized 0–100 index per domain · Jan 2025 – Jul 2026"
              accentColor="#4F8EF7"
              actions={
                <Button
                  variant="ghost"
                  size="sm"
                  rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                  onClick={() => navigate('/forecast')}
                >
                  Forecast
                </Button>
              }
            >
              <div className="h-64">
                <MultiDomainTrendChart />
              </div>
            </Card>

            {/* Quick KPI Metrics */}
            <section>
              <SectionHeader
                title="Key Performance Metrics"
                subtitle="Month-over-month vs. prior period"
                icon={<BarChart3 className="h-4 w-4" />}
                className="mb-4"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {QUICK_KPIS.map((kpi) => (
                  <KpiSummaryCard
                    key={kpi.label}
                    label={kpi.label}
                    value={kpi.value}
                    delta={kpi.delta}
                    invertColors={kpi.invertColors}
                  />
                ))}
              </div>
            </section>

            {/* Cross-Domain Insights */}
            <section>
              <SectionHeader
                title="Cross-Domain Intelligence"
                subtitle="AI-discovered causal relationships"
                icon={<Network className="h-4 w-4 text-accent-purple" />}
                rightContent={
                  <Button
                    variant="outline"
                    size="sm"
                    rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                    onClick={() => navigate('/cross-domain')}
                  >
                    View All
                  </Button>
                }
                className="mb-4"
              />
              <div className="space-y-3">
                {TOP_INSIGHTS.map((insight, i) => (
                  <InsightCard key={i} insight={insight} compact />
                ))}
              </div>
            </section>
          </div>

          {/* Right Panel (1/3) */}
          <div className="space-y-6">

            {/* Anomaly Alert Feed */}
            <section>
              <SectionHeader
                title="Active Anomaly Alerts"
                icon={<AlertTriangle className="h-4 w-4 text-accent-red" />}
                rightContent={
                  <div className="flex items-center gap-2">
                    <Badge variant="critical" label={`${RECENT_ALERTS.length}`} size="sm" dot />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate('/anomalies')}
                      className="text-accent-blue text-[11px]"
                    >
                      All →
                    </Button>
                  </div>
                }
                className="mb-3"
              />
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {RECENT_ALERTS.slice(0, 6).map((alert) => (
                  <AnomalyAlertCard key={alert.id} alert={alert} compact />
                ))}
              </div>
            </section>

            {/* AI Recommendations */}
            <section>
              <SectionHeader
                title="AI Recommendations"
                icon={<Sparkles className="h-4 w-4 text-accent-purple" />}
                rightContent={
                  <div className="flex items-center gap-2">
                    <Badge variant="purple" label={`${pendingRecs.length} pending`} size="sm" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate('/ai-recommendations')}
                      className="text-accent-blue text-[11px]"
                    >
                      All →
                    </Button>
                  </div>
                }
                className="mb-3"
              />
              <div className="space-y-3">
                {RECENT_RECOMMENDATIONS.slice(0, 3).map((rec) => (
                  <RecommendationCard key={rec.id} recommendation={rec} compact />
                ))}
              </div>
            </section>

            {/* Quick Navigation */}
            <section>
              <SectionHeader title="Quick Navigate" className="mb-3" />
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Forecasting', path: '/forecast', color: '#A78BFA' },
                  { label: 'Anomalies', path: '/anomalies', color: '#F05252' },
                  { label: 'Cross-Domain', path: '/cross-domain', color: '#4F8EF7' },
                  { label: 'AI Chatbot', path: '/ai-chatbot', color: '#2ECFCF' },
                ].map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className="flex items-center justify-between gap-2 rounded-xl border border-bg-border bg-bg-elevated hover:bg-bg-border px-3 py-2.5 text-left transition-all duration-150 group"
                    style={{ borderLeftColor: item.color, borderLeftWidth: 2 }}
                  >
                    <span className="text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                      {item.label}
                    </span>
                    <ArrowRight className="h-3 w-3 text-text-muted group-hover:translate-x-0.5 transition-transform duration-150" />
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
