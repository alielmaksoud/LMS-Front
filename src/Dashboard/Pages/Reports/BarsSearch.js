import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CookieService from '../../Service/CookieService';
import axios from 'axios'
import { RestaurantMenu } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));
  
export default function BarsSearch(props) {
  const classes = useStyles();
  const cookie = CookieService.get('Bearer');
  const [Loading, setLoading] = useState(true);
  const [Classes, setClasses] = useState([]);
  const [Sections, setSections] = useState([]);
    useEffect(() => {
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
                setClasses(res.data.sections)                
            }).catch(err => {
              console.log(err.request)
            })
           setLoading(false)
      },[]);

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-native-select">Select a Section</InputLabel>
        <Select native defaultValue="" id="grouped-native-select" 
        onChange={(event) => event.target.value ? props.setSection(event.target.value ) : null}
        >

          <option aria-label="None" value="" />
          {Classes.map((option) => { 
              return (
                <optgroup label={option.class_name} key={option.id} value={option.id}>
                    
                        {option.getsections.map((item)=>{
                            return(
                                <>
                                <option label={item.section_name} value={item.id}></option>
                                </>
                            )

                    })}
                </optgroup>
                )
           
          }
          )}
          
        </Select>
      </FormControl>
      
    </div>
  );
}
