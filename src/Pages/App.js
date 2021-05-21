import React from 'react';
import {Switch, Route, Router} from '../util/router.js';
import Home from './Home';
import About from './About';

function App() {  
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>   
        <Route exact path="/about-us" component={About}/>    
      </Switch>
    </Router>
  );
}

export default App;
