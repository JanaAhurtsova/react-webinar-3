import { memo } from "react";
import { NavLink } from "react-router-dom";
import './style.css';

function Navigation (props) {
  return (
    <nav className="Navigation">
      <NavLink to="/" className="Navigation-link">
        {props.link}
      </NavLink>
    </nav>
  );
}

export default memo(Navigation);