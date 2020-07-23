import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useTheme, Theme } from '@material-ui/core/styles';

const Footer: React.FC = () => {
  const today: Date = new Date();
  const theme: Theme = useTheme();
  return (
    <Grid
      container
      justify="center"
      style={{
        backgroundColor: theme.palette.primary.main,
        backgroundImage: `radial-gradient(${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
      }}
    >
      <Box p={5} color="#fff">
        Copyright &copy; {today.getFullYear()} abybyo
      </Box>
    </Grid>
  );
};

export default Footer;
