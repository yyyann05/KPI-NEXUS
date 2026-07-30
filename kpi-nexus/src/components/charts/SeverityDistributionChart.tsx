import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, LabelList,
} from 'recharts';
import { severityData } from '../../data/chartData';

interface Props { height?: number; mode?: 'horizontal' | 'vertical' }

const DOMAIN_COLORS: Record<string, string> = {
  'Financial':           '#10B981',
  'Workforce':           '#F43F5E',
  'Customer Experience': '#6366F1',
  'Project':             '#F59E0B',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const entry = severityData.find(d => d.kpi === label || d.kpi.replace(/_/g, ' ') === label);
  return (
    <div className="bg-[#1A1D27] border border-white/10 rounded-lg p-3 shadow-xl text-xs max-w-[220px]">
      <p className="text-white font-semibold mb-1">{label?.replace(/_/g, ' ')}</p>
      {entry && <p className="text-white/50 mb-2">{entry.domain}</p>}
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-white/70">{p.name}:</span>
          <span className="text-white font-semibold">
            {p.name === 'Avg Severity' ? p.value.toFixed(2) : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const formatted = severityData
  .sort((a, b) => b.avgSeverity - a.avgSeverity)
  .map(d => ({ ...d, kpiLabel: d.kpi.replace(/_/g, ' ') }));

export default function SeverityDistributionChart({ height = 340, mode = 'horizontal' }: Props) {
  if (mode === 'vertical') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={formatted} layout="vertical" margin={{ top: 8, right: 40, bottom: 0, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" horizontal={false} />
          <XAxis type="number" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 3]} />
          <YAxis type="category" dataKey="kpiLabel" tick={{ fill: '#ffffff70', fontSize: 10 }} axisLine={false} tickLine={false} width={140} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff08' }} />
          <Legend wrapperStyle={{ fontSize: 12, color: '#ffffff80', paddingTop: 8 }} />
          <Bar dataKey="avgSeverity" name="Avg Severity" radius={[0,3,3,0]} barSize={18}>
            <LabelList dataKey="avgSeverity" position="right" style={{ fill: '#ffffff80', fontSize: 10 }} formatter={(v: number) => v.toFixed(2)} />
            {formatted.map(d => (
              <Cell key={d.kpi} fill={DOMAIN_COLORS[d.domain] ?? '#4F8EF7'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={formatted} margin={{ top: 8, right: 16, bottom: 60, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" vertical={false} />
        <XAxis dataKey="kpiLabel" tick={{ fill: '#ffffff60', fontSize: 10, angle: -35, textAnchor: 'end' }}
          axisLine={false} tickLine={false} interval={0} />
        <YAxis tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false}
          domain={[0, 3]} tickFormatter={v => v.toFixed(1)} width={36} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff08' }} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#ffffff80', paddingTop: 8 }} />
        <Bar dataKey="avgSeverity" name="Avg Anomaly Severity" radius={[3,3,0,0]} maxBarSize={28}>
          {formatted.map(d => (
            <Cell key={d.kpi} fill={DOMAIN_COLORS[d.domain] ?? '#4F8EF7'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
