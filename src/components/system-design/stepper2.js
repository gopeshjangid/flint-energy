import React, { useState, useEffect } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import CALC_VARIABLES from "../../../app.config";
import CustomDesign from "./customizeDesign";
import InfoDetails from "./infoDetails";
import SystemFinance from "./systemFinance";
import SystemSummary from "./systemSummary";
import { postSystemDetails } from "../service/services";
import messages from "../../../messages";
import { Grid } from "@material-ui/core";
import { Box, Radio, Button } from "theme-ui";
import Alert from "../common/Alert";

const useQontoStepIconStyles = makeStyles((theme) => ({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  rectangle: {
    width: 16,
    height: 8,
    borderRadius: "10%",
    backgroundColor: theme.palette.primary,
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
}));

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
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
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
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
    alignItems: "center",
  },
  rectangle: {
    width: 16,
    height: 8,
    borderRadius: "10%",
    backgroundColor: "currentColor",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
    4: <ConfirmationNumberIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
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
  icon: PropTypes.node,
};

const useStyles1 = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: "white",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  box: {
    backgroundColor: "white",
  },
  bottomBar: {
    textAlign: "right",
    padding: "15px",
    marginBottom: "10px",
  },
  stepper : {
    justifyContent: 'center'
  }
}));

function getSteps() {
  return [
    "Customize your Design",
    "Enter Your Details",
    "Choose Your Finance",
    "System Summary",
  ];
}


const style = {
  box: {
    background: "white",
  },
  button: {
    marginRight: "15px",
  },
  bottomBar: {
    display: "flex",
    justifyContent: "center",
    marginRight : '10px'
  },
  wrapper: {
    width: "100%",
  },
};

export default function CustomizedSteppers() {
  const classes = useStyles1();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [systemDesign, setSystemDesign] = useState({
    systemSize: "",
    structure: "1",
    solar: "standard",
    avgbill: 0,
    areaRequired: 0,
    systemCost: CALC_VARIABLES.SYSTEM_COST,
    netCost: 0,
    monthlySaving: 0,
    suggestedSystem: 0,
    emiFor12: 0,
    emiFor18: 0,
  });
  const [personalDetails, setPersonalDetails] = useState({
    firstName:
      typeof window !== "undefined" && window.localStorage.getItem("firstName")
        ? window.localStorage.getItem("firstName")
        : "",
    lastName:
      typeof window !== "undefined" && window.localStorage.getItem("lastName")
        ? window.localStorage.getItem("lastName")
        : "",
    email: "",
    address: "",
    pincode: "",
    electricityProvider: "",
    state: "",
    district: "",
  });
  const [financeDetails, setFinanceDetails] = useState({
    payment: "",
    panNo: "",
    dob: "",
  });
  const [razorpayDetails, setRazorpayDetails] = useState({
    paymentId: "",
    invoiceId: "",
    invoiceStatus: "",
    invoiceReceipt: "",
    signature: "",
  });
  const [message, setMessage] = useState({
    open: false,
    message: "",
    type: "error",
  });
  const sessionId = cookie.getJSON("sessionId");
  const [FieldError,setFieldError] = useState('');
  const handleNext = async (e) => {
    let res;
    toast.info(messages.FORM_SUBMITING);
    try {
      if (activeStep === 0) {
        if (!systemDesign["systemSize"])
        {
          setFieldError("Please Enter System Size") 
        }
        else if (!systemDesign["structure"])
        {
          setFieldError("Please Enter System Structure");
        }
        else{
          setFieldError('');
          res = await postSystemDetails(activeStep, systemDesign, sessionId);
        }
      } else if (activeStep === 1) {
        if(!personalDetails["firstName"])
        {
          setFieldError("Please Enter First Name");
        }
        else if(!personalDetails["lastName"])
        {
          setFieldError("Please Enter Last Name");          
        }
        else if(!personalDetails["address"])
        {
          setFieldError("Please Enter Address");
        }
        else if(!personalDetails["pincode"])
        {
          setFieldError("Please Enter Pincode");          
        }
        else if(personalDetails["pincode"].length<6)
        {
          setFieldError("Pincode length should be Greater than 6.");  
        }
        else if(!personalDetails["electricityProvider"])
        {
          setFieldError("Please Enter Electricity Provide");          
        }
        else if(!personalDetails["state"])
        {
          setFieldError("Please Enter State");          
        }
        else if(!personalDetails["district"])
        {
          setFieldError("Please Enter District");          
        }
        else
        {
          res = await postSystemDetails(activeStep, personalDetails, sessionId);
          setFieldError('');
        }
      } else if (activeStep === 2) {
        if(!financeDetails["payment"])
        {
          setFieldError("Please Enter Payment Mode");          
        }
        else if(!financeDetails["dob"])
        {
          setFieldError("Please Enter Date of Birth"); 
        }
        else
        {
        res = await postSystemDetails(activeStep, financeDetails, sessionId);
          setFieldError('');
        }
      }
      if(res && res["all_ok"])
      {
        setMessage({  
          open: false,
    message: "",
    type: "error"
    });
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
      else if(!res&&!res["all_ok"]){
        alert(res["error_msg"])
      }
    } catch (err) {
      console.log(err);
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
      <Alert {...message} />
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        className={classes.stepper}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
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
        ) : (
          <Grid
            container
            spacing={4}
            className={classes.container}
            direction="column"
          >
            <Grid xs={12} item sm={12} md={12} className={classes.stepContent}>
              <Box className={classes.box} mt={2} p={2}>
                {activeStep === 0 && (
                  <CustomDesign
                    systemDesign={systemDesign}
                    handler={(obj) => setSystemDesign(obj)}
                  />
                )}
                {activeStep === 1 && (
                  <InfoDetails
                    personalDetails={personalDetails}
                    handler={(obj) => setPersonalDetails(obj)}
                  />
                )}
                {activeStep === 2 && (
                  <SystemFinance
                    systemFinanceDetails={systemDesign}
                    financeDetails={financeDetails}
                    handler={(obj) => setFinanceDetails(obj)}
                  />
                )}
                {activeStep === 3 && (
                  <SystemSummary
                    handler={(obj) => setRazorpayDetails(obj)}
                    systemDesign={systemDesign}
                    financeDetails={financeDetails}
                    personalDetails={personalDetails}
                    razorpayDetails={razorpayDetails}
                  />
                )}
              </Box>
            </Grid>
            <Grid
              xs={12}
              item
              sm={12}
              md={12}
              className={classes.stepBtnContainer}
            >
              <div style={{ color: '#D8000C',marginBottom:'25px',fontSize:'18px'}}>  {FieldError}</div>
              <Box sx={style.bottomBar}>
                <Button
                  variant="primary"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={style.button}
                >
                  Back
                </Button>
                {activeStep < steps.length - 1 && (
                  <Button
                    variant="primary"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
