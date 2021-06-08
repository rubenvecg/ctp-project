import React from 'react';
import ToolContainer from './ToolContainer';
import '../../../Styles/Section.scss';

function Section(props) {
  return(
  <div className="Section-container">
    
    <div className="Section-title">{props.title}</div>
    <div>{props.text}</div>
    
    <div className="section-disclaimer">
      <div className="Section-title">Disclaimer:</div>
        <p>
          {props.disclaimer}
        </p>
    </div>

    <div className="Section-title">Made with:</div>
    <ToolContainer>
      <a href="https://reactjs.org/" target="_blank"><img src={props.react}/></a>
      <a href="https://d3js.org/" target="_blank"><img src={props.d3}/></a>
      <a href="https://pandas.pydata.org/" target="_blank"><img src={props.pandas}/></a>
      <a href="https://geopandas.org/" target="_blank"><img src={props.geopandas}/></a>
      <a href="https://jupyter.org/" target="_blank"><img src={props.jupyter}/></a>
    </ToolContainer>
  </div>
);
}

export default Section;