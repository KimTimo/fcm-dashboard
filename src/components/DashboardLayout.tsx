import { ProLayout } from '@ant-design/pro-layout';
import { Link, useLocation } from 'react-router-dom';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <ProLayout
      title="FCM Middleware Dashboard"
      logo="https://cdn-common-dev.s3.ap-northeast-2.amazonaws.com/rang/bizbee.png"
      layout="mix" // 사이드 메뉴 레이아웃
      fixSiderbar // 사이드바 고정
      fixedHeader // 헤더 고정
      navTheme="realDark" // 라이트 테마 적용
      route={{
        routes: [
          {
            path: '/',
            name: '📊 Dashboard',
            key: 'dashboard',
          },
          {
            path: '/admin-sdk',
            name: '📂 Admin SDK Upload',
            key: 'admin-sdk',
           },
          ],
        }}
        menuItemRender={(item, dom) => <Link to={item.path || '/'}>{dom}</Link>}
        location={{ pathname: location.pathname }} // 현재 경로 반영
      >
        {children}
    </ProLayout>
  );
};

  export default DashboardLayout;