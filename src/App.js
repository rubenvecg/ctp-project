import { useEffect, useState } from 'react';
import './App.css';
import * as Plot from './Components/Plot/React';
import TestBar from "./Sections/TestBar"
import TestHist from  "./Sections/TestHist"
import Dashboard from "./Sections/Dashboard/Dashboard"
import "./Styles/ChartStyles.css"


function App() {  

  return (
    
    <div>
        { false &&
        <div style={{
          width: '50%'
        }}>
        <TestBar id="test-bar"></TestBar>
        </div>
        }
  
        <div style={{
            width: "100%"
        }}>
          <Dashboard></Dashboard>
        </div>

            
    </div> 
  );
}

export default App;
