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
  const [payment, setPayment] = useState(props.financeDetails.payment);
  const [panNo, setPanNo] = useState(props.financeDetails.panNo);
  const [dob, setDob] = useState(new Date().toLocaleString())
  const [emiFor12,setemiFor12] = useState(props.systemFinanceDetails.emiFor12);
  const [emiFor18,setemiFor18] = useState(props.systemFinanceDetails.emiFor18);
  const [netCost,setnetCost] = useState(props.systemFinanceDetails.netCost)
  console.log(dob)

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
                            &nbsp;  &#x20B9; {netCost}
                        </Typography>
                        <Typography variant="h4" component="h2"></Typography>
                        <Typography variant="h5" component="h4">
                           EMI @ 12 =  &nbsp;  &#x20B9; {emiFor12} | EMI @ 18 =  &nbsp;  &#x20B9; {emiFor18}
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

              <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  value={dob}
                  defaultValue={dob}
                  format="dd/MM/yyyy"
                  onChange={(date) => setDob(date)}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                 
              </Grid>
          </Grid>

        {/* </Box>*/}
        {/*</Grid>*/}
       </Grid>
    </React.Fragment>
  );
}