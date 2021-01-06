import React from 'react';
import Link from "next/link";
import Dynamic from "next/dynamic";
import {useRouter} from "next/router";
import MetaTag from  "./meta";
import {withRouter} from "next/router";
import { makeStyles ,useTheme  } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import styles from "../assets/homeHeaderStyle.js";
import Hidden from '@material-ui/core/Hidden';
import ListIcon from '@material-ui/icons/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {optionsConfig} from  "../components/common";
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
const UserAccount =  Dynamic(()=>import('./views/custom').then((mod) => mod.UserAccount),{ssr : false });
const useStyles = makeStyles((theme) => ({
  link : theme.palette.link,
  hoverLinkText : styles.hoverLink,
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    background : theme.palette.background.default,
    borderBottom : `1px solid ${styles.borderColor}`,
    justifyContent : 'space-around',
     [theme.breakpoints.down('xs')]: {
      width : "90%",
    },

  },
  container : {
    display : 'flex',
    width : '50%',
    lineHeight : '50px',
    justifyContent : 'space-around',
    
  },
  logo :{
    width :"80%",
    paddingLeft : '3px',
    [theme.breakpoints.up('sm')]: {
      height: '51px',
      paddingTop : "6px",
    },
    [theme.breakpoints.down('xs')]: {
      width : "60%",
      height: '30px',
    },
  },
  bottomBar : {
   
    overflowX : 'auto',
    background : '#fff' ,
    bottom: '14px',
    minHeight : '38px'
  },
  navSelect : theme.palette.linkSelect,
  toolbarLink: {
    paddingRight: "10px",
    paddingLeft: "10px",
    flexShrink: 0,
    ...theme.palette.link,
    fontWeight : 400,
  },
  drawer: {
    width: 200,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    top  : '56px'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    justifyContent: 'flex-end',
  },
}));

const Header =(props)=>{
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let options = optionsConfig();
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  let router  = useRouter();
  let metaTags = {};
  const meta = {...metaTags};
  const selectOption =(page)=>{
    router.push(page);
    setOpen(false);
  }
  let headerList  = props.headerLinks;
  let pathname  = router.query.page ? router.query.page : "";
    return(
          <>
          <MetaTag meta={meta}/>
          <AppBar position="fixed" color={'primary'} root={'true'} className={classes.appBar}>
          <Toolbar className={classes.toolbar}  >
          <Hidden smUp>
             <ListIcon onClick={handleDrawerOpen}/>
           </Hidden>
          <Link href="/" prefetch={false}><a>
          <img alt="logo" src="/logo.png" className={classes.logo} />
          </a></Link>
          <div className={classes.container}>
              {headerList && headerList.map((section,key) => (
              <Link
                key={key}
                href={"/"+section.path+"?page="+section.query.page}
                as={"/"+section.path+"?page="+section.query.page}
              ><a className={pathname===section.query.page ? classes.navSelect  : classes.toolbarLink}>
                {section.name}</a>
              </Link>
            ))}
           <UserAccount/>
          </div>
           </Toolbar>
      
        </AppBar>
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {options.map((text, index) => (
            <ListItem button key={"left-bar"+index} onClick={()=>selectOption(text.path)}>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItem>
          ))}
        </List>   
      </Drawer>
          </>
    );
  
}

export default withRouter(Header);