import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ReferenceLine, ReferenceDot,
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
          <span className={`font-semibold ${p.value >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {p.value >= 0 ? '+' : ''}{p.value.toFixed(1)}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default function BudgetVarianceChart({ height = 300 }: Props) {
  const anomalies = projectData.filter(d => d.isAnomaly);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={projectData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false} interval={2} />
        <YAxis tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false}
          tickFormatter={v => `${v >= 0 ? '+' : ''}${v}%`} width={48} domain={[-25, 15]} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff08' }} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#ffffff80', paddingTop: 8 }} iconType="circle" iconSize={8} />
        <ReferenceLine y={0} stroke="#ffffff30" strokeWidth={1} />
        <ReferenceLine y={10} stroke="#2ECFCF40" strokeDasharray="3 3" label={{ value: '10% Alert', position: 'insideTopRight', fill: '#2ECFCF60', fontSize: 10 }} />
        <ReferenceLine y={-10} stroke="#F0525240" strokeDasharray="3 3" label={{ value: '-10% Alert', position: 'insideBottomRight', fill: '#F0525260', fontSize: 10 }} />
        <Bar dataKey="budgetVariance" name="Budget Variance %" radius={[3,3,0,0]} barSize={10} maxBarSize={14}>
          {projectData.map(d => (
            <Cell
              key={d.month}
              fill={d.isAnomaly ? '#F05252' : d.budgetVariance >= 0 ? '#2ECFCF' : '#F59E0B'}
            />
          ))}
        </Bar>
        <Line type="monotone" dataKey="qualityScore" name="Quality Score %"
          stroke="#A78BFA" strokeWidth={2} strokeDasharray="5 3" dot={false}
          activeDot={{ r: 4, fill: '#A78BFA', strokeWidth: 0 }}
          yAxisId={undefined}
        />
        {anomalies.map(d => (
          <ReferenceDot key={d.month} x={d.month} y={d.budgetVariance}
            r={7} fill="#F05252" stroke="#0F1117" strokeWidth={2} />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
