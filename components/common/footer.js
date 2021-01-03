import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from  "next/link";
const useStyles = makeStyles((theme)=>({
  footerBar: {
    width: "100%",
    display: 'flex',
    justifyContent: 'space-around',
    listStyle : 'none',
    bottom : '0px',
    background : '#fff'
  }
}));

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
   
       <ul className={classes.footerBar}>
              <li>
                <a href="#services" className="page-scroll">
                  Home
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="page-scroll">
                  Privacy Policy
                </a>
              </li>
             
             
            </ul>
   
  );
}
