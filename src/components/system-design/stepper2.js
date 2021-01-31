import React , {useState ,useEffect} from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import cookie from "js-cookie";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Typography from "@material-ui/core/Typography";
import { ToastContainer, toast } from 'react-toastify';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import CustomDesign from './customizeDesign';
import InfoDetails from  "./infoDetails";
import SystemFinance from  "./systemFinance";
import SystemSummary from  "./systemSummary";
import {postSystemDetails} from "../service/services";
import messages from "../../../messages";
import { Grid } from '@material-ui/core';
import {Box ,Radio ,Button } from 'theme-ui';

const useQontoStepIconStyles = makeStyles((theme)=>({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center"
  },
  active: {
    color: "#784af4"
  },
  rectangle: {
    width: 16,
    height: 8,
    borderRadius: "10%",
    backgroundColor: theme.palette.primary
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18
  }
}));

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)"
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1
  }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "10%",
    justifyContent: "center",
    alignItems: "center"
  },
  rectangle: {
    width: 16,
    height: 8,
    borderRadius: "10%",
    backgroundColor: "currentColor"
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
    4: <ConfirmationNumberIcon/>
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node
};

const useStyles1 = makeStyles((theme) => ({
  root: {
    width: "100%",
    background : 'white'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  box :  {
    backgroundColor : 'white'
  },
  bottomBar : {
    textAlign : 'right',
    padding : '15px',
    marginBottom : '10px'
  }
}));

function getSteps() {
  return ['Customize your Design', 'Enter Your Details', 'Choose Your Finance' , 'System Summary'];
}

const isValidSystemDesign = (obj) => {
  if(!obj["systemSize"] || !obj["structure"]) return false;
  console.log(obj)
  return true;
}

const isValidPersonalDetails = (obj) => {
  if(!obj["firstName"] || !obj["lastName"] || !obj["address"] || (obj["pincode"].length < 6) || !obj["electricityProvider"] || !obj["state"] || obj["district"] === "" || !obj["consent"]) return false;
  return true;
}

const isValidFinancialDetails = (obj) => {
  if(!obj["payment"] || !obj["dob"]) return false;
  return true;
}

const style = {
  box  : {
    background : "white",
  },
  button : {
    marginRight : '15px'
  },
  bottomBar : {
    display : 'flex',
    justifyContent : 'flex-end'
  },
  wrapper : {
    width  :'100%'
  }

}

export default function CustomizedSteppers() {
  const classes = useStyles1();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [systemDesign, setSystemDesign] = useState({
    systemSize: '',
    structure: '',
    solar: '',
    avgbill: 0
  });
  const [personalDetails, setPersonalDetails] = useState({
    firstName : '',
    lastName : '',
    email : '',
    address : '',
    pincode : '',
    electricityProvider : '',
    state: '',
    district: '',
    consent: false
  });
  const [financeDetails, setFinanceDetails] = useState({
    payment: '',
    panNo: '',
    dob: ''
  });
  const [razorpayDetails, setRazorpayDetails] = useState({
    paymentId: '',
    invoiceId: '',
    invoiceStatus: '',
    invoiceReceipt: '',
    signature: ''
  });
  const sessionId = cookie.getJSON('sessionId');

  const apiHandler = async () => {
    toast.info(messages.FORM_SUBMITING)
    try{
      let res;
      if(activeStep === 0){
        res = await postSystemDetails(activeStep, systemDesign, sessionId)
      }else if(activeStep === 1){
        res = await postSystemDetails(activeStep, personalDetails, sessionId)
      }else if(activeStep === 2){
        res = await postSystemDetails(activeStep, financeDetails, sessionId)
      }else{
        // res = await
      }
      console.log(res);
      if(res["all_ok"]) {
        toast.success(messages.FORM_SUBMIT_SUCCESS);
      }else{
        toast.error(res["error_msg"]);
      }
    }catch (err) {
      console.log(err)
      throw err;
    }
  }

  useEffect(()=>{
     if(localStorage && localStorage.getItem("bill")){
       setSystemDesign({...systemDesign, avgbill : localStorage.getItem("bill")});
     }
  },[])

  const handleNext = async () => {
    toast.info(messages.FORM_SUBMITING)
    try{
      let res;
      if(activeStep === 0){
        res = await postSystemDetails(activeStep, systemDesign, sessionId)
      }else if(activeStep === 1){
        res = await postSystemDetails(activeStep, personalDetails, sessionId)
      }else if(activeStep === 2){
        res = await postSystemDetails(activeStep, financeDetails, sessionId)
      }else{
        // res = await
      }
      console.log(res);
      if(res["all_ok"]) {
        toast.success(messages.FORM_SUBMIT_SUCCESS);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }else{
        toast.error(res["error_msg"]);
      }
    }catch (err) {
      console.log(err)
      throw err;
    }

    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // if(!sessionId){
  //   return
  // }


  return (
    <Box as="div" id="systemDesign" sx={style.wrapper}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label ,index) => (
          <Step key={index}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box as="div" id="systemDesign" sx={style.box}>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : ( <Grid container spacing={4} className={classes.container} direction="column">
        <Grid xs={12} item  sm={12} md={12} className={classes.stepContent} >
             <Box className={classes.box} mt={2} p={2}>
               {activeStep === 0 && <CustomDesign handler={(obj) => setSystemDesign(obj)} />}
               {activeStep === 1 && <InfoDetails handler={(obj) => setPersonalDetails(obj)} />}
               {activeStep === 2 && <SystemFinance handler={(obj) => setFinanceDetails(obj)} />}
               {activeStep === 3 && <SystemSummary handler={(obj) => setRazorpayDetails(obj)} />}
             </Box>
          </Grid>
          <Grid xs={12} item  sm={12} md={12} className={classes.stepBtnContainer} >
           <Box  sx={style.bottomBar}>
                <Button variant='primary' disabled={activeStep === 0} onClick={handleBack} sx={style.button}>
                  Back
                </Button>
              
               {activeStep < steps.length-1  &&
                <Button
                    disabled={
                      !((activeStep === 0 && isValidSystemDesign(systemDesign) ) ||
                      (activeStep === 1 && isValidPersonalDetails(personalDetails)) ||
                      (activeStep === 2 && isValidFinancialDetails(financeDetails)))
                    }
                  variant='primary'
                  onClick={handleNext}
                >
                 Next
                </Button>
              }
        </Box>
        </Grid>
        </Grid>
       
        )}
      </Box>
    </Box>
  );
}
