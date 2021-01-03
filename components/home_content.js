import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/typography';
import Button from '@material-ui/core/Button';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import SignUp from  "../components/signUp";
import SignIn from  "../components/signIn";
import {useRouter} from  "next/router";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import Footer from  "./views/partials/footer";
const styles = (theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#fff',
    overflow: 'hidden',
    position : "relative",
    marginTop: theme.spacing(8),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
  },
  box :{
    width : "90%",
    padding : "10px",
    display: "flex",
    justifyContent : "space-around",
    minHeight : "200px",
    flexWrap : "wrap"
  },
  signUp : {

  },
  cardHeader: {
    backgroundColor: '#355a4b',
    color : 'white'
  },
  topicList : {
    listStyle : 'none'
  }

});

let category = {
                 technology : ["Programming Language" ,"Database" ,"Cloud Plateforms" ,"Blogging SEO"],
                  health : ["Lifestyle" ,"Helath Knowledge" ,"Home Remedies" ,"Global Health Updates"],
                  business : ["Ecommerce" ,"Marketing And Advertisement" ,"Management Tools","Affiliate Marketing"],
                  'news-media' : ["World Facts" ,"Bollywood" ,"India Facts" ,"Social Media"]
               };

function ProductHowItWorks(props) {
  const { classes } = props;
  const router = useRouter();
  const handleClick = (path)=>{
    if(path){
      router.push(path);
    }
  }

  return (
    <section className={classes.root}>
     
      <Container className={classes.container} maxWidth="md">
      <div  className={classes.box}>

      <Grid container spacing={5} alignItems="flex-end">
          {process.env.category.map((title) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={title.name} xs={12}  md={4} md={6} >
              <Card>
                <CardHeader
                  title={title.name.toUpperCase()}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                  
                />
                <CardContent>
                <Typography component="h6" variant="h5" align="center" >
                     Blogs writing on
                  </Typography>
                 {category[title.path] && category[title.path].map((key)=>
                   <Typography component="p" variant="subtitle1" align="center" >
                     {key}
                  </Typography>
                  )}
                 
                </CardContent>
                  <Button onClick={()=>handleClick(title.path)} color="secondary"  fullWidth variant="outlined" >
                    Get Started
                  </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

          
      </div>
         <br/>
         <br/>
        <Typography variant="h4" marked="center" className={classes.title} component="h2">
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>1.</div>
                
                <Typography variant="h5" align="center">
                <AccountCircleOutlinedIcon /> Sign Up 
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2.</div>
                
                <Typography variant="h5" align="center">
                <CreateOutlinedIcon/>  Write your content 
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>3.</div>
                
                <Typography variant="h5" align="center">
                <PublishOutlinedIcon/> {'Publish your content !'}
                </Typography>
              </div>
             
            </Grid>
          </Grid>
        
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          className={classes.button}
          component="a"
          href="#signUp"
        >
          Get started
        </Button>
        <div id="signIn" className={classes.SignUp}>
           <SignIn/>
         </div>
         <div id="signUp" className={classes.SignUp}>
           <SignUp/>

         
         </div>
         <Footer/>
      </Container>
     
    </section>
  );
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHowItWorks);