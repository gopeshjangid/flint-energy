import React from 'react';
import axios from "axios";
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
  const marginTop = {
      marginTop : '2%'
    }
    const upload = {
      input : {
        display: 'none'
      },
      button : {
        width : '100%'
      }
    }
const headerLink = [{name : "Manage Posts" ,path: "manage-post"},{name : "Write New Post" ,path: "create-post"}];
const showImages ={
  maxHeight: '200px',
  maxWidth : "200px"
}
const Topics = [{name : "Choose Topic *" ,path : ""},...process.env.category];

class CreatePost extends React.Component {

  constructor(props){
    super(props);
   
    this.state = {
              title : "",
              content : '',
              category : "",
              keywords : "",
              upload : [],
              images : "",
              loading : false,
              status : "",
              uploading : 0,
              categoryList : [{name : "Select Category *" ,path : ""}],
              topic : "",
              user_id : "",
              _id : "",
              is_update : false,
              post_id : "",
              status : "published",
              data : "",
              meta : {
                ...process.env.meta,
                title : "Create New Post",
                description : "Create New Post on Beauty",
                canonical : process.env.host_url+"/create-post"
              },
              showPopup : false,
              saveTime : "",
              draftId : ""
              
       }

  }

  formFields = {keywords : "",
                title : "",
                topic : "",
                category : "",
                content : "",
                data: "",
                images : ""};
  
  onFileUpload = (e) => { 
     let files = e.target.files;
    // Create an object of formData 
    const formData = new FormData(); 

    for(let i = 0;i<files.length;i++){
      let file = files[i];
      formData.append( 
        "image", 
        file, 
        file.name 
      ); 
    }
    const config = {
      onUploadProgress: (progressEvent)=> {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        this.setState({uploading : percentCompleted ,loading : true});
      }
    }
   
    axios.post(process.env.API_URI, formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config
    }).then((response)=> {
      let front_img = this.state.images ? this.state.images : (response.data.data.length ? response.data.data[0] : "");
      this.setState({images : front_img , uploading : 0 ,upload : [] ,loading: false});
      this.autoSave({images:front_img});
    })
    .catch(function(error) {
      this.setState({msg : error.message , status : "error", uploading : 0 ,loading:false});
    });
  }; 

  componentDidUpdate(prevProps){
    let searchParams = new URLSearchParams(window.location.search);
    let postId = searchParams.has("post") ? searchParams.get("post") : 0;
    if(prevProps.router !== this.props.router && postId ==""){
      this.props.router.reload();
    }

  }
  
async  componentDidMount(){
     let user = localStorage.getItem("user");
     user  = JSON.parse(user);
     this.setState({loading : true });
    if(user =='' || user==null || user==undefined){
      this.props.router.push("/#signIn");
    } else {
      let data = {};
      let searchParams = new URLSearchParams(window.location.search);
      let postId = searchParams.has("post") ? searchParams.get("post") : 0;
      let is_update = false;
      if(postId){
        is_update = true;
        let res = await axios.get(CONSTANTS.API.getPostById+"?post="+postId);
        data = res.data ? res.data.data : {};
      } else {
        data = await createDraft(user._id);
        data = data.success ? data.data : {}; 
        data.draftId = data._id;
        data.draftId = data._id;
      }
      let selectTopic = Topics.filter((t=>t.path==data.topic)).map(p=>p.sub);
      let selectcategory = selectTopic.length ? selectTopic[0] : this.state.category;
      this.setState({user_id : user._id ,...data ,content : data.data ,categoryList : selectcategory ,loading : false ,post_id: postId ,...data ,is_update : is_update});
    }

  }
   formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
  onChange = (e)=>{
      let  value = e.target.value;
      let name = e.target.name;
      
      this.setState({...this.state  ,[name]: value },()=>{
        this.autoSave({[name]:value});
      });
  }

  autoSave = async (data)=>{
    if( !this.state.is_update){
        AutoSave({_id: this.state.draftId,...data}).then(d=>{
          let date = new Date();
          let min = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
          let time =   date.getHours()+":"+min;
          let ampm = date.getHours() >=12 ? "pm" : "am";
          time = time+" "+ampm;
          this.setState({saveTime  : time})
        }).catch(err=>{
          
        });
    }
     
  }

  onTopicChange =(e)=>{

    let selectedTopic = e.target.value;
    
    let categoryList = Topics.filter(topic=>{
       return topic.path===selectedTopic;
    }).map(topic=>topic.sub);
    categoryList = categoryList.length ? categoryList[0] : [];
    this.autoSave({topic:selectedTopic});
     this.setState({categoryList : categoryList ,topic : selectedTopic});
  }

 

  deleteImg = ()=>{
    this.setState({images :   ""});
  }
  
  showImages = ()=>{
    let images = this.state.images;
    return images !='' ? <div style={showImages}  className="show-img-box"  ><i onClick={()=>this.deleteImg()}>X</i><img style={showImages} src={images}  /></div>
      : ''  ;
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
    if (reason === 'clickaway') {
      return;
    }

    this.setState({showPopup : false});
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

  getEditor = (data)=>{
   this.setState({content : data},()=>{
    this.autoSave({data:data});
   });
   
  }

  getImageUploader = ()=>{
    
    return(<>
       <div  className="upload-img-container">
                  <div className="upload-img-label">
                      {this.state.uploading ? this.progressBar(this.state.uploading) : ""}
                    </div>
                        <input
                        accept="image/*"
                        style={upload.input}
                        id="contained-button-file"
                        multiple
                        onChange={(e)=>this.onFileUpload(e)} name="upload"
                        type="file"
                        />
                        <label htmlFor="contained-button-file">
                        <Button style={upload.button} size="medium" fullWidth={true} color="secondary" variant="outlined" component="div">
                             Upload Cover Image
                        </Button>
                        </label>
                      <div className="upload-img-show">
                        {this.showImages()}
                      </div>
                  </div>
    </>);
 }



  render() {
    return (
        <Layout meta={this.state.meta} pagename="manage" headerLinks={headerLink}>
          <Head> <link
            rel="stylesheet"
            href="/static/create-post.module.css"
          /></Head>
        {this.state.loading&&<ScreenLoader open={this.state.loading} />}
        {this.showMessage(this.state.status)}
        
        <form  noValidate autoComplete="off">
          <div style={{flexGrow: 1}}>
           <Grid container >
             <Grid item xs={12} md={12} sm={12}>
              <h2 className="h1-responsive font-weight-bold my-7 text-center mt-7">
                Create New Post
              </h2>
            
            </Grid>
             
              <Grid item xs={12} md={12} sm={12}> 
                <TextField
                required
                id="outlined-size-small"
                label="Title"
                value={this.state.title}
                variant="outlined"
                name="title"
                fullWidth={true}
                color="secondary"
                onChange={this.onChange}
                  />
                </Grid>
               

                <Grid item xs={12} md={12} sm={12}>
                    <TextField
                    required
                    id="outlined-size-small"
                    label="Keywords"
                    style={marginTop}
                    variant="outlined"
                    name="keywords"
                    fullWidth={true}
                    value={this.state.keywords}
                    color="secondary"
                    onChange={this.onChange}
                      />
                </Grid>

                <FormControl style={{marginTop : '2%' ,width :'100%'}} variant="outlined" >
                  <Select
                    native
                    value={this.state.topic}
                    onChange={this.onTopicChange}
                    fullWidth={true}
                    label="Topic"
                    value={this.state.topic}
                    variant="outlined"
                    inputProps={{
                      name: 'category',
                      id: 'outlined-age-native-simple',
                    }}
                  >
                    {
                     Topics.length>0 && Topics.map((cat ,index)=><option key={index} value={cat.path} >{cat.name}</option>)
                   }
                  </Select>
               </FormControl>
               <FormControl style={{marginTop : '2%' ,width :'100%'}} variant="outlined" >
                  <Select
                    native
                    onChange={this.onChange}
                    fullWidth={true}
                    label="Category"
                    variant="outlined"
                    value={this.state.category}
                    inputProps={{
                      name: 'category',
                      id: 'outlined-age-native-simple',
                    }}
                  >
                    {
                     this.state.categoryList && this.state.categoryList.length> 0 && this.state.categoryList.map((cat ,index)=><option key={index} value={cat.path} >{cat.name}</option>)
                   }
                  </Select>
               </FormControl>

               <Grid item xs={12} md={6} sm={6} style={marginTop}>
                  {this.getImageUploader()}
                </Grid>

                <Grid item xs={12} md={12} sm={12} style={{...marginTop ,minHeight: '600px'}}>
                  {this.state.saveTime && <p>Saved at {''}{this.state.saveTime}</p>}
                  <Editor edit={this.state._id} value={this.state.data} getContent={this.getEditor} />
               </Grid>
                <Grid container justify='center' >
                  <Grid item  xs={12} sm={12} style={{...marginTop ,textAlign : 'center'}}>
                    
                    <Button size="medium" variant="outlined"  color="secondary" onClick={this.saveHandler}>
                     Publish</Button>
              </Grid>
                 </Grid>
               
                 <Grid item xs={12} sm={12}  style={marginTop}>
                 </Grid>
              
          </Grid>
          </div>
          </form>
          </Layout>
    );
  }
}

export default withRouter(CreatePost) ;
