import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const BetaAccess: React.FC = () => {
  return (
    <Paper elevation={8}>
      <Box py={1} px={{ xs: 2, sm: 5 }}>
        <Box
          component="h3"
          pt={{ xs: 1, sm: 4 }}
          fontSize={{ xs: 24, sm: 30, md: 30, lg: 30 }}
          textAlign="center"
        >
          Learning just became easier.
        </Box>
        <Box px={{ xs: 2 }}>
          <p>
            Create your own study path and improve your knowledge in any
            subject.
          </p>
          <p>
            Join any classroom, ask questions, download any lesson, improve at
            your own pace.
          </p>
        </Box>
        <Box pt={2} px={{ xs: 2 }}>
          <form>
            <Box>
              <TextField fullWidth label="Email Address" variant="outlined" />
            </Box>
            <Box py={5} textAlign="center">
              <Button variant="contained" color="secondary">
                Sign Up For Beta Access
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Paper>
  );
};

export default BetaAccess;
