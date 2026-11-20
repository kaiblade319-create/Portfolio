'use client';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { WARM_PAPER_THEME } from '@/lib/theme-config';

export interface TelemetryPoint {
  label: string;
  primary: number;
  baseline: number;
}

export interface BenchmarkModel {
  model: string;
  primaryScore: number;
  secondaryScore: number;
}

export function TelemetryAreaChart({
  data,
  primaryName,
  baselineName,
  unit,
  accentColor,
}: {
  data: TelemetryPoint[];
  primaryName: string;
  baselineName: string;
  unit: string;
  accentColor?: string;
}) {
  const preset = WARM_PAPER_THEME;
  const gradientId = `area-sage-${accentColor ?? 'default'}`;

  return (
    <div className="w-full h-[260px] min-w-[200px]">
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={preset.chartPrimary} stopOpacity={0.22} />
              <stop offset="95%" stopColor={preset.chartPrimary} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(35, 39, 36, 0.09)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: '#3D433E', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#5D655E', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}${unit}`}
          />
          <Tooltip
            formatter={(val: number) => `${val}${unit}`}
            contentStyle={{
              backgroundColor: 'rgba(250, 247, 240, 0.98)',
              borderColor: preset.tooltipBorder,
              borderRadius: '10px',
              fontSize: '12px',
              color: '#232724',
              boxShadow: '0 10px 24px rgba(35, 39, 36, 0.12)',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#3D433E', paddingTop: '8px' }} />
          <Area
            type="monotone"
            dataKey="primary"
            name={primaryName}
            stroke={preset.chartPrimary}
            strokeWidth={2.5}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="baseline"
            name={baselineName}
            stroke="#8B9188"
            strokeDasharray="4 4"
            strokeWidth={1.8}
            fillOpacity={0}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BenchmarkBarChart({
  models,
  primaryMetricName,
  secondaryMetricName,
}: {
  models: BenchmarkModel[];
  primaryMetricName: string;
  secondaryMetricName: string;
  accentColor?: string;
}) {
  const preset = WARM_PAPER_THEME;

  return (
    <div className="w-full h-[260px] min-w-[200px]">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={models} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(35, 39, 36, 0.09)" vertical={false} />
          <XAxis
            dataKey="model"
            interval={0}
            tick={{ fill: '#3D433E', fontSize: 10 }}
            tickFormatter={(value: string) =>
              value.length > 14 ? value.replace(' Regression', ' Reg.') : value
            }
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#5D655E', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            formatter={(val: number) => `${val}%`}
            contentStyle={{
              backgroundColor: 'rgba(250, 247, 240, 0.98)',
              borderColor: preset.tooltipBorder,
              borderRadius: '10px',
              fontSize: '12px',
              color: '#232724',
              boxShadow: '0 10px 24px rgba(35, 39, 36, 0.12)',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#3D433E', paddingTop: '8px' }} />
          <Bar
            dataKey="primaryScore"
            name={primaryMetricName}
            fill={preset.chartPrimary}
            radius={[4, 4, 0, 0]}
            isAnimationActive={false}
          />
          <Bar
            dataKey="secondaryScore"
            name={secondaryMetricName}
            fill={preset.chartSecondary}
            radius={[4, 4, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
