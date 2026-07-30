import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine, Cell, ReferenceDot,
} from 'recharts';
import { projectData } from '../../data/chartData';

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
            {p.name.includes('Rate') || p.name.includes('Score') ? `${p.value.toFixed(1)}%` : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function ProjectCompletionChart({ height = 300 }: Props) {
  const anomalies = projectData.filter(d => d.isAnomaly);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={projectData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false} interval={2} />
        <YAxis yAxisId="pct" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false}
          tickFormatter={v => `${v}%`} width={42} domain={[40, 100]} />
        <YAxis yAxisId="count" orientation="right" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false}
          width={36} domain={[0, 45]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#ffffff80', paddingTop: 8 }} iconType="circle" iconSize={8} />
        <ReferenceLine yAxisId="pct" y={80} stroke="#F59E0B50" strokeDasharray="4 4"
          label={{ value: '80% Target', position: 'insideTopRight', fill: '#F59E0B80', fontSize: 10 }} />
        <Bar yAxisId="count" dataKey="activeProjects" name="Active Projects" opacity={0.35} radius={[2,2,0,0]} barSize={6}>
          {projectData.map(d => (
            <Cell key={d.month} fill={d.isAnomaly ? '#F05252' : '#F59E0B'} />
          ))}
        </Bar>
        <Line yAxisId="pct" type="monotone" dataKey="completionRate" name="Completion Rate"
          stroke="#F59E0B" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#F59E0B', strokeWidth: 0 }} />
        <Line yAxisId="pct" type="monotone" dataKey="onTimeRate" name="On-Time Rate"
          stroke="#2ECFCF" strokeWidth={2} strokeDasharray="5 3" dot={false} activeDot={{ r: 4 }} />
        {anomalies.map(d => (
          <ReferenceDot key={d.month} yAxisId="pct" x={d.month} y={d.completionRate}
            r={6} fill="#F05252" stroke="#0F1117" strokeWidth={2} />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
