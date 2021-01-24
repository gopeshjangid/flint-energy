import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import Header from "../components/common/header";
import About from "../components/home/about";
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
import Image from  "../components/home/Image";
import {Hidden ,Typography} from  "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    background : {
        backgroundImage : "url('/background-1.jpg')"
    },
    title : {
        padding : '17px',
        paddingBottom  :'40px',
        lineHeight : '25px',
        fontSize : theme.spacing(3),
        color : '#e71b74',
        textAlign : 'center'
    },
    introduction : {
        paddingTop: theme.spacing(18.6),
        marginTop: theme.spacing(8.6),
        marginBottom: theme.spacing(12),
        backgroundSize: 'contain',
        backgroundImage : "url('/solar-fan.jpg')",
        height : '100vh',
        width : '100%',
        [theme.breakpoints.down('xs')]: {
            backgroundSize:     'contain',
            marginTop : theme.spacing(6),
            height : '300px',
            marginBottom: theme.spacing(2),
        },                     
        backgroundRepeat:   'no-repeat',
        backgroundPosition: 'center center'
    },
    imageWrapper : {
        padding: theme.spacing(2),
        position : "relative"
    },
    deskTopBox : {
        position : "absolute",
        top : '135px',
        right : '10%',
        maxWidth : '64%'
    },
    mobileFormBox : {
      paddingTop : '100px',
      marginTop  :'50px'
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
        <Hidden smUp>
          <div className={classes.mobileFormBox}>
          <Typography className={classes.title} variant="h4" component="h4" align="center">
            Concerned about your electricity Bill?
             Install Solar to Enjoy Free energy for 25 Years!
            </Typography>
             <Image  src="/solar-view.jpg" height="500" width={800} />
            
             <BookingForm setBill={setBill} />
          </div>  
         </Hidden>  
        <Hidden xsDown> 
            <div className={classes.imageWrapper}>
            <Typography className={classes.title} variant="h4" component="h4">
            Concerned about your electricity Bill?
             Install Solar to Enjoy Free energy for 25 Years!
            </Typography>
             <Image  src="/solar-view.jpg" height="500" width={800} />
             <div className={classes.deskTopBox}>
                 <BookingForm setBill={setBill} />
             </div>
            
          </div> 
        </Hidden>
        <ContactInfoForm
        
            leadChangeHandler={(obj) => setLeadDetails(obj)}
            leadSubmitHandler={() => leadSubmitHandler()}
            verifyOtpHandler={() => verifyOtpHandler()}
        />
         <div className={classes.imageWrapper}>
           <Image  src="/solar-city.jpg" height="500" width={800} />
         </div>
        {/* <About data={JsonData.About} /> */}
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
