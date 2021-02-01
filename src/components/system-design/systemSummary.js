import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Accordion from "./systemSummaryAccordion";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: "20px",
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
    minHeight: "170px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  Box: {
    padding: "67px",
  },
  divider: {
    width: "100%",
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [paymentId, setPaymentId] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceStatus, setInvoiceStatus] = useState("");
  const [invoiceReceipt, setInvoiceReceipt] = useState("");
  const [signature, setSignature] = useState("");

  useEffect(() => {
    props.handler({
      paymentId,
      invoiceId,
      invoiceStatus,
      invoiceReceipt,
      signature,
    });
  }, [paymentId, invoiceId, invoiceStatus, invoiceReceipt, signature]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className={classes.title}>
        System Summary
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <Box className={classes.infoBox}>
            <Accordion SystemSummary={props} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box className={classes.Box}>
            <div className={classes.root}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleClick}
              >
                Submit
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="success">
                  Details Successfully Submitted!!
                </Alert>
              </Snackbar>
            </div>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
