import React,{useState}  from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import {useRouter} from 'next/router';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initial = {
  email : "",
  password : ""
}
export default function SignIn() {
  const classes = useStyles();
  const [state ,setState]  = useState(initial);
  const [msg ,setMsg]  = useState("");
  let router  = useRouter();
 const handler = (e)=>{

  let name =  e.target.name;
  let value =  e.target.value;
  value = value ? value.trim() : "";
  let data = {...state};
  data[name] = value;
  setState({...data});

 }
  const onSubmit = async (e)=>{
    e.preventDefault();
    if(state.email =="" || state.password ==""){
      setMsg("Please fill all the fields !");
    }else {

        setMsg("Logging in...");
        let url = process.env.API_URL+"/login";
        let created = await axios.post(url ,state);
      if(created && created.data.success && created.data.data){
          let user = JSON.stringify(created.data.data);
          setMsg("Logged In !");
          localStorage.setItem("user" ,user);
          router.push("/create-post");
        }else{
          setMsg("Incorrect username/password !");
        }
  }

 }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
         {msg && <Alert severity="error">{msg}</Alert>}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handler}
            id="email"
            label="Email Address"
            name="email"
            color="secondary"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handler}
            name="password"
            label="Password"
            type="password"
            color="secondary"
            id="password"
            autoComplete="current-password"
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={onSubmit}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    
    </Container>
  );
}