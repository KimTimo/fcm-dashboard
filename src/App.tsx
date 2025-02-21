import { Layout, Menu  } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PushMetricsDashboard from './pages/PushMetricsDashboard.tsx';
import AdminSdkManager from './components/adminSdk/AdminSdkManager.tsx';

const { Header, Content, Sider } = Layout;

const App = () => {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider theme="light">
            <Menu mode="inline" defaultSelectedKeys={['dashboard']}>
              <Menu.Item key="dashboard">
                <Link to="/">📊 Dashboard</Link>
              </Menu.Item>
              <Menu.Item key="admin-sdk">
                <Link to="/admin-sdk">📂 Admin SDK Upload</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ backgroundColor: '#1890ff', color: 'white', textAlign: 'center', fontSize: '1.5rem' }}>
              📡 FCM Middleware Dashboard
            </Header>
            <Content style={{ padding: '20px' }}>
              <Routes>
                <Route path="/" element={<PushMetricsDashboard />} />
                <Route path="/admin-sdk" element={<AdminSdkManager />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
};

export default App;
