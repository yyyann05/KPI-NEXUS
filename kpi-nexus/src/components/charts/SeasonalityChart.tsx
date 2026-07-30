import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { seasonalityData } from '../../data/chartData';

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

export default function SeasonalityChart({ height = 320 }: Props) {
  // Convert to positive scale for radar (shift by +7 so min = ~0)
  const radarData = seasonalityData.map(d => ({
    month: d.month,
    Financial:        d.financial + 7,
    Workforce:        d.workforce + 7,
    'Customer Exp':   d.customerExp + 7,
    Project:          d.project + 7,
    // Keep originals for tooltip
    _financial: d.financial,
    _workforce: d.workforce,
    _customerExp: d.customerExp,
    _project: d.project,
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={radarData} margin={{ top: 16, right: 24, bottom: 0, left: 24 }}>
        <PolarGrid stroke="#ffffff15" />
        <PolarAngleAxis dataKey="month" tick={{ fill: '#ffffff70', fontSize: 11 }} />
        <PolarRadiusAxis angle={90} domain={[0, 14]} tick={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#ffffff80', paddingTop: 8 }} iconType="circle" iconSize={8} />
        <Radar name="Financial"     dataKey="Financial"    stroke="#10B981" fill="#10B981" fillOpacity={0.15} strokeWidth={2} />
        <Radar name="Workforce"     dataKey="Workforce"    stroke="#F43F5E" fill="#F43F5E" fillOpacity={0.12} strokeWidth={2} />
        <Radar name="Customer Exp"  dataKey="Customer Exp" stroke="#6366F1" fill="#6366F1" fillOpacity={0.12} strokeWidth={2} />
        <Radar name="Project"       dataKey="Project"      stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.12} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
