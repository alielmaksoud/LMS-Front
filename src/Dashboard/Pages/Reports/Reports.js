import React, { useEffect, useState } from "react";
import Paper from '@material-ui/core/Paper';
import DonutSearch from './DonutSearch';
import BarsSearch from './BarsSearch'
import BarsDate from './BarsDate'
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
        fontFamily:'"Roboto", "Helvetica", "Arial", "sans-serif"',
        marginBottom:'1rem',
    },
    search:{
        display:'flex',
        flexDisplay:'column',
        justifyContent: 'center',
        gap:'5rem'
    },
    barSearch:{
        paddingTop:'0.5em'
    },
    totalStudents:{
      fontFamily:'"Roboto", "Helvetica", "Arial", "sans-serif"',
      fontWeight:'400'
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
    const [sectionAttendance, setSectionAttendance] = useState([]);
    const [sectionId, setSectionId] = useState(1);
    const [attendanceByDate, setAttendanceByDate] = useState([]);
    const [display, setdisplay] = useState({display: 'None', color: 'red' });
    const [message, setmessage] = useState("none");
    const [BarPresent, setBarPresent] = useState(5);
    const [BarLate, setBarLate] = useState(3);
    const [BarAbsent, setBarAbsent] = useState(1);
    const [totalStudents, settotalstudents] = useState(0);

    const setSection = (sectionId) => {
        setSectionId(sectionId);
    }
    console.log(sectionId)
    const setDate = (date) => {
        const filtered = sectionAttendance.filter(item => item.date === date)
        if (filtered && filtered.length !== 0){
            setAttendanceByDate(filtered)
            setdisplay({display: 'none', textAlign:'center', color: 'red' })
            settotalstudents(filtered.length)
        }else {
            setmessage('No Attendance for the specified date!')
            setdisplay({display: 'inline-block', textAlign:'center', width:'100%', color: 'red' })
            settotalstudents(0)
        }
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

            singleAttendance.forEach((item) =>{
               
                if(item.status === 'present'){
                  Present.push(item);
                    
                }else if(item.status === 'late'){
                  Late.push(item);
               }else if(item.status === 'absent'){
                Absent.push(item);
            }
            }) 
            setPresent(Present.length)
            setLate(Late.length)
            setAbsent(Absent.length)
      },[singleAttendance]);
      

    const Donut = [
        { Attendance: 'Present', val: Present },
        { Attendance: 'Late', val: Absent },
        { Attendance: 'Absent', val:Late },
  
      
      ];
      useEffect ( async () => {
        var config = {
          method: 'get',
          url: `http://localhost:8000/api/section/${sectionId}`,
          headers: { 
            'Authorization': `Bearer ${cookie}`, 
            'Content-Type': 'application/x-www-form-urlencoded'
          }};
          try{
            let res = await axios(config)
              if(res.data) {
            setSectionAttendance(res.data.getattendance)
            }
          }
          catch(e){
            console.log(e);
          }
         
      },[sectionId]);
    console.log( attendanceByDate, 'hahahhah' )
    useEffect ( async () => {
      var barPresent =[];
      var barLate =[];
      var barAbsent =[];

      attendanceByDate.forEach((item) =>{
            
             if(item.status === 'present'){
              barPresent.push(item);
                 
             }else if(item.status === 'late'){
              barLate.push(item);
            }else if(item.status === 'absent'){
              barAbsent.push(item);
         }
         }) 
         if (totalStudents !== 0){
          setBarPresent(barPresent.length)
          setBarLate(barLate.length)
          setBarAbsent(barAbsent.length)
          }
          else{
            setBarPresent(0)
            setBarLate(0)
            setBarAbsent(0)
          }
   },[attendanceByDate, totalStudents]);
   console.log(BarPresent)
      const Barsz = [
        { Attendance: 'Present' + ': ' + BarPresent , Students: BarPresent  },
        { Attendance: 'Late' + ': ' + BarLate , Students: BarLate},
        { Attendance: 'Absent' + ': ' + BarAbsent , Students: BarAbsent },
   
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
                {<span style={display}>{message}</span>}
                <div style={Styles.search}>
                <BarsSearch setSection={setSection} />
                <div style={Styles.barSearch} >
                    <BarsDate setDate={setDate}/>
                </div>   
                </div>
                <h3 style={Styles.totalStudents}> Number of Students: {totalStudents} </h3>                
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