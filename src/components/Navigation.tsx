import "../styles/Navigation.css";

import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/">Game Sessions</Link>
        </li>
        <li className="navbar-item">
          <Link to="/charts">Charts</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
