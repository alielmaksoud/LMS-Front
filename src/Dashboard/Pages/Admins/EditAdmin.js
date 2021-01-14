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
import { useHistory } from "react-router-dom";
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
      backgroundColor: 'rgba(116, 255, 116, 0.145)'
    }
  },
}));



function EditAdmin(props) {
  const { register} = useForm();
  const cookie = CookieService.get('Bearer');
  let history = useHistory();
  const NewAdminclass = useStyless();
  const [display, setdisplay] = useState({display: 'None', color: 'red' });
  const [message, setmessage] = useState("none");
  const [AdminData, setAdminData] = useState(props.AdminData);
  
  const HandleChange = (e) => {
     let target = e.target.value
      setAdminData({...AdminData, [e.target.name]: target})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
     let file = e.target.file.files[0]
     let id = AdminData['id']
     const fdd = new FormData();
     if(file){
      fdd.append('file', file)
      fdd.append("picture", AdminData['first_name'].slice(-2) + AdminData['phone'].slice(-1) + AdminData['last_name'].slice(-2))
      // console.log(AdminData)
     }
    fdd.append("first_name", AdminData['first_name'])
    fdd.append("last_name", AdminData['last_name'])
    fdd.append("role", AdminData['role'])
    fdd.append("email", AdminData['email'])
    fdd.append("phone", AdminData['phone'])
    fdd.append("password", AdminData['password'])
    let headers = {
     'method' : 'POST',
      data : fdd,
      headers: {
        'Authorization': `Bearer ${cookie}`,
      }
    };
    axios(`http://localhost:8000/api/admin/${id}`, headers)
   .then(res => {
       console.log(res)
    setmessage("Admin info has been Modified")
    setdisplay({display: 'inline', color: 'green' })
    props.Edit()
    window.location.replace("/admin/ManageAdmin")
   })
  .catch((error) => {
   if(error.response){
     console.log(error);
     setmessage(Object.entries(error.response.data.errors).map((item, index) => " " + item[1] + " "))
    setdisplay({display: 'inline', color: 'red' })
   }else {
    setmessage("N e t w o r k  E r r o r")
    setdisplay({display: 'inline', color: 'red' })
  }
  })

}  
  return (
    <div className={NewAdminclass.editclass} >
    <Container component="main" maxWidth="md">
      <div className={NewAdminclass.paperr}>
        <Typography component="h1" variant="h5">
          Edit Admin Profile
        </Typography>
        {<span style={display}>{message}</span>}
        <form onSubmit={(e)=> handleSubmit(e)} className={NewAdminclass.formm} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={AdminData.first_name}
                onChange={(e) => HandleChange(e)}
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
                defaultValue={AdminData.last_name}
                onChange={(e) => HandleChange(e)}
                variant="outlined"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="lname"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                defaultValue={AdminData.role}
                onChange={(e) => HandleChange(e)}
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
                defaultValue={AdminData.phone}
                onChange={(e) => HandleChange(e)}
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
                defaultValue={AdminData.email}
                onChange={(e) => HandleChange(e)}
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
                onChange={(e) => HandleChange(e)}
                variant="outlined"
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
                onChange={(e) => HandleChange(e)}
                variant="outlined"
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
            Save
          </Button>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            onClick={()=> {
                props.Edit()
                history.push("/admin/ManageAdmin");
            }}
            className={NewAdminclass.submit}
          >
            Back
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

export default EditAdmin;