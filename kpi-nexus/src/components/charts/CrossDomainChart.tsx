import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, LabelList,
  ReferenceLine,
} from 'recharts';
import { crossDomainData } from '../../data/chartData';

interface Props { height?: number; compact?: boolean }

const DOMAIN_COLORS: Record<string, string> = {
  Financial:             '#10B981',
  Workforce:             '#F43F5E',
  'Customer Experience': '#6366F1',
  Project:               '#F59E0B',
};

const chartData = crossDomainData.map(d => ({
  id: d.id,
  label: `${d.driverKpi.replace(/_/g, ' ')} → ${d.targetKpi.replace(/_/g, ' ')}`,
  shortLabel: `${d.driverKpi.split('_').slice(-1)[0]} → ${d.targetKpi.split('_').slice(-1)[0]}`,
  correlation: d.correlation * (d.direction === 'negative' ? -1 : 1),
  driverDomain: d.driverDomain,
  targetDomain: d.targetDomain,
  summary: d.summary,
  alertText: d.alertText,
  action: d.recommendedAction,
}));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const entry = chartData.find(d => d.shortLabel === label || d.label === label);
  const val: number = payload[0]?.value;
  return (
    <div className="bg-[#1A1D27] border border-white/10 rounded-lg p-3 shadow-xl text-xs max-w-xs">
      <p className="text-white font-semibold mb-1">{entry?.driverDomain} → {entry?.targetDomain}</p>
      <p className="text-white/50 mb-2 text-[11px]">{label}</p>
      <div className="flex items-center gap-2 mb-2">
        <span className={`font-bold text-sm ${val >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          r = {val >= 0 ? '+' : ''}{val.toFixed(2)}
        </span>
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${Math.abs(val) >= 0.6 ? 'bg-red-500/20 text-red-400' : Math.abs(val) >= 0.4 ? 'bg-amber-500/20 text-amber-400' : 'bg-white/10 text-white/50'}`}>
          {Math.abs(val) >= 0.6 ? 'Strong' : Math.abs(val) >= 0.4 ? 'Moderate' : 'Weak'}
        </span>
      </div>
      {entry?.summary && <p className="text-white/60 leading-relaxed">{entry.summary}</p>}
    </div>
  );
};

export default function CrossDomainChart({ height = 320, compact = false }: Props) {
  const displayData = compact ? chartData.slice(0, 6) : chartData;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={displayData}
        layout="vertical"
        margin={{ top: 8, right: 56, bottom: 0, left: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" horizontal={false} />
        <XAxis type="number" tick={{ fill: '#ffffff60', fontSize: 11 }} axisLine={false} tickLine={false}
          domain={[-1, 1]} tickFormatter={v => v.toFixed(1)} />
        <YAxis type="category" dataKey="shortLabel" tick={{ fill: '#ffffff70', fontSize: 10 }}
          axisLine={false} tickLine={false} width={compact ? 90 : 130} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff06' }} />
        <Legend
          payload={[
            { value: 'Positive Correlation', type: 'rect', id: 'pos', color: '#2ECFCF' },
            { value: 'Negative Correlation', type: 'rect', id: 'neg', color: '#F05252' },
          ]}
          wrapperStyle={{ fontSize: 12, color: '#ffffff80', paddingTop: 8 }}
        />
        <ReferenceLine x={0} stroke="#ffffff30" strokeWidth={1} />
        <ReferenceLine x={0.5}  stroke="#2ECFCF20" strokeDasharray="3 3" />
        <ReferenceLine x={-0.5} stroke="#F0525220" strokeDasharray="3 3" />

        <Bar dataKey="correlation" name="Correlation (r)" radius={[0,3,3,0]} barSize={18}>
          <LabelList
            dataKey="correlation"
            position="right"
            style={{ fill: '#ffffff80', fontSize: 10 }}
            formatter={(v: number) => `r=${v >= 0 ? '+' : ''}${v.toFixed(2)}`}
          />
          {displayData.map(d => (
            <Cell
              key={d.id}
              fill={d.correlation >= 0
                ? `${DOMAIN_COLORS[d.driverDomain] ?? '#2ECFCF'}`
                : '#F05252'}
              opacity={Math.abs(d.correlation) * 0.8 + 0.2}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
