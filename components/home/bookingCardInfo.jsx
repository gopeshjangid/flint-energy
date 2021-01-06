import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
 card : {
   width : '80%'
 },
 root : {
   margin : '20px'
 }
}));


export default ()=> {
  const classes = useStyles();
    return (
        <><Grid spacing={4} className={classes.root}  container justify="center">
        <Grid item  sm={3} md={3} xs={10}  >
          <Card className={classes.card}>
          <CardContent>
          <Typography variant="h4" component="h2">
              3.3 KWp
            </Typography>
            <Typography variant="h4" component="h2">
            </Typography>
            <Typography variant="h5" component="h4">
               Suggested System
            </Typography>
          </CardContent>
          </Card>
        </Grid>
       
        <Grid item  sm={3} md={3} xs={10}  >
          <Card className={classes.card}>
          <CardContent>
          <Typography variant="h4" component="h2">
              Rs 5000
            </Typography>
            <Typography variant="h4" component="h2">
            </Typography>
            <Typography variant="h5" component="h4">
              Monthly Savings
            </Typography>
           
           
          </CardContent>
          </Card>
        </Grid>
       
        <Grid item  sm={3} md={3} xs={10}  >
          <Card className={classes.card}>
          <CardContent>
          <Typography variant="h4" component="h2">
              RS.  5000
            </Typography>
            <Typography variant="h4" component="h2">
            </Typography>
            <Typography variant="h5" component="h4">
              EMI Starts at
            </Typography>
           
          </CardContent>
          </Card>
        </Grid>
         </Grid>
         </>
    );
}

