import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Switch, DatePicker, Spin, Card } from 'antd';
import { useSuccessRate } from '../services/useSuccessRate.ts';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useDashboardStore } from "../state/dashboardStore.ts"; // ✅ 추가
import { SuccessRateDTO } from "../dto/SuccessRateDTO.ts";
import RequestList from '../components/RequestList.tsx'; // ✅ 추가

const { RangePicker } = DatePicker;

const SuccessRateChart = () => {
  const { projectId, setProjectId } = useDashboardStore(); // ✅ 상태 관리
  const [dateRange, setDateRange] = useState<[string, string]>([
    dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
    dayjs().format('YYYY-MM-DD'),
  ]);

  // ✅ 모드 선택 상태값 (true: 성공/실패율 분석, false: FCM 모니터링)
  const [isSuccessRateMode, setIsSuccessRateMode] = useState(false);

  // ✅ 성공률 데이터 가져오기
  const { data, isLoading, error } = useSuccessRate(dateRange[0], dateRange[1]);

// ✅ 데이터 변환
  const transformedData = data?.map((item: SuccessRateDTO) => ({
    name: item.projectId.toUpperCase(),
    projectId: item.projectId, // ✅ 클릭 시 전달할 projectId 추가
    success: item.successCount,
    failure: item.failureCount,
    failureRate: isSuccessRateMode ? item.failureRate : undefined,
  })) || [];

  // ✅ 차트 클릭 시 해당 프로젝트 요청 리스트 표시
  const handleBarClick = (data: any) => {
    if (data?.projectId) {
      setProjectId(data.projectId);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-white text-xl mb-4">📊 FCM 대시보드</h2>

      {/* ✅ 날짜 필터 + 전환 스위치 */}
      <div className="flex justify-between items-center mb-4">
        <RangePicker
          defaultValue={[dayjs(dateRange[0]), dayjs(dateRange[1])]}
          format="YYYY-MM-DD"
          onChange={(dates) => {
            if (dates) {
              setDateRange([dates[0]?.format('YYYY-MM-DD') || '', dates[1]?.format('YYYY-MM-DD') || '']);
            }
          }}
          className="bg-white p-2 rounded-md"
        />

        {/* ✅ 모드 전환 스위치 */}
        <div className="flex items-center gap-2">
          <span className="text-white">📡 FCM 전송 모니터링</span>
          <Switch
            checked={isSuccessRateMode}
            onChange={setIsSuccessRateMode}
            checkedChildren="성공/실패율 분석"
            unCheckedChildren="FCM 전송 모니터링"
          />
        </div>
      </div>

      {/* ✅ 차트 영역 */}
      <Card className="bg-[#1E1E1E] p-4 rounded-lg shadow-md">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">❌ 데이터 로딩 실패!</p>
        ) : (
          <>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transformedData} onClick={({ activePayload }) => handleBarClick(activePayload?.[0]?.payload)}>
              <XAxis dataKey="name" stroke="#E0E0E0" />
              <YAxis stroke="#E0E0E0" />
              <Tooltip />
              <Legend />
              <Bar dataKey="success" fill="#66BB6A">
                {transformedData.map((_entry: any, index: any) => (
                  <Cell key={`cell-success-${index}`} cursor="pointer" />
                ))}
              </Bar>
              <Bar dataKey="failure" fill="#E57373">
                {transformedData.map((_entry: any, index: any) => (
                  <Cell key={`cell-failure-${index}`} cursor="pointer" />
                ))}
              </Bar>
              {isSuccessRateMode && (
                <Bar dataKey="failureRate" fill="#FFD700">
                  {transformedData.map((_entry: any, index: any) => (
                    <Cell key={`cell-failureRate-${index}`} cursor="pointer" />
                  ))}
                </Bar>
              )}
            </BarChart>
          </ResponsiveContainer>
          {/* ✅ 선택한 프로젝트 요청 리스트 */}
          {projectId && (
            <div className="mt-8 w-full">
              <RequestList projectId={projectId} />
            </div>
          )}
        </>
        )}
      </Card>
    </div>
  );
};

export default SuccessRateChart;
