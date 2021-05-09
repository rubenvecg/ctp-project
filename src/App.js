import { useEffect, useState } from 'react';
import './App.css';
import * as Plot from './Components/Plot/React';
import TestBar from "./Sections/TestBar"
import TestHist from  "./Sections/TestHist"
import TestMap from "./Sections/TestMap"
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

        { false &&
        <div style={{
          width: '50%'
        }}>
        <TestHist id="test-hist"></TestHist>
        </div>
        }
        
        <div style={{
            width: "100%"
        }}>
          <TestMap></TestMap>
        </div>

            
    </div> 
  );
}

export default App;
