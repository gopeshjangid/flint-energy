import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
const useStyles = makeStyles((theme) => ({
  
  title: {
    marginTop: theme.spacing(2),
    marginBottom : '20px'
  },
  systemCost : {
    border : '1px solid '+theme.palette.border,
    minHeight : '170px',
    padding : '20px',
    display : 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  infoBox : {
    border : '1px solid '+theme.palette.border,
    minHeight : '170px',
    padding : '20px',
    display : 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  Box : {
    padding : '67px'
  },
  divider : {
    width  :'100%'
  }
}));

export default function Review() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className={classes.title}>
        System Summary
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
         <Box className={classes.infoBox}>
         <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                  <Typography variant="h4" align="left" component="h3">Customer Details:</Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                  <Typography variant="h5" align="left" component="h2">Name</Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                  <Typography variant="h5" align="left" component="h2">Gopesh</Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                  <Typography variant="h5" align="left" component="h2">Last Name</Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                  <Typography variant="h5" align="left" component="h2">Jangid</Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                  <Divider className={classes.divider}/>
              </Grid>
              
              <Grid item xs={12} sm={12}>
                  <Typography variant="h4" align="left" component="h3">System Details:</Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                  <Typography variant="h5" align="left" component="h2">System Name</Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                  <Typography variant="h5" align="left" component="h2">Size</Typography>
              </Grid>

              <Grid item xs={12} sm={12}>
                  <Divider className={classes.divider}/>
              </Grid>
              
              <Grid item xs={12} sm={12}>
                  <Typography variant="h4" align="left" component="h3">Payment Details:</Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                  <Typography variant="h5" align="left" component="h2">Payment Mode</Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                  <Typography variant="h5" align="left" component="h2">Size</Typography>
              </Grid>
        
          </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
           <Box className={classes.Box}>
           <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                     Submit
                    </Button>
                    </Box>
        </Grid>
       </Grid>
    </React.Fragment>
  );
}