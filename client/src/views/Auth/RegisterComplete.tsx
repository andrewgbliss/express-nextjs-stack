import React, { useEffect, useCallback, useState } from 'react';
import Layout from 'components/Layout/Layout';
import Section from 'sections/Section/Section';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Api from 'services/Api';
import { useParams, Link } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
}));

const RegisterComplete: React.FC = () => {
  const classes = useStyles();
  const { code } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [success, setSuccess] = useState(false);
  const apiCall = useCallback(async () => {
    await Api.get(`/api/v1/register/complete/${code}`);
    setSuccess(true);
    setTimeout(() => {
      window.location.href = '/';
    }, 5000);
  }, [code]);
  const finishRegistration = useSnackbar(apiCall);
  useEffect(() => {
    if (!loaded) {
      finishRegistration();
      setLoaded(true);
    }
  }, [finishRegistration, loaded]);
  return (
    <Layout>
      <Section id="register-complete">
        <Grid container className={classes.root}>
          <Grid item>
            {success && (
              <>
                <Box>You have successfully registered.</Box>
                <Box>
                  You will be redirected to your dashboard automatically in 5
                  seconds.
                </Box>
                <Box>
                  <Link to="/">Click here</Link> now to see your dashboard.
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Section>
    </Layout>
  );
};

export default RegisterComplete;
