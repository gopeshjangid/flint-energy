import React  from "react";
import {getSlug} from  "../pages/api/utils";
import Link  from  "next/link";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import FBLogin from  "./FBLogin";
const useStyles = makeStyles((theme)=>({
  img : {
    [theme.breakpoints.up('sm')]: {
      width: '16ch',
      height: '10ch'
      
    },
    [theme.breakpoints.down('xs')]: {
      width: '10ch',
      height: '6ch',
      '&:focus': {
        width: '28ch',
      },
     
    },
  },
  link :theme.palette.link,
  profileBox : {
    alignItems : 'center',
    height : '80vh',
    padding : "5%",

  },
  img : {
    textAlign : 'right'
  }
  
}));

function Panel  (props)  {
  
  const classes = useStyles();
  const detail = props.detail;
  const user  =JSON.parse(localStorage.getItem("user"));

  return (
       <>
         <Paper className={classes.profileBox}>
          <Grid container spacing={3}>
          <Grid  item xs={12} sm={12} className={classes.img}>
              <img src={user.profile_pic} width="240" height="200" />
            </Grid>
             <Grid  item xs={6} sm={6}>
          
              <div>Name</div> </Grid><Grid  item xs={6} sm={6}><div>{user.name}</div></Grid>
            <Grid  item xs={6} sm={6}>
            <div>Email</div></Grid><Grid  item xs={6} sm={6}>  <div>{user.email}</div></Grid>
            <Grid  item xs={6} sm={6}>
            <div>Description</div> </Grid>
            <Grid  item xs={6} sm={6}> <div>{user.description}</div></Grid>
            <Grid  item xs={6} sm={6}>
            
            
          <FBLogin/>
          </Grid>
          </Grid>
       </Paper>
      </> 
  );
}
 

export default Panel;