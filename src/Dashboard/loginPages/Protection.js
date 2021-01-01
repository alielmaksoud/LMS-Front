import React, { useEffect, useState } from "react";
import CookieService from '../Service/CookieService';
import  { Redirect, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'green',
  },
}));


const ProtectedRoute = ({ children, ...rest }) => {

  const [Verified, setVerified ] = useState("");
  const cookie = CookieService.get('Bearer');
  const classes = useStyles();
  useEffect(() => {
    var config = {
      method: 'post',
      url: 'http://localhost:8000/api/verify',
      headers: { 
        'Authorization': `Bearer ${cookie}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
      }};

        axios(config)
        .then(res => {
            if(res.data.message === "Verified"){
                setVerified("true");
            }else {
              setVerified("error");
            }
        }).catch(err => {
          console.log(err.request)
          setVerified("error");
        })
    
  });
  
  // if(Verified.length === 0){
  //   return <Redirect to={"/"} />
  // }else {
      return (
        <Route {...rest}
          render={({location}) => {
            if(Verified === "true"){
              return children
            }else if(Verified.length === 0) {
              return (<div>
                    <Backdrop className={classes.backdrop} open={true}>
                      <CircularProgress color="inherit" />
                   </Backdrop>
                    </div>)
            }else{
              return (<Redirect to={{ pathname: "/", state: { from: location }}}/>)
            }
            }
          }
        />
      );
 
};
export default ProtectedRoute;
