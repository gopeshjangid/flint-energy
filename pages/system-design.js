import React from 'react';
import Dynamic from  "next/dynamic";
import Head from  "next/head";
import {withRouter} from  "next/router";
const Editor = Dynamic(()=>import('../components/editor'),{loading : ()=><p>Loading...</p>,ssr:false});
const Layout = Dynamic(()=>import('../components/layout'),{loading : ()=><p>Loading...</p>,ssr:true});
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {ScreenLoader}  from  "../components/views/custom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {AutoSave ,createDraft ,deleteDraft} from  "../components/service/PostService";
import CONSTANTS from '../components/constants';
import Header from "../components/common/header";
import Stepper from  "../components/system-design/stepper";

class SystemDesign extends React.Component {

  constructor(props){
    super(props);
   
    this.state = {
       }

  }

  componentDidUpdate(prevProps){
    

  }
  
async  componentDidMount(){
    

  }
  
  onChange = (e)=>{
     
  }


 

  saveHandler = (e)=>{
    e.preventDefault();

    let state = {...this.state};
    if(state.title=="" || state.category=="" || state.topic=="" || state.content=="" || state.keywords==""){
      this.setState({msg : "Please  fill all the required field !" ,showPopup : true});
      return false;  
    }
    delete state["upload"];
    this.setState({loading : true});
    axios.post("/api/post?type=create", state, {
      headers: {
        'content-type': 'text/json'
      }
    }
    ).then((response)=> {
      let msg = this.state.is_update  ? "Post updated successfully" : "Post created successfully";
      let state = {images : '' ,title : "" ,data : "" ,author_name : "" ,author_email : "" ,category : ""};
      if(!this.state.is_update){
        deleteDraft(this.state._id)
      }
      this.setState({...state, status : "created" ,msg : msg ,loading : false ,showPopup : true ,...this.formFields ,_id : ""})
    })
    .catch((error)=> {
      this.setState({status : "error" ,msg : error.message ,loading : false  ,showPopup : true });
    });

  }
   handleClose = (event, reason) => {
   
  };
  showMessage = (state)=>{
    let severity = state=="created" ? "success" : "error";
   return  <Snackbar open={this.state.showPopup} autoHideDuration={6000} onClose={this.handleClose} style={{bottom : '60px'}}>
            <MuiAlert elevation={6} variant="filled" onClose={this.handleClose} severity={severity} >
            {this.state.msg}
           </MuiAlert>
         </Snackbar>
    
  }

 

  progressBar = (value)=>{
    return (  <div  value={value}  />);
  }


  render() {
    return (
        <>
         <link
        rel="stylesheet"
        href="/static/css/bootstrap.css"
      />
      <link
        rel="stylesheet"
        href="/static/css/style.css"
      />
        <Header />
        <Layout  >
          <Head> <link
            rel="stylesheet"
            href="/static/create-post.module.css"
          /></Head>
           <Stepper />
          </Layout>
          </>
    );
  }
}

export default withRouter(SystemDesign) ;
