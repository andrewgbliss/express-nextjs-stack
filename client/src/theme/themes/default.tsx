import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import amber from '@material-ui/core/colors/amber';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: indigo,
    secondary: amber,
  },
});

export default theme;
