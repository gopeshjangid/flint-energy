import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#355a4b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    color : '#355a4b',
    link : {
      color : '#000',
      textDecoration : 'none',
      fontWeight : '400',
      fontSize :'14px',
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      textAlign : 'center',
      '&:hover' : {
         borderBottom : '3px solid #4d8191',
         padding :'5px',
        }
    },
    linkText : {
      color : '#355a4b',
      textDecoration : 'none',
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      fontWeight : '400',
      fontSize :'14px',
    },
    linkSelect : {
      color : '#226c82',
      textDecoration : 'none',
      borderBottom : '3px solid #226c82',
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      padding :'5px',
      whiteSpace: 'nowrap',
      fontWeight : '600',
    }
  },
});

export default theme;
