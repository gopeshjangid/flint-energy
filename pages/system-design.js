import React from 'react';
import Dynamic from  "next/dynamic";
const Layout = Dynamic(()=>import('../components/layout'),{loading : ()=><p>Loading...</p>,ssr:true});
import Header from "../components/common/header";
import Stepper from  "../components/system-design/stepper2";

class SystemDesign extends React.Component {

  render() {
    return (
        <>
         <link
        rel="stylesheet"
        href="/static/css/bootstrap.css"
      />
        <Header />
        <Layout  >
           <Stepper />
          </Layout>
          </>
    );
  }
}

export default SystemDesign ;
