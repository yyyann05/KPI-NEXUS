import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { financialData } from '../../data/chartData';

interface Props { height?: number }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1A1D27] border border-white/10 rounded-lg p-3 shadow-xl text-xs">
      <p className="text-white/60 mb-2 font-medium">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          <span className="text-white/70">{p.name}:</span>
          <span className="text-white font-semibold">${(p.value / 1000).toFixed(1)}K</span>
        </div>
      ))}
    </div>
  );
};

export default function CashFlowChart({ height = 300 }: Props) {
  const avgCF = financialData.reduce((s, d) => s + d.cashFlow, 0) / financialData.length;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={financialData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="cfGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#2ECFCF" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#2ECFCF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#F05252" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#F05252" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false} interval={2} />
        <YAxis tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false}
          tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} width={52} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#ffffff80', paddingTop: 8 }} iconType="circle" iconSize={8} />
        <ReferenceLine
          y={avgCF}
          stroke="#ffffff30"
          strokeDasharray="4 4"
          label={{ value: 'Avg', position: 'insideRight', fill: '#ffffff40', fontSize: 10 }}
        />
        <Area
          type="monotone"
          dataKey="expenditure"
          name="Expenditure"
          stroke="#F05252"
          strokeWidth={1.5}
          fill="url(#expGrad)"
          dot={false}
        />
        <Area
          type="monotone"
          dataKey="cashFlow"
          name="Cash Flow"
          stroke="#2ECFCF"
          strokeWidth={2.5}
          fill="url(#cfGrad)"
          dot={false}
          activeDot={{ r: 5, fill: '#2ECFCF', strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
