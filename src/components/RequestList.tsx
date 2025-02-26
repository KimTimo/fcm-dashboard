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

  // ✅ 테이블 컬럼 정의 (정렬 추가)
  const columns = [
    {
      title: 'Corporation',
      dataIndex: 'corpCd',
      key: 'corpCd',
      sorter: (a: RequestItemDTO, b: RequestItemDTO) => a.requestId.localeCompare(b.requestId),
      render: (requestId: string) => <span className="text-blue-400 cursor-pointer">{requestId}</span>, // ✅ 클릭 스타일 적용
    },
    {
      title: 'Request ID',
      dataIndex: 'requestId',
      key: 'requestId',
      sorter: (a: RequestItemDTO, b: RequestItemDTO) => a.requestId.localeCompare(b.requestId),
      render: (requestId: string) => <span className="text-blue-400 cursor-pointer">{requestId}</span>, // ✅ 클릭 스타일 적용
    },
    {
      title: 'Tokens Sent',
      dataIndex: 'tokensSent',
      key: 'tokensSent',
      sorter: (a: RequestItemDTO, b: RequestItemDTO) => a.tokensSent - b.tokensSent, // ✅ 숫자 정렬 가능
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: RequestItemDTO, b: RequestItemDTO) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (text: string) => <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: 'Success',
      dataIndex: 'successCount',
      key: 'successCount',
      sorter: (a: RequestItemDTO, b: RequestItemDTO) => a.successCount - b.successCount,
      render: (successCount: string) => <Tag color="green">{successCount}</Tag>,
    },
    {
      title: 'Failure',
      dataIndex: 'failureCount',
      key: 'failureCount',
      sorter: (a: RequestItemDTO, b: RequestItemDTO) => a.failureCount - b.failureCount,
      render: (failureCount: string) => <Tag color="red">{failureCount}</Tag>,
    },
  ];

  return (
    <div className="bg-[#1E1E1E] p-6 rounded-lg">
      <h2 className="text-white text-lg mb-4">📜 요청 리스트</h2>
      {isLoading ? (
        <Spin size="large" className="flex justify-center items-center w-full h-20" />
      ) : (
        <Table
          dataSource={data || []}
          rowKey="requestId"
          onRow={(record: RequestItemDTO) => ({
            onClick: () => navigate(`/request/${record.requestId}`),
          })}
          columns={columns}
          pagination={{ pageSize: 10 }} // ✅ 페이지네이션 적용
          bordered // ✅ 테두리 스타일 추가
        />
      )}
    </div>
  );
};

export default RequestList;
