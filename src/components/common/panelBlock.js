import React ,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Button, Grid, Box ,Card , CardContent} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign : 'center',
        [theme.breakpoints.up('sm')]: {
            padding : '50px 10px',
           // border : '1px solid #c0cecd',
            borderRadius : '13px',
          },
        minHeight : '400px',
    },
   
}));

export default function PanelBlock(props) {
    const classes = useStyles();
    return (
          <Card className={classes.root} variant="outlined">
           <CardContent>
             {props.children}
            </CardContent>
            </Card>
    );
}