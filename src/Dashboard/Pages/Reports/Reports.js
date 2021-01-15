import React, { useEffect, useState } from "react";
import Paper from '@material-ui/core/Paper';
import DonutSearch from './DonutSearch';
import CookieService from '../../Service/CookieService';
import axios from 'axios'


import {
  Chart,
  PieSeries,
  ArgumentAxis,
  BarSeries,
  ValueAxis,
  Title,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation, EventTracker, HoverState} from '@devexpress/dx-react-chart';


const Styles = {
    container : {
        height : '73vh',
        display: 'flex',
        padding : '2%',
        gap : '2%',
        backgroundColor: 'rgba(116, 255, 116, 0.145)'
    },
    donut: {
        width : "50vw",

    },
    donutpaper:{
        backgroundColor: 'rgba(116, 255, 116, 0.145)',
        
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
        fontFamily:'"Roboto", "Helvetica", "Arial", "sans-serif"'
    },
    bars : {
        width : "50vw",
    }
    

}


const Reports = () => {
    const cookie = CookieService.get('Bearer');
    const [studentId, setStudentId] = useState({});
    const [singleAttendance, setSingleAttendance] = useState({});
    var present = [];
    var late = [];
    var absent = [];

    const setStudent = (student) => {
        setStudentId(student.id);
    }
    console.log(studentId);

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
            setSingleAttendance(res.data)
            console.log(res)
          }
          catch(e){
            console.log(e);
          }
         singleAttendance.forEach((item) =>{
             if(item.status === 'present'){
                 present.push(item);
             }
             if(item.status === 'late'){
                late.push(item);
            }
            if(item.status === 'absent'){
                absent.push(item);
            }
             
         })   
      },[studentId]);
      console.log(present);

    const Donut = [
        { Attendance: 'Present', val: 1},
        { Attendance: 'Late', val: 1},
        { Attendance: 'Absent', val: 1},
  
      
      ];

      const Barsz = [
        { Attendance: 'Present', Students: 23 },
        { Attendance: 'Late', Students: 5 },
        { Attendance: 'Absent', Students: 2 },
   
      ];


      
    return (
        <div style={Styles.container}>
            <div style={Styles.donut}>
                <Paper style={Styles.donutpaper}>
                <h4 style={Styles.donutTitle}>Student Attendance</h4>
                <div style={Styles.donutsearch}>
                    <DonutSearch setStudent={setStudent} />
                </div>
                <Chart
                    data={Donut}
                >
                    <PieSeries
                    valueField="val"
                    argumentField="Attendance"
                    innerRadius={0.5}
                    
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
             <div style={Styles.bars}>
                <Paper style={{backgroundColor: 'rgba(116, 255, 116, 0.145)'}}>
                <Chart
                data={Barsz}
                >
                <ArgumentAxis />
                <ValueAxis max={1} />

                <BarSeries
                    valueField="Students"
                    argumentField="Attendance"
                    color="#55A661"
                  
                />
                <Title text="Section Attendance" />
                <Animation />
                 <EventTracker />
                     <HoverState />
                </Chart>
            </Paper>
            </div>
         </div>
      );


}


export default Reports;