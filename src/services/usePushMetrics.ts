import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// FCM 메트릭스 데이터 가져오기
export const fetchPushMetrics = async (projectId: string) => {
  const { data } = await axios.get(`/api/dashboard/push-metrics`, {
    params: { projectId },
  });
  return data;
};

export const usePushMetrics = (projectId: string) => {
  return useQuery({
    queryKey: ['pushMetrics', projectId], // 프로젝트 ID를 queryKey에 포함
    queryFn: () => fetchPushMetrics(projectId), // projectId를 전달
    enabled: !!projectId, // projectId가 있을 때만 실행
  });
};
