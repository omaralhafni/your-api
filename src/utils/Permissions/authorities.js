
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context';

export function Authorized({ children }) {
    const { userData: { isLogin } } = useContext(UserContext);
    return isLogin ? children : <Navigate to="/auth/login" />
}

export function Unauthorized({ children }) {
    console.log('Unauthorized start');
    const { userData: { isLogin } } = useContext(UserContext);
    console.log('Unauthorized isLogin', isLogin);

    return isLogin ? <Navigate to="/" /> : children
}