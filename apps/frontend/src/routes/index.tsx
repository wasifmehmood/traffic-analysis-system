import HomePage from './Home/HomePage';
import { Header } from '@/UI/Layout/Header/Header';
import { useRoutes } from 'react-router-dom';

export function AppRoutes() {
  const routes = [
    {
      path: '*',
      element: <HomePage />,
    },
  ];

  const element = useRoutes([...routes]);

  return (
    <>
      <Header menuItems={[{ label: 'Home', href: '/', testId: 'home-link' }]} />
      {element}
    </>
  );
}
