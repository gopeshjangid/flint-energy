import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import TextArea from '@material-ui/core/TextareaAutosize';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://thepostviews.com/">
        ThePostViews
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width : '300px',
    textAlign : 'center'
  },
  box : {
    border : '1px solid '+theme.palette.border,
    height : '300px',
    padding : '20px',
    display : 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    borderRadius: '23px'
  },
}));
const initial = {
  name : "",
  email : "",
  mobile : "",
  password : "",
  description : "",
  profile_pic : "",
  role : "user"
};

export default function SignUp() {
  const classes = useStyles();
  const [state ,setState]  = useState(initial);
  const [msg ,setMsg]  = useState("");
 const handler = (e)=>{

  let name =  e.target.name;
  let value =  e.target.value;
  let data = {...state};
  data[name] = value;
  setState({...data});

 }

 const onSubmit = async (e)=>{
    e.preventDefault();

    if(state.name == "" || state.email =="" || state.password==''){
      setMsg("<span style='color:red'>Please fill all the fields !</span>");
      return false; 
    }
    let url = process.env.API_URL+"/signUp";
    let created = await axios.post(url ,state);
   if(created && created.data.success){
     setState({...initial});
     setMsg("<span style='color:green'>Account Created successfully !</span>");
   }

 }

 const onFileUpload = (e) => { 
  let file = e.target.files[0];
 // Create an object of formData 
 const formData = new FormData(); 
 formData.append( 
  "image", 
  file, 
  file.name 
); 
 

 axios.post(process.env.API_URI, formData,{
   headers: {
     "Content-Type": "multipart/form-data",
   },
 }).then((response)=> {
   let front_img =  response.data.data.length ? response.data.data[0] : "";
   let data = {...state};
   data.profile_pic = front_img;
   setState({...data});
 })
 .catch(function(error) {
  setMsg("<span style='color:red'>Error in uplaoding profile pic</span>");
 });
}; 

  return (
    <div id="contactus">
     
        <Typography component="h1" variant="h3" align="center">
          Contact US
        </Typography>
       
        <form className={classes.form} noValidate>
        <Grid container spacing={4}>
         <Grid item xs={12} sm={6} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="name"
                onChange={handler}
                variant="outlined"
                required
                fullWidth
                color="secondary"
                id="outlined-size-small"
                label="Full Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={handler}
                color="secondary"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={handler}
                color="secondary"
                name="mobile"
                label="Mobile"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextArea
                variant="outlined"
                required
                rows={4}
                style={{width : "100%"}}
                onChange={handler}
                color="secondary"
                id="detail"
                placeholder="Message"
                name="description"
              />
            </Grid>

            <Grid item xs={12}>
              <Box pl={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={onSubmit}
                className={classes.submit}
              >
              Submit
              </Button>
              </Box>
                
            </Grid>
          </Grid>
          </Grid>
            <Grid item xs={12} sm={6} md={6}>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                  <Box className={classes.box}>

                    hakhdkahkdhkhada,
                    dasdad
                    </Box>
                   </Grid>
                 </Grid>
            </Grid>
           </Grid>
        </form>
      </div>
     
  );
}