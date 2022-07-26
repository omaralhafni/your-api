import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';
import { Navbar } from './Navbar';
import { TabBar } from './TabBar';

export const Nav = () => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    const handleLogout = () => {
        navigate('/auth/login');
        userContext.setUserData({ isLogin: false, userId: "", userName: "" })
    }
    return (
        <>
            <Navbar handleLogout={handleLogout} />
            <TabBar handleLogout={handleLogout} />
        </>
    )
}