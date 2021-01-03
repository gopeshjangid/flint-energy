import React from 'react'
import Router from 'next/router';
//import NProgress from 'nprogress'; //nprogress module
//import 'nprogress/nprogress.css';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from ".././components/theme";
import {pageview} from ".././components/common";
Router.events.on('routeChangeComplete', (url) => pageview(url));
//Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());
export default function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return <>
  
  <ThemeProvider theme={theme}>
  <CssBaseline />
     <Component {...pageProps} />
  </ThemeProvider>
  
</>
}