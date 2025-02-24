import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import PushMetricsDashboard from './pages/PushMetricsDashboard.tsx';
import AdminSdkManager from './components/AdminSdkManager.tsx';


const App = () => {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<PushMetricsDashboard />} />
          <Route path="/admin-sdk" element={<AdminSdkManager />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
};

export default App;
