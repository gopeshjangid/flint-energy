import React , {useState} from "react";
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
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import CustomDesign from './customizeDesign';
import InfoDetails from  "./infoDetails";
import SystemFinance from  "./systemFinance";
import SystemSummary from  "./systemSummary";
import {postSystemDetails} from "../service/services";
import messages from "../../messages";
import { Grid, Box } from '@material-ui/core';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  active: {
    "& $line": {
      borderColor: "#784af4"
    }
  },
  completed: {
    "& $line": {
      borderColor: "#784af4"
    }
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
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
    backgroundColor: "currentColor"
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18
  }
});

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
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
  if(!obj["systemSize"] || !obj["structure"] || (obj["avgbill"] === 0)) return false;
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

export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [systemDesign, setSystemDesign] = useState({
    systemSize: '',
    structure: '',
    solar: '',
    avgbill: ''
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
    <div className={classes.root}>
      <ToastContainer />
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
      <div>
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
          <div className={classes.bottomBar}>
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                  Back
                </Button>
              
               {activeStep < steps.length-1  &&
                <Button
                    disabled={
                      !((activeStep === 0 && isValidSystemDesign(systemDesign) ) ||
                      (activeStep === 1 && isValidPersonalDetails(personalDetails)) ||
                      (activeStep === 2 && isValidFinancialDetails(financeDetails)))
                    }
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                 Next
                </Button>
              }
        </div>
        </Grid>
        </Grid>
       
        )}
      </div>
    </div>
  );
}