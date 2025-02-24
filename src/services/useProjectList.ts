import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 프로젝트 리스트 가져오기
export const fetchProjectList = async () => {
  const { data } = await axios.get<string[]>('/api/dashboard/projects'); // ✅ 프로젝트 리스트 API 호출
  return data; // 예: ['bizbee-oms', 'bizbee-service', 'another-project']
};

// React Query 훅으로 감싸기
export const useProjectList = () => {
  return useQuery({
    queryKey: ['projectList'], // ✅ 캐싱을 위한 키
    queryFn: fetchProjectList,
    staleTime: 1000 * 60 * 5, // ✅ 5분 동안 캐싱 유지
  });
};