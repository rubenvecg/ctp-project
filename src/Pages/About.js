import React from 'react';
import '../App.scss';
import Navigation from "../Components/Plot/React/Navigation";
import Section from "../Components/Plot/React/Section";
import AboutCard from "../Components/Plot/React/AboutCard";
import Source from "../Components/Plot/React/Source";
import placeholder from "../Images/placeholder.png";
import maisa from "../Images/maisa.jpg";
import ruben from "../Images/ruben.jpg";
import react from "../Images/react-icon.png";
import d3 from "../Images/d3.png";
import pandas from "../Images/pandas_logo.png";
import geopandas from "../Images/geopandas_logo.png";
import jupyter from "../Images/jupyter_logo.png";

function About() {  

  return (
      <div className="AboutPage">
        <Navigation/>
        <Section 
        title="About us" 
        text="NYC Crime View is a visualization app that enables you to view crime data 
        retrieved from the New York City Police Department between the years 2006 and 2020 
        across different city jurisdictions. We worked with a dataset with over 5 million 
        entries containing the location of the crime, type of crime and perpetrator descriptions."
        disclaimer="Disclaimer: The objective for this project is not to provide any insights related to the city’s 
        crime activity since the data comes directly from NYPD. Any biases or inconsistencies are 
        related directly with the creation of this dataset and NYPD’s operations."
        react={react}
        d3={d3}
        pandas={pandas}
        geopandas={geopandas}
        jupyter={jupyter}
        />
        <Source
        s1="https://www1.nyc.gov/site/planning/data-maps/open-data/districts-download-metadata.page"
        s1Title="Political and Administrative Districts, Department of City Planning; retrieved from https://www1.nyc.gov/."
        s2="https://data.cityofnewyork.us/Public-Safety/NYPD-Arrest-Data-Year-to-Date-/uip8-fykc"
        s2Title="NYC OpenData, Police Department (NYPD); retrieved from https://data.cityofnewyork.us/."
        />
        <AboutCard 
        img={ruben} 
        github="https://github.com/rubenvecg"
        linkedin="https://www.linkedin.com/in/ruben-vecino/"
        name="Ruben Vecino" 
        text="Originally from Barranquilla, Colombia. I am an undergraduate Computer Systems Technology student at the New York City College of Technology (City Tech). My professional interests include Software Engineering, Data Analytics & Visualization, and Full Stack Web Development. I am currently looking for internships and/or work opportunities."
        />
        <AboutCard 
        img={maisa} 
        github="https://github.com/Maisa-ah"
        linkedin="https://www.linkedin.com/in/maisa-ahmad/"
        name="Maisa Ahmad" 
        text="I am a Palestinian-American who recently obtained a Bachelor’s degree in Computer Science. My primary interest is Software Engineering and Web Development, however my minor in Media Production has also opened doors for me in UI/UX design. I hope to continue finding opportunities to expand my knowledge and experiences."
        />

      </div>
  );
}

export default About;
