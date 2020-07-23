import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getJwtToken } from 'services/Jwt';

interface Props {
  exact?: boolean;
  path?: string;
  component: any;
}

const AuthenticatedRoute: React.FC<Props> = (props) => {
  if (!getJwtToken()) {
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  }
  return <Route {...props} />;
};

export default AuthenticatedRoute;
