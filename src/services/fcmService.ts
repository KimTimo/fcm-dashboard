import axios from 'axios';

// FCM 메트릭스 데이터 가져오기
export const fetchPushMetrics = async () => {
  const { data } = await axios.get('/api/push-metrics');
  return data;
};
