'use client';

import { Run, RunStats } from '@/types/run';
import { useMemo } from 'react';

interface RunStatsProps {
  runs: Run[];
}

export default function RunStatsComponent({ runs }: RunStatsProps) {
  const stats: RunStats = useMemo(() => {
    if (runs.length === 0) {
      return {
        totalDistance: 0,
        totalRuns: 0,
        averagePace: 0,
        totalTime: 0,
        bestPace: 0,
        longestRun: 0,
      };
    }

    const totalDistance = runs.reduce((sum, run) => sum + run.distance, 0);
    const totalTime = runs.reduce((sum, run) => sum + run.duration, 0);
    const averagePace = totalTime / totalDistance;
    const bestPace = Math.min(...runs.map(run => run.pace));
    const longestRun = Math.max(...runs.map(run => run.distance));

    return {
      totalDistance,
      totalRuns: runs.length,
      averagePace,
      totalTime,
      bestPace,
      longestRun,
    };
  }, [runs]);

  const formatPace = (pace: number) => {
    if (!pace || !isFinite(pace)) return '0:00';
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        Statistics
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="text-center p-5 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {stats.totalRuns}
          </div>
          <div className="text-sm font-medium text-blue-700/70 dark:text-blue-300/70">
            Total Runs
          </div>
        </div>
        <div className="text-center p-5 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-xl border border-emerald-200/50 dark:border-emerald-700/50">
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {stats.totalDistance.toFixed(1)}
          </div>
          <div className="text-sm font-medium text-emerald-700/70 dark:text-emerald-300/70">
            Miles Run
          </div>
        </div>
        <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {formatTime(stats.totalTime)}
          </div>
          <div className="text-sm font-medium text-purple-700/70 dark:text-purple-300/70">
            Total Time
          </div>
        </div>
        <div className="text-center p-5 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-xl border border-amber-200/50 dark:border-amber-700/50">
          <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
            {formatPace(stats.averagePace)}
          </div>
          <div className="text-sm font-medium text-amber-700/70 dark:text-amber-300/70">
            Avg Pace/mi
          </div>
        </div>
        <div className="text-center p-5 bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/30 dark:to-rose-800/30 rounded-xl border border-rose-200/50 dark:border-rose-700/50">
          <div className="text-3xl font-bold text-rose-600 dark:text-rose-400">
            {formatPace(stats.bestPace)}
          </div>
          <div className="text-sm font-medium text-rose-700/70 dark:text-rose-300/70">
            Best Pace/mi
          </div>
        </div>
        <div className="text-center p-5 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-xl border border-indigo-200/50 dark:border-indigo-700/50">
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {stats.longestRun.toFixed(1)}
          </div>
          <div className="text-sm font-medium text-indigo-700/70 dark:text-indigo-300/70">
            Longest Run
          </div>
        </div>
      </div>
    </div>
  );
}