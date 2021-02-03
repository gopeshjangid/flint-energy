import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Accordion from "./systemSummaryAccordion";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
   modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  media: {
    height: 200,
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const [paymentId, setPaymentId] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [invoiceStatus, setInvoiceStatus] = useState("");
  const [invoiceReceipt, setInvoiceReceipt] = useState("");
  const [signature, setSignature] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
               <div>
      <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleOpen}
              >
                Submit
              </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Details Submitted</h2>
            <p id="transition-modal-description">Thanks for submitting the details, Our team shall reach back
                  to you shortly.</p>
                      <Card>
        <CardMedia
          className={classes.media}
          image="/thankyou.jpg"
          title="Contemplative Reptile"
        />
    </Card>
          </div>
        </Fade>
      </Modal>
    </div>
            </div>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
