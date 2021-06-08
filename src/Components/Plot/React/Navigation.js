import React from 'react';
import { NavLink,Link } from 'react-router-dom';
import '../../../Styles/Navigation.scss';

const tabs = [{
  route: "/",
  name: "Home",
},{
  route: "/about-us",
  name: "About",
}]

function Navigation(props) {
  return(
    <>
    <nav>
        {
          tabs.map((tab, index) =>(
            <div className="navigation" key={`tab-${index}`}>
              <NavLink className="routes" exact activeClassName="selected" to={tab.route}>
                <h4>{tab.name}</h4>
              </NavLink>
            </div>
          ))
        }
    </nav>
    <div className="nav-container">
      <div className="nav-line"></div>
    </div>
  </>
);
}

export default Navigation;