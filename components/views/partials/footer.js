import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from  "next/link";
const useStyles = makeStyles((theme)=>({
  root: {
    
    width: "100%",
    display: 'flex',
    justifyContent: 'space-around',
    listStyle : 'none',
    bottom : '0px',
    background : '#fff'
  },
  link : {
    ...theme.palette.linkText,
    ...theme.palette.link,

  },
  footerContainer : {
    borderTop : '1px solid #dccfcf;',
    marginTop : '40px',
    width : '100%'
  }
}));

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.footerContainer}>
    <ul className={classes.root}>
     <li><Link href="/" prefetch={false}><a className={classes.link}>Home</a></Link> </li>
     <li><Link href="/privacy-policy" prefetch={false}><a className={classes.link}>Privacy policy</a></Link> </li>
    </ul>
    </div>
  );
}
