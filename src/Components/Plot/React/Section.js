import React from 'react';
import '../../../Styles/Section.scss';

function Section(props) {
  return(
  <div className="Section-container">
    <div className="Section-title">{props.title}</div>
    <div>{props.text}</div>
  </div>
);
}

export default Section;