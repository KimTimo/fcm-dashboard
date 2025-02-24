import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const fetchSuccessRate = async (startDate: string, endDate: string) => {
  const { data } = await axios.get('/api/dashboard/success-rate', {
    params: { startDate, endDate },
  });
  return data;
};

export const useSuccessRate = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['successRate', startDate, endDate],
    queryFn: () => fetchSuccessRate(startDate, endDate),
    staleTime: 1000 * 60 * 5, // 5분 캐싱 유지
  });
};