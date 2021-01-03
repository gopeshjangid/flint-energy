import React from 'react';
import Blank from "../components/views/blank";
import Dynamic  from  "next/dynamic";
import axios from  "axios";
import Typography from '@material-ui/core/Typography';
const RelatedPage =  Dynamic(()=>import("./page/related_post"),{loading :()=><p>Loading...</p> }) ;
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
  TwitterIcon
} from "react-share";
let url = process.env.host_url;

import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) =>({
  img : {
    [theme.breakpoints.up('sm')]: {
      height: '20ch',
      maxWidth : '50ch'
    },
    [theme.breakpoints.down('xs')]: {
      height: '16ch',
      maxWidth : '30ch'
    },
  },
  imgBox : {
    width: '100%',
    margin : '0 auto',
    textAlign : 'center'
  },
  topBox : {
    padding : "2%",
    width : "100%",
    marginBottom : '20px'
  },
  socialBox :{
    display: 'flex',
    justifyContent : 'space-around',
    
  },
  views : {
    lineHeight : '52px'
  }
});

let host_url = process.env.host_url;
class Post extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      fetch_related_post : false,
    }
  }
 
   getImages = (images ,title)=>{
     
    return(
            <div className={this.props.classes.imgBox}>
              <img  alt={title}  className={this.props.classes.img} src={images}  />
            </div>);
}

getContent = (data)=>{
    let formatted = data.data ? data.data : null;
    if(formatted){
        return (<div dangerouslySetInnerHTML={{__html : formatted}}/>);
    }
    return "";

}
 componentDidMount(){
    if(process.env.NODE_ENV === 'production')
    {
       axios.get(url+'/api/post?type=addPostView&id='+this.props.data._id);
    }  
    this.setState({fetch_related_post : true})
}

  render() {
    let data = this.props.data ;
    let url = host_url+"/"+data.topic+"/"+data.category+"/"+data.slug;

    return (
        <>
         {data ? 
              <>
                    
                    <div  className={this.props.classes.topBox}>
                      <Typography variant="h6" component="h1" >
                      {data ? data.title : ""}
              </Typography>
                      <div  className={this.props.classes.socialBox}>
                        <span className={this.props.classes.views}>Views: { this.props.data.views_count}</span>
                        <div><h5>Share with:</h5></div>
                        <FacebookShareButton
                              url={url}
                              quote={data.title}
                              
                              className="fb-share-button"
                            >
                            <FacebookIcon size={42} round />
                       </FacebookShareButton>
                       <WhatsappShareButton
                              url={url}
                              quote={data.title}
                              className="wts-share-button"
                            >
                            <WhatsappIcon size={42} round />
                       </WhatsappShareButton>
                       <LinkedinShareButton
                              url={url}
                              quote={data.title}
                              className="fb-share-button"
                            >
                            <LinkedinIcon size={42} round />
                       </LinkedinShareButton>
                       <TwitterShareButton
                              url={url}
                              quote={data.title}
                              className="fb-share-button"
                            >
                            <TwitterIcon size={42} round />
                       </TwitterShareButton>
                       </div>  
                   </div>
                  <div className="mt-5">
                    {this.getImages(data.images ,data.title)}<br/>
                      
                    <Typography variant="subtitle1" >{this.getContent(data)}</Typography> 
                   
                  </div>
                  <hr/>
                  <h2>Related Posts</h2>
                   <RelatedPage data={this.state.related_posts} loader={this.state.related_post_loader} />
           
                     
          </> : <Blank message="No post found." />}
        </>
    );
  }
}


export default withStyles(useStyles)(Post);
