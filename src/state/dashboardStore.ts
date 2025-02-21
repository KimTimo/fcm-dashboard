import { create } from 'zustand';

interface DashboardState {
  projectId: string;
  setProjectId: (instance: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  projectId: 'all',
  setProjectId: (projectId) => set({ projectId }),
}));
