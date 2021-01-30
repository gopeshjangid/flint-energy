import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import Panel from  "../common/panelBlock";
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
   
 },
 panel : {
   background : "white",
   padding :'1px',
   maxWidth  :'97%'
 }
}));


export default function BookingCardInfo(props) {
  const classes = useStyles();
    return (
        <div className={classes.panel}><Grid spacing={2} className={classes.root}  container justify="center">
        <Grid item  sm={4} md={4} xs={12}  >
          <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
          <Typography variant="h5" component="h3">
              {props.cardInfo.suggestedSystem} KWp
            </Typography>
            <Typography variant="h4" component="h3">
            </Typography>
            <Typography variant="h6" component="h3">
               Suggested System
            </Typography>
          </CardContent>
          </Card>
        </Grid>
       
        <Grid item  sm={4} md={4} xs={12}  >
          <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
          <Typography variant="h5" component="h3">
              &#x20B9; {props.cardInfo.monthlySaving}
            </Typography>
            <Typography variant="h4" component="h3">
            </Typography>
            <Typography variant="h6" component="h3">
              Monthly Savings
            </Typography>
          </CardContent>
          </Card>
        </Grid>
       
        <Grid item  sm={4} md={4} xs={12}  >
          <Card className={classes.card}>
          <CardContent className={classes.cardContent} >
          <Typography variant="h5" component="h3">
             &#x20B9; {props.cardInfo.emiStarts}
            </Typography>
            <Typography variant="h4" component="h4">
            </Typography>
            <Typography variant="h6" component="h4">
              Starting EMI
            </Typography>
           
          </CardContent>
          </Card>
        </Grid>
         </Grid>
         </div>
    );
}

