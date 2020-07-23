import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getJwtToken } from 'services/Jwt';

const NotFoundRoute: React.FC = (props: any) => (
  <Route
    {...props}
    render={() =>
      getJwtToken() ? (
        <Redirect
          to={{
            pathname: '/dashboard',
          }}
        />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      )
    }
  />
);

export default NotFoundRoute;
