import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { useForm } from "react-hook-form";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CookieService from '../../Service/CookieService';
import { DataGrid } from '@material-ui/data-grid';
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
    width: '99%'

  },

  formm: {
    width: '80%', // Fix IE 11 issue.
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
  submit2: {
    margin: themee.spacing(5, 2, 0),
    width: "10%",
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
  label: {
    fontSize: '0.9rem',
    paddingLeft: '1%'
  },
  adminsTable: {
    color: 'green',
    width: '50%',
    height: '50vh',
    marginTop: '1%',
    'marginLeft': '25%',
    
  },
  backdrop: {
    zIndex: themee.zIndex.drawer + 1,
    color: 'green',
  },
  editclass : {
    backgroundColor: 'rgba(116, 255, 116, 0.145)'
  }
}));



function NewStudent(props) {
  const { register , handleSubmit, reset } = useForm();
  const cookie = CookieService.get('Bearer');
  const NewAdminclass = useStyless();
  const [display, setdisplay] = useState({display: 'None', color: 'red' });
  const [message, setmessage] = useState("none");
  const [Loading, setLoading] = useState(true)
  const [Sections, setSections] = useState([]);
  const [NewSection, setNewSection] = useState("");

  useEffect(() => {
    setLoading(true)
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
          setSections(res.data.sections.filter(item => item.id == props.AdminData.id)[0].getsections.map((item, index)=>  
          {return {
              ...item,
              sections: item.section_name,
              delete: {id: item.id },
          }}))

        }).catch(err => {
          console.log(err)
          
        })
       setLoading(false)
  },[]);

  const DeleteSection = (id) => {
    setLoading(true);
    const class_id = [props.AdminData.id, id]
    console.log(id)
    var config = {
    method: 'Delete',
    url: `http://localhost:8000/api/section/${id}`,
    headers: { 
      'Authorization': `Bearer ${cookie}`, 
      'Content-Type': 'application/x-www-form-urlencoded'
    }};

      axios(config)
      .then(res => {
        console.log(res)
        setmessage(res.data.message)
        setdisplay({display: 'inline', color: 'green' })
      }).catch(err => {
        console.log(err)
        
      })
      var config2 = {
        method: 'get',
        url: 'http://localhost:8000/api/classesinfo',
        headers: { 
          'Authorization': `Bearer ${cookie}`, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }};
          axios(config2)
          .then(res => {
            setSections(res.data.sections.filter(item => item.id == props.AdminData.id)[0].getsections.map((item, index)=>  
            {return {
                ...item,
                sections: item.section_name,
                delete: {id: item.id },
            }}))
          }).catch(err => {
            console.log(err)
            
          })
         setLoading(false)

  }
  const columns = [

    { field: 'sections', headerName: 'Sections', width: 400},
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,

      renderCell: (params) => (
          <Button onClick={()=> DeleteSection(params.value.id)} style={{backgroundColor: '#F76363'}} variant="contained" size="small" alt="Remy Sharp">
              Delete
          </Button>
      ),
    },
    
  ];

  const Modify = async (data) => {
    console.log(data)
    let id = props.AdminData.id
    const fd = new FormData();
    fd.append("class_name", data.class_name)

    let headers = {
      'method' : 'POST',
       data : fd,
       headers: {
         'Authorization': `Bearer ${cookie}`,
       }
     };
     axios(`http://localhost:8000/api/classes/${id}`, headers)
    .then(res => {
        console.log(res)
     setmessage("Class Name has been Modified")
     setdisplay({display: 'inline', color: 'green' })
     props.Edit()
     window.location.replace('/admin/ManageClasses')
    })
   .catch((error) => {
    if(error){
      console.log(error);
     setmessage("oops..")
     setdisplay({display: 'inline', color: 'red' })
    }
   })
}


const newsection = () => {
  console.log(NewSection)
  let id = props.AdminData.id
  const fd = new FormData();
  fd.append("class_id", id)
  fd.append('section_name', NewSection.toUpperCase())
  let headers = {
    'method' : 'POST',
     data : fd,
     headers: {
       'Authorization': `Bearer ${cookie}`,
     }
   };
   axios(`http://localhost:8000/api/section/${id}`, headers)
  .then(res => {
      console.log(res)
   setmessage("New section has been added")
   setdisplay({display: 'inline', color: 'green' })

  console.log(res);
    console.log(res.data.section, "shit")
   setSections(res.data.section.map((item, index)=>  
                {return {
                    ...item,
                    sections: item.section_name,
                    delete: {id: item.id },

                }}))
    setNewSection("")     
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
  console.log(props)
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
    <div className={NewAdminclass.editclass} >

      <div className={NewAdminclass.paperr}>
        <Typography component="h1" variant="h5">
          Edit Class
        </Typography>
        {<span style={display}>{message}</span>}
        <form onSubmit={handleSubmit((data) => Modify(data))} className={NewAdminclass.formm} >
          <Grid container spacing={2}>
          <Grid sm={3}></Grid>
            <Grid item sm={6}>
            <label className={NewAdminclass.label} htmlFor="class_name">Class Name</label>
              <TextField
                autoComplete="Classname"
                name="class_name"
                variant="outlined"
                required
                fullWidth
                defaultValue={props.AdminData.class_name}
                id="class_name"
     
                inputRef={register}
                autoFocus
              />
            </Grid>
            <Grid sm={3}></Grid>
            <Grid sm={3}></Grid>
            <Grid item sm={6}>
            <label className={NewAdminclass.label} htmlFor="class_name">New Section</label>
              <TextField
                autoComplete="Section_name"
                name="section_name"
                variant="outlined"
                fullWidth
                onChange={(e) => setNewSection(e.target.value)}
                id="section_name"
                inputRef={register}
                autoFocus
              />
            </Grid>
            <Grid sm={3}>
            <Button onClick={newsection} className={NewAdminclass.submit2} >Add</Button>
            </Grid>
          </Grid>
          <Grid sm={12}>
          <div className={NewAdminclass.adminsTable} >
              <DataGrid rows={Sections} columns={columns} pageSize={8}/>
          </div>
          </Grid>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            className={NewAdminclass.submit}
          >
            Update
          </Button>
        </form>
      </div>
      <Box mt={1.3}>
        <Copyright />
      </Box>

    </div>
  );
          }
}

export default NewStudent;