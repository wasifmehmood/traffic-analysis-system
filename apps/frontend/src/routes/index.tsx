import TrafficDashboardPage from './Dashboard/TrafficDashboardPage';
import DashboardPage from './Dashboard/ViolationsDashboardPage';
import { Header } from '@/UI/Layout/Header/Header';
import useTrafficUpdates from '@/hooks/useTrafficUpdates';
import { useRoutes } from 'react-router-dom';

export function AppRoutes() {
  const { trafficData } = useTrafficUpdates();

  const routes = [
    {
      path: '*',
      element: <DashboardPage trafficData={trafficData} />,
    },
    {
      path: '/traffic',
      element: <TrafficDashboardPage trafficData={trafficData} />,
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
