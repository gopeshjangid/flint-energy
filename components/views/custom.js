import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chip from '@material-ui/core/Chip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from  "next/link";
import {useRouter} from  "next/router";
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import  {PageSkeleton} from  "../skeleton";
import Divider from '@material-ui/core/Divider';
import Whatshot from  "@material-ui/icons/Whatshot";
import { Typography } from '@material-ui/core';
import {
  FacebookIcon,
  InstapaperIcon,
  TwitterIcon
} from "react-share";
const options = process.env.category;
const user = process.browser ? JSON.parse(localStorage.getItem("user")) : '' ;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  paper :{
    paddingTop : '0px'
  },
  popper : {
    zIndex : '999'
  },
  link : theme.palette.link,
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },

}));
const ITEM_HEIGHT = 48;

 export const MoreButton =(props)=> {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const text = props.data.query.detail;
  let option  = options.filter(type=>type.path===props.path);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (path) => {
    props.data.push("/[detail]","/"+path);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={props.styleClass}
      >
        <Chip label={text ? text.toUpperCase()  : ''} variant="outlined" />
        {props.icon && <MoreVertIcon />}
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option,key) => (
          <MenuItem key={key} selected={option.path === text} onClick={()=>handleClose(option.path)}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export const UserAccount =()=>{
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const islogin = localStorage && localStorage.getItem("user") ? true : false;
  const [isLoggedIn, setLogin] = React.useState(islogin);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    
    setOpen(false);
  };

  const handleLogout =()=>{
    localStorage.removeItem("user");
    setLogin(false)
    router.reload();
  }
  const handleProfile =()=>{
     router.push({
      pathname: "/manage-post",
      query: {page : "profile"},
    });
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      {
      isLoggedIn ? 
        <><Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
        {user && user.profile_pic ? <Avatar alt="profilePic" src={user.profile_pic}  /> : <AccountCircleIcon/> } 
        </Button>
        <Popper className={classes.popper} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleProfile}>My account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper></>
       : <Link href="/" as="/#signIn" prefetch={false}><a className={classes.link}>Login</a></Link>}
    </div>
  );
}

export const ScreenLoader = React.memo(function ScreenOverlay(props){
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.open);
  const handleClose = () => {
    setOpen(false);
  };
  return <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
             <CircularProgress color="inherit" />
        </Backdrop>

});

export const CustomModal = React.memo(function modal(props){
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
     return <Modal
          className={classes.model}
          open={true}
          onClose={handleClose}
          aria-labelledby="Subscribe-modal-title"
          aria-describedby="subcribe-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
          timeout: 500,
          }}
        >
            {props.children}
        </Modal>

});

export const Listing = React.memo(function Modal(props){
  const useStyles = makeStyles((theme) => ({
    list : {
      flexDirection : 'column'
    },
    link : {...theme.palette.link , fontSize : '12px'},
  }));
  const classes = useStyles();
  let isLink  = props.isLink ? props.isLink : false;
  
  const getTitle =(row) =>{
    let linkAs  = `/${row.topic}/${row.category}/${row.slug}`;
    let linkHref  = props.linkHref;
    return  <Link  href={linkHref} as={linkAs} ><a className={classes.link}>{row.title}</a></Link>;
  } 
     return  <>
             {props.rows && props.rows.length==0 ? <PageSkeleton/> : 
              <List component="nav" aria-label="main mailbox folders" className={classes.list}>
                 {props.rows && props.rows.map((row ,key)=><>
                     <ListItem key={key} alignItems="flex-start">
                       {isLink ? getTitle(row) : row.title}
                     </ListItem><Divider component="li" /></>)}
             </List>}
             </>

});

export const SubscribeButton = React.memo(function Subscribe(props){
  const useStyles = makeStyles((theme) => ({
    subscribBox : {
      padding : '10px',
      textAlign : 'center',
    },
    link : {...theme.palette.link , fontSize : '12px'},
  }));
  const classes = useStyles();
     return  <Paper className={classes.subscribBox}>
              <Button size='small' variant={'outlined'} color='secondary'>Subscribe Here</Button>
             </Paper>

});

export const TrendingPost = React.memo(function Trending(props){
  const useStyles = makeStyles((theme) => ({
    title : {
      fontSize : '15px',
      padding : '3px'
    },
    list : {
      flexDirection : 'column'
    },
    trendingBox : {
      minHeight : '100px'
    },
    imgBox : {
      width  : '20%',
      height : '50%',
      marginRight: '5px'
    },
    link : {...theme.palette.link ,
       fontSize : '12px',
       display : 'flex',
       '&:hover' : {
         
       }

      },
      box : {
        '&:hover' : {
          border : '1px solid #dad2d2'
        }
      }
  }));
  const classes = useStyles();
  let isLink  = props.isLink ? props.isLink : false;
  
  const getTitle =(row) =>{
    let linkAs  = `/${row.topic}/${row.category}/${row.slug}`;
    let linkHref  = props.linkHref;
    return  <Link  href={linkHref} as={linkAs} ><a className={classes.link}>
               <img src={row.images} className={classes.imgBox} />
              {row.title}
         </a></Link>;
  } 
   
     return  (<Paper className={classes.trendingBox}>
              <Typography variant="h6" component="h6" className={classes.title}>
                 <Whatshot/>  Trending Posts
              </Typography>
              <Divider/>
              {props.rows==null ? <PageSkeleton/> : 
              (props.rows.length>0 ? <List component="nav" aria-label="main mailbox folders" className={classes.list}>
                 {props.rows && props.rows.map((row ,key)=><React.Fragment key={key}>
                     <ListItem className={classes.box} key={key} alignItems="flex-start">
                       {isLink ? getTitle(row) : row.title}
                     </ListItem><Divider component="li" /></React.Fragment>)}
                 </List> : "Not trending anything !") }
             </Paper>);

});

export const FollowUs = React.memo(function followUs(props){
  const useStyles = makeStyles({
    shareBox : {
      height : '100px',
      display : 'flex',
      padding : '10px',
      justifyContent : 'space-around',
      flexDirection : 'column',
      textAlign : 'center'
    },
    social : {
      display: 'flex',
      justifyContent: 'space-around'
    }
  });
  const classes = useStyles();
 
     return  (<Paper className={classes.shareBox}>
                Follow us on  <br/>
                <div className={classes.social}><FacebookIcon size="30px" round={true} /> <TwitterIcon size="30px" round={true}/> <InstapaperIcon size="30px" round={true} /></div>
             </Paper>);

});

