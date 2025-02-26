import { Card } from 'antd';
import SuccessRateChart from '../components/SuccessRateChart.tsx';
import DashboardSummary from "../components/DashboardSummary.tsx";
const PushMetricsDashboard = () => {

  return (
    <Card title="📊 FCM 전송 모니터링" className="w-full max-w-4xl shadow-md bg-[#F8F9FA] p-6 rounded-lg border border-[#D1D5DB]">
      {/* ✅ 📊 주요 메트릭 요약 추가 */}
      <DashboardSummary />
      {/* ✅ 버튼과 로딩을 중앙 정렬 */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="flex justify-center items-center gap-4">
          {/* ✅ 성공/실패율 대시보드 추가 */}
          <div className="mt-8 w-full">
            <SuccessRateChart/>
          </div>
        </div>
      </div>
    </Card>
  );
}
export default PushMetricsDashboard;
