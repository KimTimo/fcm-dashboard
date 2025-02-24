import { Table, Tag, Spin } from 'antd';
import { usePushRequests } from '../services/usePushRequests.ts';
import { useNavigate } from 'react-router-dom';
import { RequestItemDTO } from '../dto/RequestItemDTO.ts';
import dayjs from "dayjs";

interface RequestListProps {
  projectId: string;
}

const RequestList = ({ projectId }: RequestListProps) => {
  const { data, isLoading } = usePushRequests(projectId);
  const navigate = useNavigate(); // ✅ React Router의 네비게이션 함수

  return (
    <div className="bg-[#1E1E1E] p-6 rounded-lg">
      <h2 className="text-white text-lg mb-4">📜 요청 리스트</h2>
      {isLoading ? (
        <Spin size="large" className="flex justify-center items-center w-full h-20" />
      ) : (
        <Table
          dataSource={data || []}
          rowKey="requestId"
          onRow={(record: RequestItemDTO) => ({ // ✅ DTO 적용
            onClick: () => navigate(`/request/${record.requestId}`),
          })}
          columns={[
            {
              title: 'Request ID',
              dataIndex: 'requestId',
              key: 'requestId',
              render: (text) => <span className="text-blue-400 cursor-pointer">{text}</span>, // ✅ 클릭 가능한 스타일 적용
            },
            { title: 'Tokens Sent', dataIndex: 'tokensSent', key: 'tokensSent' },
            { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt', render: (text: string) => <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span> },
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
