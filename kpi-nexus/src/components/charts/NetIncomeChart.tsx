import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine,
} from 'recharts';
import { financialData } from '../../data/chartData';

interface Props { height?: number }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value;
  return (
    <div className="bg-[#1A1D27] border border-white/10 rounded-lg p-3 shadow-xl text-xs">
      <p className="text-white/60 mb-1 font-medium">{label}</p>
      <p className="text-white font-semibold text-sm">${(val / 1000).toFixed(1)}K</p>
      {payload[0]?.payload?.isAnomaly && (
        <p className="text-red-400 mt-1">⚠ Anomaly detected</p>
      )}
    </div>
  );
};

const THRESHOLD = 60000;

export default function NetIncomeChart({ height = 300 }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={financialData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false} interval={2} />
        <YAxis tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false}
          tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} width={52} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff08' }} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#ffffff80', paddingTop: 8 }} />
        <ReferenceLine
          y={THRESHOLD}
          stroke="#F05252"
          strokeDasharray="4 4"
          label={{ value: 'Min Target', position: 'insideRight', fill: '#F05252', fontSize: 10 }}
        />
        <Bar dataKey="netIncome" name="Net Income" radius={[3, 3, 0, 0]} maxBarSize={20}>
          {financialData.map((entry) => (
            <Cell
              key={entry.month}
              fill={entry.isAnomaly ? '#F05252' : entry.netIncome >= THRESHOLD ? '#2ECFCF' : '#A78BFA'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
