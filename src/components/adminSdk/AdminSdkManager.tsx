import { useDropzone } from 'react-dropzone';
import {useState, useEffect } from "react";
import axios from 'axios';
import { Table, Card, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const AdminSdkManager = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [sdkFiles, setSdkFiles] = useState<{ projectId: string; uploadedAt: string }[]>([]);

  useEffect(() => {
    fetchSdkFiles();
  }, []);

  const fetchSdkFiles = async () => {
    try {
      const response = await axios.get('/api/sdk-list');
      setSdkFiles(response.data);
    } catch (error) {
      console.error('SDK 목록 가져오기 실패:', error);
    }

  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/json': ['.json'] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setUploadStatus('');
    },
  });

  const handleUpload = async () => {
    if (!file) {
      message.warning('⚠️ 파일을 선택해주세요!');
      return;
    }

    const formData: FormData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload-sdk', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      message.success(`✅ 업로드 성공: ${response.data.message}`);
      setUploadStatus('업로드 성공: SDK 파일이 성공적으로 업로드되었습니다.');
      fetchSdkFiles();
    } catch (error) {
      console.error('🚨 업로드 실패:', error);
      message.error('❌ 업로드 실패! 서버를 확인해주세요.');
    }
  };

  const columns = [
    {
      title: '📌 프로젝트 ID',
      dataIndex: 'projectId',
      key: 'projectId',
      render: (text: string) => <span className="font-semibold text-blue-600">{text}</span>,
    },
    {
      title: '📅 업로드 시간',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
  ];

  return (
    <div className="flex flex-col items-center p-6">
      <Card className="w-full max-w-3xl p-6 shadow-lg border border-gray-200">
        <div
          {...getRootProps()}
          className={`border-dashed border-2 p-6 rounded-lg cursor-pointer transition ${
            isDragActive ? "bg-blue-100 border-blue-500" : "bg-white border-gray-400"
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            📂 여기에 <strong>admin-sdk.json</strong> 파일을 드래그하거나 클릭하여 선택하세요.
          </p>
        </div>

        {file && (
          <p className="mt-2 text-gray-700">
            📁 선택된 파일: <strong>{file.name}</strong>
          </p>
        )}

        <div className="flex justify-center mt-4">
          <Button onClick={handleUpload} type="primary" icon={<UploadOutlined />} className="px-6">
            업로드
          </Button>
        </div>

        {uploadStatus && <p className="mt-4 text-green-600 text-center">{uploadStatus}</p>}
      </Card>

      <Card title="📜 등록된 SDK 파일 목록" className="w-full max-w-3xl mt-6 shadow-lg border border-gray-200">
        <Table
          dataSource={sdkFiles}
          columns={columns}
          rowKey="projectId"
          pagination={{ pageSize: 5 }}
          className="mt-4"
        />
      </Card>
    </div>
  );
};

export default AdminSdkManager;
