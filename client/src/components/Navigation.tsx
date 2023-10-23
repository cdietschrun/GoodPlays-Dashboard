import "../styles/Navigation.css";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GoodplaysContext } from "../models/GoodplaysContextType";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation: React.FC = () => {
  const { isLoggedIn, goodplaysUser } = useContext(GoodplaysContext);

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <Link to="/">
          <img src="gpLogo.png" alt="Logo" />
        </Link>
        {isLoggedIn && (
          <li className="navbar-item">
            <Link to="/">Game Sessions</Link>
          </li>
        )}
        {isLoggedIn && (
          <li className="navbar-item">
            <Link to="/charts">Charts</Link>
          </li>
        )}
        {!isLoggedIn && (
          <li className="navbar-item">
            <Link to="/login">Login</Link>
          </li>
        )}
        {!isLoggedIn && (
          <li className="navbar-item">
            <Link to="/register">Register</Link>
          </li>
        )}
        {isLoggedIn && (
          <li className="navbar-item navbar-item-right">
            <Link to="/settings">
              {" "}
              <FontAwesomeIcon icon={faCog} /> {goodplaysUser.email}
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li className="navbar-item navbar-item-right">
            <Link to="/logout">Log Out</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
