import { App } from './App.tsx';
import './index.css';
import { AppRoutes } from '@/routes';
import '@radix-ui/themes/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <App>
      <AppRoutes />
    </App>
  </StrictMode>,
);
