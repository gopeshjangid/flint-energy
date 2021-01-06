import React  from "react";
import Dynamic from "next/dynamic";
import Header from '../components/views/partials/header';
//import Footer from '../components/views/partials/footer';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import Skelton from  "../components/skeleton";
import LayoutStyle from "../assets/layoutStyle";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(()=>({
  container : {
    marginLeft: '1%',
    marginRight: '1%',
    overflow : 'auto',
    background : '#fff',
    paddingTop : '92px',
    minHeight : '100vh',
  }

})); 

const Layout = React.memo (function Layout  (props)  {
 const classes = useStyles();

  return (
    
         <Container px={4}  className={classes.container} >
            {props.children}
         </Container>
         
  );
})
 

export default Layout;