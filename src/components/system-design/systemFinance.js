import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import _ from "lodash";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { MuiPickersUtilsProvider,DatePicker } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(0),
      fontSize : '25px'
    },
  },
  systemCost: {
    border: "1px solid " + theme.palette.border,
    minHeight: "170px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  infoBox: {
    border: "1px solid " + theme.palette.border,
    minHeight: "170px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  input: {
    "&:invalid": {
      border: "red solid 2px"
    }
  },
  priceTitle : {
    [theme.breakpoints.down('sm')]: {
      fontSize : '15px'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize : '14px'
    },
   
  }
}));

export default function Review(props) {
  const classes = useStyles();
  const [payment, setPayment] = useState(props.financeDetails.payment);
  const [panNo, setPanNo] = useState(props.financeDetails.panNo);
  const [dob, setDob] = useState(new Date());
  const [emiFor12, setemiFor12] = useState(props.systemFinanceDetails.emiFor12);
  const [emiFor18, setemiFor18] = useState(props.systemFinanceDetails.emiFor18);
  const [netCost, setnetCost] = useState(props.systemFinanceDetails.netCost);

  useEffect(() => {
    const obj = {
      payment,
      panNo,
      dob,
    };
    props.handler(obj);
  }, [payment, panNo, dob]);

  const panHandler= (e) =>{
    var regexp = new RegExp(/^[a-zA-Z0-9 ]*$/);
    if(regexp.test(e.target.value)){
      setPanNo(e.target.value)
    }
   
  }
  return (
    <React.Fragment>
      <Typography variant="h4" className={classes.title}>
        Choose your finance
      </Typography>
      <Grid container spacing={2} justify="center">
        <Grid
          container
          spacing={2}
          alignItems="center"
          justify="center"
          xs={12}
          sm={6}
          style={{
            paddingTop: "10px",
            lineHeight : '0px'
          }}
        >
          <Grid item xs={12}>
            <Box
              style={{
                display : "flex",
                flexDirection : 'column',
                alignItems: "center",
                padding: "10px 10px",
              }}
              m={3}
              p={4}
            >
              <Box variant="h4" component="h4" style={{lineHeight: 'normal'}} className={classes.priceTitle}>
            Total System Cost {' '}- &nbsp; &#x20B9; {netCost}
              </Box>
              <Box variant="h4" component="h4" className={classes.priceTitle}>
                Down Payment* &nbsp; {' '} - &nbsp; &#x20B9; {(netCost * 0.3).toFixed(2)}
              </Box>
              <Box variant="h4" component="h4" className={classes.priceTitle}>
                EMI for 12 Months {' '} - &nbsp; &#x20B9; {emiFor12}
              </Box>
              <Box variant="h4" component="h4" className={classes.priceTitle}>
                EMI for 18 Months {' '} - &nbsp; &#x20B9; {emiFor18}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container style={{marginLeft:'1px'}} spacing={2} xs={10} sm={6} >
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
                <MenuItem value="directonlinepayments">
                  {"Direct Online Payments"}
                </MenuItem>
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
              inputProps={{
                maxlength: 10
              }}
              value={panNo}
              onChange={panHandler}
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12} p={4}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              id="date"
              keyboard
              label="Birthday"
              value={dob}
              placeholder="YYYY/MM/DD"
              format={"YYYY/MM/DD"}
              variant={"outlined"}
              fullWidth
              clearable
              maxDate={new Date()}
              onChange={(date) =>setDob(date)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
