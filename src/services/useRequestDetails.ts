import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// request_id 기반 요청 상세 데이터 가져오기
export const fetchRequestDetails = async (requestId: string) => {
  const { data } = await axios.get(`/api/dashboard/${requestId}`);
  return data;
};

export const useRequestDetails = (requestId: string) => {
  return useQuery({
    queryKey: ['requestDetails', requestId],
    queryFn: () => fetchRequestDetails(requestId),
    enabled: !!requestId, // requestId가 있을 때만 실행
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};
