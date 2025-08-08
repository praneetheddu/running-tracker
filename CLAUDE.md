# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (uses Turbopack for fast builds)
- **Build for production**: `npm run build`  
- **Start production server**: `npm start`
- **Lint code**: `npm run lint` (uses Next.js ESLint config with TypeScript support)

## Project Architecture

This is a **Next.js 15** running tracker application using the **App Router** with TypeScript and Tailwind CSS for styling.

### Core Architecture

- **Frontend**: React 19 with Next.js App Router
- **Styling**: Tailwind CSS v4 with gradient designs and dark mode support
- **Data Storage**: Client-side localStorage through custom hook
- **Type Safety**: Full TypeScript with strict configuration
- **State Management**: React hooks with custom `useRunStorage` hook

### Key Patterns

1. **Component Structure**: All components are client-side rendered (`'use client'`) and located in `src/components/`
2. **Type Definitions**: Centralized in `src/types/run.ts` with `Run` and `RunStats` interfaces
3. **Data Management**: Single custom hook `useRunStorage` handles all CRUD operations with localStorage persistence
4. **Styling Pattern**: Uses glass-morphism design with `backdrop-blur-sm`, gradient backgrounds, and consistent rounded corners

### Data Flow

- **Storage Hook**: `useRunStorage()` provides `runs`, `addRun`, `deleteRun`, and `isLoading`
- **Run Interface**: Contains `id`, `date`, `distance` (miles), `duration` (minutes), `pace` (calculated), and optional `notes`
- **Statistics**: Calculated in real-time using `useMemo` from run data
- **Visualization**: Uses Recharts library for charting run data over time

### Component Dependencies

- **AddRunForm**: Uses `uuid` for ID generation, calculates pace automatically
- **RunStats**: Computes statistics (total distance, best pace, longest run) from run array
- **RunChart**: Displays trend data using Recharts (when runs exist)
- **RunList**: Shows chronological list with delete functionality

### File Structure

```
src/
├── app/               # Next.js App Router
│   ├── page.tsx      # Main dashboard layout
│   └── layout.tsx    # Root layout with metadata
├── components/       # All React components  
├── hooks/           # Custom React hooks
│   └── useRunStorage.ts  # Main data management hook
└── types/           # TypeScript type definitions
    └── run.ts       # Run and RunStats interfaces
```

### Development Notes

- TypeScript path aliases configured: `@/*` maps to `src/*`
- Uses Geist font family for typography
- Dark mode supported throughout UI
- Data persisted automatically on every add/delete operation
- All runs sorted by date (newest first)