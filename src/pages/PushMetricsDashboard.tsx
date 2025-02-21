import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {usePushMetrics} from '../services/usePushMetrics.ts';
import { useDashboardStore } from '../state/dashboardStore';
import { Button, Card, Spin } from 'antd';
import {PushMetricDTO} from "../dto/PushMetricDTO.ts";

const transformData = (metrics: PushMetricDTO[] | undefined) => {
  if (!metrics) return []; // 데이터가 없으면 빈 배열 반환

  return metrics.map((item) => ({
    name: item.projectId.toUpperCase(), // ✅ 올바른 필드 사용
    success: item.successCount,
    failure: item.failureCount,
  }));
};

const PushMetricsDashboard = () => {
  const { projectId, setProjectId } = useDashboardStore();
  const { data, isLoading, error } = usePushMetrics(projectId); // ✅ 커스텀 훅 사용

  return (
    <Card title="📊 FCM 전송 모니터링" className="w-full max-w-4xl shadow-md bg-[#F8F9FA] p-6 rounded-lg border border-[#D1D5DB]">
      {/* ✅ 버튼과 로딩을 중앙 정렬 */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="flex justify-center items-center gap-4">
          {['bizbee-oms', 'bizbee-service', 'all'].map((id) => (
            <Button
              key={id}
              type={projectId === id ? 'primary' : 'default'}
              className={`px-4 py-2 rounded-md text-white ${
                projectId === id ? 'bg-[#AEDFF7] hover:bg-[#98D0E3]' : 'bg-[#FFCCBC] hover:bg-[#F5A891]'
              }`}
              onClick={() => setProjectId(id)}>
              {id === 'all' ? '전체 보기' : `${id.toUpperCase()} 보기`}
            </Button>
          ))}
        </div>

        {/* ✅ 로딩 스피너 중앙 정렬 */}
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-20">
            <Spin size="large" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">❌ 데이터 로딩 실패!</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transformData(data ?? [])}>
              <XAxis dataKey="name" stroke="#4A4A4A" />
              <YAxis stroke="#4A4A4A" />
              <Tooltip />
              <Legend />
              <Bar dataKey="success" fill="#A7C7E7" /> {/* 부드러운 파란색 */}
              <Bar dataKey="failure" fill="#FFCCBC" /> {/* 피치톤 */}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};

export default PushMetricsDashboard;
