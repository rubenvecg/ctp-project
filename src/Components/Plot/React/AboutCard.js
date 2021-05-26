import React from 'react';
import '../../../Styles/About.scss';
// import Section from "./Section";
import BioText from "./BioText";
import github from "../../../Images/github.svg";
import linkedin from "../../../Images/linkedin.svg";


function AboutCard(props) {
  return(
    <>
    <div className="About-container">
      <img src={props.img}/>
      <div>
        <BioText className="align-text" title={props.name} text={props.text}/>
        <div className="about-links">
        <a href={props.linkedin} target="_blank"><img src={linkedin}/></a>
          <a href={props.github} target="_blank"><img src={github}/></a>
        </div>
      </div>
    </div>
  </>
);
}

export default AboutCard;