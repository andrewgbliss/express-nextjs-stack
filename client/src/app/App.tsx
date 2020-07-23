import React, { useEffect } from 'react';
import Theme from 'theme/Theme';
import Router from 'routes/Router';
import { withProvider, useApp } from './store/Context';
import { SnackbarProvider } from 'notistack';

const App = () => {
  const { fetchMe }: any = useApp();
  useEffect(() => {
    fetchMe();
  }, [fetchMe]);
  return (
    <Theme>
      <SnackbarProvider maxSnack={1}>
        <Router />
      </SnackbarProvider>
    </Theme>
  );
};

export default withProvider(App);
