import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../components/theme';
import Dynamic from "next/dynamic";
const GA =  Dynamic(()=>import( "../components/google_analytics"),{ssr : true });
//import GA from '../components/google_analytics';
const accountId = process.env.gaId;

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head >
         <meta name="theme-color" content={theme.palette.secondary.main} />
         <GA/>
       
          </Head>
        <body>z
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument