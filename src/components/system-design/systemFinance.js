import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import _ from "lodash";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { DatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import  {Card, CardContent} from "@material-ui/core";
const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles((theme) => ({
  
  title: {
    marginTop: theme.spacing(2),
  },
  systemCost : {
    border : '1px solid '+theme.palette.border,
    minHeight : '170px',
    padding : '20px',
    display : 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  infoBox : {
    border : '1px solid '+theme.palette.border,
    minHeight : '170px',
    padding : '20px',
    display : 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
}));

export default function Review(props) {
  const classes = useStyles();

  const [payment, setPayment] = useState('');
  const [panNo, setPanNo] = useState('');
  const [dob, setDob] = useState(new Date())


    useEffect(() => {
        const obj = {
            payment,
            panNo,
            dob,
        }
        props.handler(obj);
    }, [payment, panNo, dob]);

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Choose your finance
      </Typography>
      
      <Grid container spacing={2}>
         <Grid container spacing={2} alignItems='center' justify="center" xs={12} sm={6}>
             <Grid  item xs={12} >
                      <Box m={3} p={4}> 
                        <Typography variant="h4" component="h3">
                           Total System Cost
                        </Typography>
                        <Typography variant="h4" component="h2"></Typography>
                        <Typography variant="h4" component="h2">
                            &nbsp;  &#x20B9; 50,000
                        </Typography>
                        <Typography variant="h4" component="h2"></Typography>
                        <Typography variant="h5" component="h4">
                           EMI 12 ***** | EMI 18 *****
                        </Typography>
                     </Box>   
             </Grid>
         </Grid>
          <Grid container spacing={2}  xs={12} sm={6}>
              <Grid item xs={12} p={4}>
                  <FormControl required variant="outlined" fullWidth={true}>
                      <InputLabel htmlFor="payment mode">Payment Mode</InputLabel>
                      <Select
                          id="paymentMode"
                          fullWidth={true}
                          value={payment}
                          onChange={(e) => setPayment(e.target.value)}
                          label="Payment mode"
                          variant="outlined"
                      >
                          <MenuItem value="directonlinepayments">{"Direct Online Payments"}</MenuItem>
                          <MenuItem value="easyemi">{"Easy EMI(s)"}</MenuItem>
                      </Select>
                  </FormControl>
              </Grid>
              <Grid item xs={12}>
                  <TextField
                      id="panNo"
                      name="panNo"
                      label="PAN No"
                      variant="outlined"
                      fullWidth
                      value={panNo}
                      onChange={(e) => setPanNo(e.target.value)}
                      autoComplete="family-name"
                  />
              </Grid>
              <Grid item xs={12} p={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                          required
                          disableFuture
                          fullWidth={true}
                          variant="inline"
                          format="dd/MM/yyyy"
                          label="Date of birth"
                          onChange={(date) => setDob(date)}
                          value={dob}
                      />
                  </MuiPickersUtilsProvider>
              </Grid>
          </Grid>

        {/* </Box>*/}
        {/*</Grid>*/}
       </Grid>
    </React.Fragment>
  );
}