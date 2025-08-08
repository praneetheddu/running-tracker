export interface Run {
  id: string;
  date: Date;
  distance: number; // in miles
  duration: number; // in minutes
  pace: number; // minutes per mile
  notes?: string;
}

export interface RunStats {
  totalDistance: number; // in miles
  totalRuns: number;
  averagePace: number; // minutes per mile
  totalTime: number; // in minutes
  bestPace: number; // minutes per mile (fastest)
  longestRun: number; // in miles
}