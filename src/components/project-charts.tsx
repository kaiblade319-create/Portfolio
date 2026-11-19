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
import { SIGNAL_ORANGE_THEME } from '@/lib/theme-config';

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
  const preset = SIGNAL_ORANGE_THEME;
  const gradientId = `area-orange-${accentColor ?? 'default'}`;

  return (
    <div className="w-full h-[260px] min-w-[200px]">
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={preset.chartPrimary} stopOpacity={0.38} />
              <stop offset="95%" stopColor={preset.chartPrimary} stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.08)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: '#D4D4D8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#A1A1AA', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}${unit}`}
          />
          <Tooltip
            formatter={(val: number) => `${val}${unit}`}
            contentStyle={{
              backgroundColor: 'rgba(14, 14, 18, 0.96)',
              borderColor: preset.tooltipBorder,
              borderRadius: '10px',
              fontSize: '12px',
              color: '#FAFAFA',
              boxShadow: '0 14px 32px rgba(0, 0, 0, 0.7)',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#D4D4D8', paddingTop: '8px' }} />
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
            stroke="#71717A"
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
  const preset = SIGNAL_ORANGE_THEME;

  return (
    <div className="w-full h-[260px] min-w-[200px]">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={models} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.08)" vertical={false} />
          <XAxis
            dataKey="model"
            interval={0}
            tick={{ fill: '#D4D4D8', fontSize: 10 }}
            tickFormatter={(value: string) =>
              value.length > 14 ? value.replace(' Regression', ' Reg.') : value
            }
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#A1A1AA', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            formatter={(val: number) => `${val}%`}
            contentStyle={{
              backgroundColor: 'rgba(14, 14, 18, 0.96)',
              borderColor: preset.tooltipBorder,
              borderRadius: '10px',
              fontSize: '12px',
              color: '#FAFAFA',
              boxShadow: '0 14px 32px rgba(0, 0, 0, 0.7)',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#D4D4D8', paddingTop: '8px' }} />
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
