import { create } from 'zustand';

interface DashboardState {
  instance: string;
  setInstance: (instance: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  instance: 'all',
  setInstance: (instance) => set({ instance }),
}));
