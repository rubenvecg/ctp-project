import React from 'react';
import {Switch, Route} from '../util/router.js';
import { BrowserRouter as Router} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Navigation from "../Components/Plot/React/Navigation";

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
