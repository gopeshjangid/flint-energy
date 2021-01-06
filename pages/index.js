import React, { useEffect } from 'react';
import Dynamic from "next/dynamic";
import Header from "../components/common/header";
import About from '../components/home/about';
import Contact from '../components/home/contact';
//const Home = Dynamic(() => import("../components/home"), { loading: () => <p>Loading...</p> });
import JsonData from '../components/home/data/data.json';
import LandingPage from '../components/home/LandingPage';
import Layout from '../components/layout';
import BookingForm from '../components/home/bookingForm';
import  ContactInfoForm  from  "../components/home/contactInfoForm";
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
      <Layout>
      <BookingForm />
         <ContactInfoForm/>
      </Layout>
      
      <About data={JsonData.About} />
      <Contact data={JsonData.Contact} />
    </>
  );

}

export default HomePage;
