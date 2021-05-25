import React from 'react';
import '../App.scss';
import Dashboard from "../Sections/Dashboard/Dashboard"
import "../Styles/ChartStyles.css"
import Navigation from "../Components/Plot/React/Navigation";


function Home() {  

  return (
      <div>
        <Navigation/>
        <Dashboard></Dashboard>
      </div>
  );
}

export default Home;
