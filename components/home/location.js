import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/LocationOnOutlined';
import DirectionsIcon from '@material-ui/icons/Directions';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import FormHelperText from '@material-ui/core/FormHelperText';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    border: '1px solid '+theme.palette.primary.main ,
    alignItems: 'center',
    borderRadius: '35px'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase() {
  const classes = useStyles();

  return (
    <><Paper component="form" elevation={0} className={classes.root}>
     
      <InputBase
        className={classes.input}
        autoFocus
        type="number"
        color="primary"
        placeholder="Amount"
        inputProps={{ 'aria-label': 'booking amount' }}
      />
      
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions"> Jaipur &nbsp;
        <ArrowDropDownOutlinedIcon />
      </IconButton>
    </Paper>
    <FormHelperText margin="">Enter your Bill Amount to Estimate Energy Saving</FormHelperText>
    </>
  );
}
