import { Form, Input, Button, Card, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import { useDashboardStore } from "../state/dashboardStore";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { setProjectId } = useDashboardStore(); // Zustand 상태관리 (필요한 경우)

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", values);
      const { username, token } = response.data;

      localStorage.setItem("token", token); // ✅ JWT 토큰 저장
      message.success(`환영합니다, ${username}님!`);

      // ✅ 로그인 후 프로젝트 ID 초기화 (필요한 경우)
      setProjectId("all");

      // ✅ 대시보드로 이동
      window.location.href = "/dashboard";
    } catch (error) {
      message.error("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm p-6 shadow-lg border border-gray-200">
        <h2 className="text-xl text-center mb-4">🔐 로그인</h2>
        <Form name="login-form" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="username"
            rules={[{ required: true, message: "아이디를 입력해주세요." }]}
          >
            <Input prefix={<UserOutlined />} placeholder="아이디" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="비밀번호" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              로그인
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
