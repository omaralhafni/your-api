import React from "react";
import { NavLink } from "react-router-dom";
// import { CgMonday } from "react-icons/cg";
import { navigationData } from "../../../utils";
import { logout } from "../../../api";

import "./index.css";

export const Navbar = ({ handleLogout }) => {
  return (
    <nav className="navbar">
      <span className="logo">
        <img src="/logo.png" alt="logo" />
      </span>
      <ul className="navItems">
        {navigationData.map(item => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) => isActive ? "navItem selectedNavItem" : "navItem"}
          >
            {item.name}
          </NavLink>
        ))}
      </ul>
      <button className="actions" onClick={() => logout(handleLogout)} >Logout</button>
    </nav>
  );
};