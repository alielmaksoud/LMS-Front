import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import login from './Dashboard/loginPages/login.js';
import Protection from './Dashboard/loginPages/Protection';
import Dashboard from './Dashboard/Dashboard';





function App() {

    return (
      <div className='App'>
        <Router>
            <Switch>
            <Protection path="/admin" >
                <Dashboard />
            </Protection>
            {/* <Protection path="/" >
                <Dashboard />
            </Protection> */}
                <Route  path='/' component={login} />
            </Switch>
        </Router>
      </div>
    );
  }
  
  export default App;
