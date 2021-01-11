import React, { useEffect, useState } from "react";
import Dynamic from "next/dynamic";
import Header from "../components/common/header";
import About from "../components/home/about";
import Contact from "../components/home/contact";
import JsonData from "../components/home/data/data.json";
import LandingPage from "../components/home/LandingPage";
import Layout from "../components/layout";
import BookingForm from "../components/home/bookingForm";
import ContactInfoForm from "../components/home/contactInfoForm";
import Footer from "../components/common/footer";
import {referral} from "../components/service/services";
import {toast, ToastContainer} from "react-toastify";
import messages from "../messages";

const HomePage = () => {
    const [aParam, setaParam] = useState('');
    const [bParam, setbParam] = useState('');


    useEffect(() => {
        const str = window?.location.href?.split("?")[1];
        if(str){
            const a = str.split("&")[0].split("=")[1];
            const b = str.split("&")[1].split("=")[1];
            setaParam(a);
            setbParam(b);
            try{
                const res = referral(a, b);
            }catch (err) {
                console.log(err)
            }
        }
    }, [])

    const leadHandler = async (obj) => {
        toast.info(messages.FORM_SUBMITING);
        try {
            obj["a_param"] = aParam;
            obj["b_param"] = bParam;
            const res = await submitLeadDetails(obj);

            if(res["all_ok"]) toast.done(messages.OTP_SENT)
        }catch (err) {
            toast.error(messages.FORM_SUBMIT_UNSUCCESS)
            console.log(err);
        }
    }
  return (
    <>
      <link rel="stylesheet" href="/static/css/bootstrap.css" />
      <Header />
      <Layout>
          <ToastContainer />
        <BookingForm />
        <ContactInfoForm handler={(obj) => leadHandler(obj)} />
    
     
      <About data={JsonData.About} />
      <Contact data={JsonData.Contact} />
      <Footer />
      </Layout>
    </>
  );
};

export default HomePage;
