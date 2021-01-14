import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import CookieService from '../../Service/CookieService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import EditStudent from './EditClass';
import axios from 'axios';




function ManageAdmin() {
  const [Admins, setAdmins] = useState([])
  const [Loading, setLoading] = useState(true)
  const [Editing, setEditing] = useState(false)
  const [AdminData, setAdminData] = useState({})
  const [display, setdisplay] = useState({display: 'None', color: 'red' });
  const [message, setmessage] = useState("none");
    const useStyles = makeStyles((theme) => ({
        adminsTable: {
          color: 'green',
          zIndex: '0',
          width: '50%',
          height: '65vh',
          marginTop: '1%',
          'marginLeft': '25%',
          
        },
        manageclass : {
          backgroundColor: "rgba(116, 255, 116, 0.145)",
          height:'84vh',
          textAlign: 'center'

        },
        backdrop: {
          zIndex: theme.zIndex.drawer + 1,
          color: 'green',
        },
        ballout : {
          padding: '2%'
        }
      }));
    const adminsTable = useStyles();
    const cookie = CookieService.get('Bearer');

   const HandleEdit = () => {
      setEditing(!Editing)
    }
 
    useEffect( () => {
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
   
                  setAdmins(res.data.sections.map((item, index)=>  
                    {return {
                        ...item,
                        class_name: item.class_name,
                        sections: item.getsections.map(item => item.section_name).join(", "),
                        delete: {id: item.id },
                        edit: {id: item.id,index: index },
                    }}));
                    setLoading(false)
          }).catch(err => {
            console.log(err.request)
          })
    },[]);
    const DeleteAdmin = (id) => {
        setLoading(true)
        var config = {
        method: 'Delete',
        url: `http://localhost:8000/api/classes/${id}`,
        headers: { 
          'Authorization': `Bearer ${cookie}`, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }};
  
          axios(config)
          .then(res => {
            console.log(res.data.message)
            setmessage(res.data.message)
            setdisplay({display: 'inline', color: 'red' , })
          }).catch(err => {
            console.log(err)
          })
          setLoading(false)
          var config2 = {
            method: 'get',
            url: 'http://localhost:8000/api/classesinfo',
            headers: { 
              'Authorization': `Bearer ${cookie}`, 
              'Content-Type': 'application/x-www-form-urlencoded'
            }};
              axios(config2)
              .then(res => {
                      setAdmins(res.data.sections.map((item, index)=>  
                        {return {
                            ...item,
                            class_name: item.class_name,
                            sections: item.getsections.map(item => item.section_name).join(", "),
                            delete: {id: item.id },
                            edit: {id: item.id, index: index},
                        }}));
                        setLoading(false)
              }).catch(err => {
                console.log(err.request)
              })
    }
    const columns = [

  

     
      { field: 'class_name', headerName: 'Class', width: 170},
      { field: 'sections', headerName: 'Sections', width: 300},

      {
        field: 'edit',
        headerName: 'Edit',
        sortable: false,

        renderCell: (params) => (
        
          <Button style={{backgroundColor: '#36C14B'}} variant="contained" size="small" alt="Remy Sharp" onClick={
            () =>  {
              console.log(params)
             setAdminData(Admins[params.value.index]);
             setEditing(true);
            }}>
             Edit
         </Button>
        ),
      },
      {
        field: 'delete',
        headerName: 'Delete',
        sortable: false,

        renderCell: (params) => (
            <Button onClick={()=> DeleteAdmin(params.value.id)} style={{backgroundColor: '#F76363'}} variant="contained" size="small" alt="Remy Sharp">
                Delete
            </Button>
        ),
      },
      
    ];
    console.log(Admins, "lalaaa")
    if(Loading){
      return (
        <div>
            <Backdrop className={adminsTable.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
      )
    }
    if(Editing){
      return (
        <div>
            <EditStudent AdminData={AdminData} Edit={HandleEdit} />
        </div>
      )
    }else {
  return (
    <div className={adminsTable.manageclass}>
        <Typography className={adminsTable.ballout} component="h1" variant="h5">
          Manage Classes
        </Typography>
        {<span style={display}>{message}</span>}
      <div className={adminsTable.adminsTable} >
        <DataGrid rows={Admins} columns={columns} pageSize={8}/>
      </div>
    </div>
  );
    }
}


export default ManageAdmin;