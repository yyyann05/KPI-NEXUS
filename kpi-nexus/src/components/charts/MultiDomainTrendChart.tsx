import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceDot, Legend,
} from 'recharts';
import { MULTI_DOMAIN_TREND } from '../../data/mockData';
import { DOMAIN_CONFIG } from '../../constants/domains';

const DOMAIN_KEYS = [
  { key: 'financial', label: 'Financial', color: DOMAIN_CONFIG['Financial'].color },
  { key: 'workforce', label: 'Workforce', color: DOMAIN_CONFIG['Workforce'].color },
  { key: 'customer', label: 'Customer Exp.', color: DOMAIN_CONFIG['Customer Experience'].color },
  { key: 'project', label: 'Projects', color: DOMAIN_CONFIG['Project'].color },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-elevated border border-bg-border rounded-xl p-3 shadow-modal text-xs min-w-[160px]">
      <p className="font-semibold text-text-primary mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4 py-0.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-text-secondary">{entry.name}</span>
          </div>
          <span className="font-semibold text-text-primary">{entry.value}</span>
        </div>
      ))}
      {payload[0]?.payload?.anomaly && (
        <p className="text-accent-red text-[10px] mt-1.5 border-t border-bg-border pt-1.5">⚠ Anomaly detected</p>
      )}
    </div>
  );
}

function CustomLegend({ hiddenKeys, toggle }: { hiddenKeys: Set<string>; toggle: (k: string) => void }) {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
      {DOMAIN_KEYS.map((d) => (
        <button
          key={d.key}
          onClick={() => toggle(d.key)}
          className="flex items-center gap-1.5 text-[11px] transition-opacity duration-150"
          style={{ opacity: hiddenKeys.has(d.key) ? 0.35 : 1 }}
        >
          <span className="h-3 w-3 rounded-sm" style={{ background: d.color }} />
          <span className="text-text-secondary">{d.label}</span>
        </button>
      ))}
    </div>
  );
}

export function MultiDomainTrendChart() {
  const [hiddenKeys, setHiddenKeys] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setHiddenKeys((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const anomalyPoints = MULTI_DOMAIN_TREND.filter((d) => d.anomaly);

  return (
    <div className="h-full flex flex-col">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={MULTI_DOMAIN_TREND} margin={{ top: 4, right: 8, bottom: 4, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2E3250" strokeOpacity={0.6} />
          <XAxis
            dataKey="month"
            tick={{ fill: '#4E5378', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            interval={2}
          />
          <YAxis
            tick={{ fill: '#4E5378', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            domain={[40, 120]}
          />
          <Tooltip content={<CustomTooltip />} />

          {DOMAIN_KEYS.map((d) => (
            <Line
              key={d.key}
              type="monotone"
              dataKey={d.key}
              name={d.label}
              stroke={d.color}
              strokeWidth={hiddenKeys.has(d.key) ? 0 : 2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          ))}

          {/* Anomaly markers */}
          {anomalyPoints.map((point) =>
            DOMAIN_KEYS.filter((d) => !hiddenKeys.has(d.key)).map((d) => (
              <ReferenceDot
                key={`${point.month}-${d.key}`}
                x={point.month}
                y={(point as any)[d.key]}
                r={4}
                fill="#F05252"
                stroke="#F05252"
                strokeWidth={2}
              />
            ))
          )}
        </LineChart>
      </ResponsiveContainer>
      <CustomLegend hiddenKeys={hiddenKeys} toggle={toggle} />
    </div>
  );
}
