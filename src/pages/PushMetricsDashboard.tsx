import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { fetchPushMetrics } from '../services/usePushMetrics.ts';
import { useDashboardStore } from '../state/dashboardStore';
import { Button, Card, Spin } from 'antd';
import {PushMetricDTO} from "../dto/PushMetricDTO.ts";

const transformData = (metrics: PushMetricDTO[] | undefined) => {
  if (!metrics) return []; // undefined면 빈 배열 반환
  return metrics.map((item) => ({
    name: item.instance.toUpperCase(),
    success: item.successCount,
    failure: item.failCount,
  }));
};

const PushMetricsDashboard = () => {
  const { instance, setInstance } = useDashboardStore();
  const { data, isLoading, error } = useQuery<PushMetricDTO[]>({
    queryKey: ['pushMetrics', instance],
    queryFn: fetchPushMetrics,
  });

  return (
    <Card title="📊 FCM 전송 모니터링" className="w-full max-w-4xl shadow-md bg-white p-6 rounded-lg">
      {/* ✅ 버튼과 로딩을 중앙 정렬 */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="flex justify-center items-center gap-4">
          <Button type={instance === 'oms' ? 'primary' : 'default'} onClick={() => setInstance('oms')}>
            OMS 보기
          </Button>
          <Button type={instance === 'wms' ? 'primary' : 'default'} onClick={() => setInstance('wms')}>
            WMS 보기
          </Button>
          <Button type={instance === 'all' ? 'primary' : 'default'} onClick={() => setInstance('all')}>
            전체 보기
          </Button>
        </div>

        {/* ✅ 로딩 스피너를 버튼과 같은 높이에서 중앙 배치 */}
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-20">
            <Spin size="large" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">❌ 데이터 로딩 실패!</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transformData(data ?? [])}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="success" fill="#28a745" />
              <Bar dataKey="failure" fill="#dc3545" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};

export default PushMetricsDashboard;
