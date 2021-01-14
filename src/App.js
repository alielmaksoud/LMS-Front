import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import login from './Dashboard/loginPages/login.js';
import Protection from './Dashboard/loginPages/Protection';
import Dashboard from './Dashboard/Dashboard';
import NotFound from './Dashboard/Pages/Not_Found/NotFound'
import Login from './Dashboard/loginPages/login.js';





function App() {
  const { pic, setpic } = useState("");

  const picsetting = (pic) => {
    setpic(pic);
};
  console.log(pic)
    return (
      <div className='App'>
        <Router>
            <Switch>
            <Protection path="/admin" >
                <Dashboard pic={pic} />
            </Protection>
                <Route  exact path='/'>
                  <Login picsetting={picsetting} />
                </Route>
                <Route>
                   <NotFound />
                </Route>
            </Switch>
        </Router>
      </div>
    );
  }
  
  export default App;
