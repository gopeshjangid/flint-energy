import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Image from  "next/image";
import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  sizeLogoBox : {
    minHeight : '100px',
    padding : '12px'
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
  radioGroup : {
    flexDirection : 'row'
  },
  label : {
    textAlign : 'left',
    borderBottom : '0px'
  },
  leftBottomBox : {
    display : 'flex',

  },
  infoBox : {
    borderRight : '3px solid '+theme.palette.primary.main,
    padding : '12px',
    display : 'flex',
    flexDirection : 'column',
    justifyContent : 'space-around'
  },
  lastBox : {
    padding : '12px',
    display : 'flex',
    flexDirection : 'column',
    justifyContent : 'space-around'
  }
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7} md={7}>
            <Grid container spacing={3} direction="column">
              <Box className={classes.sizeLogoBox}>
                <Image src="/sasksolar.gif" height={300} width={400} />
              </Box>
              <Box className={classes.leftBottomBox} alignContent="center" justifyContent="space-around">
                 <Box className={classes.infoBox} > 
                     <Typography variant="h3" component="h3">350 SF</Typography>
                     <Typography  component="h4">Rooftop Area</Typography>
                  </Box>
                 <Box className={classes.infoBox}>
                    <Typography variant="h3" component="h3">Rs. 5000</Typography>
                     <Typography component="h4">System Cost</Typography>
                 </Box>
                 <Box className={classes.lastBox}>
                    <Typography variant="h3" component="h3">Rs. 5000</Typography>
                     <Typography component="h4">EMI starts at</Typography>
                 </Box>
                   
              </Box>
            </Grid>
        </Grid>
        <Grid item xs={12} sm={5} md={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
          <Box className={classes.box} m={2}>
            <Grid container spacing={2}>
             <Grid item xs={12} sm={12} md={12}>
                <Select
                    fullWidth={true}
                    label="Category"
                    variant="outlined"
                  >
                    <option>select</option>
                  </Select>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                <FormLabel component="h3" variant="h4" className={classes.label}>Structure Type</FormLabel>
                  <RadioGroup aria-label="gender" name="type" className={classes.radioGroup} >
                    <FormControlLabel value="Standard" control={<Radio />} label="Standard" />
                    <FormControlLabel value="Elevated" control={<Radio />} label="Elevated" />
                    <FormControlLabel value="Customize" control={<Radio />} label="Customize" />
                  </RadioGroup>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormLabel component="h3" className={classes.label}>Solar Panel</FormLabel>
                    <RadioGroup aria-label="gender" name="solar" className={classes.radioGroup} >
                      <FormControlLabel value="dc" control={<Radio />} label="DC" />
                      <FormControlLabel value="ac" control={<Radio />} label="AC" />
                    </RadioGroup>
                 </Grid> 
                 <Grid item xs={12} sm={12} md={12}>
                    <FormLabel component="h3" className={classes.label}>Extended Warranty</FormLabel>
                    <RadioGroup aria-label="gender" name="warranty" className={classes.radioGroup} >
                      <FormControlLabel value="1" control={<Radio />} label="1 Year" />
                      <FormControlLabel value="2" control={<Radio />} label="3 Year" />
                      <FormControlLabel value="5" control={<Radio />} label="5 Year" />
                    </RadioGroup>
                 </Grid>
                </Grid>
            </Box>
          </Grid>
          </Grid>
        </Grid>
        
      </Grid>
    </div>
  );
}
