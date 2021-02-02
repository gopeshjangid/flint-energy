/** @jsx jsx */
import {
  jsx,
  Box,
  Button as TButton,
  Container,
  Image,
  Text,
  Field,
  Label,
  Checkbox,
} from "theme-ui";
import {
  Grid,
  Button,
  Box as MBox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Typography,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import SectionHeading from "components/section-heading";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import AnimatedGif from "assets/images/sasksolar.gif";
import {
  submitLeadDetails,
  verifyOtp,
  referral,
} from "components/service/services";
import { useRouter } from "next/router";
import messages from "../../messages";
import Alert from "../components/common/Alert";
import cookie from "js-cookie";
import AutomaticPlayer from "./video.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  divider: {
    width: "100%",
    marginBottom: "20px",
    marginTop: "20px",
  },
  container: {
    marginBottom: "20px",
  },
  header: {
    marginTop: "30px",
    marginBottom: "30px",
  },
  box: {
    border: "1px solid " + theme.palette.border,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    borderRadius: "23px",
  },
}));

const ContactForm = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const [aParam, setaParam] = useState("");
  const [bParam, setbParam] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [checked, setCheckbox] = useState(false);
  const [message, setMessage] = useState({
    open: false,
    message: "",
    type: "error",
  });
  const { bill } = props;

  useEffect(() => {}, [firstName, lastName, mobile, otp]);

  const isValidLeadForm = () => {
    if (mobile.length >= 10 && checked) return true;
    return false;
  };

  const isValidOtp = () => {
    if (mobile.length >= 10 && otp.length === 6) return true;
    return false;
  };

  useEffect(() => {
    const str = window?.location.href?.split("?")[1];
    if (str) {
      const a = str.split("&")[0].split("=")[1];
      const b = str.split("&")[1].split("=")[1];
      setaParam(a);
      setbParam(b);
      try {
        const res = referral(a, b);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const leadSubmitHandler = async () => {
    setMessage({
      ...message,
      message: messages.FORM_SUBMITING,
      type: "info",
      open: true,
    });
    try {
      const obj = {
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        aParam,
        bParam,
      };
      const res = await submitLeadDetails(obj);
      if (res["all_ok"]) {
        setMessage({
          ...message,
          message: messages.OTP_SENT,
          severity: "success",
          open: true,
        });
        setIsOtpSent(true);
      } else {
        setMessage({
          ...message,
          message: res["error_msg"],
          severity: "error",
          open: true,
        });
      }
    } catch (err) {
      setMessage({ ...message, message: err, severity: "error", open: true });
      console.log(err);
    }
  };

  const verifyOtpHandler = async () => {
    setMessage({ message: "Verifying...", severity: "info", open: true });
    try {
      const obj = {
        mobile: mobile,
        otp: otp,
      };
      const res = await verifyOtp(obj);
      if (res["all_ok"]) {
        setMessage({
          message: messages.OTP_VERIFIED,
          severity: "success",
          open: true,
        });
        cookie.set("sessionId", res.sessionid);
        if (localStorage) {
          localStorage.setItem("bill", bill);
          localStorage.setItem("firstName", firstName);
          localStorage.setItem("lastName", lastName);
          localStorage.setItem("mobile", mobile);
        }
        router.push("/system-design");
      } else {
        setMessage({
          message: res["error_msg"],
          severity: "error",
          open: true,
        });
      }
      // console.log(cookie.getJSON('sessionId'))
    } catch (err) {
      setMessage({ message: err, severity: "error", open: true });
      console.log(err);
    }
  };

  return (
    <Box id="verification" as="section" sx={styles.section}>
      <Alert {...message} />
      <Container>
        <SectionHeading title="Let the Sun Pay Your Bills" />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
            <AutomaticPlayer />
            <List
              component="nav"
              className={classes.root}
              aria-label="contacts"
            >
              <ListItem button>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText primary="Generate Electricity using solar panel." />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText primary="Feed the extra Electricity into grid." />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText primary="Enjoy free electricity with Net Meter." />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MBox className={classes.box}>
              <Typography align="center" component="h3" variant="h4">
                Design your System Now !
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  {
                    <>
                      <Grid item xs={12} sm={12}>
                        <Field
                          autoComplete="fname"
                          name="firstName"
                          required
                          variant="outlined"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          id="firstName"
                          label="First Name"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Field
                          variant="outlined"
                          required
                          fullWidth
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="lname"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          variant="outlined"
                          required
                          fullWidth
                          type="tel"
                          value={mobile}
                          onChange={(e) =>
                            e.target.value.length <= 10
                              ? setMobile(e.target.value)
                              : ""
                          }
                          id="mobile"
                          label="Mobile No"
                          placeholder={"988XXXXXXX"}
                          name="mobile"
                          autoComplete="mobile"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Label mb={3}>
                          <Checkbox
                            required
                            color="secondary"
                            onChange={() => setCheckbox(!checked)}
                            checked={checked}
                            name="saveAddress"
                            value="yes"
                          />
                          <Text sx={styles.checkboxLabel}>
                            have read Flint Energy Privacy Policy
                          </Text>
                        </Label>
                      </Grid>
                    </>
                  }
                  {isOtpSent && (
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        label="6 Digit OTP"
                        type="tel"
                        id="otp"
                      />
                      &nbsp;&nbsp;
                    </Grid>
                  )}
                </Grid>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={
                    !isOtpSent
                      ? () => {
                          leadSubmitHandler();
                        }
                      : verifyOtpHandler
                  }
                  className={classes.submit}
                  disabled={
                    !(
                      (!isOtpSent && isValidLeadForm()) ||
                      (isOtpSent && isValidOtp())
                    )
                  }
                >
                  {!isOtpSent ? "Get OTP" : "Verify OTP"}
                </Button>
                {isOtpSent && (
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={leadSubmitHandler}
                    className={classes.submit}
                  >
                    {"Resend OTP"}
                  </Button>
                )}
              </form>
            </MBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactForm;

const styles = {
  section: {
    pt: [50, 50, 50, 70, 60, 80],
    pb: [30, 40, 50, 60, 50, 80],
    checkboxLabel: {
      paddingTop: "5px",
    },
  },
  clients: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    pt: [0, 0, 25, 25, 25, 6],
    "&.slick-slider": {
      marginBottom: "40px",
    },
    ".slick-track": {
      display: "flex",
      alignItems: "center",
    },
  },
  logo: {
    display: "flex !important",
    justifyContent: "center",
    mx: "10px",
    ":focus": {
      outline: "none",
    },
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  paginationButton: {
    minHeight: "30px",
    padding: 0,
    position: "absolute",
    bottom: "-60px",
    ":focus": {
      outline: "0 none",
    },
    svg: {
      transition: "all 0.2s ease-in-out 0s",
    },
    "&.slick-disabled": {
      color: "#BBC7D7",
      svg: {
        transform: "scale(0.8)",
      },
    },
    "&.slick-prev": {
      left: "calc(50% - 16px)",
      transform: "translateX(-50%)",
    },
    "&.slick-next": {
      transform: "translateX(50%)",
      right: "calc(50% - 16px)",
    },
  },
};
