import { Button, Theme } from '@radix-ui/themes';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';

function ErrorFallback() {
  return (
    <div role="alert">
      <h2>Ooops, something went wrong :( </h2>
      <Button
        onClick={() => globalThis.location.assign(globalThis.location.origin)}
      >
        Refresh
      </Button>
    </div>
  );
}

type AppProps = {
  children: React.ReactNode;
};

export function App({ children }: AppProps) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Theme
        accentColor="mint"
        grayColor="gray"
        panelBackground="solid"
        scaling="100%"
        radius="full"
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Router>{children}</Router>
        </ErrorBoundary>
      </Theme>
    </React.Suspense>
  );
}
