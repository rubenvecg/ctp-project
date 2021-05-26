import React from 'react';
import '../App.scss';
import Dashboard from "../Sections/Dashboard/Dashboard";
import "../Styles/ChartStyles.css";
import Navigation from "../Components/Plot/React/Navigation";
import FactSheet from "../Components/Plot/React/FactSheet";


function Home() {  

  return (
      <div>
        <Navigation/>
        <Dashboard></Dashboard>
        <FactSheet/>
      </div>
  );
}

export default Home;
