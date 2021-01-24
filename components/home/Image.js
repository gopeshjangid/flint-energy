import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from "next/image";
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

export default function CustomImage(props) {
    const {src ,height , width} = props;
    const classes = useStyles();
   
    return (
        <Image src={src}  height={height} width={width} layout={"responsive"} />
      )
}