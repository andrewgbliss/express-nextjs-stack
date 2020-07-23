import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import deepOrange from '@material-ui/core/colors/deepOrange';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: indigo,
    secondary: deepOrange,
  },
});

export default theme;
