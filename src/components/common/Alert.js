import React ,{useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const [openAlert, setOpen] = React.useState(false);
  const {severity , message ,open ,force } = props;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(()=>{
    setOpen(open || force);
  },[open,force])

  return (
    <div className={classes.root}>
      <Snackbar  
         key={"top+right"} 
         open={openAlert} 
         autoHideDuration={5000}
         anchorOrigin={{ vertical : "top", horizontal: "right" }}
          onClose={handleClose}>
         <Alert onClose={handleClose} severity={severity|| "success"}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
