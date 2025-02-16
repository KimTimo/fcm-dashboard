import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { fetchPushMetrics } from '../services/fcmService';
import { useDashboardStore } from '../state/dashboardStore';

// 테스트용 더미 데이터
const dummyData = [
  { name: 'OMS', success: 100, failure: 5 },
  { name: 'WMS', success: 80, failure: 15 },
  { name: 'FMS', success: 120, failure: 7 },
];

const Dashboard = () => {
  const { instance, setInstance } = useDashboardStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ['pushMetrics', instance],
    queryFn: fetchPushMetrics,
  });

  if (isLoading) return <p>⏳ 데이터 로딩 중...</p>;
  if (error) return <p>❌ 데이터 로딩 실패!</p>;

  return (
    <div>
      <h2>📊 FCM 전송 모니터링</h2>
      <button onClick={() => setInstance('oms')}>OMS 보기</button>
      <button onClick={() => setInstance('wms')}>WMS 보기</button>
      <button onClick={() => setInstance('all')}>전체 보기</button>

      <BarChart width={600} height={300} data={data || dummyData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="success" fill="#28a745" />
        <Bar dataKey="failure" fill="#dc3545" />
      </BarChart>
    </div>
  );
};

export default Dashboard;
