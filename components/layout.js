import React  from "react";
import Dynamic from "next/dynamic";
import Header from '../components/views/partials/header';
//import Footer from '../components/views/partials/footer';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import Skelton from  "../components/skeleton";
const LeftSideBar =  Dynamic(()=>import( "../components/leftSidebar"),{ssr : false ,loading : ()=><Skelton variant='rect'  height={700} width={'100%'} />});
const RightSideBar =  Dynamic(()=>import( "../components/rightSideBar"),{ssr : false ,loading : ()=><Skelton variant='rect'  height={700} width={'100%'} />});
import LayoutStyle from "../assets/layoutStyle";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(()=>({
   ...LayoutStyle,
   rightSidebar : {
       width : '25%',
       position: '-webkit-sticky',
       top: '20px',
       position : 'sticky' ,
       display:'flex' ,
       flexDirection : 'column' ,
       justifyContent : 'flex-start',
       marginRight : '2px',
       wordBreak : 'break-all'
  
    },
    rightItems : {
       marginTop : '25%'
    },
    footer : {
       height :  '130px',
       textAlign : 'center'
    },
  container : {
    marginLeft: '1%',
    marginRight: '1%',
    overflow : 'auto',
    background : '#fff',
    paddingTop : '20px',
    minHeight : '100vh',
    maxWidth :'700px',
    border: '1px solid lightgray'
  },
  fullWidthContainer : {
   marginLeft: '1%',
   marginRight: '1%',
   overflow : 'auto',
   background : '#fff',
   paddingTop : '20px',
   minHeight : '100vh',
   maxWidth  : '100% !important',
   border: '1px solid lightgray'
 }
    

})); 

const Layout = React.memo (function Layout  (props)  {
 const classes = useStyles();
 let rightSideBar = props.rightSideBar;
 let leftSideBar = props.leftSideBar;
 let makeWidth = !props.fullWidth ? {justifyContent : 'center'} : null;
 let container_class = props.fullWidth ? classes.fullWidthContainer : classes.container;
  return (
     <>
     {!props.dashboard && <Header meta={props.meta} headerLinks={props.headerLinks} pagename={props.pagename} /> }
       <div style={makeWidth} className={classes.outSider}>
       {leftSideBar && <Hidden xsDown> 
        <div className={classes.leftSideBar}>
             <LeftSideBar>{props.leftSideBar}</LeftSideBar> 
           </div>
       </Hidden> }
         <Container  fixed className={container_class} >
            {props.children}
         </Container>
         {rightSideBar && <Hidden xsDown>
           <div className={classes.rightSidebar}>
             <RightSideBar >
                 {rightSideBar}
                </RightSideBar>
           </div> 
        </Hidden>}
       
        </div>
      </>
  );
})
 

export default Layout;