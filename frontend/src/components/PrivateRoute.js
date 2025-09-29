// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    // if (user.role !== 'admin') {
    //     // Có thể chuyển hướng đến trang không có quyền truy cập
    //     return <Navigate to="/" />;
    // }

    return children;
};

export default PrivateRoute;