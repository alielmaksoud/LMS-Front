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
import NotFound from './Pages/Not_Found/NotFound'



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
        <Protection path='/admin/NewAdmin'>
            <NewAdmin />
        </Protection>
        <Protection path='/admin/ManageAdmin'>
            <ManageAdmin />
        </Protection>
        <Protection path='/admin/Managestudents'>
            <ManageStudents />
        </Protection>
        <Protection path='/admin/Newstudent'>
            <NewStudent />
        </Protection>
        <Protection path='/admin/Newclass'>
            <NewClass />
        </Protection>
        <Protection path='/admin/Manageclasses'>
            <ManageClasses />
        </Protection>
        <Route>
            <NotFound />
        </Route>
      </Switch>
    </Router>
    </>
  )
}

export default Dashboard;

