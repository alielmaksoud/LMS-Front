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

const useStyless = makeStyles((themee) => ({
  paperr: {
    paddingTop : themee.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },

  formm: {
    width: '100%', // Fix IE 11 issue.
    marginTop: themee.spacing(1),
  
  },
  submit: {
    margin: themee.spacing(1, 0, 0),
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
    editclass : {
      backgroundColor: '#bffac8',
      height: '100%'
    }
  },
}));



function NewAdmin() {
  const { register , handleSubmit , reset } = useForm();
  const cookie = CookieService.get('Bearer');
  const NewAdminclass = useStyless();
  const [display, setdisplay] = useState({display: 'None', color: 'red' });
  const [message, setmessage] = useState("none");


  const Create = async (data) => {
    const fd = new FormData();
    fd.append('file', data.file[0])
    fd.append("first_name", data.first_name)
    fd.append("last_name", data.last_name)
    fd.append("role", data.role)
    fd.append("email", data.email)
    fd.append("phone", data.phone)
    fd.append("password", data.password)
    fd.append("picture", data.first_name + "-" + data.last_name)
    let headers = {
      headers: {
        'Content-Type':'form-data',
        'Authorization': `Bearer ${cookie}`,
      }
    };
    axios.post('http://localhost:8000/api/admin', fd, headers)
   .then(res => {
    setmessage(data.first_name + " has been added")
    setdisplay({display: 'inline', color: 'green' })
    reset();
   })
  .catch((error) => {
   if(error){
     console.log(error);
    setmessage(error.response.data.message)
    setdisplay({display: 'inline', color: 'red' })
   }
  })
}
  return (
    <div style={{backgroundColor: 'rgba(116, 255, 116, 0.145)'}} className={NewAdminclass.editclass} >
    <Container  component="main" maxWidth="md">
      <div className={NewAdminclass.paperr}>
        <Typography component="h1" variant="h5">
          New Admin
        </Typography>
        {<span style={display}>{message}</span>}
        <form onSubmit={handleSubmit((data) => Create(data))} className={NewAdminclass.formm} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
       
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="firstname"
                label="First Name"
                inputRef={register}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="last_name"
                autoComplete="lname"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="role"
                label="Role"
                name="role"
                autoComplete="lname"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="lname"
                inputRef={register}
              />
              </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
            <label for="image">Profile Picture</label>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="file"
                type="file"
                id="file"
                inputRef={register}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            className={NewAdminclass.submit}
          >
            Sign Up
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

export default NewAdmin;