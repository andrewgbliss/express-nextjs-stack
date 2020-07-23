import React from 'react';
import Layout from 'components/Layout/Layout';
import Section from 'sections/Section/Section';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();
  return (
    <Layout>
      <Section id="dashboard">
        <Grid container className={classes.root}>
          <Grid item>Dashboard</Grid>
        </Grid>
      </Section>
    </Layout>
  );
};

export default Dashboard;
