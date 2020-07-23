import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import defaultTheme from './themes/default';

interface Props {
  children: React.ReactElement;
}

const Theme: React.FC<Props> = props => {
  const { children } = props;
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
