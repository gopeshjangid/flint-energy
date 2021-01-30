import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import SEO from 'components/seo';
import Layout from 'components/layout';
import Stepper from  "../components/system-design/stepper2";
import {  Box, Container} from 'theme-ui';
import bannerBg from 'assets/images/banner-bg.png';

const styles = {
  section: {
    background: `url(${bannerBg}) no-repeat center top / cover ,linear-gradient(180deg, rgb(0 0 0 / 12%) 12.92%, rgb(0 0 0 / 12%) 34.86%, rgb(0 0 0 / 12%) 53.44%, rgb(0 0 0 / 12%) 84.3%)`,
    backgroundSize: ['100%', null, null, null, 'cover'],
    paddingTop: '95px'
  },
 
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    textAlign : 'center',
  }
};
class SystemDesign extends React.Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
          <Layout>
            <SEO title="FlinTech" />
            <Box as="section" id="systemDesign" sx={styles.section}>
              <Container>
                 <Box sx={styles.contentWrapper}>
                    <Stepper/>
                 </Box>
                </Container>
             </Box>
           
         </Layout>
        </ThemeProvider>
    );
  }
}



export default SystemDesign ;
