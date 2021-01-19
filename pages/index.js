import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import Header from "../components/common/header";
import About from "../components/home/about";
import JsonData from "../components/home/data/data.json";
import Layout from "../components/layout";
import BookingForm from "../components/home/bookingForm";
import ContactInfoForm from "../components/home/contactInfoForm";
import Footer from "../components/common/footer";
import {referral} from "../components/service/services";
import {useRouter} from "next/router";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import messages from "../messages";
import {submitLeadDetails, verifyOtp} from "../components/service/services";
const useStyles = makeStyles((theme) => ({
    background : {
        backgroundImage : "url('/background-1.jpg')"
    },
    container : {

    },
    introduction : {
        marginTop : theme.spacing(8.6),
        backgroundSize:     'cover',
        backgroundImage : "url('/background-1.jpg')",
        height : '900px',
        [theme.breakpoints.down('xs')]: {
            backgroundSize:     'contain',
            marginTop : theme.spacing(6),
            height : '300px'
        },                     
        backgroundRepeat:   'no-repeat',
        backgroundPosition: 'center center'
    }
   }));
const HomePage = () => {
    const classes = useStyles();
    const [aParam, setaParam] = useState('');
    const [bParam, setbParam] = useState('');
    const [bill, setBill] = useState('');
    const [sessionId, setSessionId] = useState('');
    const router  =  useRouter();
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
            if(res["all_ok"]) {
                toast.success(messages.OTP_SENT);
            }else{
                toast.error(res["error_msg"]);
            }
        }catch (err) {
            toast.error(err)
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
            if(res["all_ok"]) {
                toast.success(messages.OTP_VERIFIED);
                cookie.set('sessionId', res.sessionid);
                router.push("/system-design?bill="+bill);
            }else{
                toast.error(res["error_msg"]);
            }
            // console.log(cookie.getJSON('sessionId'))
        }catch (err) {
            toast.error(err)
            console.log(err);
        }
    }

  return (
    <>
      <Header />
      <div className={classes.container}>
        <ToastContainer />
        <div className={classes.introduction}>
        </div>
        <BookingForm setBill={setBill} />
        <ContactInfoForm
        
            leadChangeHandler={(obj) => setLeadDetails(obj)}
            leadSubmitHandler={() => leadSubmitHandler()}
            verifyOtpHandler={() => verifyOtpHandler()}
        />
        <About data={JsonData.About} />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
