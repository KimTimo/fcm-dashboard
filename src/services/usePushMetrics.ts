import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// FCM 메트릭스 데이터 가져오기
export const fetchPushMetrics = async () => {
  const { data } = await axios.get('/api/push-metrics');
  return data;
};

export const usePushMetrics = () => {
  return useQuery({
    queryKey: ['pushMetrics'],
    queryFn: fetchPushMetrics,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐싱 유지
  });
};
