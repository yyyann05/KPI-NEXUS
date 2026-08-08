export function formatCurrency(value: number, decimals = 1): string {
  if (Math.abs(value) >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(decimals)}B`;
  }
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(decimals)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(decimals)}K`;
  }
  return `$${value.toFixed(decimals)}`;
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number, decimals = 0): string {
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toFixed(decimals);
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatScore(value: number, max = 5): string {
  return `${value.toFixed(1)} / ${max}`;
}

export function getDeltaClass(delta: number, invertColors = false): string {
  if (delta === 0) return 'text-text-secondary';
  const isPositive = invertColors ? delta < 0 : delta > 0;
  return isPositive ? 'text-accent-teal' : 'text-accent-red';
}

export function getDeltaArrow(delta: number): string {
  if (delta === 0) return '—';
  return delta > 0 ? '↑' : '↓';
}

// Severity scores in the real dataset range from ~17 to ~97 (0–100 scale)
// Critical ≥ 40 (High/Critical escalation tier), Warning ≥ 20, Info < 20
export function getSeverityLabel(severity: number): 'critical' | 'warning' | 'info' {
  if (severity >= 40) return 'critical';
  if (severity >= 20) return 'warning';
  return 'info';
}
