'use client';

import { Run } from '@/types/run';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';

interface RunListProps {
  runs: Run[];
  onDeleteRun: (id: string) => void;
}

export default function RunList({ runs, onDeleteRun }: RunListProps) {
  const formatPace = (pace: number) => {
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (runs.length === 0) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
          <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
          Recent Runs
        </h2>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏃‍♂️</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No runs recorded yet
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">
            Add your first run above to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
        Recent Runs
      </h2>
      <div className="space-y-3">
        {runs.map((run) => (
          <div
            key={run.id}
            className="bg-gray-50/80 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-xl p-5 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-all duration-200 hover:shadow-md group"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-lg">
                    <span className="text-lg font-bold text-blue-700 dark:text-blue-300">
                      {run.distance} mi
                    </span>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-lg">
                    <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                      {Math.round(run.duration)} min
                    </span>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-lg">
                    <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                      {formatPace(run.pace)}/mi
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {format(run.date, 'PPP')} at {format(run.date, 'p')}
                </p>
                {run.notes && (
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {run.notes}
                  </p>
                )}
              </div>
              <button
                onClick={() => onDeleteRun(run.id)}
                className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 opacity-0 group-hover:opacity-100"
                title="Delete run"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}