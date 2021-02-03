import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

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
            <b>Name</b>   : {personalDetails.firstName} {personalDetails.lastName}<br/>
            <b>Address</b>: {personalDetails.address}, {personalDetails.district}, {personalDetails.pincode}, {personalDetails.state}<br/>
            <b>Electricity Provider</b>: {personalDetails.electricityProvider}<br/>
            <b>Email Address</b>: {personalDetails.email}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography style={{textAlign : 'justify'}}>System Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{textAlign : 'justify'}}>
            <b>Solar System Size</b>   : {systemDesign.systemSize}<br/>
            <b>System Structure</b>    : {systemDesign.structure}<br/> 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography style={{textAlign : 'justify'}}>Payment Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
         <Typography style={{textAlign : 'justify'}}>
            <b>Solar System Size  </b> : {systemDesign.systemSize}<br/>
            <b>System Area Required   </b> : {systemDesign.areaRequired} Square Feet<br/> 
            <b>Net Cost</b> : &nbsp;  &#x20B9; {systemDesign.netCost}<br/>
            <b>Down Payment for EMI</b> : {(systemDesign.netCost * 0.30).toFixed(2) }<br/>
            <b>EMI @ 12</b> : &nbsp;  &#x20B9; {systemDesign.emiFor12}<br/>
            <b>EMI @ 18</b> : &nbsp;  &#x20B9; {systemDesign.emiFor18}<br/>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
