import React from 'react';
import '../../../Styles/ToolContainer.scss';

const ToolContainer = (props) =>{
  return(
    <div>
      <div className="tool-wrapper">
        {props.children}
      </div>
    </div>
  );
}

export default ToolContainer;