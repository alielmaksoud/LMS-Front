/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios'
import CookieService from '../../Service/CookieService';

export default function DonutSearch(props) {
    const cookie = CookieService.get('Bearer');
    const [Loading, setLoading] = useState(true);
    const [Student, setStudent] = useState([]);
    const [StudentID, setStudentID] = useState([]);

    useEffect(() => {
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
                    setStudent(res.data)
            }).catch(err => {
              console.log(err.request)
            })
           setLoading(false)
      },[]);

  const options = Student.map((option) => {
    const firstLetter = option.first_name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });
 
  return (
    <Autocomplete
      id="student_id"
      onChange={(event, value) => props.setStudent(value)}
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.first_name + " " + option.last_name}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="With categories" variant="outlined" />}
    />
  );
}


