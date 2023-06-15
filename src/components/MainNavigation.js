// import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    
      <nav>
        <ul className={classes.list}>
          {/* <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li> */}
          
{/*          
          <li>
            <NavLink
              to="/Login"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Login
            </NavLink>
          </li> */}
        </ul>
      </nav>
    
  );
}

export default MainNavigation;
