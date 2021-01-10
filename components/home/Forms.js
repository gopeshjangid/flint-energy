import React ,{useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
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
export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [city, setCity] = React.useState(props.city || "");
  const classes = useStyles();

  const onCityChange = (e) => {
   setCity(e.target.value)
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
          value={city}
          onChange={onCityChange}
          input={<BootstrapInput />}
        >
           <option value="">Select City</option>
          <option value="Ahamdabad">Ahamdabad</option>
          <option value="Rajkot">Rajkot</option>
          <option value="Baroda">Baroda</option>
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
