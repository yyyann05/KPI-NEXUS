import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceDot,
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

export default function EngagementTrainingChart({ height = 300 }: Props) {
  const anomalies = workforceData.filter(d => d.isAnomaly);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={workforceData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false} interval={2} />
        <YAxis tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false}
          tickFormatter={v => `${v}%`} width={42} domain={[40, 100]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#ffffff80', paddingTop: 8 }} iconType="circle" iconSize={8} />
        <Bar dataKey="training" name="Training Completion %" fill="#A78BFA" opacity={0.5} radius={[2,2,0,0]} barSize={6} />
        <Line type="monotone" dataKey="engagement" name="Engagement %"
          stroke="#F59E0B" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#F59E0B', strokeWidth: 0 }} />
        {anomalies.map(d => (
          <ReferenceDot key={d.month} x={d.month} y={d.engagement} r={6} fill="#F05252" stroke="#0F1117" strokeWidth={2} />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
