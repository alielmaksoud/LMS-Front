import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { green } from '@material-ui/core/colors';
import { useForm } from "react-hook-form";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CookieService from '../../Service/CookieService';
import axios from 'axios'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" style={{cursor: "alias", textDecoration: "none"}}>
        Learning Management System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStylesss = makeStyles((themee) => ({
  paperr: {
    paddingTop : themee.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  formm: {
    width: '100%', // Fix IE 11 issue.
    marginTop: themee.spacing(6),
    
  },
  submit: {
    margin: themee.spacing(6, 0, 0),
    marginLeft: "35%",
    marginRight: "35%",
    width: "30%",
    color: themee.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
    backdrop: {
      zIndex: themee.zIndex.drawer + 1,
      color: 'green',
    },
    studentsloading: {
      color: 'green',
      position: 'fixed',
      zIndex: '0',
      width: '70%',
      height: '84vh',
      marginTop: '1%',
      'marginLeft': '15%',
    },
 
  },
}));



function NewClass() {
  const { register , handleSubmit, reset } = useForm();
  const cookie = CookieService.get('Bearer');
  const NewAdminclass = useStylesss();
  const [display, setdisplay] = useState({display: 'None', color: 'red' });
  const [message, setmessage] = useState("none");
  const [Loading, setLoading] = useState(false)







  const Create = async (data) => {
    const fd = new FormData();
    setLoading(true)
    console.log(data)
    fd.append('class_name', data.class_name)
    let headers = {
      headers: {
        'Content-Type':'form-data',
        'Authorization': `Bearer ${cookie}`,
      }
    };
    axios.post('http://localhost:8000/api/classes', fd, headers)
   .then(res => {
    setmessage(data.class_name + " has been created")
    setdisplay({display: 'inline', color: 'green' })
    reset();
    setLoading(false)
   })
  .catch((error) => {
   if(error){
     console.log(error);
    setmessage("oops..")
    setdisplay({display: 'inline', color: 'red' })
   }

  })
}


 if(Loading) {
      return (
        <div>
            <Backdrop className={NewAdminclass.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
      )
 }
 else {
  return (
    <div style={{backgroundColor: 'rgba(116, 255, 116, 0.145)'}} className='loginmain' >
    <Container component="main" maxWidth="md">
      <div className={NewAdminclass.paperr}>
        <Typography component="h1" variant="h5">
          New Class
        </Typography>
        {<span style={display}>{message}</span>}
        <form onSubmit={handleSubmit((data) => Create(data))} className={NewAdminclass.formm} >
          <Grid container spacing={2}>
          <Grid sm={3}></Grid>
            <Grid item sm={6}>
              <TextField
                autoComplete="Classname"
                name="class_name"
                variant="outlined"
                required
                fullWidth
                id="class_name"
                label="Class name"
                inputRef={register}
                autoFocus
              />
            </Grid>
            <Grid sm={3}></Grid>
           
          </Grid>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            className={NewAdminclass.submit}
          >
            Create
          </Button>
        </form>
      </div>
      <Box mt={1.3}>
        <Copyright />
      </Box>
    </Container>
    </div>
  );
          }
}

export default NewClass;