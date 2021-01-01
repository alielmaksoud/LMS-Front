import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';




const columns = [

  { field: 'id', headerName: 'ID', width:65},
  {
    field: 'Pictures',
    headerName: 'Pictures',
    width: 60,
    sortable: false,
    renderCell: (params) => (
    
        <Avatar style={{width: '1', height: '1'}} alt="Remy Sharp" src={params.value}/>
    ),
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
 
  { field: 'Role', headerName: 'Role' },
  { field: 'Email', headerName: 'Email' },
  { field: 'Phone', headerName: 'Phone', type:'number' },
  {
    field: 'edit',
    headerName: 'Edit',
    renderCell: (params) => (
    
        <Button style={{backgroundColor: '#36C14B'}} variant="contained" size="small" alt="Remy Sharp">
            Edit
        </Button>
    ),
  },
  {
    field: 'delete',
    headerName: 'Delete',
    renderCell: (params) => (
    
        <Button style={{backgroundColor: '#F76363'}} variant="contained" size="small" alt="Remy Sharp">
            Delete
        </Button>
    ),
  },
  
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', Pictures:'https://material-ui.com/static/images/avatar/1.jpg', delete: "delete" },
  { id: 4, lastName: 'Stark', firstName: 'Arya'},
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys'},
  { id: 6, lastName: 'Melisandre', firstName: null },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey' },
  { id: 10, lastName: 'Melisandre', firstName: null },
  { id: 12, lastName: 'Clifford', firstName: 'Ferrara' },
  { id: 13, lastName: 'Frances', firstName: 'Rossini' },
  { id: 14, lastName: 'Roxie', firstName: 'Harvey' },
];

export default function ManageAdmin() {
    const useStyles = makeStyles((theme) => ({
        adminsTable: {
          color: 'green',
          position: 'fixed',
          zIndex: '0',
          width: '70%',
          height: '84vh',
          marginTop: '1%',
          'marginLeft': '15%',

        },
      }));

    const classes = useStyles();
  return (
    <div className={classes.adminsTable} >
      <DataGrid rows={rows} columns={columns} pageSize={8}/>
    </div>
  );
}