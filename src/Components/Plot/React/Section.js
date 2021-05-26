import React from 'react';
import ToolContainer from './ToolContainer';
import '../../../Styles/Section.scss';

function Section(props) {
  return(
  <div className="Section-container">
    <div className="Section-title">{props.title}</div>
    <div>{props.text}</div>
    <ToolContainer>
      <a href=""><img src={props.react}/></a>
      <a href=""><img src={props.d3}/></a>
      <a href=""><img src={props.pandas}/></a>
      <a href=""><img src={props.geopandas}/></a>
      <a href=""><img src={props.jupyter}/></a>
    </ToolContainer>
    <div class="section-disclaimer">{props.disclaimer}</div>
  </div>
);
}

export default Section;