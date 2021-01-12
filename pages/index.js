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
import 'react-toastify/dist/ReactToastify.css';

import messages from "../messages";
import {submitLeadDetails, verifyOtp} from "../components/service/services";

const HomePage = () => {
    const [aParam, setaParam] = useState('');
    const [bParam, setbParam] = useState('');
    const [sessionId, setSessionId] = useState('');

    const [leadDetails, setLeadDetails] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        otp: ''
    })

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

    const leadSubmitHandler = async () => {
        toast.info(messages.FORM_SUBMITING);
        try {
            const obj = {
                firstName : leadDetails.firstName,
                lastName : leadDetails.lastName,
                mobile : leadDetails.mobile,
                aParam,
                bParam
            }
            const res = await submitLeadDetails(obj);
            console.log(res);
            if(res["all_ok"]) toast.done(messages.OTP_SENT)
            else throw new Error(res["error_msg"])
        }catch (err) {
            toast.error(messages.FORM_SUBMIT_UNSUCCESS)
            console.log(err);
        }
    }

    const verifyOtpHandler = async () => {
        toast.info(messages.FORM_SUBMITING);
        try {
            const obj = {
                mobile : leadDetails.mobile,
                otp : leadDetails.otp
            }
            const res = await verifyOtp(obj);
            console.log(res);
            if(res["all_ok"]) {
                toast.done(messages.OTP_VERIFIED);
                setSessionId(res.sessionid)
            }
            else throw new Error(res["error_msg"])
        }catch (err) {
            toast.error(messages.WRONG_OTP)
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
        <ContactInfoForm
            leadChangeHandler={(obj) => setLeadDetails(obj)}
            leadSubmitHandler={() => leadSubmitHandler()}
            verifyOtpHandler={() => verifyOtpHandler()}
        />
    
     
      <About data={JsonData.About} />
      
      <Footer />
      </Layout>
    </>
  );
};

export default HomePage;
