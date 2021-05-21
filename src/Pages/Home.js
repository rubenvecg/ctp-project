import React from 'react';
import '../App.css';
import Dashboard from "../Sections/Dashboard/Dashboard"
import "../Styles/ChartStyles.css"
import Navigation from "../Components/Plot/React/Navigation";


function Home() {  

  return (
      <div>
        <Navigation/>

        <Dashboard></Dashboard>
        
        <div style={{height: '100%', backgroundColor: 'tomato'}}>Test</div>

        <div style={{height: '100%', backgroundColor: 'tomato'}}>Test</div>
      </div>
  );
}

export default Home;
