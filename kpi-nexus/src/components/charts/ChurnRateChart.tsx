import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceDot,
} from 'recharts';
import { cxData } from '../../data/chartData';

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
          <span className="text-white font-semibold">{p.value.toFixed(1)}{p.name.includes('%') ? '%' : ''}</span>
        </div>
      ))}
    </div>
  );
};

export default function ChurnRateChart({ height = 280 }: Props) {
  const anomalies = cxData.filter(d => d.isAnomaly);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={cxData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="churnGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#F05252" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#F05252" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="resGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#F59E0B" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false} interval={2} />
        <YAxis yAxisId="churn" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false}
          tickFormatter={v => `${v}%`} width={42} domain={[0, 7]} />
        <YAxis yAxisId="res" orientation="right" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false}
          tickFormatter={v => `${v}h`} width={36} domain={[0, 10]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#ffffff80', paddingTop: 8 }} iconType="circle" iconSize={8} />
        <ReferenceLine yAxisId="churn" y={3.5} stroke="#F05252" strokeDasharray="4 4"
          label={{ value: '3.5% Alert', position: 'insideTopRight', fill: '#F0525280', fontSize: 10 }} />
        <Area yAxisId="churn" type="monotone" dataKey="churnRate" name="Churn Rate %"
          stroke="#F05252" strokeWidth={2.5} fill="url(#churnGrad)" dot={false}
          activeDot={{ r: 5, fill: '#F05252', strokeWidth: 0 }} />
        <Area yAxisId="res" type="monotone" dataKey="resolutionTime" name="Avg Resolution (h)"
          stroke="#F59E0B" strokeWidth={2} fill="url(#resGrad)" dot={false}
          activeDot={{ r: 4, fill: '#F59E0B', strokeWidth: 0 }} />
        {anomalies.map(d => (
          <ReferenceDot key={d.month} yAxisId="churn" x={d.month} y={d.churnRate}
            r={6} fill="#F05252" stroke="#0F1117" strokeWidth={2} />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
