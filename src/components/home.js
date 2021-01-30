import React from 'react';
import Link from "next/link";
import Meta from  "./meta";
import {withRouter} from "next/router";
import Dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from '@material-ui/core/Hidden';
import styles from "../assets/homeHeaderStyle.js";
const UserAccount  = Dynamic(()=>import("./views/custom").then(mod=>mod.UserAccount),{loading :()=><p>Loading...</p>,ssr:false }) ;
const Content =  Dynamic(()=>import('../components/home_content'),{loading :()=><p>Loading...</p>}) ;
const useStyles = makeStyles((theme) => ({
  link : theme.palette.link,
  hoverLinkText : styles.hoverLink,
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    background : theme.palette.background.default,
    borderBottom : `1px solid ${styles.borderColor}`,
    justifyContent : 'space-around',

  },
  container : {
    display : 'flex',
    width : '64%',
    justifyContent : 'space-around',
    alignItems:'center',
    [theme.breakpoints.down('xs')]: {
      lineHeight :"32px"
    },
    
  },
  logo :{
    width :"80%",
    paddingLeft : '3px',
    [theme.breakpoints.up('sm')]: {
      height: '55px',
      paddingTop : "6px",
    },
    [theme.breakpoints.down('xs')]: {
      width : "90%",
      height: '45px',
    },
  },
  leftBox : {
    display: 'flex',
    alignItems: 'center'
  },
  titleName  : {
    fontWeight : 700,
    fontSize : '17px',
    fontStyle : 'oblique'
  }
}));

const Header =(props)=>{
  const classes = useStyles();
    return(
          <>
          <Meta meta={{...props.meta}}/>
          <CssBaseline />
          <AppBar position="fixed" color={'primary'} root={'true'} className={classes.appBar}>
          <Toolbar className={classes.toolbar}  >
          
          <div className={classes.leftBox}>
          <Link href="/" prefetch={false}><a>
          <img alt="logo" src="/logo.png" className={classes.logo} />
          </a></Link>
         <Hidden xsDown> <span className={classes.titleName}>THEPOSTVIEWS</span></Hidden></div>
          <div className={classes.container}>
           <Link href="/" prefetch={false}><a className={classes.link}>
                  SUBSCRIBE
              </a></Link>
              <Link  href="/create-post" prefetch={false}><a className={classes.link}  >WRITE TO US</a></Link>
              <UserAccount />
          </div>
           </Toolbar>
     
      </AppBar>
     
         <Content />
          </>
    );
  
}

export default withRouter(Header);