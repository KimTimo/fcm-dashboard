import { Layout } from 'antd';
import Dashboard from './pages/Dashboard';

const { Header, Content } = Layout;

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          color: '#fff',
          textAlign: 'center',
          fontSize: '1.5rem',
          backgroundColor: '#1890ff',
        }}
      >
        📡 FCM Middleware Dashboard
      </Header>
      <Content style={{ padding: '20px' }}>
        <Dashboard />
      </Content>
    </Layout>
  );
};

export default App;
