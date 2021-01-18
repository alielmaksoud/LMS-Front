import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import CookieService from '../../Service/CookieService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditStudent from './EditStudent';
import axios from 'axios';



function ManageAdmin() {
  const [Admins, setAdmins] = useState([])
  const [Loading, setLoading] = useState(true)
  const [Editing, setEditing] = useState(false)
  const [AdminData, setAdminData] = useState({})
    const useStyles = makeStyles((theme) => ({
        adminsTable: {
          color: 'green',
          position: 'fixed',
          zIndex: '0',
          width: '76%',
          height: '84vh',
          marginTop: '1%',
          marginLeft: '12%'
        },
        backdrop: {
          zIndex: theme.zIndex.drawer + 1,
          color: 'green',
        },
      }));
    const adminsTable = useStyles();
    const cookie = CookieService.get('Bearer');
    const linkkk = "http://localhost:8000/api/students/avatars/"
    

   const HandleEdit = () => {
      setEditing(!Editing)
    }
 
    useEffect( () => {
      setLoading(true)
      var config = {
        method: 'get',
        url: 'http://localhost:8000/api/student',
        headers: { 
          'Authorization': `Bearer ${cookie}`, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }};
          axios(config)
          .then(res => {
            console.log(res.data)
                  setAdmins(res.data.map((item, index)=>  
                    {return {
                        ...item,
                        delete: {id: item.id, img: item.picture},
                        edit: {id: item.id, index: index },
                        image   : linkkk + item.picture,
                    }}));
                    setLoading(false)
          }).catch(err => {
            console.log(err.request)
          })
    },[]);
    const DeleteAdmin = async (id, img) => {
        setLoading(true);
        console.log(img)
        var config2 = {
          method: 'Delete',
          url: `http://localhost:8000/api/students/delavatar/${img}`,
          headers: { 
            'Authorization': `Bearer ${cookie}`, 
            'Content-Type': 'application/x-www-form-urlencoded'
          }};
 
        var config = {
        method: 'Delete',
        url: `http://localhost:8000/api/student/${id}`,
        headers: { 
          'Authorization': `Bearer ${cookie}`, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }};
  
          axios(config)
          .then(res => {
            console.log(res)
            setAdmins(res.data.map(item =>  
              {return {
                  ...item,
                  delete: item.id,
                  edit: item.id,
                  image   : linkkk + item.picture
              }}));
                  
          }).catch(err => {
            console.log(err)
          })

          axios(config2)
          .then(res => {
    
          }).catch(err => {
            console.log(err)
          })
          setLoading(false)
    }
    const columns = [

      { field: 'student_id', headerName: 'ID', width:95},
      {
        field: 'image',
        headerName: 'Picture',
        width: 60,
        sortable: false,
        renderCell: (params) => (
    
            <Avatar style={{width: '1', height: '1'}} alt="Remy Sharp" src={params.value}/>
        ),
      },
      {
        field: 'fullName',
        headerName: 'Full name',
        width: 150,
        valueGetter: (params) =>
          `${params.getValue('first_name') || ''} ${params.getValue('last_name') || ''}`,
      },
     
      { field: 'class_name', headerName: 'Class', width: 100},
      { field: 'section_name', headerName: 'Section', width: 100},
      { field: 'email', headerName: 'Email' , width: 160 },
      { field: 'phone', headerName: 'Phone', type:'number', width: 110 },
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
            <Button onClick={()=> DeleteAdmin(params.value.id, params.value.img)} style={{backgroundColor: '#F76363'}} variant="contained" size="small" alt="Remy Sharp">
                Delete
            </Button>
        ),
      },
      
    ];
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
    <div className={adminsTable.adminsTable} >
      <DataGrid rows={Admins} columns={columns} pageSize={8}/>
    </div>
  );
    }
}


export default ManageAdmin;