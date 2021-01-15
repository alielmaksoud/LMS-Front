import React, { useEffect, useState } from "react";
import Paper from '@material-ui/core/Paper';
import DonutSearch from './DonutSearch';
import GroupedSelect from './BarsSearch'
import CookieService from '../../Service/CookieService';
import axios from 'axios'
import Keys from './keys'


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
         var present =[];
         var late =[];
         var absent =[];

            singleAttendance.forEach((item) =>{
               
                if(item.status === 'present'){
                    present.push(item);
                    
                }else if(item.status === 'late'){
                    late.push(item);
               }else if(item.status === 'absent'){
                absent.push(item);
            }
            }) 
            setPresent(present.length)
            setLate(late.length)
            setAbsent(absent.length)
      },[singleAttendance]);
      

    const Donut = [
        { Attendance: 'Present', val: Present },
        { Attendance: 'Late', val: Absent },
        { Attendance: 'Absent', val:Late },
  
      
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
                <Keys Present={Present} Late={Late} Absent={Absent} totalAttendance={totalAttendance} />
                </Paper>
            </div>
             <div style={Styles.bars}>
                <Paper style={{backgroundColor: 'rgba(116, 255, 116, 0.145)'}}>
                <h4 style={Styles.donutTitle}>Section Attendance</h4>
                <div style={Styles.search}>
                    <GroupedSelect/>
                </div>
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