
import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { navigationData } from "../../../utils";
import "./index.css";
import { logout } from "../../../api";

export const TabBar = ({ handleLogout }) => {
    return (
        <nav className="tabBar">
            {navigationData?.map((item, index) => (
                <NavLink
                    to={item.path}
                    key={item.name}
                >
                    {({ isActive }) => (
                        <span
                            className={isActive ? "tabItem tabItemActive" : "tabItem"}
                        >
                            <span className="icon">{item.icon}</span>
                        </span>)}
                </NavLink>
            ))}
            <span className="tabItem" onClick={() => logout(handleLogout)}>
                <span className="icon">
                    <AiOutlineLogin />
                </span>
            </span>
        </nav>
    );
};