import React ,{useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import JsonData from './data/data.json';
import RadioButtons from '../common/radiobuton';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Cards from  "./bookingCardInfo";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useRouter } from 'next/router'
import Location from "./location";
const useStyles = makeStyles((theme) => ({
    root: {
        textAlign : 'center',
        [theme.breakpoints.up('sm')]: {
            padding : '50px 10px',
           // border : '1px solid #c0cecd',
            borderRadius : '13px',
          },
        minHeight : '400px'
    },
    search  :{
        margin: theme.spacing(1),
        width: '84%',
    },
    paper: {
        margin: theme.spacing(12, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formLabel: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
    },
    formControl: {
        margin: theme.spacing(1),
        width : '85%'
      },
      container : {
        justifyContent : 'space-around',
        paddingBottom : '45px',
        [theme.breakpoints.up('sm')]: {
           
          },
          [theme.breakpoints.down('xs')]: {
          },
      },
      bookNow : {
          padding : '16px 65px',
          fontSize : '14px'
      },
      title : {
          padding : '17px',
          paddingBottom  :'40px',
          lineHeight : '25px'
      }
}));

export default function BookingForm() {
    const classes = useStyles();
    const [form ,setForm] = useState({
        amount : 0,
        city : ''
    })
    const router = useRouter();
    const BookNowHandler = ()=>{
        router.push("/#verification");
      }

    const handleChange = ()=>{

    }
    return (
        <Box className={classes.root}>
            <Typography className={classes.title} variant="h4" component="h4">
            Concerned about your electricity Bill?
             Install Solar to Enjoy Free energy for 25 Years!
            </Typography>
        <Grid container spacing={2} className={classes.container} direction="row">
            {/* <Grid xs={12} item  sm={8} md={8}  >
              <TextField id="outlined-search"
              className={classes.search}
              variant="outlined"
               fullWidth
               label="Amount"  type="number" variant="outlined" />
            </Grid> */}
            <Grid item xs={12} sm={4} md={4}  >
                   <Location />
               </Grid>
            </Grid>
          <Cards />
          <Grid container spacing={8}  >
            <Grid xs={12} item  sm={12} md={12}  >
            <Button className={classes.bookNow}
              onClick={BookNowHandler}
              size="large" variant="contained" color="primary">
                Book Now
             </Button>
            </Grid>
            </Grid>
        </Box>
    );
}