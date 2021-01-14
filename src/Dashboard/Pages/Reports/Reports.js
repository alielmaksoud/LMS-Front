import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import DonutSearch from './DonutSearch';
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
    bars : {
        width : "50vw",
        
 
    }

}

const Reports = () => {



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
                <Paper style={{backgroundColor: 'rgba(116, 255, 116, 0.145)'}}>
                <DonutSearch/>
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
                    <Title
                    text="Student Attendance"
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