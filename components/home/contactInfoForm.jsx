import React ,{useState, useEffect}  from 'react';
import Image from  "next/image";
import {Typography, Container, Avatar, Button, TextField, Grid, Box, Divider, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/VerifiedUser';
import StarIcon from '@material-ui/icons/Star';

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
  const [mobileNo, setMobileNo] = useState('');

  const [verify , setVerify] = useState(false);
  const [submit , setSubmit] = useState(false);

  return (
    <div id="verification">
    <Container className={classes.container}  maxWidth="lg">
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
            {!submit ? <><Grid item xs={12} sm={6}>
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
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                id="mobile"
                label="Mobile No"
                placeholder={"988-XXX-XXXX"}
                name="mobile"
                autoComplete="mobile"
              />
            </Grid></>
           : <Grid item xs={12}>
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
            onClick={() => props.handler({firstName, lastName, mobileNo})}
            className={classes.submit}
          >
            {!submit ? "Get OTP" : "Verify OTP"} 
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