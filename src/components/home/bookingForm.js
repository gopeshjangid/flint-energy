import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
} from "@material-ui/core";
import { useRouter } from "next/router";
import Cards from "./bookingCardInfo";
import Location from "./location";
import CALC_VARIABLES from "../../app.config";
import PanelBlock from "../common/panelBlock";
import { SettingsBluetoothOutlined } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      padding: "50px 10px",
      // border : '1px solid #c0cecd',
      borderRadius: "13px",
    },
    minHeight: "400px",
  },
  search: {
    margin: theme.spacing(1),
    width: "84%",
  },
  paper: {
    margin: theme.spacing(12, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formLabel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "85%",
  },
  container: {
    justifyContent: "space-around",
    paddingBottom: "45px",
    [theme.breakpoints.up("sm")]: {},
  },
  bookNow: {
    padding: "16px 65px",
    marginTop: "20px",
    fontSize: "14px",
  },
}));

export default function BookingForm(props) {
  const classes = useStyles();
  const [form, setForm] = useState({
    bill: 3500,
    city: "",
  });
  const [cardInfo, setCardInfo] = useState({
    monthlySaving: 0,
    suggestedSystem: 0,
    emiStarts: 0,
  });
  const router = useRouter();
  const BookNowHandler = () => {
    router.push("/#verification");
  };

  useEffect(() => {
    props.setBill(form.bill);
  }, [form]);

  useEffect(() => {
    props.setBill(form.bill);
  }, []);

  const onChangeHandler = () => {
    // --- CALCULATION ---
    const suggestedSystemSize = form.bill / (720 * 2);

    const meterCharge =
      suggestedSystemSize > 6000
        ? form.city.toLowerCase() === "torrentahmedabad" ||
          form.city.toLowerCase() === "torrentsurat"
          ? 16835.74
          : 15166.51
        : form.city.toLowerCase() === "torrentahmedabad" ||
          form.city.toLowerCase() === "torrentsurat"
        ? 5396.86
        : 4045.08;

    const { SYSTEM_COST, SUBSIDY, STRUCTURE_COST } = CALC_VARIABLES;
    const netCost = SYSTEM_COST - SUBSIDY + STRUCTURE_COST + meterCharge;
    const downPayment = netCost * 0.3;

    setCardInfo({
      monthlySaving: (suggestedSystemSize * 720).toFixed(2),
      suggestedSystem: suggestedSystemSize.toFixed(2),
      emiStarts: (((netCost - downPayment) * 1.12) / 12).toFixed(2),
    });
  };

  return (
    <div>
      <Grid container spacing={2} className={classes.container} direction="row">
        <Grid item xs={12} sm={6} md={6} textAlign="center">
          <Location
            onChangeHandler={onChangeHandler}
            onValChangeHandler={(obj) => setForm(obj)}
          />
        </Grid>
      </Grid>
      <Cards cardInfo={cardInfo} />
      <Grid container spacing={8} justifyContent="center">
        <Grid xs={12} item sm={12} md={12} style={{ textAlign: "center" }}>
          <Button
            className={classes.bookNow}
            onClick={BookNowHandler}
            size="large"
            variant="contained"
            color="primary"
          >
            Book Now
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
