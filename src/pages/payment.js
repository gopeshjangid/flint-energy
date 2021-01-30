import React ,{useState} from 'react';
import { ThemeProvider ,Box , Container} from 'theme-ui';
import theme from 'theme';
import Layout from 'components/layout';
import bannerBg from 'assets/images/banner-bg.png';
const styles = {
  section: {
    '@media only screen and (min-width: 320px) and (max-width: 420px) ' : {
      height : '1240px'
    },
    '@media only screen and (min-width: 430px) ' : {
      height : '840px'
    },
    background: `url(${bannerBg}) no-repeat center top / cover ,linear-gradient(180deg, rgb(0 0 0 / 12%) 12.92%, rgb(0 0 0 / 12%) 34.86%, rgb(0 0 0 / 12%) 53.44%, rgb(0 0 0 / 12%) 84.3%)`,
    backgroundSize: ['100%', null, null, null, 'cover'],
    paddingTop: '95px'
  },
 
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    textAlign : 'center',
    width  :'100% !important'
  }
};

export default function Payment() {

  const [payment , setPayment] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Box as="section" id="paymentPage" sx={styles.section}>
              <Container >
                 <Box sx={styles.contentWrapper}>
                    payment page start here
                 </Box>
                </Container>
         </Box>
      </Layout>
    </ThemeProvider>
  );
}
