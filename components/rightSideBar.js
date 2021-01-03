import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  layout : {
    minHeight  : '80vh',
    padding : '1px',
  },
  
}));

export default React.memo(function RightSideBar(props) {
  const classes = useStyles();
  
  return (<div className={classes.layout}>
            {props.children}
        </div>);
});
