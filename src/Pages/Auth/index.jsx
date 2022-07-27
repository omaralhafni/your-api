import React from 'react';
import { NavLink, Outlet } from "react-router-dom";
import './index.css';

const Auth = () => {
    return (
        <main>
            <section className="relative w-full h-full min-h-screen">
                <div
                    className="absolute top-0 w-full h-full bg-blue-800 bg-no-repeat bg-cover"
                    style={{
                        backgroundImage: "url(/assets/images/motion-projects.jpg)",
                    }}
                />
                <div className="container m-auto px-4 h-screen">
                    <div className="flex content-center items-center justify-center h-screen">
                        <div className="auth-card">
                            <h1 className="m-3 text-gray-300 text-center text-[28px] font-bold font-sans">
                                <NavLink to="/auth/register" className={({ isActive }) => isActive ? "text-[#1d92fa]" : "text-black dark:text-gray-400 "}>
                                    Sign Up
                                </NavLink>
                                &nbsp; | &nbsp;
                                <NavLink to="/auth/login" className={({ isActive }) => isActive ? "text-[#1d92fa]" : "text-black dark:text-gray-400"}>
                                    Sign in
                                </NavLink>
                            </h1>

                            <hr className="mb-5 mx-5 border-b-1 border-Gray-300" />

                            <Outlet />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Auth