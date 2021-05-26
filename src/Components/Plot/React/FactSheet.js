import React from 'react';
import BioText from './BioText';
import '../../../Styles/Section.scss';

function FactSheet(props) {
  return(
  <div className="Section-container fact">
    <div className="Section-title">Quick Facts
    </div>
    <div>
      African-Americans were arrested the most in Brooklyn compared to other races in all years School District.
    </div>
    <div>
      In Manhattan crime count is significantly higher than the rest of the districts. This is likely due to the area of the district (almost half the borough in size).
    </div>
    <div>
      Police Precinct #121 opened for business in 2013, so there is no data available between 2006 and 2012.
      </div>
    <div>
      ASSAULT 3 & OTHER OFFENSES was the most prevalent crime for all boroughs in 2020.
    </div>
    <div>
      Males between 25-44 years old were arrested the most for all years in all areas.
    </div>

  </div>
);
}

export default FactSheet;