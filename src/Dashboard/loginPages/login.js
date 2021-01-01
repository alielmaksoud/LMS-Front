import React, { useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { green } from '@material-ui/core/colors';
import { useForm } from "react-hook-form";
import { IconContext } from 'react-icons';
import Logo from '../../../src/logo.png';
import { useHistory } from "react-router-dom";
import CookieService from '../Service/CookieService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Learning Management System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop : theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: 'green',
    },
 
  },
}));

function Login() {

  const classes = useStyles();
  let history = useHistory();
  const [display, setdisplay] = useState("none")
  const { register , handleSubmit, errors } = useForm();
  const cookie = CookieService.get('Bearer');
  const [Verified, setVerified ] = useState("");

  useEffect(() => {
    var config = {
      method: 'post',
      url: 'http://localhost:8000/api/verify',
      headers: { 
        'Authorization': `Bearer ${cookie}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
      }};

        axios(config)
        .then(res => {
            if(res.data.message === "Verified"){
                setVerified("true");
            }else {
              setVerified("error");
            }
        }).catch(err => {
          console.log(err.request)
          setVerified("error");
        })
    
  });


  const Auth = async (data) => {
   
     axios.post('http://localhost:8000/api/login',
    {
      email: data.email,
      password: data.password
    })
    .then(res => {
      //document.cookie = `Bearer=${res.data.access_token}; path=/; max-Age=${res.data.expires_in}`
      CookieService.set('Bearer ', res.data.access_token, { path: "/", 'max-Age': res.data.expires_in})
      history.push("/admin");
    })
  .catch((error) => {
    if(error){
  
      console.log(error);
      setdisplay('inline');
    }
  })
}

  if(Verified === "true"){
      history.push("/admin");
      return (
        <div>
            <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
        )
  }else if(Verified.length === 0){
    return (
    <div>
        <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    </div>
    )
  }
  else {
  return (
        <IconContext.Provider value={{ color: '#B5DFBB' }}>
        <div className='navbarr'>
    
          <div className="head-title">
          <img className='logo' src={Logo} alt="Logo" />
          <h4>Learning Management System</h4>
          </div>
        </div>
      <div className='loginmain' >
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {errors.exampleRequired && <span>This field is lalaa</span>}
        {<span style={{display: display, color: 'red' }}>oops..</span>}
        <form onSubmit={handleSubmit((data) => Auth(data))} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            type="email"
            name="email"
            autoComplete="email"
            inputRef={register}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit} >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </div>
    </IconContext.Provider>
  );
  }
}


export default Login;