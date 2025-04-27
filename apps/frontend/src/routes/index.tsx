import TrafficDashboardPage from './Dashboard/TrafficDashboardPage';
import DashboardPage from './Dashboard/ViolationsDashboardPage';
import { Header } from '@/UI/Layout/Header/Header';
import { useRoutes } from 'react-router-dom';

export function AppRoutes() {
  const routes = [
    {
      path: '*',
      element: <DashboardPage />,
    },
    {
      path: '/traffic',
      element: <TrafficDashboardPage />,
    },
  ];

  const element = useRoutes([...routes]);

  return (
    <>
      <Header
        menuItems={[
          { label: 'Violations', href: '/', testId: 'home-link' },
          { label: 'Traffic', href: '/traffic', testId: 'home-link' },
        ]}
      />
      {element}
    </>
  );
}
