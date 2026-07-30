import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceDot,
} from 'recharts';
import { financialData } from '../../data/chartData';

interface Props { height?: number }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const val: number = payload[0]?.value;
  const color = val >= 80 ? '#2ECFCF' : val >= 70 ? '#F59E0B' : '#F05252';
  return (
    <div className="bg-[#1A1D27] border border-white/10 rounded-lg p-3 shadow-xl text-xs">
      <p className="text-white/60 mb-1 font-medium">{label}</p>
      <p className="font-semibold text-sm" style={{ color }}>{val.toFixed(1)}%</p>
      <p className="text-white/50 mt-1">{val >= 80 ? 'Healthy' : val >= 70 ? 'Watch' : 'Critical'}</p>
    </div>
  );
};

export default function ProfitMarginChart({ height = 280 }: Props) {
  const anomalies = financialData.filter(d => d.isAnomaly);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={financialData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false} interval={2} />
        <YAxis tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false}
          tickFormatter={v => `${v}%`} width={42} domain={[50, 120]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#ffffff80', paddingTop: 8 }} iconType="circle" iconSize={8} />
        <ReferenceLine y={80} stroke="#2ECFCF" strokeDasharray="4 4" label={{ value: '80% Target', position: 'insideTopRight', fill: '#2ECFCF80', fontSize: 10 }} />
        <ReferenceLine y={70} stroke="#F05252" strokeDasharray="4 4" label={{ value: '70% Min', position: 'insideBottomRight', fill: '#F0525280', fontSize: 10 }} />
        <Line
          type="monotone"
          dataKey="profitMargin"
          name="Profit Margin %"
          stroke="#A78BFA"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5, fill: '#A78BFA', strokeWidth: 0 }}
        />
        {anomalies.map(d => (
          <ReferenceDot key={d.month} x={d.month} y={d.profitMargin} r={6} fill="#F05252" stroke="#0F1117" strokeWidth={2} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
