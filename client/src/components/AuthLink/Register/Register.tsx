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

const Register: React.FC = () => {
  const auth: any = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleBack = () => {
    auth.setOpenLoginDialog(true);
    auth.setOpenRegisterDialog(false);
  };
  const handleClose = () => {
    auth.setOpenRegisterDialog(false);
  };
  const handleSubmit = useSnackbar(async (snackbar: any) => {
    await Api.post('/api/v1/register', {
      email,
      password,
    });
    const { enqueueSnackbar } = snackbar;
    enqueueSnackbar(
      'You have succesfully registered. A verification email has been sent to your email address.',
      {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      }
    );
    auth.setOpenRegisterDialog(false);
  });
  return useObserver(() => {
    return (
      <Dialog
        open={auth.openRegisterDialog}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="register"
      >
        <DialogTitle id="register">Register</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the information below to register.
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
          <Button onClick={handleBack} color="primary">
            Back to Login
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={!email || !password}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  });
};

export default Register;
