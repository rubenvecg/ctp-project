import React from 'react';
import '../App.scss';
import Navigation from "../Components/Plot/React/Navigation";
import Section from "../Components/Plot/React/Section";
import AboutCard from "../Components/Plot/React/AboutCard";
import Source from "../Components/Plot/React/Source";
import placeholder from "../Images/placeholder.png";

function About() {  

  return (
      <div className="AboutPage">
        <Navigation/>
        <Section 
        title="About us" 
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
        />
        <Section 
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
        <Source
        s1="https://www1.nyc.gov/site/planning/data-maps/open-data/districts-download-metadata.page"
        s1Title="Political and Administrative Districts, Department of City Planning; retrieved from https://www1.nyc.gov/."
        s2=""
        s2Title=""
        s3=""
        s3Title=""
        />
        <AboutCard 
        img={placeholder} 
        github="https://github.com/rubenvecg"
        linkedin="https://www.linkedin.com/in/ruben-vecino/"
        name="Ruben Vecino" 
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
        <AboutCard 
        img={placeholder} 
        github="https://github.com/Maisa-ah"
        linkedin="https://www.linkedin.com/in/maisa-ahmad/"
        name="Maisa Ahmad" 
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />

      </div>
  );
}

export default About;
