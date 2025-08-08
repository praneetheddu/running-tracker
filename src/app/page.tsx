'use client';

import { useRunStorage } from '@/hooks/useRunStorage';
import AddRunForm from '@/components/AddRunForm';
import RunList from '@/components/RunList';
import RunStats from '@/components/RunStats';
import RunChart from '@/components/RunChart';

export default function Home() {
  const { runs, addRun, deleteRun, isLoading } = useRunStorage();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl">🏃‍♂️</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
            RunTracker
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Your personal running companion for tracking progress and achieving goals
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-1">
            <AddRunForm onAddRun={addRun} />
          </div>
          <div className="xl:col-span-2">
            <RunStats runs={runs} />
          </div>
        </div>

        {runs.length > 0 && (
          <div className="mb-8">
            <RunChart runs={runs} />
          </div>
        )}

        <RunList runs={runs} onDeleteRun={deleteRun} />
      </div>
    </div>
  );
}
