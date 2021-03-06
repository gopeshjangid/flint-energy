import React from 'react';
import { withStyles , makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import moment from "moment";
const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  summaryTitle: {
    [theme.breakpoints.down("xs")]: {
      fontSize : '.710rem'
    },
  },

}));

export default function CustomizedAccordions(props) {
  const [expanded, setExpanded] = React.useState('panel1');
  const classes  = useStyles();
  const {personalDetails,financeDetails,systemDesign} = props.SystemSummary;
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Customer Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{textAlign : 'justify'}}>
          <Grid container spacing={2}>
            <Grid item xs={6} >
              <Typography className={classes.summaryTitle}>
                <b>Name :</b>
              </Typography>
              </Grid> <Grid item xs={6} >
              <Typography className={classes.summaryTitle}>
                 {personalDetails.firstName} {' '} {personalDetails.lastName}
              </Typography>
            </Grid> 
            <Grid item xs={6} >
              <Typography className={classes.summaryTitle}><b>Address</b>:</Typography> 
            </Grid> 
            <Grid item xs={6} >
              <Typography variant="p" className={classes.summaryTitle}>
              {personalDetails.address}, {' '} {personalDetails.district},{' '} <br/>{personalDetails.pincode},{' '} {personalDetails.state}
              </Typography>
              </Grid>
            <Grid item xs={6} >
              <Typography className={classes.summaryTitle}><b>Electricity Provider</b>: </Typography>
            </Grid>

            <Grid item xs={6} >
              <Typography className={classes.summaryTitle}> {personalDetails.electricityProvider}</Typography>
              </Grid>
              <Grid item xs={6} >
              <Typography className={classes.summaryTitle}><b>Email Address</b>:</Typography> 
            </Grid>
            <Grid item xs={6} >
              <Typography className={classes.summaryTitle} noWrap={false} variant="p" style={{overflowWrap: 'break-word'}}>{personalDetails.email}</Typography>
              </Grid>
            </Grid>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography style={{textAlign : 'justify'}}>System Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Grid container spacing={2} justify="flex-start">
            <Grid item xs={6} >
                <Typography className={classes.summaryTitle} variant="subtitle2" style={{textAlign : 'justify'}}>
                 <b>Solar System Size</b>
                </Typography>
                </Grid>

                <Grid item xs={6} >
                <Typography  className={classes.summaryTitle}>
                  {systemDesign.systemSize}
                </Typography>
                </Grid>

                <Grid item xs={6} >
                <Typography className={classes.summaryTitle} variant="subtitle2" style={{textAlign : 'justify'}}>
                   <b>System Structure:</b>
                </Typography>
                </Grid>
                <Grid item xs={6} >
                <Typography className={classes.summaryTitle} >
                   {systemDesign.structure ==='0' ? "Standard" : (systemDesign.structure === '1' ? 'Elevated' : 'Customize')}
                </Typography>
                </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography  style={{textAlign : 'justify'}}>Payment Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Grid container spacing={2}>
              <Grid item xs={6} >
                <Typography className={classes.summaryTitle} variant="subtitle2" style={{textAlign : 'justify'}}>
                  <b>Payment Mode  </b> :
                 </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography className={classes.summaryTitle} variant="subtitle2">
                    {financeDetails.payment === 'easyemi' ? 'Easy EMI(s)'  : 'Direct Online Payments'}
                 </Typography>
              </Grid>

              <Grid item xs={6} >
                <Typography className={classes.summaryTitle} variant="subtitle2" style={{textAlign : 'justify'}}>
                  <b>PAN No.  </b> :
                 </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography className={classes.summaryTitle} variant="subtitle2">
                    {financeDetails.panNo}
                 </Typography>
              </Grid>

              <Grid item xs={6} >
                <Typography className={classes.summaryTitle} variant="subtitle2" style={{textAlign : 'justify'}}>
                  <b>Date Of Birth  </b> :
                 </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography className={classes.summaryTitle} variant="subtitle2">
                    {financeDetails.dob && moment(financeDetails.dob).format("YYYY/MM/DD") ||''}
                 </Typography>
              </Grid>
              
              <Grid item xs={6} >
                <Typography className={classes.summaryTitle} variant="subtitle2" style={{textAlign : 'justify'}}>
                    <b>Net Cost</b> :  
                 </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography className={classes.summaryTitle} variant="subtitle2">
                    &#x20B9; {systemDesign.netCost && systemDesign.netCost.toFixed(2) || '0.00'}
                 </Typography>
              </Grid>


              <Grid item xs={6} >
                <Typography className={classes.summaryTitle} variant="subtitle2" style={{textAlign : 'justify'}}>
                     <b>Down Payment for EMI</b> : 
                 </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography className={classes.summaryTitle} variant="subtitle2">
                    {(systemDesign.netCost * 0.30) && (systemDesign.netCost * 0.30).toFixed(2) || '0.00' }
                 </Typography>
              </Grid>

              <Grid item xs={6} >
                <Typography className={classes.summaryTitle} variant="subtitle2" style={{textAlign : 'justify'}}>
                     <b>EMI @ 12</b> :  
                 </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography className={classes.summaryTitle} variant="subtitle2">
                    &#x20B9; {systemDesign.emiFor12}
                 </Typography>
              </Grid>

              <Grid item xs={6} >
                <Typography className={classes.summaryTitle} variant="subtitle2" style={{textAlign : 'justify'}}>
                     <b>EMI @ 18</b> :  
                 </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography className={classes.summaryTitle} variant="subtitle2">
                   &#x20B9; {systemDesign.emiFor18}
                 </Typography>
              </Grid>

          </Grid>        
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
