import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Phone from 'components/Phone/Phone';
import Section from '../Section/Section';
import BetaAccess from 'components/Forms/BetaAccess/BetaAccess';
import img from 'assets/img/jumbotron.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  phone: {
    width: '75%',
    [theme.breakpoints.down('sm')]: {
      width: '30%',
    },
  },
}));

const Jumbotron: React.FC = () => {
  const classes = useStyles();
  return (
    <Section id="home" backgroundImage={img}>
      <Grid container className={classes.root}>
        <Grid
          container
          justify="center"
          alignItems="center"
          item
          xs={12}
          sm={12}
          md={4}
        >
          <Phone className={classes.phone} />
        </Grid>
        <Grid
          container
          justify="center"
          alignItems="center"
          item
          xs={12}
          sm={12}
          md={8}
        >
          <Box>
            <BetaAccess />
          </Box>
        </Grid>
      </Grid>
    </Section>
  );
};

export default Jumbotron;
