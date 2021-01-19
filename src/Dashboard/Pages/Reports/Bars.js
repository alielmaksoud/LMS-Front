import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import BarsSearch from "./BarsSearch";
import BarsDate from "./BarsDate";
import CookieService from "../../Service/CookieService";
import "./Reports.css";
import axios from "axios";

import {
  Chart,
  ArgumentAxis,
  BarSeries,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";

import {
  Animation,
  EventTracker,
  HoverState,
} from "@devexpress/dx-react-chart";

const Styles = {
  container: {
    height: "78vh",
    display: "flex",
    padding: "2%",
    gap: "2%",
    backgroundColor: "rgba(116, 255, 116, 0.145)",
    overflowY: "scroll",
  },
  paper: {
    backgroundColor: "rgba(116, 255, 116, 0.145)",
    padding: "20px",
    position: "static",
    height: "99vh",
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
  search: {
    display: "flex",
    flexDisplay: "column",
    justifyContent: "center",
    gap: "5rem",
  },
  barSearch: {
    paddingTop: "0.5em",
  },
  totalStudents: {
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    fontWeight: "400",
  },
  bars: {
    width: "50%",
    
  },
};

const Bars = () => {
  const cookie = CookieService.get("Bearer");
  const [sectionAttendance, setSectionAttendance] = useState([]);
  const [sectionId, setSectionId] = useState(1);
  const [attendanceByDate, setAttendanceByDate] = useState([]);
  const [display, setdisplay] = useState({ display: "None", color: "red" });
  const [message, setmessage] = useState("none");
  const [BarPresent, setBarPresent] = useState(5);
  const [BarLate, setBarLate] = useState(3);
  const [BarAbsent, setBarAbsent] = useState(1);
  const [totalStudents, settotalstudents] = useState();
  const [sectionMessage, setSectionMessage] = useState(
    "Please select the section & the date"
  );
  const [datee, setdatee] = useState("2021-01-14");

  const setSection = (sectionId) => {
    setSectionId(sectionId);
  };

  const setDate = (date) => {
    setdatee(date);
  };

  useEffect(async () => {
    let id = sectionId;
    var config = {
      method: "get",
      url: `http://localhost:8000/api/section/${id}`,
      headers: {
        Authorization: `Bearer ${cookie}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    axios(config)
      .then((res) => {
        if (res.data.getattendance != undefined) {
          let dataa = res.data.getattendance.filter(
            (item) => item.date == datee
          );
          setSectionAttendance(dataa);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sectionId, datee]);

  useEffect(() => {
    var barPresent = [];
    var barLate = [];
    var barAbsent = [];
    if (sectionAttendance.length > 0) {
      sectionAttendance.forEach((item) => {
        if (item.status === "present") {
          barPresent.push(item);
        } else if (item.status === "late") {
          barLate.push(item);
        } else if (item.status === "absent") {
          barAbsent.push(item);
        }
      });
      setBarPresent(barPresent.length);
      setBarLate(barLate.length);
      setBarAbsent(barAbsent.length);
      setSectionMessage("Number of students: " + sectionAttendance.length);
      setdisplay({
        display: "none"
      });
    } else {
      setBarPresent(0);
      setBarLate(0);
      setBarAbsent(0);
      setSectionMessage("Number of students: " + sectionAttendance.length);
      setmessage("No Attendance for the specified date!");
      setdisplay({
        display: "inline-block",
        textAlign: "center",
        width: "100%",
        color: "red",
      });
    }
  }, [sectionAttendance]);

  console.log(sectionAttendance, datee, sectionId);
  console.log(BarPresent, BarLate, BarAbsent);
  const Barsz = [
    { Attendance: "Present: " + BarPresent, Students: BarPresent },
    { Attendance: "Late: " + BarLate, Students: BarLate },
    { Attendance: "Absent: " + BarAbsent, Students: BarAbsent },
  ];

  return (
    <div style={Styles.bars}>
      <Paper className="reportspaper">
        <h4 style={Styles.donutTitle}>Section Attendance</h4>
        {<span style={display}>{message}</span>}
        <div style={Styles.search}>
          <BarsSearch setSection={setSection} />
          <div style={Styles.barSearch}>
            <BarsDate setDate={setDate} />
          </div>
        </div>
        <h3 style={Styles.totalStudents}>{sectionMessage} </h3>
        <Chart height={350} data={Barsz}>
          <ArgumentAxis />
          <ValueAxis max={1} />
          <BarSeries
            valueField="Students"
            argumentField="Attendance"
            color="#9CCC65"
            
          />
          <Animation />
          <EventTracker />
          <HoverState />
        </Chart>
      </Paper>
    </div>
  );
};

export default Bars;
