import "../styles/Navigation.css";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GoodplaysContext } from "../models/GoodplaysContextType";

const Navigation: React.FC = () => {
  const { isLoggedIn } = useContext(GoodplaysContext);

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <Link to="/">
          <img src="gpLogo.png" alt="Logo" />
        </Link>
        <li className="navbar-item">
          <Link to="/">Game Sessions</Link>
        </li>
        <li className="navbar-item">
          <Link to="/charts">Charts</Link>
        </li>
        {isLoggedIn ? (
          <li className="navbar-item">
            <Link to="/logout">Logout</Link>
          </li>
        ) : (
          <li className="navbar-item">
            <Link to="/login">Login</Link>
          </li>
        )}
        <li className="navbar-item navbar-item-right">
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
