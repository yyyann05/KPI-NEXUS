import { Activity, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-bg-border bg-bg-surface px-6 py-3 shrink-0">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Left */}
        <div className="flex items-center gap-2">
          <Activity className="h-3.5 w-3.5 text-accent-blue" />
          <span className="text-xs font-semibold text-text-secondary">KPI Nexus</span>
          <span className="text-text-muted text-xs">·</span>
          <span className="text-xs text-text-muted">Tencent AI Hackathon 2026</span>
        </div>

        {/* Center — Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-teal animate-pulse-soft" />
            <span className="text-[11px] text-text-muted">AI Models Online</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
            <span className="text-[11px] text-text-muted">Data: Jul 30, 2026</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
            <span className="text-[11px] text-text-muted">Prophet Forecasting Active</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-text-muted">v1.0.0</span>
          <a
            href="#"
            className="flex items-center gap-1 text-[11px] text-text-muted hover:text-text-secondary transition-colors"
          >
            Docs
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
