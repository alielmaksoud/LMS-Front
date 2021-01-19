import React, { useEffect, useState } from "react";
import Paper from '@material-ui/core/Paper';
import DonutSearch from './DonutSearch';
import CookieService from '../../Service/CookieService';
import './Reports.css';
import axios from 'axios'
import Keys from './keys'



import {
    Chart,
    PieSeries,
  } from '@devexpress/dx-react-chart-material-ui';

import { Animation, EventTracker, HoverState} from '@devexpress/dx-react-chart';


const Styles = {
    container : {
        height : '78vh',
        display: 'flex',
        padding : '2%',
        gap : '2%',
        backgroundColor: 'rgba(116, 255, 116, 0.145)',
        overflowY:'scroll'
    },
    donut: {
        width : "50%", 

    },
    paper:{
        backgroundColor: 'rgba(116, 255, 116, 0.145)',
        padding: '20px',
        position: 'static',
        height : '99vh',
    },
    donutsearch:{
        display:'flex',
        flexDisplay:'column',
        justifyContent:'center'
    },
    donutTitle:{
        marginTop:'0',
        paddingTop:'2%',
        textAlign:'center',
        fontSize:'1.5rem',
        fontWeight:'400',
        fontFamily:'"Roboto", "Helvetica", "Arial", "sans-serif"',
        marginBottom:'1rem',
    },
    search:{
        display:'flex',
        flexDisplay:'column',
        justifyContent: 'center',
        gap:'5rem'
    },
    totalStudents:{
      fontFamily:'"Roboto", "Helvetica", "Arial", "sans-serif"',
      fontWeight:'400'
  }
}


const Donut = () => {
    const cookie = CookieService.get('Bearer');
    const [studentId, setStudentId] = useState(1);
    const [singleAttendance, setSingleAttendance] = useState([]);
    const [totalAttendance, setTotalAttendance] = useState([]);
    const [Present, setPresent] = useState(5);
    const [Late, setLate] = useState(3);
    const [Absent, setAbsent] = useState(1);

   
    const setStudent = (student) => {
      setStudentId(student.id);
  }

    useEffect ( async () => {

        var config = {
          method: 'get',
          url: `http://localhost:8000/api/attendance/${studentId}`,
          headers: { 
            'Authorization': `Bearer ${cookie}`, 
            'Content-Type': 'application/x-www-form-urlencoded'
          }};
          try{
            let res = await axios(config)
              if(res.data) {
            setSingleAttendance(res.data)
            setTotalAttendance(res.data.length)
            }
          }
          catch(e){
            console.log(e);
          }  
          
      },[studentId]);

      
      useEffect ( async () => {
         var Present =[];
         var Late =[];
         var Absent =[];
         try{
            singleAttendance.forEach((item) =>{
               
                if(item.status === 'Present'){
                  Present.push(item);
                    
                }else if(item.status === 'Late'){
                  Late.push(item);
               }else if(item.status === 'Absent'){
                Absent.push(item);
            }
            }) 
            setPresent(Present.length)
            setLate(Late.length)
            setAbsent(Absent.length)
          }
          catch(e){
            console.log(e)
          }
      },[singleAttendance]);
      

    const Donut = [
        { Attendance: 'Present', val: Present },
        { Attendance: 'Late', val: Absent },
        { Attendance: 'Absent', val:Late },
      ];


      return (

        <div style={Styles.donut}>
        <Paper className='reportspaper'>
            <h4 style={Styles.donutTitle}>Student Attendance</h4>
            <div style={Styles.donutsearch}>
              <DonutSearch setStudent={setStudent} />
            </div>
            <Keys Present={Present} Late={Late} Absent={Absent} totalAttendance={totalAttendance} />
            <Chart data={Donut}>
              <PieSeries
                valueField="val"
                argumentField="Attendance"
                innerRadius={0.5}
                outerRadius={0.9}
                onClick={(e)=> {
                    console.log(e.target.attributes.d.value)
                }}
                />
              <Animation />
              <EventTracker />
              <HoverState />
            </Chart>
          </Paper>
          </div>
      )

}


export default Donut;