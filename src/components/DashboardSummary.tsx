import { Card, Statistic, Row, Col, Spin } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, SendOutlined } from "@ant-design/icons";
import { useDashboardMetrics } from "../services/useDashboardMetrics.ts";

const DashboardSummary = () => {
  const { data, isLoading, error } = useDashboardMetrics();

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <p className="text-red-500 text-center">❌ 메트릭 데이터를 불러올 수 없습니다.</p>;
  }

  return (
    <Row gutter={16} className="mb-6">
      <Col span={8}>
        <Card className="shadow-md border border-gray-200">
          <Statistic
            title="총 푸시 요청"
            value={data.totalRequests}
            prefix={<SendOutlined />}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card className="shadow-md border border-gray-200">
          <Statistic
            title="성공한 푸시"
            value={data.totalSuccess}
            valueStyle={{ color: "#3f8600" }}
            prefix={<CheckCircleOutlined />}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card className="shadow-md border border-gray-200">
          <Statistic
            title="실패한 푸시"
            value={data.totalFailures}
            valueStyle={{ color: "#cf1322" }}
            prefix={<CloseCircleOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardSummary;
