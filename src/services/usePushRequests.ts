import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const fetchPushRequests = async (projectId: string, limit: number, offset: number) => {
  const { data } = await axios.get(`/api/dashboard/push-requests/${projectId}`, {
    params: { limit, offset },
  });
  return data;
};

export const usePushRequests = (projectId: string, limit = 10, offset = 0) => {
  return useQuery({
    queryKey: ['pushRequests', projectId, limit, offset],
    queryFn: () => fetchPushRequests(projectId, limit, offset),
    enabled: !!projectId, // projectId가 있을 때만 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
  });
};