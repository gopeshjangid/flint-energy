import React  from "react";
import Link  from  "next/link";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';
const useStyles = makeStyles((theme)=>({
  img : {
    [theme.breakpoints.up('sm')]: {
      width: '16ch',
      height: '10ch'
      
    },
    [theme.breakpoints.down('xs')]: {
      width: '10ch',
      height: '6ch',
      '&:focus': {
        width: '28ch',
      },
     
    },
  },
  link :{
    color : '#2e2f2f',
    fontFamily : 'LocalFont,sans-serif',
    fontWeight : '600',
    textDecoration : 'none',
    [theme.breakpoints.down('xs')]: {
      fontSize :'12px'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize :'14px'
    }
  },
  listBox : {
    padding : 'px',
    '&:hover' : {
      background: '#f3f6f6',
      color: '#08222b',
      border : '1px solid #dad2d2'
    },
    marginBottom: '9px',
    marginTop: '9px',
    borderBottom  :theme.palette.divider
  },
  titleBox : {
    textAlign : 'left',
    padding : '12px',
    borderColor: 'lightblue',
   
  }
  
}));

function Panel  (props)  {
  
  const classes = useStyles();
  const getImageUrl = (data)=>{
    let default_img = "/"+data.category+".jpg";
   let image_url = data.images ? data.images : default_img; 
   return image_url;
  }
  
const getBox =(post)=>{
  if(post.images){
    return (<>
            <Grid item xs={3} sm={3} md={3}>
                           <img
                              className={classes.img}
                              src={getImageUrl(post)}
                              alt={post.title}
                            />
                           </Grid>
                          <Grid item xs={9} sm={8} md={8} className={classes.titleBox}>
                             {post.title}
                          </Grid>
    </>)
  }
 return (<Grid item xs={12} sm={12} md={12} className={classes.titleBox}>
   {post.title}
  
</Grid>);

}

  return (
    <>
                 { props.data &&props.data.map((post ,key)=>
                    
                      <Link key={key} href={"/[detail]/[...id]"} as={`/${post.topic}/${post.category}/${post.slug}`}><a className={classes.link}>
                       <Grid container spacing={0} className={classes.listBox}>
                          {getBox(post)}
                        </Grid><Divider />
                       </a></Link>
            )}
       
      </> 
  );
}
 

export default Panel;