import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
 card : {
   width : '80%'
 },
 root : {
   margin : '20px'
 },
 cardContent : {
  [theme.breakpoints.up('sm')]: {
    borderRight : `4px solid ${theme.palette.primary.main}`
  },
   
 }
}));


export default function BookingCardInfo(props) {
  const classes = useStyles();
    return (
        <><Grid spacing={2} className={classes.root}  container justify="center">
        <Grid item  sm={3} md={3} xs={10}  >
          <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
          <Typography variant="h4" component="h2">
              {props.cardInfo.suggestedSystem} KWp
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
          <CardContent className={classes.cardContent}>
          <Typography variant="h4" component="h2">
              &#x20B9; {props.cardInfo.monthlySaving}
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
          <CardContent className={classes.cardContent} >
          <Typography variant="h4" component="h2">
             &#x20B9; {props.cardInfo.emiStarts}
            </Typography>
            <Typography variant="h4" component="h2">
            </Typography>
            <Typography variant="h5" component="h4">
              Starting EMI
            </Typography>
           
          </CardContent>
          </Card>
        </Grid>
         </Grid>
         </>
    );
}

