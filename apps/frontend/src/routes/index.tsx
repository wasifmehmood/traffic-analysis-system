import DashboardPage from './Dashboard/ViolationsDashboardPage';
import { Header } from '@/UI/Layout/Header/Header';
import useTrafficUpdates from '@/hooks/useTrafficUpdates';
import { useRoutes } from 'react-router-dom';

export function AppRoutes() {
  const {
    violationCount,
    violationByCountry,
    violationsByVehicleType,
    recentTrafficViolations,
    speedViolationsInLastHour,
  } = useTrafficUpdates();

  const routes = [
    {
      path: '*',
      element: (
        <DashboardPage
          violationCount={violationCount}
          violationByCountry={violationByCountry}
          violationsByVehicleType={violationsByVehicleType}
          recentTrafficViolations={recentTrafficViolations}
          speedViolationsInLastHour={speedViolationsInLastHour}
        />
      ),
    },
  ];

  const element = useRoutes([...routes]);

  return (
    <>
      <Header
        menuItems={[{ label: 'Violations', href: '/', testId: 'home-link' }]}
      />
      {element}
    </>
  );
}
