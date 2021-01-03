
import React, { useEffect } from 'react';
import Dynamic from "next/dynamic";
import Header from "../components/common/header";
import About from '../components/home/about';
import Contact from '../components/home/contact';
import JsonData from '../components/home/data/data.json';
import LandingPage from '../components/home/LandingPage';
import Navigation from '../components/home/navigation';


const HomePage = () => {

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
            <br />
            <br />
            <LandingPage />
            {/* 
      <About data={JsonData.About} />
      <Contact data={JsonData.Contact} /> */}
        </>
    );

}

export default HomePage;
