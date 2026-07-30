import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts';
import { anomalyRateData } from '../../data/chartData';

interface Props { height?: number }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1A1D27] border border-white/10 rounded-lg p-3 shadow-xl text-xs">
      <p className="text-white/60 mb-2 font-medium">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-white/70">{p.name}:</span>
          <span className="text-white font-semibold">
            {p.name === 'Total Anomaly %' ? `${p.value.toFixed(1)}%` : `${(p.value * 100).toFixed(1)}%`}
          </span>
        </div>
      ))}
    </div>
  );
};

const DOMAIN_COLORS: Record<string, string> = {
  financial:   '#10B981',
  workforce:   '#F43F5E',
  customerExp: '#6366F1',
  project:     '#F59E0B',
};

export default function AnomalyRateChart({ height = 300 }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={anomalyRateData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false} interval={2} />
        <YAxis yAxisId="rate" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false}
          tickFormatter={v => `${v}%`} width={42} />
        <YAxis yAxisId="domain" orientation="right" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false}
          tickFormatter={v => `${(v * 100).toFixed(0)}%`} width={40} domain={[0, 0.35]} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff08' }} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#ffffff80', paddingTop: 8 }} iconType="circle" iconSize={8} />

        <Bar yAxisId="rate" dataKey="total" name="Total Anomaly %" radius={[3,3,0,0]} maxBarSize={16}>
          {anomalyRateData.map(d => (
            <Cell key={d.month} fill={d.total > 10 ? '#F05252' : d.total > 0 ? '#F59E0B' : '#ffffff20'} />
          ))}
        </Bar>
        <Line yAxisId="domain" type="monotone" dataKey="financial"   name="Financial"    stroke={DOMAIN_COLORS.financial}   strokeWidth={1.5} dot={false} />
        <Line yAxisId="domain" type="monotone" dataKey="workforce"   name="Workforce"    stroke={DOMAIN_COLORS.workforce}   strokeWidth={1.5} dot={false} />
        <Line yAxisId="domain" type="monotone" dataKey="customerExp" name="Customer Exp" stroke={DOMAIN_COLORS.customerExp} strokeWidth={1.5} dot={false} />
        <Line yAxisId="domain" type="monotone" dataKey="project"     name="Project"      stroke={DOMAIN_COLORS.project}     strokeWidth={1.5} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
