import React from 'react';
import Link from "next/link";
import Meta from  "../../meta";
import {useRouter} from "next/router";
import Dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import InputBase from '@material-ui/core/InputBase';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
const MoreButton =  Dynamic(()=>import('../custom').then((mod) => mod.MoreButton),{ssr : false });
const UserAccount =  Dynamic(()=>import('../custom').then((mod) => mod.UserAccount),{ssr : false });
import Popover from '@material-ui/core/Popover';

import styles from "../../../assets/headerStyle.js";
const useStyles = makeStyles((theme) => ({
  link : theme.palette.link,
  text :{
     ...theme.palette.linkText,
     maxWidth :'70%',
     paddingRight : '2px',
     textAlign : 'center',
    
  } ,
  hoverLinkText : styles.hoverLink,
  createLink : {
    flex: 3,
    display : 'flex',
    
    alignItems : 'center',
    '& span:hover,svg:hover' : {
      cursor : 'pointer'
    },
    '& svg' : {
      fontSize : '25px',
      marginLeft : '5px',
      '&:hover' : {
        fontSize : '25px',
      }
    },
    [theme.breakpoints.up('sm')]: {
     justifyContent : 'space-around',
    },
    [theme.breakpoints.down('xs')]: {
      width: '74%',
      paddingLeft :'4px',
    },
  },
  toolbar: {
    background : theme.palette.background.default,
    ...styles.topBar,
    top :'5px',
   
    [theme.breakpoints.up('sm')]: {
      justifyContent : 'center',
      flexBasis: '47em',
      width : '72%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '96%',
    },
    margin: '0 auto'
  },
  logo :{
    width :"76%",
    [theme.breakpoints.up('sm')]: {
      height: '53px',
      paddingTop : "6px",
    },
    [theme.breakpoints.down('xs')]: {
      width : "100%",
      height: '42px',
    },
  },
  bottomBar : {...styles.bottomBar,
    [theme.breakpoints.up('sm')]: {
      justifyContent : 'center'
    },
    borderTop : `1px solid ${styles.borderColor}`,
  },
  toolbarLink: {
    paddingRight: "10px",
    paddingLeft: "10px",
    flexShrink: 0,
    ...theme.palette.link,
    fontWeight : 400,
  },
  toolbarTitle: {
    flex: 1,
  },
  topLink : styles.topLink,
  input: {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `10px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '44ch',
      '&:focus': {
        width: '44ch',
      },
    },
    [theme.breakpoints.down('xs')]: {
      width: '22ch',
      '&:focus': {
        width: '22ch',
      },
    },
  },
  root: {
    padding: '2px 0px',
    display: 'flex',
    alignItems: 'center',
    boxShadow : 'none',
    height :'48px',
    borderColor : '#add8e6',
    border : '1px solid ',
    [theme.breakpoints.down('sm')]: {
      width: '40ch',
      justifyContent : 'flex-start'
    },
    [theme.breakpoints.down('xs')]: {
      width: '32ch',
      '&:focus': {
        width: '32ch',
      },
    },
  },
  appBar : {
    height:'105px'
  },
  icon : {
    verticalAlign : 'middle'
  },
  select : {
    width : '70%',
    paddingLeft : '2%',
    fontSize  : '14px'
  },
  navSelect : theme.palette.linkSelect,
  logoBox : {
    flex  :1,
    display : 'flex',
    alignItems : 'center'
  },
  titleName  : {
    fontWeight : 700,
    fontSize : '17px',
    color: '#d57b0a',
  }
  
  
}));

const Header =(props)=>{
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  let pageName = props.pagename;
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  let router = useRouter();
  let pathname  = router.query.id ? (router.query.id && router.query.id.length ? router.query.id[0] : 0 ) : 0;
  let baseUrl  = router.query.detail;
  let headerList = process.env.category.filter(type=>type.path===baseUrl);
  headerList = headerList.length ? headerList[0].sub : [];
  const clickHandler = ()=>{
    router.push("/create-post");
  }
  const classes = useStyles();
    return(
          <>
          <Meta meta={{...props.meta}}/>
       
          <CssBaseline />
          <AppBar position="fixed" color={'primary'} root={'true'} className={classes.appBar}>
          <Toolbar className={classes.toolbar}  >
                <div className={classes.logoBox}>
                 <Link href="/" prefetch={false}><a>
                  <img alt="logo" src="/logo.png" className={classes.logo} />
                  </a></Link>
                    <Hidden xsDown> <span className={classes.titleName}>THEPOSTVIEWS</span></Hidden>
                  </div> 
                <div className={classes.createLink}>
                  
                  <Popover
                
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                  }}
                  transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                  }}
                  >
                 <Paper component="form" className={classes.root}>
                        <InputBase
                        className={classes.input}
                        placeholder="Search..."
                        inputProps={{ 'aria-label': 'search...' }}
                        />
                        
                  </Paper>
                  </Popover>
                  <IconButton onClick={handleClick} type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                  </IconButton>
                  {pageName !=="manage" &&<><Button onClick={clickHandler} size="small">Subscribe</Button>
                    <span className={classes.text}>
                      <MoreButton styleClass={classes.text} data={router} />
                    </span></>}
                    <Hidden xsDown>
                      <Link  href="/create-post" prefetch={false}><a className={classes.link}  >Write to us</a></Link>
                    </Hidden>
                    <UserAccount/>
                  </div>
                  
                 
         </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.bottomBar}>
          {headerList && headerList.map((section,key) => (
          <Link
            key={key}
            href={baseUrl==section.path ? "/[detail]" : "/[detail]/[...id]"}
            as={baseUrl==section.path ? "/"+baseUrl : "/"+baseUrl+"/"+section.path}
          ><a className={pathname===section.path ? classes.navSelect  : classes.toolbarLink}>
            {section.name}</a>
          </Link>
        ))}
      </Toolbar>
      </AppBar>
          </>
    );
  
}

export default Header;