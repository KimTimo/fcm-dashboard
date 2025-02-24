import { useParams } from 'react-router-dom';
import { useRequestDetails } from '../services/useRequestDetails.ts';
import { Card, Table, Spin } from 'antd';

const RequestDetail = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const { data, isLoading, error } = useRequestDetails(requestId!);

  if (isLoading) return <Spin size="large" />;
  if (error) return <p className="text-red-500">❌ 데이터 로딩 실패!</p>;

  return (
    <Card title="📜 요청 상세 정보" className="shadow-md bg-[#1E1E1E] text-white p-6 rounded-lg">
      <p><strong>Project ID:</strong> {data.projectId}</p>
      <p><strong>Request ID:</strong> {data.requestId}</p>
      <p><strong>Callback URL:</strong> {data.callbackUrl}</p>
      <p><strong>Created At:</strong> {data.createdAt}</p>

      <h2 className="mt-4 text-lg">📢 토큰별 전송 상태</h2>
      <Table
        dataSource={data.results}
        columns={[
          { title: 'Status', dataIndex: 'status', key: 'status' },
          { title: 'Error Message', dataIndex: 'errorMessage', key: 'errorMessage' },
          { title: 'Token', dataIndex: 'token', key: 'token' },
        ]}
        rowKey="token"
        className="mt-4"
      />
    </Card>
  );
};

export default RequestDetail;
