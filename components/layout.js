import React  from "react";
import Dynamic from "next/dynamic";
import Header from '../components/views/partials/header';
//import Footer from '../components/views/partials/footer';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import Skelton from  "../components/skeleton";
import LayoutStyle from "../assets/layoutStyle";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme)=>({
  container : {
    
    overflow : 'auto',
    background : '#f4f4f4',
    paddingTop : '92px',
    minHeight : '100vh',
    width : '100%',
    [theme.breakpoints.down('xs')]: {
     

    },
  }

})); 

const Layout = React.memo (function Layout  (props)  {
 const classes = useStyles();

  return (
    
         <Container px={1}  className={classes.container} >
            {props.children}
         </Container>
         
  );
})
 

export default Layout;