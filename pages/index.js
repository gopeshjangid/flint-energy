import React from 'react';
import Dynamic from "next/dynamic";
import Header from  "../components/common/header"; ;
const Home =  Dynamic(()=>import("../components/home"),{loading :()=><p>Loading...</p> }) ;

const HomePage =()=> {
 
    return (
        <>
        <link
            rel="stylesheet"
            href="/static/css/bootstrap.css"
          />
          <link
            rel="stylesheet"
            href="/static/css/style.css"
          />
        <Header />

       </>
    );
  
}

export default HomePage ;
