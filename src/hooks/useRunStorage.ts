'use client';

import { useState, useEffect } from 'react';
import { Run } from '@/types/run';

const STORAGE_KEY = 'running-tracker-runs';

export const useRunStorage = () => {
  const [runs, setRuns] = useState<Run[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRuns = () => {
      try {
        const storedRuns = localStorage.getItem(STORAGE_KEY);
        if (storedRuns) {
          const parsedRuns = JSON.parse(storedRuns).map((run: Omit<Run, 'date'> & { date: string }) => ({
            ...run,
            date: new Date(run.date),
          }));
          setRuns(parsedRuns.sort((a: Run, b: Run) => b.date.getTime() - a.date.getTime()));
        }
      } catch (error) {
        console.error('Error loading runs from localStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRuns();
  }, []);

  const addRun = (run: Run) => {
    const updatedRuns = [run, ...runs].sort((a, b) => b.date.getTime() - a.date.getTime());
    setRuns(updatedRuns);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRuns));
  };

  const deleteRun = (id: string) => {
    const updatedRuns = runs.filter(run => run.id !== id);
    setRuns(updatedRuns);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRuns));
  };

  return {
    runs,
    addRun,
    deleteRun,
    isLoading,
  };
};