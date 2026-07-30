import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { workforceData } from '../../data/chartData';

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
          <span className="text-white font-semibold">{p.value.toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
};

export default function AttendanceChart({ height = 280 }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={workforceData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#2ECFCF" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#2ECFCF" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="turnGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#F05252" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#F05252" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false} interval={2} />
        <YAxis yAxisId="att" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false}
          tickFormatter={v => `${v}%`} width={42} domain={[80, 100]} />
        <YAxis yAxisId="turn" orientation="right" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false}
          tickFormatter={v => `${v}%`} width={36} domain={[0, 10]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#ffffff80', paddingTop: 8 }} iconType="circle" iconSize={8} />
        <ReferenceLine yAxisId="att" y={95} stroke="#2ECFCF50" strokeDasharray="4 4"
          label={{ value: '95% Target', position: 'insideTopRight', fill: '#2ECFCF60', fontSize: 10 }} />
        <Area yAxisId="att" type="monotone" dataKey="attendance" name="Attendance %"
          stroke="#2ECFCF" strokeWidth={2.5} fill="url(#attGrad)" dot={false}
          activeDot={{ r: 5, fill: '#2ECFCF', strokeWidth: 0 }} />
        <Area yAxisId="turn" type="monotone" dataKey="turnover" name="Turnover %"
          stroke="#F05252" strokeWidth={2} fill="url(#turnGrad)" dot={false}
          activeDot={{ r: 4, fill: '#F05252', strokeWidth: 0 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
