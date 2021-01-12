import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, Divider, IconButton, FormHelperText} from '@material-ui/core';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';

import Modal from "./Forms";

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

export default function Location(props) {
  const classes = useStyles();
  const [open , setOpen]  = useState (false);
  const [city , setCity]  = useState ("Select City");
  const [bill, setBill] = useState('');

  useEffect(() => {
    props.onValChangeHandler({bill, city});
  }, [city, bill]);
  useEffect(() => {
    props.onChangeHandler();
  }, [bill])

  return (
    <><Paper component="form" elevation={0} className={classes.root}>
      <Modal city={city} modalHandler={(stat) => setOpen(stat)} open={open} selectCity={(city) => setCity(city)} />
      <InputBase
        className={classes.input}
        autoFocus
        type="number"
        color="primary"
        placeholder="Amount"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
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
