import React from 'react';
import { NavLink,Link } from 'react-router-dom';

const tabs = [{
  route: "/",
  name: "Home",
},{
  route: "/About",
  name: "About",
}]

function Navigation(props) {
  return(
  <nav>
       {
        tabs.map((tab, index) =>(
          <div className="navigation" key={`tab-${index}`}>
            <NavLink className="nav-routes" exact activeClassName="selected" to={tab.route}>
              {tab.name}
            </NavLink>
          </div>
        ))
      }
  </nav>
);
}

export default Navigation;