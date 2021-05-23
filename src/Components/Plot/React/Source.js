import React from 'react';
import '../../../Styles/Section.scss';

function Source(props) {
  return(
  <div className="Section-container">
    <div className="Section-title">Sources</div>
    <div className="source-links">
      <div><a href={props.s1} target="_blank">{props.s1Title}</a></div>
      <div><a href={props.s2} target="_blank">{props.s2Title}</a></div>
      <div><a href={props.s3} target="_blank">{props.s3Title}</a></div>
    </div>
  </div>
);
}

export default Source;