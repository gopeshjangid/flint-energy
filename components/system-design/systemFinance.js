import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

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

export default function Review() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Choose your finance
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box className={classes.systemCost}>
            <Typography variant="h5" component="h2">Total System Cost</Typography>
            <Typography variant="h5" component="h2">Rs. 5,00,000</Typography>
            <Typography variant="h5" component="h2">EMI 12 ***** | EMI 18 *****</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
         <Box className={classes.infoBox}>
            <Typography variant="h5" component="h2">Payment Mode</Typography>
            <Typography variant="h5" component="h2">Loan</Typography>
            <Typography variant="h5" component="h2">Upfront</Typography>
            <Typography variant="h5" component="h2">PAN No</Typography>
            <Typography variant="h5" component="h2">Date Of Birth</Typography>
         </Box>
        </Grid>
       </Grid>
    </React.Fragment>
  );
}