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
import { DatePicker } from "@material-ui/pickers";
import moment from "moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
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
}));

export default function Review(props) {
  const classes = useStyles();
  const [payment, setPayment] = useState(props.financeDetails.payment);
  const [panNo, setPanNo] = useState(props.financeDetails.panNo);
  const [dob, setDob] = useState(moment(new Date()).format("YYYY-MM-DD"));
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

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Choose your finance
      </Typography>
      <Grid container spacing={2}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justify="center"
          xs={12}
          sm={6}
          style={{
            paddingTop: "10px",
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
              <Box variant="h4" component="h4">
                Total System Cost- &nbsp; &#x20B9; {netCost}
              </Box>
              <Box variant="h4" component="h4">
                Down Payment* - &nbsp; &#x20B9; {netCost * 0.3}
              </Box>
              <Box variant="h4" component="h4">
                EMI for 12 Months- &nbsp; &#x20B9; {emiFor12}
              </Box>
              <Box variant="h4" component="h4">
                EMI for 18 Months- &nbsp; &#x20B9; {emiFor18}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container style={{marginLeft:'1px'}} spacing={2} xs={12} sm={6}>
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
              format="dd/MM/yyyy"
              variant="outlined"
              fullWidth
              onChange={(e) => setDob(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
