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
          <Typography>Customer Details {personalDetails.firstName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Name   : {personalDetails.firstName} {personalDetails.lastName}<br/>
            Address: {personalDetails.address}, {personalDetails.district}, {personalDetails.pincode}, {personalDetails.state}<br/>
            Electricity Provider: {personalDetails.electricityProvider}<br/>
            Email Address: {personalDetails.email}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>System Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Solar System Size   : {systemDesign.systemSize}<br/>
            System Structure    : {systemDesign.structure}<br/> 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Payment Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
         <Typography>
            Solar System Size   : {systemDesign.systemSize}<br/>
            System Area Required    : {systemDesign.areaRequired} Square Feet<br/> 
            Net Cost : &nbsp;  &#x20B9; {systemDesign.netCost}<br/>
            Down Payment for EMI : {(systemDesign.netCost * 0.30).toFixed(2) }<br/>
            EMI @ 12 : &nbsp;  &#x20B9; {systemDesign.emiFor12}<br/>
            EMI @ 18 : &nbsp;  &#x20B9; {systemDesign.emiFor18}<br/>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
