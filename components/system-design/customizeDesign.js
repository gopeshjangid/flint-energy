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
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
    textAlign : 'left'
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
                  dsadasdadasd
              </Box>
              <Box>

              </Box>
            </Grid>
        </Grid>
        <Grid item xs={12} sm={5} md={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
          <Box className={classes.box}>
          <Select
                    native
                    fullWidth={true}
                    label="Category"
                    variant="outlined"
                    inputProps={{
                      name: 'category',
                      id: 'outlined-age-native-simple',
                    }}
                  >
                    
                  </Select>
                <FormLabel component="legend" className={classes.label}>Structure Type</FormLabel>
                  <RadioGroup aria-label="gender" name="gender1" className={classes.radioGroup} >
                    <FormControlLabel value="female" control={<Radio />} label="Standard" />
                    <FormControlLabel value="male" control={<Radio />} label="Elevated" />
                    <FormControlLabel value="other" control={<Radio />} label="Customize" />
                  </RadioGroup>
                  <FormLabel component="legend" className={classes.label}>Structure Type</FormLabel>
                  <RadioGroup aria-label="gender" name="gender1" className={classes.radioGroup} >
                    <FormControlLabel value="female" control={<Radio />} label="Standard" />
                    <FormControlLabel value="male" control={<Radio />} label="Elevated" />
                    <FormControlLabel value="other" control={<Radio />} label="Customize" />
                  </RadioGroup>
            </Box>
          </Grid>
          </Grid>
        </Grid>
        
      </Grid>
    </div>
  );
}
