'use client';

import { Run } from '@/types/run';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { useState } from 'react';

interface RunChartProps {
  runs: Run[];
}

export default function RunChart({ runs }: RunChartProps) {
  const [chartType, setChartType] = useState<'distance' | 'pace'>('distance');

  const last30DaysData = () => {
    const today = new Date();
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(today, 29 - i);
      const dayRuns = runs.filter(run => 
        run.date >= startOfDay(date) && run.date <= endOfDay(date)
      );
      
      const totalDistance = dayRuns.reduce((sum, run) => sum + run.distance, 0);
      const avgPace = dayRuns.length > 0 
        ? dayRuns.reduce((sum, run) => sum + run.pace, 0) / dayRuns.length
        : 0;

      return {
        date: format(date, 'MMM dd'),
        distance: totalDistance,
        pace: avgPace,
        runs: dayRuns.length,
      };
    });

    return last30Days;
  };

  const chartData = last30DaysData();

  const formatPace = (pace: number) => {
    if (!pace || !isFinite(pace)) return '0:00';
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
          Progress (Last 30 Days)
        </h2>
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg">
          <button
            onClick={() => setChartType('distance')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              chartType === 'distance'
                ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Distance
          </button>
          <button
            onClick={() => setChartType('pace')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              chartType === 'pace'
                ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Pace
          </button>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'distance' ? (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fontSize: 12 }}
                label={{ value: 'Miles', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value: number) => [value.toFixed(1), 'Miles']}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem'
                }}
              />
              <Bar dataKey="distance" fill="#3b82f6" />
            </BarChart>
          ) : (
            <LineChart data={chartData.filter(d => d.pace > 0)}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fontSize: 12 }}
                tickFormatter={formatPace}
                label={{ value: 'Pace (min/mi)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value: number) => [formatPace(value), 'Pace/mi']}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="pace" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}