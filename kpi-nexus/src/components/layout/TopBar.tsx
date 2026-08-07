import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Download,
  RefreshCw,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useUIStore, useFilterStore } from '../../store';
import { NOTIFICATIONS } from '../../data/mockData';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatShortDate } from '../../utils/formatters';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Dashboard Home',
  '/domain/financial': 'Financial Intelligence',
  '/domain/workforce': 'Workforce Intelligence',
  '/domain/customer-experience': 'Customer Experience',
  '/domain/project': 'Project Intelligence',
  '/forecast': 'AI Forecasting',
  '/anomalies': 'Anomaly Detection',
  '/cross-domain': 'Cross-Domain Intelligence',
  '/ai-recommendations': 'AI Recommendations',
  '/reports': 'Reports',
  '/ai-chatbot': 'AI Chatbot',
};

function formatLiveDate(d: Date) {
  return d.toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function TopBar() {
  const location = useLocation();
  const { notificationPanelOpen, toggleNotificationPanel, closeNotificationPanel } = useUIStore();
  const { dateRange, setDateRange } = useFilterStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Live clock — updates every minute
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;
  const pageTitle = PAGE_TITLES[location.pathname] ?? 'KPI Nexus';

  // Close panels on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        closeNotificationPanel();
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [closeNotificationPanel]);

  return (
    <header className="h-14 flex items-center justify-between px-5 bg-bg-surface border-b border-bg-border shrink-0 relative z-30">
      {/* Left — Page Title */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-sm font-semibold text-text-primary leading-none">{pageTitle}</h1>
          <p className="text-[11px] text-text-muted mt-0.5">
            {dateRange.start} — {dateRange.end} · Last updated: {formatLiveDate(now)}
          </p>
        </div>
      </div>

      {/* Right — Controls */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:text-text-secondary hover:bg-bg-elevated transition-all duration-150"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Date Range Selector */}
        <div className="hidden md:flex items-center gap-1 bg-bg-elevated border border-bg-border rounded-lg px-3 py-1.5">
          <span className="text-xs text-text-muted">Period:</span>
          <select
            className="bg-transparent text-xs text-text-secondary focus:outline-none cursor-pointer"
            value={`${dateRange.start}|${dateRange.end}`}
            onChange={(e) => {
              const [start, end] = e.target.value.split('|');
              setDateRange({ start, end });
            }}
          >
            <option value="2025-01|2027-09">All Data (Jan 2025 – Sep 2027)</option>
            <option value="2025-01|2025-12">Full Year 2025</option>
            <option value="2026-01|2026-12">Full Year 2026</option>
            <option value="2027-01|2027-09">YTD 2027</option>
            <option value="2026-10|2027-09">Last 12 Months</option>
            <option value="2025-01|2026-12">2025 – 2026</option>
          </select>
          <ChevronDown className="h-3 w-3 text-text-muted" />
        </div>

        {/* Refresh */}
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:text-text-secondary hover:bg-bg-elevated transition-all duration-150">
          <RefreshCw className="h-3.5 w-3.5" />
        </button>

        {/* Export */}
        <Button variant="secondary" size="sm" leftIcon={<Download className="h-3.5 w-3.5" />} className="hidden md:inline-flex">
          Export
        </Button>

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={toggleNotificationPanel}
            className={cn(
              'relative flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-150',
              notificationPanelOpen
                ? 'bg-bg-elevated text-text-primary'
                : 'text-text-muted hover:text-text-secondary hover:bg-bg-elevated'
            )}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent-red text-[9px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {notificationPanelOpen && (
            <div className="animate-fade-in absolute right-0 top-10 w-80 bg-bg-surface border border-bg-border rounded-xl shadow-modal overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-bg-border">
                <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
                <Badge variant="critical" label={`${unreadCount} new`} size="sm" dot />
              </div>
              <div className="max-h-80 overflow-y-auto">
                {NOTIFICATIONS.map((notif) => (
                  <NotificationItem key={notif.id} notification={notif} />
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-bg-border">
                <button className="text-xs text-accent-blue hover:text-blue-400 transition-colors">
                  View all notifications →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className={cn(
              'flex items-center gap-2 h-8 rounded-lg px-2 transition-all duration-150',
              profileOpen
                ? 'bg-bg-elevated text-text-primary'
                : 'text-text-muted hover:bg-bg-elevated hover:text-text-secondary'
            )}
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-blue/20 border border-accent-blue/30">
              <User className="h-3.5 w-3.5 text-accent-blue" />
            </div>
            <span className="hidden md:block text-xs font-medium text-text-secondary">CEO</span>
            <ChevronDown className="h-3 w-3" />
          </button>

          {profileOpen && (
            <div className="animate-fade-in absolute right-0 top-10 w-48 bg-bg-surface border border-bg-border rounded-xl shadow-modal overflow-hidden py-1">
              <div className="px-3 py-2 border-b border-bg-border mb-1">
                <p className="text-xs font-semibold text-text-primary">Executive User</p>
                <p className="text-[10px] text-text-muted">CEO · KPI Nexus</p>
              </div>
              {[
                { icon: User, label: 'Profile' },
                { icon: Settings, label: 'Settings' },
                { icon: LogOut, label: 'Sign Out' },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-all duration-150"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function NotificationItem({ notification }: { notification: typeof NOTIFICATIONS[0] }) {
  const SEVERITY_STYLES = {
    critical: 'bg-red-500/15 border-l-2 border-accent-red',
    warning: 'bg-amber-500/10 border-l-2 border-accent-amber',
    info: 'bg-blue-500/10 border-l-2 border-accent-blue',
  };

  const badgeVariant = notification.severity === 'critical' ? 'critical'
    : notification.severity === 'warning' ? 'warning' : 'info';

  return (
    <div
      className={cn(
        'px-4 py-3 cursor-pointer hover:bg-bg-elevated transition-all duration-150',
        notification.severity && SEVERITY_STYLES[notification.severity],
        notification.read && 'opacity-60'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold text-text-primary">{notification.title}</p>
        {!notification.read && <span className="h-2 w-2 rounded-full bg-accent-blue shrink-0 mt-0.5" />}
      </div>
      <p className="text-[11px] text-text-secondary mt-0.5 leading-relaxed">{notification.message}</p>
      <div className="flex items-center justify-between mt-1.5">
        {notification.severity && (
          <Badge variant={badgeVariant} label={notification.severity} size="sm" />
        )}
        <span className="text-[10px] text-text-muted">{formatShortDate(notification.timestamp)}</span>
      </div>
    </div>
  );
}
