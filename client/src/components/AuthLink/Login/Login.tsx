import React, { useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import { useAuth } from '../store/Context';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useSnackbar from 'hooks/useSnackbar';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import Api from 'services/Api';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Login: React.FC = () => {
  const auth: any = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleClose = () => {
    auth.setOpenLoginDialog(false);
  };
  const handleRegister = () => {
    auth.setOpenLoginDialog(false);
    auth.setOpenRegisterDialog(true);
  };
  const handleForgotPassword = () => {
    auth.setOpenLoginDialog(false);
    auth.setOpenRegisterDialog(false);
    auth.setOpenForgotPasswordDialog(true);
  };
  const handleSubmit = useSnackbar(async (snackbar: any) => {
    await Api.post('/api/v1/login', {
      email,
      password,
    });
    window.location.href = '/dashboard';
  });
  return useObserver(() => {
    return (
      <Dialog
        open={auth.openLoginDialog}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="login"
      >
        <DialogTitle id="login">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To login to this website, please enter your email address and
            password here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleForgotPassword} color="primary">
            Forgot Password
          </Button>
          <Button onClick={handleRegister} color="primary">
            Register
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={!email || !password}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    );
  });
};

export default Login;
