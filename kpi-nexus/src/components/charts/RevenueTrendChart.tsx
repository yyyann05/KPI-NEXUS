import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceDot,
} from 'recharts';
import { financialData } from '../../data/chartData';

interface Props {
  showExpenditure?: boolean;
  height?: number;
  data?: typeof financialData;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1A1D27] border border-white/10 rounded-lg p-3 shadow-xl text-xs">
      <p className="text-white/60 mb-2 font-medium">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          <span className="text-white/70">{p.name}:</span>
          <span className="text-white font-semibold">
            ${(p.value / 1000).toFixed(1)}K
          </span>
        </div>
      ))}
    </div>
  );
};

export default function RevenueTrendChart({ showExpenditure = true, height = 320, data }: Props) {
  const chartData = data ?? financialData;
  const anomalies = chartData.filter(d => d.isAnomaly);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={chartData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#4F8EF7" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#4F8EF7" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: '#ffffff60', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          interval={2}
        />
        <YAxis
          tick={{ fill: '#ffffff60', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => `$${(v / 1000).toFixed(0)}K`}
          width={52}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 12, color: '#ffffff80', paddingTop: 8 }}
          iconType="circle"
          iconSize={8}
        />

        {showExpenditure && (
          <Bar dataKey="expenditure" name="Expenditure" fill="#A78BFA" opacity={0.5} radius={[2, 2, 0, 0]} barSize={6} />
        )}
        <Line
          type="monotone"
          dataKey="revenue"
          name="Revenue"
          stroke="#4F8EF7"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5, fill: '#4F8EF7', strokeWidth: 0 }}
        />
        <Line
          type="monotone"
          dataKey="netIncome"
          name="Net Income"
          stroke="#2ECFCF"
          strokeWidth={2}
          strokeDasharray="5 3"
          dot={false}
          activeDot={{ r: 4, fill: '#2ECFCF', strokeWidth: 0 }}
        />

        {anomalies.map(d => (
          <ReferenceDot
            key={d.month}
            x={d.month}
            y={d.revenue}
            r={5}
            fill="#F05252"
            stroke="none"
            label={{ value: '⚠', position: 'top', fill: '#F05252', fontSize: 10 }}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
