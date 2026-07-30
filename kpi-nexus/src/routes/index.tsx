import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { OverviewPage } from '../pages/OverviewPage';
import { PlaceholderPage } from '../pages/PlaceholderPage';
import { ROUTES } from '../constants/routes';
import AnomalyDetectionPage from '../pages/AnomalyDetectionPage';
import CrossDomainIntelligencePage from '../pages/CrossDomainIntelligencePage';
import AIChatbotPage from '../pages/AIChatbotPage';
import FinancialDashboardPage from '../pages/FinancialDashboardPage';
import WorkforceDashboardPage from '../pages/WorkforceDashboardPage';
import CustomerExperienceDashboardPage from '../pages/CustomerExperienceDashboardPage';
import ProjectDashboardPage from '../pages/ProjectDashboardPage';
import ForecastingDashboardPage from '../pages/ForecastingDashboardPage';
import ReportsDashboardPage from '../pages/ReportsDashboardPage';
import AIRecommendationsPage from '../pages/AIRecommendationsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: ROUTES.FINANCIAL.slice(1), element: <FinancialDashboardPage /> },
      { path: ROUTES.WORKFORCE.slice(1), element: <WorkforceDashboardPage /> },
      { path: ROUTES.CUSTOMER.slice(1), element: <CustomerExperienceDashboardPage /> },
      { path: ROUTES.PROJECT.slice(1), element: <ProjectDashboardPage /> },
      { path: ROUTES.FORECAST.slice(1), element: <ForecastingDashboardPage /> },
      { path: ROUTES.ANOMALIES.slice(1), element: <AnomalyDetectionPage /> },
      { path: ROUTES.CROSS_DOMAIN.slice(1), element: <CrossDomainIntelligencePage /> },
      { path: ROUTES.AI_RECOMMENDATIONS.slice(1), element: <AIRecommendationsPage /> },
      { path: ROUTES.REPORTS.slice(1), element: <ReportsDashboardPage /> },
      { path: ROUTES.AI_CHATBOT.slice(1), element: <AIChatbotPage /> },
      { path: '*', element: <PlaceholderPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
