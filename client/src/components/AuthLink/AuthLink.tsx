import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react-lite';
import { useApp } from 'app/store/Context';
import LoginDialog from './Login/Login';
import RegisterDialog from './Register/Register';
import ForgotPasswordDialog from './ForgotPassword/ForgotPassword';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Api from 'services/Api';
import { removeJwtToken } from 'services/Jwt';
import { withProvider, useAuth } from './store/Context';

interface Props {
  showLogin?: boolean;
}

const AuthLink: React.FC<Props> = (props) => {
  const app: any = useApp();
  const auth: any = useAuth();
  useEffect(() => {
    if (props.showLogin) {
      auth.setOpenLoginDialog(true);
    }
  }, [auth, props.showLogin]);
  return useObserver(() => {
    if (app.me) {
      return (
        <Button
          onClick={async () => {
            await Api.post('/api/v1/logout');
            removeJwtToken();
            window.location.href = '/';
          }}
          style={{ color: '#fff' }}
          component="a"
        >
          Logout
        </Button>
      );
    }
    return (
      <>
        <Button
          onClick={() => auth.setOpenLoginDialog(true)}
          style={{ color: '#fff' }}
          component="a"
        >
          Login
        </Button>
        <LoginDialog />
        <RegisterDialog />
        <ForgotPasswordDialog />
      </>
    );
  });
};

export default withProvider(AuthLink);

const MenuAuthItem: React.FC<Props> = (props) => {
  const app: any = useApp();
  const auth: any = useAuth();
  useEffect(() => {
    if (props.showLogin) {
      auth.setOpenLoginDialog(true);
    }
  }, [auth, props.showLogin]);
  return useObserver(() => {
    if (app.me) {
      return (
        <MenuItem
          component="a"
          onClick={async () => {
            await Api.post('/api/v1/logout');
            removeJwtToken();
            window.location.href = '/';
          }}
        >
          Logout
        </MenuItem>
      );
    } else {
      return (
        <>
          <MenuItem onClick={() => auth.setOpenLoginDialog(true)}>
            Login
          </MenuItem>
          <LoginDialog />
          <RegisterDialog />
          <ForgotPasswordDialog />
        </>
      );
    }
  });
};

export const MenuAuthLink = withProvider(MenuAuthItem);
