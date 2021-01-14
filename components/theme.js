import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e71b74',
    },
    secondary: {
      main: '#e71b74',
    },
    error: {
      main: red.A400,
    },
    border : '#c1d7d5',
    background: {
      default: '#fff',
    },
    color : '#355a4b',
  },
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: 14,
    display4: {
      fontSize: 14,
    },
    display3: {
      fontSize: 14,
    },
    display2: {
      fontSize: 14,
    },
    display1: {
      fontSize: 14,
    },
    headline: {
      fontSize: 13,
    },
    title: {
      fontSize: 13,
    },
    subheading: {
      fontSize: 13,
    },
    body2: {
      fontSize: 13,
    },
    body1: {
      fontSize: 13,
    },
    caption: {
      fontSize: 14,
    },
    button: {
      fontSize: 14,
    },
    buttonColor :'#ff3e97'
  },
});

export default theme;
