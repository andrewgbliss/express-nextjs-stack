import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute';
import NotFoundRoute from './NotFoundRoute';
import Index from 'views/Index/Index';
import RegisterComplete from 'views/Auth/RegisterComplete';
import ResetPassword from 'views/Auth/ResetPassword';
import Dashboard from 'views/Me/Dashboard/Dashboard';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/register/complete/:code">
          <RegisterComplete />
        </Route>
        <Route exact path="/reset-password/verify/:code">
          <ResetPassword />
        </Route>
        <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login">
          <Index showLogin />
        </Route>
        <Route exact path="/">
          <Index />
        </Route>
        <NotFoundRoute />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
