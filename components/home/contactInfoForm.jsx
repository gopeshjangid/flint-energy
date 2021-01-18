import React ,{useState, useEffect}  from 'react';
import Image from  "next/image";
import {Link, Typography,FormControlLabel, Checkbox, Container, Avatar, Button, TextField, Grid, Box, Divider, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/VerifiedUser';
import StarIcon from '@material-ui/icons/Star';
import PanelBlock from  "../common/panelBlock";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  divider : {
    width : '100%',
    marginBottom : '20px',
    marginTop : '20px'
  },
  container : {
    marginBottom : '20px',
  },
  header : {
    marginTop : '30px',
    marginBottom : '30px',
  },
  box : {
    border : '1px solid '+theme.palette.border,
    height : '340px',
    padding : '20px',
    display : 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    borderRadius: '23px'
  },
}));

export default function ContactInfoForm(props) {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const [checked , setCheckbox] = useState(false);

  useEffect(() => {
    props.leadChangeHandler({
      firstName,
      lastName,
      mobile,
      otp
    })
  }, [firstName, lastName, mobile, otp]);

  const isValidLeadForm = () => {
    if(mobile.length >= 10 && checked) return true;
    return false;
  }

  const isValidOtp = () => {
    if(mobile.length >= 10 && otp.length === 6) return true;
    return false;
  }

  return (
    <div id="verification">
    <div className={classes.container} >
      <div className={classes.paper}>
        <div className={classes.header}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Verification
        </Typography>
        </div>
        <PanelBlock> 
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} style={{textAlign : 'center'}} >
        <Image src="/sasksolar.gif" height={215} width={500} />
        <List component="nav" className={classes.root} aria-label="contacts">
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Generate Electricity using solar panel." />
      </ListItem>
      <ListItem button>
      <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
         <ListItemText  primary="Feed the extra Electricity into grid." />
      </ListItem>
      <ListItem button>
      <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText  primary="Enjoy free electricity with Net Meter." />
      </ListItem>
    </List>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className={classes.box}>
          <Typography align="center" component="h3" variant="h4">
            Design your System Now !
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {!isOtpSent &&
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
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
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="tel"
                  value={mobile}
                  
                  onChange={(e) => e.target.value.length <= 10 ?  setMobile(e.target.value) :''}
                  id="mobile"
                  label="Mobile No"
                  placeholder={"988XXXXXXX"}
                  name="mobile"
                  autoComplete="mobile"
                />
              </Grid>
              <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox required color="secondary" onChange={()=> setCheckbox (!checked)} checked={checked} name="saveAddress" value="yes" />}
            label="I have read Flint Energy Privacy Policy"
          />
        </Grid>
            </>
            }
            {
              isOtpSent &&
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
                />&nbsp;&nbsp;
                <Link onClick={props.leadSubmitHandler}>
                  Resend OTP
                </Link>
            </Grid>
           }
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={ !isOtpSent ? () => {props.leadSubmitHandler(); setIsOtpSent(true) } : props.verifyOtpHandler}
            className={classes.submit}
            disabled={
              !((!isOtpSent && isValidLeadForm()) || ( isOtpSent && isValidOtp()))
            }
          >
            {!isOtpSent ? "Get OTP" : "Verify OTP"}
          </Button>
         
        </form>
        </Box>
       </Grid>
      
       </Grid>
       </PanelBlock>
      </div>
     
    </div>
    <Divider className={classes.divider}/>
    </div>
  );
}