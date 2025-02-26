import { create } from 'zustand';
import { useEffect } from 'react';
import { useProjectList } from '../services/useProjectList.ts';

interface DashboardState {
  projectId: string;
  setProjectId: (instance: string) => void;
}

// Zustand 상태 관리
export const useDashboardStore = create<DashboardState>((set) => ({
  projectId: '',
  setProjectId: (projectId) => set({ projectId }),
}));

export const useInitializeProjectId = () => {
  const { data: projectList, isFetching } = useProjectList();
  const { projectId, setProjectId } = useDashboardStore();

  useEffect(() => {
    if (!isFetching && projectList?.length && !projectId) {
      setProjectId(projectList[0]); // 첫 번째 프로젝트 ID를 기본 값으로 설정
    }
  }, [isFetching, projectList, projectId, setProjectId]);
}