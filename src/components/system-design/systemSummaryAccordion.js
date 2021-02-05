import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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

export default function CustomizedAccordions(props) {
  const [expanded, setExpanded] = React.useState('panel1');
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
              <Typography >
                <b>Name :</b>
              </Typography>
              </Grid> <Grid item xs={6} >
              <Typography>
                 {personalDetails.firstName} {' '} {personalDetails.lastName}
              </Typography>
            </Grid> 
            <Grid item xs={6} >
              <Typography ><b>Address</b>:</Typography> 
            </Grid> 
            <Grid item xs={6} >
              <Typography variant="p">
              {personalDetails.address}, {' '} {personalDetails.district},{' '} <br/>{personalDetails.pincode},{' '} {personalDetails.state}
              </Typography>
              </Grid>
            <Grid item xs={6} >
              <Typography><b>Electricity Provider</b>: </Typography>
            </Grid>

            <Grid item xs={6} >
              <Typography> {personalDetails.electricityProvider}</Typography>
              </Grid>
              <Grid item xs={6} >
              <Typography><b>Email Address</b>:</Typography> 
            </Grid>
            <Grid item xs={6} >
              <Typography noWrap={false} variant="p" style={{overflowWrap: 'break-word'}}>{personalDetails.email}</Typography>
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
                <Typography variant="subtitle2" style={{textAlign : 'justify'}}>
                 <b>Solar System Size</b>
                </Typography>
                </Grid>

                <Grid item xs={6} >
                <Typography >
                  {systemDesign.systemSize}
                </Typography>
                </Grid>

                <Grid item xs={6} >
                <Typography variant="subtitle2" style={{textAlign : 'justify'}}>
                   <b>System Structure:</b>
                </Typography>
                </Grid>
                <Grid item xs={6} >
                <Typography >
                   {systemDesign.structure}
                </Typography>
                </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography style={{textAlign : 'justify'}}>Payment Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Grid container spacing={2}>
              <Grid item xs={6} >
                <Typography variant="subtitle2" style={{textAlign : 'justify'}}>
                  <b>Solar System Size  </b> :
                 </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography variant="subtitle2">
                    {systemDesign.systemSize}
                 </Typography>
              </Grid>
              
              <Grid item xs={6} >
                <Typography variant="subtitle2" style={{textAlign : 'justify'}}>
                   <b>System Area Required   </b> :
                 </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography variant="subtitle2">
                     {systemDesign.areaRequired} Square Feet
                 </Typography>
              </Grid>

              <Grid item xs={6} >
                <Typography variant="subtitle2" style={{textAlign : 'justify'}}>
                    <b>Net Cost</b> :  
                 </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography variant="subtitle2">
                    &#x20B9; {systemDesign.netCost && systemDesign.netCost.toFixed(2) || '0.00'}
                 </Typography>
              </Grid>


              <Grid item xs={6} >
                <Typography variant="subtitle2" style={{textAlign : 'justify'}}>
                     <b>Down Payment for EMI</b> : 
                 </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography variant="subtitle2">
                    {(systemDesign.netCost * 0.30) && (systemDesign.netCost * 0.30).toFixed(2) || '0.00' }
                 </Typography>
              </Grid>

              <Grid item xs={6} >
                <Typography variant="subtitle2" style={{textAlign : 'justify'}}>
                     <b>EMI @ 12</b> :  
                 </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography variant="subtitle2">
                    &#x20B9; {systemDesign.emiFor12}
                 </Typography>
              </Grid>

              <Grid item xs={6} >
                <Typography variant="subtitle2" style={{textAlign : 'justify'}}>
                     <b>EMI @ 18</b> :  
                 </Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography variant="subtitle2">
                   &#x20B9; {systemDesign.emiFor18}
                 </Typography>
              </Grid>

          </Grid>        
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
