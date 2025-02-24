import { Table, Tag, Spin } from 'antd';
import { usePushRequests } from '../services/usePushRequests.ts';

interface RequestListProps {
  projectId: string;
}

const RequestList = ({ projectId }: RequestListProps) => {
  const { data, isLoading } = usePushRequests(projectId);

  return (
    <div className="bg-[#1E1E1E] p-6 rounded-lg">
      <h2 className="text-white text-lg mb-4">📜 요청 리스트</h2>
      {isLoading ? (
        <Spin size="large" className="flex justify-center items-center w-full h-20" />
      ) : (
        <Table
          dataSource={data || []}
          rowKey="requestId"
          columns={[
            { title: 'Request ID', dataIndex: 'requestId', key: 'requestId' },
            { title: 'Tokens Sent', dataIndex: 'tokensSent', key: 'tokensSent' },
            { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
            {
              title: 'Success',
              dataIndex: 'successCount',
              key: 'successCount',
              render: (count) => <Tag color="green">{count}</Tag>,
            },
            {
              title: 'Failure',
              dataIndex: 'failureCount',
              key: 'failureCount',
              render: (count) => <Tag color="red">{count}</Tag>,
            },
          ]}
        />
      )}
    </div>
  );
};

export default RequestList;
