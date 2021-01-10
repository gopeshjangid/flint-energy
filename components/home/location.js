import React ,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Modal from "./Forms";
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
  helper : {
    paddingLeft: '20px',
    paddingTop: '4px'
  }
}));

export default function CustomizedInputBase() {
  const classes = useStyles();
  const [open , setOpen]  = useState (false);
  const [city , setCity]  = useState ("Select City");
  const selectCity = (city)=>{
    setCity(city)
  }
  const modalHandler = (stat) =>{
      setOpen(stat)
  }
  return (
    <><Paper component="form" elevation={0} className={classes.root}>
      <Modal city={city} modalHandler={modalHandler} open={open} selectCity={selectCity} />
      <InputBase
        className={classes.input}
        autoFocus
        type="number"
        color="primary"
        placeholder="Amount"
        inputProps={{ 'aria-label': 'booking amount' }}
      />
      
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton onClick={()=>setOpen(!open)} color="primary" className={classes.iconButton} aria-label="directions"> {city} &nbsp;
        <ArrowDropDownOutlinedIcon />
      </IconButton>
    </Paper>
    <FormHelperText className={classes.helper}>Enter your Bill Amount to Estimate Energy Saving</FormHelperText>
    </>
  );
}
