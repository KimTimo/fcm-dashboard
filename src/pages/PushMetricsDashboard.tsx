import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useProjectList } from '../services/useProjectList.ts';
import {fetchPushMetrics} from '../services/usePushMetrics.ts';
import { useDashboardStore } from '../state/dashboardStore';
import { Button, Card, Spin } from 'antd';
import {PushMetricDTO} from "../dto/PushMetricDTO.ts";
import {useQuery} from "@tanstack/react-query";

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
  const { data: projectList, isLoading: projectLoading } = useProjectList(); // ✅ 프로젝트 리스트 불러오기
  const { data, isLoading, error } = useQuery<PushMetricDTO[]>({
    queryKey: ['pushMetrics', projectId],
    queryFn: () => fetchPushMetrics(projectId),
  });

  return (
    <Card title="📊 FCM 전송 모니터링" className="w-full max-w-4xl shadow-md bg-[#F8F9FA] p-6 rounded-lg border border-[#D1D5DB]">
      {/* ✅ 버튼과 로딩을 중앙 정렬 */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="flex justify-center items-center gap-4">
          {projectLoading ? ( // ✅ 프로젝트 리스트 로딩 중
            <Spin size="small"/>
          ) : (
            projectList?.map((id) => (
              <Button
                key={id}
                type={projectId === id ? 'primary' : 'default'}
                className={`px-4 py-2 rounded-md text-white ${
                  projectId === id ? 'bg-[#AEDFF7] hover:bg-[#98D0E3]' : 'bg-[#FFCCBC] hover:bg-[#F5A891]'
                }`}
                onClick={() => setProjectId(id)}>
                {id === 'all' ? '전체 보기' : `${id.toUpperCase()} 보기`}
              </Button>
            ))
          )}
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
              <XAxis dataKey="name" stroke="#E0E0E0" /> {/* 회색으로 가독성 향상 */}
              <YAxis stroke="#E0E0E0" />
              <Tooltip />
              <Legend />
              <Bar dataKey="success" fill="#66BB6A" /> {/* 밝은 녹색 */}
              <Bar dataKey="failure" fill="#E57373" /> {/* 밝은 레드 */}
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};

export default PushMetricsDashboard;
