import React  from 'react';
import Image from  "next/image";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/VerifiedUser';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
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
    minHeight : '170px',
    padding : '20px',
    display : 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    borderRadius: '23px'
  },
}));

export default function SignUp() {
  const classes = useStyles();
  

  
  return (
    <div id="verification">
    <Container className={classes.container}  maxWidth="md">
      <div className={classes.paper}>
        <div className={classes.header}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Verification
        </Typography>
        </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Image src="/sasksolar.gif" height={300} width={400} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className={classes.box}>
          <Typography align="center" component="h3" variant="h4">
            Design your System Now !
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
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
                id="mobile"
                label="Mobile No"
                name="mobile"
                autoComplete="mobile"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="otp"
                label="6 Digit OTP"
                type="tel"
                id="otp"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Verify OTP
          </Button>
         
        </form>
        </Box>
       </Grid>
       </Grid>
      </div>
     
    </Container>
    <Divider className={classes.divider}/>
    </div>
  );
}