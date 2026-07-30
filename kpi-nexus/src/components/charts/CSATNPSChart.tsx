import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceDot,
} from 'recharts';
import { cxData } from '../../data/chartData';

interface Props { height?: number; showTickets?: boolean }

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
            {p.name === 'CSAT %' ? `${p.value.toFixed(1)}%`
              : p.name === 'NPS' ? p.value
              : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function CSATNPSChart({ height = 300, showTickets = false }: Props) {
  const anomalies = cxData.filter(d => d.isAnomaly);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={cxData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false} interval={2} />
        <YAxis yAxisId="csat" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false}
          tickFormatter={v => `${v}%`} width={42} domain={[40, 100]} />
        <YAxis yAxisId="nps" orientation="right" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false}
          width={36} domain={[0, 80]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#ffffff80', paddingTop: 8 }} iconType="circle" iconSize={8} />

        {showTickets && (
          <Bar yAxisId="nps" dataKey="supportTickets" name="Support Tickets" fill="#F05252" opacity={0.25} barSize={5} radius={[2,2,0,0]} />
        )}

        <Line yAxisId="csat" type="monotone" dataKey="csat" name="CSAT %"
          stroke="#6366F1" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#6366F1', strokeWidth: 0 }} />
        <Line yAxisId="nps" type="monotone" dataKey="nps" name="NPS"
          stroke="#2ECFCF" strokeWidth={2} strokeDasharray="5 3" dot={false} activeDot={{ r: 4 }} />

        {anomalies.map(d => (
          <ReferenceDot key={d.month} yAxisId="csat" x={d.month} y={d.csat}
            r={6} fill="#F05252" stroke="#0F1117" strokeWidth={2} />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
