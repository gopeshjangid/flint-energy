
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

}));

const tiers = [{
  title: 'Recomended',
  price: '0',
  description: '10 KW included',
  buttonText: 'Book Now',
  buttonVariant: 'outlined',
},
{
  title: 'Monthly Savings',
  price: '0',
  description: '10 KW generated',
  buttonText: 'Book Now',
  buttonVariant: 'outlined',
},
{
  title: 'EMI Starts at ',
  price: '0',
  buttonText: 'Book Now',
  buttonVariant: 'outlined',
  description: '',
}]


const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

export default function Pricing() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />   

      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Enter you bill amount to Estimate savings
        </Typography>
        <Grid container>
          <Grid item xs>
            <TextField
              required
              id="billAmount"
              label="Enter Your Bill amount "
              name="billAmount"
              /*  value={this.state.title} */
              variant="outlined"
              fullWidth
              color="secondary"
            /*  onChange={this.onChange} */
            />
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="md">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers?.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ₹{tier.price}
                    </Typography>
                  </div>
                  <ul>
                    <Typography component="li" variant="subtitle1" align="center" key={tier?.description}>
                      {tier?.description}
                    </Typography>
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          ))}



        </Grid>
      </Container>
      <Container maxWidth="xs" className={classes.heroContent}>
        <Grid container>
          <Grid item xs>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              /*   onClick={onSubmit} */
              className={classes.submit}
            >
              Buy Now
          </Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}