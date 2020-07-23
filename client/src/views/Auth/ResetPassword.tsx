import React, { useState } from 'react';
import Layout from 'components/Layout/Layout';
import Section from 'sections/Section/Section';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Api from 'services/Api';
import { useParams } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import img from 'assets/img/jumbotron.jpg';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
}));

const ResetPassword: React.FC = () => {
  const classes = useStyles();
  const { code } = useParams();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const onSubmit = useSnackbar(async (snackbar: any) => {
    await Api.put(`/api/v1/reset-password/verify/${code}`, {
      password,
    });
    const { enqueueSnackbar } = snackbar;
    enqueueSnackbar('Success: You have change your password.', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    });
    setShowLogin(true);
  });
  const disabledButton = !password || password !== passwordConfirm;
  return (
    <Layout showLogin={showLogin}>
      <Section id="reset-password" backgroundImage={img}>
        <Grid
          container
          className={classes.root}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Paper elevation={8}>
              <Box p={5}>
                <Box>Please enter your new password.</Box>
                <FormControl margin="normal" required fullWidth>
                  <Input
                    id="password"
                    name="password"
                    autoComplete="New Password"
                    autoFocus
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <Input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    autoComplete="New Password Confirm"
                    autoFocus
                    placeholder="New Password Confirm"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    type="password"
                  />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={onSubmit}
                  disabled={disabledButton}
                >
                  Change Password
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Section>
    </Layout>
  );
};

export default ResetPassword;
