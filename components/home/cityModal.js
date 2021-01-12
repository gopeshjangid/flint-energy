import React ,{useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Cities from "../data/district.json";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  FormControl,
  Select,
  NativeSelect,
  InputBase } from '@material-ui/core';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));
export default function Forms(props) {
  const [open, setOpen] = React.useState(false);
  const [city, setCity] = React.useState(props.city || "");
  const classes = useStyles();

  const onCityChange = (e) => {
    const district = Cities.districts.filter(city => city.id == e.target.value);
    setCity({id: e.target.value ,city : district.length ? district[0].city : ''})
  };

  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(()=>{
    setOpen(props.open);
  },[props.open])
  
  const selectCity = () =>{ 
    props.selectCity(city);
    props.modalHandler(false)
    setOpen(false);
  }

  const handleClose = () => {
    props.modalHandler(false)
    setOpen(false);
  };

  return (
    
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          
      <FormControl className={classes.margin}>
        <InputLabel id="demo-customized-select-label">State</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          value="Gujrat"
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option value="Gujrat">Gujrat</option>
        </Select>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native">City</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={city.id}
          onChange={onCityChange}
          input={<BootstrapInput />}
        >
           <option value="">Select City</option>
           {
             Cities.districts.map( (city ,index) => <option key={"city"+index} value={city.id}>{city.city}</option>)
           }
        </NativeSelect>
      </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={selectCity} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
   
  );
}
