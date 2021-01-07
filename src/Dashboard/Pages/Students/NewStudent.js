import React, { useState, useEffect } from 'react';
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



function NewStudent() {
  const { register , handleSubmit, errors, reset } = useForm();
  const cookie = CookieService.get('Bearer');
  const NewAdminclass = useStyless();
  const [display, setdisplay] = useState({display: 'None', color: 'red' });
  const [message, setmessage] = useState("none");
  const [Loading, setLoading] = useState(true)
  const [Classes, setClasses] = useState([]);
  const [Sections, setSections] = useState([]);




  useEffect(() => {
    setLoading(true)
    var config = {
      method: 'get',
      url: 'http://localhost:8000/api/classesinfo',
      headers: { 
        'Authorization': `Bearer ${cookie}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
      }};
        axios(config)
        .then(res => {
                setClasses(res.data.sections)
                setSections(res.data.sections[0].getsections.map(item => item))
        }).catch(err => {
          console.log(err.request)
        })
       setLoading(false)
  },[]);




  const Create = async (data) => {
    const fd = new FormData();
    fd.append('file', data.file[0])
    fd.append("first_name", data.first_name)
    fd.append("last_name", data.last_name)
    fd.append("email", data.email)
    fd.append("phone", data.phone)
    fd.append("section_id", data.section_id)
    fd.append("class_id", data.class_id)
    fd.append("picture", data.first_name + "-" + data.last_name)
    let headers = {
      headers: {
        'Content-Type':'form-data',
        'Authorization': `Bearer ${cookie}`,
      }
    };
    axios.post('http://localhost:8000/api/student', fd, headers)
   .then(res => {
    setmessage(data.first_name + " has been added")
    setdisplay({display: 'inline', color: 'green' })
    reset();
   })
  .catch((error) => {
   if(error){
     console.log(error);
    setmessage("oops..")
    setdisplay({display: 'inline', color: 'red' })
   }
  })
}
const handleChangeSection = (event) => {
  let pickedclass = (Classes.filter((item) => item.id == event.target.value))
  let pickedsections = pickedclass[0].getsections.map(item => item)
  setSections(pickedsections)

 };

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
    <div className='loginmain' >
    <Container component="main" maxWidth="md">
      <div className={NewAdminclass.paperr}>
        <Typography component="h1" variant="h5">
          New Student
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
              id="class_id"
              select
              onChange={handleChangeSection}
              name="class_id"
              inputRef={register}
              SelectProps={{
              native: true,
          }}
          helperText="Please select CLass"
        >
          {Classes.map((option) => { 
            return (
            <option key={option.id} value={option.id}>
              {option.class_name}
            </option>
          )
          }
          )}
        </TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField
              id="section_id"
              select
      
              name="section_id"
              inputRef={register}
              SelectProps={{
              native: true,
          }}
          helperText="Please select Section"
        >
          {Sections.map((option) => { 
            return (
            <option key={option.id} value={option.id}>
              {option.section_name}
            </option>
          )
          }
          )}
        </TextField>
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
}

export default NewStudent;