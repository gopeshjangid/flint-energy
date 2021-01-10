import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link  href="https://flintech.co">
        flintech.co
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    // marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
  link : {
    color: theme.palette.primary.main
  }
}));

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
         <Grid item xs={12} sm={4} style={{textAlign : 'center'}} >
           <Link className={classes.link} href="/privacy-policy">Privacy Policy</Link>
         </Grid>
         <Grid item xs={12} sm={4} style={{textAlign : 'center'}} >
             <Copyright/>
          </Grid>
        <Grid item xs={12} sm={4} style={{textAlign : 'center'}} >
            <Link className={classes.link} href="/terms-and-condition">Terms and Conditions</Link>
        </Grid> 
      </Grid>
      </Container>
    </footer>
  );
}
