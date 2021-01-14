import React from 'react'
import Sidebar from './Components/Sidebar/sidebar.js'
import items from './Components/Sidebar/SidebarData.js'
import Navbar from './Components/Navbar/Navbar.js'
import useVisible from './Service/useVisible'
import Protection from './loginPages/Protection'
import NewAdmin from './Pages/Admins/NewAdmin.js';
import ManageAdmin from './Pages/Admins/ManageAdmin';
import ManageStudents from './Pages/Students/ManageStudent';
import NewStudent from './Pages/Students/NewStudent';
import ManageClasses from './Pages/classes-sections/ManageClass';
import NewClass from './Pages/classes-sections/NewClass';
import Reports from './Pages/Reports/Reports'


import { 
  BrowserRouter as
   Router,
  Route,
   Switch }
from 'react-router-dom';


function Dashboard() {
  const { ref, ref2, isVisible, setIsVisible } = useVisible(false);
  
    
    const CheckSidebar = () => {
        setIsVisible(!isVisible);
    };



  return (
    <>
    <Router>

      <Navbar items={items} CheckSidebar={CheckSidebar}  isVisible={isVisible} forwardedRef={ref2}/>
      <Sidebar items={items}  CheckSidebar={CheckSidebar} forwardedRef={ref}
                isVisible={isVisible}/>
      <Switch>
      <Protection>
        <Route path='/admin/NewAdmin'>
            <NewAdmin />
        </Route>
        <Route path='/admin/ManageAdmin'>
            <ManageAdmin />
        </Route>
        <Route path='/admin/Managestudents'>
            <ManageStudents />
        </Route>
        <Route path='/admin/Newstudent'>
            <NewStudent />
        </Route>
        <Route path='/admin/Newclass'>
            <NewClass />
        </Route>
        <Route path='/admin/Manageclasses'>
            <ManageClasses />
        </Route>
        <Route exact path='/admin'>
            <Reports />
        </Route>
         </Protection>
      </Switch>
    </Router>
  
    </>
  )
}

export default Dashboard;

