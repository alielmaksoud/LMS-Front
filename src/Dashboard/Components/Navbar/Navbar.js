
import React from 'react';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import Logo from '../../../logo.png';
import CookieService from '../../Service/CookieService.js';
import axios from 'axios';



function Navbar({CheckSidebar, forwardedRef}) {

  function logout(){
    const cookie = CookieService.get('Bearer');
    var config = {
      method: 'post',
      url: 'http://localhost:8000/api/logout',
      headers: { 
        'Authorization': `Bearer ${cookie}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
      }};

        axios(config)
        .then(res => {
           CookieService.remove('Bearer');
           window.location.replace("/")
        }).catch(err => {
           console.log(err)
           CookieService.remove('Bearer');
           window.location.replace("/")

        })
  }

  
  return (
    <IconContext.Provider value={{ color: '#B5DFBB' }}>
        <div className='navbarr'>
    
          <div className='menu-bars' ref={forwardedRef}>
            <FaIcons.FaBars onClick={CheckSidebar}  />
          </div>
          <div className="head-title">
          <img className='logo' src={Logo} alt="Logo" />
          <h4>Learning Management System</h4>
          </div>
          <div onClick={()=> logout() } className="logoutbutton">
              Logout
          </div>
        </div>  
    </IconContext.Provider>
  );
}

export default Navbar;