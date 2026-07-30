import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  DollarSign,
  Users,
  HeartHandshake,
  FolderKanban,
  TrendingUp,
  AlertTriangle,
  Network,
  Sparkles,
  FileText,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Activity,
} from 'lucide-react';
import logoSrc from '../../assets/logo.svg';
import { cn } from '../../utils/cn';
import { useUIStore } from '../../store';
import { ROUTES } from '../../constants/routes';
import { RECENT_ALERTS } from '../../data/mockData';

interface NavGroup {
  label?: string;
  items: {
    label: string;
    path: string;
    icon: React.ElementType;
    badge?: number;
  }[];
}

const criticalAlerts = RECENT_ALERTS.filter((a) => a.severityScore >= 5).length;

const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      { label: 'Dashboard Home', path: ROUTES.HOME, icon: LayoutDashboard },
    ],
  },
  {
    label: 'Domains',
    items: [
      { label: 'Financial', path: ROUTES.FINANCIAL, icon: DollarSign },
      { label: 'Workforce', path: ROUTES.WORKFORCE, icon: Users },
      { label: 'Customer Experience', path: ROUTES.CUSTOMER, icon: HeartHandshake },
      { label: 'Projects', path: ROUTES.PROJECT, icon: FolderKanban },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { label: 'Forecasting', path: ROUTES.FORECAST, icon: TrendingUp },
      { label: 'Anomaly Detection', path: ROUTES.ANOMALIES, icon: AlertTriangle, badge: criticalAlerts },
      { label: 'Cross-Domain Intel', path: ROUTES.CROSS_DOMAIN, icon: Network },
      { label: 'AI Recommendations', path: ROUTES.AI_RECOMMENDATIONS, icon: Sparkles, badge: 2 },
    ],
  },
  {
    label: 'Tools',
    items: [
      { label: 'Reports', path: ROUTES.REPORTS, icon: FileText },
      { label: 'AI Chatbot', path: ROUTES.AI_CHATBOT, icon: MessageSquare },
    ],
  },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const location = useLocation();

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-bg-surface border-r border-bg-border transition-all duration-250 ease-in-out shrink-0 relative',
        sidebarCollapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className={cn(
        'flex items-center border-b border-bg-border shrink-0 overflow-hidden',
        sidebarCollapsed ? 'justify-center px-0 h-14' : 'px-3 h-20'
      )}>
        {sidebarCollapsed ? (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-blue/15 border border-accent-blue/30">
            <Activity className="h-4 w-4 text-accent-blue" />
          </div>
        ) : (
          <img
            src={logoSrc}
            alt="KPI Nexus"
            className="animate-fade-in h-16 w-auto max-w-full object-contain"
          />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 space-y-0.5">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi} className={gi > 0 ? 'mt-3' : ''}>
            {group.label && !sidebarCollapsed && (
              <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                {group.label}
              </p>
            )}
            {group.label && sidebarCollapsed && <div className="mx-3 mb-1 border-t border-bg-border" />}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === ROUTES.HOME
                  ? location.pathname === ROUTES.HOME
                  : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={cn(
                    'flex items-center mx-2 rounded-lg transition-all duration-150 group relative',
                    sidebarCollapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2 gap-3',
                    isActive
                      ? 'bg-bg-elevated text-text-primary'
                      : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                  )}
                >
                  {/* Active left accent */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 bg-accent-blue rounded-full" />
                  )}

                  <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-accent-blue' : '')} />

                  {!sidebarCollapsed && (
                    <span className="text-sm font-medium truncate flex-1">{item.label}</span>
                  )}

                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={cn(
                        'flex items-center justify-center rounded-full text-[10px] font-bold bg-accent-red text-white',
                        sidebarCollapsed
                          ? 'absolute top-1 right-1 h-4 w-4'
                          : 'h-4 min-w-[16px] px-1'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Collapsed tooltip */}
                  {sidebarCollapsed && (
                    <div className="pointer-events-none absolute left-full ml-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      <div className="bg-bg-elevated border border-bg-border rounded-lg px-3 py-1.5 text-xs text-text-primary whitespace-nowrap shadow-elevated">
                        {item.label}
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className="ml-2 text-accent-red font-bold">{item.badge}</span>
                        )}
                      </div>
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-bg-border p-2">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center h-9 rounded-lg text-text-muted hover:text-text-secondary hover:bg-bg-elevated transition-all duration-150"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : (
            <span className="flex items-center gap-2 text-xs">
              <ChevronLeft className="h-4 w-4" />
              <span>Collapse</span>
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
