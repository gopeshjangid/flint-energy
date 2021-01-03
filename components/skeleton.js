import React  from "react";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from '@material-ui/lab/Skeleton';
const useStyles = makeStyles(()=>({
  

}));
 const Skel  = (props) => {
   
   const classes = useStyles();
  return (
      <Skeleton variant={props.variant ? props.variant : 'rect'} 
         height={props.height ? props.height : 'auto'} 
         component='div'
         width={props.width ? props.width : 'auto'}  animation="wave" />
   );
  }

  export const PageSkeleton  = (props) => {
   
    const classes = useStyles();
   return (<>
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
    </>);
   }

  export default Skel;
